import argon2 from 'argon2'

// argon2id is argon2's default variant. Tuned for a fast login path while
// staying well above OWASP-recommended cost.
const ARGON2_OPTS: argon2.HashOptions = {
  memoryCost: 19456, // 19 MiB
  timeCost: 2,
  parallelism: 1,
}

export function hashPassword(plain: string): Promise<string> {
  return argon2.hash(plain, ARGON2_OPTS)
}

export function verifyPassword(hash: string, plain: string): Promise<boolean> {
  return argon2.verify(hash, plain).catch(() => false)
}
