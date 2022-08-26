
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function changeTaskStatus(id, colId) {
    let taskData = localStorage.getItem('taskData') != null ?
        JSON.parse(localStorage.getItem('taskData')) : [];

    taskData.forEach(t => {
        if (t.id == id) {
            t.status = colId.slice(0, colId.length - 3)
            var card = document.getElementById(id)
            if (colId == 'toDoCol') {
                card.style.backgroundColor = 'rgb(248, 131, 131)'
            } else if (colId == 'inProgressCol') {
                card.style.backgroundColor = 'rgb(138, 126, 248)'
            } else if (colId == 'doneCol') {
                card.style.backgroundColor = 'rgb(163, 245, 138)'
            }
        }
    })

    localStorage.removeItem('taskData');
    localStorage.setItem('taskData', JSON.stringify(taskData))
}

function filterTasksByAssignee() {
    let data = localStorage.getItem('taskData') != null ?
        JSON.parse(localStorage.getItem('taskData')) : [];

    this.createMultipleTaskCard(
        data.filter(d => d.assignee.includes(document.getElementById('filterByAssignee').value))
    )
}

function deleteTask() {
    let taskData;
    for (let i = 0; i < document.getElementsByClassName('card').length; i++) {
        if (document.getElementsByClassName('card')[i].style.borderColor == 'black') {
            taskData = localStorage.getItem('taskData') != null ?
                JSON.parse(localStorage.getItem('taskData')) : [];
            taskData.splice(
                taskData.findIndex(t => t.id == document.getElementsByClassName('card')[i].id),1
            )
            localStorage.removeItem('taskData');
            localStorage.setItem('taskData',JSON.stringify(taskData))
        }
    }
    this.createMultipleTaskCard(null)
}
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    document.getElementById(data).style.borderColor = 'rgb(14, 137, 252)';
    for (let i = 0; i < document.getElementsByClassName('card').length; i++) {
        if (document.getElementsByClassName('card')[i].id != document.getElementById(data).id) {
            document.getElementsByClassName('card')[i].style.borderColor = ''
        }
    }
    ev.target.appendChild(document.getElementById(data));
    this.changeTaskStatus(data, ev.target.id)
}

function createMultipleTaskCard(data) {
    let taskData;
    if (data == null) {
        taskData = localStorage.getItem('taskData') != null ?
            JSON.parse(localStorage.getItem('taskData')) : [];
    } else {
        taskData = data;
    }
    document.getElementById('toDoCol').innerHTML = ''
    document.getElementById('inProgressCol').innerHTML = ''
    document.getElementById('doneCol').innerHTML = ''
    var toDoColtitleDiv = document.createElement('div')
    toDoColtitleDiv.classList.add('w-100', 'bg-white', 'mb-2')
    var inProgressColtitleDiv = document.createElement('div')
    inProgressColtitleDiv.classList.add('w-100', 'bg-white', 'mb-2')

    var doneColtitleDiv = document.createElement('div')
    doneColtitleDiv.classList.add('w-100', 'bg-white', 'mb-2')

    var toDoColTitle = document.createElement('h6')
    toDoColTitle.innerHTML = 'To Do';
    var inProgressColTitle = document.createElement('h6')
    inProgressColTitle.innerHTML = 'In Progress'
    var doneColTitle = document.createElement('h6')
    doneColTitle.innerHTML = "Done"
    toDoColtitleDiv.appendChild(toDoColTitle)
    inProgressColtitleDiv.appendChild(inProgressColTitle)
    doneColtitleDiv.appendChild(doneColTitle)
    document.getElementById('toDoCol').appendChild(toDoColtitleDiv)
    document.getElementById('inProgressCol').appendChild(inProgressColtitleDiv)
    document.getElementById('doneCol').appendChild(doneColtitleDiv)
    

    taskData.forEach(task => {
        this.createTaskCard(
            task.id,
            task.name,
            task.assignee,
            task.status + 'Col'
        )
    });
}

function createNewtask() {
    let taskData = localStorage.getItem('taskData') != null ?
        JSON.parse(localStorage.getItem('taskData')) : [];

    taskData.push({
        id: this.generateRandomId(),
        name: document.getElementById('newTaskNameField').value,
        assignee: document.getElementById('createTastAssigneDropdown').value,
        status: 'toDo'
    })

    localStorage.setItem('taskData',
        JSON.stringify(taskData))

    this.createMultipleTaskCard(null);

    var myModalEl = document.getElementById('exampleModal');
    var modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();

}

function generateRandomId() {

    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

function createTaskCard(id, tskName, assigneeName, col) {
    var card = document.createElement("div")
    card.id = id
    card.classList.add('card', 'p-2', 'mb-3')
    card.setAttribute('draggable', true)
    if (col == 'toDoCol') {
        card.style.backgroundColor = 'rgb(248, 131, 131)'
    } else if (col == 'inProgressCol') {
        card.style.backgroundColor = 'rgb(138, 126, 248)'
    } else if (col == 'doneCol') {
        card.style.backgroundColor = 'rgb(163, 245, 138)'
    }
    // card.style.backgroundColor = 'grey'
    card.style.borderStyle = 'solid';
    card.style.borderWidth = '2px';
    card.style.height = 'fit-content';
    card.addEventListener('dragstart', drag)
    card.addEventListener('click', () => {
        card.style.borderColor = 'black'
        for (let i = 0; i < document.getElementsByClassName('card').length; i++) {
            if (document.getElementsByClassName('card')[i].id != id) {
                document.getElementsByClassName('card')[i].style.borderColor = ''
            }

        }
    })
    var taskname = document.createElement("h6")
    taskname.classList.add([..."mb-1"])
    var boldText = document.createElement("b")
    boldText.innerHTML = tskName
    var assignee = document.createElement("small")
    assignee.innerHTML = assigneeName
    taskname.appendChild(boldText)
    card.appendChild(taskname)
    card.appendChild(assignee)
    document.getElementById(col).appendChild(card)


}
//rgb(14, 137, 252) blue