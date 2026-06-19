import { ProfileState, RuleContext } from "@alfresco/adf-extensions";
import { GROUP_RECORD_SITE_COLLABORATOR, GROUP_RECORD_SITE_MANAGER } from "../models/record";
import { GROUP_STUDENT_SITE_COLLABORATOR, GROUP_STUDENT_SITE_MANAGER } from "../models/student";
import { GROUP_TASK_SITE_COLLABORATOR, GROUP_TASK_SITE_CONSUMER, GROUP_TASK_SITE_MANAGER } from "../models/task";
import { GROUP_SUBJECT_SITE_COLLABORATOR, GROUP_SUBJECT_SITE_MANAGER } from "../models/subject";


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