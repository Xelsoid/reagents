import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Button from '@mui/joy/Button';
import { useDeleteReagent } from '../../hooks/useDeleteReagent';
import { IReagent } from '../../constants';

interface IReagentDeleteModal {
  isModalShown: boolean;
  closeModal: () => void;
  reagent: IReagent;
}

const ReagentDeleteModal: React.FC<IReagentDeleteModal> = ({
  isModalShown,
  closeModal,
  reagent,
}) => {
  const { name, uuid, amount, unit, id } = reagent;
  const { mutate: deleteReagent, isPending } = useDeleteReagent(closeModal);

  const handleDeleteReagent = async () => {
    deleteReagent(uuid);
  };

  return (
    <Dialog open={isModalShown} onClose={closeModal}>
      <DialogTitle>Вы действительно хотите удалить реактив?</DialogTitle>

      <DialogContent>
        {id} {name} ({amount}
        {unit})
      </DialogContent>
      <DialogActions>
        <Button disabled={isPending} onClick={closeModal}>
          Отмена
        </Button>
        <Button loading={isPending} onClick={handleDeleteReagent}>
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ReagentDeleteModal };
