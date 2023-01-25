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
                    sx={{ color: "green" }}
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
                            sx={{
                                color: "green",
                                "&.Mui-focused": {
                                    color: "green",
                                },
                            }}
                        >
                            <FormControlLabel
                                value="low"
                                control={
                                    <Radio
                                        sx={{
                                            color: "green",
                                            "&.Mui-checked": {
                                                color: "green",
                                            },
                                        }}
                                    />
                                }
                                label="Low"
                                sx={{
                                    color: "green",
                                    "&.Mui-checked": {
                                        color: "green",
                                    },
                                }}
                            />
                            <FormControlLabel
                                value="medium"
                                control={
                                    <Radio
                                        sx={{
                                            color: "green",
                                            "&.Mui-checked": {
                                                color: "green",
                                            },
                                        }}
                                    />
                                }
                                label="Medium"
                            />
                            <FormControlLabel
                                value="high"
                                control={
                                    <Radio
                                        sx={{
                                            color: "green",
                                            "&.Mui-checked": {
                                                color: "green",
                                            },
                                        }}
                                    />
                                }
                                label="high"
                            />
                        </RadioGroup>
                    </FormControl>
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
