import axios from "axios";
import { ReactElement, useCallback, useEffect, useState } from "react";
import "./Home.styled";
import { Box, Button, Typography } from "@mui/material";
import { AddFriendButton, LogoutButton } from "./Home.styled";
import { FriendPot } from "./components/FriendPot";
import { AddFriendFormDialog } from "./components/AddFriendFormDialog";
import { StatusSnackbar } from "../../molecules/StatusSnackbar/StatusSnackbar";
import { LoginDialog } from "./components/LoginDialog";

type Friend = {
    id?: string;
    name: string;
};

export const Home = (): ReactElement => {
    const [userId, setUserId] = useState("");
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newFriend, setNewFriend] = useState<Friend | null>();
    const [snackbarStatus, setSnackbarStatus] = useState<string>();
    const [snackBarIsOpen, setSnackbarIsOpen] = useState(false);

    const successMsg = "You have successfully added your new friend pot! 🎉";

    const addFriend = async (name: string) => {
        const newFriend: Friend = {
            name,
        };

        try {
            const { data: addedFriend } = await axios.post(
                "/friends",
                newFriend
            );

            if (addedFriend) {
                setNewFriend(addedFriend);
                setSnackbarStatus("success");
                setSnackbarIsOpen(true);
            }

            closeModal();
        } catch (err) {
            closeModal();
            setSnackbarStatus("error");
            setSnackbarIsOpen(true);
            console.error("Failed to create new friend", err);
        }
    };

    const getFriend = useCallback(
        async (friendId: string) => {
            try {
                const { data: friend } = await axios.get(`friends/${friendId}`);
                setNewFriend(friend);
            } catch (err) {
                setSnackbarStatus("error");
                console.error("Failed to fetch new friend", err);
            }
        },
        [newFriend?.id]
    );

    const userIdFromLocal = () => {
        const userId = JSON.parse(localStorage.getItem("userId") as string);
        console.log('userId from storage', userId)
        if (userId) setUserId(userId);
    };

    useEffect(() => {
        console.log("userId", userId);
        userIdFromLocal();
        setLoginModalOpen(!userId);

        if (newFriend?.id) {
            getFriend(newFriend.id);
        }
    }, [newFriend?.id, userId]);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const closeLoginModal = () => {
        if (userId) {
            setLoginModalOpen(false);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarIsOpen(false);
    };

    const logout = () => {
        localStorage.clear();
        setUserId("");
        setNewFriend(null);
        console.log('You\'ve successfully logged out!');
    }

    return (
        <Box
            sx={{
                backgroundColor: "#7cb342",
            }}
        >
            {isLoginModalOpen && (
                <LoginDialog
                    isOpen={isLoginModalOpen}
                    close={closeLoginModal}
                    saveUserId={setUserId}
                />
            )}

            <LogoutButton id={"logout-button"} onClick={logout}>Log out</LogoutButton>

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
                    id="add-friend-button"
                >
                    Add a new friendpot
                </AddFriendButton>
                <AddFriendFormDialog
                    isOpen={modalIsOpen}
                    close={closeModal}
                    addFriend={addFriend}
                />

                {newFriend && <FriendPot name={newFriend.name} />}
                <StatusSnackbar
                    isOpen={snackBarIsOpen}
                    handleSnackbarClose={handleSnackbarClose}
                    status={snackbarStatus}
                    successMsg={successMsg}
                />
            </Box>
        </Box>
    );
};
