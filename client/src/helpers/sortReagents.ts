import { SORTING_METHODS, IReagent } from '../constants';

export function sortReagents(data: IReagent[], method: SORTING_METHODS) {
  const copiedData = [...data];
  if (method === SORTING_METHODS.ID_ASC || method === SORTING_METHODS.ID_DESC) {
    return copiedData.sort((a, b) => {
      const aID = Number(a.id.split('-')[0]);
      const bID = Number(b.id.split('-')[0]);
      if (method === SORTING_METHODS.ID_ASC) {
        return aID < bID ? -1 : 1;
      }
      return aID > bID ? -1 : 1;
    });
  }
  if (method === SORTING_METHODS.ALPHABET_ASC || method === SORTING_METHODS.ALPHABET_DESC) {
    return copiedData.sort((a, b) => {
      if (method === SORTING_METHODS.ALPHABET_ASC) {
        return a.name < b.name ? -1 : 1;
      }
      return a.name > b.name ? -1 : 1;
    });
  }
  return copiedData;
}
