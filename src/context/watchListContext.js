import { createContext, useState, useEffect } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
  const [watchList, setWatchList] = useState(
    localStorage.getItem("watchList")
      ? localStorage.getItem("watchList").split(",")
      : ["GOOGL", "AMZN", "MSFT"]
  );

  useEffect(() => {
    localStorage.setItem("watchList", watchList);
  }, [watchList]);

  const addStock = (symbol) => {
    if (watchList.indexOf(symbol) === -1) {
      setWatchList((prevList) => [...prevList, symbol]);
    }
  };

  const removeStock = (symbol) => {
    setWatchList((prevList) => prevList.filter((stock) => stock !== symbol));
  };

  // Render props.children
  return (
    <WatchListContext.Provider value={{ watchList, addStock, removeStock }}>
      {props.children}
    </WatchListContext.Provider>
  );
};
