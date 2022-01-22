import "./App.css";
import { useMemo } from "react";
import {Helmet} from "react-helmet";
import Minter from "./Minter";

import * as anchor from "@project-serum/anchor";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
  getMathWallet,
} from "@solana/wallet-adapter-wallets";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { ThemeProvider, createTheme } from "@material-ui/core";


const theme = createTheme({
  palette: {
    type: "dark",
  },
});

const candyMachineId = process.env.REACT_APP_CANDY_MACHINE_ID
  ? new anchor.web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_ID)
  : undefined;

const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;

const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);

const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [getPhantomWallet(), getSolflareWallet(), getSolletWallet(), getMathWallet() ],
    []
  );

  function toggleMenu() {
    const menu = document.getElementById("mobileNavContainer")!;
    menu.classList.toggle("open-menu");
    console.log("pressed");
  }

  return (
    <div>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Sol Panel NFT</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
      <div id="mobileNavContainer" className="mobile-nav">
        <div className="mobile-nav-close-button" >
          <img src="/icons/close.svg" alt="menuitem" onClick={toggleMenu}/>
        </div>
        <ul>
          <li>
            <img className="mobile-nav-logo" src="/img/logo.png" alt="menuitem" />
          </li>
          <li>
            <a href="/#link1" onClick={toggleMenu}>
              Link 1
            </a>
          </li>
          <li>
            <a href="/#link2" onClick={toggleMenu}>
              Link 2
            </a>
          </li>
          <li>
            <a href="/#link3" onClick={toggleMenu}>
              Link 3
            </a>
          </li>
          <li>
            <a href="/#link4" onClick={toggleMenu}>
              Link 4
            </a>
          </li>
          <li>
            <div className="social-icons">
              <img className="nav-social" src="/icons/twitter.svg" alt="twitter" />
              <img className="nav-social" src="/icons/discord.svg" alt="discord" />
            </div>
          </li>
        </ul>
      </div>
      <div className="mobile-menu-button" onClick={toggleMenu}>
        <img src="/icons/menu.svg" alt="menu" />
      </div>
      <nav>
        <div className="nav-container">
          <h1 className="logo">Sol Panels NFT</h1>
          <a className="hide-800" href="https://www.magiceden.io/">
            MagicEden
          </a>
          <a className="hide-800" href="https://alpha.art/">
            AlphaArt
          </a>
          <div className="social-icons hide-800">
            <img className="nav-social" src="/icons/twitter.svg" alt="twitter" />
            <img className="nav-social" src="/icons/discord.svg" alt="discord" />
          </div>
        </div>
      </nav>
      <div id='stars'></div>
      <div id='stars2'></div>
      <div id='stars3'></div>
      <div className="earth-wrapper">
        <img className="earth" alt="earth" src="./earth.png"/>  
      </div>
      <div className="content-wrapper">
        <div className="image-wrapper">
          <img src="./solPanel.png" width="200px" height="200px" className="inline solPanelImg1" alt="solPanel"/>
          <img src="./solPanel.png" width="200px" height="200px" className="inline solPanelImg2" alt="solPanel"/>
          <img src="./solPanel.png" width="200px" height="200px" className="inline solPanelImg3" alt="solPanel"/>
        </div>
      </div>
      <div className="content-wrapper hidden">
          <header className="card" id="link1">
            <div className="center-content">
              <ThemeProvider theme={theme}>
                <ConnectionProvider endpoint={endpoint}>
                  <WalletProvider wallets={wallets} autoConnect>
                    <WalletDialogProvider>
                        <Minter
                          candyMachineId={candyMachineId}
                          connection={connection}
                          startDate={startDateSeed}
                          txTimeout={txTimeout}
                          rpcHost={rpcHost}
                        />
                    </WalletDialogProvider>
                  </WalletProvider>
                </ConnectionProvider>
              </ThemeProvider>
            </div>
          </header>
      </div>
      <div className="content-wrapper">
        <button className="mintBtn">Mint Coming Soon</button>
      </div>
      
      <div className="content-wrapper">
        <h1 className="heading">Saving the planet one Solar Panel at a time.</h1>
      </div>
      <div className="mission flex">
        <div className="mission-text">
          <h2 className="mission-title">Our mission is simple</h2>
          <p>Funds raised during mint will go directly into providing homes with a free Solar Panel installation.</p>
          <p>Sol Panel's NFT's are built and thrive on the most energy effecient blockchain that exists. Solana.</p>
          <p>Prove to your NFT friends that you support saving the planet by having a Sol Panel NFT in your wallet.</p>
        </div>
        <div className="mission-image">
          <img src="./solPanel.png" alt="solPanel" width="400px" height="400px"/>  
        </div>
      </div>
      <div className="content-wrapper">
        <h1 className="heading-1">Things need to change.</h1>
      </div>
      <div className="mission flex">
      <div className="mission-image">
          <img src="./solPanel.png" alt="solPanel" width="400px" height="400px"/>  
        </div>
        <div className="mission-text">
          <h2 className="mission-title">Global warming is real.</h2>
          <p>We all know its happening. This is our chance to do a small part and help fight back.</p>
          <p>On average it costs $8000 to install Solar onto a house. Selling out means 100 new homes will have solar power.</p>
          <p>Feel good knowing you're contributing to the cause.</p>
        </div>
        
      </div>
    </div>
  );
};

export default App;
