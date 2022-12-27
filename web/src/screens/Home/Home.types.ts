export type Friend = {
    id?: string;
    userId: string;
    name: string;
    hardiness: string;
    state?: FriendPotState;
};

export type LoginDialogProps = {
    isOpen: boolean;
    close: () => void;
    saveUserId: (userId: string) => void;
};

export type FriendPotProps = {
    name: string;
    id: string;
    state?: FriendPotState;
    hardiness: string;
    key?: string;
};

export enum FriendPotState {
    HEALTHY = "Healthy",
    UNHEALTHY = "Unhealthy",
}