import { Box, Typography } from "@mui/material";

type FriendPotProps = {
    name: string;
    id: string;
    key?: string;
};

export const FriendPot = ({id, name}: FriendPotProps): JSX.Element => {
    return (
        <Box
           id={id}
        >
            <Typography
                variant="h5"
                sx={{ marginTop: "100px" }}
                component="div"
                gutterBottom
                fontFamily="Sue Ellen Francisco"
                fontSize={50}
                role={"friend-name"}
            >
                {name}
            </Typography>
        </Box>
    );
};
