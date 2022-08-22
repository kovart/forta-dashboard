const apiBaseUrl = process.env.API_URL || '';

const apiUrls = {
  external: {
    etherscan: {
      address: (addr) => `https://etherscan.io/address/${addr}`
    }
  }
};

export { apiUrls, apiBaseUrl };
