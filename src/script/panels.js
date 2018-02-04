import {createCardInfoText, clearMainContent, addElement} from './general.js';
import {compareTimeStamp, compareFileSize, compareFileName, compareCategoryAndFileName, compareNumbers} from './compare.js';
let mainContentElement = document.getElementById('main_content');

export function createPaginator(panelsOptions) {
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

    paginatorArray.forEach(function(item, i, arr) {

        let paginatorLink = document.createElement('a');
        paginatorLink.innerHTML = item;
        paginatorLink.classList.add('list-link');

        if ( item != '&hellip;' )
            paginatorLink.dataset.list = item;

        paginator.appendChild(paginatorLink);

    });
}

export function setPanels(panelsArray, panelsOptions) {

    clearMainContent();
    panelsOptions.currentView = 'cards';
    var closedItems = JSON.parse( localStorage.getItem("closed") );
    if (!closedItems) closedItems = [];

    closedItems.forEach(function(item, i, arr) {
        var imageIndex = panelsArray.findIndex((panelItem) => panelItem.image == item.image);
        if (imageIndex > -1) {
            panelsArray.splice(imageIndex, 1);
        }
    });

    if (panelsOptions.currentSort == 'size') {
        panelsArray.sort(compareFileSize);
    } else if (panelsOptions.currentSort == 'timestamp') {
        panelsArray.sort(compareTimeStamp);
    } else if (panelsOptions.currentSort == 'name') {
        panelsArray.sort(compareFileName);
    } else if (panelsOptions.currentSort == 'category') {
        panelsArray.sort(compareCategoryAndFileName);
    }

    panelsOptions.numberOfLists = Math.ceil( panelsArray.length / panelsOptions.cardsForOneList );
    createPaginator(panelsOptions);

    let startElement = (panelsOptions.currentList - 1) * panelsOptions.cardsForOneList;
    for(let i = startElement; i < startElement + panelsOptions.cardsForOneList &&  i < panelsArray.length; i++) {

        let newPanel = addElement('article','',mainContentElement);
        newPanel.dataset.image = panelsArray[i].image;

        let newClose = addElement('div','close',newPanel);
        newClose.addEventListener('click', function(e){
            closePanel(e, panelsArray, panelsOptions);
        });

        let newImageWrapper = addElement('div','image-wrapper',newPanel);
        let newImage = addElement('img','',newImageWrapper);
        newImage.src = 'http://93.91.165.233:8081/frontend_data/' + panelsArray[i].image;
        newImage.style.visibility='hidden';
        newImage.onload = function() {
            this.style.visibility='visible';
        };

        let newCardInfo = addElement('div','card-info',newPanel);
        newCardInfo.innerHTML = createCardInfoText(panelsArray[i]);
    }
}

export function closePanel(e, panelsArray, panelsOptions) {
    var articleElem = e.currentTarget.closest('article');
    e.currentTarget.remove();
    changeOpacity( articleElem );

    var closedItems = JSON.parse( localStorage.getItem("closed") );
    if (!closedItems) closedItems = [];
    closedItems.push( panelsArray.find(findByImage) );

    var closedItemsString = JSON.stringify( closedItems );
    localStorage.setItem("closed", closedItemsString);

    function findByImage(element, index, array) {
        return articleElem.dataset.image == element.image;
    }

    function changeOpacity( elem ) {
        setTimeout(function() {
            if ( elem.style.opacity == '' )
                elem.style.opacity = '1.0';
            elem.style.opacity = '' + ( +elem.style.opacity - 0.05) ;
            if (elem.style.opacity > 0) {
                changeOpacity( elem );
            } else {
                setPanels(panelsArray, panelsOptions);
            }
        }, 10);
    }
}

export function changeList(event, panelsArray, panelsOptions) {
    let listLink = event.target.closest('.list-link');
    if ( !listLink ) return;
    if ( !listLink.dataset.list ) return;

    panelsOptions.currentList = listLink.dataset.list;
    setPanels(panelsArray, panelsOptions);
}