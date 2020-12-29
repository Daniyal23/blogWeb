import { User } from "./users";

export class Comment {
    id!: number;
    commentorId: string;
    title: string;
    content: string;
    likes: number;
    dislikes: number;
    interactionIdList: number;
    reportsCounter: number;
    datePublished: Date;
    dateUpdated: Date;
}

