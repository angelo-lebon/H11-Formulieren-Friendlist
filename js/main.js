"use strict";

window.addEventListener('load', init);

// Maak een pagina om de gegevens van je vrienden bij te houden:
// Id
// Naam
// Leeftijd
// Deze gegevens worden in 3 arrays bijgehouden.
// In een select worden de naam en de leeftijd getoond.
// Bij selectie van een vriend, worden zijn/haar gegevens getoond in textboxen
// Voorzie en knop om gewijzigde gegevens op te slaan en nieuwe vrienden toe te voegen.


// Contains friend objects: {id: x, name: "John", age: 18}
var friends = [{id: 1, name: "Angelo Lebon", age: 26}, {id: 2, name: "Belle Perez", age: 45}]

// Input Elements
var idInput;
var nameInput;
var ageInput;
var editNameInput;
var editAgeInput;
var addFriendBtn;
var editFriendBtn;
var friendsSelect;
var errMessage;
var editErrMessage;

function init(){
    idInput = document.getElementById("id-input");
    nameInput = document.getElementById("name-input");
    ageInput= document.getElementById("age-input");
    editNameInput = document.getElementById("edit-name-input");
    editAgeInput= document.getElementById("edit-age-input");
    addFriendBtn = document.getElementById("add-friend-btn");
    editFriendBtn = document.getElementById("edit-friend-btn");
    friendsSelect = document.getElementById("friend-list-select");
    errMessage = document.getElementById("err-message");
    editErrMessage = document.getElementById("edit-err-message");

    addFriendBtn.addEventListener('click', addFriend);
    editFriendBtn.addEventListener('click', editFriend);
    friendsSelect.addEventListener('change', showSelectedFriend);
    fillFriendlist();
    showSelectedFriend();
}

function addFriend(e){
    e.preventDefault();
    let id = idInput.value;
    let name = nameInput.value;
    let age = ageInput.value;

    if(isEmpty(id) || isEmpty(name) || isEmpty(age)){
        errMessage.innerHTML = 'Please fill in all fields.'
        return;
    }

    let isDuplicate = friends.some(friend => friend.id == id);
    if(isDuplicate){
        errMessage.innerHTML = `Friend with id ${id} already exists.`
        return;
    };

    errMessage.innerHTML = '';

    let newFriend = {
        id: id,
        name: name,
        age: age
    }
    friends.push(newFriend);
    fillFriendlist();
}

function editFriend(e){
    e.preventDefault();
    let name = editNameInput.value;
    let age = editAgeInput.value;

    if(isEmpty(name) || isEmpty(age)){
        editErrMessage.innerHTML = 'Please fill in all fields.'
        return;
    }
    editErrMessage.innerHTML = '';

    let index = friendsSelect.selectedIndex;
    let selectedFriendId = friendsSelect.options[index].value;
    let friend = friends.find(x => x.id == selectedFriendId);
    friend.name = name;
    friend.age = age;
    fillFriendlist();
}

function fillFriendlist(){
    friendsSelect.length = 0;
    friends.forEach((friend) =>{
        friendsSelect.options[friendsSelect.length]=(new Option(`${friend.name}`, friend.id))
    })
}

function showSelectedFriend(){
    let index = friendsSelect.selectedIndex;
    let selectedFriendId = friendsSelect.options[index].value;
    let friend = friends.find(x => x.id == selectedFriendId);

    editNameInput.value = friend.name;
    editAgeInput.value = friend.age;
}

function isEmpty(x){
    return x === null || x === undefined || x === "";
}

