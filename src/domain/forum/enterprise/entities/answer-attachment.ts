import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface AnswerAttachmentProps {
    answerId: UniqueEntityId
    attachmentId: UniqueEntityId
}

export class AnswerAttachment extends Entity<AnswerAttachment> {
    
}