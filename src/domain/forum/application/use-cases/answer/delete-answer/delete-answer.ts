import { Either, left, right } from '@/core/types/either'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswersRepository } from '../../../repositories/answers-repository'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'
import { UnauthorizedError } from '../../errors/unauthorized-error'

interface DeleteAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

type DeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorizedError,
  {
    answer: Answer
  }
>

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse | null> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) return left(new ResourceNotFoundError())

    if (authorId !== answer.authorId.toString())
      return left(new UnauthorizedError())

    await this.answerRepository.delete(answer)

    return right({ answer })
  }
}
