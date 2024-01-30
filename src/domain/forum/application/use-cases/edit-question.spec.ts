import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Delete Question', () => {
    beforeAll(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
    })

    it('can be edited by the author', async () => {
        const newQuestion = makeQuestion()

        inMemoryQuestionsRepository.create(newQuestion)

        await sut.execute({
            authorId: newQuestion.authorId.toString(),
            questionId: newQuestion.id.toString(),
            content: "New Content",
            title: "New title",
        })

        expect(inMemoryQuestionsRepository.Items[0]).toMatchObject({
            ...newQuestion,
            content: "New Content",
            title: "New title"
        })
    })

    it("can't be edited by other user", async () => {
        const newQuestion = makeQuestion()

        await inMemoryQuestionsRepository.create(newQuestion)
        
        expect(async () => {
            return await sut.execute({
                authorId: new UniqueEntityId().toString(),
                questionId: newQuestion.id.toString(),
                content: "New Content",
                title: "New title",
            })
        }).rejects.toBeInstanceOf(Error)
    })
})
