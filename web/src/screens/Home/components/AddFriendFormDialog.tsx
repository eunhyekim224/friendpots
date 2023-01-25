import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Slider,
    TextField,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

type AddFriendFormDialogProps = {
    isOpen: boolean;
    close: () => void;
    addFriend: (name: string, hardiness: string) => Promise<void>;
};

export const AddFriendFormDialog = (
    props: AddFriendFormDialogProps
): JSX.Element => {
    const [name, setName] = useState<string>("");
    const [careLevel, setCareLevel] = useState<string>("");

    const formIsComplete = () => {
        return name && careLevel;
    };

    const clearForm = () => {
        setName("");
        setCareLevel("");
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value.trim());
    };

    const handleCareLevel = (value: string) => {
        setCareLevel(value.trim());
    };

    const handleKeyPress = async (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            await handleAddFriend();
        }
    };

    const handleAddFriend = async () => {
        if (formIsComplete()) {
            await props.addFriend(name, careLevel);
            clearForm();
        } else {
            console.log("form is not complete");
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
                    id="name"
                    label="Name"
                    type="text"
                    variant="standard"
                    required={true}
                    onChange={handleNameChange}
                    onKeyDown={handleKeyPress}
                    sx={{ color: "green" }}
                />
            </DialogContent>
            <DialogContent>
                <Typography>Care level</Typography>
                <Box>
                    <Button
                        id="care-level-button-low"
                        sx={{ color: "green" }}
                        onClick={() => handleCareLevel("low")}
                    >
                        Low
                    </Button>
                    <Button
                        id="care-level-button-medium"
                        sx={{ color: "green" }}
                        onClick={() => handleCareLevel("medium")}
                    >
                        Medium
                    </Button>
                    <Button
                        id="care-level-button-high"
                        sx={{ color: "green" }}
                        onClick={() => handleCareLevel("high")}
                    >
                        High
                    </Button>
                </Box>
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
                    onClick={handleAddFriend}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};
