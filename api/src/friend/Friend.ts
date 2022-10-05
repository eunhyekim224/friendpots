export class Friend {
    id;
    userId;
    name;

    constructor(id: string, userId: string, name?: string) {
        this.id = id;
        this.userId = userId;
        this.name = name;
    }
}
