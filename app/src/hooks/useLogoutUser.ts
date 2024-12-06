import { useCallback } from "react";
import { useToast } from "./useToast";

export const useUserLogout = () => {
  const sendMessage = useToast();

  return useCallback(async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        sendMessage("Не удалось осуществить выход из системы", "error");
        return;
      }

      const data = await response.json();
      sendMessage(`Вы вышли из системы`, "success", false);
      return data;
    } catch (error) {
      console.error("Ошибка:", error);

      sendMessage("Не удалось осуществить выход из системы", "error");
    }
  }, [sendMessage]);
};
