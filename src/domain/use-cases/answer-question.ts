import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { Answer } from "../entities/answer"
import { AnswersRepository } from "../repositories/answers-repository"

interface AnswerQuestionUseCaseRequest {
    teacherId: string
    questionId: string
    content: string
}

export class AnswerQuestionUseCase {
    constructor(
        private answersRepository: AnswersRepository
    ) { }

    execute({
        teacherId,
        questionId,
        content,
    }: AnswerQuestionUseCaseRequest) {
        const answer = Answer.create({
            content,
            authorId: new UniqueEntityId(teacherId),
            questionId: new UniqueEntityId(questionId)
        })

        return answer
    }
}