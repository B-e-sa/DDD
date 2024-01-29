import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Answer, AnswerProps } from "@/domain/forum/enterprise/entities/answer";
import { faker } from "@faker-js/faker";

/**
 * 
 * @description Creates a new Answer entity
 * 
 * @returns
 * ```typescript
 * Answer.create({
 *      authorId: new UniqueEntityId(),
 *      content: faker.lorem.text(),
 *      questionId: new UniqueEntityId(),
 * })
 * ```
 * 
 * @example
 * ```typescript
 * const answer = makeAnswer()
 * ```
 */
export function makeAnswer(
    override: Partial<AnswerProps> = {},
) {
    const question = Answer.create({
        authorId: new UniqueEntityId(),
        content: faker.lorem.text(),
        questionId: new UniqueEntityId(),
        ...override
    })

    return question
}