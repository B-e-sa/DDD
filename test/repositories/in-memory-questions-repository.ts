import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
    public Items: Question[] = []

    async create(question: Question): Promise<Question | null> {
        this.Items.push(question)

        return question
    }

    async findManyRecent(page: number): Promise<Question[]> {
        const questions = this.Items
            .sort((a, b) => (
                b.createdAt.getTime() - a.createdAt.getTime()
            ))
            .slice((page - 1) * 20, page * 20)

        return questions
    }

    async update(question: Question): Promise<Question | null> {
        const questionIndex = this.Items.findIndex(item => (
            item.id === question.id
        ))

        if (!questionIndex) return null

        return this.Items[questionIndex] = question
    }

    async delete(question: Question): Promise<Question | null> {
        const questionIndex = this.Items.findIndex(item => (
            item.id === question.id
        ))

        if (questionIndex === -1) return null

        const deletedQuestion = this.Items[questionIndex]

        this.Items.splice(questionIndex, 1)

        return deletedQuestion
    }

    async findById(id: string): Promise<Question | null> {
        const foundQuestion = this.Items.find(item => (
            item.id.toString() === id
        ))

        if (!foundQuestion) return null

        return foundQuestion
    }

    async findBySlug(slug: string): Promise<Question | null> {
        const question = this.Items.find(item => (
            item.slug.value === slug
        ))

        if (!question) return null

        return question
    }
}