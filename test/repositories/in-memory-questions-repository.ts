import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
    public Items: Question[] = []

    async create(question: Question): Promise<Question | null> {
        this.Items.push(question)

        return question
    }

    async delete(question: Question): Promise<Question | null> {
        const questionIndex = this.Items.findIndex(foundQuestion => (
            foundQuestion.id === question.id
        ))

        const deletedQuestion = this.Items[questionIndex]

        this.Items.splice(questionIndex, 1)

        return deletedQuestion
    }

    async findById(id: string): Promise<Question | null> {
        const foundQuestion = this.Items.find(foundQuestion => (
            foundQuestion.id.toString() === id
        ))

        if (!foundQuestion) return null

        return foundQuestion
    }

    async findBySlug(slug: string): Promise<Question | null> {
        const question = this.Items.find(i => (
            i.slug.value === slug
        ))

        if (!question) return null

        return question
    }
}