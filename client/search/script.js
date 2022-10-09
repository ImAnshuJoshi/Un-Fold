function changeBookmarkIcon(x){
  x.classList.toggle("fa-solid");
}

function handlecats(cats)
{
  let t=``;
  cats.forEach((i)=>{
    t+=`<li><a href="../category/index.html?id=${i.id}">${i.Title}</a></li>`
  })
  console.log(t);
  return (t)
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

const blogCard = (
  img,
  title,
  content,
  user,tags
) => `<a href='index.html' style="text-decoration:none;"><div class="blog-details">
            <div class="img-container">
            <img src = ${img} alt="" />
            </div>
            <div class="tag-wrap">
            <ul class="tags" style="color:white">
                ${handlecats(tags)}
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
    "http://192.168.137.103:3000/api/user/getuserinfo?" +
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
  const res=await fetch(`http://192.168.137.103:3000/api/blog/getAllBlogs`,  {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
  }
);

const blogs = await res.json(); 
  console.log(blogs);
  blogs.forEach(async(blog) => {
      
      if(blog.title.toUpperCase().includes(word.toUpperCase())){
        const user =finduser(blog.userId);
        const tags=(await getblogtags(blog.id)).cats;
        document
      .getElementById("search")
      .insertAdjacentHTML(
        "afterbegin",
        blogCard(blog.imageurl, blog.title, blog.content, user,tags)
      );
      }
  });
}

const searchUsers= async ()=>{
  const res=await fetch(`http://192.168.137.103:3000/api/user/getallusers`,  {
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
