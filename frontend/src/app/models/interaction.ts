import { User } from './users';
import { Blog } from './blog';

export class Interaction {
    id!: number;
    InteractionType: string; //(like, dislike, report)
    userId: User;
    timestamp: Date;
    blogId: Blog;
    // commentId: (0 if blog interaction) **resolve this

}