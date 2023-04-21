// USER FORM SCRIPT

// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

function createUser(obj) {
  
  // Create new list item with user
    const li = document.createElement('li');

  // Add text node with input values
  // li.appendChild(document.createTextNode(`${nameInput.value}: ${emailInput.value}`));

  // Add HTML
  li.innerHTML = `<strong>${obj.name}</strong>: ${obj.emailId} <button class="btn-secondary btn-sm float-right edit">Edit</button> <button class="btn-danger btn-sm float-right delete">X</button>`;

  // Append to ul
  userList.appendChild(li);

}

axios.get("https://crudcrud.com/api/3298ea029c594c5db93bdde380e5afc2/appointmentData")
  .then((response) => {
    for(var i=0; i < response.data.length; i++){
      createUser(response.data[i])
    }
  });


// Listen for form submit
myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  
  if(nameInput.value === '' || emailInput.value === '') {
    // alert('Please enter all fields');
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {

    let myObj = {
        name: nameInput.value,
        emailId: emailInput.value
    };

    createUser(myObj)
    //axios-crudcrud storage//

    axios.post("https://crudcrud.com/api/3298ea029c594c5db93bdde380e5afc2/appointmentData", myObj)
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })

    // Clear fields
    nameInput.value = '';
    emailInput.value = '';
  }
}

var itemList = document.getElementById('users');
itemList.addEventListener('click', removeItem);

function removeItem(e){
    if(e.target.classList.contains('delete')){
      if(confirm('Are You Sure?')){
        var li = e.target.parentElement;
        itemList.removeChild(li);
        console.log(li.firstElementChild.innerHTML);
        localStorage.removeItem(li.firstElementChild.innerHTML);
      }
    }
    else if(e.target.classList.contains('edit')){
        var li = e.target.parentElement;
        var myObj_parsed = JSON.parse(localStorage.getItem(li.firstElementChild.innerHTML));
        // console.log(myObj_parsed);
        itemList.removeChild(li);
        localStorage.removeItem(li.firstElementChild.innerHTML);
        
        nameInput.value = myObj_parsed.name;
        emailInput.value = myObj_parsed.emailId;
    }

  }