import { User } from "./users";

export class Comment {
    id!: number;
    commentorId: string;
    commentorUserName: string;
    Avatar: string;
    content: string;
    likes: number;
    dislikes: number;
    interactionList: any = {};
    reportsCounter: number;
    datePublished: Date;
    dateUpdated: Date;
}

/*
export const Comments = [
    {
        commentorId: "Dani",
        title: "Some example text",
        content: "Me and Bae Suzy <3",

    },
    {
        commentorId: "Arish",
        title: "Some example text",
        content: "Wow Dani and Bae suzy look good together",

    }
];
*/