import { Box, Typography } from "@mui/material";

export const FriendPot = (props: { name: string }): JSX.Element => {
    return (
        <Box
           id={`friendpot`}
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
                {props.name}
            </Typography>
        </Box>
    );
};
