import { Snackbar, Alert, AlertTitle } from "@mui/material";
import { ReactElement } from "react";

export type StatusSnackbarProps = {
    isOpen: boolean;
    handleSnackbarClose: () => void;
    status?: string;
    errorMsg?: string;
    successMsg?: string;
    autoHideDuration?: number;
};

export const StatusSnackbar = ({
    isOpen,
    handleSnackbarClose,
    status,
    errorMsg,
    successMsg,
    autoHideDuration = 6000,
}: StatusSnackbarProps): ReactElement => {

    const isError = status === "error";
    const errorText =
        errorMsg ?? "Something went wrong 🥺 Please try again soon!";

    return (
        <Snackbar
            id="status-snackbar"
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
