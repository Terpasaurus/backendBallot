import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService} from '@nestjs/config';
import { ethers } from 'ethers';
import * as tokenJson from './assets/MyToken.json';

//Ballot Contract 0x0031c5f8dfd46d7eb07A1d23395fD27DDA504402 nest start --watch  
const TOKENIZED_VOTES_ADDRESS = '0xd75f993acc49D1Ca14b700046E826861FCa4e678';


@Injectable()
export class AppService {
  provider: ethers.providers.Provider;
  tokenContract: ethers.Contract | undefined;
  tokenBalance: number | undefined;

  constructor(private configService: ConfigService){
    this.provider = ethers.getDefaultProvider('goerli', {
      infura: process.env.INFURA_API_KEY,
      etherscan: process.env.ETHERSCAN_API_KEY,
      alchemy: process.env.ALCHEMY_API_KEY,
    });
  }

  async getTokenAddress(){
    return {result: TOKENIZED_VOTES_ADDRESS};
    
  }
  async claimTokens(address: string, numberTokens: string){
    // {"address":"xyz","param":"value"}
    // {"address":"0x4Aa40754eA12c2F95b35DBA818D556449228C2B7"}
    //TODO: build the contract object
    //TODO: pick the signer using the .env keys
    //TODO: connect the contract object to signer
    //TODO: make the transaction to mint tokens
    //TODO: await transaction, get the receipt, return the hash
    const MINT_VALUE = ethers.utils.parseEther(numberTokens);
    let path = "m/44'/60'/0'/0/0";
    const signer = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "", path).connect(this.provider);
    console.log(`Connecting to contract: ${TOKENIZED_VOTES_ADDRESS}`);
    const tokenContract = new ethers.Contract(TOKENIZED_VOTES_ADDRESS, tokenJson.abi, signer);
    const mintTx = await tokenContract.mint(address, MINT_VALUE);
    await mintTx.wait();
    return {result: mintTx.hash};
    //return(mintTx.hash);
  } 
}