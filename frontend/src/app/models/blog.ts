import { Interaction } from './interaction';

export class Blog {
    id!: number;
    creatorId: string;
    title: string;
    blogHeaderImage: any={};
    text: string;
    images: any = {};

    creatorName: string
    dateSubmitted: Date;
    datePublished: Date;
    dateUpdated: Date;
    isApproved: boolean;
    numLikes: number;
    numDislikes: number;
    reportsCounter: number;
    interactionIdList: Interaction;
    commentsIdList: any = {};
    numOfReads: number;
    status: string; //(pending, active, edit required)
}