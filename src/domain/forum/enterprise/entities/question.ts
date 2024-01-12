import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Slug } from './value-objects/slug'
import dayjs from 'dayjs'

interface QuestionProps {
  title: string
  content: string
  slug: Slug
  bestAnswerId?: UniqueEntityId
  authorId: UniqueEntityId
  createdAt: Date
  updatedAt: Date
}

export class Question extends Entity<QuestionProps> {
  private touch() {
    this.props.updatedAt = new Date()
  }

  get title() {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  get content() {
    return this.props.content
  }

  get slug() {
    return this.props.slug
  }

  get bestnAswerId() {
    return this.props.bestAnswerId
  }

  get authorId() {
    return this.props.authorId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') < 3
  }

  static create(
    props: Optional<QuestionProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const question = new Question(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return question
  }
}
