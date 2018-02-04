export function addElement(tag, className, parent, id) {
    let element = document.createElement( tag );
    element.className = className;
    parent.appendChild( element );
    if ( id )
        element.id = id;
    return element;
}

export function clearMainContent() {
    document.getElementById('main_content').innerHTML = '';
}

export function createCardInfoText(item) {
    let date = new Date();
    date.setTime(item.timestamp * 1000);
    return '<p>Дата снимка: '
        + addZero( date.getDate() ) + '.'
        + addZero( date.getMonth() + 1 ) + '.'
        + date.getFullYear() + '&nbsp;'
        + date.getHours() + ':'
        + addZero( date.getMinutes() ) + ':'
        + addZero( date.getSeconds() ) + '</p>'
        + '<p>Категория снимка: ' + item.category + '</p>'
        + '<p>Имя файла: ' + item.name + '</p>'
        + '<p>Размер файла: ' + addFileSize( item.filesize ) + '</p>';
}

function addZero(dateNumber) {
    return ( dateNumber < 10 ) ? '0' + dateNumber : dateNumber;
}

function addFileSize(fileSize) {
    return ( fileSize < 1024 ) ? fileSize + ' Б' : Math.round( fileSize/1024 ) + ' Кб';
}