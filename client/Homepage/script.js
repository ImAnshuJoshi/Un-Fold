import get from "../currentuser.js";
let currentlyloggedinuser;
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-list");

window.changeBookmarkIcon = async (x) => {
  const id = x.parentNode.parentNode.parentNode.id;
  if (x.classList.value.includes("fa-solid")) {
    console.log("unbookmarked");
    await removebookmark(id);
  } else {
    console.log("bookmarked");
    await addbookmark(id);
  }
  x.classList.toggle("fa-solid");
};
async function getbmarkedblogs(id) {
  const blogs = await fetch(
    "http://localhost:3000/api/user/getbookmarkedblogs?id=" + id,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "same-origin",
    }
  );
  const allblogs = await blogs.json();
  return allblogs.bblogs;
}
function bookmarksign(K) {
  if (K) {
    return `<i onclick="changeBookmarkIcon(this)" class="fa-regular fa-bookmark fa-solid"></i>`;
  } else {
    return `<i onclick="changeBookmarkIcon(this)" class="fa-regular fa-bookmark"></i>`;
  }
}
async function removebookmark(bid) {
  const body = { uid: currentlyloggedinuser.id, bid: bid };
  console.log(body);
  const bmark = await fetch("http://localhost:3000/api/user/unbookmarkblog", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {},
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (bmark.status === 200) return;
  else alert("Failed to unBookmark :(");
}
async function addbookmark(bid) {
  const body = { uid: currentlyloggedinuser.id, bid: bid };
  console.log(body);
  const bmark = await fetch("http://localhost:3000/api/user/bookmarkblog", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {},
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (bmark.status === 200) return;
  else alert("Failed to Bookmark :(");
}



function changeBookmarkIcon(x) {
  if (x.classList.includes(fa - solid)) x.classList.toggle("fa-solid");
}

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

function handlecats(cats) {
  let t = ``;
  cats.forEach((i) => {
    t += `<li><a href="../category/index.html?id=${i.id}">${i.Title}</a></li>`;
  });
  return t;
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

let i = 0;
async function bookmark(bid) {
  const body = { uid: currentlyloggedinuser.id, bid: bid };
  const bmark = await fetch("http://localhost:3000/api/user/bookmarkblog", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {},
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (bmark.status === 200) return;
  else alert("Failed to Bookmark :(");
}

const categoryz = (
  c
) => `<a href='../category/index.html?id=${c.id}'><div class="cat first">
<div class="cat-img">
  <img src="${c.imageurl}" alt="">
</div>
<div class="cat-name">
  <span>${c.Title}</span>
</div>
</div></a>`;

const blogCard = (img, title, content, user, id, tags,K) =>
  `<a href='../Blog-opening/blog-opening.html?id=${id}' style="text-decoration:none;"><div class="blog-details">
            <div class="child">
            <img src = ${img} alt="" />
            </div></a>
            <div class="tag-wrap">
            <ul class="tags">
            ${handlecats(tags)}
            <div class="bookmark">
            ${bookmarksign(K)}
            </div>
            </ul>
            </div>
            <a href="../User/index.html?id=${user.id}" style="height: 0;">
                <img class="author" src=${user.imageurl} alt="author-image">
            </a>
            <a href='../Blog-opening/blog-opening.html?id=${id}' style="text-decoration:none;"><div class="blog-details">
            <div class="desc">${title}</div>
            <div class="desc2 ${i++}">
            ${content}
            </div>
            </div></a>`;
const blogCard2 = (img, title, content, user, id, tags,K) =>
  `<a href='../Blog-opening/blog-opening.html?id=${id}' style="text-decoration:none;"><div class="follow-cards column">
  <div class="blog-details">
                      <div class="child">
                      <img src = ${img} alt="" />
                      </div>
                      <div class="tag-wrap">
                      <ul class="tags">
                      ${handlecats(tags)}
                      <div class="bookmark">
                      ${bookmarksign(K)}
                      </div>
                      </ul>
                      </div>
                      <a href="../User/index.html?id=${
                        user.id
                      }" style="height: 0;">
                          <img class="author" src=${
                            user.imageurl
                          } alt="author-image">
                      </a>
                      <div class="desc">${title}</div>
                      <div class="desc2 ${i++}">
                      ${content}
                      </div>
                      </div></div></a>`;

{
  /* */
}

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
  currentlyloggedinuser = get();
  const blogs = await fetch("http://localhost:3000/api/blog/getAllBlogs", {
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
  const followingblogs = await fetch(
    "http://localhost:3000/api/user/getFollowingblogs?" +
      new URLSearchParams({ id: currentlyloggedinuser.id }),
    {
      method: "GET",
      headers: {},
      mode: "cors",
      credentials: "same-origin",
    }
  );
  const followingblogsj = (await followingblogs.json()).followingblogs;
  console.log(followingblogsj);
  const bmarkedblogs = await getbmarkedblogs(currentlyloggedinuser.id);
  const bmarkedblogsk = bmarkedblogs.map((b) => b.id);
  console.log(bmarkedblogsk);
  followingblogsj.map(async (b) => {
    const user = await finduser(b.userId);
    const tags = (await getblogtags(b.id)).cats;  
    let K = false;
    if (bmarkedblogsk.includes(b.id)) K = true;  
    document
      .getElementsByClassName("latest-cards row")[0]
      .insertAdjacentHTML(
        "afterbegin",
        blogCard2(b.imageurl, b.title, b.content, user, b.id, tags,K)
      );
    const text = document.getElementsByClassName(`desc2 ${i - 1}`)[0].innerText;
    document.getElementsByClassName(`desc2 ${i - 1}`)[0].innerHTML =
      text.substring(0, 50) + ".....";
  });
 
  blogsj.map(async (b) => {
    const user = await finduser(b.userId);
    const tags = (await getblogtags(b.id)).cats;
    let K = false;
    if (bmarkedblogsk.includes(b.id)) K = true;
    document
      .getElementById("i1")
      .insertAdjacentHTML(
        "afterbegin",
        blogCard(b.imageurl, b.title, b.content, user, b.id, tags,K)
      );
    const text = document.getElementsByClassName(`desc2 ${i - 1}`)[0].innerText;
    document.getElementsByClassName(`desc2 ${i - 1}`)[0].innerHTML =
      text.substring(0, 50) + ".....";
  });
};
