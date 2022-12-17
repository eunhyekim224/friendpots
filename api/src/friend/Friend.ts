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
        dateOfFullHealth: Date,
        state: string
    ) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.hardiness = hardiness;
        this.dateOfFullHealth = dateOfFullHealth;
        this.state = state;
    }

    get() {
        
    }
}

export enum FriendState {
    HEALTHY = "Healthy",
    UNHEALTHY = "Unhealthy",
}