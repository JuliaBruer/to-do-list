let deadlines = [];
let todos = [];

load();

function init(){
    imageSlider();
    renderNotes();
}

//imageSlider
function imageSlider(){
    setTimeout(function(){
        document.getElementById('img1').style = 'transform: translateX(-100%)';
        document.getElementById('img2').style = 'transform: translateX(0%)';
        document.getElementById('img3').style = 'transform: translateX(100%)';
    }, 3000);

    setTimeout(function(){
        document.getElementById('img1').style = 'transform: translateX(-200%)';
        document.getElementById('img2').style = 'transform: translateX(-100%)';
        document.getElementById('img3').style = 'transform: translateX(0%)';
    }, 6000);

    setTimeout(function(){
        document.getElementById('img1').style = 'transform: translateX(0%)';
        document.getElementById('img2').style = 'transform: translateX(100%)';
        document.getElementById('img3').style = 'transform: translateX(200%)';
    
        imageSlider();
    }, 9000);
}

// to Do Liste
function addToDo(){
    let deadline = document.getElementById('inputDeadline').value;
    let todo = document.getElementById('inputToDo').value;
    if (deadline == '' || todo == '') {
        alert('Bitte tragen Sie etwas ein.')
    } else {
        deadlines.push(deadline);
        todos.push(todo);
    }
    renderNotes();
    save();
    document.getElementById('inputDeadline').value = '';
    document.getElementById('inputToDo').value = '';
}
    

function renderNotes(){
    document.getElementById('table').innerHTML = '';
    document.getElementById('table').innerHTML += `
        <tr>
        <td class="data"><b>Frist</b></td>
        <td class="data"><b>To Do</b></td>
        <td class="data"></td>
        </tr>
    `;

    for (let i = 0; i < todos.length; i++) {
        let todo = todos[i];
        let deadline = deadlines[i];
        document.getElementById('table').innerHTML += generateTableHTML(deadline, todo, i);
    }
}

function generateTableHTML(deadline, todo, i){
    const date = new Date(deadline);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const formattedDate = `${day}.${month}.${year}`;

    return `
            <tr>
            <td class="data">${formattedDate}</td>
            <td class="data">${todo}</td>
            <td class="data"><button class="btn" onclick="deleteContact(${i})">löschen</button></td>
            </tr>
        `;
}

function deleteContact(i) {
    deadlines.splice(i, 1);
    todos.splice(i, 1);
    renderNotes();
    save();
}

function save() {
    let deadlineSave = JSON.stringify(deadlines);
    localStorage.setItem('deadlines', deadlineSave);
    let todoSave = JSON.stringify(todos);
    localStorage.setItem('todos', todoSave);
}

function load() {
    let deadlineSave = localStorage.getItem('deadlines');
    let todoSave = localStorage.getItem('todos');
    if(deadlineSave && todoSave) {
        deadlines = JSON.parse(deadlineSave);
        todos = JSON.parse(todoSave);
	}
}