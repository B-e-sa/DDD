import { Either, left, right } from '@/core/types/either'
import { Question } from '../../../../enterprise/entities/question'
import { QuestionsRepository } from '../../../repositories/questions-repository'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'
import { UnauthorizedError } from '../../errors/unauthorized-error'

interface EditQuestionUseCaseRequest {
  questionId: string
  authorId: string
  title: string
  content: string
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorizedError,
  {
    question: Question
  }
>

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) return left(new ResourceNotFoundError('Question not found'))

    if (authorId !== question.authorId.toString())
      return left(new UnauthorizedError('Not the question author'))

    question.title = title
    question.content = content

    await this.questionRepository.update(question)

    return right({ question })
  }
}
