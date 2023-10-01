let deadlines = [];
let todos = [];

load();

/** This function executes the two functions when the page is loaded. */
function init() {
    imageSlider();
    renderNotes();
}

/** This function renders the image slider. */
function imageSlider() {
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

/** This function ensures that the input fields are mandatory. */
function addToDo() {
    let deadline = document.getElementById('inputDeadline').value;
    let todo = document.getElementById('inputToDo').value;
    
    if (deadline === '' || todo === '') {
        alert('Bitte tragen Sie etwas ein.');
    } else {
        let currentDate = new Date();
        let selectedDate = new Date(deadline);

        if (selectedDate < currentDate) {
            alert('Sie können kein Datum in der Vergangenheit auswählen.');
        } else {
            deadlines.push(deadline);
            todos.push(todo);
            renderNotes();
            save();
        }
    }

    document.getElementById('inputDeadline').value = '';
    document.getElementById('inputToDo').value = '';
}
    
/** This function renders the to do list. */
function renderNotes() {
    document.getElementById('table').innerHTML = '';
    document.getElementById('table').innerHTML += `
        <tr>
            <td class="data"><b>Frist</b></td>
            <td class="data"><b>To Do</b></td>
            <td class="data"><b>löschen</b></td>
        </tr>
    `;

    for (let i = 0; i < todos.length; i++) {
        let todo = todos[i];
        let deadline = deadlines[i];
        document.getElementById('table').innerHTML += generateTableHTML(deadline, todo, i);
    }
}

/** This function creates the HTML when adding a new To Do. */
function generateTableHTML(deadline, todo, i) {
    let date = new Date(deadline);
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear().toString();
    let formattedDate = `${day}.${month}.${year}`;

    return `
        <tr>
            <td class="data">${formattedDate}</td>
            <td class="data to-do-content">${todo}</td>
            <td class="data">
                <div  onclick="deleteToDo(${i})" class="trash-container">
                    <img src="img/trash.png">
                </div>
            </td>
        </tr>
    `;
}

/** This function deletes the To Do when you click the button to delete. */
function deleteToDo(i) {
    deadlines.splice(i, 1);
    todos.splice(i, 1);
    renderNotes();
    save();
}

/** This function saves the added To Dos in the local storage. */
function save() {
    let deadlineSave = JSON.stringify(deadlines);
    localStorage.setItem('deadlines', deadlineSave);
    let todoSave = JSON.stringify(todos);
    localStorage.setItem('todos', todoSave);
}

/** This function loads the added To Dos from the local storage. */
function load() {
    let deadlineSave = localStorage.getItem('deadlines');
    let todoSave = localStorage.getItem('todos');
    
    if (deadlineSave && todoSave) {
        deadlines = JSON.parse(deadlineSave);
        todos = JSON.parse(todoSave);
	}
}