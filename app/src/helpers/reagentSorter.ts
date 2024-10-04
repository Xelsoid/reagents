export function reagentSorter(data, method){
  if(method === 'Up_ID' || method === 'Down_ID'){
    return data.sort((a, b) => {
        let aID = +a.id.split('-')[0];
        let bID = +b.id.split('-')[0];
        if (method === 'Up_ID') {
            return aID < bID? -1 : 1;
        } else {
            return aID > bID? -1 : 1;
        }
    })
} else if (method === 'A-Z' || method === 'Z-A'){
    return data.sort((a, b) => {
        if(method === 'A-Z'){
            return a.name < b.name? -1 : 1
        } else {
            return a.name > b.name? -1 : 1
        }
        
    })
}
}

/*<div>
        <p>Выберите вариант сортировки</p>
        <select name="select" className="select_sort" onChange={() => {setData(reagentSorter(data, document.querySelector('.select_sort').value));
          console.log(data)
        }}>
          <option value={'Up_ID'} className="sort_item"> По возрастанию ID</option>
          <option value={'Down_ID'} className="sort_item"> По убыванию ID</option>
          <option value={'A-Z'} className="sort_item"> По алфавиту А-Я </option>
          <option value={'Z-A'} className="sort_item"> По алфавиту Я-А </option>
        </select>
      </div>*/
