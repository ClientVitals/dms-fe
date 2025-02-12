import Button from '@mui/material/Button';

const ContainedButton = ({text, onClick}) => (
    <Button
        variant="contained"
        onClick={onClick}
    >
        {text}
    </Button>
);

export default ContainedButton;