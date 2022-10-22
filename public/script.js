/********************  ending the preloading *******************************/
var preloader = document.querySelector('#loading');
function endPreloader(){
  setTimeout(() => {
    preloader.style.display = "none";
    console.log("preloader ending");
  }, 1000);
}
document.querySelector("body").onload = endPreloader();



/***********************************toggling between login and sign up********************************** */
// setTimeout(
  var x = document.getElementById("login");
  var y = document.getElementById("register");
  var z = document.getElementById("btn");

  window.register=()=> {
  x.style.left = "-400px";
  y.style.left = "50px";
  z.style.left = "110px";
  }
  window.login=()=>{
  x.style.left = "50px";
  y.style.left = "450px";
  z.style.left = "0";
  }

  /*****************************LOGIN SIGN UP Functionality*************************** */

  let email;
  let password;

  async function ff(){
  const response = await fetch("http://65.0.100.50/api/login", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // mode: "cors",
    // credentials: 'include',
    // withCredentials:true
  });
  const user = await response.json();
  if (user.status !== 200) {
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
    location.href = "./Homepage/index.html";
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
  // console.log(a);
});

let fname, lname, reg_email, desc, img, pass;

const RegBtn = document.getElementsByClassName("submit-btn 1")[0];

  RegBtn.addEventListener("click", async () => {
    password = "";
  // fname = document.getElementById("register-fname").value;
  fname = (document.getElementById("register-fname") || {}).value || "";
  lname = (document.getElementById("register-lname") || {}).value || "";
  reg_email = (document.getElementById("register-email") || {}).value || "";
  desc = (document.getElementById("register-desc") || {}).value || "";
  img = document.getElementById("register-img").files[0];
  pass = (document.getElementById("register-pass") || {}).value || "password";

  console.log(img);
  await ff2();

  })

  /******************************************************register ***********************************************/


   async function ff2(){
  // formdata
  const formdata = new FormData();
  console.log(fname)
  console.log(lname)
  console.log(reg_email)
  console.log(desc)
  formdata.append("fname", fname);
  formdata.append("lname", lname);
  formdata.append("email", reg_email);
  formdata.append("about", desc);
  formdata.append("item", img);
  formdata.append("password", pass);
  const response = await fetch("http://65.0.100.50/api/register", {
    method: "POST",
    body:formdata,
    headers: {},
  });
  console.log(response.body);
  const resJ = await response.json();
  console.log("hi " + response.status);
  if (response.status != 200) {
    document.getElementById("para").innerHTML = resJ.error;
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
  console.log(response.status);

  const token = resJ.token;
  if (token) {
    localStorage.setItem("jwt", token);
    location.reload();
  }
  };
// },5000);
   