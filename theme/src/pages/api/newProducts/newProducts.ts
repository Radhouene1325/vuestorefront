import type { NextApiRequest, NextApiResponse } from "next";
import {sdk} from "../../../../sdk.config";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
try {
    const response = await sdk.magento.products({
        filter: {
            new:{
                eq:'1'
            }
        },
        pageSize: 8,
        currentPage: 1,
    })

    res.status(200).json({data: response});


}catch(e){
    console.error('Direct fetch error:', e);
}



};