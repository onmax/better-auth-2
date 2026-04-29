declare module '#auth/database' {
  import type { BetterAuthOptions } from 'better-auth'
  export function createDatabase(event?: import('h3').H3Event): BetterAuthOptions['database']
  export const db: undefined
}

declare module '#auth/secondary-storage' {
  interface SecondaryStorage {
    get: (key: string) => Promise<string | null>
    set: (key: string, value: unknown, ttl?: number) => Promise<void>
    delete: (key: string) => Promise<void>
  }

  export function createSecondaryStorage(): SecondaryStorage | undefined
}
