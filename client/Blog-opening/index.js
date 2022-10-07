$(window).scroll(function () {
     var s = $(window).scrollTop(),
           d = $(document).height(),
           c = $(window).height();
           scrollPercent = (s / (d-c)) * 100;
           var position = scrollPercent;
   
      $(".post-progress").attr('value', position);
   
});

/************************************FETCHING BLOG****************************** */

const blogz = (img,title) =>` <section id="post-header">
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
`
const blogzcontent=(content)=>
  // console.log('Hi this is content '+content)
  `<div>${content}</div>`
let blog_id;
window.onload=()=>{
  const queryParamsString = window.location.search?.substring(1);
  blog_id = queryParamsString?.substring(3);
  console.log('Id is:', blog_id);
  findblog(blog_id);
}
var userId;
const findblog = async (id) => {
      const blog = await fetch(
        "http://192.168.137.103:3000/api/blog/getblogbyid?id=" +
      //     new URLSearchParams({ id: id }),
      id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-for m-urlencoded',
          },  
          mode: "cors",
          credentials: "same-origin",
        }
      );
      const blogbody = await blog.json();
      console.log('hi this is the blog:'+JSON.stringify(blogbody));
      userId=blogbody.blog.userId
      console.log(blogbody.blog.imageurl, blogbody.blog.title, blogbody.blog.content);
      document
      .getElementById("heading_of_blog")
      .insertAdjacentHTML(
        "afterbegin",
        blogz(blogbody.blog.imageurl, blogbody.blog.title)
      );
      document.getElementById('blog-content-description').insertAdjacentHTML("afterbegin",blogzcontent(blogbody.blog.content)
      )
};


// console.log('userId' :  )