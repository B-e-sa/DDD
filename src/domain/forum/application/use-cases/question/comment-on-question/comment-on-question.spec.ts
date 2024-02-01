import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CommentOnQuestionUseCase

describe('Comment on question', () => {
    beforeEach(() => {
        inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new CommentOnQuestionUseCase(
            inMemoryQuestionsRepository,
            inMemoryQuestionCommentsRepository
        )
    })

    it('should be able to comment on question', async () => {
        const question = makeQuestion()

        await inMemoryQuestionsRepository.create(question)

        const { questionComment } = await sut.execute({
            authorId: new UniqueEntityId().toString(),
            content: "New Content",
            questionId: question.id.toString()
        })

        await inMemoryQuestionCommentsRepository.create(
            questionComment
        )

        expect(inMemoryQuestionCommentsRepository.Items[0])
            .toMatchObject(questionComment)
    })
})
