import React, { useEffect, useState } from "react";
import "../style/home_page.css";
import { reagentAmountChanger } from "../helpers/changeAmountReagent.ts"
import { reagentSorter } from "../helpers/reagentSorter.ts"

const HomePage = () => {
  const [data, setData] = useState(null);
  const [curReagent, setCurReagent] = useState([])

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
      <p className="user_name">{localStorage.getItem("name")}</p>
      <button 
        type="button"
        onClick={() => {
          localStorage.clear();
          window.location.href = "http://localhost:3000/"
          }}>
          Logout
      </button>
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
          uuid,
          unit,
          supplier,
          storagePlace,
          id,
          name,
          producer,
          storageConditions,
        }) => {
          console.log(id)
          return (
            <div className={amount < 100 ? "low_reagent" : "reagent_row" } key={id}>
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
                  onClick={() => {setCurReagent([name, id, unit, amount, uuid]);
                    document.querySelector(".modal_window_wraper").style.display = "flex";
                  } 
                  }
                >
                  Списать
                </button>
              </p>
            </div>
          );
        },
      )}
    <div className="modal_window_wraper">
      <div className="overflow" onClick={() => document.querySelector(".modal_window_wraper").style.display = "none"}></div>
      <div className="modal_window">
        <p className="reagent_name">{curReagent[0]}</p>
        <p className="reagent_ID">{curReagent[1]}</p>
        <input className="input_volume"></input>
        <p className="reagent_amount">{curReagent[2]}</p>
        <button className="write_off_btn" onClick={() => {reagentAmountChanger(curReagent[4], curReagent[3] - (+document.querySelector(".input_volume").value));
          document.querySelector(".modal_window_wraper").style.display = "none";
          alert(`${curReagent[0]} списано ${document.querySelector(".input_volume").value} ${curReagent[2]}`);
          window.location.href = window.location.href;
        }}>Списать</button>
      </div>
    </div>
    </div>
  );
};

export { HomePage };
