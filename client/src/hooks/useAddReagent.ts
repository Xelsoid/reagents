import { useCallback } from "react";
import { useToast } from "./useToast";

export const useAddReagent = () => {
  const sendMessage = useToast();

  return useCallback(
    async ({
      id,
      name,
      amount,
      minAmount,
      unit,
      supplier,
      producer,
      storageConditions,
      storagePlace,
    }: any) => {
      try {
        const response = await fetch("/api/addReagent", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            name,
            amount,
            minAmount,
            unit,
            supplier,
            producer,
            storageConditions,
            storagePlace,
            isDeleted: false,
          }),
        });

        if (!response.ok) {
          sendMessage("Произошла ошибка. Реактив не добавлен!", "error");
          return;
        }

        const data = await response.json();
        const { reagent } = data.data;
        sendMessage(
          `Реактив "${reagent.name}" id(${reagent.id}) добавлен`,
          "success",
          false,
        );

        return reagent;
      } catch (error) {
        console.error("Ошибка:", error);

        sendMessage(
          "Произошла ошибка при попытке добавить новый реактив",
          "error",
        );
      }
    },
    [sendMessage],
  );
};
