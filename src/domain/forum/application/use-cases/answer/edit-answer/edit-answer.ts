import { Answer } from '../../../../enterprise/entities/answer'
import { AnswersRepository } from '../../../repositories/answers-repository'

interface EditAnswerUseCaseRequest {
  answerId: string
  authorId: string
  content: string
}

interface EditAnswerUseCaseResponse {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse | null> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) throw new Error('Answer not found')

    if (authorId !== answer.authorId.toString())
      throw new Error('Not the answer author')

    answer.content = content

    await this.answerRepository.update(answer)

    return { answer }
  }
}
