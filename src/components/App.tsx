
import LogoYeeha from '@/assets/logo_yeeha.svg'
import { useEffect, useState } from 'react'
import { Env, tgMpc } from '@yeeha/tg_mpc'
let TgWallet: any = null
function App() {
  const [address, setAddress] = useState('')
  const [userinfo, setUserinfo] = useState(null)
  const [balance, setBalance] = useState<any>(null)
  const [loading, setLoading] = useState(false)


  interface MpcOptionsType {
    env: number
    appId: string
    isMock: boolean
  }
  const initTgWallet = async (initData: MpcOptionsType) => {

    if (!TgWallet) {
      setLoading(true)
      TgWallet = new tgMpc(initData)
      await TgWallet.init(0)
      window.mpc = TgWallet
      const address = await TgWallet.getAddress()
      const userinfo = TgWallet.getUserInfo()
      console.log('address', address)
      console.log('userinfo', userinfo)
      setAddress(address)
      setLoading(false)

    }
  }

  const getBalance = async () => {
    setLoading(true)
    if (!TgWallet) {
      setBalance('Init Yeeha Wallet SDK first')
      setLoading(false)

      return
    }
    const _balance = await window?.mpc.balance(address)
    console.log('balance', _balance)
    setBalance(_balance)
    setLoading(false)

  }
  const initTgWalletClick = async () => {
    try {
      //get start params
      const env =
        import.meta.env.VITE_NODE_ENV === 'prod' ? Env.prod : Env.test
      // current mini app appId Used to obtain user information
      const initWalletAppId = 'SZqfW6L8h3'
      const initData = {
        appId: initWalletAppId,
        env,
        isMock: true
      }

      await initTgWallet(initData)

    } catch (error) {
      console.error('wallet init failed', error)
    }
  }

  useEffect(() => {
  }, [])

  const LoadingIcon = () => {
    return (
      <>
        <div className="flex justify-center items-center relative ml-[10px]">
          <div
            className={`w-[${6}px] h-[${6}px] border-[4px] border-t-[${32}px] border-gray-200 border-t-[#480FBB] rounded-full animate-spin`}
          ></div>
        </div>
      </>
    )
  }



  return (
    <div className="relative flex h-screen w-full flex-col items-center bg-[#4F20B8] text-center">
      <img
        src={LogoYeeha}
        className="mt-[25vh] h-[41px] w-[165px]"
        alt="yeeha-logo"
      />
      <p className="pt-[31px] text-[18px] font-[700] leading-[25px] text-white">
        Welcome to Yeeha Wallet SDK
      </p>
      <div className='mt-[30px] w-[50%] max-w-[200px] bg-[#FFFFFF] p-[10px] rounded-md cursor-pointer' onClick={() => { initTgWalletClick() }}>Init Yeeha Wallet SDK</div>

       <div className='text-white mt-[30px] flex'>
      Wallet Address:    {loading && !address ? <LoadingIcon /> :address}
     </div>


      <div className='mt-[30px] w-[50%]  max-w-[200px] bg-[#FFFFFF] p-[10px] rounded-md cursor-pointer' onClick={getBalance} > Get Balance</div>
      <div className='text-white mt-[30px] flex flex-row'>
      Balance: { balance}
      </div>
    </div>
  )
}

export default App
