import { useEffect, useState } from "react";

type IncomesType = {
  id: string;
  sum: number;
};

type ExpensesType = {
  id: string;
  sum: number;
};

const Balance = () => {
  const [incomesList, setIncomesList] = useState<IncomesType[]>([]);
  const [expensesList, setExpensesList] = useState<ExpensesType[]>([]);

  const getIncomes = () => {
    fetch(
      "https://project-01-finance-default-rtdb.europe-west1.firebasedatabase.app/incomes.json"
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        const result = [];
        for (const key in data) {
          result.push({
            id: key,
            sum: data[key].sum,
          });
        }
        setIncomesList(result);
      });
  };

  const getExpenses = () => {
    fetch(
      "https://project-01-finance-default-rtdb.europe-west1.firebasedatabase.app/expenses.json"
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        const result = [];
        for (const key in data) {
          result.push({
            id: key,
            sum: data[key].sum,
          });
        }
        setExpensesList(result);
      });
  };

  useEffect(() => {
    getIncomes();
  }, []);

  useEffect(() => {
    getExpenses();
  }, []);

  const sumIncomes = incomesList.reduce(
    (acc, val) => +acc + Number(val.sum),
    0
  );

  const sumExpenses = expensesList.reduce(
    (acc, val) => +acc + Number(val.sum),
    0
  );

  return (
    <div className="balance">
      <div>
        <span>Доходы за всё время</span>
        <span>Расходы за всё время</span>
      </div>
      <div>
        <span className="balancegreen">{sumIncomes}</span>
        <span className="balancered">{sumExpenses}</span>
      </div>
      <div>
        <span>Итог</span>
      </div>
      <div>
        <span className="balancegreen">{sumIncomes - sumExpenses}</span>
      </div>
    </div>
  );
};

export default Balance;
