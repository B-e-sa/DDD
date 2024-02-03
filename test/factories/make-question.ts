import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question, QuestionProps } from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";
import { faker } from "@faker-js/faker"

/**
 * 
 * @description Creates a new Question entity
 * 
 * @returns
 * ```typescript
 * Question.create({
 *  authorId: new UniqueEntityId(),
 *       title: "Example Slug",
 *       slug: Slug.create("example-slug"),
 *       content: "Some content"
 * })
 * ```
 * 
 * @example
 * ```typescript
 * const question = makeQuestion()
 * ```
 */
export function makeQuestion(
    override: Partial<QuestionProps> = {},
) {
    const question = Question.create({
        authorId: new UniqueEntityId(),
        title: faker.lorem.sentence(),
        content: faker.lorem.text(),
        slug: Slug.create("example-slug"),
        createdAt: new Date(),
        ...override
    })

    return question
}