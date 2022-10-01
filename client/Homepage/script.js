function leftScroll() {
    const left = document.querySelector(".scroll-images");
    left.scrollBy(-200, 0);
}
function rightScroll() {
    const right = document.querySelector(".scroll-images");
    right.scrollBy(200, 0);
}


const blogz = (img,title,content,user)=>`<a href='../User/index.html' style="text-decoration:none;"><div class="blog-details">
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
            <div class="desc">${title}</div>
            <div class="desc2">
            ${content}
            </div>
            <a>${user.fname} ${user.lname}</a>
            </div></a>`
let blogsj;            
window.onload=
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
    };
