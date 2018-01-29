import '../main.css';

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
        setPanels();
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
                console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            } else if (prev.value == 'sort_type_category') {
                panelsArray.sort(compareCategory);
            }
            setPanels();
        }
        console.log(this.value);
    };
}



//setPanels(panelsArray);

/*var val = document.getElementById('imagename').value,
 src = 'http://webpage.com/images/' + val +'.png',
 img = document.createElement('img');

 img.src = src;
 document.body.appendChild(img);*/


//string_a.localeCompare(string_b);

/* Expected Returns:

 0:  exact match

 -1:  string_a < string_b

 1:  string_a > string_b

 */

function compareTimeStamp(a,b) {
    if (a.timestamp < b.timestamp)
        return -1;
    if (a.timestamp > b.timestamp)
        return 1;
    return 0;
}

function compareCategory(a,b) {
    if (a.category < b.category)
        return -1;
    if (a.category > b.category)
        return 1;
    return 0;
}

function compareFileSize(a,b) {
    if (a.filesize < b.filesize)
        return -1;
    if (a.filesize > b.filesize)
        return 1;
    return 0;
}

function compareFileName(a,b) {
    if (a.image.substring(a.image.lastIndexOf('/')+1) < b.image.substring(a.image.lastIndexOf('/')+1))
        return -1;
    if (a.image.substring(a.image.lastIndexOf('/')+1) > b.image.substring(a.image.lastIndexOf('/')+1))
        return 1;
    return 0;
}

function clearPanels() {
    mainContentElement.innerHTML = '';
}

function setPanels() {
    panelsArray.forEach(function(item, i, arr) {
        //alert( i + ": " + item + " (массив:" + arr + ")" );
        console.log(item.image);
        let newPanel = document.createElement('article');
        let newImageWrapper = document.createElement('div');
        newImageWrapper.classList.add('image-wrapper');

        let newImage = document.createElement('img');
        newImage.src = 'http://93.91.165.233:8081/frontend_data/' + item.image; //.dataset
        //newImage.classList.add('lazy');


        newImageWrapper.appendChild(newImage);
        newPanel.appendChild(newImageWrapper);
        mainContentElement.appendChild(newPanel);
        //console.log(panelsArray);
    });
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