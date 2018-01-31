var script =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url;
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"';
    }

    return url;
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__main_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__compare_js__ = __webpack_require__(15);

//import {setCookie, deleteCookie} from './cookies.js';


let mainContentElement = document.getElementById('main_content');
let panelsArray;
let panelsOptions = {};

getJSON('http://93.91.165.233:8081/frontend_data/catalog.json', function (err, data) {
    if (err !== null) {
        alert('Something went wrong: ' + err);
    } else {
        //alert('Your query count: ' + data/*.query.count*/);
        //console.log(data);
        //return data;
        panelsArray = data;
        panelsArray.forEach(function (item, i, arr) {
            item.name = item.image.substring(item.image.lastIndexOf('/') + 1);
        });
        panelsOptions.numberOfLists = Math.ceil(panelsArray.length / 20);
        panelsOptions.currentList = 1;
        setPanels();
        createPaginator();
        //setTree();
    }
});

let sortForm = document.forms.sortImages;
let radioButtons = sortForm.sortType;
let prev = null;
for (var i = 0; i < radioButtons.length; i++) {
    radioButtons[i].onclick = function () {
        prev ? prev.value : null;
        if (this !== prev) {
            prev = this;
            console.log('NOT EQUAL');
            clearPanels();
            if (prev.value == 'sort_type_size') {
                panelsArray.sort(__WEBPACK_IMPORTED_MODULE_1__compare_js__["d" /* compareFileSize */]);
            } else if (prev.value == 'sort_type_date') {
                panelsArray.sort(__WEBPACK_IMPORTED_MODULE_1__compare_js__["f" /* compareTimeStamp */]);
            } else if (prev.value == 'sort_type_name') {
                panelsArray.sort(__WEBPACK_IMPORTED_MODULE_1__compare_js__["c" /* compareFileName */]);
                console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                panelsArray.forEach(function (item, i, arr) {
                    console.log(item.image.substring(item.image.lastIndexOf('/') + 1));
                });
                console.log(panelsArray);
                console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            } else if (prev.value == 'sort_type_category') {
                panelsArray.sort(__WEBPACK_IMPORTED_MODULE_1__compare_js__["a" /* compareCategory */]);
            }

            panelsOptions.currentList = 1;
            createPaginator();
            setPanels();
        }
        console.log(this.value);
    };
}

document.getElementById('clear_closed').addEventListener('click', clearStorage);
document.getElementById('paginator').addEventListener('click', changeList);

function createPaginator() {
    let paginator = document.getElementById('paginator');
    paginator.innerHTML = '';

    let paginatorSet = new Set();
    let currentList = +panelsOptions.currentList;
    let numberOfLists = +panelsOptions.numberOfLists;

    paginatorSet.add(1);
    paginatorSet.add(numberOfLists);
    paginatorSet.add(currentList);
    if (currentList > 2) paginatorSet.add(currentList - 1);
    if (currentList < numberOfLists - 1) paginatorSet.add(currentList + 1);

    let paginatorArray = Array.from(paginatorSet).sort(__WEBPACK_IMPORTED_MODULE_1__compare_js__["e" /* compareNumbers */]);

    if (paginatorArray[1] != 2) paginatorArray.splice(1, 0, '&hellip;');

    if (paginatorArray[paginatorArray.length - 2] != numberOfLists - 1) paginatorArray.splice(-1, 0, '&hellip;');

    console.log(paginatorArray);

    paginatorArray.forEach(function (item, i, arr) {

        let paginatorLink = document.createElement('a');
        paginatorLink.innerHTML = item;
        paginatorLink.classList.add('list-link');

        if (item != '&hellip;') paginatorLink.dataset.list = item;

        paginator.appendChild(paginatorLink);
    });
    /*
    <a href="#prev">Назад</a>
    <a href="#1">1</a>
    <span>&hellip;</span>
    <a href="#3">3</a>
    <a href="#next">Вперёд</a>
    */
}

