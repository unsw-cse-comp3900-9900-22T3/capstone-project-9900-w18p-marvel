import { User as FirebaseUser } from "firebase/auth";

export type Status = "start" | "blocked" | "complete";
export type Role = "owner" | "editor" | "viewer"

export interface User extends FirebaseUser {
    portrait?:Resource
}

export interface Resource{
    downloadURL:string
    storagePath:string
}
export interface Task {
    id:string
    createdAy:Date
    createdBy:string
    description:string
    dueDate:Date
    projectId:string
    laneName:string
    status:Status
    title:string
}

export interface Project {
    id:string
    createdAy:Date
    createdBy:string
    photoURL:string
    title:string
}

export interface Invitation{
    id:string
    createdAy:Date
    createdBy:string
    inviteeId:string
}

export interface Connection{
    id:string
    createdAy:Date
    createdBy:string
    approvedBy:string
}

export interface Comment {
    id:string
    createdAy:Date
    createdBy:string
    content:string
    taskId:string
}

export interface TaskCollaborator{
    id:string
    taskId:string
    userId:string
}

export interface Attachment{
    id:string
    createdAy:Date
    createdBy:string
    resource:Resource
    taskId:string
}

export interface ProjectCollaborator{
    id:string
    projectId:string
    userId:string
    role:Role
}