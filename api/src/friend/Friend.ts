import { Friends } from "./Friends";

export class Friend {
    id;
    userId;
    name;
    hardiness;
    dateOfFullHealth;
    state;

    constructor(
        id: string,
        userId: string,
        name: string,
        hardiness: string,
        dateOfFullHealth: string,
        state: string
    ) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.hardiness = hardiness;
        this.dateOfFullHealth = dateOfFullHealth;
        this.state = state;
    }

    currentState(): FriendState {
        const currentDate = new Date().valueOf();
        const dateOfLastFullHealth = Date.parse(this.dateOfFullHealth);

        const numberOfDaysPassed =
            (currentDate - dateOfLastFullHealth) / (1000 * 60 * 60 * 24);

        if (numberOfDaysPassed >= Number(this.hardiness)) {
            return FriendState.UNHEALTHY;
        } else {
            return FriendState.HEALTHY;
        }
    }

    async water(): Promise<void> {
        this.state = FriendState.HEALTHY;

        const friends = new Friends();
        const currentDate = new Date().toISOString();

        await friends.update({ ...this, dateOfFullHealth: currentDate });
    }
}

export enum FriendState {
    HEALTHY = "Healthy",
    UNHEALTHY = "Unhealthy",
}
