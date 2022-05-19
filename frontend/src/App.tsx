import axios from "axios";
import React, { useState } from "react";
import "./App.css";

function App() {
    const [name, setName] = useState("");

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

    return (
        <div className="App">
            <div className="App-header">
                <h1 id="header-text">FriendPots</h1>
            </div>
            <div>
                <form onSubmit={addFriend}>
                    <label>
                        Enter your friend's name:
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <input type="submit" value="Add" />
                </form>
            </div>
        </div>
    );
}

export default App;
