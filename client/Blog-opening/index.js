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
function handlecats(cats) {
  let t = ``;
  cats.forEach((i) => {
    t += `<li><a href="../category/index.html?id=${i.id}">${i.Title}</a></li>`;
  });
  console.log(t);
  return t;
}

async function getblogtags(bid) {
  const tags = await fetch(
    `http://localhost:3000/api/category/getblogcategories?` +
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


  let blog_id;
  window.onload = async () => {
    const queryParamsString = window.location.search?.substring(1);
    blog_id = queryParamsString?.substring(3);
    console.log("Id is:", blog_id);
    const userid=await findblog(blog_id);
    const user= await fetch(
      "http://localhost:3000/api/user/getuserinfo?id="+userid,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "same-origin",
      });
      const userinfo= (await user.json()).user;
    await getuserblogs(userinfo.id);  
  };
  async function getuserblogs(id)
  {
    const blogs =await fetch(
      "http://localhost:3000/api/user/getuserinfo?id="+userid,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "same-origin",
      });
  }  


  const findblog = async (id) => {
    const blog = await fetch(
      "http://localhost:3000/api/blog/getblogbyid?id=" + id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "same-origin",
      }
    );
    const blogbody = (await blog.json()).blog;
    console.log(blogbody);
    document
      .getElementsByClassName("post-header-title")[0]
      .insertAdjacentHTML(
        "afterbegin",
        `<h1>${blogbody.title}</h1>`
      );
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





/***********************************IMPLEMENTING LIKES AND COMMENTS PART************************ */
/* var likes = 39;
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







window.onload = function () {
 document.getElementsByClassName("likes_count")[0].innerHTML = `${likes}`;
  document.getElementById("comments_count").innerHTML = `${comments}`;
};
 */