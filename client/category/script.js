const desc=(cat)=>`<div class="profile-category-wrap">
<div class="img-category">
    <img src=${cat.imageurl} alt="" />
</div>
<div class="category-name">
    <h1>${cat.Title}</h1>
</div>
<div class="category-desc">
${cat.Description}
</div>
</div>`

const blogCard=(blog,user)=>
    `<div class="follow-cards column">
        <div class="blog-details">
        <div class="child child-white">
        <img src=${blog.imageurl} alt="">
        </div>
        <div class="tag-wrap">
        <ul class="tags">
        <li>Design</li>
        <li>Code</li>
        <li>Techlogy</li>
        </ul>
        </div>
        <a href="../User/index.html?id=${user.id}" style="height: 0;">
        <img class="author" src=${user.imageurl} alt="author-image">
        </a>
        <div class="desc desc-white">
        ${blog.title}
        </div>
        <div class="desc2 desc2-white">
        ${blog.content}
        </div>
        </div>
    </div>`;

window.onload = async () => {
    const queryParamsString = window.location.search?.substring(1);
    const id = queryParamsString?.substring(3);
    const cat = await fetch(
      "http://localhost:3000/api/category/getcategoryinfo?" +
        new URLSearchParams({ id: id }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "same-origin",
      }
    );
    const catblogs = await fetch(
      "http://localhost:3000/api/category/getallcategoryblogs?"+
      new URLSearchParams({ id: id }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "same-origin",
      }
    );
    const catj=await cat.json();
    const catblogsj = (await catblogs.json()).blogs;
     catblogsj.map(async (b) => {
        const user=await fetch(
            "http://localhost:3000/api/user/getuserinfo?" +
              new URLSearchParams({ id: b.userId }),
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              mode: "cors",
              credentials: "same-origin",
            }
          );
        const userj=await user.json();  
       document.getElementsByClassName('row')[0]
         .insertAdjacentHTML(
           "afterbegin",
           blogCard(b,userj.user)
         );
     });
    document.getElementById('img-category').insertAdjacentHTML("afterbegin",desc(catj)); 
    document.getElementById('span123').insertAdjacentHTML("afterbegin",catj.Title); 
   
  };