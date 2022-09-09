import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import finhub from "../apis/finhub";
import { StockChart } from "../components/StockChart";
import { StockData } from "../components/StockData";

const formatData = (data) => {
  return data.t.map((el, index) => {
    return {
      x: el * 1000,
      y: Math.floor(data.c[index]),
    };
  });
};

export const StockDetailPage = (props) => {
  const { symbol } = useParams();
  const [chartData, setChartData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      const currentTime = Math.floor(date.getTime() / 1000);
      const oneWeekAgo = currentTime - 7 * 24 * 60 * 60;
      const oneYearAgo = currentTime - 365 * 24 * 60 * 60;
      let oneDayAgo; // make sure a day if picked when market is open

      if (date.getDay() === 6) {
        oneDayAgo = currentTime - 2 * 24 * 60 * 60;
      } else if (date.getDay() === 0) {
        oneDayAgo = currentTime - 3 * 24 * 60 * 60;
      } else {
        oneDayAgo = currentTime - 24 * 60 * 60;
      }

      try {
        const responses = await Promise.all([
          finhub.get("/stock/candle", {
            params: {
              symbol,
              resolution: 30,
              from: oneDayAgo,
              to: currentTime,
            },
          }),
          finhub.get("/stock/candle", {
            params: {
              symbol,
              resolution: 60,
              from: oneWeekAgo,
              to: currentTime,
            },
          }),
          finhub.get("/stock/candle", {
            params: {
              symbol,
              resolution: "W",
              from: oneYearAgo,
              to: currentTime,
            },
          }),
        ]);

        setChartData({
          day: formatData(responses[0].data),
          week: formatData(responses[1].data),
          year: formatData(responses[2].data),
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [symbol]);

  return (
    <>
      {chartData && (
        <div>
          <StockChart chartData={chartData} symbol={symbol} />
          <StockData symbol={symbol} />
        </div>
      )}
    </>
  );
};
