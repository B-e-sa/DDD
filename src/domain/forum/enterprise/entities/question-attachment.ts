import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface QuestionAttachmentProps {
    questionId: UniqueEntityId
    attachmentId: UniqueEntityId
}

export class QuestionAttachment extends Entity<QuestionAttachment> {

}