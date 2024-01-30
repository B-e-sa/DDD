import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface DeleteAnswerUseCaseRequest {
  id: string
  authorId: string
}

interface DeleteAnswerUseCaseResponse {
  answer: Answer
}

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) { }

  async execute({
    id,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse | null> {
    const answer = await this.answerRepository.findById(id)

    if (!answer) throw new Error('Answer not found')

    if (authorId !== answer.authorId.toString())
      throw new Error('Not the answer author')

    await this.answerRepository.delete(answer)

    return { answer }
  }
}
