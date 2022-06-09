import { Snackbar, Alert, AlertTitle } from '@mui/material';
import { ReactElement } from 'react';

export type StatusSnackbarProps = {
    isOpen: boolean;
    handleSnackbarClose: () => void;
    isError: boolean;
    errorMsg?: string;
    successMsg?: string;
    autoHideDuration?: number;
};

export const StatusSnackbar = ({
    isOpen,
    handleSnackbarClose,
    isError,
    errorMsg,
    successMsg,
    autoHideDuration = 6000,
}: StatusSnackbarProps): ReactElement => {
    const errorText =
        errorMsg ?? "Something went wrong 🥺 Please try again soon!";

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
