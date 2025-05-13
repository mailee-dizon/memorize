import type { NextApiRequest, NextApiResponse } from 'next';

const allowedOrigins = [
  'http://localhost:3000',          // your dev frontend
  'https://memorize-356140602370.us-central1.run.app',        // your production frontend
];

export function handleCors(req: NextApiRequest, res: NextApiResponse) {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Only if you're using credentials (cookies, auth headers)
}
