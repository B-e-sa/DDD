import { Entity } from "../../core/entities/entity";

interface TeacherProps {
    name: string
    createdAt: Date
}

export class Teacher extends Entity<TeacherProps> {
    get name() {
        return this.props.name
    }
}