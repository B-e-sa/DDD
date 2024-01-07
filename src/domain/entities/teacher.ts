import { Entity } from "../../core/entities/entity";

interface TeacherProps {
    name: string
}

export class Teacher extends Entity<TeacherProps> {
    get name() {
        return this.props.name
    }
}