import { useEffect, useState } from "react";

type IncomesType = {
  id: string;
  ddmmyyyy: string;
  sum: number;
  source: string;
};

const Incomes = () => {
  const [incomesSource, setIncomesSource] = useState("");
  const [incomesSum, setIncomesSum] = useState("");
  const [incomesList, setIncomesList] = useState<IncomesType[]>([]);

  const postIncomes = () => {
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
      "https://project-01-finance-default-rtdb.europe-west1.firebasedatabase.app/incomes.json",
      {
        method: "POST",
        body: JSON.stringify({
          ddmmyyyy: ddmmyyyy,
          sum: incomesSum,
          source: incomesSource,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
      // ).then((res) => {
    ).then(() => {
      // console.log(res);
      setIncomesSource("");
      setIncomesSum("");
      getIncomes();
    });
  };

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
            ddmmyyyy: data[key].ddmmyyyy,
            sum: data[key].sum,
            source: data[key].source,
          });
        }
        setIncomesList(result);
      });
  };
  useEffect(() => {
    getIncomes();
  }, []);

  return (
    <div>
      <div className="headlist">
        <input
          type="text"
          value={incomesSource}
          onChange={(e) => setIncomesSource(e.target.value)}
          placeholder="Источник"
        />
        <input
          type="number"
          value={incomesSum}
          onChange={(e) => setIncomesSum(e.target.value)}
          placeholder="Сумма"
        />
        <button
          className="btngreen"
          onClick={postIncomes}
          disabled={!incomesSource || !incomesSum}
        >
          СОЗДАТЬ
        </button>
      </div>
      <ul className="tablehead">
        <span>Дата</span> <span>Сумма</span> <span>Источник</span>
      </ul>
      <ul>
        {incomesList
          .map((item) => (
            <div className="tablein" key={item.id}>
              <span>{item.ddmmyyyy}</span>
              <span>{item.sum}</span>
              <span>{item.source}</span>
            </div>
          ))
          .reverse()}
      </ul>
    </div>
  );
};

export default Incomes;
