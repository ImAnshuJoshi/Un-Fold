/********************  ending the preloading *******************************/
var preloader = document.getElementById('loading');

function endPreloader(){
  setTimeout(() => {
    preloader.style.display = "none";
    console.log("preloader ending");
  }, 1000);
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





document.querySelector("body").onload = endPreloader();

// import get from "../currentuser.js";

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

const token=localStorage.getItem('jwt');
const decodedtoken=parseJwt(token);
const logged_in_user = decodedtoken.id;

function handlecats(cats) {
  let t = ``;
  console.log(cats)
  cats.forEach((i) => {
    t += `<li><a href="../category/index.html?id=${i.id}">${i.Title}</a></li>`;
  });
  console.log(t)
  return t;
}

window.changeBookmarkIcon = async (x) => {
  const id = x.parentNode.parentNode.parentNode.parentNode.id;
  console.log(x.parentNode.parentNode.parentNode.parentNode);
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
  if (bmark.status === 200) {location.reload()}
  else {alert("Failed to unBookmark :(");console.log(await bmark.json())}
}
async function addbookmark(bid) {
  const body = { uid: logged_in_user, bid: bid };
  console.log(body);
  const bmark = await fetch("http://65.0.100.50/api/user/bookmarkblog", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (bmark.status === 200){return}
  else alert("Failed to Bookmark :(");
}

function icons(bid,t,K){
  if(logged_in_user==userId&&!t)
  return `<div class="edit"><i onclick="deleteblog(this)" class="fa-solid fa-trash" id=${bid}></i>
  <i onclick="editblog(this)" class="fa-regular fa-pen-to-square" id=${bid}></i></div>`
  else
  return `<div class="bookmark">${bookmarksign(K)}</div>`;
}

function changeEditIcon(x) {
  x.classList.toggle("fa-solid");
}

const followbtn = document.getElementsByClassName("follow-btn")[0];
let user;
let no_of_followers;
let no_of_following;
let no_of_blogs;
window.editblog = (e) => {
  location.href = `../blogedit/texteditor.html?id=${e.id}`;
  console.log(e);
};
window.deleteblog = (e) => {
  document.getElementById("para").innerHTML = "Are you sure you want to delete this blog?";
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function () {
      modal.style.display = "none";
    };
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    document.getElementById("mb1").addEventListener('click',async()=>{
      await fetch(`http://65.0.100.50/api/blog/deleteBlog?id=${e.id}`,
      {method:'DELETE'}
      )
      modal.style.display = "none";
      location.reload();
    })
    document.getElementById("mb2").addEventListener('click',()=>{
      modal.style.display = "none";
    })
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

const userprofile = (u, followers, following, blog) =>
  `<div class="profile-user-img">
                <img src=${u.imageurl} alt="" />
                </div>
                <div class="profile-user-name">
                <h1>${u.firstName} ${u.lastName}</h1>
                </div>
                <div class="user-followers">
                  <div class="followers stats">
                  <div class="count " id="followers-insert">${followers}</div><div>Followers</div>
                  </div>
                  <div class="followings stats">
                    <div class="count">${following}</div><div>Following</div>
                  </div>
                  <div class="blogs stats">
                    <div class="count">${blog}</div><div>Blogs</div>
                  </div>
                </div>`;
let i = 0;
const blogCard = (
  id,
  img,
  title,
  content,
  tags,
  bmarks,K
) => `<a href='../Blog-opening/blog-opening.html?id=${id}' style="text-decoration:none;">
                  <div class="blog-details" id=${id}>
                              <div class="child">
                              <img src = ${img} alt="" />
                              </div>
                              <div class="tag-wrap">
                              <ul class="tags">
                              ${handlecats(tags)}
                              ${icons(id,bmarks,K)}
                              </ul>
                              </div>
                              <a href="../User/index.html?id=${
                                user.id
                              }" style="height: 0;">
                                  <img class="author" class="user-image" src=${
                                    user.imageurl
                                  } alt="author-image">
                              </a>
                              <div class="desc">${title}</div>
                              <div class="desc2 ${i++}">
                              ${content.substr(0,300)}.........
                              </div>
                              </div></a>`;

const follower_followingz = (img, fname, lname,id) => `<a href='../User/index.html?id=${id}'> <div class="cat first">
<div class="cat-img">
  <img src="${img}" alt="" style="margin:20px;">
</div>
<div class="cat-name">
  <span>${fname} ${lname}</span>
</div>
</div></a>`;

let blogsj;
async function followers(user) {
  const followers = await fetch(
    "http://65.0.100.50/api/user/getFollowers?" +
      new URLSearchParams({ id: user.id }),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "same-origin",
    }
  );
  const followerslist = await followers.json();
  return followerslist;
}

async function bookmarkedblogs(user) {
  const blogs = await fetch(
    "http://65.0.100.50/api/user/getbookmarkedblogs?" +
      new URLSearchParams({ id: user.id }),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "same-origin",
    }
  );
  const bblogs = (await blogs.json()).bblogs;
  return bblogs;
}
const queryParamsString = window.location.search?.substring(1);
let userId;
window.onload = async () => {
  userId = queryParamsString?.substring(3);
  console.log(userId)
  const userinfo = await fetch(
    "http://65.0.100.50/api/user/getuserinfo?" +
      new URLSearchParams({ id: userId}),
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
  const blogs = await fetch(
    "http://65.0.100.50/api/blog//allUserBlogs?" +
      new URLSearchParams({ id: userId}),
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
  blogsj = await blogs.json();
  user = (await userinfo.json()).user;
  no_of_blogs = blogsj.length;
  const bblogs = await bookmarkedblogs(user);
  const bmarkedblogs = await getbmarkedblogs(user.id);
  const bmarkedblogsk = bmarkedblogs.map((b) => b.id);

  blogsj.map(async (b) => {
    const tags = (await getblogtags(b.id)).cats;
    document
      .getElementsByClassName("latest-cards row 1")[0]
      .insertAdjacentHTML(
        "afterbegin",
        blogCard(b.id, b.imageurl, b.title, b.content, tags, false,false)
      );
    // const text = document.getElementsByClassName(`desc2 ${i-1}`)[0].innerText;
    // console.log(document.getElementsByClassName(`desc2 ${i-1}`)[0])
    // document.getElementsByClassName(`desc2 ${i-1}`)[0].innerHTML =text.substring(0, 100);
  });
  if(logged_in_user!==userId)
  {
    document.getElementById('recent 2').style.display = "none";
  }
  else{
  bblogs.map(async (b) => {
    const tags = (await getblogtags(b.id)).cats;
    console.log(tags)
    let K = false;
    if (bmarkedblogsk.includes(b.id)) K = true;
    document
      .getElementsByClassName("latest-cards row 2")[0]
      .insertAdjacentHTML(
        "afterbegin",
        blogCard(b.id, b.imageurl, b.title, b.content, tags,true,K)
      );
    // const text = document.getElementsByClassName(`desc2 ${i - 1}`)[0].innerText;
    // console.log(document.getElementsByClassName(`desc2 ${i - 1}`)[0])
    // document.getElementsByClassName(`desc2 ${i - 1}`)[0].innerHTML =
    //   text.substring(0, 50) + ".....";
  });
}
  document
    .getElementsByClassName("user-desc")[0]
    .insertAdjacentHTML("afterbegin", user.about);

  //Fetching user FOLLOWERS
  const fetchfollower = await fetch(
    `http://65.0.100.50/api/user/getFollowers?id=${user.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "same-origin",
    }
  );
  // console.log("User followers are as followings...");
  const followers_list = await fetchfollower.json();
  no_of_followers = followers_list.length;
  // console.log("No of followers are:", no_of_followers);
  followers_list.map(async (list) => {
    document
      .querySelector(".follower-class")
      .insertAdjacentHTML(
        "afterbegin",
        follower_followingz(list.imageurl, list.firstName, list.lastName,list.id)
      );
  });

  //Fetching user FOLLOWINGS
  const fetchfollowings = await fetch(
    `http://65.0.100.50/api/user/getFollowing?id=${user.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "same-origin",
    }
  );
  // console.log("User followings are as followings...");
  const following_list = await fetchfollowings.json();
  no_of_following = following_list.length;
  // console.log("No of followings are:", no_of_following);
  following_list.map(async (list) => {
    document
      .querySelector(".followings-class")
      .insertAdjacentHTML(
        "afterbegin",
        follower_followingz(list.imageurl, list.firstName, list.lastName,list.id)
      );
  });

  //CALLING THE USERPROFILE DETAILS ONLY AFTER FETCHIG ALL THE DETAILS
  document
    .getElementsByClassName("profile-user-wrap")[0]
    .insertAdjacentHTML(
      "afterbegin",
      userprofile(user, no_of_followers, no_of_following, no_of_blogs)
    );

  //MANAGING FOLLOW AND UNFOLLOW PART
  var follower_ids = followers_list;
  for (var i = 0; i < followers_list.length; i++) {
    follower_ids[i] = followers_list[i].id;
  }
  // console.log(follower_ids);
  // console.log(follower_ids.includes(logged_in_user.id));
  // console.log(user);
  if (user.id === logged_in_user.id) {
    document.getElementById("follow-unfollow-edit").innerHTML = `EDIT PROFILE`;
  } else {
    console.log(user, " ");
    console.log("Does user follow:" + follower_ids.includes(logged_in_user.id));
    if (follower_ids.includes(logged_in_user.id)) {
      document.getElementById("follow-unfollow-edit").innerHTML = "UNFOLLOW";
      const body = {
        id1: user.id,
        id2: logged_in_user.id,
      };
      document
        .getElementById("follow-unfollow-edit")
        .addEventListener("click", async () => {
          const res = await fetch(`http://65.0.100.50/api/user/unfollowUser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            mode: "cors",
            credentials: "same-origin",
          });
          console.log(res);
          document.getElementById("follow-unfollow-edit").innerHTML = "FOLLOW";
          const newfetchfollower = await fetch(
            `http://65.0.100.50/api/user/getFollowers?id=${user.id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              mode: "cors",
              credentials: "same-origin",
            }
          );
          console.log(newfetchfollower);
          const followers_list = await newfetchfollower.json();
          no_of_followers = followers_list.length;
          console.log("No of followers are:", no_of_followers);
          document.getElementById("followers-insert").innerHTML =
            no_of_followers;
          location.reload();
        });
    } else {
      document.getElementById("follow-unfollow-edit").innerHTML = "FOLLOW";
      const body = {
        id1: user.id,
        id2: logged_in_user.id,
      };
      document
        .getElementById("follow-unfollow-edit")
        .addEventListener("click", async () => {
          const res = await fetch(`http://65.0.100.50/api/user/followUser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            mode: "cors",
            credentials: "same-origin",
          });
          document.getElementById("follow-unfollow-edit").innerHTML =
            "UNFOLLOW";
          const newfetchfollower = await fetch(
            `http://65.0.100.50/api/user/getFollowers?id=${user.id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              mode: "cors",
              credentials: "same-origin",
            }
          );
          console.log(newfetchfollower);
          const followers_list = await newfetchfollower.json();
          no_of_followers = followers_list.length;
          console.log("No of followers are:", no_of_followers);
          document.getElementById("followers-insert").innerHTML =
            no_of_followers;
          location.reload();
        });
    }
  }
  
console.log(logged_in_user.id , user.id);
document.querySelector('#follow-unfollow-edit').addEventListener('click',()=>{
  if(logged_in_user.id==user.id){
  location.href="../edit-profile/editprofile.html"
  }
})
};