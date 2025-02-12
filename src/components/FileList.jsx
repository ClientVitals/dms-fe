import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FileCopy from '@mui/icons-material/FileCopy';

const FileList = ({ title, items }) => (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {title}
        </ListSubheader>
      }
    >
      {
        items?.map(item => (
            <a href={item?.url} target='_blank'>
              <ListItemButton>
                <ListItemIcon>
                  <FileCopy />
                </ListItemIcon>
                <ListItemText primary={item?.key} />
              </ListItemButton>
            </a>
        ))
      }
    </List>
);

export default FileList;