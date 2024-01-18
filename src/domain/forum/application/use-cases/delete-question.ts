import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface DeleteQuestionUseCaseRequest {
    id: string
    authorId: string
}

interface DeleteQuestionUseCaseResponse {
    question: Question
}

export class DeleteQuestionUseCase {
    constructor(private questionsRepository: QuestionsRepository) { }

    async execute({
        id,
        authorId
    }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
        const question = await this.questionsRepository.findById(id)

        if(authorId !== question?.authorId.toString())
            throw new Error('Not the question author')

        if (!question) throw new Error('Question not found')

        return {
            question,
        }
    }
}
