import { Button, ButtonProps, styled } from '@mui/material';

export const AddFriendButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: "black",
    backgroundColor: "#ffffff",
    "&:hover": {
        backgroundColor: "#bec5b7",
    },
}));
