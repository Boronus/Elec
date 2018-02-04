import {compareCategoryAndFileName} from './compare.js';
import {createCardInfoText, clearMainContent, addElement} from './general.js';
let mainContentElement = document.getElementById('main_content');

export function setTree(panelsArray, panelsOptions) {

    clearMainContent();
    panelsOptions.currentView = 'structure';
    panelsArray.sort(compareCategoryAndFileName);

    let mainContainer = addElement('ul', 'container main-container', mainContentElement, 'main_container');
    let root = addElement('li', 'node is-root expand-open', mainContainer, 'main_container');

    addElement('div', 'expand', root);
    addElement('div', 'content', root).innerHTML = 'root';
    let rootContainer = addElement('ul', 'container', root);

    let previousElementCategory = '';
    let previousElementContainer = null;

    panelsArray.forEach(function(item, i, arr) {

        let currentCategory = item.category;
        if ( previousElementCategory != currentCategory ) {
            let category = addElement('li', 'node expand-closed', rootContainer);
            addElement('div', 'expand', category);
            addElement('div', 'content', category).innerHTML = currentCategory;
            let categoryContainer = addElement('ul', 'container', category);

            previousElementCategory = currentCategory;
            previousElementContainer = categoryContainer;
        }

        let panel = addElement('li', 'node expand-leaf', previousElementContainer);
        addElement('div', 'expand', panel);
        let panelContent = addElement('div', 'content', panel);
        let newThumbnailWrapper = addElement('div', 'thumbnail-wrapper', panelContent);

        let newThumbnailWrapperDataset = newThumbnailWrapper.dataset;
        newThumbnailWrapperDataset.name = item.name;
        newThumbnailWrapperDataset.category = item.category;
        newThumbnailWrapperDataset.timestamp = item.timestamp;
        newThumbnailWrapperDataset.filesize = item.filesize;

        addElement('img', '', newThumbnailWrapper).src = 'http://93.91.165.233:8081/frontend_data/' + item.image;
    });

    let viewerBox = addElement('div', 'viewer-box', mainContentElement);
    let viewer = addElement('div', 'viewer', viewerBox, 'viewer');
    let viewerImageWrapper = addElement('div', 'viewer-image-wrapper', viewer, 'viewer_image_wrapper');
    addElement('img', '', viewerImageWrapper, 'viewer_image');
    addElement('div', 'viewer-image-info', viewer, 'viewer_image_info');

    changeViewerWidth();
}

export function changeImageSize(event) {
    let thumbnailWrapper = event.target.closest('.thumbnail-wrapper');

    if ( !thumbnailWrapper ){
        return;
    }

    let viewerImage = document.getElementById('viewer_image');
    let viewerImageInfo = document.getElementById('viewer_image_info');
    let thumbnailImage = thumbnailWrapper.querySelector('img');

    if ( thumbnailWrapper.classList.contains('thumbnail-open') ) {
        thumbnailWrapper.classList.remove('thumbnail-open');
    } else {
        thumbnailWrapper.classList.add('thumbnail-open');
        if ( !thumbnailWrapper.nextSibling )
            thumbnailWrapper.parentNode.appendChild( addCardInfo(thumbnailWrapper.dataset) );
        viewerImage.src = thumbnailImage.src;
        viewerImageInfo.innerHTML = createCardInfoText(thumbnailWrapper.dataset);
    }
    changeViewerWidth();
}

function addCardInfo(item) {
    let newCardInfo = document.createElement('div');
    newCardInfo.classList.add('card-info');
    newCardInfo.innerHTML = createCardInfoText(item);
    return newCardInfo;
}

export function treeToggle(event) {
    var clickedElem = event.target;

    if ( !clickedElem.classList.contains('expand') ) return;

    var nodeClassList = clickedElem.parentNode.classList;
    if ( nodeClassList.contains('expand-leaf') ) return;

    if ( nodeClassList.contains('expand-open') ) {
        nodeClassList.remove('expand-open');
        nodeClassList.add('expand-closed');
    } else {
        nodeClassList.remove('expand-closed');
        nodeClassList.add('expand-open');
    }
}

export function changeViewerWidth() {
    let viewerStyle = document.getElementById('viewer').style;
    let mainContentElementStyle = mainContentElement.style;
    
    if ( window.innerWidth > 840 ) {
        viewerStyle.width = calculateViewerWidth() + 'px';
        mainContentElementStyle.justifyContent = 'space-between';
        mainContentElementStyle.flexWrap = 'nowrap';
        viewerStyle.display = '';
    } else {
        viewerStyle.display = 'none';
        mainContentElementStyle.justifyContent = '';
        mainContentElementStyle.flexWrap = '';
    }
}

export function calculateViewerWidth() {
    let mainContentWidth = parseInt( window.getComputedStyle(mainContentElement, null).width );
    let mainContainerWidth = parseInt( window.getComputedStyle( document.getElementById('main_container') , null).width );
    return mainContentWidth - mainContainerWidth;
}
