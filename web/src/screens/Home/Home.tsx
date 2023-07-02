import axios from "axios";
import { ReactElement, useCallback, useEffect, useState } from "react";
import "./Home.styled";
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { MainButton } from "./Home.styled";
import { FriendPot } from "./components/FriendPot";
import { AddFriendFormDialog } from "./components/AddFriendFormDialog";
import { StatusSnackbar } from "../../molecules/StatusSnackbar/StatusSnackbar";
import { LoginDialog } from "./components/LoginDialog";
import { Friend } from "./Home.types";
import { API_ENDPOINT } from '../../environment';

export const Home = (): ReactElement => {
    const { palette, breakpoints } = useTheme();

    const [userId, setUserId] = useState("");
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [friends, setFriends] = useState<Friend[] | null>();
    const [snackbarStatus, setSnackbarStatus] = useState<string>();
    const [snackBarIsOpen, setSnackbarIsOpen] = useState(false);

    const smallScreenWidth = useMediaQuery(breakpoints.down("sm"));

    const addFriend = async (name: string, careLevel: string) => {
        const newFriend: Friend = {
            userId,
            name,
            careLevel,
        };

        try {
            const { data: addedFriend } = await axios.post(
                `${API_ENDPOINT}/friends`,
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
                    `${API_ENDPOINT}/friends?userId=${userId}`
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
            <Grid item xs={6} md={4} key={friend.id}>
                <FriendPot
                    id={friend.id || ""}
                    userId={userId}
                    name={friend.name}
                    state={friend.state}
                    careLevel={friend.careLevel}
                    getFriends={getFriends}
                />
            </Grid>
        );
    });

    return (
        <Grid
            container
            direction={"column"}
            justifyContent={"center"}
            sx={{
                backgroundColor: "#7cb342",
            }}
        >
            <LoginDialog
                isOpen={isLoginModalOpen}
                close={closeLoginModal}
                saveUserId={setUserId}
            />
            <AddFriendFormDialog
                isOpen={modalIsOpen}
                close={closeModal}
                addFriend={addFriend}
            />

            <Grid
                container
                item
            >
                <Grid
                    container
                    item
                    position="fixed"
                    sx={{
                        backgroundColor: smallScreenWidth ? palette.secondary.main : '',
                        zIndex: 2,
                    }}
                >
                    <Grid item xs={5}>
                        <MainButton id={"logout-button"} onClick={logout}>
                            Log out
                        </MainButton>
                    </Grid>

                    {smallScreenWidth && (
                        <Grid item xs={7}>
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
            </Grid>

            <Grid item alignSelf={"center"} sx={{ paddingTop: 15 }}>
                <Typography
                    variant="h1"
                    gutterBottom
                    fontFamily="Sue Ellen Francisco"
                    fontSize={smallScreenWidth ? 100 : 150}
                    color={palette.secondary.main}
                >
                    FriendPots
                </Typography>
            </Grid>

            {!smallScreenWidth && (
                <Grid item alignSelf={"center"}>
                    <MainButton
                        variant="contained"
                        onClick={openModal}
                        disableFocusRipple
                        id="add-friend-button"
                    >
                        Add a new friendpot
                    </MainButton>
                </Grid>
            )}

            <Grid container item flexWrap={"wrap"} spacing={2}>
                {friendPots}
            </Grid>

            <StatusSnackbar
                isOpen={snackBarIsOpen}
                handleSnackbarClose={handleSnackbarClose}
                status={snackbarStatus}
                successMsg={
                    "You have successfully added your new friend pot! 🎉"
                }
            />
        </Grid>
    );
};
