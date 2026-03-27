declare module '#auth/database' {
  export const db: undefined
  export function createDatabase(...args: any[]): undefined
}

declare module '#auth/secondary-storage' {
  export function createSecondaryStorage(...args: any[]): undefined
}
