import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswersRepository } from '../../../repositories/answers-repository'
import { Either, right } from '@/core/types/either'

interface FetchQuestionsAnswersUseCaseRequest {
  questionId: string
}

type FetchRecentTopicsUseCaseResponse = Either<null, { answers: Answer[] }>

export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    questionId,
  }: FetchQuestionsAnswersUseCaseRequest): Promise<FetchRecentTopicsUseCaseResponse> {
    const answers =
      await this.answersRepository.findManyByQuestionId(questionId)

    return right({ answers })
  }
}
