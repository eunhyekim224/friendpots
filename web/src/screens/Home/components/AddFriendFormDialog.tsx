import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    TextField,
} from "@mui/material";
import { useState } from "react";

type AddFriendFormDialogProps = {
    isOpen: boolean;
    close: () => void;
    addFriend: (name: string) => Promise<void>;
};

export const AddFriendFormDialog = (
    props: AddFriendFormDialogProps
): JSX.Element => {
    const [name, setName] = useState<string>("");

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleKeyPress = async (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            await props.addFriend(name);
        }
    };

    return (
        <Dialog
            open={props.isOpen}
            onClose={props.close}
            maxWidth="xs"
            fullWidth={true}
        >
            <DialogContent>
                <TextField
                    autoFocus={true}
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    variant="standard"
                    color="success"
                    onChange={handleNameChange}
                    onKeyDown={handleKeyPress}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    id="cancel-button"
                    sx={{ color: "green" }}
                    onClick={props.close}
                >
                    Cancel
                </Button> 
                <Button
                    id="add-button"
                    sx={{ color: "green" }}
                    onClick={async () => await props.addFriend(name)}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};
