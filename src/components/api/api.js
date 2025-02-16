import upholdSdk from "../../utils/uphold-sdk";

export const fetchTickers = async (currency) => {
  try {
    const response = await upholdSdk.getTicker(currency);
    return response;
  } catch (error) {
    console.error(`Error fetching tickers for currency`, error);
    throw error;
  }
};
