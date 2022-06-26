import axios from "axios";
import { ReactElement, useCallback, useEffect, useState } from "react";
import "./Home.styled";
import { Box, Typography } from "@mui/material";
import { AddFriendButton } from "./Home.styled";
import { FriendPot } from "./components/FriendPot";
import { AddFriendFormDialog } from "./components/AddFriendFormDialog";
import { StatusSnackbar } from "../../molecules/StatusSnackbar/StatusSnackbar";

type Friend = {
    id?: string;
    name: string;
};

export const Home = (): ReactElement => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newFriend, setNewFriend] = useState<Friend>();
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
                console.log('friend', friend)
            } catch (err) {
                setSnackbarStatus("error");
                console.error("Failed to fetch new friend", err);
            }
        },
        [newFriend?.id]
    );

    useEffect(() => {
        if (newFriend?.id) {
            getFriend(newFriend.id);
        }
    }, [newFriend?.id]);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleSnackbarClose = () => {
        setSnackbarIsOpen(false);
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
