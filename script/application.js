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
var rad = sortForm.sortType;
var prev = null;
for(var i = 0; i < rad.length; i++) {
    rad[i].onclick = function() {
        (prev)? console.log(prev.value):null;
        if(this !== prev) {
            prev = this;
        }
        console.log(this.value)
    };
}



//setPanels(panelsArray);

/*var val = document.getElementById('imagename').value,
 src = 'http://webpage.com/images/' + val +'.png',
 img = document.createElement('img');

 img.src = src;
 document.body.appendChild(img);*/


function setPanels(){
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