const todoList = document.querySelector('#todo-list');
const form = document.querySelector('#add-todo-form');
const updateBtn = document.querySelector('#update');
const logoutItems = document.querySelectorAll('.logged-out');
const loginItems = document.querySelectorAll('.logged-in');
let newTitle = '';
let updateId = null;
let currentUser = null;

function setupUI(user) {
    if (user) {
        loginItems.forEach(item => item.style.display = 'block');
        logoutItems.forEach(item => item.style.display = 'none');
    }else{
        loginItems.forEach(item=>item.style.display = 'none');
        logoutItems.forEach(item=>item.style.display = 'block');
    }
}


function renderList(doc) {
    let li = document.createElement('li');
    li.className = 'collection-item';
    li.setAttribute('data-id',doc.id);
    let div = document.createElement('div');
    let title = document.createElement('span');
    title.textContent = doc.data().title;
    let anchor = document.createElement('a');
    anchor.href = "#modal-edit";
    anchor.className = "modal-trigger secondary-content";
    let editButton = document.createElement('i');
    editButton.className = "material-icons secondary-content";
    editButton.innerText = "edit";
    let deleteButton = document.createElement('i');
    deleteButton.className = "material-icons secondary-content red-text darken-3";
    deleteButton.innerText = "delete";
    anchor.appendChild(editButton);
    div.appendChild(title);
    div.appendChild(deleteButton);
    div.appendChild(anchor);
    li.appendChild(div);
    deleteButton.addEventListener("click", e=>{
        let id = e.target.parentElement.parentElement.getAttribute("data-id");
        db.collection('alltodos').doc(currentUser.uid).collection('todos').doc(id).delete();
    })
    editButton.addEventListener('click', e=>{
        updateId = e.target.parentElement.parentElement.parentElement.getAttribute("data-id");
    })

    todoList.appendChild(li);
}

updateBtn.addEventListener('click', e=>{
    newTitle = document.getElementsByName('new-title')[0].value;
    db.collection('alltodos').doc(currentUser.uid).collection('todos').doc(updateId).update({
        title: newTitle
    });
})

form.addEventListener('submit', e=>{
    e.preventDefault();
    db.collection('alltodos').doc(currentUser.uid).collection('todos').add({
        title:form.title.value
    }).catch(err=>{
        console.log(err.message);
    })
    form.title.value = '';

})

function getTodoList() {
    todoList.innerHTML = '';
    currentUser = auth.currentUser;
    document.querySelector('#user-email').innerHTML = (currentUser != null ? currentUser.email : '');

    if(currentUser === null) {
        todoList.innerHTML = '<h3 class="center-align"> Please login to get todo list</h3>';
        return;
    }
    db.collection('alltodos').doc(currentUser.uid).collection('todos').orderBy('title').onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if (change.type == 'added') {
                renderList(change.doc)
            }else if (change.type == 'removed') {
                let li = todoList.querySelector(`[data-id=${change.doc.id}]`);
                todoList.removeChild(li);
            }else if (change.type == 'modified') {
                let li = todoList.querySelector(`[data-id=${change.doc.id}]`);
                li.getElementsByTagName('span')[0].textContent = newTitle;
                newTitle = '';
            }
        })
    });

}
