export const ROLES = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
] as const

export type UserRole = (typeof ROLES)[number]['value']

export const DEFAULT_ROLE: UserRole = 'editor'

export interface AuthUser {
  id: string | number
  email?: string | null
  role?: UserRole | string | null
  active?: boolean | null
}

export function isActiveUser(user: AuthUser | null | undefined): user is AuthUser {
  return Boolean(user && user.active !== false)
}

export function hasRole(user: AuthUser | null | undefined, role: UserRole): boolean {
  return isActiveUser(user) && user.role === role
}
