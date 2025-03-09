import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { getRoleFolders, uploadToRoleFolder } from "../utils/files";
import FileUpload from "../components/FileUpload";
import ContainedButton from "../components/ContainedButton";
import FileList from "../components/FileList";
import Dropdown from '../components/Dropdown';


const Content = () => {
    const admins = ["bjohnson@clientvitals.com", "wendy.biggs@clientvitals.com"]
    const [file, setFile] = useState(null);
    const [folders, setFolders] = useState(null);
    const [message, setMessage] = useState(null);
    const [folderRole, setFolderRole] = useState(null);
    const { user } = useUser();
    const navigate = useNavigate();

    const getFolders = async () => {
        if(!folderRole) return
        try {
            const result = await getRoleFolders(folderRole, user.token);

            setFolders(result);
        } catch(error) {
            throw error;
        }
    }

    const handleFileChange = (event) => setFile(event.target.files[0]);

    const handleRoleChange = (event) => setFolderRole(event.target.value);

    const handleUpload = async (file, role, token) => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        if(!role || !token) {
            alert("Missing Credentials")
            return;
        }

        try {
            const result = await uploadToRoleFolder(file, role, token);

            console.log({result});
            setMessage('Upload Successful');
            setFile(null);
            setFolders(null);
            await getFolders();
        } catch (error) {
            setMessage('There was an error');
        }
    };

    useEffect(() => {
        if(!user?.name || !user?.token) navigate('/login');
        else setFolderRole(user?.role);
    }, []);

    useEffect(() => {
        if(user && folderRole && user?.token) getFolders();
    }, [user, folderRole]);

    return (
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '50px 140px'}}>
            <div>
                {message && <p>{message}</p>}
                <h3>Upload</h3>
                <FileUpload onChange={handleFileChange} />
                <ContainedButton text="Save" onClick={() => handleUpload(file, folderRole, user?.token)} />
                <p><b>Uploaded File:</b> {file ? file?.name : 'No File Selected'}</p>
            </div>

            <div>
                {
                    admins.includes(user?.name?.toLowerCase()) && <Dropdown selectedOption={folderRole} handleChange={handleRoleChange} />
                }
                <FileList title={`${folderRole} Files:`} items={folders} />
            </div>
        </div>
    );
}

export default Content;