function handlecats(cats) {
  let t = ``;
  cats.forEach((i) => {
    t += `<li><a href="../category/index.html?id=${i.id}">${i.Title}</a></li>`;
  });
  console.log(t);
  return t;
}
const followbtn = document.getElementsByClassName("follow-btn")[0];
followbtn.addEventListener("click", async () => {
  await fetch(
    `http://192.168.137.103:3000/api/category/getblogcategories?` +
      new URLSearchParams({ id: bid }),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "same-origin",
    }
  );
});

let user;

async function getblogtags(bid) {
  const tags = await fetch(
    `http://192.168.137.103:3000/api/category/getblogcategories?` +
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

const userprofile = (u) =>
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
let i = 0;
const blogCard = (
  img,
  title,
  content,
  tags
) => `<a href='../User/index.html' style="text-decoration:none;">
                  <div class="blog-details">
                              <div class="child">
                              <img src = ${img} alt="" />
                              </div>
                              <div class="tag-wrap">
                              <ul class="tags">
                              ${handlecats(tags)}
                              </ul>
                              </div>
                              <a href="../User/index.html?id=${
                                user.id
                              }" style="height: 0;">
                                  <img class="author" src=${
                                    user.imageurl
                                  } alt="author-image">
                              </a>
                              <div class="desc">${title}</div>
                              <div class="desc2 ${i++}">
                              ${content}
                              </div>
                              </div></a>`;
let blogsj;
window.onload = async () => {
  const queryParamsString = window.location.search?.substring(1);
  const id = queryParamsString?.substring(3);
  const userj = await fetch(
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
  const blogs = await fetch(
    "http://192.168.137.103:3000/api/blog/getAllBlogs",
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
  user = (await userj.json()).user;

  const followerslist = await followers(user);
  console.log(followerslist);

  const bblogs = await bookmarkedblogs(user);
  console.log(bblogs);

  blogsj.map(async (b) => {
    const tags = (await getblogtags(b.id)).cats;
    document
      .getElementsByClassName("latest-cards row")[0]
      .insertAdjacentHTML(
        "afterbegin",
        blogCard(b.imageurl, b.title, b.content, tags)
      );
    const text = document.getElementsByClassName(`desc2 ${i - 1}`)[0].innerText;
    document.getElementsByClassName(`desc2 ${i - 1}`)[0].innerHTML = text;
  });

  bblogs.map(async (b) => {
    const tags = (await getblogtags(b.id)).cats;
    document
      .getElementsByClassName("latest-cards row")[1]
      .insertAdjacentHTML(
        "afterbegin",
        blogCard(b.imageurl, b.title, b.content, tags)
      );
    const text = document.getElementsByClassName(`desc2 ${i - 1}`)[0].innerText;
    document.getElementsByClassName(`desc2 ${i - 1}`)[0].innerHTML =
      text.substring(0, 50) + ".....";
    console.log(i + " " + text);
  });

  document
    .getElementsByClassName("profile-user-wrap")[0]
    .insertAdjacentHTML("afterbegin", userprofile(user));
  document
    .getElementsByClassName("user-desc")[0]
    .insertAdjacentHTML("afterbegin", user.about);
};

// jhgvjhhkj