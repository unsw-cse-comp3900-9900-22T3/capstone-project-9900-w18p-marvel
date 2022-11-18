import { getApp } from "firebase/app";
import { getFirestore, setDoc, doc, deleteDoc } from "firebase/firestore";
import { uid } from "uid";
import { deleteInvitation, getInvitation } from "./invitation";
import { addProjectCollaborator } from "./projectCollaborator";
import { Role } from "./type";

export const requestConnection = async (
  inviteeId: string,
  createdBy: string,
  createdAt: Date,
  projectId: string,
  role:Role,
) => {
  console.log("request connection:",projectId,inviteeId)
  const app = getApp();
  const db = getFirestore(app);
  await setDoc(doc(db, "invitations", uid(20)), {
    createdBy: createdBy,
    createdAt: createdAt,
    inviteeId: inviteeId,
    projectId,
    role
  });
};

export const answerConnection = async (
  invitationId: string,
  accept: boolean,
  createdBy: string,
  createdAt: Date
) => {
  const app = getApp();
  const db = getFirestore(app);

  if (accept) {
    const invitation = await getInvitation(invitationId);
    if (invitation) {
      addProjectCollaborator(createdBy, invitation.projectId, invitation.role);
    }
  }
  console.log("answer connection:",invitationId)
  await deleteInvitation(invitationId)
};
