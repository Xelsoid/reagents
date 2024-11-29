import { useState } from "react"; // @ts-ignore

export const useTableFilter = () => {
  const [checkedId, setCheckedId] = useState(true);
  const [checkedName, setCheckedName] = useState(true);
  const [checkedAmount, setCheckedAmount] = useState(true);
  const [checkedUnit, setCheckedUnit] = useState(true);
  const [checkedProducer, setCheckedProducer] = useState(false);
  const [checkedSupplier, setCheckedSupplier] = useState(false);
  const [checkedStorage, setCheckedStorage] = useState(true);
  const [checkedStoragePlace, setCheckedStoragePlace] = useState(true);

  return {
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
  };
};
