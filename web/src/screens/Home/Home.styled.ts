import { Button, ButtonProps, Fab, FabProps, styled } from "@mui/material";

export const MainButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
        backgroundColor: "#4b2c20",
    },
    fontFamily: "Sue Ellen Francisco",
    fontSize: 25,
    margin: "10px",
}));
