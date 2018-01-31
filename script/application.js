import '../main.css';
//import {setCookie, deleteCookie} from './cookies.js';
import {compareTimeStamp, compareCategory, compareFileSize, compareFileName, compareCategoryAndFileName, compareNumbers} from './compare.js';

let mainContentElement = document.getElementById('main_content');
let panelsArray;
let panelsOptions = {};

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
        panelsOptions.numberOfLists = Math.ceil( panelsArray.length / 20 );
        panelsOptions.currentList = 1;
        setPanels();
        createPaginator();
        //setTree();
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

    paginatorSet.add( 1 );
    paginatorSet.add( numberOfLists );
    paginatorSet.add( currentList );
    if ( currentList > 2 )
        paginatorSet.add( currentList - 1 );
    if ( currentList < numberOfLists - 1 )
        paginatorSet.add( currentList + 1 );

    let paginatorArray = Array.from( paginatorSet ).sort(compareNumbers);

    if ( paginatorArray[1] != 2 )
        paginatorArray.splice(1, 0, '&hellip;');

    if ( paginatorArray[paginatorArray.length - 2] != numberOfLists - 1 )
        paginatorArray.splice(-1, 0, '&hellip;');

    console.log( paginatorArray );

    paginatorArray.forEach(function(item, i, arr) {

        let paginatorLink = document.createElement('a');
        paginatorLink.innerHTML = item;
        paginatorLink.classList.add('list-link');

        if ( item != '&hellip;' )
            paginatorLink.dataset.list = item;

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

    panelsArray.sort(compareCategoryAndFileName);
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

    panelsArray.forEach(function(item, i, arr) {

        let currentCategory = item.category;
        if ( previousElementCategory != currentCategory ) {
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


    mainContentElement.addEventListener('click',tree_toggle);
    mainContentElement.addEventListener('click',changeImageSize);
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

    console.log( panelsOptions.currentList );

    let startElement = (panelsOptions.currentList - 1) * 20;
    for(let i = startElement; i < startElement + 20 &&  i < panelsArray.length; i++) {
        let newPanel = document.createElement('article');
        newPanel.dataset.image = panelsArray[i].image;

        let newImageWrapper = document.createElement('div');
        newImageWrapper.classList.add('image-wrapper');

        let newImage = document.createElement('img');
        newImage.src = 'http://93.91.165.233:8081/frontend_data/' + panelsArray[i].image;
        newImage.style.visibility='hidden';
        newImage.onload = function() {
            this.style.visibility='visible';
        };

        let newClose = document.createElement('div');
        newClose.classList.add('close');
        newClose.addEventListener('click',closePanel)

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



    changeOpacity( articleElem );
    /*setTimeout(function() {
        articleElem.style.opacity = articleElem.style.opacity - 0.02;
    }, 100);*/
    //articleElem.style.display = 'none';

    var closedItems = JSON.parse( localStorage.getItem("closed") );
    if (!closedItems) closedItems = [];
    closedItems.push( articleElem.dataset.image );

    var closedItemsString = JSON.stringify( closedItems );
    localStorage.setItem("closed", closedItemsString);


    function changeOpacity( elem ) {
        console.log( elem );
        setTimeout(function() {
            console.log( elem );
            if ( elem.style.opacity == '' ) elem.style.opacity = '1.0';
            elem.style.opacity = '' + ( +elem.style.opacity - 0.05) ;
            if (elem.style.opacity > 0) {
                console.log( "IF", elem.style.opacity );
                changeOpacity( elem );
            } else {
                console.log( "ELSE" );
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
    xhr.upload.onprogress = function(event) {
        progressLine.style.width = (event.loaded/event.total) + '%';
        alert( 'Загружено на сервер ' + event.loaded + ' байт из ' + event.total );
    };

    xhr.onload = function() {
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

    if ( !thumbnailWrapper ){
        return;
    }

    let thumbnailWrapperStyle = thumbnailWrapper.style;
    let thumbnailImage = thumbnailWrapper.querySelector('img');
    let thumbnailImageStyle = thumbnailImage.style;

    if ( thumbnailWrapper.classList.contains('open') ) {
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
    if ( !listLink ){
        return;
    }

    if ( !listLink.dataset.list ){
        return;
    }

    panelsOptions.currentList = listLink.dataset.list;
    console.log( panelsOptions.currentList );
    clearPanels();
    setPanels();
    createPaginator();
}

function tree_toggle(event) {
    event = event || window.event;
    var clickedElem = event.target || event.srcElement;

    if ( !clickedElem.classList.contains('Expand') ) {
        return // клик не там
    }

    // Node, на который кликнули
    var node = clickedElem.parentNode;
    if ( node.classList.contains('ExpandLeaf') ) {
        return // клик на листе
    }

    // определить новый класс для узла
    var newClass = node.classList.contains('ExpandOpen') ? 'ExpandClosed' : 'ExpandOpen';
    // заменить текущий класс на newClass
    // регексп находит отдельно стоящий open|close и меняет на newClass
    var re =  /(^|\s)(ExpandOpen|ExpandClosed)(\s|$)/
    node.className = node.className.replace(re, '$1'+newClass+'$3')
}