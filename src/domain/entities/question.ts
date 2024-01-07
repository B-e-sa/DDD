import { Entity } from "../../core/entities/entity"
import { Slug } from "./value-objects/slug"

interface QuestionProps {
    title: string
    content: string
    slug: Slug
    authorId: string
}

export class Question extends Entity<QuestionProps> {
    get content() {
        return this.props.content
    }
}