function setTree() {

    panelsArray.sort(__WEBPACK_IMPORTED_MODULE_1__compare_js__["b" /* compareCategoryAndFileName */]);
    //2211

    let mainContainer = document.createElement('ul');
    mainContainer.classList.add('Container');

    let root = document.createElement('li');
    root.classList.add('Node');
    root.classList.add('IsRoot');
    root.classList.add('ExpandOpen');
    root.classList.add('IsLast');

    let rootExpand = document.createElement('div');
    rootExpand.classList.add('Expand');

    let rootContent = document.createElement('div');
    rootContent.classList.add('Content');
    rootContent.innerHTML = 'Root';

    let rootContainer = document.createElement('ul');
    rootContainer.classList.add('Container');

    mainContainer.appendChild(root);
    root.appendChild(rootExpand);
    root.appendChild(rootContent);
    root.appendChild(rootContainer);
    mainContentElement.appendChild(mainContainer);

    let previousElementCategory = '';
    let previousElementContainer = null;

    panelsArray.forEach(function (item, i, arr) {

        let currentCategory = item.category;
        if (previousElementCategory != currentCategory) {
            let category = document.createElement('li');
            category.classList.add('Node');
            category.classList.add('ExpandOpen'); //ExpandLeaf

            rootContainer.appendChild(category);

            let categoryExpand = document.createElement('div');
            categoryExpand.classList.add('Expand');

            let categoryContent = document.createElement('div');
            categoryContent.classList.add('Content');
            categoryContent.innerHTML = currentCategory;

            let categoryContainer = document.createElement('ul');
            categoryContainer.classList.add('Container');

            category.appendChild(categoryExpand);
            category.appendChild(categoryContent);
            category.appendChild(categoryContainer);

            previousElementCategory = currentCategory;
            previousElementContainer = categoryContainer;
        }

        let panel = document.createElement('li');
        panel.classList.add('Node');
        panel.classList.add('ExpandLeaf');
        previousElementContainer.appendChild(panel);

        let panelExpand = document.createElement('div');
        panelExpand.classList.add('Expand');

        let panelContent = document.createElement('div');
        panelContent.classList.add('Content');
        //panelContent.innerHTML = item.name;

        let newThumbnailWrapper = document.createElement('div');
        newThumbnailWrapper.classList.add('thumbnail-wrapper');

        let newThumbnailImage = document.createElement('img');
        newThumbnailImage.src = 'http://93.91.165.233:8081/frontend_data/' + item.image;

        newThumbnailWrapper.appendChild(newThumbnailImage);
        panelContent.appendChild(newThumbnailWrapper);
        //panelContent.appendChild(newImageWrapper);

        //let categoryContainer = document.createElement('ul');
        //categoryContent.classList.add('Container');

        panel.appendChild(panelExpand);
        panel.appendChild(panelContent);

        /*console.log(item.image);
        let newPanel = document.createElement('article');
        newPanel.dataset.image = item.image;
          let newImageWrapper = document.createElement('div');
        newImageWrapper.classList.add('image-wrapper');
          let newImage = document.createElement('img');
        newImage.src = 'http://93.91.165.233:8081/frontend_data/' + item.image;
          let newClose = document.createElement('div');
        newClose.classList.add('close');
        newClose.addEventListener('click',closePanel)
          newImageWrapper.appendChild(newImage);
        newPanel.appendChild(newClose);
        newPanel.appendChild(newImageWrapper);
        mainContentElement.appendChild(newPanel);*/
    });

    mainContentElement.addEventListener('click', tree_toggle);
    mainContentElement.addEventListener('click', changeImageSize);
}

//setPanels(panelsArray);

/*var val = document.getElementById('imagename').value,
 src = 'http://webpage.com/images/' + val +'.png',
 img = document.createElement('img');

 img.src = src;
 document.body.appendChild(img);*/

