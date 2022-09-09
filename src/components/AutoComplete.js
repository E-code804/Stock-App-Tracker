import { useState, useEffect, useContext } from "react";
import finhub from "../apis/finhub";
import { WatchListContext } from "../context/watchListContext";

export const AutoComplete = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const { addStock } = useContext(WatchListContext);

  const showResults = () => {
    const render = search ? "show" : "";

    return (
      <ul
        style={{ height: "500px", overflowY: "scroll", overflowX: "hidden", cursor: "pointer" }}
        className={`dropdown-menu ${render}`}
      >
        {result.map((stock) => {
          return (
            <li
              key={stock.symbol}
              onClick={() => {
                addStock(stock.symbol);
                setSearch("");
              }}
              className="dropdown-item"
            >
              {stock.description} ({stock.symbol})
            </li>
          );
        })}
      </ul>
    );
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finhub.get("/search", {
          params: {
            q: search,
          },
        });

        if (isMounted) {
          setResult(response.data.result);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (search.length > 0) {
      fetchData();
    } else {
      setResult([]);
    }

    return () => (isMounted = false);
  }, [search]);

  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          style={{ backgroundColor: "rgba(145, 158, 171, 0.04)" }}
          id="search"
          type="text"
          className="form-control"
          placeholder="Search"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <label htmlFor="search">Search</label>
      </div>
      {showResults()}
    </div>
  );
};
