/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOMElements.js":
/*!****************************!*\
  !*** ./src/DOMElements.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass DOMElements {\r\n\r\n    constructor(callbacks) {\r\n        this.currentComicData = null;\r\n        this.contentElement = document.querySelector('.watcher-content');\r\n        this.titleElement = document.querySelector('.watcher-content__title');\r\n        this.dateElement = document.querySelector('.watcher-content__date');\r\n        this.imageElement = document.querySelector('.watcher-content__comic img');\r\n        this.transcriptionElement = document.querySelector('.watcher-content__transcription');\r\n        \r\n        document.querySelector('#toFirstBtn').addEventListener('click', callbacks.toFirstClick);\r\n        document.querySelector('#toLastBtn').addEventListener('click', callbacks.toLastClick);\r\n        document.querySelector('#randomBtn').addEventListener('click', callbacks.randomClick);\r\n        document.querySelector('#toPrevBtn').addEventListener('click', callbacks.toPrevClick);\r\n        document.querySelector('#toNextBtn').addEventListener('click', callbacks.toNextClick);\r\n\r\n        this.imageElement.onload = () => {\r\n            if(this.currentComicData) {\r\n                this.transcriptionElement.textContent = this.currentComicData.transcript;\r\n                this.titleElement.textContent = this.currentComicData.safe_title;\r\n                this.dateElement.textContent = `Дата размещения: ${this.currentComicData.day}.${this.currentComicData.month}.${this.currentComicData.year}`;\r\n            }\r\n            this.endLoading();\r\n        }\r\n    }\r\n\r\n    updateComicData(data) {\r\n        this.currentComicData = data;\r\n        this.imageElement.src = this.currentComicData.img;\r\n    }\r\n\r\n    startLoading() {\r\n        this.contentElement.classList.add('loading')\r\n    }\r\n    \r\n    endLoading() {\r\n        this.contentElement.classList.remove('loading');\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOMElements);\n\n//# sourceURL=webpack://comic_watcher/./src/DOMElements.js?");

/***/ }),

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass API {\r\n    constructor() {\r\n        this.proxy = 'https://any-api.com:8443';\r\n        this.comicAPI = 'https://xkcd.com';\r\n        this.comicAPISuffix = 'info.0.json'\r\n    }\r\n\r\n    getComicById(id) {\r\n        return fetch(`${this.proxy}/${this.comicAPI}/${id}/${this.comicAPISuffix}`);\r\n    }\r\n\r\n    getLastComic() {\r\n        return fetch(`${this.proxy}/${this.comicAPI}/${this.comicAPISuffix}`);\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new API());\n\n//# sourceURL=webpack://comic_watcher/./src/api.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _viewer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./viewer */ \"./src/viewer.js\");\n\r\n\r\n\r\n_viewer__WEBPACK_IMPORTED_MODULE_0__.default.init()\r\n    \r\n\n\n//# sourceURL=webpack://comic_watcher/./src/index.js?");

/***/ }),

/***/ "./src/viewer.js":
/*!***********************!*\
  !*** ./src/viewer.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./src/api.js\");\n/* harmony import */ var _DOMElements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOMElements */ \"./src/DOMElements.js\");\n\r\n\r\n\r\nclass VIEWER {\r\n\r\n    constructor() {\r\n        const urlParams = new URLSearchParams(window.location.search);\r\n        this.currentComicId = urlParams.get('comic') || undefined;\r\n        this.totalComics = undefined;\r\n        this.currentComicData = null;\r\n        this.DOMElements = new _DOMElements__WEBPACK_IMPORTED_MODULE_1__.default({\r\n            randomClick: this.getRandomComic.bind(this),\r\n            toFirstClick: this.toFirstComic.bind(this),\r\n            toLastClick: this.toLastComic.bind(this),\r\n            toPrevClick: this.toPrevComic.bind(this),\r\n            toNextClick: this.toNextComic.bind(this),\r\n        });\r\n    }\r\n\r\n    getComicById(id) {\r\n        this.DOMElements.startLoading();\r\n        _api__WEBPACK_IMPORTED_MODULE_0__.default.getComicById(id)\r\n        .then(response => {\r\n            response.json()\r\n            .then(comicData => {\r\n                this.updateCurrentComicData(comicData);\r\n            })\r\n            .catch(() => {\r\n                alert(\"Ошибка парсинга ответа\");\r\n            })\r\n        })\r\n        .catch(() => {\r\n            alert(\"Ошибка сети\");\r\n        })\r\n    }\r\n\r\n    init() {\r\n        _api__WEBPACK_IMPORTED_MODULE_0__.default.getLastComic()\r\n        .then(response => {\r\n            response.json()\r\n            .then(comicData => {\r\n                this.totalComics = comicData.num;\r\n                if (this.currentComicId) {\r\n                    this.getComicById(this.currentComicId);\r\n                } else {\r\n                    this.updateCurrentComicData(comicData);\r\n                }\r\n            })\r\n            .catch(() => {\r\n                alert(\"Ошибка парсинга ответа\");\r\n            })\r\n        })\r\n        .catch(() => {\r\n            alert(\"Ошибка сети\");\r\n        })\r\n    }\r\n    updateCurrentComicData(comicData) {\r\n        this.DOMElements.updateComicData(comicData)\r\n        this.currentComicData = comicData;\r\n        this.currentComicId = comicData.num;\r\n        this.updateURL();\r\n    }\r\n    updateURL() {\r\n        const queryParams = new URLSearchParams(window.location.search);\r\n        queryParams.set(\"comic\", this.currentComicData.num);\r\n        history.replaceState(null, null, \"?\"+queryParams.toString());\r\n    }\r\n\r\n    getRandomComic() {\r\n        const randomId = Math.floor(Math.random() * this.totalComics) + 1;\r\n        this.getComicById(randomId);\r\n    }\r\n\r\n    toNextComic() {\r\n        this.currentComicId = this.currentComicId === this.totalComics ? 1 : this.currentComicId + 1;\r\n        this.getComicById(this.currentComicId);\r\n    }\r\n\r\n    toPrevComic() {\r\n        this.currentComicId = this.currentComicId < 2 ? this.totalComics : this.currentComicId - 1;\r\n        this.getComicById(this.currentComicId);\r\n    }\r\n    toFirstComic() {\r\n        this.currentComicId = 1;\r\n        this.getComicById(this.currentComicId);\r\n    }\r\n\r\n    toLastComic() {\r\n        this.currentComicId = this.totalComics;\r\n        this.getComicById(this.currentComicId);\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new VIEWER());\n\n//# sourceURL=webpack://comic_watcher/./src/viewer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;