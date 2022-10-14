import get from "../currentuser.js";
import { set } from "../currentuser.js";
set("name", "73ff605f-5c8a-4c11-ad32-93ffc002834d");
console.log(get());
let currentlyloggedinuser = get().id;
let blog_id;
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
  const bmark = await fetch("http://65.0.100.50/api/user/unbookmarkblog", {
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
  const bmark = await fetch("http://65.0.100.50/api/user/bookmarkblog", {
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
function handlecats(cats) {
  let t = ``;
  cats.forEach((i) => {
    t += `<li><a href="../category/index.html?id=${i.id}">${i.Title}</a></li>`;
  });
  console.log(t);
  return t;
}

const blogcard = (blog, tags, K) => `
<div class="blog-details" id=${blog.id}>
                    <div class="img-container">
                      <img src=${blog.imageurl} alt="" />
                    </div>
                    <div class="tag-wrap">
                      <ul class="tags">
                        ${handlecats(tags)}
                        ${bookmarksign(K)}
                      </ul>
                    </div>
                    <div class="blog-title">${blog.title}</div>
    
                  </div>`;

/*************FETCHING BLOG*********** */

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

window.onload = async () => {
  const queryParamsString = window.location.search?.substring(1);
  blog_id = queryParamsString?.substring(3);
  console.log("Id is:", blog_id);
  const userid = await findblog(blog_id);
  const user = await fetch(
    "http://65.0.100.50/api/user/getuserinfo?id=" + userid,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "same-origin",
    }
  );
  const userinfo = (await user.json()).user;
  const bmarkedblogs = await getbmarkedblogs(currentlyloggedinuser.id);
  const bmarkedblogsk = bmarkedblogs.map((b) => b.id);
  console.log(bmarkedblogsk);
  const userblogs = await getuserblogs(userinfo.id);
  userblogs.map(async (b) => {
    const t = await getblogtags(b.id);
    let K = false;
    if (bmarkedblogsk.includes(b.id)) K = true;
    console.log(t);
    document
      .getElementById("scroll-images")
      .insertAdjacentHTML("afterbegin", blogcard(b, t.cats, K));
  });
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

async function getuserblogs(id) {
  const blogs = await fetch(
    "http://65.0.100.50/api/blog/alluserBlogs?id=" + id,
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
  return allblogs;
}

const findblog = async (id) => {
  const blog = await fetch("http://65.0.100.50/api/blog/getblogbyid?id=" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    credentials: "same-origin",
  });
  const blogbody = (await blog.json()).blog;
  console.log(blogbody);
  document
    .getElementsByClassName("post-header-title")[0]
    .insertAdjacentHTML("afterbegin", `<h1>${blogbody.title}</h1>`);
  document
    .getElementsByClassName("post-header-img-container")[0]
    .insertAdjacentHTML(
      "afterbegin",
      `<img class="image" src=${blogbody.imageurl} alt=""></img>`
    );
  document
    .getElementById("blog-content-description")
    .insertAdjacentHTML("afterbegin", blogbody.content);
  return blogbody.userId;
};

/************IMPLEMENTING LIKES AND COMMENTS PART********* */
let blog_likes;
window.onload = async () => {
  const queryParamsString = window.location.search?.substring(1);
  blog_id = queryParamsString?.substring(3);
  console.log(blog_id);
  console.log("hi");
  const res = await fetch(
    `http://65.0.100.50/api/blog/getlikedusers?id=${blog_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "same-origin",
    }
  );
  const all_likes_users = await res.json();
  console.log(all_likes_users.ids);
  blog_likes = all_likes_users.ids.length;
  console.log(blog_likes);
  let likeicon = document.querySelector(".like");
  const body = { uid: currentlyloggedinuser, bid: blog_id };
  document.querySelector(".likes_count").innerHTML = `${blog_likes} Likes`;
  let clicked = false;
  console.log(currentlyloggedinuser);
  if (all_likes_users.ids.includes(currentlyloggedinuser)) {
    clicked = true;
  } else {
    clicked = false;
  }
  console.log(clicked);
  if (!clicked) {
    clicked = true;
    likeicon.innerHTML = `<i class="fa-regular fa-heart" 
    id="heart"></i>
    <div class="likes_count">${blog_likes} Likes</div>
 </div>`;
    likeicon.addEventListener("click", async () => {
      console.log("clicked");
      likeicon.innerHTML = `<i class="fa-solid fa-heart" 
        id="heart"></i>
        <div class="likes_count">${blog_likes} Likes</div>
     </div>`;
      blog_likes++;
      document.querySelector(".likes_count").innerHTML = `${blog_likes} Likes`;
      const res = await fetch(`http://65.0.100.50/api/blog/likeBlog`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      location.reload();
    });
  } else {
    clicked = false;
    likeicon.innerHTML = `<i class="fa-solid fa-heart" 
    id="heart"></i>
    <div class="likes_count">${blog_likes} Likes</div>
 </div>`;
    likeicon.addEventListener("click", async () => {
      console.log("clicked");
      likeicon.innerHTML = `<i class="fa-regular fa-heart" 
        id="heart"></i>
        <div class="likes_count">${blog_likes} Likes</div>
     </div>`;
      blog_likes--;
      document.querySelector(".likes_count").innerHTML = `${blog_likes} Likes`;
      const res = await fetch(`http://65.0.100.50/api/blog/unlikeBlog`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      location.reload();
    });
  }
};
