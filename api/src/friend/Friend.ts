import { Friends } from "./Friends";

export class Friend {
    id;
    userId;
    name;
    hardiness;
    dateOfFullHealth;
    state;
    archived;

    constructor(
        id: string,
        userId: string,
        name: string,
        hardiness: string,
        dateOfFullHealth: string,
        state: string,
        archived?: boolean
    ) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.hardiness = hardiness;
        this.dateOfFullHealth = dateOfFullHealth;
        this.state = state;
        this.archived = archived
    }

    async currentState(): Promise<FriendState> {
        const currentDate = new Date().valueOf();
        const dateOfLastFullHealth = Date.parse(this.dateOfFullHealth);

        const numberOfDaysPassed =
            (currentDate - dateOfLastFullHealth) / (1000 * 60 * 60 * 24);

        if (numberOfDaysPassed >= Number(this.hardiness)) {
            const friends = new Friends();
            await friends.update({ ...this, state: FriendState.UNHEALTHY });
            return FriendState.UNHEALTHY;
        } else {
            return FriendState.HEALTHY;
        }
    }

    async water(): Promise<void> {
        const friends = new Friends();

        await friends.update({
            ...this,
            state: FriendState.HEALTHY,
            dateOfFullHealth: new Date().toISOString,
        });
    }

    async archive(): Promise<void> {
        const friends = new Friends();

        await friends.update({ ...this, archived: true });
    }
}

export enum FriendState {
    HEALTHY = "Healthy",
    UNHEALTHY = "Unhealthy",
}
