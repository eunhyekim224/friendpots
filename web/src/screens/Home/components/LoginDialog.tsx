import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import { useState } from "react";

type LoginDialogProps = {
    isOpen: boolean;
    close: () => void;
    // login: (userId: string) => Promise<void>;
};

export const LoginDialog = (props: LoginDialogProps): JSX.Element => {
    const [userId, setUserId] = useState<string>("");

    const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(event.target.value);
    };

    // const handleKeyPress = async (event: React.KeyboardEvent) => {
    //     if (event.key === "Enter") {
    //         await props.login(userId);
    //     }
    // };

    return (
        <Dialog
            open={props.isOpen}
            onClose={props.close}
            maxWidth="sm"
            fullWidth={true}
        >
            <DialogTitle sx={{ color: "green" }}>Welcome to Friendpots!</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    To add and view your friendpots, please enter your email address here. 
                </DialogContentText>
                <TextField
                    autoFocus={true}
                    margin="dense"
                    id="login-id"
                    label="e.g. friendpots@gmail.com"
                    type="text"
                    variant="standard"
                    fullWidth
                    color="success"
                    onChange={handleUserIdChange}
                    // onKeyDown={handleKeyPress}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    id="login-button"
                    sx={{ color: "green" }}
                    // onClick={async () => await props.login(name)}
                >
                    Enter
                </Button>
            </DialogActions>
        </Dialog>
    );
};
