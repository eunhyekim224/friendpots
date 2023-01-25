import { Button, ButtonProps, styled } from "@mui/material";

export const AddFriendButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
        backgroundColor: "#4b2c20",
    },
    fontFamily: "Sue Ellen Francisco",
    fontSize: 30,
    textTransform: "lowercase",
}));

export const LogoutButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
        backgroundColor: "#4b2c20",
    },
    fontFamily: "Sue Ellen Francisco",
    fontSize: 30,
    textTransform: "lowercase",
}));