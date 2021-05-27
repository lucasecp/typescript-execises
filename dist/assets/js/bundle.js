/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/createDataTable.ts":
/*!********************************!*\
  !*** ./src/createDataTable.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addDataTable": () => (/* binding */ addDataTable)
/* harmony export */ });
/* harmony import */ var _dataDelete__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataDelete */ "./src/dataDelete.ts");

function addDataTable(data) {
    const tbody = document.querySelector('[data-table=questions-table] tbody');
    if (tbody.children.length || !data.length)
        Array.from(tbody.children).forEach((element) => tbody.removeChild(element));
    (0,_dataDelete__WEBPACK_IMPORTED_MODULE_0__.stateButton)();
    for (let i = 0; i < data.length; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < Object.keys(data[i]).length; j++) {
            const td = document.createElement('td');
            td.innerText = Object.values(data[i])[j];
            tr.appendChild(td);
            tbody.appendChild(tr);
        }
    }
}


/***/ }),

/***/ "./src/createOptions.ts":
/*!******************************!*\
  !*** ./src/createOptions.ts ***!
  \******************************/
/***/ (() => {


const languageOpts = ['javascript', 'php', 'c#', 'c++', 'c', 'java', 'phyton', 'outra'];
function createDynamicOptions(selectElement, optionValues) {
    const select = document.querySelector(selectElement);
    if (select) {
        for (let i = 0; i < optionValues.length; i++) {
            const optElement = document.createElement('option');
            optElement.innerText = optionValues[i];
            select.appendChild(optElement);
        }
    }
}
createDynamicOptions('[data-language="select"]', languageOpts);


/***/ }),

/***/ "./src/dataDelete.ts":
/*!***************************!*\
  !*** ./src/dataDelete.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "stateButton": () => (/* binding */ stateButton)
/* harmony export */ });
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./localStorage */ "./src/localStorage.ts");
/* harmony import */ var _createDataTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createDataTable */ "./src/createDataTable.ts");
/* harmony import */ var _users__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./users */ "./src/users.ts");



const btn = document.querySelector('[data-button="delete"]');
if (btn)
    btn.addEventListener('click', dataDelete);
function dataDelete() {
    (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.deleteLocalStorage)();
    (0,_createDataTable__WEBPACK_IMPORTED_MODULE_1__.addDataTable)([]); // Clear tr element dom
    for (let i in _users__WEBPACK_IMPORTED_MODULE_2__.users)
        _users__WEBPACK_IMPORTED_MODULE_2__.users.pop();
}
function stateButton() {
    if (!(0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.getLocalStorage)())
        btn.style.display = 'none';
    else
        btn.style.display = 'block';
}


/***/ }),

/***/ "./src/localStorage.ts":
/*!*****************************!*\
  !*** ./src/localStorage.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "saveLocalStorage": () => (/* binding */ saveLocalStorage),
/* harmony export */   "getLocalStorage": () => (/* binding */ getLocalStorage),
/* harmony export */   "deleteLocalStorage": () => (/* binding */ deleteLocalStorage)
/* harmony export */ });
function saveLocalStorage(users) {
    window.localStorage.setItem('pesquisados', JSON.stringify(users));
}
function getLocalStorage() {
    const data = window.localStorage.getItem('pesquisados');
    if (typeof data === 'string') {
        return JSON.parse(data);
    }
    return null;
}
function deleteLocalStorage() {
    window.localStorage.removeItem('pesquisados');
}


/***/ }),

/***/ "./src/submitForm.ts":
/*!***************************!*\
  !*** ./src/submitForm.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createDataTable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createDataTable */ "./src/createDataTable.ts");
/* harmony import */ var _users__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./users */ "./src/users.ts");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./localStorage */ "./src/localStorage.ts");



