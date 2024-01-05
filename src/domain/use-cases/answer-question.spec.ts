import { test, expect } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'

test('create an answer', () => {
    const answerQuestion = new AnswerQuestionUseCase()

    const answer = answerQuestion.execute({
        content: "Resposta",
        instructorId: "1",
        questionId: "1"
    })

    expect(answer.content).toEqual('Resposta')
})