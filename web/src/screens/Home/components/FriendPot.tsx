import { Close } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { border } from "@mui/system";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Friend, FriendPotProps, FriendPotState } from "../Home.types";

export const FriendPot = ({
    id,
    userId,
    name,
    state,
    hardiness,
}: FriendPotProps): JSX.Element => {
    const friend = {
        id,
        userId,
        name,
        state,
        hardiness,
    };
    const [friendPot, setFriendPot] = useState(friend);

    const friendPotColor = () => {
        switch (friendPot.state) {
            case FriendPotState.HEALTHY:
                return "green";
            case FriendPotState.UNHEALTHY:
                return "red";
            default:
                return "black";
        }
    };

    const setFriendPotToHealthy = async () => {
        try {
            const { data: wateredFriend } = await axios.post(
                `friends/${id}/water`
            );
            setFriendPot(wateredFriend);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box
            id={id}
            sx={{
                border: `solid 1px #804545`,
                borderRadius: "50px",
                padding: "10px",
                textAlign: "center",
            }}
        >
            <Button
                sx={{
                    marginLeft: "100px",
                }}
            >
                <Close
                    sx={{
                        color: "#804545",
                    }}
                ></Close>
            </Button>

            <Typography
                variant="h5"
                sx={{ color: 'green' }}
                component="div"
                gutterBottom
                fontFamily="Sue Ellen Francisco"
                fontSize={50}
                role={"friend-name"}
            >
                {friendPot.name}
                {friendPot.state === FriendPotState.HEALTHY ? "🪴" : "🥀"}
            </Typography>

            {friendPot.state === FriendPotState.UNHEALTHY && (
                <Button id="water-button" onClick={setFriendPotToHealthy}>
                    <Typography fontSize={20} fontFamily="Sue Ellen Francisco">
                        Needs water 💧
                    </Typography>
                </Button>
            )}
        </Box>
    );
};
