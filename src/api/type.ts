import { User as FirebaseUser } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

export type Status = "Not Started" | "In Progress" | "Blocked" | "Completed";
export type Role = "owner" | "editor" | "viewer"
export type FileType = "image|text|application"

export interface User {
    uid?:string
    displayName:string
    email:string
    photo?:Resource
}

export interface Resource{
    downloadURL:string
    storagePath:string
}
export interface Task {
    id:string
    createdAt:Date
    createdBy:string
    description:string
    dueDate:Date
    projectId:string
    laneId:string
    status:Status
    title:string
    completeDate:Date
    assessment:string
}

export interface Project {
    id:string
    createdAt:Date
    createdBy:string
    cover:Resource
    title:string
}

export interface Invitation{
    id:string
    createdAt:Date
    createdBy:string
    inviteeId:string
    projectId:string
    role:Role
}

export interface Connection{
    id:string
    createdAt:Date
    createdBy:string
    approvedBy:string
}

export interface Comment {
    id:string
    createdAt:Date
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
    title:string
    createdAt:Date
    createdBy:string
    resource:Resource
    taskId:string
    fileType:string
}

export interface ProjectCollaborator{
    id:string
    projectId:string
    userId:string
    role:Role
}

export interface Lane{
    id:string
    name:string
    projectId:string
}