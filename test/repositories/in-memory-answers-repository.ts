import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
    public Items: Answer[] = []

    async delete(answer: Answer): Promise<Answer | null> {
        const answerIndex = this.Items.findIndex(item => (
            item.id === answer.id
        ))

        const deletedAnswer = this.Items[answerIndex]

        this.Items.splice(answerIndex, 1)

        return deletedAnswer
    }

    async findById(id: string): Promise<Answer | null> {
        const foundAnswer = this.Items.find(item => (
            item.id.toString() === id
        ))

        if(!foundAnswer) return null

        return foundAnswer
    }

    async create(answer: Answer) {
        this.Items.push(answer)

        return answer;
    }
}