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
    const [subfolder, setSubfolder] = useState(null);

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
    const handleSubfolderChange = (event) => setSubfolder(event.target.value);

    const handleUpload = async (file, role, token, folderPath) => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        if(!role || !token) {
            alert("Missing Credentials")
            return;
        }

        try {
            const result = await uploadToRoleFolder(file, role, token, subfolder);

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

    const folderList = {};

    folders?.forEach(folder => {
        const splitFolder = folder?.key?.split('/');
        const parentFolder = splitFolder[0];
        let subfolder = '';
        let file = '';
        console.log(folder, splitFolder)
        if(splitFolder?.length > 2) {
            subfolder = splitFolder[1];
            file = splitFolder[2];
        } else {
            file = splitFolder[1];
        }

        console.log({splitFolder, parentFolder, subfolder, file});
        if(!folderList[parentFolder]) folderList[parentFolder] = {};

        if(!folderList[parentFolder]?.general) folderList[parentFolder].general = [];

        if(subfolder?.length) {
            console.log({subfolder})
            if(!folderList[parentFolder][subfolder]) folderList[parentFolder][subfolder] = [];

            folderList[parentFolder][subfolder] = [
                ...folderList[parentFolder][subfolder],
                {
                    key: file,
                    url: folder?.url
                }
            ]
        } else {
            folderList[parentFolder] = {
                ...folderList[parentFolder],
                general: [...folderList[parentFolder]?.general, {
                    key: file,
                    url: folder?.url
                }]
            }
        }
    });

    console.log({folderList})

    return (
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '50px 140px'}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', height: '400px'}}>
                {message && <p>{message}</p>}
                <p><b>Uploaded File:</b> {file ? file?.name : 'No File Selected'}</p>
                <input 
                    type="text" 
                    value={subfolder} 
                    onChange={handleSubfolderChange} 
                    placeholder="Enter subfolder path (e.g., onboarding)"
                />
                <FileUpload onChange={handleFileChange} />
                <ContainedButton text="Save" onClick={() => handleUpload(file, folderRole, user?.token)} />
            </div>

            <div>
                {
                    admins.includes(user?.name?.toLowerCase()) && <Dropdown selectedOption={folderRole} handleChange={handleRoleChange} />
                }
                <FileList title={`${folderRole} Files:`} items={folderList} />
            </div>
        </div>
    );
}

export default Content;