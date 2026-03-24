import { beforeEach, describe, expect, it, vi } from 'vitest'

const betterAuthMock = vi.fn()
const createDatabaseMock = vi.fn()
const createServerAuthMock = vi.fn()
const useRuntimeConfigMock = vi.fn()

vi.mock('#auth/database', () => ({
  createDatabase: createDatabaseMock,
  db: { query: {} },
}))

vi.mock('#auth/secondary-storage', () => ({
  createSecondaryStorage: vi.fn(() => undefined),
}))

vi.mock('#auth/server', () => ({
  default: createServerAuthMock,
}))

vi.mock('better-auth', () => ({
  betterAuth: betterAuthMock,
}))

vi.mock('nitropack/runtime', () => ({
  useRuntimeConfig: useRuntimeConfigMock,
}))

describe('serverAuth database cache behavior', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()

    useRuntimeConfigMock.mockReturnValue({
      public: {
        siteUrl: 'https://example.com',
      },
      auth: {},
      betterAuthSecret: 'test-secret',
    })

    createServerAuthMock.mockReturnValue({
      trustedOrigins: undefined,
    })

    betterAuthMock.mockImplementation((options: Record<string, unknown>) => ({
      options,
      marker: Symbol('auth-instance'),
    }))
  })

  it('creates a fresh auth instance on each call when a database adapter is active', async () => {
    createDatabaseMock.mockReturnValue({ kind: 'database-adapter' })

    const { serverAuth } = await import('../src/runtime/server/utils/auth')

    const first = serverAuth()
    const second = serverAuth()

    expect(first).not.toBe(second)
    expect(createDatabaseMock).toHaveBeenCalledTimes(2)
    expect(betterAuthMock).toHaveBeenCalledTimes(2)
  })

  it('keeps caching auth instances when no database adapter is configured', async () => {
    createDatabaseMock.mockReturnValue(undefined)

    const { serverAuth } = await import('../src/runtime/server/utils/auth')

    const first = serverAuth()
    const second = serverAuth()

    expect(first).toBe(second)
    expect(createDatabaseMock).toHaveBeenCalledTimes(2)
    expect(betterAuthMock).toHaveBeenCalledTimes(1)
  })
})
