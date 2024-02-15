import { NavLink, Route, Routes } from "react-router-dom";
import BalancePage from "./pages/BalancePage";
import IncomesPage from "./pages/IncomesPage";
import ExpensesPage from "./pages/ExpensesPage";
import Total from "./component/Total/Total";

function App() {
  return (
    <>
      <header>
        <NavLink className={""} to="/balance">
          Баланс - <Total />
        </NavLink>
        <NavLink className={""} to="/incomes">
          Доходы
        </NavLink>
        <NavLink className={""} to="/expenses">
          Расходы
        </NavLink>
      </header>
      <Routes>
        <Route path="/*" element={<BalancePage />} />
        <Route path="/incomes" element={<IncomesPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
      </Routes>
      <footer></footer>
    </>
  );
}

export default App;
