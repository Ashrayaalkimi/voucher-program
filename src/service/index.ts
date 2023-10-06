import { CheckoutDetails, Voucher } from "@/types"

export const getAllproduct = async()=>{
    let response = await fetch(process.env.NEXT_PUBLIC_VOUCHER_SERVER_URL + "product/getall")
    let result = await response.json()
    return result
}

export const getCoinDetails = async() =>{
    let response = await fetch(process.env.NEXT_PUBLIC_COINGECKO_SERVER_URL+"price?ids=ethereum&vs_currencies=usd")
    let result = await response.json()
    return result
}

export const getCouponDetail =  async(coupone: string)=>{
    let response = await fetch(process.env.NEXT_PUBLIC_VOUCHER_SERVER_URL+"affiliate/get/"+coupone)
    let result = await response.json()
    return result
}

export const getProductId = async(productId:string)=>{
    let response = await fetch(process.env.NEXT_PUBLIC_VOUCHER_SERVER_URL+`product/get/${productId}`)
    let result = await response.json()
    return result
}

export const getCouponId = async(couponCode:string,productId:string|null)=>{
    let response = await fetch(process.env.NEXT_PUBLIC_VOUCHER_SERVER_URL+`affiliate/get/${couponCode}/${productId}`)
    let result = await response.json()
    return result
}

export const checkOutSession =async(details:CheckoutDetails)=>{
    let response = await fetch(process.env.NEXT_PUBLIC_ALKIMI_SERVER_URL+"product-checkout-session/",{
        method:"POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(details)
    })
    let result = await response.json()
    return result
}

export const getProductIntent =async(sessionId:string|null)=>{
    let response = await fetch(process.env.NEXT_PUBLIC_ALKIMI_SERVER_URL+"get-product-intent/",{
        method:"POST",
        body:JSON.stringify({
            session_id: sessionId,
          }),
    })
    let result = await response.json()
    return result
}

export const setVoucher =async(voucherDetails:Voucher)=>{
    let response = await fetch(process.env.NEXT_PUBLIC_VOUCHER_SERVER_URL+"purchase/create",{
        method:"POST",
        body:JSON.stringify(voucherDetails)
    })
    let result = await response.json()
    return result
}

