// check Meta mask installed
export function metaMaskInstalled(state = false, action) {
   switch (action.type) {
    case "META_MASK_INSTALLED":
      return action.status;
    default:
      return state;
  }
}

// is user login or not

export function isUserLogin(state = false, action) {
    switch (action.type) {
      case "META_MASK_LOGIN":
        return action.status;
      default:
        return state;
    }
}

// get accounts 
export function accounts(state = [], action) {
    switch (action.type) {
      case "META_MASK_ACCOUNT":
        return action.data;
      default:
        return state;
    }
}


export function web3Object(state = {}, action) {
  switch (action.type) {
    case "WEB3_OBJECT":
      return action.data;
    default:
      return state;
  }
}