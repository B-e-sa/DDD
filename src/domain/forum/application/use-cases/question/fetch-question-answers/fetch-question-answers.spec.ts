import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { makeQuestion } from 'test/factories/make-question'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch question answers', () => {
  beforeAll(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('can fetch answers', async () => {
    const question = makeQuestion()

    await inMemoryQuestionsRepository.create(question)

    const answersToMatch: Answer[] = []

    for (const _ of Array(5)) {
      const answer = makeAnswer({
        questionId: question.id,
      })

      await inMemoryAnswersRepository.create(answer)

      answersToMatch.push(answer)
    }

    const result = await sut.execute({
      questionId: question.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.answers).toEqual(answersToMatch)
  })
})
