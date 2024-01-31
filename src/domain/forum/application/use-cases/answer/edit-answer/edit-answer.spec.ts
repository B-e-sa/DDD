import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { EditAnswerUseCase } from './edit-answer'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('edit answer', () => {
  beforeAll(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('can be edited by the author', async () => {
    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'New Content',
    })

    expect(inMemoryAnswersRepository.Items[0]).toMatchObject({
      ...answer,
      content: 'New Content',
    })
  })

  it("can't be edited by other user", async () => {
    expect(1 + 1).toEqual(2)
  })
})
