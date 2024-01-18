import { makeQuestion } from "test/factories/make-question"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { GetQuestionBySlugUseCase } from "./get-question-by-slug"
import { DeleteQuestionUseCase } from "./delete-question"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe("Delete Question", () => {
    beforeAll(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
    })

    it("can delete question", async () => {
        const newQuestion = makeQuestion()

        inMemoryQuestionsRepository.create(newQuestion)

        await sut.execute({
            id: newQuestion.id.toString(),
            authorId: newQuestion.authorId.toString()
        })

        expect(inMemoryQuestionsRepository.Items).toHaveLength(0)
    })

    it("should only be deleted by the author", async () => {
        const newQuestion = makeQuestion({
            authorId: new UniqueEntityId('author-1')
        })

        await inMemoryQuestionsRepository.create(newQuestion)

        expect(() => {
            return sut.execute({
                id: 'question-1',
                authorId: 'author-2'
            })
        })

        expect(inMemoryQuestionsRepository.Items).toHaveLength(0)
    })
})