import axios from "axios";
import { ReactElement, useCallback, useEffect, useState } from "react";
import "./Home.styled";
import { NewFriendForm } from "../components/newFriendForm";
import Modal from "react-modal";
import { Box, Typography, useTheme } from "@mui/material";
import { AddFriendButton } from "./Home.styled";

type Friend = {
    id?: string;
    name: string;
};

function Home(): ReactElement {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newFriendId, setNewFriendId] = useState();
    const [newFriend, setNewFriend] = useState<null | Friend>();

    const addFriend = async (event: any) => {
        event.preventDefault();

        const name = event.target.name.value;
        const newFriend: Friend = {
            name,
        };

        try {
            const { data: addedFriend } = await axios.post(
                "/friends",
                newFriend
            );
            setNewFriendId(addedFriend.id);
        } catch (err) {
            console.error("Failed to create new friend", err);
        }
    };

    const getNewFriend = useCallback(
        async (friendId: string) => {
            try {
                const { data: friend } = await axios.get(`friends/${friendId}`);
                console.log("getNewFriend end");
                setNewFriend(friend);
            } catch (err) {
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

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    return (
        <Box sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'green',
        }}>
            <div className="App-header">
                <Typography
                    variant="h1"
                    component="div"
                    gutterBottom
                >
                    FriendPots
                </Typography>
            </div>
            <div>
                <AddFriendButton variant="contained" onClick={openModal}>
                    Add a new friend
                </AddFriendButton>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="New Friend Modal"
                    className="modal"
                    overlayClassName="modal-overlay"
                >
                    <div>
                        <NewFriendForm onSubmit={addFriend}></NewFriendForm>
                    </div>
                    <button onClick={closeModal}>close</button>
                </Modal>
            </div>
            {newFriend && (
                <div>
                    <Typography variant="h3" component="div" gutterBottom>
                        Your new FriendPot:
                    </Typography>
                    <Typography variant="body1" component="div" gutterBottom>
                        {newFriend.name}
                    </Typography>
                </div>
            )}
        </Box>
    );
}

export default Home;
