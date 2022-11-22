import { randomBytes } from 'crypto';

export const generateToken = (bytes?: number): Promise<string> =>
	new Promise((resolve) => randomBytes(bytes ?? 48, (err, buffer) => resolve(buffer.toString('hex'))));

export async function post<R = Record<string, unknown>>(url: string, init?: RequestInit) {
	return fetch(url, { ...init, method: 'POST' }).then((r) => r.json() as Promise<R>);
}
