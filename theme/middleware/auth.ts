

import { NextApiRequest, NextApiResponse } from 'next';
import { getCookie } from 'cookies-next';
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';

export async function authMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    next: () => Promise<void>
) {


        // 1. Get the token from cookie
        const tokenee = await getCookie('auth-token', { req, res }) as string | undefined;



        if(!tokenee){
            return
        }



        await next();

}




