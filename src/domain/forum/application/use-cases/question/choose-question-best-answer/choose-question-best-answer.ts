import { Either, left, right } from '@/core/types/either'
import { Question } from '../../../../enterprise/entities/question'
import { AnswersRepository } from '../../../repositories/answers-repository'
import { QuestionsRepository } from '../../../repositories/questions-repository'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'
import { UnauthorizedError } from '../../errors/unauthorized-error'

interface ChooseQuestionBestAnswerUseCaseRequest {
  answerId: string
  questionAuthorId: string
}

type ChooseQuestionBestAnswerUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorizedError,
  {
    question: Question
  }
>

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

    if (!answer) return left(new ResourceNotFoundError('Answer not found'))

    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) return left(new ResourceNotFoundError('Question not found'))

    if (questionAuthorId !== question.authorId.toString())
      return left(new UnauthorizedError('Not the question author'))

    question.bestAnswerId = answer.id

    this.questionsRepository.update(question)

    return right({ question })
  }
}
