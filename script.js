const API_URL="https://67496219868020296630c556.mockapi.io/api/1/Curd";
let editFormData =null;


//getting data

function getFormData(){
    return{
        name:document.getElementById("name").value,
        email:document.getElementById("email").value,
    };
}

//clear data

function clearFormData(){
    document.getElementById("name").value="";
    document.getElementById("email").value="";

}
//setting data

function setFormData(name,email){
    document.getElementById("name").value=name;
    document.getElementById("email").value=email;

}
//success message

function setSuccessMessage(message){
    document.getElementById("message").innerText=message;
    setTimeout(() => (document.getElementById("message").innerText=""),3000);

}

// Submit form

function submitForm(){
    const formData = getFormData();
    if(!formData.name.trim() || !formData.email.trim()){
        setErrorMessage("Name and email fields are required");
        return;
    
}
if(!editFormData){
    addUser();
}
else{
    editData();
}
}

function setErrorMessage(message){
    const messageElement = document.getElementById("message");
    messageElement.innerText = message;
    messageElement.style.color ="red";
    setTimeout(()=>{
        messageElement.innerText = "";
        messageElement.style.color ="";
    },3000);
}
function addUser(){
    const payload=getFormData();
    fetch(API_URL, {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(payload),
    })
    .then((res)=>res.json())
    .then(()=>{
        setSuccessMessage("User added successfully!");
        clearFormData();
        getData();
    });
}


//edit data 

function editData(){
    const formData = getFormData();
    fetch(`${API_URL}/${editFormData.id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(formData),
    })
    .then((res)=>res.json())
    .then(()=>{
        setSuccessMessage("User updated successfully!");
        clearFormData();
        editFormData = null;
        getData();
      

    });
}

//delete data

function deleteData(id){
    fetch(`${API_URL}/${id}`,{
        method:"DELETE",
    })
    .then((res)=>res.json())
    .then(()=>{
        setSuccessMessage("User deleted successfully!");
        getData();
      
});
}

//Edit datacall

function editDataCall(id){
    fetch(`${API_URL}/${id}`)
    .then((res)=>res.json())
    .then((response)=>{     
        editFormData = response;
        setFormData(response.name,response.email);
    });
}

//E
function getData(){
    fetch(API_URL)
    .then((res)=>res.json())
    .then((response)=> {
        let tmpData="";
        response.forEach((user)=> {
            tmpData +=`
            <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><button class="btn" onclick="editDataCall('${user.id}')">Edit</button></td> 
            <td><button class="btn btn-danger" onclick="deleteData('${user.id}')">Delete</button></td> 
            </tr>`;
         });
         document.getElementById("tbData").innerHTML=tmpData;
         });
    
}
getData();



