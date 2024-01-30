import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface EditQuestionUseCaseRequest {
    questionId: string
    authorId: string
    title: string
    content: string
}

interface EditQuestionUseCaseResponse {
    question: Question
}

export class EditQuestionUseCase {
    constructor(private questionRepository: QuestionsRepository) { }

    async execute({
        authorId,
        questionId,
        title,
        content
    }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
        const question = await this.questionRepository.findById(questionId)

        if (!question)
            throw new Error('Question not found')

        if (authorId !== question.authorId.toString())
            throw new Error('Not the question author')

        question.title = title
        question.content = content

        await this.questionRepository.update(question)

        return { question }
    }
}
