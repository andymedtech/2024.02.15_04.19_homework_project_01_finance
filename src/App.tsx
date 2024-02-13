import { Link, Route, Routes } from "react-router-dom";
import BalancePage from "./pages/BalancePage";
import IncomesPage from "./pages/IncomesPage";
import ExpensesPage from "./pages/ExpensesPage";
// import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      {/* <h1>Project Finance</h1> */}
      <header>
        {/* <Link to="/">home</Link> */}
        <Link to="/balance">Баланс</Link>
        <Link to="/incomes">Доходы</Link>
        <Link to="/expenses">Расходы</Link>
      </header>
      <Routes>
        <Route path="/*" element={<BalancePage />} />
        <Route path="/incomes" element={<IncomesPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        {/* <Route path="/*" element={<NotFoundPage />} /> */}
      </Routes>
      <footer>2024</footer>
    </>
  );
}

export default App;
