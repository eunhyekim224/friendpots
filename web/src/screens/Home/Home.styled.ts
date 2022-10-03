import { Button, ButtonProps, styled } from "@mui/material";

export const AddFriendButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: "#9e9d24",
    backgroundColor: "#795548",
    "&:hover": {
        backgroundColor: "#4b2c20",
    },
    fontFamily: "Sue Ellen Francisco",
    fontSize: 30,
    textTransform: "lowercase",
}));

export const LogoutButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: "#9e9d24",
    backgroundColor: "#795548",
    "&:hover": {
        backgroundColor: "#4b2c20",
    },
    fontFamily: "Sue Ellen Francisco",
    fontSize: 30,
    textTransform: "lowercase",
}));