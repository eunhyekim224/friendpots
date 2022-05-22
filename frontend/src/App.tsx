import axios from "axios";
import React, { useState } from "react";
import "./App.css";
import { NewFriendForm } from "./components/newFriendForm";
import Modal from "react-modal";

function App() {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const addFriend = async (event: any) => {
        event.preventDefault();

        try {
            const { data: addedFriend } = await axios.post("/friends", {
                name,
            });
            alert(`Your friend, ${name}, has just been planted!`);
        } catch (err) {
            console.log(err);
        }
    };

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

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
