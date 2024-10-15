import {tgMpc } from '@yeeha/tg_mpc'
// @ts-ignore
import  tokenAbi from '@/config/abi/token.json'
// @ts-ignore
import  signInAbi from '@/config/abi/signIn.json'
// @ts-ignore
import  tradingAbi from '@/config/abi/trading.json'
// @ts-ignore
import {contractAddress} from '@/config/constant'
import {ethers} from 'ethers'
export default class Web3 {
  private _wallet:tgMpc;
  private _address!: any;
  private _signContract!: ethers.Contract;
  private _tokenContract!: ethers.Contract;
  private _tradingContract!: ethers.Contract;
  constructor(wallet: tgMpc) {
    //...
    this._wallet = wallet;
    this._address = wallet.getAddress();
  }

  //是否已签到
  async isSigned(){
      return await this.signContract.isSigned(this._address);
  }

  async signIn(uid:string){

    const signInInterface = new ethers.utils.Interface(signInAbi)
    const data = signInInterface.encodeFunctionData('signIn', [uid])

    const tx = {
      to: contractAddress.SignIn,
      data
    };
    let transaction = await this._wallet.sendTransaction(tx)
    return transaction;
  }

  /**
   *
   * @param to      接收usdt 的地址
   * @param number  转账usdt的数量   如 0.1  、 1
   * @param uid      uid
   * @param orderId  订单id
   */
  async trading(to:string, number:string, uid:string, orderId:string){

    // 判断usdt 是否已授权
    const isApproved = await this.isApproved();
    if(!isApproved){
       await this.approve();
    }

    const amount = ethers.utils.parseEther(number)
    const tradingInterface = new ethers.utils.Interface(tradingAbi)
    const data = tradingInterface.encodeFunctionData('trade', [to, amount, uid, orderId])

    const tx = {
      to: contractAddress.Trading,
      data
    };
    let transaction = await this._wallet.sendTransaction(tx)
    console.log(transaction);
    return transaction;
  }

  //授权usdt
  async approve(){
    const usdtInterface = new ethers.utils.Interface(tokenAbi)
    let maxUint = ethers.constants.MaxUint256.toString()
    const data = usdtInterface.encodeFunctionData('approve', [contractAddress.Trading, maxUint])

    const tx = {
      to: contractAddress.Usdt,
      data
    };
    console.log(tx);
    let transaction = await this._wallet.sendTransaction(tx)
    return transaction;
  }

  private async isApproved(){
    const spender = contractAddress.Trading;
    const allowance = await this.usdtContract.allowance(this._address, spender);
    console.log(allowance.toString());
    return  allowance.toString() > 0?true : false;
  }

  get signContract(){
    if(!this._signContract){
      //@ts-ignore
      this._signContract = new ethers.Contract(contractAddress.SignIn, signInAbi, this._wallet.getProvider())
    }
    return this._signContract;
  }

  get usdtContract(){
    if(!this._tokenContract){
      //@ts-ignore
      this._tokenContract = new ethers.Contract(contractAddress.Usdt, tokenAbi, this._wallet.getProvider())
    }
    return this._tokenContract;
  }

  get tradingContract(){
    if(!this._tradingContract){
      //@ts-ignore
      this._tradingContract = new ethers.Contract(contractAddress.Trading, tradingAbi, this._wallet.getProvider())
    }
    return this._tradingContract;
  }
}
