import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

export function isMetaMaskInstalled(status) {
  console.log("action called ", status);
  return {
    type: "META_MASK_INSTALLED",
    status,
  };
}

export function isUserLogin(status) {
  return {
    type: "META_MASK_LOGIN",
    status,
  };
}

export function web3Object(data) {
  return {
    type: "WEB3_OBJECT",
    data,
  };
}

export function accounts(data) {
  // fetched the categories
  return {
    type: "META_MASK_ACCOUNT",
    data,
  };
}

export function checkWeb3(status) {
  return (dispatch) => {
    if (window.ethereum !== undefined) {
      dispatch(connectMetamask(status));
      dispatch(isMetaMaskInstalled(true));
    } else {
      window.addEventListener("load", () => {
        if (window.ethereum) {
          dispatch(connectMetamask(status));
          dispatch(isMetaMaskInstalled(true));
        } else {
          var metamaskCheck = setInterval(() => {
            if (window.ethereum) {
              clearInterval(metamaskCheck);
              dispatch(connectMetamask(status));
              dispatch(isMetaMaskInstalled(true));
            }
          }, 1000);
        }
      });
    }
  };
}

export function connectMetamask(status) {
  console.log("connect meta mask called")
  return (dispatch) => {
    dispatch(web3Object(null))
    const web3 = new Web3(window.ethereum);
    console.log("WEB # IS",web3)
    dispatch(web3Object(web3))
    if (window.ethereum) {
      if (window.ethereum.selectedAddress) {
        console.log("IN IF");
        // this.web3 = web3;
        // this.metaMaskInstalled = true;
        dispatch(isMetaMaskInstalled(true));
        // this.fetchNetworkId();
        dispatch(fetchNetworkId(web3));
      } else {
        console.log("in else")
        if (status) {
          window.ethereum
            .enable()
            .then((response) => {
            //   this.web3 = web3;
              //   this.metaMaskInstalled = true;
              dispatch(isMetaMaskInstalled(true));
              dispatch(fetchNetworkId(web3));
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
        //   this.metaMaskInstalled = true;
        dispatch(fetchNetworkId(web3));
          dispatch(isMetaMaskInstalled(true));
        }
      }
    } else {
    //   this.metaMaskInstalled = false;
    console.log("IN LAST ELSE METAMASK NOT INSATALLED")
      dispatch(isMetaMaskInstalled(false));
    }
  };
}

export function fetchNetworkId(web3) {
  console.log("fetch network id called");
  return (dispatch) => {
    web3.eth.net.getId().then((resp) => {
      // this.netWorkId = resp;
      // this.initNetworkPoll();
      dispatch(fetchAccounts(web3));
    });
  };
}

export function fetchAccounts(web3) {
  return (dispatch) => {
    web3.eth.getAccounts().then((resp) => {

      console.log("account response is:",resp)
      // this.accounts = resp;
      dispatch(accounts(resp));
      if (resp.length === 0) {
        //   this.isLogin = false;
        dispatch(isUserLogin(false));
      } else {
        //   this.isLogin = true;
        dispatch(isUserLogin(true));
      }
    });
  };
}
