import {getLocalStorage,deleteLocalStorage} from './localStorage'
import {addDataTable} from './createDataTable'
import {users} from './users'
const btn:any = document.querySelector('[data-button="delete"]');
if (btn) btn.addEventListener('click',dataDelete)

function dataDelete():void {
    deleteLocalStorage();
    addDataTable([]); // Clear tr element dom
    for(let i in users) users.pop()
}
export function stateButton (): void{
    if(!getLocalStorage()) btn.style.display = 'none';
    else btn.style.display = 'block';
}
