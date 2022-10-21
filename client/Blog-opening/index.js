/********************  ending the preloading *******************************/
var preloader = document.querySelector("#loading");
function endPreloader() {
  setTimeout(() => {
    preloader.style.display = "none";
    //("preloader ending");
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
const decodedtoken = parseJwt(token);
const currentlyloggedinuser = decodedtoken.id;
let blog_id;
window.deletecomment1 = async(e)=>{
  //('object')
  await fetch(`http://65.0.100.50/api/comment/deletecomment?id=${e.id}`,{method:"DELETE"});
  location.reload();
}
window.changeBookmarkIcon = async (x) => {
  const id = x.parentNode.parentNode.parentNode.id;
  if (x.classList.value.includes("fa-solid")) {
    //("unbookmarked");
    await removebookmark(id);
  } else {
    //("bookmarked");
    //(id);
    await addbookmark(id);
  }
  x.classList.toggle("fa-solid");
};

function deletecomment(cid,uid)
{
  if(uid===currentlyloggedinuser)
  return `<i class="fa-solid fa-trash" id=${cid} onclick="deletecomment1(this)" ></i>`;
  else
  return ``; 
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
  //(body);
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
  //(body);
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
  //(t);
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

const comments = (cid,uid,username, img, comm) => ` <div class="comments-container">
                  <div><img src="${img}" alt=""></div>
                  <div>
                    <strong>${username}</strong>
                    <p>${comm}</p>
                    </div>
                    ${deletecomment(cid,uid)}
                </div>
                <div class="comment-partition"></div>`;

const publisher = (img, username, date) => `  <div class="author-img">
<img src="${img}" alt="">
</div>
<div class="author-content">
<div class="author-name">
  <span>${username}</span>
</div>
<div class="published-date">
  Published on <span>${date}</span>
</div>
</div>
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
  return blogtags;}
  
window.onload = async () => {
  const queryParamsString = window.location.search?.substring(1);
  blog_id = queryParamsString?.substring(3);
  //
  
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
  const userblogs = await getuserblogs(userinfo.id);
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
  //(blogbody);
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

/************IMPLEMENTING LIKES PART********* */
let blog_likes;
window.onload = async () => {
  const queryParamsString = window.location.search?.substring(1);
  blog_id = queryParamsString?.substring(3);
  findblog(blog_id);
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
  //(res);
  const all_likes_users = await res.json();
  //(all_likes_users.ids);
  blog_likes = all_likes_users.ids.length;
  //(blog_likes);
  let likeicon = document.querySelector(".like");
  const body = { uid: currentlyloggedinuser, bid: blog_id };
  document.querySelector(".likes_count").innerHTML = `${blog_likes} Likes`;
  let clicked = false;
  //(currentlyloggedinuser);
  if (all_likes_users.ids.includes(currentlyloggedinuser)) {
    clicked = true;
  } else {
    clicked = false;
  }
  //(clicked);
  if (!clicked) {
    clicked = true;
    likeicon.innerHTML = `<i class="fa-regular fa-heart" 
    id="heart"></i>
    <div class="likes_count">${blog_likes} Likes</div>
 </div>`;
    likeicon.addEventListener("click", async () => {
      //("clicked");
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
      //(res);
      window.location.hash = '#likes-section';
      location.reload();
    });
  } else {
    clicked = false;
    likeicon.innerHTML = `<i class="fa-solid fa-heart" 
    id="heart"></i>
    <div class="likes_count">${blog_likes} Likes</div>
 </div>`;
    likeicon.addEventListener("click", async () => {
      //("clicked");
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
      window.location.hash="#reactions-id"
      location.reload();
    });
  }

  /**************IMPLEMENTING COMMENTS PART************* */

  const comments_visibility = () => {
    var x = document.getElementById("all_comments");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  };
  document.querySelector(".comment").addEventListener("click", () => {
    comments_visibility();
  });

  //(blog_id);

  const result = await fetch(
    `http://65.0.100.50/api/comment/getComments?bid=${blog_id}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  const all_user_comments = await result.json();
  //(all_user_comments.comment);

  document.querySelector(
    ".comments_count"
  ).innerHTML = `${all_user_comments.comment.length} Comments`;

  all_user_comments.comment.map(async (b) => {
    const user_details = await fetch(
      `http://65.0.100.50/api/user/getuserinfo?id=${b.CommenterId}`,
      {
        method: "GET",
      }
    );
    const user_detail = await user_details.json();
    // //(user_detail.user);

    document
      .getElementById("all_comments")
      .insertAdjacentHTML(
        "afterbegin",
        comments(
          b.id,
          user_detail.user.id,
          user_detail.user.firstName,
          user_detail.user.imageurl,
          b.content
        )
      );
  });

  let add_content;
  const add_comm_uid = currentlyloggedinuser;
  document.getElementById("commbtn").addEventListener("click", async () => {
    add_content = await document.getElementById("textbox_id").value;
    //(add_content);
    const comm_body = { uid: add_comm_uid, com: add_content, bid: blog_id };

    const add_comment = await fetch(
      `http://65.0.100.50/api/comment/addComment`,
      {
        method: "POST",
        body: JSON.stringify(comm_body),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const new_comment = await add_comment.json();
    //(new_comment);
    location.reload();
  });

  //fetching a blog details

  const particular_blog = await fetch(
    `http://65.0.100.50/api/blog/getblogbyid?id=${blog_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "same-origin",
    }
  );
  const the_blog = await particular_blog.json();

  const publisher_id = the_blog.blog.userId;
  const blog_user_details = await fetch(
    `http://65.0.100.50/api/user/getuserinfo?id=${publisher_id}`,
    {
      method: "GET",
    }
  );
  const blog_user_detail = await blog_user_details.json();
  const createdAtDate = new Date(the_blog.blog.createdAt);
  document
    .querySelector(".post-author")
    .insertAdjacentHTML(
      "afterbegin",
      publisher(
        blog_user_detail.user.imageurl,
        blog_user_detail.user.firstName,
        createdAtDate
      )
    );
};
