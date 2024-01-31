import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
    public Items: Answer[] = []

    async findManyByQuestionId(questionId: string): Promise<Answer[]> {
        const answers = this.Items.filter(item => (
            item.questionId.toString() === questionId
        ))

        return answers
    }

    async delete(answer: Answer): Promise<Answer | null> {
        const answerIndex = this.Items.findIndex(item => (
            item.id === answer.id
        ))

        if (answerIndex === -1) return null

        const deletedAnswer = this.Items[answerIndex]

        this.Items.splice(answerIndex, 1)

        return deletedAnswer
    }

    async update(answer: Answer): Promise<Answer | null> {
        const answerIndex = this.Items.findIndex(item => (
            item.id === answer.id
        ))

        if (!answerIndex) return null

        return this.Items[answerIndex] = answer
    }

    async findById(id: string): Promise<Answer | null> {
        const foundAnswer = this.Items.find(item => (
            item.id.toString() === id
        ))

        if (!foundAnswer) return null

        return foundAnswer
    }

    async create(answer: Answer) {
        this.Items.push(answer)

        return answer;
    }
}