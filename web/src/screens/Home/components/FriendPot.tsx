import { Box, Typography } from "@mui/material";
import { FriendPotProps, FriendPotState } from "../Home.types";

export const FriendPot = ({ id, name, state, hardiness }: FriendPotProps): JSX.Element => {
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
                {name}
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
                {hardiness}
            </Typography>
        </Box>
    );
};
