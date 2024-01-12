import { AnswerQuestionUseCase } from './answer-question'
import { Answer } from '../entities/answer'
import { AnswersRepository } from '../repositories/answers-repository';

const fakeAnswersRepository: AnswersRepository = {
    create: async function (answer: Answer): Promise<void> {
        return;
    }
}

test('create an answer', async () => {
    const answerQuestion = new AnswerQuestionUseCase(
        fakeAnswersRepository
    )

    const answer = answerQuestion.execute({
        content: "Resposta",
        teacherId: "1",
        questionId: "1"
    })

    expect(answer.content).toEqual('Resposta')
})