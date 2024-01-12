import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface TeacherProps {
  name: string
}

export class Teacher extends Entity<TeacherProps> {
  get name() {
    return this.props.name
  }

  static create(props: TeacherProps, id?: UniqueEntityId) {
    const student = new Teacher(props, id)

    return student
  }
}
