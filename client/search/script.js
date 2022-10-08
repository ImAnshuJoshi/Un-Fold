function changeBookmarkIcon(x){
  x.classList.toggle("fa-solid");
}

const blogz = (
  img,
  title,
  content,
  user
) => `<a href='index.html' style="text-decoration:none;"><div class="blog-details">
            <div class="img-container">
            <img src = ${img} alt="" />
            </div>
            <div class="tag-wrap">
            <ul class="tags" style="color:white">
                <li>Design</li>
                <li>Coding</li>
                <li>Fun</li>
                <i onclick="changeBookmarkIcon(this)" class="fa-regular fa-bookmark"></i>
            </ul>
            </div>
            <div class="desc blog-title" style="color:white">${title}</div>
            </div></a>`
;

const userz = (img,fname,lname)=>
`
<div class="blog-details">
              <div class="img-container user-search">
                <img src="${img}" alt="" />
              </div>
              <div class="user-name">
                ${fname} ${lname}
              </div>
            </div>
`
;

let blogsj;
const finduser = async (id) => {
  const user = await fetch(
    "http://localhost:3000/api/user/getuserinfo?" +
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
   
let word="";
const searchtheword=()=>{

  const searchword= document.querySelector('.search-input').value;
  document.getElementById('search-span').innerHTML="Results for "+searchword; 
  console.log(searchword);
  word=searchword;
  searchBlogs();
  searchUsers();
}
const searchBlogs= async ()=>{
  document.getElementById("search").innerHTML="";
  const res=await fetch(`http://localhost:3000/api/blog/getAllBlogs`,  {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
  }
);

const blogs = await res.json(); 
  console.log(blogs);
  blogs.forEach(blog => {
      // if(blog.title)
      console.log(blog.title);
      if(blog.title.toUpperCase().includes(word.toUpperCase())){
        const user =finduser(blog.userId);
        document
      .getElementById("search")
      .insertAdjacentHTML(
        "afterbegin",
        blogz(blog.imageurl, blog.title, blog.content, user)
      );
      }
  });
}

const searchUsers= async ()=>{
  const res=await fetch(`http://localhost:3000/api/user/getallusers`,  {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
  }
);
  const users = await res.json(); 
  console.log(users.user); 
  const allusers=users.user
  // if(typeof(users) === "string"){users = JSON.parse(users)}
  // users=JSON.parse(users);
  allusers.forEach((user) => {
      console.log('hi '+user.email);
      if(user.firstName.toUpperCase().includes(word.toUpperCase()) || user.lastName.toUpperCase().includes(word.toUpperCase())){
        // const user =finduser(user.id);
        document
      .getElementById("search-user-id")
      .insertAdjacentHTML(
        "afterbegin",
        userz(user.imageurl,user.firstName,user.lastName)
      );
      }
  });
}
