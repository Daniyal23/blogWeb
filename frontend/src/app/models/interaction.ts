import { User } from './users';
import { Blog } from './blog';

export class Interaction {
    id!: number;
    InteractionType: string; //(like, dislike, report)
    userId: string;
    timestamp: Date;
    blogId: string;
    // commentId: (0 if blog interaction) **resolve this

}