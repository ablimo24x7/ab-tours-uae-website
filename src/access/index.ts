import type { Access, FieldAccess } from 'payload'
import { type AuthUser, hasRole, isActiveUser } from './roles'

export const isAdmin: Access = ({ req: { user } }) =>
  hasRole(user as AuthUser | null, 'admin')

export const isAdminOrEditor: Access = ({ req: { user } }) => {
  const authUser = user as AuthUser | null
  return hasRole(authUser, 'admin') || hasRole(authUser, 'editor')
}

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  const authUser = user as AuthUser | null
  if (!isActiveUser(authUser)) return false
  if (hasRole(authUser, 'admin')) return true
  return {
    id: {
      equals: authUser.id,
    },
  }
}

export const isAdminField: FieldAccess = ({ req: { user } }) =>
  hasRole(user as AuthUser | null, 'admin')

export const isAdminOrSelfField: FieldAccess = ({ req: { user }, id }) => {
  const authUser = user as AuthUser | null
  if (!isActiveUser(authUser)) return false
  if (hasRole(authUser, 'admin')) return true
  return Boolean(id && authUser.id === id)
}

export const adminFieldOnly = {
  create: isAdminField,
  read: isAdminField,
  update: isAdminField,
}

export const hideFromNonAdmin = ({ user }: { user: AuthUser | null | undefined }) =>
  !hasRole(user, 'admin')
