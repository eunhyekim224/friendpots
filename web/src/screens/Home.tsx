import axios from "axios";
import { ReactElement, useCallback, useEffect, useState } from "react";
import "./Home.styled";
import { Alert, AlertTitle, Box, Snackbar, Typography } from "@mui/material";
import { AddFriendButton } from "./Home.styled";
import { FriendPot } from "../components/FriendPot";
import { AddFriendFormDialog } from "../components/AddFriendFormDialog";

type Friend = {
    id?: string;
    name: string;
};

function Home(): ReactElement {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newFriendId, setNewFriendId] = useState();
    const [newFriend, setNewFriend] = useState<null | Friend>();
    const [isError, setIsError] = useState(false);
    const [snackBarOpen, setSnackbarOpen] = useState(false);

    const addFriend = async (name: string) => {
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

    const getFriend = useCallback(
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
            getFriend(newFriendId);
        }
    }, [newFriendId]);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
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
                <AddFriendFormDialog
                    isOpen={modalIsOpen}
                    close={closeModal}
                    addFriend={addFriend}
                />
                {newFriend && <FriendPot name={newFriend.name} />}
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
