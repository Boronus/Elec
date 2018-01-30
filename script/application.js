import '../main.css';
//import {setCookie, deleteCookie} from './cookies.js';
import {compareTimeStamp, compareCategory, compareFileSize, compareFileName} from './compare.js';

let mainContentElement = document.getElementById('main_content');
let panelsArray;

getJSON('http://93.91.165.233:8081/frontend_data/catalog.json', function(err, data) {
    if (err !== null) {
        alert('Something went wrong: ' + err);
    } else {
        //alert('Your query count: ' + data/*.query.count*/);
        //console.log(data);
        //return data;
        panelsArray = data;
        panelsArray.forEach(function(item, i, arr) {
            item.name = item.image.substring(item.image.lastIndexOf('/')+1);
        });
        //setPanels();
        setTree();
    }
});

let sortForm = document.forms.sortImages;
let radioButtons = sortForm.sortType;
let prev = null;
for(var i = 0; i < radioButtons.length; i++) {
    radioButtons[i].onclick = function() {
        (prev) ? prev.value : null;
        if(this !== prev) {
            prev = this;
            console.log('NOT EQUAL');
            clearPanels();
            if (prev.value == 'sort_type_size') {
                panelsArray.sort(compareFileSize);
            } else if (prev.value == 'sort_type_date') {
                panelsArray.sort(compareTimeStamp);
            } else if (prev.value == 'sort_type_name') {
                panelsArray.sort(compareFileName);
                console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                panelsArray.forEach(function(item, i, arr) {
                    console.log( item.image.substring(item.image.lastIndexOf('/')+1) );
                });
                console.log( panelsArray );
                console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            } else if (prev.value == 'sort_type_category') {
                panelsArray.sort(compareCategory);
            }
            setPanels();
        }
        console.log(this.value);
    };
}

document.getElementById('clear_closed').addEventListener('click', clearStorage);

function setTree() {

    panelsArray.sort(compareCategory);

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

    panelsArray.forEach(function(item, i, arr) {

        let currentCategory = item.category;
        if ( previousElementCategory != currentCategory ) {
            let category = document.createElement('li');
            category.classList.add('Node');
            category.classList.add('ExpandOpen'); //ExpandLeaf
            //category.classList.add('IsRoot');
            if ( currentCategory == 'work' )
                category.classList.add('IsLast');
            rootContainer.appendChild(category);

            let categoryExpand = document.createElement('div');
            categoryExpand.classList.add('Expand');

            let categoryContent = document.createElement('div');
            categoryContent.classList.add('Content');
            categoryContent.innerHTML = currentCategory;

            let categoryContainer = document.createElement('ul');
            categoryContent.classList.add('Container');

            category.appendChild(categoryExpand);
            category.appendChild(categoryContent);
            category.appendChild(categoryContainer);

            previousElementCategory = currentCategory;
            previousElementContainer = categoryContainer;
        }

        let category = document.createElement('li');
        category.classList.add('Node');
        category.classList.add('ExpandOpen'); //ExpandLeaf
        //category.classList.add('IsRoot');
        if ( currentCategory == 'work' )
            category.classList.add('IsLast');
        rootContainer.appendChild(category);

        let categoryExpand = document.createElement('div');
        categoryExpand.classList.add('Expand');

        let categoryContent = document.createElement('div');
        categoryContent.classList.add('Content');
        categoryContent.innerHTML = currentCategory;

        let categoryContainer = document.createElement('ul');
        categoryContent.classList.add('Container');

        category.appendChild(categoryExpand);
        category.appendChild(categoryContent);
        category.appendChild(categoryContainer);




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


    mainContentElement.addEventListener('click',tree_toggle);
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

    var closedItems = JSON.parse( localStorage.getItem("closed") );
    if (!closedItems) closedItems = [];

    closedItems.forEach(function(item, i, arr) {
        var imageIndex = panelsArray.findIndex((panelItem) => panelItem.image == item);
        if (imageIndex > -1) {
            panelsArray.splice(imageIndex, 1);
        }
    });

    panelsArray.forEach(function(item, i, arr) {
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
    });
}

function closePanel() {
    console.log(this);
    var articleElem = this.closest('article');
    articleElem.style.display = 'none';

    var closedItems = JSON.parse( localStorage.getItem("closed") );
    if (!closedItems) closedItems = [];
    closedItems.push( articleElem.dataset.image );

    var closedItemsString = JSON.stringify( closedItems );
    localStorage.setItem("closed", closedItemsString);
}

function getJSON(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            return callback(status, xhr.response);
        }
    };
    xhr.send();
}

function tree_toggle(event) {
    event = event || window.event
    var clickedElem = event.target || event.srcElement

    if (!hasClass(clickedElem, 'Expand')) {
        return // клик не там
    }

    // Node, на который кликнули
    var node = clickedElem.parentNode
    if (hasClass(node, 'ExpandLeaf')) {
        return // клик на листе
    }

    // определить новый класс для узла
    var newClass = hasClass(node, 'ExpandOpen') ? 'ExpandClosed' : 'ExpandOpen'
    // заменить текущий класс на newClass
    // регексп находит отдельно стоящий open|close и меняет на newClass
    var re =  /(^|\s)(ExpandOpen|ExpandClosed)(\s|$)/
    node.className = node.className.replace(re, '$1'+newClass+'$3')
}


function hasClass(elem, className) {
    return new RegExp("(^|\\s)"+className+"(\\s|$)").test(elem.className)
}
