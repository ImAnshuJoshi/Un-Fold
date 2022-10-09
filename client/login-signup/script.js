/***********************************toggling between login and sign up********************************** */

var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");

function register() {
  x.style.left = "-400px";
  y.style.left = "50px";
  z.style.left = "110px";
}
function login() {
  x.style.left = "50px";
  y.style.left = "450px";
  z.style.left = "0";
}

/*****************************LOGIN SIGN UP Functionality*************************** */

let email;
let password;

async function ff(){
  const response = await fetch("http://localhost:3000/api/login/", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    withCredentials:true
  });
  const user = await response.json();
  if(user.status!==200)
  {
    document.getElementById("para").innerHTML = user.message;
      var modal = document.getElementById("myModal");
      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close")[0];
      modal.style.display = "block";
      span.onclick = function () {
        modal.style.display = "none";
      };
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    }
  
  const token = user.token;
  if (token) {
    localStorage.setItem("jwt", token);
    location.href = "../Homepage/index.html";
  }
  return user;
  // console.log("hi " + response.status);
  // if (response.status != 200) {r
  //  
  // console.log(response.status);
  
};

const loginBtn = document.querySelector(".loginbtn");

loginBtn.addEventListener("click", async () => {
  email = document.getElementById("login-email").value;
  password = document.getElementById("login-pass").value;
  const a = await ff();
  console.log(a);
});

/******************************************************register ***********************************************/

let fname, lname, reg_email, desc, img, pass;

function register123() {
  password = "";
  // fname = document.getElementById("register-fname").value;
  fname = (document.getElementById("register-fname") || {}).value || "";
  lname = (document.getElementById("register-lname") || {}).value || "";
  reg_email = (document.getElementById("register-email") || {}).value || "";
  desc = (document.getElementById("register-desc") || {}).value || "";
  img = document.getElementById("register-img").files[0];
  pass = (document.getElementById("register-pass") || {}).value || "password";

  console.log(img);
  ff2();
}

const ff2 = async () => {
  // formdata
  const formdata = new FormData();
  formdata.append("fname", fname);
  formdata.append("lname", lname);
  formdata.append("email", reg_email);
  formdata.append("about", desc);
  formdata.append("item", img);
  formdata.append("password", pass);

  const response = await fetch("http://192.168.137.103:3000/api/register/", {
    method: "POST",
    body: formdata,
    // headers: {
    //   "Content-Type": "application/form-data",
    // },
    mode: "cors",
    credentials: "same-origin",
  });
  const resJ = await response.json();
  console.log("hi " + response.status);
  if (response.status != 200) {
    // Get the modal
    document.getElementById("para").innerHTML = resJ.error;
    var modal = document.getElementById("myModal");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function () {
      modal.style.display = "none";
    };
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }
  console.log(response.status);

  const token = resJ.token;
  if (token) {
    localStorage.setItem("jwt", token);
    location.href = "../Homepage/index.html";
  }
};
