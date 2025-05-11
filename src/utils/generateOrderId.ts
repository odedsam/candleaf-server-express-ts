import { randomBytes } from 'crypto';



export function generateOrderId(): string {
  const random = randomBytes(4).toString('hex'); // 8 hex chars = 4 bytes
  const base36 = parseInt(random, 16).toString(36).toUpperCase().slice(0, 6);
  return `ORD-${base36}`;
}
