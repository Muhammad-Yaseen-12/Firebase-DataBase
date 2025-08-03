import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, Timestamp, getDocs, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
let addTaks = document.getElementById("addTask");
let todoInput = document.getElementById("todoInput")
// let list = document.getElementById("list");


const firebaseConfig = {
    apiKey: "AIzaSyCZGoOMABYLS2mCltj6lvRfvbC1NPMOHCs",
    authDomain: "auth-fc882.firebaseapp.com",
    projectId: "auth-fc882",
    storageBucket: "auth-fc882.firebasestorage.app",
    messagingSenderId: "297023676986",
    appId: "1:297023676986:web:c0f7e584e47845cc8f4b03",
    measurementId: "G-6KQN61P0P9"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


addTaks.addEventListener("click", async () => {
    if (todoInput.value != "") {
        try {
            const docRef = await addDoc(collection(db, "userTask"), {
                userValue: todoInput.value,
                time: Timestamp.now()
            });
            todoInput.value = ""
            renderData()
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    else {
        alert("Please enter a task");
    }

})
let renderData = async () => {
    list.innerHTML = ""
    const querySnapshot = await getDocs(collection(db, "userTask"));
    querySnapshot.forEach((doc) => {
        list.innerHTML += `<li>${doc.data().userValue} 
        <button onclick='editTask("${doc.id}")'>edit</button>
        <button onclick='delTask("${doc.id}")'>delete</button>
        
        </li>`
    });
}
renderData()

let editTask = async (id) => {
    let newValue = prompt("Enter new value");

    if (!newValue || newValue.trim() === "") {
        alert("Please enter a valid value");
        return;
    } else {
        const cityRef = doc(db, 'userTask', id);
        await updateDoc(cityRef, {
            userValue: newValue.trim(),
            time: Timestamp.now()
        });
        renderData();
    }
};

window.editTask = editTask
let delTask = async (id) => {
    await deleteDoc(doc(db, "userTask", id));
    renderData()

}
window.delTask = delTask
