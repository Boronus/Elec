import '../css/main.css';
import {setTree, changeImageSize, treeToggle, changeViewerWidth} from './tree.js';
import {setPanels, changeList} from './panels.js';

let mainContentElement = document.getElementById('main_content');
let mainFooter = document.getElementById('main_footer');
let panelsArray;
let panelsOptions = {
    cardsForOneList: 20,
    currentSort: 'category'
};

getJSON('http://93.91.165.233:8081/frontend_data/catalog.json', function(err, data) {
    if (err !== null) {
        alert('Something went wrong: ' + err);
    } else {
        panelsArray = data;
        panelsArray.forEach(function(item, i, arr) {
            item.name = item.image.substring(item.image.lastIndexOf('/')+1);
        });
        panelsOptions.numberOfLists = Math.ceil( panelsArray.length / panelsOptions.cardsForOneList );
        panelsOptions.currentList = 1;
        setPanels(panelsArray, panelsOptions);
        setChosenView();
    }
});

let sortForm = document.forms.sortImages;
let radioButtons = sortForm.sortType;
let prev = null;
for(var i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener('click', setSortTypeListeners);
}

function setSortTypeListeners(e) {
    e.preventDefault();
    if(this !== prev) {
        if (prev)
            prev.classList.remove('chosen');
        prev = this;
        prev.classList.add('chosen');

        panelsOptions.currentSort = prev.id.split('_')[2];
        panelsOptions.currentList = 1;
        setPanels(panelsArray, panelsOptions);
    }
}

document.getElementById('clear_closed').addEventListener('click', function(e){
    clearStorage(e, panelsArray, panelsOptions);
});
document.getElementById('paginator').addEventListener('click', function(e){
    changeList(e, panelsArray, panelsOptions);
});
document.getElementById('view_panels').addEventListener('click', changeView);
document.getElementById('view_tree').addEventListener('click', changeView);

function changeView(e) {
    e.preventDefault();
    setChosenView();
    if (this.id == 'view_panels') {
        setPanels(panelsArray, panelsOptions);
        window.removeEventListener("resize", changeViewerWidth);
        mainContentElement.style.justifyContent = '';
        mainContentElement.style.flexWrap = '';
        mainFooter.style.display = '';
    } else if (this.id == 'view_tree') {
        setTree(panelsArray,panelsOptions);
        mainContentElement.addEventListener('click',treeToggle);
        mainContentElement.addEventListener('click',changeImageSize);
        window.addEventListener("resize", changeViewerWidth);
        mainFooter.style.display = 'none';
    }
    setChosenView();
}

function setChosenView() {
    let cardsViewButtonClassList = document.getElementById('view_panels').classList;
    let treeViewButtonClassList = document.getElementById('view_tree').classList;
    if (panelsOptions.currentView =='cards') {
        cardsViewButtonClassList.add('chosen');
        treeViewButtonClassList.remove('chosen');
    } else {
        cardsViewButtonClassList.remove('chosen');
        treeViewButtonClassList.add('chosen');
    }
}

function clearStorage(e, panelsArray, panelsOptions) {
    e.preventDefault(); 
    var closedItems = JSON.parse( localStorage.getItem("closed") );
    panelsArray.push.apply(panelsArray, closedItems);
    localStorage.removeItem("closed");
    if (panelsOptions.currentView == 'cards') {
        setPanels(panelsArray, panelsOptions);
    } else if (panelsOptions.currentView == 'structure') {
        setTree(panelsArray,panelsOptions);
    }
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