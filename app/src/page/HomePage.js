import React, { useEffect, useState } from "react";
import "../style/home_page.css";
import { reagentAmountChanger } from "../helpers/changeAmountReagent.ts";
import { reagentSorter } from "../helpers/reagentSorter.ts";
// import { ChangeAmountWindow } from "../modal_window/changeAmountWindow.js";
import { addReagent } from "../helpers/addReagent.ts";
import { valueReturner } from "../helpers/valueReturner.ts";
import { addUser } from "../helpers/addUser.ts";
import { deleteReagent } from "../helpers/deleteReagent.ts";
import image from "../assets/logo.png";

const HomePage = () => {
  const [data, setData] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [curReagent, setCurReagent] = useState([]);
  const [checkedId, setCheckedId] = useState(true);
  const [checkedName, setCheckedName] = useState(true);
  const [checkedAmount, setCheckedAmount] = useState(true);
  const [checkedUnit, setCheckedUnit] = useState(true);
  const [checkedProducer, setCheckedProducer] = useState(false);
  const [checkedSupplier, setCheckedSupplier] = useState(false);
  const [checkedStorage, setCheckedStorage] = useState(true);
  const [checkedStoragePlace, setCheckedStoragePlace] = useState(true);
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    const fetchData = async (url) => {
      const response = await fetch(url);
      if (response.ok) {
        const json = await response.json();
        if (json && json.data) {
          setData(reagentSorter(json.data.reagents, "Up_ID"));
        }
        return;
      }
      alert(`Ошибка HTTP: ${response.status}`);
    };

    fetchData("/api/getReagents");
  }, []);
  return (
    <div>
      <div className="main_header">
        <img className="logo_img" src={image} alt="logo" />
        <p className="user_name">{localStorage.getItem("name")}</p>
        <button
          type="button"
          onClick={() => {
            localStorage.clear();
            window.location.href = "http://localhost:3000/";
          }}
        >
          Выход
        </button>
        {userRole === "admin" || userRole === "editor" ? (
          <button
            type="button"
            onClick={() => {
              document.querySelector(".add_reagent_window").style.display =
                "flex";
            }}
          >
            Добавить реактив
          </button>
        ) : (
          ""
        )}
        {userRole === "admin" ? (
          <button
            type="button"
            onClick={() => {
              document.querySelector(".add_user_window").style.display = "flex";
            }}
          >
            Добавить сотрудника
          </button>
        ) : (
          ""
        )}
      </div>
      <div>
        <p>Выберите вариант сортировки</p>
        <select
          name="select"
          value={selectedFilter}
          className="select_sort"
          onChange={(event) => {
            const sortedData = reagentSorter(data, event.target.value);
            setData(sortedData);
            setSelectedFilter(event.target.value);
          }}
        >
          <option value="Up_ID" className="sort_item">
            По возрастанию ID
          </option>
          <option value="Down_ID" className="sort_item">
            По убыванию ID
          </option>
          <option value="A-Z" className="sort_item">
            По алфавиту А-Я
          </option>
          <option value="Z-A" className="sort_item">
            По алфавиту Я-А
          </option>
        </select>
      </div>
      <div className="checkbox_wraper">
        <p>Выберите отображаемые столбцы</p>
        <div className="checkbox">
          <div>
            <label htmlFor="ID">
              ID
              <input
                type="checkbox"
                name="ID"
                checked={checkedId}
                onChange={() => {
                  setCheckedId((prevValue) => !prevValue);
                }}
              />
            </label>
          </div>
          <div>
            <label htmlFor="name">
              Наимеонвание
              <input
                type="checkbox"
                name="name"
                checked={checkedName}
                onChange={() => {
                  setCheckedName((prevValue) => !prevValue);
                }}
              />
            </label>
          </div>
          <div>
            <label htmlFor="amount">
              Количество
              <input
                type="checkbox"
                name="amount"
                checked={checkedAmount}
                onChange={() => {
                  setCheckedAmount((preValue) => !preValue);
                }}
              />
            </label>
          </div>
          <div>
            <label htmlFor="unit">
              Единицы измерения
              <input
                type="checkbox"
                name="unit"
                checked={checkedUnit}
                onChange={() => {
                  setCheckedUnit((preValue) => !preValue);
                }}
              />
            </label>
          </div>
          <div>
            <label htmlFor="producer">
              Номер серии
              <input
                type="checkbox"
                name="producer"
                checked={checkedProducer}
                onChange={() => {
                  setCheckedProducer((prevValue) => !prevValue);
                }}
              />
            </label>
          </div>
          <div>
            <label htmlFor="supplier">
              Поставщик
              <input
                type="checkbox"
                name="supplier"
                checked={checkedSupplier}
                onChange={() => {
                  setCheckedSupplier((prevValue) => !prevValue);
                }}
              />
            </label>
          </div>
          <div>
            <label htmlFor="storage">
              Условия хранения
              <input
                type="checkbox"
                name="storage"
                checked={checkedStorage}
                onChange={() => {
                  setCheckedStorage((prevValue) => !prevValue);
                }}
              />
            </label>
          </div>
          <div>
            <label htmlFor="storagePlace">
              Полка хранения реактива
              <input
                type="checkbox"
                name="storagePlace"
                checked={checkedStoragePlace}
                onChange={() => {
                  setCheckedStoragePlace((prevValue) => !prevValue);
                }}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="reagent_row">
        {checkedId && (
          <p className="id_col">
            <b>Id</b>
          </p>
        )}
        {checkedName && (
          <p className="name_col">
            <b>Наименование</b>
          </p>
        )}
        {checkedAmount && (
          <p className="amount_col">
            <b>Количество</b>
          </p>
        )}
        {checkedUnit && (
          <p className="unit_col">
            <b>Единицы измерения</b>
          </p>
        )}
        {checkedProducer && (
          <p className="producer_col">
            <b>Производитель</b>
          </p>
        )}
        {checkedSupplier && (
          <p className="supplier_col">
            <b>Поставщик</b>
          </p>
        )}
        {checkedStorage && (
          <p className="storage_column">
            <b>Условия хранения</b>
          </p>
        )}
        {checkedStoragePlace && (
          <p className="storagePlace_column">
            <b>Полка хранения реактива</b>
          </p>
        )}
        <p className="move_column">
          <b>Списание</b>
        </p>
        {userRole === "admin" ? (
          <p className="move_column">
            <b>Удаление</b>
          </p>
        ) : (
          ""
        )}
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
          return (
            <div
              className={amount < 100 ? "low_reagent" : "reagent_row"}
              key={id}
            >
              {checkedId && <p className="id_col">{id}</p>}
              {checkedName && <p className="name_col">{name}</p>}
              {checkedAmount && <p className="amount_col">{amount}</p>}
              {checkedUnit && <p className="unit_col">{unit}</p>}
              {checkedProducer && <p className="producer_col">{producer}</p>}
              {checkedSupplier && <p className="supplier_col">{supplier}</p>}
              {checkedStorage && (
                <p className="storage_column">{storageConditions}</p>
              )}
              {checkedStoragePlace && (
                <p className="storagePlace_column">{storagePlace}</p>
              )}
              <p className="move_column">
                <button
                  type="button"
                  onClick={() => {
                    setCurReagent([name, id, unit, amount, uuid]);
                    document.querySelector(
                      ".modal_window_wraper",
                    ).style.display = "flex";
                  }}
                >
                  Списать
                </button>
              </p>
              {userRole === "admin" ? (
                <p className="move_column">
                  <button
                    type="button"
                    onClick={() => {
                      deleteReagent(uuid);
                      window.location.reload();
                    }}
                  >
                    Удалить
                  </button>
                </p>
              ) : (
                ""
              )}
            </div>
          );
        },
      )}
      <div className="modal_window_wraper">
        <button
          type="button"
          className="overflow"
          onClick={() => {
            document.querySelector(".modal_window_wraper").style.display =
              "none";
          }}
        />
        <div className="modal_window">
          <p className="reagent_name">{curReagent[0]}</p>
          <p className="reagent_ID">{curReagent[1]}</p>
          <input className="input_volume" />
          <p className="reagent_amount">{curReagent[2]}</p>
          <button
            className="write_off_btn"
            type="button"
            onClick={() => {
              reagentAmountChanger(
                curReagent[4],
                curReagent[3] -
                  Number(document.querySelector(".input_volume").value),
              );
              document.querySelector(".modal_window_wraper").style.display =
                "none";
              alert(
                `${curReagent[0]} списано ${document.querySelector(".input_volume").value} ${curReagent[2]}`,
              );
              window.location.reload();
            }}
          >
            Списать
          </button>
        </div>
      </div>
      <div className="add_reagent_window">
        <button
          type="button"
          className="overflow"
          onClick={() => {
            document.querySelector(".add_reagent_window").style.display =
              "none";
          }}
        />
        <div className="add_modal_window">
          <div>
            <p className="reagent_name">Наименование реактива</p>
            <input className="input_reagent_name" placeholder="name" />
          </div>
          <div>
            <p className="reagent_ID">ID реактива</p>
            <input className="input_reagent_ID" placeholder="ID" />
          </div>
          <div>
            <p className="reagent_amount">Объем/масса реактива</p>
            <input className="input_reagent_amount" placeholder="amount" />
          </div>
          <div>
            <p className="reagent_unit">Единицы измерения</p>
            <input className="input_reagent_unit" placeholder="unit" />
          </div>
          <div>
            <p className="reagent_min_amount">
              Минимальное количество реактива
            </p>
            <input
              className="input_reagent_min_amount"
              placeholder="min amount"
            />
          </div>
          <div>
            <p className="reagent_producer">Производитель</p>
            <input className="input_reagent_producer" placeholder="producer" />
          </div>
          <div>
            <p className="reagent_supplier">Поставщик</p>
            <input className="input_reagent_supplier" placeholder="supplier" />
          </div>
          <div>
            <p className="reagent_storageConditions">Условия хранения</p>
            <input
              className="input_reagent_storageConditions"
              placeholder="storageConditions"
            />
          </div>
          <div>
            <p className="reagent_storagePlace">Место хранеия</p>
            <input
              className="input_reagent_storagePlace"
              placeholder="storagePlace"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              addReagent(
                valueReturner("input_reagent_ID"),
                valueReturner("input_reagent_name"),
                valueReturner("input_reagent_amount"),
                valueReturner("input_reagent_min_amount"),
                valueReturner("input_reagent_unit"),
                valueReturner("input_reagent_supplier"),
                valueReturner("input_reagent_producer"),
                valueReturner("input_reagent_storageConditions"),
                valueReturner("input_reagent_storagePlace"),
              );
              window.location.reload();
            }}
          >
            Добавить реактив
          </button>
        </div>
      </div>
      <div className="add_user_window">
        <button
          type="button"
          className="overflow"
          onClick={() => {
            document.querySelector(".add_user_window").style.display = "none";
          }}
        />
        <div className="modal_window">
          <div>
            <p className="new_user_name">Имя пользователя</p>
            <input className="input_new_user_name" placeholder="user name" />
          </div>
          <div>
            <p className="new_user_pass">Пароль</p>
            <input className="input_new_user_pass" placeholder="password" />
          </div>
          <div>
            <p className="new_user_role">Роль</p>
            <input
              className="input_new_user_role"
              placeholder="admin, user, editor"
            />
          </div>
          <button
            type="button"
            className="add_user_btn"
            onClick={() => {
              addUser(
                valueReturner("input_new_user_name"),
                valueReturner("input_new_user_pass"),
                valueReturner("input_new_user_role"),
              );
              document.querySelector(".add_user_window").style.display = "none";
            }}
          >
            Добавить пользователя
          </button>
        </div>
      </div>
    </div>
  );
};

export { HomePage };
