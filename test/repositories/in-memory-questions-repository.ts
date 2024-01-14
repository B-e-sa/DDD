import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
    public Items: Question[] = []

    async findBySlug(slug: string): Promise<Question | null> {
        const question = this.Items.find(i => (
            i.slug.value === slug
        ))

        if (!question) return null

        return question
    }

    async create(question: Question) {
        this.Items.push(question)
    }
}