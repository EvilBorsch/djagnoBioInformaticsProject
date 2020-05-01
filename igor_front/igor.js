'use strict';

/**
 * Ajax с телом FormData
 * @param {string} route - адресс
 * @param {string} method - метод запроса
 * @param {FormData} formData - данные
 * @param {function} callback - функция, которая будет вызвана после запроса
 */
async function ajaxForm(route, method, formData, callback) {

    const reqBody = {
        method: method,
        mode: 'cors',
        credentials: 'include',
    };

    if (method !== 'GET' && method !== 'HEAD') {
        reqBody['body'] = formData;
    }

    const req = new Request(route, reqBody);
    let responseJson = null;
    try {
        const response = await fetch(req);
        if (response.ok) {
            responseJson = await response.json();
        } else {
            throw new Error('Response not ok');
        }
    } catch (exception) {
        console.log('Ajax Error:', exception.message);
    }

    callback(responseJson);
}

function createImageField(textAddition,imageSrc) {
    let textAdditionElement = document.createElement("b")
    textAdditionElement.className="textAddition"
    textAdditionElement.textContent=textAddition
    let imageField = document.createElement("img")
    imageField.src = imageSrc
    imageField.className = "readyImages"
    app.appendChild(imageField)
    app.appendChild(textAdditionElement)
}

function appendImages(images) {
    for (var textAddition in images) {
        createImageField(textAddition, images[textAddition])
    }
}


function sendAjax(e) {
    e.preventDefault()
    var formData = new FormData()
    let file = document.getElementById("inp").files.item(0)
    formData.append('photo', file)
    let images = []

    ajaxForm("http://localhost:8000/api/get_mtx_data", "POST", formData, (r) => {
        images = r
        console.log(images)
        appendImages(images)

    })
    console.log(file)
}


let app = document.getElementById("app")
let form = document.getElementById("form")
form.onsubmit = sendAjax;

