import React, { useEffect, useState } from "react";
import "../index.css";
import { reagentAmountChanger } from "../helpers/changeAmountReagent.ts";

const HomePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async (url) => {
      const response = await fetch(url);
      if (response.ok) {
        const json = await response.json();
        setData(json?.data?.reagents);
        return;
      }
      alert(`Ошибка HTTP: ${response.status}`);
    };

    fetchData("/api/api/getReagents");
  }, [setData]);
  console.log(data);

  return (
    <div>
      <div className="reagent_row">
        <p className="id_col">
          <b>Id</b>
        </p>
        <p className="name_col">
          <b>Наименование</b>
        </p>
        <p className="amount_col">
          <b>Количество</b>
        </p>
        <p className="unit_col">
          <b>Единицы измерения</b>
        </p>
        <p className="producer_col">
          <b>Производитель</b>
        </p>
        <p className="supplier_col">
          <b>Поставщик</b>
        </p>
        <p className="storage_column">
          <b>Условия хранения</b>
        </p>
        <p className="storagePlace_column">
          <b>Полка хранения реактива</b>
        </p>
        <p className="move_column">
          <b>Действие</b>
        </p>
      </div>
      {data?.map(
        ({
          amount,
          unit,
          supplier,
          storagePlace,
          id,
          name,
          producer,
          storageConditions,
        }) => {
          return (
            <div className="reagent_row" key={id}>
              <p className="id_col">{id}</p>
              <p className="name_col">{name}</p>
              <p className="amount_col">{amount}</p>
              <p className="unit_col">{unit}</p>
              <p className="producer_col">{producer}</p>
              <p className="supplier_col">{supplier}</p>
              <p className="storage_column">{storageConditions}</p>
              <p className="storagePlace_column">{storagePlace}</p>
              <p className="move_column">
                <button
                  type="button"
                  onClick={() => reagentAmountChanger(id, 866)}
                >
                  Списать
                </button>
              </p>
            </div>
          );
        },
      )}
    </div>
  );
};

export { HomePage };
