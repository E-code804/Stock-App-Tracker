import { AutoComplete } from "../components/AutoComplete";
import { StockList } from "../components/StockList";

export const StockOverviewPage = () => {
  return (
    <>
      <img id="logo" src="./stock-logo.jpg" alt="logo" />
      <p>Pick, save, and remove stocks from your list.</p>
      <AutoComplete />
      <StockList />
    </>
  );
};
