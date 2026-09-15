import { createHash, randomBytes, scryptSync, timingSafeEqual } from "crypto";

export const ADMIN_SESSION_COOKIE = "admin_session";

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const hashBuffer = Buffer.from(hash, "hex");
  const candidate = scryptSync(password, salt, 64);
  if (candidate.length !== hashBuffer.length) return false;
  return timingSafeEqual(candidate, hashBuffer);
}

export function getSessionToken(passwordHash: string): string {
  return createHash("sha256").update(`admin-session:${passwordHash}`).digest("hex");
}

export function isValidSession(
  cookieValue: string | undefined,
  passwordHash: string
): boolean {
  if (!cookieValue) return false;
  return safeCompare(cookieValue, getSessionToken(passwordHash));
}

export function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}