function clearStorage() {
    localStorage.removeItem("closed");
    setPanels();
}

function clearPanels() {
    mainContentElement.innerHTML = '';
}

function setPanels() {

    var closedItems = JSON.parse(localStorage.getItem("closed"));
    if (!closedItems) closedItems = [];

    closedItems.forEach(function (item, i, arr) {
        var imageIndex = panelsArray.findIndex(panelItem => panelItem.image == item);
        if (imageIndex > -1) {
            panelsArray.splice(imageIndex, 1);
        }
    });

    console.log(panelsOptions.currentList);

    let startElement = (panelsOptions.currentList - 1) * 20;
    for (let i = startElement; i < startElement + 20 && i < panelsArray.length; i++) {
        let newPanel = document.createElement('article');
        newPanel.dataset.image = panelsArray[i].image;

        let newImageWrapper = document.createElement('div');
        newImageWrapper.classList.add('image-wrapper');

        let newImage = document.createElement('img');
        newImage.src = 'http://93.91.165.233:8081/frontend_data/' + panelsArray[i].image;
        newImage.style.visibility = 'hidden';
        newImage.onload = function () {
            this.style.visibility = 'visible';
        };

        let newClose = document.createElement('div');
        newClose.classList.add('close');
        newClose.addEventListener('click', closePanel);

        newImageWrapper.appendChild(newImage);
        newPanel.appendChild(newClose);
        newPanel.appendChild(newImageWrapper);
        mainContentElement.appendChild(newPanel);
    }

    /*panelsArray.forEach(function(item, i, arr) {
        //alert( i + ": " + item + " (массив:" + arr + ")" );
        console.log(item.image);
        let newPanel = document.createElement('article');
        newPanel.dataset.image = item.image;
          let newImageWrapper = document.createElement('div');
        newImageWrapper.classList.add('image-wrapper');
          let newImage = document.createElement('img');
        newImage.src = 'http://93.91.165.233:8081/frontend_data/' + item.image; //.dataset
        //newImage.classList.add('lazy');
          let newClose = document.createElement('div');
        newClose.classList.add('close');
        newClose.addEventListener('click',closePanel)
          newImageWrapper.appendChild(newImage);
        newPanel.appendChild(newClose);
        newPanel.appendChild(newImageWrapper);
        mainContentElement.appendChild(newPanel);
        //console.log(panelsArray);
    });*/
}

function closePanel() {
    console.log(this);
    var articleElem = this.closest('article');

    changeOpacity(articleElem);
    /*setTimeout(function() {
        articleElem.style.opacity = articleElem.style.opacity - 0.02;
    }, 100);*/
    //articleElem.style.display = 'none';

    var closedItems = JSON.parse(localStorage.getItem("closed"));
    if (!closedItems) closedItems = [];
    closedItems.push(articleElem.dataset.image);

    var closedItemsString = JSON.stringify(closedItems);
    localStorage.setItem("closed", closedItemsString);

    function changeOpacity(elem) {
        console.log(elem);
        setTimeout(function () {
            console.log(elem);
            if (elem.style.opacity == '') elem.style.opacity = '1.0';
            elem.style.opacity = '' + (+elem.style.opacity - 0.05);
            if (elem.style.opacity > 0) {
                console.log("IF", elem.style.opacity);
                changeOpacity(elem);
            } else {
                console.log("ELSE");
                elem.style.display = 'none';
            }
        }, 10);
    }
}

function getJSON(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';

    let progressBar = document.getElementById('progress_bar');

    progressBar.style.display = 'inline-block';
    let progressLine = progressBar.querySelector('.progress-line');
    xhr.upload.onprogress = function (event) {
        progressLine.style.width = event.loaded / event.total + '%';
        alert('Загружено на сервер ' + event.loaded + ' байт из ' + event.total);
    };

    xhr.onload = function () {
        progressBar.style.display = 'none';
        progressLine.style.width = 0;

        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            return callback(status, xhr.response);
        }
    };
    xhr.send();
}

