// @ts-nocheck
import React, { useEffect, useState } from 'react';
import '../style/home_page.css';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import FaceIcon from '@mui/icons-material/Face';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Box from '@mui/joy/Box';
import { LogInModal } from '../components/LogInModal';
import image from '../assets/logo.png';
import { sortReagents } from '../helpers/sortReagents';
import { getCookieValue } from '../helpers/parseCookie';
import { ReagentWriteOffModal } from '../components/ReagentWriteOffModal';
import { ReagentAddModal } from '../components/ReagentAddModal';
import { ColleagueAddModal } from '../components/ColleagueAddModal';
import { ReagentsTable } from '../components/ReagentsTable';
import { ReagentsTableFilter } from '../components/ReagentsTableFilter';
import { ReagentsTableSorter } from '../components/ReagentsTableSorter';
import { ReagentDeleteModal } from '../components/ReagentDeleteModal';
import { useModal } from '../hooks/useModal';
import { LogOutModal } from '../components/LogOutModal';

const TABLE_KEYS_SEQUENCE = [
  'id',
  'name',
  'amount',
  'unit',
  'producer',
  'supplier',
  'storageConditions',
  'storagePlace',
];

const TABLE_CONFIGURATION = {
  id: { label: 'Id', checked: true },
  name: { label: 'Наименование', checked: true },
  amount: { label: 'Количество', checked: true },
  unit: { label: 'Единицы измерения', checked: true },
  producer: { label: 'Номер серии', checked: false },
  supplier: { label: 'Поставщик', checked: false },
  storageConditions: { label: 'Условия хранения', checked: true },
  storagePlace: { label: 'Полка хранения', checked: true },
};

const HomePage = () => {
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState('id_asc');
  const [curReagent, setCurReagent] = useState([]);
  const userRole = getCookieValue('role');
  const userName = getCookieValue('name');
  const isEditor = userRole === 'editor';
  const isAdmin = userRole === 'admin';
  const [tableConfiguration, setTableConfiguration] = useState(TABLE_CONFIGURATION);

  const [isLoginModalShown, openLoginModal, closeLoginModal] = useModal();
  const [isLogoutModalShown, openLogoutModal, closeLogoutModal] = useModal();
  const [isReagentWriteOffModalShown, openReagentWriteOffModal, closeReagentWriteOffModal] =
    useModal();
  const [isAddReagentModalShown, openAddReagentModal, closeAddReagentModal] = useModal();
  const [isDeleteReagentModalShown, openDeleteReagentModal, closeDeleteReagentModal] = useModal();
  const [isAddColleagueModalShown, openAddColleagueModal, closeAddColleagueModal] = useModal();

  const [deleteReagent, setDeleteReagent] = useState('');

  const handleReagentDelete = (reagent) => {
    openDeleteReagentModal();
    setDeleteReagent(reagent);
  };

  const handleChangeAmount = (reagent) => {
    openReagentWriteOffModal();
    setCurReagent(reagent);
  };

  useEffect(() => {
    const fetchData = async (url: string) => {
      const response = await fetch(url);
      if (response.ok) {
        const json = await response.json();
        if (json?.data) {
          setData(sortReagents(json.data.reagents, sorting));
        }
        return;
      }
      console.error(`Ошибка HTTP: ${response.status}`);
    };

    fetchData('/api/getReagents');
    // TODO: fix dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data.length === 0) {
      return;
    }

    const sortedData = sortReagents(data, sorting);
    setData(sortedData);
    // TODO: fix dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]);

  return (
    <div>
      <header>
        <Grid
          container
          justifyContent="space-between" // Центрирование по горизонтали
          alignItems="center" // Центрирование по вертикали
        >
          <Grid item>
            <img width={140} height={100} src={image} alt="Company logo" />
          </Grid>
          <Grid item>
            {userName && <Typography color="textPrimary">Добро пожаловать {userName}</Typography>}
          </Grid>
          <Grid item>
            {(isAdmin || isEditor) && (
              <Button
                variant="contained"
                endIcon={<ScienceOutlinedIcon />}
                onClick={openAddReagentModal}
              >
                Добавить реактив
              </Button>
            )}
          </Grid>
          <Grid item>
            {isAdmin && (
              <Button variant="contained" endIcon={<FaceIcon />} onClick={openAddColleagueModal}>
                Добавить сотрудника
              </Button>
            )}
          </Grid>
          <Grid item>
            {userName && (
              <Button variant="contained" endIcon={<LogoutIcon />} onClick={openLogoutModal}>
                Выйти
              </Button>
            )}
            {!userName && (
              <Button variant="contained" endIcon={<LoginIcon />} onClick={openLoginModal}>
                Войти
              </Button>
            )}
          </Grid>
        </Grid>
      </header>

      <main>
        <Box sx={{ my: 2, width: 200 }}>
          <ReagentsTableSorter sorting={sorting} setSorting={setSorting} />
        </Box>

        <Box sx={{ my: 1 }}>
          <ReagentsTableFilter
            filterSequence={TABLE_KEYS_SEQUENCE}
            tableConfiguration={tableConfiguration}
            setTableConfiguration={setTableConfiguration}
          />
        </Box>

        <ReagentsTable
          data={data}
          columnsSequence={TABLE_KEYS_SEQUENCE}
          tableConfiguration={tableConfiguration}
          handleReagentDelete={handleReagentDelete}
          handleChangeAmount={handleChangeAmount}
          showWriteOffBtn={isEditor || isAdmin}
          showDeleteBtn={isAdmin}
        />
      </main>
      <div>
        <LogInModal isModalShown={isLoginModalShown} closeModal={closeLoginModal} />

        <LogOutModal isModalShown={isLogoutModalShown} closeModal={closeLogoutModal} />

        <ReagentWriteOffModal
          isModalShown={isReagentWriteOffModalShown}
          closeModal={closeReagentWriteOffModal}
          reagent={curReagent}
          data={data}
          setData={setData}
        />

        <ReagentAddModal
          isModalShown={isAddReagentModalShown}
          closeModal={closeAddReagentModal}
          data={data}
          setData={setData}
        />

        <ReagentDeleteModal
          isModalShown={isDeleteReagentModalShown}
          closeModal={closeDeleteReagentModal}
          reagent={deleteReagent}
          data={data}
          setData={setData}
        />

        <ColleagueAddModal
          isModalShown={isAddColleagueModalShown}
          closeModal={closeAddColleagueModal}
        />
      </div>
    </div>
  );
};

export { HomePage };
