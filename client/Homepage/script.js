function leftScroll() {
  const left = document.querySelector(".scroll-images");
  left.scrollBy(-200, 0);
}
function rightScroll() {
  const right = document.querySelector(".scroll-images");
  right.scrollBy(200, 0);
}

const blogz = (
  img,
  title,
  content,
  user
) => `<a href='index.html' style="text-decoration:none;"><div class="blog-details">
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
window.onload = async () => {
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
  blogsj.map(async (b) => {
    const user = await finduser(b.userId);
    document
      .getElementById("i1")
      .insertAdjacentHTML(
        "afterbegin",
        blogz(b.imageurl, b.title, b.content, user)
      );
  });
};
