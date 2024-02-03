import { Either, left, right } from '@/core/types/either'
import { Question } from '../../../../enterprise/entities/question'
import { QuestionsRepository } from '../../../repositories/questions-repository'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'
import { UnauthorizedError } from '../../errors/unauthorized-error'

interface DeleteQuestionUseCaseRequest {
  id: string
  authorId: string
}

type DeleteQuestionUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorizedError,
  {
    question: Question
  }
>

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    id,
    authorId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(id)

    if (!question) return left(new ResourceNotFoundError('Question not found'))

    if (authorId !== question.authorId.toString())
      return left(new UnauthorizedError('Not the question author'))

    await this.questionsRepository.delete(question)

    return right({ question })
  }
}
