import {sdk} from "../sdk.config";

export async function getServerSidePropsnavItem() {
    const {data: {cmsPage: pageData}, error, errors} = await sdk.magento.cmsPage({
        identifier: 'home'
    })
console.log(pageData)
 return pageData
}