// @ts-nocheck
export function reagentSorter(data, method) {
  if (method === "id_asc" || method === "id_desc") {
    return data.sort((a, b) => {
      const aID = Number(a.id.split("-")[0]);
      const bID = Number(b.id.split("-")[0]);
      if (method === "id_asc") {
        return aID < bID ? -1 : 1;
      }
      return aID > bID ? -1 : 1;
    });
  }
  if (method === "alphabet_asc" || method === "alphabet_desc") {
    return data.sort((a, b) => {
      if (method === "alphabet_asc") {
        return a.name < b.name ? -1 : 1;
      }
      return a.name > b.name ? -1 : 1;
    });
  }
  return data;
}
