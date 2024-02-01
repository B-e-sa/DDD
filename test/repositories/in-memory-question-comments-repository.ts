import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {
    public Items: QuestionComment[] = []

    async create(questionComment: QuestionComment) {
        this.Items.push(questionComment)

        return questionComment;
    }
}