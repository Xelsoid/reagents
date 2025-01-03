import { useCallback, useState } from 'react';

export const useModal = (initialState = false): [boolean, () => void, () => void, () => void] => {
  const [isShown, setIsShown] = useState<boolean>(initialState);
  const openModal = useCallback(() => setIsShown(true), []);
  const closeModal = useCallback(() => setIsShown(false), []);
  const toggleModal = useCallback(() => setIsShown((prevState) => !prevState), []);

  return [isShown, openModal, closeModal, toggleModal];
};
