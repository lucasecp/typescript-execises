import {addDataTable} from './createDataTable'
import {users,FieldsForm } from './users'
import {saveLocalStorage,getLocalStorage} from './localStorage'

const inputName = document.getElementById('name') as HTMLInputElement
const inputEmail = document.getElementById('email') as HTMLInputElement
const inputBirthday = document.getElementById('birthday') as HTMLInputElement
const selectLanguage = document.getElementById('programming-language') as HTMLSelectElement


const fieldErrors = {
    name: '',birthdate: '', language: '',email: ''
}


function handleSubmit(): void {
    const fieldsValue: FieldsForm = {
        name: inputName.value,
        email: inputEmail.value,
        birthdate: inputBirthday.value,
        language: selectLanguage.value,
    }
     //clear errors in the next submit
     clearErrors()

    const hasErrorForm: boolean = validateForm(fieldsValue);
    // has error stop submit
    if(hasErrorForm) return;
    
    users.push(fieldsValue)
    
    
    saveLocalStorage(users)
    addDataTable(users);
    clearInputs();
    window.alert('Pesquisa salva! Obrigado.');
}
function validateForm(fields: FieldsForm): boolean{
    const dateFormat = inputBirthday.value.split('/').reverse()

    const date: any = new Date(dateFormat.join('-'))
    if(!fields.name.trim() ) { 
        fieldErrors.name = 'Campo Obrigatório.';
        createHtmlError(inputName,fieldErrors.name)
    }
    if(!fields.email.trim() )  {
        fieldErrors.email = 'Campo Obrigatório.'
        createHtmlError(inputEmail,fieldErrors.email)
    }
    if(fields.language === 'selecione' )  {
        fieldErrors.language = 'Selecione uma linguagem.'
        createHtmlError(selectLanguage,fieldErrors.language)
    }
    if(date == 'Invalid Date' || !fields.birthdate){ 
        fieldErrors.birthdate = 'Data inválida.'
        createHtmlError(inputBirthday,fieldErrors.birthdate)
    }
    let hasError: boolean = false;
    for(let i = 0; i < Object.keys(fieldErrors).length;i++){
        if(Object.values(fieldErrors)[i]) {
            hasError = true
            break;
        }
    }
    return hasError
}
function createHtmlError(element: any, label:string):void{
    const paragraph = document.createElement('p');
    element.insertAdjacentElement('afterend',paragraph);
    paragraph.setAttribute('data-error' ,'form');
   paragraph.innerText = label;
}
function clearErrors():void{
        fieldErrors['name'] = '';
        fieldErrors['email'] = '';
        fieldErrors['birthdate'] = '';
        fieldErrors['language'] = '';
        const elementErrors = document.querySelectorAll('[data-error="form"]');
        Array.from(elementErrors).forEach((element: any): void => {
            element.style.display = 'none'
        });
        
}
function clearInputs(): void{
     inputName.value = ''
     inputBirthday.value = ''
     inputEmail.value = ''
     selectLanguage.value = ''
}


// EVENTS
window.addEventListener('load',windowOnload);

function windowOnload(): void{
    const usersLocal: any = getLocalStorage();
    if(usersLocal){
        users.push(...usersLocal)
        addDataTable(usersLocal)
    }
}

const form = document.querySelector('.questions-form');
if(form){
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        handleSubmit()
    })
}
// MASC
inputBirthday.addEventListener('keypress', function (event) {
    const element:any = event.target;
    if(event.code === 'NumpadDivide')  return
    if (element.value.length >= 10) {
        element.value = element.value.slice(0, 9);
        return;
    }
    if (element.value.length === 2 || element.value.length === 5)
        element.value += '/';
});
inputBirthday.addEventListener('change', function (event) {
    const element:any = event.target;
    if (element.value.length > 10) {
        element.value = element.value.slice(0, 9);
        return;
    }
});