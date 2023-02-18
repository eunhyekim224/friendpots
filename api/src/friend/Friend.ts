import { Friends } from "./Friends";

export class Friend {
    id;
    userId;
    name;
    careLevel;
    dateOfFullHealth;
    state;
    archived;

    constructor(
        id: string,
        userId: string,
        name: string,
        careLevel: string,
        dateOfFullHealth: string,
        state: string,
        archived?: boolean
    ) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.careLevel = careLevel;
        this.dateOfFullHealth = dateOfFullHealth;
        this.state = state;
        this.archived = archived;
    }

    waterFrequencyInDays(): number {
        switch (this.careLevel) {
            case "low":
                return 28;
            case "medium":
                return 14;
            case "high":
                return 7;
            default:
                return 28;
        }
    }

    async currentState(): Promise<FriendState> {
        const currentDate = new Date().valueOf();
        const dateOfLastFullHealth = Date.parse(this.dateOfFullHealth);

        const numberOfDaysSinceLastWatered =
            (currentDate - dateOfLastFullHealth) / (1000 * 60 * 60 * 24);

        if (numberOfDaysSinceLastWatered >= this.waterFrequencyInDays()) {
            const friends = new Friends();
            await friends.update({ ...this, state: FriendState.UNHEALTHY });
            return FriendState.UNHEALTHY;
        } else {
            return FriendState.HEALTHY;
        }
    }

    async water(): Promise<void> {
        this.state = FriendState.HEALTHY;
        this.dateOfFullHealth = new Date().toISOString();

        const friends = new Friends();

        await friends.update({
            ...this,
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
