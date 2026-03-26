declare module '#auth/database' {
  export const db: undefined
  export function createDatabase(): undefined
}

declare module '#auth/secondary-storage' {
  export function createSecondaryStorage(): undefined
}
