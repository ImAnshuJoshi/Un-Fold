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

/************************************FETCHING BLOG****************************** */

const blogz = (img, title) => ` <section id="post-header">
<div class="post-header-content">
<div class="global-tags">
 <ul class="tags-link">
   <li><a href="#">Design</a></li>
   <li><a href="#">Idea</a></li>
   <li><a href="#">Review</a></li>
 </ul>
</div>
<div class="post-header-container">
 <div class="post-header-wrap">
   <div class="post-header-title">
     <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat, non.</h1>
   </div>
   <div class="post-header-description">
     <p class="global-exrept">${title}</p>
   </div>
 </div>
 <div class="post-header-img-container">
     <img class="image" style="background-size:cover" src="${img}" alt="">
 </div>
</div>

</div>
</section>
`;
const blogzcontent = (content) => `<div>${content}</div>`;

let blog_id;
window.onload = () => {
  const queryParamsString = window.location.search?.substring(1);
  blog_id = queryParamsString?.substring(3);
  console.log("Id is:", blog_id);
  findblog(blog_id);
};
var userId;
const findblog = async (id) => {
  const blog = await fetch(
    "http://192.168.137.103:3000/api/blog/getblogbyid?id=" +
      id,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "same-origin",
    }
  );
  const blogbody = await blog.json();
  console.log("hi this is the blog:" + JSON.stringify(blogbody));
  userId = blogbody.blog.userId;
  console.log(
    blogbody.blog.imageurl,
    blogbody.blog.title,
    blogbody.blog.content
  );
  document
    .getElementById("heading_of_blog")
    .insertAdjacentHTML(
      "afterbegin",
      blogz(blogbody.blog.imageurl, blogbody.blog.title)
    );
  document
    .getElementById("blog-content-description")
    .insertAdjacentHTML("afterbegin", blogzcontent(blogbody.blog.content));
};

/***********************************IMPLEMENTING LIKES AND COMMENTS PART************************ */
var likes = 39;
var comments = 60;

function changeHeartIcon(x) {
  x.classList.toggle("fa-solid");
  if (classList == "fa-solid") {
    likes = likes + 1;
  } else {
    likes = likes - 1;
  }
}
function viewComment() {
  var x = document.getElementById("all_comments");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

const fetchLikes = async () => {
  //FETCHING THE BLOG ID
  const queryParamsString = window.location.search?.substring(1);
  blog_id = queryParamsString?.substring(3);
  console.log("Id is:", blog_id);
  const blog_likes = await fetch(
    `http://192.168.137.103:3000/api/blog/likeBlog`,
    {
      method: "PUT",
      body: "",
    }
  );
  likes = blog_likes;
};
window.onload = function () {
  fetchLikes();
  document.getElementsByClassName("likes_count")[0].innerHTML = `${likes}`;
  document.getElementById("comments_count").innerHTML = `${comments}`;
};
