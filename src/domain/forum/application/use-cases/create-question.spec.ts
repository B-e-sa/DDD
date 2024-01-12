import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new CreateQuestionUseCase(
            inMemoryQuestionsRepository
        )
    })

    it('should be able to create question', async () => {
        const createdQuestion = new CreateQuestionUseCase(inMemoryQuestionsRepository)

        const { question } = await createdQuestion.execute({
            authorId: '1',
            content: '1',
            title: 'New Title',
        })

        expect(question.id).toBeTruthy()
        expect(
            inMemoryQuestionsRepository.Items[0].id
        ).toEqual(question.id)
    })
})