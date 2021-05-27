const languageOpts: string[] = ['javascript','php','c#','c++','c','java','phyton','outra'];

function createDynamicOptions(selectElement:string,optionValues: string[]):void{
    const select  = document.querySelector(selectElement);
    if(select) {
   for(let i = 0; i < optionValues.length; i++){
    const optElement: HTMLOptionElement = document.createElement('option');
    optElement.innerText = optionValues[i]
    select.appendChild(optElement);
}
    }
}
createDynamicOptions('[data-language="select"]',languageOpts);
