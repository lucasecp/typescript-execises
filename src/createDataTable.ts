import {stateButton} from './dataDelete'
export function addDataTable(data: any[] ):void{
  const tbody = document.querySelector('[data-table=questions-table] tbody')!;
  if (tbody.children.length || !data.length) Array.from(tbody.children).forEach((element) => tbody.removeChild(element) ); 
  stateButton()
  for(let i = 0;i< data.length;i++){
      const tr: HTMLTableRowElement = document.createElement('tr');
      for(let j = 0; j < Object.keys(data[i]).length;j++){
          const td:HTMLTableDataCellElement = document.createElement('td');
          td.innerText = Object.values(data[i] as string)[j]
          tr.appendChild(td)
      
      tbody.appendChild(tr)
  }
}
}
