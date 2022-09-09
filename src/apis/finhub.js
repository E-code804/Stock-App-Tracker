import axios from "axios";

const TOKEN = "cc7vn1qad3i03fardnsg";

export default axios.create({
  baseURL: `https://finnhub.io/api/v1`, // base url, then add endpoints
  params: {
    token: TOKEN, // now will include in the url
  },
});
