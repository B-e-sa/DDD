import { makeQuestion } from "test/factories/make-question"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { DeleteQuestionUseCase } from "./delete-question"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe("Delete Question", () => {
    beforeAll(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
    })

    it("can be deleted by the author", async () => {
        const newQuestion = makeQuestion()

        inMemoryQuestionsRepository.create(newQuestion)

        await sut.execute({
            id: newQuestion.id.toString(),
            authorId: newQuestion.authorId.toString()
        })

        expect(inMemoryQuestionsRepository.Items).toHaveLength(0)
    })

    it("can't be deleted by other user", async () => {
        const newQuestion = makeQuestion()

        await inMemoryQuestionsRepository.create(newQuestion)

        expect(async () => {
            return await sut.execute({
                id: newQuestion.id.toString(),
                authorId: new UniqueEntityId().toString()
            })
        })
            .rejects
            .toBeInstanceOf(Error)
    })
})