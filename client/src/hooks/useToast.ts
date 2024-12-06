import { useSnackbar, VariantType } from "notistack";
import { useCallback } from "react";

export const useToast = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useCallback(
    (message: string, messageType: VariantType, persist: boolean = true) => {
      enqueueSnackbar(message, {
        variant: messageType,
        persist: persist,
      });
    },
    [enqueueSnackbar],
  );
};
