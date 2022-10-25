/******************* checking for token in localstorage ********************/
const token = localStorage.getItem('jwt')
if (!token) {
  location.href = '../'
}
const decodedtoken = parseJwt(token)
const userId = decodedtoken.id

/********************  ending the preloading *******************************/
var preloader = document.querySelector('#loading')
function endPreloader() {
  setTimeout(() => {
    preloader.style.display = 'none'
    console.log('preloader ending')
  }, 2500)
}
document.querySelector('body').onload = endPreloader()

const hamburger = document.querySelector('.hamburger')
const navMenu = document.querySelector('.nav-list')

hamburger.addEventListener('click', mobileMenu)

function mobileMenu() {
  hamburger.classList.toggle('active')
  navMenu.classList.toggle('active')
}
const navLink = document.querySelectorAll('.nav-link')

navLink.forEach((n) => n.addEventListener('click', closeMenu))

function closeMenu() {
  hamburger.classList.remove('active')
  navMenu.classList.remove('active')
}

function parseJwt(token) {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  return JSON.parse(jsonPayload)
}

function changeBookmarkIcon(x) {
  x.classList.toggle('fa-solid')
}

let i = 0
function handlecats(cats) {
  let t = ``
  cats.forEach((i) => {
    t += `<li><a href="../Category/?id=${i.id}">${i.Title}</a></li>`
  })
  return t
}

async function getblogtags(bid) {
  const tags = await fetch(`http://65.0.100.50/api/category/getblogcategories?` + new URLSearchParams({ id: bid }), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    credentials: 'same-origin',
  })
  const blogtags = await tags.json()
  return blogtags
}

const desc = (cat) => `<div class="profile-category-wrap">
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

const blogCard = (blog, user, tags) =>
  `<a href="../Blog/?id=${blog.id}" style="text-decoration:none;"><div class="follow-cards column">
        <div class="blog-details">
        <div class="child child-white">
        <img src=${blog.imageurl} alt="">
        </div >
        <div class="tag-wrap">
        <ul class="tags">
        ${handlecats(tags)}
        </ul>
        </div>
        <a href="../User/?id=${user.id}" style="height: 0;">
        <img class="author" src=${user.imageurl} alt="author-image">
        </a>
        <div class="desc desc-white">
        ${blog.title}
        </div>
        <div class="desc2 desc2-white ${i++}">
        ${blog.content}
        </div>
        </div>
    </div></a>`

window.onload = async () => {
  const queryParamsString = window.location.search?.substring(1)
  const id = queryParamsString?.substring(3)
  const cat = await fetch('http://65.0.100.50/api/category/getcategoryinfo?' + new URLSearchParams({ id: id }), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    credentials: 'same-origin',
  })
  const catblogs = await fetch('http://65.0.100.50/api/category/getallcategoryblogs?' + new URLSearchParams({ id: id }), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    credentials: 'same-origin',
  })
  const catj = await cat.json()
  const catblogsj = (await catblogs.json()).blogs
  let cblogs = catblogsj.map(async (b) => {
    const user = await fetch('http://65.0.100.50/api/user/getuserinfo?' + new URLSearchParams({ id: b.userId }), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'same-origin',
    })
    b.userj = await user.json()
    b.tags = (await getblogtags(b.id)).cats
    return b
  })
  Promise.all(cblogs).then(function (res) {
    res.sort((a, b) => b.likes - a.likes)
    res.forEach((b) => {
      document.getElementsByClassName('row')[0].insertAdjacentHTML('afterbegin', blogCard(b, b.userj.user, b.tags))
      const text = document.getElementsByClassName(`desc2 desc2-white ${i - 1}`)[0].innerText
      document.getElementsByClassName(`desc2 ${i - 1}`)[0].innerHTML = text.substring(0, 50) + '.....'
    })
  })

  document.getElementById('img-category').insertAdjacentHTML('afterbegin', desc(catj))
  document.getElementById('span123').insertAdjacentHTML('afterbegin', catj.Title)
}
