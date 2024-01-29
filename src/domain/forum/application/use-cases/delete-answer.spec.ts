import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { DeleteAnswerUseCase } from './delete-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Question', () => {
  beforeAll(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('can be deleted by the author', async () => {
    const answer = makeAnswer()

    inMemoryAnswersRepository.create(answer)

    await sut.execute({
      id: answer.id.toString(),
      authorId: answer.authorId.toString(),
    })

    expect(inMemoryAnswersRepository.Items).toHaveLength(0)
  })

  it("can't be deleted by other user", async () => {
    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)

    expect(async () => {
      return await sut.execute({
        id: answer.id.toString(),
        authorId: new UniqueEntityId().toString(),
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
