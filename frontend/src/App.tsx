import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { NewFriendForm } from "./components/newFriendForm";
import Modal from "react-modal";

Modal.setAppElement("#root");

type Friend = {
    id?: string;
    name: string;
};

function App() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [newFriendId, setNewFriendId] = useState();
    const [newFriend, setNewFriend] = useState<null | Friend>();

    console.log(" state newFriendId", newFriendId);

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
            console.log("newFriendId", newFriendId);
        } catch (err) {
            console.error("Failed to create new friend", err);
        }
    };

    const getNewFriend = async () => {
        console.log("getNewFriend start");
        // try {
            const { data: friend } = await axios.get(`friends/${newFriendId}`);
                    console.log("getNewFriend end");

            console.log("friend retrieved", friend);

            setNewFriend(friend);
        // } catch (err) {
        //     console.error("Failed to fetch new friend", err);
        // }
    };

    useEffect(() => {
        if (!newFriend && newFriendId) {
            getNewFriend();
        }
    }, [getNewFriend, newFriend]);

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
                        <NewFriendForm
                            onSubmit={async (e) => await addFriend(e)}
                        ></NewFriendForm>
                    </div>
                    <button onClick={closeModal}>close</button>
                </Modal>
            </div>
            {newFriend && (
                <div>
                    <h2>Your New FriendPot!</h2>
                    <p>{newFriend.name}</p>
                </div>
            )}
        </div>
    );
}

export default App;
