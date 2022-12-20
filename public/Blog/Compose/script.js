/********************  ending the preloading *******************************/
var preloader = document.querySelector('#loading')
function endPreloader() {
  setTimeout(() => {
    preloader.style.display = 'none'
    console.log('preloader ending')
  }, 1000)
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

const token = localStorage.getItem('jwt')
const decodedtoken = parseJwt(token)
const currently_logged_in = decodedtoken

let optionsButtons = document.querySelectorAll('.option-button')
let advancedOptionButton = document.querySelectorAll('.adv-option-button')
// let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById('fontSize')
let writingArea = document.getElementById('text-input')
let linkButton = document.getElementById('createLink')
let alignButtons = document.querySelectorAll('.align')
let spacingButtons = document.querySelectorAll('.spacing')
let formatButtons = document.querySelectorAll('.format')
let scriptButtons = document.querySelectorAll('.script')
//List of fontlist
let fontList = ['Arial', 'Verdana', 'Times New Roman', 'Garamond', 'Georgia', 'Courier New', 'cursive']
//Initial Settings
const initializer = () => {
  //function calls for highlighting buttons
  //No highlights for link, unlink,lists, undo,redo since they are one time operations
  highlighter(alignButtons, true)
  highlighter(spacingButtons, true)
  highlighter(formatButtons, false)
  highlighter(scriptButtons, true)

  //fontSize allows only till 7
  for (let i = 1; i <= 7; i++) {
    let option = document.createElement('option')
    option.value = i
    option.innerHTML = i
    fontSizeRef.appendChild(option)
  }
  //default size
  fontSizeRef.value = 3
}
//main logic
const modifyText = (command, defaultUi, value) => {
  //execCommand executes command on selected text
  document.execCommand(command, defaultUi, value)
}
//For basic operations which don't need value parameter
optionsButtons.forEach((button) => {
  button.addEventListener('click', () => {
    modifyText(button.id, false, null)
  })
})
//options that require value parameter (e.g colors, fonts)
advancedOptionButton.forEach((button) => {
  button.addEventListener('change', () => {
    modifyText(button.id, false, button.value)
  })
})
//link
linkButton.addEventListener('click', () => {
  let userLink = prompt('Enter a URL')
  //if link has http then pass directly else add https
  if (/http/i.test(userLink)) {
    modifyText(linkButton.id, false, userLink)
  } else {
    userLink = 'http://' + userLink
    modifyText(linkButton.id, false, userLink)
  }
})
//Highlight clicked button
const highlighter = (className, needsRemoval) => {
  className.forEach((button) => {
    button.addEventListener('click', () => {
      //needsRemoval = true means only one button should be highlight and other would be normal
      if (needsRemoval) {
        let alreadyActive = false
        //If currently clicked button is already active
        if (button.classList.contains('active')) {
          alreadyActive = true
        }
        //Remove highlight from other buttons
        highlighterRemover(className)
        if (!alreadyActive) {
          //highlight clicked button
          button.classList.add('active')
        }
      } else {
        //if other buttons can be highlighted
        button.classList.toggle('active')
      }
    })
  })
}
const highlighterRemover = (className) => {
  className.forEach((button) => {
    button.classList.remove('active')
  })
}

const button = document.querySelector('.submit-btn')
checkboxes = document.getElementsByName('cat')

function checkBoxLimit() {
  var checkBoxGroup = document.forms['tags']['vehicle[]']
  var limit = 2
  for (var i = 0; i < checkBoxGroup.length; i++) {
    checkBoxGroup[i].onclick = function () {
      var checkedcount = 0
      for (var i = 0; i < checkBoxGroup.length; i++) {
        checkedcount += checkBoxGroup[i].checked ? 1 : 0
      }
      if (checkedcount > limit) {
        console.log('You can select maximum of ' + limit + ' checkboxes.')
        alert('You can select maximum of ' + limit + ' checkboxes.')
        this.checked = false
      }
    }
  }
}

async function handleCats(selectedCboxes, blogid) {
  let cname = []
  selectedCboxes.forEach(async (selectedCbox) => {
    cname.push(selectedCbox.value)
  })
  const body = { bid: blogid, cname: cname }
  const res = await fetch('../../api/category/addcategorytoblog', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {},
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const resj = await res.json()
  console.log(resj)
}
button.addEventListener('click', async () => {
  selectedCboxes = Array.prototype.slice.call(checkboxes).filter((ch) => ch.checked == true)
  if (!selectedCboxes.length) {
    alert('Select atleast 1 category!')
    return
  } else if (selectedCboxes.length > 3) {
    alert('Select atmost 3 categories!')
    return
  }
  const title = document.getElementById('title-input').innerText
  const content = document.getElementById('text-input').innerHTML
  const item = document.getElementById('myfile').files[0]
  const formdata = new FormData()
  formdata.append('title', title)
  formdata.append('content', content)
  formdata.append('item', item)
  const addblog = await fetch('../../api/blog/addBlog?' + new URLSearchParams({ id: currently_logged_in.id }), {
    method: 'POST',
    body: formdata,
    headers: {},
    mode: 'cors',
    credentials: 'same-origin',
  })
  const addedblog = await addblog.json()
  if (addblog.status !== 200) alert(addedblog.message)
  else {
    const addedblogid = addedblog.blogid
    console.log(addedblogid)
    await handleCats(selectedCboxes, addedblogid)
    alert('Done')
    location.href = `../../Blog/?id=${addedblogid}`
  }
})

window.onload = async () => {
  const finduser = async (id) => {
    const user = await fetch('../../api/user/getuserinfo?' + new URLSearchParams({ id: id }), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      mode: 'cors',
      credentials: 'same-origin',
    })
    const userj = await user.json()
    return userj.user
  }

  //SETTING PROFILE ON THE NAV_BAR
  const currently_logged_in_user = await finduser(currently_logged_in.id)
  console.log(currently_logged_in_user)

  document.querySelector('.nav-item-profile').innerHTML = `<a class="nav-link nav-link-profile" href="../../User/?id=${currently_logged_in_user.id}"><img class="my-img" src="${currently_logged_in_user.imageurl}" alt="profile-img"></a>`
}
