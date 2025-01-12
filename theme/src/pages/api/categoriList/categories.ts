import {NextApiRequest, NextApiResponse} from 'next'
import {sdk} from "../../../../sdk.config";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const response = await sdk.magento.categoryList({});
    res.status(200).json({ data: response});

}