import React, { useEffect, useState } from "react";
import "../style/home_page.css";
import { reagentAmountChanger } from "../helpers/changeAmountReagent.ts"
import { reagentSorter } from "../helpers/reagentSorter.ts"
import { changeAmountWindow } from "../modal_window/changeAmountWindow.js"
import { addReagent } from "../helpers/addReagent.ts"
import { valueReturner } from "../helpers/valueReturner.ts"
import { addUser } from "../helpers/addUser.ts"
import { deleteReagent } from "../helpers/deleteReagent.ts"
var image = require('../assets/logo.png')

const HomePage = () => {
  const [data, setData] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [curReagent, setCurReagent] = useState([]);
  const [checkedid, setcheckedid] = useState(true);
  const [checkedname, setcheckedname] = useState(true);
  const [checkedamount, setcheckedamount] = useState(true);
  const [checkedunit, setcheckedunit] = useState(true);
  const [checkedproducer, setcheckedproducer] = useState(false);
  const [checkedsupplier, setcheckedsupplier] = useState(false);
  const [checkedstorage, setcheckedstorage] = useState(true);
  const [checkedstoragePlace, setcheckedstoragePlace] = useState(true);
  const UserRole = localStorage.getItem("role");

  useEffect(() => {
    console.log('useEffect');
    const fetchData = async (url) => {
      const response = await fetch(url);
      if (response.ok) {
        let json = await response.json();
        if(json && json.data){
          setData(reagentSorter(json.data.reagents, 'Up_ID'))
        }
        return;
      }
      alert(`Ошибка HTTP: ${response.status}`);
    };

    fetchData("/api/api/getReagents");
  }, []);
  return (
    <div>
      <div className="main_header">
      <img className="logo_img" src = {image}></img>
      <p className="user_name">{localStorage.getItem("name")}</p>
        <button 
          type="button"
          onClick={() => {
            localStorage.clear();
            window.location.href = "http://localhost:3000/"
            }}>
            Выход
        </button>
        {UserRole === "admin" || UserRole === "editor" ? 
        <button onClick={ () => {document.querySelector(".add_reagent_window").style.display = "flex"}
        }>Добавить реактив</button> 
        : 
        ""}
        {UserRole === "admin" ? 
        <button onClick={ () => {document.querySelector(".add_user_window").style.display = "flex"}
        }>Добавить сотрудника</button> 
        : 
        ""}
      </div>
      <div>
        <p>Выберите вариант сортировки</p>
        <select name="select" value={selectedFilter} className="select_sort" onChange={(event) => {
          const sortedData = reagentSorter(data, event.target.value)
          setData(sortedData);
          setSelectedFilter(event.target.value)
        }}>
          <option value={'Up_ID'} className="sort_item"> По возрастанию ID</option>
          <option value={'Down_ID'} className="sort_item"> По убыванию ID</option>
          <option value={'A-Z'} className="sort_item"> По алфавиту А-Я </option>
          <option value={'Z-A'} className="sort_item"> По алфавиту Я-А </option>
        </select>
      </div>
      <div className="checkbox_wraper">
        <p>Выберите отображаемые столбцы</p>
        <div className="checkbox">
          <div>
            <input type="checkbox" name="ID" checked = {checkedid} onChange={(event) => {
              document.querySelectorAll('.id_col').forEach(item => {
                event.target.checked ? item.style.display = "block" : item.style.display = "none"
              });
              setcheckedid(!checkedid)}}/>
            <label for="ID">ID</label>
          </div>
          <div>
            <input type="checkbox" name="name" checked = {checkedname} onChange={(event) => {
              document.querySelectorAll('.name_col').forEach(item => {
                event.target.checked ? item.style.display = "block" : item.style.display = "none"
              });
              setcheckedname(!checkedname)}}/>
            <label for="name">Наимеонвание</label>
          </div>
          <div>
            <input type="checkbox" name="amount" checked = {checkedamount} onChange={(event) => {
              document.querySelectorAll('.amount_col').forEach(item => {
                event.target.checked ? item.style.display = "block" : item.style.display = "none"
              });
              setcheckedamount(!checkedamount)}}/>
            <label for="amount">Количество</label>
          </div>
          <div>
            <input type="checkbox"  name="unit" checked = {checkedunit} onChange={(event) => {
              document.querySelectorAll('.unit_col').forEach(item => {
                event.target.checked ? item.style.display = "block" : item.style.display = "none"
              });
              setcheckedunit(!checkedunit)}}/>
            <label for="unit">Единицы измерения</label>
          </div>
          <div>
            <input type="checkbox"  name="producer" checked = {checkedproducer} onChange={(event) => {
              document.querySelectorAll('.producer_col').forEach(item => {
                event.target.checked ? item.style.display = "block" : item.style.display = "none"
              });
              setcheckedproducer(!checkedproducer)}}/>
            <label for="producer">Номер серии</label>
          </div>
          <div>
            <input type="checkbox"  name="supplier" checked = {checkedsupplier} onChange={(event) => {
              document.querySelectorAll('.supplier_col').forEach(item => {
                event.target.checked ? item.style.display = "block" : item.style.display = "none"
              });
              setcheckedsupplier(!checkedsupplier)}}/>
            <label for="supplier">Поставщик</label>
          </div>
          <div>
            <input type="checkbox"  name="storage" checked = {checkedstorage} onChange={(event) => {
              document.querySelectorAll('.storage_column').forEach(item => {
                event.target.checked ? item.style.display = "block" : item.style.display = "none"
              });
              setcheckedstorage(!checkedstorage)}}/>
            <label for="storage">Условия хранения</label>
          </div>
          <div>
            <input type="checkbox"  name="storagePlace" checked = {checkedstoragePlace} onChange={(event) => {
              document.querySelectorAll('.storagePlace_column').forEach(item => {
                event.target.checked ? item.style.display = "block" : item.style.display = "none"
              });
              setcheckedstoragePlace(!checkedstoragePlace)}}/>
            <label for="storagePlace">Полка хранения реактива</label>
          </div>
        </div>
      </div>

        
      
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
          <b>Списание</b>
        </p>
        {UserRole === "admin" ? 
        <p className="move_column">
           <b>Удаление</b>
        </p> 
        : 
        ""}
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
              {UserRole === "admin" ? 
                <p className="move_column">
                <button
                  type="button"
                  onClick={() => {deleteReagent(uuid);
                  window.location.href = window.location.href;
                  } 
                  }
                >
                  Удалить
                </button>
              </p> 
                : 
              ""}
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
    <div className="add_reagent_window">
      <div className="overflow" onClick={() => document.querySelector(".add_reagent_window").style.display = "none"}></div>
      <div className="add_modal_window">
        <div>
          <p className="reagent_name">Наименование реактива</p>
          <input className="input_reagent_name" placeholder="name"></input>
        </div>
        <div>
          <p className="reagent_ID">ID реактива</p>
          <input className="input_reagent_ID" placeholder="ID"></input>
        </div>
        <div>
          <p className="reagent_amount">Объем/масса реактива</p>
          <input className="input_reagent_amount" placeholder="amount"></input>
        </div>
        <div>
          <p className="reagent_unit">Единицы измерения</p>
          <input className="input_reagent_unit" placeholder="unit"></input>
        </div>
        <div>
          <p className="reagent_min_amount">Минимальное количество реактива</p>
          <input className="input_reagent_min_amount" placeholder="min amount"></input>
        </div>
        <div> 
          <p className="reagent_producer">Производитель</p>
          <input className="input_reagent_producer" placeholder="producer"></input>
        </div>
        <div>
          <p className="reagent_supplier">Поставщик</p>
          <input className="input_reagent_supplier" placeholder="supplier"></input>
        </div>
        <div>
          <p className="reagent_storageConditions">Условия хранения</p>
          <input className="input_reagent_storageConditions" placeholder="storageConditions"></input>
        </div>
        <div>
          <p className="reagent_storagePlace">Место хранеия</p>
          <input className="input_reagent_storagePlace" placeholder="storagePlace"></input>
        </div>
        <button onClick={() => {
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
          window.location.href = window.location.href;
        }}>Добавить реактив</button>
      </div>
    </div>
    <div className="add_user_window">
      <div className="overflow" onClick={() => document.querySelector(".add_user_window").style.display = "none"}></div>
      <div className="modal_window">
        <div>
          <p className="new_user_name">Имя пользователя</p>
          <input className="input_new_user_name" placeholder="user name"></input>
        </div>
        <div>
          <p className="new_user_pass">Пароль</p>
          <input className="input_new_user_pass" placeholder="password"></input>
        </div>
        <div>
          <p className="new_user_role">Роль</p>
          <input className="input_new_user_role" placeholder="admin, user, editor"></input>
        </div>
        <button className="add_user_btn" onClick={() => {
        addUser(
          valueReturner("input_new_user_name"),
          valueReturner("input_new_user_pass"),
          valueReturner("input_new_user_role")
        )
          document.querySelector(".add_user_window").style.display = "none";
        }}>Добавить пользователя</button>
      </div>
    </div>
    </div>
  );
};

export { HomePage };
