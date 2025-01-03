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
// @ts-ignore next line
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
import { useGetReagents } from '../hooks/useGetReagents';
import { SORTING_METHODS, ROLES, IReagent, COOKIE } from '../constants';

interface IColumnProps {
  label: string;
  checked: boolean;
}

export interface ITableConfiguration {
  id: IColumnProps;
  name: IColumnProps;
  amount: IColumnProps;
  unit: IColumnProps;
  producer: IColumnProps;
  supplier: IColumnProps;
  storageConditions: IColumnProps;
  storagePlace: IColumnProps;
}

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

const TABLE_KEYS_SEQUENCE: (keyof ITableConfiguration)[] = [
  'id',
  'name',
  'amount',
  'unit',
  'producer',
  'supplier',
  'storageConditions',
  'storagePlace',
];

const HomePage = () => {
  const [data, setData] = useState<IReagent[] | null>(null);
  const [sorting, setSorting] = useState<SORTING_METHODS>(SORTING_METHODS.ID_ASC);
  const [curReagent, setCurReagent] = useState<IReagent | null>(null);
  const [deleteReagent, setDeleteReagent] = useState<IReagent | null>(null);

  const userRole = getCookieValue(COOKIE.ROLE);
  const userName = getCookieValue(COOKIE.NAME);
  const isEditor = userRole === ROLES.EDITOR;
  const isAdmin = userRole === ROLES.ADMIN;
  const isUser = userRole === ROLES.USER;
  const isAuthenticated = isEditor || isAdmin || isUser;
  const [tableConfiguration, setTableConfiguration] =
    useState<ITableConfiguration>(TABLE_CONFIGURATION);

  const [isLoginModalShown, openLoginModal, closeLoginModal] = useModal();
  const [isLogoutModalShown, openLogoutModal, closeLogoutModal] = useModal();
  const [isReagentWriteOffModalShown, openReagentWriteOffModal, closeReagentWriteOffModal] =
    useModal();
  const [isAddReagentModalShown, openAddReagentModal, closeAddReagentModal] = useModal();
  const [isDeleteReagentModalShown, openDeleteReagentModal, closeDeleteReagentModal] = useModal();
  const [isAddColleagueModalShown, openAddColleagueModal, closeAddColleagueModal] = useModal();

  const getReagents = useGetReagents();

  const handleReagentDelete = (reagent: IReagent) => {
    openDeleteReagentModal();
    setDeleteReagent(reagent);
  };

  const handleChangeAmount = (reagent: IReagent) => {
    openReagentWriteOffModal();
    setCurReagent(reagent);
  };

  useEffect(() => {
    const fetchData = async () => {
      const reagents = await getReagents();
      if (reagents?.length) {
        setData(sortReagents(reagents, sorting));
      }
    };

    if (isAuthenticated) {
      fetchData();
    }
    // TODO: fix dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    if (!data?.length) {
      return;
    }

    const sortedData = sortReagents(data, sorting);
    setData(sortedData);
    // TODO: fix dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]);

  return (
    <Box sx={{ display: 'flex', margin: 'auto', maxWidth: '1200px' }}>
      <Box sx={{ width: '100%', maxWidth: '1200px' }}>
        <header>
          <Grid
            container
            justifyContent="space-between" // Центрирование по горизонтали
            alignItems="center" // Центрирование по вертикали
            width={'100%'}
          >
            <Grid component="div">
              <img width={140} height={100} src={image} alt="Company logo" />
            </Grid>
            <Grid component="div">
              {userName && <Typography color="textPrimary">Добро пожаловать {userName}</Typography>}
            </Grid>
            <Grid component="div">
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
            <Grid component="div">
              {isAdmin && (
                <Button variant="contained" endIcon={<FaceIcon />} onClick={openAddColleagueModal}>
                  Добавить сотрудника
                </Button>
              )}
            </Grid>
            <Grid component="div">
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
          {!isAuthenticated && (
            <Box sx={{ display: 'flex', height: '80vh' }}>
              <Typography sx={{ margin: 'auto', fontSize: '40px' }}>
                Чтобы продолжить работу, пожалуйста войдите в систему
              </Typography>
            </Box>
          )}
          {isAuthenticated && (
            <>
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
                showDeleteBtn={isAdmin}
              />
            </>
          )}
        </main>
        <div>
          <LogInModal isModalShown={isLoginModalShown} closeModal={closeLoginModal} />

          <LogOutModal isModalShown={isLogoutModalShown} closeModal={closeLogoutModal} />

          {data && (
            <>
              {curReagent && (
                <ReagentWriteOffModal
                  isModalShown={isReagentWriteOffModalShown}
                  closeModal={closeReagentWriteOffModal}
                  reagent={curReagent}
                  data={data}
                  setData={setData}
                />
              )}

              <ReagentAddModal
                isModalShown={isAddReagentModalShown}
                closeModal={closeAddReagentModal}
                data={data}
                setData={setData}
              />

              {deleteReagent && (
                <ReagentDeleteModal
                  isModalShown={isDeleteReagentModalShown}
                  closeModal={closeDeleteReagentModal}
                  reagent={deleteReagent}
                  data={data}
                  setData={setData}
                />
              )}
            </>
          )}

          <ColleagueAddModal
            isModalShown={isAddColleagueModalShown}
            closeModal={closeAddColleagueModal}
          />
        </div>
      </Box>
    </Box>
  );
};

export { HomePage };
