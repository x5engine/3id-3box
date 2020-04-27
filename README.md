## 3ID 3Box Demo in react

## 3ID: Data Identity, Access Control, Encryption

3ID is a decentralized identity (DID) protocol and standard providing data identity, access control, and encryption for user data stored on the decentralized web in decentralized databases, or just IPFS.

In 3Box, wallets perform the role of holding users’ private keys, as well as using those keys for authenticating data access control, signing, and encryption via 3ID. More on 3ID below. 3Box allows users to bring their own existing wallet and relies on third-party wallet providers rather than providing a stand-alone wallet.

In order to create a 3Box session a provider needs to be passed. This can be an ethereum provider (from web3.currentProvider, or window.ethereum) or a 3ID Provider (from IdentityWallet). It is now suggested to use the 3ID Connect Provider, which is a 3ID provider that wraps available ethereum providers and will manage/permission 3ID keys, authentication and blockchain account links inside an iframe. This will become the default soon and will overide passed ethereum providers.


## Check the Demo

[Live Demo](https://3id-3box.x5engine.com)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `yarn deploy`

**Note: This is only for deploying to netlify**

You must build before deploying

## Learn More

You can learn more in the [3Box documentation](https://github.com/3box/3box-js)

[Medium Article with more details](https://medium.com/3box/3box-architecture-a3e35c82e919)

##More to know

[3ID Resolver](https://github.com/3box/3id-resolver)
