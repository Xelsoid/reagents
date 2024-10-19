import { addEntryToLogs } from "../repositories/logger.repository";
import { IReagent } from "../interface/reagents";
import { User } from "../interface/auth";

export const addNewEntryToLogs = (
  requestBody: Required<IReagent>,
  user: User,
  operationType?: string,
) => {
  const {
    uuid,
    id,
    name,
    amount,
    prevAmount,
    unit,
    supplier,
    producer,
    storageConditions,
    storagePlace,
  } = requestBody;

  const amountDif = amount - prevAmount;
  if (amountDif === 0) return;

  const operation = !operationType && amountDif > 0 ? "Receipt" : "Write-off";

  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0"); // Получаем день и добавляем ведущий ноль
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Получаем месяц (0-11) и добавляем 1
  const year = String(date.getFullYear()).slice(-2); // Получаем последние 2 цифры года
  const formattedDate = `${day}/${month}/${year}`;

  // Форматирование времени в формате HH:MM
  const hours = String(date.getHours()).padStart(2, "0"); // Получаем часы
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Получаем минуты
  const formattedTime = `${hours}:${minutes}`;

  const { user_id } = user;

  const reagent = {
    uuid,
    id,
    name,
    amount,
    unit,
    supplier,
    producer,
    storageConditions,
    storagePlace,
    amountDif,
    date: formattedDate,
    time: formattedTime,
  };

  return addEntryToLogs(reagent, user_id, operationType ?? operation);
};
