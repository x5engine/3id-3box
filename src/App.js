import React from 'react';
import Box from '3box'
import './App.css';
import Web3Modal from "web3modal";
import Torus from "@toruslabs/torus-embed";
import Authereum from "authereum";
import WalletConnectProvider from "@walletconnect/web3-provider";

var Web3 = require('web3');

const providerOptions = {
  torus: {
    package: Torus,
    display: {
      name: "Social Login",
      description: "Connect with your social accounts"
    },
    options: {
      config: {
          enableLogging: false, // optional
          buttonPosition: "bottom-left", // optional
          buildEnv: "production", // optional
          showTorusButton: true, // optional
          enabledVerifiers: {
              // optional
              google: true,
              facebook: true,
              twitch: true,
              reddit: true,
              discord: true,
          }
      }
    }
  },
  authereum: {
    package: Authereum // required
  },
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "INFURA_ID" // required
    }
  }
};

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions // required
});

const IdentityWallet = require('identity-wallet')

var m_w = 123456789;
var m_z = 987654321;
var mask = 0xffffffff;

// Takes any integer
function seed(i) {
    m_w = (123456789 + i) & mask;
    m_z = (987654321 - i) & mask;
}

// Returns number between 0 (inclusive) and 1.0 (exclusive),
// just like Math.random().
function random()
{
    m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
    m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
    var result = ((m_z << 16) + (m_w & 65535)) >>> 0;
    result /= 4294967296;
    return result;
}

let web3 = {};

function App() {

  React.useEffect( ()=>{
    console.log('app loaded, yeah');

  })


  const loadWeb3Modal = async ()=>{
    const provider = await web3Modal.connect();
    web3 = new Web3(provider);
    const account = await web3.eth.getAccounts()
    if(account && account.length){
      loadd3ID(account[0])
    }
  }

  const loadIDWallet = async () => {
    const config = {
      type: 'authenticate',
      origin: window?.location?.href,
      spaces: ['space1', 'space2']
    };

    const seed = web3.utils.randomHex(random()) // a hex encoded seed

    const idWallet = new IdentityWallet(config, { seed })

  }

  const loadd3ID = async (account)=>{
    const provider = await Box.get3idConnectProvider()
    const box = await Box.create(provider)
    console.log('loadd3ID',provider,box, account);
    const spaces = ['myAwesomeDapp']
    const address = account
    await box.auth(spaces, {address})
    await box.syncDone
    await box.public.set('name', 'John Doe')
    const nickname = await box.public.get('name')
    console.log('nickname',nickname)//should say John Doe
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={'https://3box.io/static/media/3BoxCloudWhite.03a879b3.svg'} className="App-logo" alt="3Box Logo" />
        <h1>3ID 3Box Demo</h1>
        <h2>Connect to see some magic happen!</h2>
        <button onClick={async ()=>loadWeb3Modal()} className="button-success pure-button"> Connect with 3ID</button>
        <a
          className="App-link"
          href="https://github.com/3box/3box-js"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more
        </a>
      </header>
    </div>
  );
}

export default App;
