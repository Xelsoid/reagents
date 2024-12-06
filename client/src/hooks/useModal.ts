import { useCallback, useState } from "react";

export const useModal = (initialState = false) => {
  const [isShown, setIsShown] = useState(initialState);
  const openModal = useCallback(() => setIsShown(true), []);
  const closeModal = useCallback(() => setIsShown(false), []);
  const toggleModal = useCallback(
    () => setIsShown((prevState) => !prevState),
    [],
  );

  return [isShown, openModal, closeModal, toggleModal];
};
