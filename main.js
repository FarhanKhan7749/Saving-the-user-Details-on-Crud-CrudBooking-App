var form = document.querySelector("#my-form");
var nameInput = document.querySelector('#name');
var emailInput = document.querySelector('#email');
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    // user object 
    let user ={
        name : nameInput.value,
        email : emailInput.value,
    } 
    document.querySelector("#my-form").reset();// to reset the form
    // create user in backed useing network call
    axios.post('https://crudcrud.com/api/373328cd2d974b7d9c8c0727f5be42c5/appointmentData', user)
    .then((result) => {
        console.log(result);     
    }).catch((err) => {
        console.log(err);
    });
    addListOfUsers(user);// calling the funtion to display the created user
});
// Create list in html document
function addListOfUsers(user) {
    // get element where you wnat to create a elemnt 
    var ul = document.getElementById("listOfUser");
    // once get the element then create a element 
    var li = document.createElement("li");
    // append the elemet in child, child is because the we are creating the element so it will child of the the element we want ot add the element.
    li.appendChild(document.createTextNode(user.name + " " + user.email + " "));
    // append child node in paprent element or the where you want to add the element.

    //edit button
    var editB = document.createElement('input');
    editB.type = 'button'
    editB.value = 'Edit'
    editB.addEventListener('click',(e)=>{
        document.getElementById('name').value = user.name;
        document.getElementById('email').value = user.email;
        li.remove();
    })
    editB.style.border = "2px solid green";
    //delete button
    var deleteB = document.createElement('input');
    deleteB.type = 'button'
    deleteB.value = 'Delete'
    deleteB.addEventListener('click',(e) =>{
        localStorage.removeItem(user.email);
        li.remove();
    })
    deleteB.style.border = "2px solid red";
    //
    li.appendChild(editB);
    li.appendChild(deleteB);
    ul.append(li)
}

//get request using crud crud
// function showUser1(){
//     axios.get('https://crudcrud.com/api/373328cd2d974b7d9c8c0727f5be42c5/appointmentData')
//     .then((res)=>{
//         addListOfUsers(res);
//     })
//     .catch((err)=>{
//         console.log(err);
//     });
// }

//showUser1();
//
//
//
//get request using crud crud
function showUser(){
    axios.get('https://crudcrud.com/api/373328cd2d974b7d9c8c0727f5be42c5/appointmentData')
    .then((res)=>{
        let userArray = res.data;
        userArray.forEach((ele) => {
            //console.log(ele.name);
            //console.log(ele.email);
            let userInfo = {
                name: ele.name,
                email: ele.email
            }
            addListOfUsers(userInfo);
        });
        console.log(res)
        //console.log(res.data);
    })
    .catch((err)=>{
        console.log(err);
    })
}

showUser();
