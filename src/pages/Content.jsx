import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { getRoleFolders, uploadToRoleFolder } from "../utils/files";
import FileUpload from "../components/FileUpload";
import ContainedButton from "../components/ContainedButton";
import FileList from "../components/FileList";


const Content = () => {
    const [file, setFile] = useState(null);
    const [folders, setFolders] = useState(null);
    const { user } = useUser();
    const navigate = useNavigate();

    const getFolders = async () => {
        try {
            const result = await getRoleFolders(user.role, user.token);

            setFolders(result);
        } catch(error) {
            throw error;
        }
    }

    const handleFileChange = (event) => setFile(event.target.files[0]);

    const handleUpload = async (file, role, token) => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        if(!role || !token) {
            alert("Missing Credentials")
            return;
        }

        const result = await uploadToRoleFolder(file, role, token);

        console.log({result});
    };

    useEffect(() => {
        if(!user?.name || !user?.token) navigate('/login');
    }, []);

    useEffect(() => {
        if(user && user?.role && user?.token) getFolders();
    }, [user]);

    console.log(file)

    return (
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '50px 140px'}}>
            <div>
                <h3>Upload</h3>
                <FileUpload onChange={handleFileChange} />
                <ContainedButton text="Save" onClick={() => handleUpload(file, user?.role, user?.token)} />
                <p><b>Uploaded File:</b> {file ? file?.name : 'No File Selected'}</p>
            </div>

            <div>
                <FileList title={`${user?.role} Files:`} items={folders} />
            </div>
        </div>
    );
}

export default Content;