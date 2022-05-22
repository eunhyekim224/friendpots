import { useState } from "react";

type NewFriendFormProps = {
    onSubmit: (e: any) => Promise<void>;
};

export const NewFriendForm = ({ onSubmit }: NewFriendFormProps) => {
    const [name, setName] = useState("");

    return (
        <form onSubmit={onSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <input type="submit" value="Add" />
        </form>
    );
};

