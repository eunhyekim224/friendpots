import axios from "axios";
import { ReactElement, useCallback, useEffect, useState } from "react";
import "./Home.css";
import { NewFriendForm } from "../components/newFriendForm";
import Modal from "react-modal";
import {
    Button,
    ButtonProps,
    styled,
    Typography,
    useTheme,
} from "@mui/material";
import { green, orange, purple } from "@mui/material/colors";

type Friend = {
    id?: string;
    name: string;
};

function Home(): ReactElement {
    const theme = useTheme();
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

    const AddFriendButton = styled(Button)<ButtonProps>(({ theme }) => ({
        color: "black",
        backgroundColor: "#ffffff",
        "&:hover": {
            backgroundColor: "#bec5b7",
        },
    }));

    return (
        <div className="App">
            <div className="App-header">
                <Typography variant="h1" component="div" gutterBottom>
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
        </div>
    );
}

export default Home;