import { useState } from "react";
import Chart from "react-apexcharts";

export const StockChart = ({ chartData, symbol }) => {
  const [dateFormat, setDateFormat] = useState("24h");
  const { day, week, year } = chartData;

  const changeTimeData = () => {
    switch (dateFormat) {
      case "24h":
        return day;
      case "7d":
        return week;
      case "1y":
        return year;
      default:
        return day;
    }
  };

  const getLineColor = () => {
    switch (dateFormat) {
      case "24h":
        return day[0].y > day[day.length - 1].y ? "#ff0000" : "#00ff00";
      case "7d":
        return week[0].y > week[week.length - 1].y ? "#ff0000" : "#00ff00";
      case "1y":
        return year[0].y > year[year.length - 1].y ? "#ff0000" : "#00ff00";
      default:
        return day[0].y > day[day.length - 1].y ? "#ff0000" : "#00ff00";
    }
  };

  const options = {
    colors: [getLineColor()],
    title: {
      text: symbol,
      align: "center",
      style: {
        fontSize: "24px",
      },
    },
    chart: {
      id: "stock data",
      animation: {
        speed: 1300,
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        dateTimeUTC: false,
      },
    },
    tooltip: {
      x: {
        format: "MMM dd HH:MM",
      },
    },
  };
  const series = [
    {
      name: symbol,
      data: changeTimeData(),
    },
  ];
  return (
    <div className="mt-5 p-4 shadow-sm bg-white">
      <Chart options={options} series={series} type="area" width="750px" height="400px" />
      <div>
        <button className="btn btn-outline-primary m-1" onClick={() => setDateFormat("24h")}>
          24h
        </button>
        <button className="btn btn-outline-primary m-1" onClick={() => setDateFormat("7d")}>
          7d
        </button>
        <button className="btn btn-outline-primary m-1" onClick={() => setDateFormat("1y")}>
          1y
        </button>
      </div>
    </div>
  );
};
