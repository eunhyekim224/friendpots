import { Snackbar, Alert, AlertTitle } from "@mui/material";
import { ReactElement } from "react";

export type StatusSnackbarProps = {
    isOpen: boolean;
    handleSnackbarClose: () => void;
    // isError: boolean;
    status?: string;
    errorMsg?: string;
    successMsg?: string;
    autoHideDuration?: number;
};

export const StatusSnackbar = ({
    isOpen,
    handleSnackbarClose,
    // isError,
    status,
    errorMsg,
    successMsg,
    autoHideDuration = 6000,
}: StatusSnackbarProps): ReactElement => {

    const isError = status === "error";
    const errorText =
        errorMsg ?? "Something went wrong 🥺 Please try again soon!";

    // const handleSnackbarClose = (
    //     event?: React.SyntheticEvent | Event,
    //     reason?: string
    // ) => {
    //     if (reason === "clickaway") {
    //         return;
    //     }
    //     setSnackbarIsOpen(false);
    // };

    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={autoHideDuration}
            onClose={handleSnackbarClose}
        >
            {isError ? (
                <Alert severity="error" onClose={handleSnackbarClose}>
                    <AlertTitle>Error</AlertTitle>
                    {errorText}
                </Alert>
            ) : (
                <Alert severity="success" onClose={handleSnackbarClose}>
                    <AlertTitle>Success</AlertTitle>
                    {successMsg ?? ""}
                </Alert>
            )}
        </Snackbar>
    );
};
