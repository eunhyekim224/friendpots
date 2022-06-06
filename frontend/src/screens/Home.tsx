import axios from "axios";
import { ReactElement, useCallback, useEffect, useState } from "react";
import "./Home.styled";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";
import { AddFriendButton } from "./Home.styled";

type Friend = {
    id?: string;
    name: string;
};

function Home(): ReactElement {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newFriendId, setNewFriendId] = useState();
    const [newFriend, setNewFriend] = useState<null | Friend>();
    const [name, setName] = useState<string>("");
    const [isError, setIsError] = useState(false);
    const [snackBarOpen, setSnackbarOpen] = useState(false);

    const addFriend = async () => {
        const newFriend: Friend = {
            name,
        };

        try {
            const { data: addedFriend } = await axios.post(
                "/friends",
                newFriend
            );
            setNewFriendId(addedFriend.id);
            closeModal();
        } catch (err) {
            closeModal();
            setIsError(true);
            console.error("Failed to create new friend", err);
        }

        setSnackbarOpen(true);
    };

    const getNewFriend = useCallback(
        async (friendId: string) => {
            try {
                const { data: friend } = await axios.get(`friends/${friendId}`);
                setNewFriend(friend);
            } catch (err) {
                setIsError(true);
                console.error("Failed to fetch new friend", err);
            }
        },
        [newFriendId]
    );

    useEffect(() => {
        if (newFriendId) {
            getNewFriend(newFriendId);
        }
    }, [newFriendId]);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleKeyPress = async (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            await addFriend();
        }
    };

    const handleSnackbarClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <Box
            sx={{
                height: "100%",
                backgroundColor: "#7cb342",
            }}
        >
            <Typography
                variant="h1"
                component="div"
                gutterBottom
                fontFamily="Sue Ellen Francisco"
                fontSize={150}
                color="#795548"
                sx={{
                    marginBottom: "100px",
                    paddingTop: "200px",
                    textAlign: "center",
                }}
            >
                FriendPots
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <AddFriendButton
                    variant="contained"
                    onClick={openModal}
                    disableFocusRipple
                >
                    Add a new friendpot
                </AddFriendButton>
                <Dialog
                    open={modalIsOpen}
                    onClose={closeModal}
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
                        <Button sx={{ color: "green" }} onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button sx={{ color: "green" }} onClick={addFriend}>
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
                {newFriend && (
                    <Typography
                        variant="h5"
                        sx={{ marginTop: "100px" }}
                        component="div"
                        gutterBottom
                    >
                        {newFriend.name}
                    </Typography>
                )}
                <Snackbar
                    open={snackBarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                >
                    {isError ? (
                        <Alert severity="error" onClose={handleSnackbarClose}>
                            <AlertTitle>Error</AlertTitle>
                            Something went wrong 🥺 Please try again soon!
                        </Alert>
                    ) : (
                        <Alert severity="success" onClose={handleSnackbarClose}>
                            <AlertTitle>Success</AlertTitle>
                            You have successfully added your new friend pot! 🎉
                        </Alert>
                    )}
                </Snackbar>
            </Box>
        </Box>
    );
}

export default Home;
