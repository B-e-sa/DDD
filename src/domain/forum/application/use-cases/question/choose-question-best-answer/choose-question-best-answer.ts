import { Question } from '../../../../enterprise/entities/question'
import { AnswersRepository } from '../../../repositories/answers-repository'
import { QuestionsRepository } from '../../../repositories/questions-repository'

interface ChooseQuestionBestAnswerUseCaseRequest {
  answerId: string
  questionAuthorId: string
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private questionsRepository: QuestionsRepository,
  ) {}

  async execute({
    answerId,
    questionAuthorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) throw new Error('Answer not found')

    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) throw new Error('Question not found')

    if (questionAuthorId !== question.authorId.toString())
      throw new Error('Not the question author')

    question.bestAnswerId = answer.id

    this.questionsRepository.update(question)

    return { question }
  }
}
