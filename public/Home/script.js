/********************  ending the preloading *******************************/
var preloader = document.getElementById("loading");

function endPreloader() {
  setTimeout(() => {
    preloader.style.display = "none";
  }, 2500);
}
document.querySelector("body").onload = endPreloader();

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-list");
hamburger.addEventListener("click", mobileMenu);

const navLink = document.querySelectorAll(".nav-link");
navLink.forEach((n) => n.addEventListener("click", closeMenu));

window.changeBookmarkIcon = async (x) => {
  const id = x.parentNode.parentNode.parentNode.parentNode.id;
  if (x.classList.value.includes("fa-solid")) {
    await removebookmark(id);
  } else {
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
function bookmarksign(K) {
  if (K) {
    return `<i onclick="changeBookmarkIcon(this)" class="fa-regular fa-bookmark fa-solid"></i>`;
  } else {
    return `<i onclick="changeBookmarkIcon(this)" class="fa-regular fa-bookmark"></i>`;
  }
}
async function removebookmark(bid) {
  const body = { uid: userId, bid: bid };
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

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

function changeBookmarkIcon(x) {
  x.classList.toggle("fa-solid");
}

function handlecats(cats) {
  let t = ``;
  cats.forEach((i) => {
    t += `<li><a href="../Category/?id=${i.id}">${i.Title}</a></li>`;
  });
  return t;
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

let i = 0;

const categoryz = (
  c
) => `<a href='../Category/?id=${c.id}'><div class="cat first">
<div class="cat-img">
  <img src="${c.imageurl}" alt="">
</div>
<div class="cat-name">
  <span>${c.Title}</span>
</div>
</div></a>`;

const blogCard = (img, title, content, user, id, tags, K) =>
  `<a href='../Blog/?id=${id}' style="text-decoration:none;"><div class="blog-details" id=${id} >
            <div class="child" >
            <img src = ${img} alt="" />
            </div>
            <div class="tag-wrap">
            <ul class="tags">
            ${handlecats(tags)}
            <div class="bookmark">
            ${bookmarksign(K)}</div>
            </ul>
            </div>
            <a href="../User/?id=${user.id}" style="height: 0;">
                <img class="author" src=${user.imageurl} alt="author-image">
            </a>
            <div class="desc descblack">${title}</div>
            <div class="desc2 ${i++} desc2black">
            ${content}
            </div>
            </div></a>`;
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
let categoryg;
const categoriesfunc = async () => {
  const categories = await fetch(
    "http://65.0.100.50/api/category/getallcategories",
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
  const blogs = await fetch("http://65.0.100.50/api/blog/getAllBlogs", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    mode: "cors",
    withCredentials: true,
  });
  await categoriesfunc();

  blogsj = await blogs.json();
  const followingblogs = await fetch(
    "http://65.0.100.50/api/user/getFollowingblogs?" +
      new URLSearchParams({ id: userId }),
    {
      method: "GET",
      headers: {},
      mode: "cors",
      credentials: "same-origin",
    }
  );

  const followingblogsj = (await followingblogs.json()).followingblogs;
  const bmarkedblogs = await getbmarkedblogs(userId);
  const bmarkedblogsk = bmarkedblogs.map((b) => b.id);

  if (!followingblogsj.length) {
    document
      .getElementsByClassName("latest-cards row")[0]
      .insertAdjacentHTML(
        "afterbegin",
        `<h2 style="color:black;margin:5%;" >You don't follow any user yet... Follow users to see their latest blogs</h2>`
      );
  } else {
    let fblogs = followingblogsj.map(async (b) => {
      b.user = await finduser(b.userId);
      b.tags = (await getblogtags(b.id)).cats;
      b.K = false;
      if (bmarkedblogsk.includes(b.id)) b.K = true;
      return b;
    });
    Promise.all(fblogs).then(function (res) {
      res.sort((a, b) => a.createdAt - b.createdAt);
      res.forEach((b) => {
        document
          .getElementsByClassName("latest-cards row")[0]
          .insertAdjacentHTML(
            "afterbegin",
            blogCard(b.imageurl, b.title, b.content, b.user, b.id, b.tags, b.K)
          );
        const text = document.getElementsByClassName(`desc2 ${i - 1}`)[0]
          .innerText;
        document.getElementsByClassName(`desc2 ${i - 1}`)[0].innerHTML =
          text.substring(0, 50) + ".....";
      });
    });
  }

  //ALL LATEST BLOGS

  const allblogs = await blogsj.map(async (b) => {
    b.user = await finduser(b.userId);
    b.tags = (await getblogtags(b.id)).cats;
    b.K = false;
    if (bmarkedblogsk.includes(b.id)) b.K = true;
    return b;
  });
  Promise.all(allblogs).then(function (res) {
    res.sort((a, b) => a.createdAt - b.createdAt);
    res.forEach((b) => {
      document
        .getElementById("i1")
        .insertAdjacentHTML(
          "afterbegin",
          blogCard(b.imageurl, b.title, b.content, b.user, b.id, b.tags, b.K)
        );
      const text = document.getElementsByClassName(`desc2 ${i - 1}`)[0]
        .innerText;
      document.getElementsByClassName(`desc2 ${i - 1}`)[0].innerHTML =
        text.substring(0, 50) + ".....";
    });
  });
};

//SETTING PROFILE ON THE NAV_BAR
const currently_logged_in_user = await finduser(userId);

document.querySelector(
  ".nav-item-profile"
).innerHTML = `<a class="nav-link nav-link-profile" href="../User/?id=${currently_logged_in_user.id}"><img class="my-img" src="${currently_logged_in_user.imageurl}" alt="profile-img"></a>`;
