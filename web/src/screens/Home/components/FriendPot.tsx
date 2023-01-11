import { Box, Button, Typography } from "@mui/material";
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
            const { data: wateredFriend } = await axios.post(`friends/${id}/water`);
            setFriendPot(wateredFriend);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box id={id}>
            <Typography
                variant="h5"
                sx={{ color: friendPotColor() }}
                component="div"
                gutterBottom
                fontFamily="Sue Ellen Francisco"
                fontSize={50}
                role={"friend-name"}
            >
                {friendPot.name}
            </Typography>
            <Typography
                variant="h6"
                sx={{ color: friendPotColor() }}
                component="div"
                gutterBottom
                fontFamily="Sue Ellen Francisco"
                fontSize={30}
                role={"friend-hardiness"}
            >
                {friendPot.hardiness}
            </Typography>

            {friendPot.state === FriendPotState.UNHEALTHY && (
                <Button id="water-button" onClick={setFriendPotToHealthy}>
                    Water me!
                </Button>
            )}
        </Box>
    );
};
