import React from 'react';
import Box from '3box'
import './App.css';

var Web3 = require('web3');

const IdentityWallet = require('identity-wallet')
var web3 = new Web3(Web3.givenProvider);


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

function App() {

  React.useEffect(()=>{
    console.log('app loaded, yeah');
  })

  const loadIDWallet = async ()=>{
    const config = {
      type: 'authenticate',
      origin: window?.location?.href,
      spaces: ['space1', 'space2']
    };

    const seed = web3.utils.randomHex(random()) // a hex encoded seed

    const idWallet = new IdentityWallet(config, { seed })

  }

  const loadd3ID = async ()=>{
    const provider = await Box.get3idConnectProvider()
    const box = await Box.create(provider)
    console.log(provider,box);
    const spaces = ['myDapp']
    await box.auth(spaces)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={'https://3box.io/static/media/3BoxCloudWhite.03a879b3.svg'} className="App-logo" alt="3Box Logo" />
        <h1>3ID 3Box Demo</h1>
        <h2>Connect to see some magic happen!</h2>
        <button onClick={loadd3ID} className="button-success pure-button"> Connect with 3ID</button>
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
