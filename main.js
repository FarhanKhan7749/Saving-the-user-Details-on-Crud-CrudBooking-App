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
  axios.post('https://crudcrud.com/api/ad8634a3680849ea9d4ceadd1bfa2b3b/appointmentData', user)
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
  const childHTML = `<li id=${user._id}> ${user.name} ${user.email} <button onclick=deleteUser('${user._id}')>delete</button> <button onclick=editUser('${user._id}')>Edit</button></li>`;
  console.log(childHTML);
  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}
function deleteUser(userId) {
  axios.delete(`https://crudcrud.com/api/ad8634a3680849ea9d4ceadd1bfa2b3b/appointmentData/${userId}`)
  .then((res)=>{
      console.log(res);
      removeUserFromScreen(userId);
  })
  .catch((err)=>{
      console.log(err);
  })
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
    axios.get('https://crudcrud.com/api/ad8634a3680849ea9d4ceadd1bfa2b3b/appointmentData')
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
