/********************  ending the preloading *******************************/
var preloader = document.getElementById("loading");

function endPreloader() {
  setTimeout(() => {
    preloader.style.display = "none";
    console.log("preloader ending");
  }, 1000);
}
document.querySelector("body").onload = endPreloader();

function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  
    return JSON.parse(jsonPayload);
  }
  
  const token = localStorage.getItem("jwt");
  const user = parseJwt(token);
  console.log(user);

  let newfname ;
    document.getElementById('register-fname').addEventListener('input',()=>{
        newfname= this.innerHTML;
    },false);
    console.log(newfname);

  window.onload =async ()=>{
    const fetchuser = await fetch(`http://65.0.100.50/api/user/getuserinfo?id=${user.id}`,{}
    )
    console.log(fetchuser.body);
    const userinfo=await fetchuser.json();
    console.log(userinfo.user);


    // let firstname = userinfo.user.firstName;
    // let lastname = userinfo.user.lastName;
    // let email = userinfo.user.email;
    // let desc= userinfo.user.about;
    // console.log(firstname , lastname, email , desc);
    
  }
