import { Close } from "@mui/icons-material";
import { Box, Button, Typography, useTheme } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Friend, FriendPotProps, FriendPotState } from "../Home.types";
import { API_ENDPOINT } from '../../../environment';

export const FriendPot = ({
    id,
    userId,
    name,
    state,
    careLevel,
    getFriends,
}: FriendPotProps): JSX.Element => {
    const { palette } = useTheme();
    
    const friend = {
        id,
        userId,
        name,
        state,
        careLevel,
    };
    const [friendPot, setFriendPot] = useState<Friend | undefined>(friend);

    const setFriendPotToHealthy = async () => {
        try {
            const { data: wateredFriend } = await axios.post(
                `${API_ENDPOINT}/friends/${id}/water`
            );
            setFriendPot(wateredFriend);
        } catch (error) {
            console.log(error);
        }
    };

    const archiveFriend = async () => {
        try {
            //@TODO: add a confirmation modal
            const canProceed = confirm(
                "You will not be able to undo this action. Are you sure you want to proceed?"
            );
            if (canProceed) {
                await axios.post(`friends/${id}/archive`);

                await getFriends(userId);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box
            id={id}
            sx={{
                borderRadius: "50px",
                padding: "10px",
                textAlign: "center",
            }}
        >
            <Button
                sx={{
                    marginLeft: "100px",
                }}
                onClick={archiveFriend}
                id={"delete-button"}
            >
                <Close
                    sx={{
                        color: palette.secondary.main,
                    }}
                ></Close>
            </Button>

            <Typography
                variant="h5"
                sx={{ color: palette.secondary.main }}
                component="div"
                gutterBottom
                fontFamily="Sue Ellen Francisco"
                fontSize={50}
                role={"friend-label"}
            >
                {friendPot?.name}
                {friendPot?.state === FriendPotState.HEALTHY ? "🪴" : "🥀"}
            </Typography>

            {friendPot?.state === FriendPotState.UNHEALTHY && (
                <Button id="water-button" onClick={setFriendPotToHealthy}>
                    <Typography fontSize={20} fontFamily="Sue Ellen Francisco">
                        Needs water 💧
                    </Typography>
                </Button>
            )}
        </Box>
    );
};
