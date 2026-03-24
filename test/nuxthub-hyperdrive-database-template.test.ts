import { describe, expect, it } from 'vitest'
import { buildDatabaseCode } from '../src/module/templates'

describe('buildDatabaseCode', () => {
  it('uses a dedicated postgres-js client with prepare disabled for nuxthub postgresql', () => {
    const code = buildDatabaseCode({
      provider: 'nuxthub',
      hubDialect: 'postgresql',
      usePlural: false,
      camelCase: true,
    })

    expect(code).toContain('import postgres from \'postgres\'')
    expect(code).toContain('hyperdrive.connectionString')
    expect(code).toContain('prepare: false')
    expect(code).toContain('return db')
    expect(code).toContain('drizzleAdapter(resolveBetterAuthDb()')
    expect(code).not.toContain('_betterAuthDb')
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
    expect(code).not.toContain('prepare: false')
  })
})
