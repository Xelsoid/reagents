// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import "../style/home_page.css";
import { reagentSorter } from "../helpers/reagentSorter";
import image from "../assets/logo.png";
import { ReagentWriteOffModal } from "../components/ReagentWriteOffModal";
import { ReagentAddModal } from "../components/ReagentAddModal";
import { logout } from "../helpers/logout";
import { ColleagueAddModal } from "../components/ColleagueAddModal";
import { ReagentsTable } from "../components/ReagentsTable";
import { ReagentsTableFilter } from "../components/ReagentsTableFilter";
import { ReagentsTableSorter } from "../components/ReagentsTableSorter";
import { ReagentDeleteModal } from "../components/ReagentDeleteModal";

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

const HomePage = () => {
  const [data, setData] = useState(null);
  const [curReagent, setCurReagent] = useState([]);
  const userRole = localStorage.getItem("role");
  const userName = localStorage.getItem("name");
  const isEditor = userRole === "editor";
  const isAdmin = userRole === "admin";

  const [openReagentWriteOffModal, setOpenReagentWriteOffModal] =
    useState(false);
  const [openReagentAddModal, setOpenReagentAddModal] = useState(false);
  const [openReagentDeleteModal, setOpenReagentDeleteModal] = useState(false);
  const [openColleagueAddModal, setOpenColleagueAddModal] = useState(false);
  const [deleteReagent, setDeleteReagent] = useState("");

  const handleCloseReagentWriteOffModal = () => {
    setOpenReagentWriteOffModal(false);
  };

  const handleCloseReagentAddModal = () => {
    setOpenReagentAddModal(false);
  };

  const handleCloseReagentDeleteModal = () => {
    setOpenReagentDeleteModal(false);
  };

  const handleCloseColleagueAddModal = () => {
    setOpenColleagueAddModal(false);
  };

  const handleReagentDelete = (reagent) => {
    setOpenReagentDeleteModal(true);
    setDeleteReagent(reagent);
  };

  const handleChangeAmount = (reagent) => {
    const { name, id, unit, amount, uuid } = reagent;
    setOpenReagentWriteOffModal(true);
    setCurReagent([name, id, unit, amount, uuid]);
  };

  console.log(data);
  useEffect(() => {
    const fetchData = async (url: string) => {
      const response = await fetch(url);
      if (response.ok) {
        const json = await response.json();
        if (json?.data) {
          setData(reagentSorter(json.data.reagents, "id_asc"));
        }
        return;
      }
      console.log(`Ошибка HTTP: ${response.status}`);
    };

    fetchData("/api/getReagents");
  }, []);

  const [tableConfiguration, setTableConfiguration] =
    useState(TABLE_CONFIGURATION);

  return (
    <div>
      <header className="main_header">
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

        {(isAdmin || isEditor) && (
          <Button
            variant="outlined"
            onClick={() => {
              setOpenReagentAddModal(true);
            }}
          >
            Добавить реактив
          </Button>
        )}

        {isAdmin && (
          <Button
            variant="outlined"
            onClick={() => {
              setOpenColleagueAddModal(true);
            }}
          >
            Добавить сотрудника
          </Button>
        )}
      </header>

      <main>
        <ReagentsTableSorter data={data} setData={setData} />

        <ReagentsTableFilter
          filterSequence={TABLE_KEYS_SEQUENCE}
          tableConfiguration={tableConfiguration}
          setTableConfiguration={setTableConfiguration}
        />

        {data?.length > 0 && (
          <ReagentsTable
            data={data}
            columnsSequence={TABLE_KEYS_SEQUENCE}
            tableConfiguration={tableConfiguration}
            handleReagentDelete={handleReagentDelete}
            handleChangeAmount={handleChangeAmount}
            showWriteOffBtn={isEditor || isAdmin}
            showDeleteBtn={isAdmin}
          />
        )}
      </main>
      <div>
        <ReagentWriteOffModal
          openModal={openReagentWriteOffModal}
          handleCloseModal={handleCloseReagentWriteOffModal}
          curReagent={curReagent}
        />
        <ReagentAddModal
          openAddReagent={openReagentAddModal}
          handleCloseAddReagent={handleCloseReagentAddModal}
        />

        <ReagentDeleteModal
          openModal={openReagentDeleteModal}
          closeModal={handleCloseReagentDeleteModal}
          reagent={deleteReagent}
        />

        <ColleagueAddModal
          openAddColleague={openColleagueAddModal}
          handleCloseAddColleague={handleCloseColleagueAddModal}
        />
      </div>
    </div>
  );
};

export { HomePage };
