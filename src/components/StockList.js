import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import finhub from "../apis/finhub";
import { BsFillCaretDownFill, BsFillTrashFill, BsFillCaretUpFill } from "react-icons/bs";

// Import the context desired
import { WatchListContext } from "../context/watchListContext";

export const StockList = () => {
  const [stock, setStock] = useState([]);
  const { watchList, removeStock } = useContext(WatchListContext); // returns the value property

  const changeColor = (num) => (num > 0 ? "success" : "danger");

  const caret = (num) => (num > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          watchList.map((stock) => {
            return finhub.get(`/quote`, {
              params: { symbol: stock },
            });
          })
        ); // This is a concurrent thing, will fetch all of the stock in watchlist at sametime

        const stockData = responses.map((response) => ({
          symbol: response.config.params.symbol,
          data: response.data,
        }));
        if (isMounted) {
          setStock(stockData);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();

    return () => (isMounted = false);
  }, [watchList]);

  return (
    <table className="table hover mt-5 pb-10">
      <thead style={{ color: "rgb(79,89,102)" }}>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Last</th>
          <th scope="col">Chng</th>
          <th scope="col">Chng%</th>
          <th scope="col">High</th>
          <th scope="col">Low</th>
          <th scope="col">Open</th>
          <th scope="col">Pclose</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {stock.map((stockData) => {
          return (
            <tr className="table-row" key={stockData.symbol}>
              <th scope="row">
                <Link to={`/details/${stockData.symbol}`}>{stockData.symbol}</Link>
              </th>
              <th scope="row">{stockData.data.c}</th>
              <th scope="row" className={`text-${changeColor(stockData.data.d)}`}>
                {stockData.data.d} {caret(stockData.data.d)}
              </th>
              <th scope="row" className={`text-${changeColor(stockData.data.dp)}`}>
                {stockData.data.dp} {caret(stockData.data.dp)}
              </th>
              <th scope="row">{stockData.data.h}</th>
              <th scope="row">{stockData.data.l}</th>
              <th scope="row">{stockData.data.o}</th>
              <th scope="row">{stockData.data.pc}</th>
              <th
                scope="row"
                onClick={() => removeStock(stockData.symbol)}
                style={{ color: "red", cursor: "pointer" }}
              >
                {<BsFillTrashFill />}
              </th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
