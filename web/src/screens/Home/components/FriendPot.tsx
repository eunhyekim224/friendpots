import { Box, Button, Typography } from "@mui/material";
import axios from 'axios';
import { useState } from 'react';
import { Friend, FriendPotProps, FriendPotState } from "../Home.types";

export const FriendPot = ({
    id,
    userId,
    name,
    state,
    hardiness,
}: FriendPotProps): JSX.Element => {

    const [friendPot, setFriendPot] = useState({id, userId, name, state, hardiness});

    const friendPotColor = () => {
        switch (state) {
            case FriendPotState.HEALTHY:
                return "green";
            case FriendPotState.UNHEALTHY:
                return "red";
            default:
                return "black";
        }
    };

    const setFriendPotToHealthy = async () => {
        const { data: friend } = await axios.post(`friends/${id}/water`);

        console.log('here')

        setFriendPot(friend);
    }

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
            <Button id="water-button" onClick={() => setFriendPotToHealthy()}>Water me!</Button>
        </Box>
    );
};
