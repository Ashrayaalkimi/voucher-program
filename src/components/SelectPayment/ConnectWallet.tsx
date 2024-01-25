import type { FC } from 'react'
import { useWeb3Modal } from '@web3modal/react'
import { use, useEffect, useState } from 'react'
import { useAccount, useDisconnect } from 'wagmi'

import { AiOutlineLoading as LoadingIcon } from 'react-icons/ai'

// import UseCheckNFT from '../../hooks/UseCheckNFT'
// import { ownsNFT } from '../../pages/_app'

interface Connect_walletProps {}

const Connect_wallet: FC<Connect_walletProps> = ({}) => {
  const [loading, setLoading] = useState(false)
  const { open } = useWeb3Modal()
  const { isConnected, address } = useAccount()
  const { disconnect } = useDisconnect()

//   const { checkNFT } = UseCheckNFT()

  const [btnLabel, setBtnLabel] = useState('Connect Wallet' as string)

  const onOpen = async () => {
    setLoading(true)
    await open()
    setLoading(false)
  }

  const onClick = () => {
    if (isConnected) disconnect()
    else onOpen()
  }

  useEffect(() => {
    if (address) {
      const walletAddress = address?.slice(0, 6) + '...' + address?.slice(-4)
      setBtnLabel(walletAddress)
    } else {
      setBtnLabel('Connect Wallet')
    }
  }, [address])

//   useEffect(() => {
//     checkNFT()
//   }, [isConnected])

  return (
    <section className="fixed inset-0 flex items-center justify-center z-50 bg-[#242424] bg-opacity-50 m-4 lg:m-0">
    <div className="bg-[#131313] flex justify-center items-center gap-5 flex-wrap p-4 lg:p-12 flex-col text-center  text-white rounded-3xl lg:w-[516px]">
      {/* <Image src="/icons/leopardIcon.svg" alt="Tag" className=" w-18 h-18" width={70} height={70} /> */}
      <h2 className="text-4xl lg:text-5xl font-bold leading-[52px]">
        Do you have affiliate code?
      </h2>
      <div className="relative flex w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {/* <Image src="/icons/tag.svg" alt="Tag" className=" w-4 h-4" width={20} height={20} /> */}
        </div>
        {/* <input
          type="text"
          placeholder="Enter the discount code"
        //   value={couponCode}
          // onChange={(e) => setCouponCode(e.target.value)}
          onChange={handleInputChange}
          onKeyDown={handleBackspace}
          className="flex w-full p-3 pl-10 border-none bg-[#242424] outline-none text-[#ABABAB] text-sm font-light rounded-lg "
        ></input> */}
      </div>
      {/* <button
        onClick={handleProceedButton}
        className="text-black w-full text-base font-medium py-3 px-16 lg:px-16 bg-white rounded-xl">
        Proceed
      </button> */}
      {/* {error && <div className="text-red-500 text-xs">{error}</div>} */}
      {/* {existMsg && <div className="text-green-500 text-xs">Yay! You got affiliate code {couponCode}!! Congratulations</div>} */}
      {/* <button
        onClick={handleCloseButton}
        className="text-white w-full text-base font-medium py-3 px-16 lg:px-16 bg-[#131313] border rounded-xl"
      >
        Close
      </button> */}
      <button
      className='text-black w-full text-base font-medium py-3 px-16 lg:px-16 bg-white rounded-xl'
    //   className="border border-[#575757] py-1 lg:py-[10px] px-4 lg:px-[50px] text-white bebas hover:underline bg-[#0E0C0E] min-w-[200px] flex items-center justify-center"
      onClick={onClick}
      onMouseOver={() => {
        if (isConnected) setBtnLabel('Disconnect')
      }}
      onMouseLeave={() => {
        if (isConnected)
          setBtnLabel(address?.slice(0, 6) + '...' + address?.slice(-4))
      }}
      disabled={loading}>
      {loading && <LoadingIcon className="animate-spin mr-2" />}
      <span>{btnLabel}</span>
    </button>
    </div>
  </section>
  
  )
}
export default Connect_wallet