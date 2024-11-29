// @ts-nocheck
import React, { useEffect, useState } from "react";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
} from "@mui/material";
import "../style/home_page.css";
import { reagentSorter } from "../helpers/reagentSorter";
import { deleteReagent } from "../helpers/deleteReagent";
import image from "../assets/logo.png";
import { useTableFilter } from "../components/ReagentsTableFilter/hooks/useTableFilter";
import { ReagentWriteOffModal } from "../components/ReagentWriteOffModal";
import { ReagentAddModal } from "../components/ReagentAddModal";
import { logout } from "../helpers/logout";
import { ColleagueAddModal } from "../components/ColleagueAddModal";

const HomePage = () => {
  const [data, setData] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [curReagent, setCurReagent] = useState([]);
  const userRole = localStorage.getItem("role");
  const userName = localStorage.getItem("name");
  const {
    checkedId,
    setCheckedId,
    checkedName,
    setCheckedName,
    checkedAmount,
    setCheckedAmount,
    checkedUnit,
    setCheckedUnit,
    checkedProducer,
    setCheckedProducer,
    checkedSupplier,
    setCheckedSupplier,
    checkedStorage,
    setCheckedStorage,
    checkedStoragePlace,
    setCheckedStoragePlace,
  } = useTableFilter();

  const [openModal, setOpenModal] = useState(false);
  const [openReagentAddModal, setOpenReagentAddModal] = useState(false);
  const [openColleagueAddModal, setOpenColleagueAddModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseReagentAddModal = () => {
    setOpenReagentAddModal(false);
  };

  const handleCloseColleagueAddModal = () => {
    setOpenColleagueAddModal(false);
  };

  useEffect(() => {
    const fetchData = async (url: string) => {
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
        {userName && <p className="user_name">{userName}</p>}
        {userName && (
          <Typography variant="body2">
            <Button
              variant="outlined"
              onClick={() => {
                logout();
                window.location.href = "/";
              }}
            >
              Выход
            </Button>
          </Typography>
        )}

        {(userRole === "admin" || userRole === "editor") && (
          <Typography variant="body2">
            <Button
              variant="outlined"
              onClick={() => {
                setOpenReagentAddModal(true);
              }}
            >
              Добавить реактив
            </Button>
          </Typography>
        )}

        {userRole === "admin" && (
          <Typography variant="body2">
            <Button
              variant="outlined"
              onClick={() => {
                setOpenColleagueAddModal(true);
              }}
            >
              Добавить сотрудника
            </Button>
          </Typography>
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
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedId}
                onChange={() => {
                  setCheckedId((prevValue) => !prevValue);
                }}
              />
            }
            label="ID"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedName}
                onChange={() => {
                  setCheckedName((prevValue) => !prevValue);
                }}
              />
            }
            label="Наименование"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedAmount}
                onChange={() => {
                  setCheckedAmount((prevValue) => !prevValue);
                }}
              />
            }
            label="Количество"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedUnit}
                onChange={() => {
                  setCheckedUnit((prevValue) => !prevValue);
                }}
              />
            }
            label="Единицы измерения"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedProducer}
                onChange={() => {
                  setCheckedProducer((prevValue) => !prevValue);
                }}
              />
            }
            label="Номер серии"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedSupplier}
                onChange={() => {
                  setCheckedSupplier((prevValue) => !prevValue);
                }}
              />
            }
            label="Поставщик"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedStorage}
                onChange={() => {
                  setCheckedStorage((prevValue) => !prevValue);
                }}
              />
            }
            label="Условия хранения"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedStoragePlace}
                onChange={() => {
                  setCheckedStoragePlace((prevValue) => !prevValue);
                }}
              />
            }
            label="Полка хранения реактива"
          />
        </FormGroup>
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
        {userRole === "admin" && (
          <p className="move_column">
            <b>Удаление</b>
          </p>
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
                <Typography variant="body2">
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setCurReagent([name, id, unit, amount, uuid]);
                      setOpenModal(true);
                    }}
                  >
                    Списать
                  </Button>
                </Typography>
              </p>
              {userRole === "admin" && (
                <p className="move_column">
                  <Typography variant="body2">
                    <Button
                      variant="outlined"
                      onClick={() => {
                        deleteReagent(uuid);
                        window.location.reload();
                      }}
                    >
                      Удалить
                    </Button>
                  </Typography>
                </p>
              )}
            </div>
          );
        },
      )}

      <ReagentAddModal
        openAddReagent={openReagentAddModal}
        handleCloseAddReagent={handleCloseReagentAddModal}
      />

      <ReagentWriteOffModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        curReagent={curReagent}
      />

      <ColleagueAddModal
        openAddColleague={openColleagueAddModal}
        handleCloseAddColleague={handleCloseColleagueAddModal}
      />
    </div>
  );
};

export { HomePage };
