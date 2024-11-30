// @ts-nocheck
import React, { useEffect, useState } from "react";
import { FormGroup, FormControlLabel, Checkbox, Button } from "@mui/material";
import "../style/home_page.css";
import { reagentSorter } from "../helpers/reagentSorter";
import { deleteReagent } from "../helpers/deleteReagent";
import image from "../assets/logo.png";
import { ReagentWriteOffModal } from "../components/ReagentWriteOffModal";
import { ReagentAddModal } from "../components/ReagentAddModal";
import { logout } from "../helpers/logout";
import { ColleagueAddModal } from "../components/ColleagueAddModal";
import { ReagentsTable } from "../components/ReagentsTable";

const HomePage = () => {
  const [data, setData] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [curReagent, setCurReagent] = useState([]);
  const userRole = localStorage.getItem("role");
  const userName = localStorage.getItem("name");

  const [openReagentWriteOffModal, setOpenReagentWriteOffModal] =
    useState(false);
  const [openReagentAddModal, setOpenReagentAddModal] = useState(false);
  const [openColleagueAddModal, setOpenColleagueAddModal] = useState(false);

  const handleCloseReagentWriteOffModal = () => {
    setOpenReagentWriteOffModal(false);
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

  const TABLE_KEYS_SEQUENCE = [
    "id",
    "name",
    "amount",
    "unit",
    "producer",
    "supplier",
    "storageConditions",
    "storagePlace",
  ];

  const TABLE_CONFIGURATION = {
    id: { label: "Id", checked: true },
    name: { label: "Наименование", checked: true },
    amount: { label: "Количество", checked: true },
    unit: { label: "Единицы измерения", checked: true },
    producer: { label: "Номер серии", checked: false },
    supplier: { label: "Поставщик", checked: false },
    storageConditions: { label: "Условия хранения", checked: true },
    storagePlace: { label: "Полка хранения", checked: true },
  };

  const [tableConfiguration, setTableConfiguration] =
    useState(TABLE_CONFIGURATION);
  console.log(tableConfiguration);
  return (
    <div>
      <div className="main_header">
        <img className="logo_img" src={image} alt="logo" />
        {userName && <p className="user_name">{userName}</p>}
        {userName && (
          <Button
            variant="outlined"
            onClick={() => {
              logout();
              window.location.href = "/";
            }}
          >
            Выход
          </Button>
        )}

        {(userRole === "admin" || userRole === "editor") && (
          <Button
            variant="outlined"
            onClick={() => {
              setOpenReagentAddModal(true);
            }}
          >
            Добавить реактив
          </Button>
        )}

        {userRole === "admin" && (
          <Button
            variant="outlined"
            onClick={() => {
              setOpenColleagueAddModal(true);
            }}
          >
            Добавить сотрудника
          </Button>
        )}
      </div>
      <div>
        <p>Cортировка</p>
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

      <FormGroup row>
        {TABLE_KEYS_SEQUENCE.map((key) => {
          const { label, checked } = tableConfiguration[key];
          const handleOnChange = () => {
            setTableConfiguration({
              ...tableConfiguration,
              [key]: { ...tableConfiguration[key], checked: !checked },
            });
          };
          return (
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={handleOnChange} />}
              label={label}
              key={key}
            />
          );
        })}
      </FormGroup>

      {data?.length > 0 && (
        <ReagentsTable
          data={data}
          columnsSequence={TABLE_KEYS_SEQUENCE}
          tableConfiguration={tableConfiguration}
          showWriteOffBtn
          showDeleteBtn
        />
      )}

      {data?.map(({ amount, uuid, unit, id, name }) => {
        return (
          <div
            className={amount < 100 ? "low_reagent" : "reagent_row"}
            key={id}
          >
            <p className="move_column">
              <Button
                variant="outlined"
                onClick={() => {
                  setCurReagent([name, id, unit, amount, uuid]);
                  handleCloseReagentWriteOffModal(true);
                }}
              >
                Списать
              </Button>
            </p>
            {userRole === "admin" && (
              <p className="move_column">
                <Button
                  variant="outlined"
                  onClick={() => {
                    deleteReagent(uuid);
                    window.location.reload();
                  }}
                >
                  Удалить
                </Button>
              </p>
            )}
          </div>
        );
      })}

      <ReagentWriteOffModal
        openModal={openReagentWriteOffModal}
        handleCloseModal={handleCloseReagentWriteOffModal}
        curReagent={curReagent}
      />

      <ReagentAddModal
        openAddReagent={openReagentAddModal}
        handleCloseAddReagent={handleCloseReagentAddModal}
      />

      <ColleagueAddModal
        openAddColleague={openColleagueAddModal}
        handleCloseAddColleague={handleCloseColleagueAddModal}
      />
    </div>
  );
};

export { HomePage };