function changeImageSize(event) {
    event = event || window.event;
    let clickedElem = event.target || event.srcElement;

    let thumbnailWrapper = clickedElem.closest('.thumbnail-wrapper');

    if (!thumbnailWrapper) {
        return;
    }

    let thumbnailWrapperStyle = thumbnailWrapper.style;
    let thumbnailImage = thumbnailWrapper.querySelector('img');
    let thumbnailImageStyle = thumbnailImage.style;

    if (thumbnailWrapper.classList.contains('open')) {
        thumbnailWrapperStyle.width = '';
        thumbnailWrapperStyle.height = '';
        thumbnailImageStyle.maxWidth = '';
        thumbnailImageStyle.maxHeight = '';
        thumbnailWrapper.classList.remove('open');
    } else {
        thumbnailWrapperStyle.width = 'auto';
        thumbnailWrapperStyle.height = 'auto';
        thumbnailImageStyle.maxWidth = '500px';
        thumbnailImageStyle.maxHeight = '500px';
        thumbnailWrapper.classList.add('open');
    }
}

function changeList(event) {
    event = event || window.event;
    let clickedElem = event.target || event.srcElement;
    console.log('CHANGE LIST');
    let listLink = clickedElem.closest('.list-link');
    console.log('CLOSEST', listLink);
    if (!listLink) {
        return;
    }

    if (!listLink.dataset.list) {
        return;
    }

    panelsOptions.currentList = listLink.dataset.list;
    console.log(panelsOptions.currentList);
    clearPanels();
    setPanels();
    createPaginator();
}

