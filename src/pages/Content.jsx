import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { getRoleFolders, uploadToRoleFolder } from "../utils/files";


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

    console.log(folders)

    return (
        <div>
            <h3>Upload</h3>
            <input type="file" onChange={handleFileChange} />
            <button onClick={() => handleUpload(file, user?.role, user?.token)}>Upload</button>

            <div>
                <h3>{user?.role} Files:</h3>

                <ul>
                    {
                        folders?.map(file => (
                            <a href={file?.url} target="_blank">
                                <li className="border border-1 border-primary">{file.key}</li>
                            </a>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default Content;