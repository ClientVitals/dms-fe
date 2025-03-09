import { useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FileCopy from '@mui/icons-material/FileCopy';
import Folder from '@mui/icons-material/Folder';
import FolderOpen from '@mui/icons-material/FolderOpen';
import Collapse from '@mui/material/Collapse';

const FileList = ({ title, items }) => {
  const [openFolders, setOpenFolders] = useState({});

  const handleFolderToggle = (folderPath) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderPath]: !prev[folderPath]
    }));
  }

  const renderItems = (folderPath, folderContent) => (
    <List component="div" disablePadding>
      {Object.keys(folderContent).map((subfolder) => (
        <div key={subfolder}>
          {/* Folder Item */}
          <ListItemButton onClick={() => handleFolderToggle(`${folderPath}/${subfolder}`)}>
            <ListItemIcon>
              {openFolders[`${folderPath}/${subfolder}`] ? <FolderOpen /> : <Folder />}
            </ListItemIcon>
            <ListItemText primary={subfolder} />
          </ListItemButton>
          <Collapse in={openFolders[`${folderPath}/${subfolder}`]} timeout="auto" unmountOnExit>
            {renderFiles(`${folderPath}/${subfolder}`, folderContent[subfolder] || [])}
          </Collapse>
        </div>
      ))}
    </List>
  );

  const renderFiles = (folderPath, files) => (
    <List component="div" disablePadding>
      {files.map((file) => (
        <a key={file.url} href={file.url} target="_blank" rel="noopener noreferrer">
          <ListItemButton>
            <ListItemIcon>
              <FileCopy />
            </ListItemIcon>
            <ListItemText primary={file.key} />
          </ListItemButton>
        </a>
      ))}
    </List>
  );

  return (
    <List
      sx={{ minWidth: '800px', width: '100%', bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {title}
        </ListSubheader>
      }
    >
      {Object.keys(items).map((folder) => (
        <div key={folder}>
          {/* Folder Item */}
          <ListItemButton onClick={() => handleFolderToggle(folder)}>
            <ListItemIcon>
              {openFolders[folder] ? <FolderOpen /> : <Folder />}
            </ListItemIcon>
            <ListItemText primary={folder} />
          </ListItemButton>
          <Collapse in={openFolders[folder]} timeout="auto" unmountOnExit>
            {renderItems(folder, items[folder])}
          </Collapse>
        </div>
      ))}
    </List>
  );
}

export default FileList;