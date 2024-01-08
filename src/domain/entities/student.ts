import { Entity } from "../../core/entities/entity"

interface StudentProps {
    name: string
    createdAt: Date
}

export class Student extends Entity<StudentProps> {
    get name() {
        return this.props.name
    }
}