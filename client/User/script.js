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