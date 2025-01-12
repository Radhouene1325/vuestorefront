import { NextApiRequest, NextApiResponse } from 'next';

export const withMiddleware =
    (...middlewares: Function[]) =>
        (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) =>
            async (req: NextApiRequest, res: NextApiResponse) => {
                for (const middleware of middlewares) {
                    await new Promise<void>((resolve, reject) => {
                        middleware(req, res, (result: unknown) => {
                            if (result instanceof Error) {
                                return reject(result);
                            }
                            return resolve();
                        });
                    });
                }
                return handler(req, res);
            };
