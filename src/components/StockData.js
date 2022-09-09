// Display extraa data about company
import { useState, useEffect } from "react";
import finhub from "../apis/finhub";

export const StockData = ({ symbol }) => {
  const [stockData, setStockData] = useState();

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finhub.get("/stock/profile2", {
          params: {
            symbol,
          },
        });

        // name, exchange, mktcap, country, industry, share outs, ticker, ipo, url
        if (isMounted) {
          setStockData(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    return () => (isMounted = false);
  }, [symbol]);

  return (
    <>
      {stockData && (
        <div className="row border bg-white rounded shadow-sm p-4 mt-5 mb-5">
          <div className="col">
            <div className="p-2">
              <span className="fw-bold">Name: </span>
              {stockData.name}
            </div>
            <div className="p-2">
              <span className="fw-bold">Country: </span>
              {stockData.country}
            </div>
            <div className="p-2">
              <span className="fw-bold">Ticker: </span>
              {stockData.ticker}
            </div>
          </div>

          <div className="col">
            <div className="p-2">
              <span className="fw-bold">Exchange: </span>
              {stockData.exchange}
            </div>
            <div className="p-2">
              <span className="fw-bold">Industry: </span>
              {stockData.finnhubIndustry}
            </div>
            <div className="p-2">
              <span className="fw-bold">IPO: </span>
              {stockData.ipo}
            </div>
          </div>

          <div className="col">
            <div className="p-2">
              <span className="fw-bold">Market Cap: </span>
              {stockData.marketCapitalization}
            </div>
            <div className="p-2">
              <span className="fw-bold">Shares Outstanding: </span>
              {stockData.shareOutstanding}
            </div>
            <div className="p-2">
              <span className="fw-bold">url: </span>
              <a href={stockData.weburl}>website</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
