import { Typography } from '@mui/material';

export const FriendPot = (props: { name: string }): JSX.Element => {
    return (
        <Typography
            variant="h5"
            sx={{ marginTop: "100px" }}
            component="div"
            gutterBottom
            fontFamily="Sue Ellen Francisco"
            fontSize={50}
        >
            {props.name}
        </Typography>
    );
};
