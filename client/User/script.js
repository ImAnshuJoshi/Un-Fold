/* window.onload=
    async() => {
    const blogs=await fetch("http://192.168.2.100:3000/api/blog/getAllBlogs", {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        mode: "cors",
        credentials: "same-origin",
    })
        blogsj=await blogs.json();
        blogsj.map((b)=>{
            document.getElementById('i1').insertAdjacentHTML('afterbegin',blogz(b.imageurl,b.title,b.content));
        })
    }; */
    let user;
const userprofile =(u) => 
                `<div class="profile-user-img">
                <img src=${u.imageurl} alt="" />
                </div>
                <div class="profile-user-name">
                <h1>${u.firstName} ${u.lastName}</h1>
                </div>
                <div class="user-followers">
                  <div class="followers stats">
                    <div class="count">150 </div><div>Followers</div>
               </div>
                  <div class="followings stats">
                    <div class="count">100 </div><div>Following</div>
                  </div>
                  <div class="blogs stats">
                    <div class="count">100 </div><div>Blogs</div>
                  </div>
                </div>`;
                const blogz = (
                    img,
                    title,
                    content
                  ) => `<a href='../User/index.html' style="text-decoration:none;">
                  <div class="blog-details">
                              <div class="child">
                              <img src = ${img} alt="" />
                              </div>
                              <div class="tag-wrap">
                              <ul class="tags">
                                  <li>Design</li>
                                  <li>Coding</li>
                                  <li>Fun</li>
                              </ul>
                              </div>
                              <a href="../User/index.html?id=${user.id}" style="height: 0;">
                                  <img class="author" src=${user.imageurl} alt="author-image">
                              </a>
                              <div class="desc">${title}</div>
                              <div class="desc2">
                              ${content}
                              </div>
                              </div></a>`;
                  let blogsj;
window.onload = async () => {
  const queryParamsString = window.location.search?.substring(1);
  const id = queryParamsString?.substring(3);
  const userj = await fetch(
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
  const blogs = await fetch(
    "http://localhost:3000/api/blog/getAllBlogs",
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
  user = await userj.json();
  user=user.user;
  blogsj.map(async (b) => {
    document
      .getElementsByClassName('latest-cards row')[0]
      .insertAdjacentHTML(
        "afterbegin",
        blogz(b.imageurl, b.title, b.content)
      );
  });
  document.getElementsByClassName('profile-user-wrap')[0].insertAdjacentHTML("afterbegin",userprofile(user)); 
  document.getElementsByClassName('user-desc')[0].insertAdjacentHTML("afterbegin",user.about); 
 
};
