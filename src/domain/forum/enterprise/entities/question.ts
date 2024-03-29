import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import dayjs from 'dayjs'
import { Slug } from './value-objects/slug'

export interface QuestionProps {
  title: string
  content: string
  slug: Slug
  bestAnswerId?: UniqueEntityId
  authorId: UniqueEntityId
  createdAt: Date
  updatedAt?: Date
}

export class Question extends AggregateRoot<QuestionProps> {
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

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get slug() {
    return this.props.slug
  }

  get bestAnswerId(): UniqueEntityId | undefined {
    return this.props.bestAnswerId
  }

  set bestAnswerId(answerId: UniqueEntityId) {
    this.props.bestAnswerId = answerId
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
    props: Optional<QuestionProps, 'updatedAt'>,
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
