import { describe, expect, it } from 'vitest'
import { buildDatabaseCode } from '../src/module/templates'

describe('buildDatabaseCode', () => {
  it('uses request-scoped hyperdrive clients with cleanup for nuxthub postgresql', () => {
    const code = buildDatabaseCode({
      provider: 'nuxthub',
      hubDialect: 'postgresql',
      usePlural: false,
      camelCase: true,
    })

    expect(code).toContain('import { useNitroApp } from \'nitropack/runtime\'')
    expect(code).toContain('const requestDatabaseKey = Symbol.for(\'nuxt-better-auth.requestDatabase\')')
    expect(code).toContain('hook(\'afterResponse\'')
    expect(code).toContain('client.end({ timeout: 0 })')
    expect(code).toContain('prepare: false')
    expect(code).toContain('max: 1')
    expect(code).toContain('export function createDatabase(event)')
    expect(code).not.toContain('function resolveBetterAuthDb()')
  })

  it('keeps the existing generated adapter path for non-postgresql nuxthub databases', () => {
    const code = buildDatabaseCode({
      provider: 'nuxthub',
      hubDialect: 'sqlite',
      usePlural: false,
      camelCase: true,
    })

    expect(code).toContain('import { db } from \'@nuxthub/db\'')
    expect(code).toContain('drizzleAdapter(db, { provider: dialect')
    expect(code).not.toContain('import postgres from \'postgres\'')
    expect(code).not.toContain('hook(\'afterResponse\'')
  })
})
