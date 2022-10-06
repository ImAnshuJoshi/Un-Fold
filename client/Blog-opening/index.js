$(window).scroll(function () {
     var s = $(window).scrollTop(),
           d = $(document).height(),
           c = $(window).height();
           scrollPercent = (s / (d-c)) * 100;
           var position = scrollPercent;
   
      $(".post-progress").attr('value', position);
   
});
const but = document.querySelector(".footer-btn");
but.addEventListener("click", () =>
  fetch("http://localhost:3000/login", {
    method: "POST",
    body: JSON.stringify({
      email: 'ao@asa1rs.com',
      password: 'sa2Ah!',
    }),
    mode: "cors",
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json))
);
