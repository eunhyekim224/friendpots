import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import "./Home.css";
import { NewFriendForm } from "../components/newFriendForm";
import Modal from "react-modal";

type Friend = {
    id?: string;
    name: string;
};

function Home() {
    const [modalIsOpen, setIsOpen] = useState(false);
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
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };

    return (
        <div className="App">
            <div className="App-header">
                <h1 id="header-text">FriendPots</h1>
            </div>
            <div>
                <button onClick={openModal}>Click to add a new friend</button>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                    style={customStyles}
                >
                    <div>
                        <NewFriendForm onSubmit={addFriend}></NewFriendForm>
                    </div>
                    <button onClick={closeModal}>close</button>
                </Modal>
            </div>
            {newFriend && (
                <div>
                    <h2>Your new FriendPot:</h2>
                    <p>{newFriend.name}</p>
                </div>
            )}
        </div>
    );
}

export default Home;
