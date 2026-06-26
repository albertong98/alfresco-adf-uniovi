import { ProfileState, RuleContext } from "@alfresco/adf-extensions";
import { GROUP_RECORD_SITE_COLLABORATOR, GROUP_RECORD_SITE_MANAGER } from "../models/record";
import { GROUP_STUDENT_SITE_COLLABORATOR, GROUP_STUDENT_SITE_MANAGER } from "../models/student";
import { GROUP_TASK_SITE_COLLABORATOR, GROUP_TASK_SITE_CONSUMER, GROUP_TASK_SITE_MANAGER, TYPE_STUDENT_TASK, TYPE_TASK } from "../models/task";
import { GROUP_SUBJECT_SITE_COLLABORATOR, GROUP_SUBJECT_SITE_MANAGER } from "../models/subject";
import { GROUP_STUDENTS } from "../models/constants";
import { Node } from '@alfresco/js-api';


/**
 * Verifica si el perfil del usuario pertenece a un grupo específico.
 *
 * @param profile - El perfil del usuario.
 * @param groupId - El ID del grupo a verificar.
 * @returns true si el perfil del usuario pertenece al grupo específico, false en caso contrario.
 */
export function isInGroup(profile: ProfileState, groupId: string): boolean {
  return (profile?.isAdmin || profile?.groups?.some((group) => group.id === groupId)) || false;
}

export function canCreateRecord(context: RuleContext): boolean {
  const profile = context.profile;
  return isInGroup(profile, GROUP_RECORD_SITE_MANAGER) || isInGroup(profile, GROUP_RECORD_SITE_COLLABORATOR);
}

export function canCreateStudent(context: RuleContext): boolean {
  const profile = context.profile;
  return isInGroup(profile, GROUP_STUDENT_SITE_MANAGER) || isInGroup(profile, GROUP_STUDENT_SITE_COLLABORATOR);
}

export function canCreateSubject(context: RuleContext): boolean {
  const profile = context.profile;
  return isInGroup(profile, GROUP_SUBJECT_SITE_MANAGER) || isInGroup(profile, GROUP_SUBJECT_SITE_COLLABORATOR);
}

export function canCreateTask(context: RuleContext): boolean {
  const profile = context.profile;
  return isInGroup(profile, GROUP_TASK_SITE_MANAGER) || isInGroup(profile, GROUP_TASK_SITE_COLLABORATOR);
}

export function canViewTasks(context: RuleContext): boolean {
  const profile = context.profile;
  return isInGroup(profile, GROUP_TASK_SITE_CONSUMER);
}

export function canSubmit(context: RuleContext): boolean{
  return context !== null;
}

export function canEnroll(context: RuleContext): boolean{
  const profile = context.profile;
  return isInGroup(profile, GROUP_STUDENTS);
}

export function canViewDocumentList(context: RuleContext): boolean{
  const selection = context.selection;
  return selection.count == 1 && (isNodeType(selection.nodes[0].entry,TYPE_STUDENT_TASK) || isNodeType(selection.nodes[0].entry,TYPE_TASK));
}

export function canViewParentDocumentList(context: RuleContext): boolean{
  const selection = context.selection;
  return selection.count == 1 && isNodeType(selection.nodes[0].entry,TYPE_STUDENT_TASK);
}

export function isNodeType(node: Node, type: string): boolean {
  return node?.nodeType === type;
}