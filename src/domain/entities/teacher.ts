import { randomUUID } from "node:crypto";

export class Teacher {
    public id: string
    public name: string

    constructor(name: string, id?: string) {
        this.name = name
        this.id = id ?? randomUUID()
    }
}