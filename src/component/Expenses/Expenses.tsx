import { useEffect, useState } from "react";

type ExpensesType = {
  id: string;
  ddmmyyyy: string;
  sum: number;
  expense: string;
};

const Expenses = () => {
  const [expensesExpense, setExpensesExpense] = useState("");
  const [expensesSum, setExpensesSum] = useState("");
  const [expensesList, setExpensesList] = useState<ExpensesType[]>([]);

  const postExpenses = () => {
    const now = new Date();

    const dd = () => {
      if (now.getDate() < 10) return "0";
      return "";
    };

    const mm = () => {
      if (now.getMonth() + 1 < 10) return "0";
      return "";
    };

    const ddmmyyyy =
      dd() +
      String(now.getDate()) +
      "." +
      mm() +
      (now.getMonth() + 1) +
      "." +
      now.getFullYear();

    fetch(
      "https://project-01-finance-default-rtdb.europe-west1.firebasedatabase.app/expenses.json",
      {
        method: "POST",
        body: JSON.stringify({
          ddmmyyyy: ddmmyyyy,
          sum: expensesSum,
          expense: expensesExpense,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      console.log(res);
      setExpensesExpense("");
      setExpensesSum("");
      getExpenses();
    });
  };

  const getExpenses = () => {
    fetch(
      "https://project-01-finance-default-rtdb.europe-west1.firebasedatabase.app/expenses.json"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const result = [];
        for (const key in data) {
          result.push({
            id: key,
            ddmmyyyy: data[key].ddmmyyyy,
            sum: data[key].sum,
            expense: data[key].expense,
          });
        }
        setExpensesList(result);
      });
  };
  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <div>
      <input
        type="text"
        value={expensesExpense}
        onChange={(e) => setExpensesExpense(e.target.value)}
        placeholder="Цель расхода"
      />
      <input
        type="number"
        value={expensesSum}
        onChange={(e) => setExpensesSum(e.target.value)}
        placeholder="Сумма"
      />
      <button
        onClick={postExpenses}
        disabled={!expensesExpense || !expensesSum}
      >
        СОЗДАТЬ
      </button>
      <ul>Дата Сумма Цель расхода</ul>
      <ul>
        {expensesList
          .map((item) => (
            <li key={item.id}>
              {item.ddmmyyyy}
              {item.sum}
              {item.expense}
            </li>
          ))
          .reverse()}
      </ul>
    </div>
  );
};

export default Expenses;
