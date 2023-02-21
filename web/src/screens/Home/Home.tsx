import axios from "axios";
import { ReactElement, useCallback, useEffect, useState } from "react";
import "./Home.styled";
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { MainButton } from "./Home.styled";
import { FriendPot } from "./components/FriendPot";
import { AddFriendFormDialog } from "./components/AddFriendFormDialog";
import { StatusSnackbar } from "../../molecules/StatusSnackbar/StatusSnackbar";
import { LoginDialog } from "./components/LoginDialog";
import { Friend } from "./Home.types";

export const Home = (): ReactElement => {
    const { palette, breakpoints } = useTheme();

    const [userId, setUserId] = useState("");
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [friends, setFriends] = useState<Friend[] | null>();
    const [snackbarStatus, setSnackbarStatus] = useState<string>();
    const [snackBarIsOpen, setSnackbarIsOpen] = useState(false);

    const successMsg = "You have successfully added your new friend pot! 🎉";

    const addFriend = async (name: string, careLevel: string) => {
        const newFriend: Friend = {
            userId,
            name,
            careLevel,
        };

        try {
            const { data: addedFriend } = await axios.post(
                "/friends",
                newFriend
            );

            if (addedFriend) {
                getFriends(userId);
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

    const getFriends = useCallback(
        async (userId: string) => {
            try {
                const { data: friends } = await axios.get(
                    `friends?userId=${userId}`
                );
                setFriends(friends);
            } catch (err) {
                setSnackbarStatus("error");
                console.error("Failed to fetch friends", err);
            }
        },
        [friends]
    );

    const userIdFromLocal = async () => {
        const userId = JSON.parse(localStorage.getItem("userId") as string);
        if (userId) {
            setUserId(userId);
            await getFriends(userId);
        }
    };

    useEffect(() => {
        userIdFromLocal();
        setLoginModalOpen(!userId);
    }, [userId]);

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
        setFriends(null);
        console.log("You've successfully logged out!");
    };

    const friendPots = friends?.map((friend) => {
        return (
            <FriendPot
                id={friend.id || ""}
                userId={userId}
                name={friend.name}
                state={friend.state}
                careLevel={friend.careLevel}
                key={friend.id}
                getFriends={getFriends}
            />
        );
    });

    const smallScreenWidth = useMediaQuery(breakpoints.down("sm"));

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

            <Grid
                container
                direction="row"
                justifyContent="space-between"
                position={"fixed"}
            >
                <Grid item>
                    <MainButton id={"logout-button"} onClick={logout}>
                        Log out
                    </MainButton>
                </Grid>

                {smallScreenWidth && (
                    <Grid item>
                        <MainButton
                            onClick={openModal}
                            disableFocusRipple
                            id="add-friend-button"
                        >
                            Add a new friendpot
                        </MainButton>
                    </Grid>
                )}
            </Grid>

            <Typography
                variant="h1"
                component="div"
                gutterBottom
                fontFamily="Sue Ellen Francisco"
                fontSize={150}
                color={palette.secondary.main}
                sx={{
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
                <AddFriendFormDialog
                    isOpen={modalIsOpen}
                    close={closeModal}
                    addFriend={addFriend}
                />

                {!smallScreenWidth && (
                    <MainButton
                        variant="contained"
                        onClick={openModal}
                        disableFocusRipple
                        id="add-friend-button"
                    >
                        Add a new friendpot
                    </MainButton>
                )}

                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "60%",
                        margin: "50px",
                        gap: "15px",
                    }}
                >
                    {friendPots}
                </Box>
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
