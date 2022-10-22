/********************  ending the preloading *******************************/
var preloader = document.querySelector("#loading");
function endPreloader() {
  setTimeout(() => {
    preloader.style.display = "none";
    console.log("preloader ending");
  }, 1000);
}
document.querySelector("body").onload = endPreloader();

function changeBookmarkIcon(x) {
  x.classList.toggle("fa-solid");
}

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
const decodedtoken = parseJwt(token);
const userId = decodedtoken.id;

window.changeBookmarkIcon = async (x) => {
  const id = x.id;
  if (x.classList.value.includes("fa-solid")) {
    console.log("unbookmarked");
    await removebookmark(id);
  } else {
    console.log(x);
    await addbookmark(id);
  }
  x.classList.toggle("fa-solid");
};
async function getbmarkedblogs(id) {
  const blogs = await fetch(
    "http://65.0.100.50/api/user/getbookmarkedblogs?id=" + id,
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
function bookmarksign(K,id) {
  if (K) {
    return `<i onclick="changeBookmarkIcon(this)" class="fa-regular fa-bookmark fa-solid" id=${id}></i>`;
  } else {
    return `<i onclick="changeBookmarkIcon(this)" class="fa-regular fa-bookmark" id=${id}></i>`;
  }
}
function handlecats(cats) {
  let t = ``;
  cats.forEach((i) => {
    t += `<li><a href="../category/index.html?id=${i.id}" style="text-decoration:none;">${i.Title}</a></li>`;
  });
  console.log(t);
  return t;
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
  console.log(blogtags);
  return blogtags;
}
{/* <i onclick="changeBookmarkIcon(this)" class="fa-regular fa-bookmark"></i> */}
async function removebookmark(bid) {
  const body = { uid: userId, bid: bid };
  console.log(body);
  const bmark = await fetch("http://65.0.100.50/api/user/unbookmarkblog", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (bmark.status === 200) return;
  else alert("Failed to unBookmark :(");
}
async function addbookmark(bid) {
  const body = { uid: userId, bid: bid };
  console.log(body);
  const bmark = await fetch("http://65.0.100.50/api/user/bookmarkblog", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (bmark.status === 200) return;
  else alert("Failed to Bookmark :(");
}

const blogCard = (
  blog,
  user,
  tags,K
) => `<a href='../Blog-opening/blog-opening.html?id=${blog.id}' style="text-decoration:none;">
          <div class="blog-details">
            <div class="img-container">
            <img src = ${blog.imageurl} alt="" />
            </div>
            <div class="tag-wrap">
            <ul class="tags">
            ${handlecats(tags)}
            <div class="bookmark">
            ${bookmarksign(K,blog.id)}</div>
            </ul>
            </div>
            <div class="desc blog-title" style="color:white">${blog.title}</div>
            </div></a>`;
const userz = (img, fname, lname,id) =>
  `
<div class="blog-details">
<a href="../User/index.html?id=${id}" style="text-decoration:none;"><div class="img-container user-search">
                <img src="${img}" alt="" />
              </div></a>
              <div class="user-name">
                ${fname} ${lname}
              </div>
            </div>
`;
let blogsj;
const finduser = async (id) => {
  const user = await fetch(
    "http://65.0.100.50/api/user/getuserinfo?" +
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
let bmarkedblogsk;
let word = "";
const searchtheword = () => {
  const searchword = document.querySelector(".search-input").value;
  document.getElementById("search-span").innerHTML =
    "Results for " + "'" + searchword + "'";
  console.log(searchword);
  word = searchword;
  searchBlogs();
  searchUsers();  
};
const searchBlogs = async () => {
  document.getElementById("search").innerHTML = "";
  const res = await fetch(`http://65.0.100.50/api/blog/getAllBlogs`, {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
  });

  const blogs = await res.json();
  blogs.forEach(async (blog) => {
    if (blog.title.toUpperCase().includes(word.toUpperCase())) {
      console.log(blog);
      const user = finduser(blog.userId);
      const tagging = await getblogtags(blog.id);
      console.log(user , tagging);
      const tags =tagging.cats;
      console.log(
        blog.imageurl, blog.title, blog.content, user, tags
      )
      let K=false;
      if (bmarkedblogsk.includes(blog.id)) K = true;
      document
        .getElementById("search")
        .insertAdjacentHTML(
          "afterbegin",
          blogCard(blog, user, tags,K)
        );
    }
  });
};

const searchUsers = async () => {
  document.getElementById("search-user-id").innerHTML = "";
  const res = await fetch(`http://65.0.100.50/api/user/getallusers`, {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
  });
  const users = await res.json();
  const allusers = users.user;
  // if(typeof(users) === "string"){users = JSON.parse(users)}
  // users=JSON.parse(users);
  allusers.forEach((user) => {
    if (
      user.firstName.toUpperCase().includes(word.toUpperCase()) ||
      user.lastName.toUpperCase().includes(word.toUpperCase())
    ) {
      // const user =finduser(user.id);
      document
        .getElementById("search-user-id")
        .insertAdjacentHTML(
          "afterbegin",
          userz(user.imageurl, user.firstName, user.lastName,user.id)
        );
    }
  });
};


window.onload =async()=>{
  const bmarkedblogs = await getbmarkedblogs(userId);
   bmarkedblogsk = bmarkedblogs.map((b) => b.id);
  document.querySelector(".search-input").addEventListener("keyup", async (e) => {
    if (e.keyCode === 13) {
      searchtheword();
    }
  });
}
  