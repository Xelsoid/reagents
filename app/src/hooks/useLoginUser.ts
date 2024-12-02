import { useCallback } from "react";
import { setCustomerDataToStorage } from "../helpers/manageCustomerDataStorage";

export const useUserLogin = (setMessage: any) => {
  return useCallback(
    async (name: string, password: string) => {
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, password }),
        });

        if (!response.ok) {
          setMessage("Неверный логин или пароль", {
            variant: "error",
            size: "lg",
            persist: true,
          });
          return;
        }

        const data = await response.json();
        setCustomerDataToStorage(data.name, data.role);

        setMessage(`Добро пожаловать ${data.name}`, {
          variant: "success",
          size: "lg",
          persist: true,
        });
      } catch (error) {
        console.error("Ошибка:", error);

        setMessage("Произошла ошибка при входе", {
          variant: "error",
          size: "lg",
          persist: true,
        });
      }
    },
    [setMessage],
  );
};
