/********************  ending the preloading *******************************/
var preloader = document.querySelector('#loading');
function endPreloader(){
  setTimeout(() => {
    preloader.style.display = "none";
    console.log("preloader ending");
  }, 1000);
}
document.querySelector("body").onload = endPreloader();


const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-list");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

function changeBookmarkIcon(x){
  x.classList.toggle("fa-solid");
}

let i=0;
function handlecats(cats)
{
  let t=``;
  cats.forEach((i)=>{
    t+=`<li><a href="../category/index.html?id=${i.id}">${i.Title}</a></li>`
  })
  console.log(t);
  return (t)
}

async function getblogtags(bid) {
  const tags = await fetch(
    `http://65.0.100.50/api/category/getblogcategories?` +
      new URLSearchParams({ id: bid }),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "same-origin",
    }
  );
  const blogtags = await tags.json();
  return blogtags;
}


const desc=(cat)=>`<div class="profile-category-wrap">
<div class="img-category">
    <img src=${cat.imageurl} alt="" />
</div>
<div class="category-name">
    <h1>${cat.Title}</h1>
</div>
<div class="category-desc">
${cat.Description}
</div>
</div>`

function handlecats(cats)
{
  let t=``;
  cats.forEach((i)=>{
    t+=`<li><a href="../category/index.html?id=${i.id}">${i.Title}</a></li>`
  })
  console.log(t);
  return (t)
}

const blogCard=(blog,user,tags)=>
    `<a href="../Blog-opening/blog-opening.html?id=${blog.id}" style="text-decoration:none;"><div class="follow-cards column">
        <div class="blog-details">
        <div class="child child-white">
        <img src=${blog.imageurl} alt="">
        </div >
        <div class="tag-wrap">
        <ul class="tags">
        ${handlecats(tags)}
        </ul>
        </div>
        <a href="../User/index.html?id=${user.id}" style="height: 0;">
        <img class="author" src=${user.imageurl} alt="author-image">
        </a>
        <div class="desc desc-white">
        ${blog.title}
        </div>
        <div class="desc2 desc2-white ${i++}">
        ${blog.content}
        </div>
        </div>
    </div></a>`;

window.onload = async () => {
    const queryParamsString = window.location.search?.substring(1);
    const id = queryParamsString?.substring(3);
    const cat = await fetch(
      "http://65.0.100.50/api/category/getcategoryinfo?" +
        new URLSearchParams({ id: id }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "same-origin",
      }
    );
    const catblogs = await fetch(
      "http://65.0.100.50/api/category/getallcategoryblogs?"+
      new URLSearchParams({ id: id }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "same-origin",
      }
    );
    const catj=await cat.json();
    const catblogsj = (await catblogs.json()).blogs;
     catblogsj.map(async (b) => {
        const user=await fetch(
            "http://65.0.100.50/api/user/getuserinfo?" +
              new URLSearchParams({ id: b.userId }),
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              mode: "cors",
              credentials: "same-origin",
            }
          );
        const userj=await user.json();  
        const tags=(await getblogtags(b.id)).cats;
       document.getElementsByClassName('row')[0]
         .insertAdjacentHTML(
           "afterbegin",
           blogCard(b,userj.user,tags)
         );
         const text=document.getElementsByClassName(`desc2 desc2-white ${i-1}`)[0].innerText;
    document.getElementsByClassName(`desc2 ${i-1}`)[0].innerHTML=text.substring(0,50)+ '.....';
     });
    document.getElementById('img-category').insertAdjacentHTML("afterbegin",desc(catj)); 
    document.getElementById('span123').insertAdjacentHTML("afterbegin",catj.Title); 

    
// //SETTING PROFILE ON THE NAV_BAR
// const currently_logged_in_user =await finduser(userId);
// console.log(currently_logged_in_user);

// document.querySelector('.nav-item-profile').innerHTML=`<a class="nav-link nav-link-profile" href="../User/index.html?id=${currently_logged_in_user.id}"><img class="my-img" src="${currently_logged_in_user.imageurl}" alt="profile-img"></a>`


   
  };