function tree_toggle(event) {
    event = event || window.event;
    var clickedElem = event.target || event.srcElement;

    if (!clickedElem.classList.contains('Expand')) {
        return; // клик не там
    }

    // Node, на который кликнули
    var node = clickedElem.parentNode;
    if (node.classList.contains('ExpandLeaf')) {
        return; // клик на листе
    }

    // определить новый класс для узла
    var newClass = node.classList.contains('ExpandOpen') ? 'ExpandClosed' : 'ExpandOpen';
    // заменить текущий класс на newClass
    // регексп находит отдельно стоящий open|close и меняет на newClass
    var re = /(^|\s)(ExpandOpen|ExpandClosed)(\s|$)/;
    node.className = node.className.replace(re, '$1' + newClass + '$3');
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(4);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(13)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!./node_modules/css-loader/index.js!./main.css", function() {
		var newContent = require("!!./node_modules/css-loader/index.js!./main.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(0);
exports = module.exports = __webpack_require__(1)(false);
// imports
exports.i(__webpack_require__(5), "screen");

// module
exports.push([module.i, "html,\r\nbody {\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\n.main-header {\r\n    position: fixed;\r\n    background: red;\r\n    width: 100%;\r\n    top: 0;\r\n    height: 3em;\r\n}\r\n\r\n.main-footer {\r\n    position: fixed;\r\n    z-index: 1;\r\n    background: green;\r\n    bottom: 0;\r\n    width: 100%;\r\n    height: 3em;\r\n}\r\n\r\n.main-content {\r\n    margin: 3em 0;\r\n    display: flex;\r\n    flex-flow: row wrap;\r\n    justify-content: center;\r\n}\r\n\r\n.main-content article {\r\n    height: 500px;\r\n    border: blue solid 2px;\r\n    position: relative;\r\n}\r\n\r\n.main-content article .close {\r\n    content: '';\r\n    position: absolute;\r\n    right: 0;\r\n    height: 20px;\r\n    width: 20px;\r\n\r\n    background: url(" + escape(__webpack_require__(12)) + ") 100% no-repeat;\r\n    background-color: white;\r\n    background-size: cover;\r\n}\r\n\r\n.main-content article .image-wrapper{\r\n     /*\r\n     display: table-cell;\r\n     text-align: center;\r\n     vertical-align: bottom;\r\n      */\r\n     background: rgb(200,200,200);\r\n     border-bottom: yellow solid 2px;\r\n     margin: 10px;\r\n     width: 300px;\r\n     height: 300px;\r\n\r\n     display: flex;\r\n     justify-content: center;\r\n     align-items: center;\r\n\r\n    background-image:url('/img/loader.gif');\r\n    background-position:center center;\r\n    background-repeat:no-repeat;\r\n }\r\n\r\n.main-content article .image-wrapper img{\r\n    display: inline-block;\r\n    max-width:300px;\r\n    max-height:300px;\r\n    vertical-align: bottom;\r\n}\r\n\r\n\r\n.main-content .thumbnail-wrapper{\r\n    /*\r\n    display: table-cell;\r\n    text-align: center;\r\n    vertical-align: bottom;\r\n     */\r\n    background: rgb(200,200,200);\r\n    border: rebeccapurple solid 2px;\r\n    width: 70px;\r\n    height: 70px;\r\n\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n\r\n.main-content .thumbnail-wrapper img{\r\n    display: inline-block;\r\n    max-width:70px;\r\n    max-height:70px;\r\n    vertical-align: bottom;\r\n}\r\n\r\n.paginator {\r\n    float: right;\r\n    padding: 5px;\r\n    margin: 5px;\r\n    white-space: nowrap;\r\n    background: #ecf0f1;\r\n}\r\n\r\n.paginator a {\r\n    display: inline-block;\r\n    min-width: 20px;\r\n    padding: 5px 10px;\r\n    background-color: #95a5a6;\r\n    cursor: pointer;\r\n}\r\n\r\n.progress-bar {\r\n    position: absolute;\r\n    display: none;\r\n    width: 30%;\r\n    background: yellow;\r\n}\r\n\r\n.progress-line {\r\n    width: 0;\r\n    height: 100%;\r\n}", ""]);

// exports


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(0);
exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".Container {\r\n    padding: 0;\r\n    margin: 0;\r\n}\r\n\r\n.Container li {\r\n    list-style-type: none;\r\n}\r\n\r\n/* indent for all tree children excepts root */\r\n.Node {\r\n    background-image : url(" + escape(__webpack_require__(6)) + ");\r\n    background-position : top left;\r\n    background-repeat : repeat-y;\r\n    margin-left: 18px;\r\n    zoom: 1;\r\n}\r\n\r\n.IsRoot {\r\n    margin-left: 0;\r\n}\r\n\r\n\r\n/* left vertical line (grid) for all nodes\r\n.IsLast {\r\n    background-image: url(img/tree_icons/i_half.gif);\r\n    background-repeat : no-repeat;\r\n}\r\n*/\r\n\r\n.Node:last-child {\r\n    background-image: url(" + escape(__webpack_require__(7)) + ");\r\n    background-repeat : no-repeat;\r\n}\r\n\r\n.ExpandOpen .Expand {\r\n    background-image: url(" + escape(__webpack_require__(8)) + ");\r\n}\r\n\r\n/* closed is higher priority than open */\r\n.ExpandClosed .Expand {\r\n    background-image: url(" + escape(__webpack_require__(9)) + ");\r\n}\r\n\r\n/* highest priority */\r\n.ExpandLeaf .Expand {\r\n    background-image: url(" + escape(__webpack_require__(10)) + ");\r\n}\r\n\r\n.Content {\r\n    min-height: 18px;\r\n    margin-left:18px;\r\n}\r\n\r\n* html  .Content {\r\n    height: 18px;\r\n}\r\n\r\n.Expand {\r\n    width: 18px;\r\n    height: 18px;\r\n    float: left;\r\n}\r\n\r\n\r\n.ExpandLoading   {\r\n    width: 18px;\r\n    height: 18px;\r\n    float: left;\r\n    background-image: url(" + escape(__webpack_require__(11)) + ");\r\n}\r\n\r\n\r\n\r\n.ExpandOpen .Container {\r\n    display: block;\r\n}\r\n\r\n.ExpandClosed .Container {\r\n    display: none;\r\n}\r\n\r\n.ExpandOpen .Expand, .ExpandClosed .Expand {\r\n    cursor: pointer;\r\n}\r\n.ExpandLeaf .Expand {\r\n    cursor: auto;\r\n}\r\n\r\n\r\n", ""]);

