import type { NextApiRequest, NextApiResponse } from 'next';
import { handleCors } from '@/lib/cors'; // adjust path as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  handleCors(req, res);

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method === 'POST') {
    // Your logic here
    return res.status(200).json({ message: 'OK' });
  }

  return res.status(405).end(); // Method not allowed
}
