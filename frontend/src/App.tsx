import axios from "axios";
import React, { useState } from "react";
import "./App.css";
import { NewFriendForm } from "./components/newFriendForm";
import Modal from "react-modal";

function App() {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const addFriend = async (event: any) => {
        event.preventDefault();

        const name = event.target.name.value

        const newFriend = {
            name
        }

        try {
            const { data: addedFriend } = await axios.post("/friends", newFriend);
            alert(`Your friend, ${addedFriend.name}, has just been planted!`);
        } catch (err) {
            console.error(err);
        }
    };

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
        </div>
    );
}

export default App;
