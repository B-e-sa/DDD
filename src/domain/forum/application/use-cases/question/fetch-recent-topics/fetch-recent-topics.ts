import { Question } from "@/domain/forum/enterprise/entities/question";
import { QuestionsRepository } from "../../../repositories/questions-repository";

interface FetchRecentTopicsUseCaseRequest {
    page: number
}

interface FetchRecentTopicsUseCaseResponse {
    questions: Question[]
}

export class FetchRecentTopicsUseCase {
    constructor(private questionsRepository: QuestionsRepository) { }

    async execute({
        page = 1
    }: FetchRecentTopicsUseCaseRequest): Promise<FetchRecentTopicsUseCaseResponse> {
        const questions = await this.questionsRepository.findManyRecent(
            page
        )

        return { questions }
    }
}