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

async function getblogtags(bid) {
  const tags = await fetch(
    `http://192.168.137.103:3000/api/category/getblogcategories?` +
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

const categoryz = (img, name) => `   <div class="cat first">
<div class="cat-img">
  <img src="${img}" alt="">
</div>
<div class="cat-name">
  <span>${name}</span>
</div>
</div>`;

const blogz = (img,title,content,user,id,tags) =>
 `<a href='../Blog-opening/blog-opening.html?id=${id}' style="text-decoration:none;"><div class="blog-details">
            <div class="child">
            <img src = ${img} alt="" />
            </div>
            <div class="tag-wrap">
            <ul class="tags">
            <a href="../category/index.html?id=${tags[0]?.id}"><li>${tags[0]?.Title||'-'}</li></a>
            <li>${tags[1]?.Title||'-'}</li>
            <li>${tags[2]?.Title||'-'}</li>
            </ul>
            </div>
            <a href="../User/index.html?id=${user.id}" style="height: 0;">
                <img class="author" src=${user.imageurl} alt="author-image">
            </a>
            <div class="desc">${title}</div>
            <div class="desc2">
            ${content.substring(0, 100)}....
            </div>
            </div></a>`;
let blogsj;
const finduser = async (id) => {
  const user = await fetch(
    "http://192.168.70.24:3000/api/user/getuserinfo?" +
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
    "http://192.168.70.24:3000/api/category/getallcategories",
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
  console.log(categoryg);
  categoryg.map(async (c) => {
    document
      .getElementById("category-id")
      .insertAdjacentHTML("afterbegin", categoryz( c.imageurl,c.Title));
  });
};
window.onload = async () => {
  const blogs = await fetch("http://192.168.70.24:3000/api/blog/getAllBlogs", {
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
        blogz(b.imageurl, b.title, b.content, user,b.id,tags)
      );
  });
};
