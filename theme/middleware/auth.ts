import { NextApiRequest, NextApiResponse } from 'next';

export async function authMiddleware(req: NextApiRequest, res: NextApiResponse, next: () => Promise<void>) {
    console.log( '4444444444444444444444',  await req.headers.cookie);
    const token = req.headers.cookie;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Optionally validate the token (e.g., decode JWT or check session)
    // const isValid = await validateToken(token); // Implement this function
    // if (!isValid) {
    //     return res.status(401).json({ error: 'Invalid token' });
    // }

    // Call the next function to continue execution
    await next();
}
