import { randomBytes } from 'crypto';

export const generateToken = (bytes?: number): Promise<string> =>
	new Promise((resolve) => randomBytes(bytes ?? 48, (err, buffer) => resolve(buffer.toString('hex'))));
