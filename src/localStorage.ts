export function saveLocalStorage(users: any[]): void{
    window.localStorage.setItem('pesquisados',JSON.stringify(users));
}
export function getLocalStorage(): any{
    const data = window.localStorage.getItem('pesquisados');
    if(typeof data === 'string') {
        return JSON.parse(data);
    }
    return null
}
export function deleteLocalStorage(): any{
   window.localStorage.removeItem('pesquisados');
}