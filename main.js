var form = document.querySelector("#my-form");
var nameInput = document.querySelector("#name");
var emailInput = document.querySelector("#email");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // user object
  let user = {
    name: nameInput.value,
    email: emailInput.value,
  };
  document.querySelector("#my-form").reset(); // to reset the form
  axios.post('https://crudcrud.com/api/3870062d8a48406ca006c3da4d9f3c2e/appointmentData', user)
  .then((result) => {
      console.log(result);
  }).catch((err) => {
      console.log(err);
  });
  addListOfUsers(user); // calling the funtion to display the created user
});
// Create list in html document
function addListOfUsers(user) {
  var userId = user._id;
  console.log(userId);
  const parentNode = document.getElementById("listOfUser");
  const childHTML = `<li id=${user._id}> ${user.name} ${user.email} <button onclick=deleteUser('${user._id}')>delete</button> <button onclick=editUser('${user.name}','${user.email}','${user._id}')>Edit</button></li>`;
  console.log(childHTML);
  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}
function deleteUser(userId) {
  axios.delete(`https://crudcrud.com/api/3870062d8a48406ca006c3da4d9f3c2e/appointmentData/${userId}`)
  .then((res)=>{
      console.log(res);
      removeUserFromScreen(userId);
  })
  .catch((err)=>{
      console.log(err);
  })
}

function editUser(name,email,userId){
    document.getElementById('name').value=name;
    document.getElementById('email').value=email;
    deleteUser(userId);
    removeUserFromScreen(userId);
    // axios.delete("https://crudcrud.com/api/3870062d8a48406ca006c3da4d9f3c2e/appointmentData/"+userId,{
    //     'name': document.getElementById('name').value,
    //     'email':document.getElementById('email').value
    // })
    // .then((res)=>{
    //     console.log(res);
    //     removeUserFromScreen(userId);
    // })
    // .catch((err)=>{
    //     console.log(err);
    // })
}

function removeUserFromScreen(userId) {
  const parentNode = document.getElementById("listOfUser");
  const childNodeToBeDeleted = document.getElementById(userId);
  if(childNodeToBeDeleted) {
    parentNode.removeChild(childNodeToBeDeleted);
  }
}
//get request using crud crud
function showUser1(){
    axios.get('https://crudcrud.com/api/3870062d8a48406ca006c3da4d9f3c2e/appointmentData')
    .then((res)=>{
        console.log(res);
        for(let i=0; i<res.data.length; i++){
            addListOfUsers(res.data[i]);
        }
    })
    .catch((err)=>{
        console.log(err);
    });
}

showUser1();
