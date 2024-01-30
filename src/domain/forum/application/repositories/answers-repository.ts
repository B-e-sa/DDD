import { Answer } from '../../enterprise/entities/answer'

export interface AnswersRepository {
  create(answer: Answer): Promise<Answer | null>
  update(answer: Answer): Promise<Answer | null>
  delete(answer: Answer): Promise<Answer | null>
  findById(id: string): Promise<Answer | null>
}
