import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
    public Items: Answer[] = []

    async create(answer: Answer) {
        this.Items.push(answer)
    }
}