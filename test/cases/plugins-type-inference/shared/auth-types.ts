import type { AuthSession, AuthUser } from '#nuxt-better-auth'
import type { AuthSocialProviderId } from '../../../../src/runtime/types'

export function assertSharedAuthTypes(user: AuthUser, session: AuthSession) {
  const role: string | null | undefined = user.role
  const internalCode: string | null | undefined = user.internalCode
  const impersonatedBy: string | null | undefined = session.impersonatedBy
  const workspaceId: string | null | undefined = session.workspaceId
  const provider: AuthSocialProviderId = 'github'

  return {
    impersonatedBy,
    internalCode,
    provider,
    role,
    workspaceId,
  }
}
