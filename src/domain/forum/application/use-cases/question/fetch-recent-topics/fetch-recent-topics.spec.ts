import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { FetchRecentTopicsUseCase } from './fetch-recent-topics'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentTopicsUseCase

describe('Fetch recent topics', () => {
  beforeAll(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentTopicsUseCase(inMemoryQuestionsRepository)
  })

  it('can fetch recent questions', async () => {
    const questionsToMatch = []

    for (const _ of Array(5)) {
      const newQuestion = makeQuestion()

      await inMemoryQuestionsRepository.create(newQuestion)

      questionsToMatch.push(newQuestion)
    }

    const result = await sut.execute({
      page: 1,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.questions).toEqual(
      questionsToMatch.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
      ),
    )
  })

  it('can paginate fetched questions', async () => {})
})
