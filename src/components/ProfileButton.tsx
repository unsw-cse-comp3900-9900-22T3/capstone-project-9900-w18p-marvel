import Button from "@mui/material/Button";

interface ProfileButtonProps {}

const ProfileButton = ({}: ProfileButtonProps) => {
    return (
        // <div className="text-yellow-500">Write your component</div>
        // <Button variant="text">Text</Button>

        <Button variant="contained">Contained</Button>
        


        // <Button variant="contained" component="label">
        //     Upload
        //     <input hidden accept="image/*" multiple type="file" />
        // </Button>
        // <Button variant="outlined">Outlined</Button>

    );
};

export { ProfileButton };
