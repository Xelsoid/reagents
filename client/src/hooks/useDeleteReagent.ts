import { useCallback } from "react";
import { useToast } from "./useToast";

export const useDeleteReagent = () => {
  const sendMessage = useToast();

  return useCallback(
    async (uuid: string) => {
      try {
        const response = await fetch("/api/deleteReagent", {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uuid,
          }),
        });

        if (!response.ok) {
          if (response.status === 401) {
            sendMessage("У Вас нет прав на удаление реактива", "error");
            return;
          }
          sendMessage("Произошла ошибка. Реагент не был удален", "error");
          return;
        }

        const data = await response.json();
        sendMessage(`Реагент был удален`, "success", false);

        // TODO: fix return
        // eslint-disable-next-line consistent-return
        return data;
      } catch (error) {
        console.error("Ошибка:", error);
        sendMessage("Произошла ошибка при попытке удалить реагент", "error");
      }
    },
    [sendMessage],
  );
};
