import { useState } from "react";
import './newFriendForm.css'

type NewFriendFormProps = {
    onSubmit: (e: any) => Promise<void>;
};

export const NewFriendForm = ({ onSubmit }: NewFriendFormProps) => {
    const [name, setName] = useState("");

    return (
        <form onSubmit={onSubmit}>
            <div className="formInput">
                <label>Name: </label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    minLength={0}
                    required
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <button id='addButton'>Add</button>
        </form>
    );
};

