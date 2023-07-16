import fs from "fs";

interface StorageItem {
    id: string;
    userId?: string;
}

export class Store<T> {
    path;

    constructor(path: string) {
        this.path = path;
    }

    write(itemToStore: T): Promise<T> {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, "utf8", (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const allItems = JSON.parse(data);
                    allItems.push(itemToStore);

                    const allItemsJson = JSON.stringify(allItems);
                    fs.writeFileSync(this.path, allItemsJson);
                }
                resolve(itemToStore);
            });
        });
    }

    update<T extends StorageItem>(itemToUpdate: T): Promise<T> {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, "utf8", (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const allItems: StorageItem[] = JSON.parse(data);
                    const index = allItems.findIndex(
                        (item) => item.id === itemToUpdate.id
                    );
                    allItems[index] = itemToUpdate as StorageItem;
                    const allItemsJson = JSON.stringify(allItems);
                    fs.writeFileSync(this.path, allItemsJson);
                }
                resolve(itemToUpdate);
            });
        });
    }

    read(id: string): Promise<T> {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, "utf8", (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const allItems = JSON.parse(data);
                    const itemToRetrieve: T = allItems.find(
                        (item: StorageItem) => item.id === id
                    );
                    resolve(itemToRetrieve);
                }
            });
        });
    }

    readByUser(id: string): Promise<T[]> {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, "utf8", (err, data) => {
                if (err) {
                    reject(new Error(`Error retrieving user friends, ${err.message}`));
                } else {
                    const allItems = JSON.parse(data);
                    const itemsToRetrieve: T[] = allItems.filter(
                        (item: StorageItem) => item.userId === id
                    );
                    resolve(itemsToRetrieve);
                }
            });
        });
    }
}
