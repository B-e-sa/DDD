import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { Question } from "../../enterprise/entities/question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe("Get Question By Slug", () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new GetQuestionBySlugUseCase(
            inMemoryQuestionsRepository
        )
    })

    it('can find question by slug', async () => {
        const newQuestion = Question.create({
            title: "Example question",
            slug: Slug.create("example-question"),
            authorId: new UniqueEntityId("1"),
            content: "Example content"
        })

        await inMemoryQuestionsRepository.create(
            newQuestion
        )

        const { question } = await sut.execute({
            slug: 'Some Slug Text',
        })

        expect(question.id).toBeTruthy()

        expect(inMemoryQuestionsRepository.Items[0].id)
            .toEqual(question.id)

            expect(question.title).toEqual(newQuestion.title)
    })
})