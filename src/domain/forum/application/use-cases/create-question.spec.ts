import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create question', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      content: '1',
      title: 'New Title',
    })

    expect(question.id).toBeTruthy()

    const inMemoryQuestion = inMemoryQuestionsRepository.Items[0].id

    expect(inMemoryQuestion).toEqual(question.id)
  })
})