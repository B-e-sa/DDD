import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
    public Items: Question[] = []

    async create(question: Question) {
        this.Items.push(question)
    }
}