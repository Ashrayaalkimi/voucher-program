import { CheckoutDetails, Voucher } from "@/types"

export const getAllproduct = async()=>{
    let response = await fetch(process.env.NEXT_PUBLIC_VOUCHER_SERVER_URL + "voucher/api/v1/product/getall")
    if (!response.ok) {
        throw new Error("Something wrong on network connection");
    }
    let result = await response.json()
    return result
}

export const getCoinDetails = async() =>{
    let response = await fetch(process.env.NEXT_PUBLIC_COINGECKO_SERVER_URL+"price?ids=ethereum&vs_currencies=usd")
    if (!response.ok) {
        throw new Error("Something wrong on network connection");
    }
    let result = await response.json()
    return result
}

export const getCouponDetail =  async(coupone: string)=>{
    let response = await fetch(process.env.NEXT_PUBLIC_VOUCHER_SERVER_URL+"voucher/api/v1/affiliate/get/"+coupone)
    if (!response.ok) {
        throw new Error("Something wrong on network connection");
    }
    let result = await response.json()
    return result
}

export const getProductId = async(productId:string)=>{
    let response = await fetch(process.env.NEXT_PUBLIC_VOUCHER_SERVER_URL+`voucher/api/v1/product/get/${productId}`)
    if (!response.ok) {
        throw new Error("Something wrong on network connection");
    }
    let result = await response.json()
    return result
}

export const getCouponId = async(couponCode:string,productId:string|null)=>{
    let response = await fetch(process.env.NEXT_PUBLIC_VOUCHER_SERVER_URL+`voucher/api/v1/affiliate/get/${couponCode}/${productId}`)
    if (!response.ok) {
        throw new Error("Something wrong on network connection");
    }
    let result = await response.json()
    return result
}

export const checkOutSession =async(details:CheckoutDetails)=>{
    let response = await fetch(process.env.NEXT_PUBLIC_ALKIMI_PAYMENT_SERVER_URL+"product-checkout-session/",{
        method:"POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(details)
    })
    if (!response.ok) {
        throw new Error("Something wrong on network connection");
    }
    let result = await response.json()
    return result
}

export const getProductIntent =async(sessionId:string|null)=>{
    let response = await fetch(process.env.NEXT_PUBLIC_ALKIMI_PAYMENT_SERVER_URL+"get-product-intent/",{
        method:"POST",
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({
            session_id: sessionId,
          }),
    })
    if (!response.ok) {
        throw new Error("Something wrong on network connection");
    }
    let result = await response.json()
    return result
}

export const setVoucher =async(voucherDetails:Voucher)=>{
    let response = await fetch(process.env.NEXT_PUBLIC_VOUCHER_SERVER_URL+"purchase/create",{
        method:"POST",
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(voucherDetails)
    })
    if (!response.ok) {
        throw new Error("Something wrong on network connection");
    }
    let result = await response.json()
    return result
}

