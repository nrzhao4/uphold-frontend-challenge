import SDK from "@uphold/uphold-sdk-javascript";

const upholdSdk = new SDK({
  baseUrl: "http://api-sandbox.uphold.com",
  clientId: import.meta.env.VITE_UPHOLD_CLIENT_ID,
  clientSecret: import.meta.env.VITE_UPHOLD_CLIENT_SECRET,
});

export default upholdSdk;
