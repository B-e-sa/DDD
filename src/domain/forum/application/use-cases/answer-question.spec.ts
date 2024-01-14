import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe("Create Answer", () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
    })

    it('should be able to create an answer', async () => {
        const { answer } = await sut.execute({
            content: 'Response',
            teacherId: '1',
            questionId: 'New Title',
        })

        expect(answer.content).toEqual('Response')
    })
})