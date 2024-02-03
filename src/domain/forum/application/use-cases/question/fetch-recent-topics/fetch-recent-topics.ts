import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepository } from '../../../repositories/questions-repository'
import { Either, right } from '@/core/types/either'

interface FetchRecentTopicsUseCaseRequest {
  page: number
}

type FetchRecentTopicsUseCaseResponse = Either<null, { questions: Question[] }>

export class FetchRecentTopicsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page = 1,
  }: FetchRecentTopicsUseCaseRequest): Promise<FetchRecentTopicsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent(page)

    return right({ questions })
  }
}
