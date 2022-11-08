export class Friend {
    id;
    userId;
    name;
    hardiness;
    state;

    constructor(id: string, userId: string, name?: string, hardiness?: string, state?: string) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.hardiness = hardiness;
        this.state = state;
    }
}
