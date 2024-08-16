import { addDoc, collection, increment, db, onSnapshot, deleteDoc, doc, updateDoc,serverTimestamp } from "./firebase.js";

let todoHandler = async () => {
    let todovalue = document.getElementById("todoValue");
    console.log(todovalue.value)
    try {
        let docRef = await addDoc(collection(db, "todos"), {
            id: increment(1),
            todo: todovalue.value,
            timestamp: serverTimestamp()
            
        });
        
        
        
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    todovalue.value = "";
}

let addTodo = document.querySelector("#addTodo");
addTodo.addEventListener("click", todoHandler);

let getTodos = () => {
    let myList = document.querySelector(".myList");
    onSnapshot(collection(db, "todos"), (snapshot) => {
        myList.innerHTML = "";
        snapshot.forEach((doc) => {
            console.log(doc.data());
            let { todo } = doc.data();
            myList.innerHTML += `<div class="lists">
                    <div class="list">
                        <input onclick="checkhandler(this)"  type="checkbox">
                        
                    </div>
                    <div class="todoValue">
                        <h3>${todo}</h3>
                    </div>
                    <div class="btn">
                        <button id="editBtn" onclick="prepareEdit('${doc.id}','${todo}')"><i class="fa-solid fa-pencil"></i></button>
                        <button id="removeBtn" onclick="deltodos('${doc.id}','${todo}')"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>`;
        });
    });
}

getTodos();





function checkhandler(listValue){
    let todo = listValue.parentElement.nextElementSibling.firstElementChild;

    if(todo.style.textDecoration === "line-through"){
        todo.style.textDecoration = "none";
    }
    else{
        todo.style.textDecoration = "line-through";
    }
}

window.checkhandler = checkhandler;

let deltodos = async (id,todo) => {
    alert("Are you Sure want to delete"+" "+todo)
    await deleteDoc(doc(db, "todos", id));
}

window.deltodos = deltodos;


let prepareEdit = (id, currentTodo) => {
    let todovalue = document.getElementById("todoValue");
    todovalue.value = currentTodo;

    
    let addTodoButton = document.querySelector("#addTodo");
    addTodoButton.textContent = "Update";
    addTodoButton.removeEventListener("click", todoHandler);
    addTodoButton.addEventListener("click", () => editTodos(id));
}

window.prepareEdit = prepareEdit;

let editTodos = async (id) => {
    let todovalue = document.getElementById("todoValue");
    const docRef = doc(db, "todos", id);
    try {
        await updateDoc(docRef, {
            todo: todovalue.value
        });
        console.log("Document updated with ID: ", id);

        
        let addTodoButton = document.querySelector("#addTodo");
        addTodoButton.textContent = "Add";
        addTodoButton.removeEventListener("click", () => editTodos(id));
        addTodoButton.addEventListener("click", todoHandler);
        
        
        todovalue.value = "";
    } catch (e) {
        console.error("Error updating document: ", e);
    }
}

window.editTodos = editTodos;
