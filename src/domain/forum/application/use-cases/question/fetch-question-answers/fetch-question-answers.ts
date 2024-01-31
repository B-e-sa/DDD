import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { AnswersRepository } from "../../../repositories/answers-repository";

interface FetchQuestionsAnswersUseCaseRequest {
    questionId: string
}

interface FetchRecentTopicsUseCaseResponse {
    answers: Answer[]
}

export class FetchQuestionAnswersUseCase {
    constructor(private answersRepository: AnswersRepository) { }

    async execute({
        questionId
    }: FetchQuestionsAnswersUseCaseRequest): Promise<FetchRecentTopicsUseCaseResponse> {
        const answers = await this.answersRepository.findManyByQuestionId(
            questionId
        )

        return { answers }
    }
}