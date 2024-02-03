import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create question', async () => {
    const result = await sut.execute({
      authorId: '1',
      content: '1',
      title: 'New Title',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.question).toMatchObject(
      inMemoryQuestionsRepository.Items[0],
    )
  })
})
