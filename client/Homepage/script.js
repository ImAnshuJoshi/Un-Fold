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
    `http://192.168.68.155:3000/api/category/getblogcategories?` +
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

let i=0;

const categoryz = (c) => `<a href='../category/index.html?id=${c.id}'><div class="cat first">
<div class="cat-img">
  <img src="${c.imageurl}" alt="">
</div>
<div class="cat-name">
  <span>${c.Title}</span>
</div>
</div></a>`;

const blogCard = (img,title,content,user,id,tags) =>
 `<a href='../Blog-opening/blog-opening.html?id=${id}' style="text-decoration:none;"><div class="blog-details">
            <div class="child">
            <img src = ${img} alt="" />
            </div>
            <div class="tag-wrap">
            <ul class="tags">
            ${handlecats(tags)}
            <div class="bookmark">
            <i onclick="changeBookmarkIcon(this)" class="fa-regular fa-bookmark"></i>
            </div>
            </ul>
            </div>
            <a href="../User/index.html?id=${user.id}" style="height: 0;">
                <img class="author" src=${user.imageurl} alt="author-image">
            </a>
            <div class="desc">${title}</div>
            <div class="desc2 ${i++}">
            ${content}
            </div>
            </div></a>`;
let blogsj;
const finduser = async (id) => {
  const user = await fetch(
    "http://192.168.68.155:3000/api/user/getuserinfo?" +
      new URLSearchParams({ id: id }),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      mode: "cors",
      credentials: "same-origin",
    }
  );
  const userj = await user.json();
  return userj.user;
};
let categoryg;
const categoriesfunc = async () => {
  const categories = await fetch(
    "http://192.168.68.155:3000/api/category/getallcategories",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      mode: "cors",
      credentials: "same-origin",
    }
  );
  categoryg = await categories.json();
  categoryg.map(async (c) => {
    document
      .getElementById("category-id")
      .insertAdjacentHTML("afterbegin", categoryz(c));
  });
};
window.onload = async () => {
  const blogs = await fetch("http://192.168.68.155:3000/api/blog/getAllBlogs", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    mode: "cors",
    credentials: "same-origin",
  });
  categoriesfunc();
  blogsj = await blogs.json();
  blogsj.map(async (b) => {
    const user = await finduser(b.userId);
    const tags=(await getblogtags(b.id)).cats;
    document
      .getElementById("i1")
      .insertAdjacentHTML(
        "afterbegin",
        blogCard(b.imageurl, b.title, b.content, user,b.id,tags)
      );
      const text=document.getElementsByClassName(`desc2 ${i-1}`)[0].innerText;
    document.getElementsByClassName(`desc2 ${i-1}`)[0].innerHTML=text.substring(0,50)+ '.....';
  });
};