const inputName = document.getElementById('name');
const inputEmail = document.getElementById('email');
const inputBirthday = document.getElementById('birthday');
const selectLanguage = document.getElementById('programming-language');
const fieldErrors = {
    name: '', birthdate: '', language: '', email: ''
};
function handleSubmit() {
    const fieldsValue = {
        name: inputName.value,
        email: inputEmail.value,
        birthdate: inputBirthday.value,
        language: selectLanguage.value,
    };
    //clear errors in the next submit
    clearErrors();
    const hasErrorForm = validateForm(fieldsValue);
    // has error stop submit
    if (hasErrorForm)
        return;
    _users__WEBPACK_IMPORTED_MODULE_1__.users.push(fieldsValue);
    (0,_localStorage__WEBPACK_IMPORTED_MODULE_2__.saveLocalStorage)(_users__WEBPACK_IMPORTED_MODULE_1__.users);
    (0,_createDataTable__WEBPACK_IMPORTED_MODULE_0__.addDataTable)(_users__WEBPACK_IMPORTED_MODULE_1__.users);
    clearInputs();
    window.alert('Pesquisa salva! Obrigado.');
}
function validateForm(fields) {
    const dateFormat = inputBirthday.value.split('/').reverse();
    const date = new Date(dateFormat.join('-'));
    if (!fields.name.trim()) {
        fieldErrors.name = 'Campo Obrigatório.';
        createHtmlError(inputName, fieldErrors.name);
    }
    if (!fields.email.trim()) {
        fieldErrors.email = 'Campo Obrigatório.';
        createHtmlError(inputEmail, fieldErrors.email);
    }
    if (fields.language === 'selecione') {
        fieldErrors.language = 'Selecione uma linguagem.';
        createHtmlError(selectLanguage, fieldErrors.language);
    }
    if (date == 'Invalid Date' || !fields.birthdate) {
        fieldErrors.birthdate = 'Data inválida.';
        createHtmlError(inputBirthday, fieldErrors.birthdate);
    }
    let hasError = false;
    for (let i = 0; i < Object.keys(fieldErrors).length; i++) {
        if (Object.values(fieldErrors)[i]) {
            hasError = true;
            break;
        }
    }
    return hasError;
}
function createHtmlError(element, label) {
    const paragraph = document.createElement('p');
    element.insertAdjacentElement('afterend', paragraph);
    paragraph.setAttribute('data-error', 'form');
    paragraph.innerText = label;
}
function clearErrors() {
    fieldErrors['name'] = '';
    fieldErrors['email'] = '';
    fieldErrors['birthdate'] = '';
    fieldErrors['language'] = '';
    const elementErrors = document.querySelectorAll('[data-error="form"]');
    Array.from(elementErrors).forEach((element) => {
        element.style.display = 'none';
    });
}
function clearInputs() {
    inputName.value = '';
    inputBirthday.value = '';
    inputEmail.value = '';
    selectLanguage.value = '';
}
// EVENTS
window.addEventListener('load', windowOnload);
function windowOnload() {
    const usersLocal = (0,_localStorage__WEBPACK_IMPORTED_MODULE_2__.getLocalStorage)();
    if (usersLocal) {
        _users__WEBPACK_IMPORTED_MODULE_1__.users.push(...usersLocal);
        (0,_createDataTable__WEBPACK_IMPORTED_MODULE_0__.addDataTable)(usersLocal);
    }
}
const form = document.querySelector('.questions-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSubmit();
    });
}
// MASC
inputBirthday.addEventListener('keypress', function (event) {
    const element = event.target;
    if (event.code === 'NumpadDivide')
        return;
    if (element.value.length >= 10) {
        element.value = element.value.slice(0, 9);
        return;
    }
    if (element.value.length === 2 || element.value.length === 5)
        element.value += '/';
});
inputBirthday.addEventListener('change', function (event) {
    const element = event.target;
    if (element.value.length > 10) {
        element.value = element.value.slice(0, 9);
        return;
    }
});


/***/ }),

/***/ "./src/users.ts":
/*!**********************!*\
  !*** ./src/users.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "users": () => (/* binding */ users)
/* harmony export */ });
const users = [];


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createOptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createOptions */ "./src/createOptions.ts");
/* harmony import */ var _createOptions__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_createOptions__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _submitForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./submitForm */ "./src/submitForm.ts");
/* harmony import */ var _dataDelete__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dataDelete */ "./src/dataDelete.ts");




})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map