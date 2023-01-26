import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
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

    const handleCareLevel = (
        event: React.ChangeEvent<HTMLInputElement>,
        value: string
    ) => {
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
                />
            </DialogContent>
            <DialogContent>
                <Box>
                    <FormControl>
                        <FormLabel id="care-level-radio-buttons-group">
                            Care Level
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby="care-level-radio-buttons0group"
                            name="care-level-radio-buttons-group"
                            value={careLevel}
                            onChange={handleCareLevel}
                            row
                        >
                            <FormControlLabel
                                value="low"
                                control={<Radio />}
                                label="Low"
                                id="care-level-button-low"
                            />
                            <FormControlLabel
                                value="medium"
                                control={<Radio />}
                                label="Medium"
                                id="care-level-button-medium"
                            />
                            <FormControlLabel
                                value="high"
                                control={<Radio />}
                                label="High"
                                id="care-level-button-high"
                            />
                        </RadioGroup>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button id="cancel-button" onClick={props.close}>
                    Cancel
                </Button>
                <Button id="add-button" onClick={handleAddFriend}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};
