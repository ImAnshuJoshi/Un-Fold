/********************  ending the preloading *******************************/
var preloader = document.querySelector("#loading");
function endPreloader() {
  setTimeout(() => {
    preloader.style.display = "none";
    console.log("preloader ending");
  }, 2500);
}
document.querySelector("body").onload = endPreloader();

/***********************************toggling between login and sign up********************************** */
var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");

window.register = () => {
  x.style.left = "-400px";
  y.style.left = "50px";
  z.style.left = "110px";
};
window.login = () => {
  x.style.left = "50px";
  y.style.left = "450px";
  z.style.left = "0";
};

/*****************************LOGIN SIGN UP Functionality*************************** */
const token = localStorage.getItem('jwt')
if(token){location.href='/Home'}
let email;
let password;

async function ff() {
  const response = await fetch("./api/login", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const user = await response.json();
  if (user.status !== 200) {
    document.getElementById("para").innerHTML = user.message;
    var modal = document.getElementById("myModal");
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
    location.href = "./Home";
  }
  return user;
}

const loginBtn = document.querySelector(".loginbtn");

loginBtn.addEventListener("click", async () => {
  email = document.getElementById("login-email").value;
  password = document.getElementById("login-pass").value;
  const a = await ff();
});

let fname, lname, reg_email, desc, img, pass;

const RegBtn = document.getElementsByClassName("submit-btn 1")[0];

RegBtn.addEventListener("click", async () => {
  password = "";
  fname = (document.getElementById("register-fname") || {}).value || "";
  lname = (document.getElementById("register-lname") || {}).value || "";
  reg_email = (document.getElementById("register-email") || {}).value || "";
  desc = (document.getElementById("register-desc") || {}).value || "";
  img = document.getElementById("register-img").files[0];
  pass = (document.getElementById("register-pass") || {}).value || "password";
  await ff2();
});

/******************************************************register ***********************************************/

async function ff2() {
  // formdata
  const formdata = new FormData();
  formdata.append("fname", fname);
  formdata.append("lname", lname);
  formdata.append("email", reg_email);
  formdata.append("about", desc);
  formdata.append("item", img);
  formdata.append("password", pass);
  const response = await fetch("./api/register", {
    method: "POST",
    body: formdata,
    headers: {},
  });

  const resJ = await response.json();
  if (response.status != 200) {
    document.getElementById("para").innerHTML = resJ.message;
    var modal = document.getElementById("myModal");
    var span = document.querySelector(".close");
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

  const token = resJ.token;
  if (token) {
    localStorage.setItem("jwt", token);
    location.reload();
  }
}
