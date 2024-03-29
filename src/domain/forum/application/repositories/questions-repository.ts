import { Question } from '../../enterprise/entities/question'

export interface QuestionsRepository {
  create(question: Question): Promise<Question | null>
  update(question: Question): Promise<Question | null>
  delete(question: Question): Promise<Question | null>
  findById(id: string): Promise<Question | null>
  findBySlug(slug: string): Promise<Question | null>
  findManyRecent(page: number): Promise<Question[]>
}