// exports


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = "data:image/gif;base64,R0lGODlhEgASAIABAHJycv///yH5BAEAAAEALAAAAAASABIAAAIejB+Ay6YNU4RvrmoPzpJr/4EduGWldU5ptFLi6LUFADs="

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = "data:image/gif;base64,R0lGODlhEgASAIABAHJycv///yH5BAEAAAEALAAAAAASABIAAAIYjB+Ay6YNU4RvrmoPzpJr/4HiSJbmiaYFADs="

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = "data:image/gif;base64,R0lGODlhEgASAMZFAAAAAHmWwURERDk5OYGcxfz8/Pr6+uLm7P///v7+/e7w84GdxfP09u/x9PX29+ns8Pz8+/79/crT4Pn6+uXo7ufq77rG183V4fDy9MXP3ezu8vHz9e30/tbc5vf3+Ovu8fb3+Obq7+zv8sTO3Ojr79vg6O3v8uPn7cTN3P7+/+Xp7n2axN3i6vj5+YCcxd7j6tzh6ff4+PLz9YGcxPHy9NTb5d/k6/v7+/n5+dLZ5P3+/77J2dXb5b/J2evt8czU4dPa5PT19uTo7cvU4P7+/v////n5+vT199rf6Ort8f///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAAH8ALAAAAAASABIAAAeFgH+Cg4SFhoeIiYqLiAGOj5ABhwEWPRkXHTYqPg0zkzsjPzwvFEkNQQSTKEM1LEIPCgwxqYYBEkAwJ7AMHga0hQE5JQPEAwIGBQsCy8uCAUgHJCYyIBMFRAuTBxUiGw5GBQlFv4QBIRo0DjgQCQg6LpMfGEctNxEIKRwrk5GRjP8AAxYKBAA7"

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "data:image/gif;base64,R0lGODlhEgASAMZDAAAAAHmWwURERDk5OYGcxfz8/Pr6+v///uLm7P7+/YGdxfP09u/x9O7w88rT4P79/fHz9brG1/n6+vz8++fq7/Dy9MXP3czU4c3V4e30/tbc5uzu8uXo7vf3+Ovu8fb3+Obq7+zv8sTO3Ojr79vg6O3v8uPn7cTN3P7+/+Xp7n2axICcxYGcxPn5+fj5+ff4+N7j6t3i6tLZ5N/k6/X29+ns8NTb5f3+//v7+/Hy9NXb5b/J2fT1977J2dPa5PT19uvt8drf6P7+/v///9zh6cvU4Ort8fn5+v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAAH8ALAAAAAASABIAAAeFgH+Cg4SFhoeIiYqLiAGOj5ABhwEROxYYGjMpQAwskz0iFzowHEYMPwSTJ0U2MQM1DQsvqYYBDj5EJgOxHQa0hQEyJAPEAwIGBQoCy8uCAUEIIyUDHxIFQgqTCBQhEAJHBQlDv4QBIBs5NC0TCQc3K5MeFTwuOA8HKBkqk5GRjP8AAxYKBAA7"

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = "data:image/gif;base64,R0lGODlhEgASAKECAAAAAHJycv///////yH5BAEAAAAALAAAAAASABIAAAIVhI+py+0Po5xUhjuv3lr1CobiSFYFADs="

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "data:image/gif;base64,R0lGODlhFAAUAOeAAJy/85O37Hug157B9aXI+yVnuIqq2pC06aHE95a57nab04mp2YSk1efu97TQ+bHN9+7z+o+u3KPG+cTU7I+z6JCw4Pj6/Y2w5J/B8/H1+5Wy3Yys3Iqt4rXR+vv8/nyh14Wn27jM6ZK16KfJ/IOl14qt4YKl2Pn7/Yiq267O+/X4/Jq975Kz5o2v4ujv+I+v3oip2f7+/5u235i03snY7rHN9ajK+4Cgz4Kgzoao2Z2/8Nfi8oir4YWn2Iyt3oqr3Iqr3X+dypGv3K7L96TG+Yip28jX7p2+7qjH9Ius3bTJ54ip2tzl9JW36Z/C9IGj1n6h1pCy5Iep3erw+LDO+KzD5bvO6mtra6/F5pu+7py34ISm2K/M9a/N+pa46X2g1aPF+H2cyvf5/MfW7Y2s25m77cXV7eHh4bDM9Xec08HS657A8uvx+dLe8Za35/T3+6TF9ois4d/n9cLCwpy+8ePr9pSx3Z286Zi77o6v4Imr3LfL6I2x54is4pm88YGm3f///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ywAAAAAFAAUAAAI/gABCRwoUEWDDAQTJvRgRsOPPEmEWLGgkOAUGU3AjCgwgogXDXUqAmpjoIyNFCkIqCSwAgYNhUxgrOnSoUONIxgk6HQSZQfBE3ayUHFA9A4gNwiSIlgR4cTACSyGPJgKpwKgCgOyZmUxYeAMHWi4IMEA4AWgFwDSpsWjpSAKP3T8yPWzAdCGuXOXUHQBpECCvwlE4AAUZIFhHyIK6GEDKAOKAJAhtxA4Z+CZFgGKvAEUIwKFA6APXLhxJQyD0zkuUIgwcE8JPrBhc5DCITbsEiEGQjDAo4/v38D7xDEAgaAREH+SK1/+B0TXhCFMfBBAvQB1AR9MYBE5xgCUNArCHyv4skVNDJGAICghQ+IJiR5VXKAn6KGBnAZi5uuvGBAAOw=="

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjQzOC41MzNweCIgaGVpZ2h0PSI0MzguNTMzcHgiIHZpZXdCb3g9IjAgMCA0MzguNTMzIDQzOC41MzMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQzOC41MzMgNDM4LjUzMzsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTQwOS4xMzMsMTA5LjIwM2MtMTkuNjA4LTMzLjU5Mi00Ni4yMDUtNjAuMTg5LTc5Ljc5OC03OS43OTZDMjk1LjczNiw5LjgwMSwyNTkuMDU4LDAsMjE5LjI3MywwDQoJCWMtMzkuNzgxLDAtNzYuNDcsOS44MDEtMTEwLjA2MywyOS40MDdjLTMzLjU5NSwxOS42MDQtNjAuMTkyLDQ2LjIwMS03OS44LDc5Ljc5NkM5LjgwMSwxNDIuOCwwLDE3OS40ODksMCwyMTkuMjY3DQoJCWMwLDM5Ljc4LDkuODA0LDc2LjQ2MywyOS40MDcsMTEwLjA2MmMxOS42MDcsMzMuNTkyLDQ2LjIwNCw2MC4xODksNzkuNzk5LDc5Ljc5OGMzMy41OTcsMTkuNjA1LDcwLjI4MywyOS40MDcsMTEwLjA2MywyOS40MDcNCgkJczc2LjQ3LTkuODAyLDExMC4wNjUtMjkuNDA3YzMzLjU5My0xOS42MDIsNjAuMTg5LTQ2LjIwNiw3OS43OTUtNzkuNzk4YzE5LjYwMy0zMy41OTYsMjkuNDAzLTcwLjI4NCwyOS40MDMtMTEwLjA2Mg0KCQlDNDM4LjUzMywxNzkuNDg1LDQyOC43MzIsMTQyLjc5NSw0MDkuMTMzLDEwOS4yMDN6IE0zMjIuNjIxLDI3MC45MzljMy42MTcsMy42MTMsNS40MjgsNy45MDUsNS40MjgsMTIuODU0DQoJCWMwLDUuMTMzLTEuODExLDkuNTE0LTUuNDI4LDEzLjEyN2wtMjUuNjkzLDI1LjcwMWMtMy42MTQsMy42MTMtNy45OTQsNS40Mi0xMy4xMzUsNS40MmMtNC45NDgsMC05LjIzNi0xLjgwNy0xMi44NDctNS40Mg0KCQlsLTUxLjY3Ni01MS42ODJsLTUxLjY3OCw1MS42ODJjLTMuNjE2LDMuNjEzLTcuODk4LDUuNDItMTIuODQ3LDUuNDJjLTUuMTQsMC05LjUxNy0xLjgwNy0xMy4xMzQtNS40MmwtMjUuNjk3LTI1LjcwMQ0KCQljLTMuNjE2LTMuNjEzLTUuNDI0LTcuOTk0LTUuNDI0LTEzLjEyN2MwLTQuOTQ4LDEuODA5LTkuMjQsNS40MjQtMTIuODU0bDUxLjY3OC01MS42NzNsLTUxLjY3OC01MS42NzgNCgkJYy0zLjYxNi0zLjYxMi01LjQyNC03Ljg5OC01LjQyNC0xMi44NDdjMC01LjE0LDEuODA5LTkuNTE3LDUuNDI0LTEzLjEzNGwyNS42OTctMjUuNjkzYzMuNjE3LTMuNjE2LDcuOTk0LTUuNDI0LDEzLjEzNC01LjQyNA0KCQljNC45NDksMCw5LjIzMSwxLjgwOSwxMi44NDcsNS40MjRsNTEuNjc4LDUxLjY3NGw1MS42NzYtNTEuNjc0YzMuNjEtMy42MTYsNy44OTgtNS40MjQsMTIuODQ3LTUuNDI0DQoJCWM1LjE0MSwwLDkuNTIxLDEuODA5LDEzLjEzNSw1LjQyNGwyNS42OTMsMjUuNjkzYzMuNjE3LDMuNjE3LDUuNDI4LDcuOTk0LDUuNDI4LDEzLjEzNGMwLDQuOTQ4LTEuODExLDkuMjM1LTUuNDI4LDEyLjg0Nw0KCQlsLTUxLjY3NSw1MS42NzhMMzIyLjYyMSwyNzAuOTM5eiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo="

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(14);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 14 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["f"] = compareTimeStamp;
/* harmony export (immutable) */ __webpack_exports__["a"] = compareCategory;
/* harmony export (immutable) */ __webpack_exports__["d"] = compareFileSize;
/* harmony export (immutable) */ __webpack_exports__["c"] = compareFileName;
/* harmony export (immutable) */ __webpack_exports__["b"] = compareCategoryAndFileName;
/* harmony export (immutable) */ __webpack_exports__["e"] = compareNumbers;
function compareTimeStamp(a, b) {
    if (a.timestamp < b.timestamp) return -1;
    if (a.timestamp > b.timestamp) return 1;
    return 0;
}

function compareCategory(a, b) {
    return a.category.localeCompare(b.category);
}

function compareFileSize(a, b) {
    if (a.filesize < b.filesize) return -1;
    if (a.filesize > b.filesize) return 1;
    return 0;
}

function compareFileName(a, b) {
    return a.name.localeCompare(b.name);
}

function compareCategoryAndFileName(a, b) {
    let categoryCompare = a.category.localeCompare(b.category);
    if (categoryCompare) return categoryCompare;
    return a.name.localeCompare(b.name);
}

function compareNumbers(a, b) {
    return a - b;
}

/***/ })
/******/ ]);