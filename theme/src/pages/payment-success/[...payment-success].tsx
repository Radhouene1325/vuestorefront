import React from 'react'
import {useRouter} from 'next/router'
const PaymentSuccess = () => {
    const router=useRouter()
console.log(router.query)
    return (
       <div>

           {router.query?.paymentSuccess}
       </div>
    )
}
export default PaymentSuccess
