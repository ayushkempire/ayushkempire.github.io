let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
   menuIcon.classList.toggle('bx-x');
   navbar.classList.toggle('active');
};

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
   sections.forEach(sec => {
      let top = window.scrollY;
      let offset = sec.offsetTop - 150;
      let height = sec.offsetHeight;
      let id = sec.getAttribute('id');

      if (top >= offset && top < offset + height) {
         navLinks.forEach(links => {
            links.classList.remove('active');
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
         });
      };
   });

   let header = document.querySelector('header');

   header.classList.toggle('sticky', window.scrollY > 100);

   menuIcon.classList.remove('bx-x');
   navbar.classList.remove('active');
};

const typed = new Typed('.multiple-text', {
   strings: ['Frontend Developer', 'Graphic Designer', 'Editor'],
   typeSpeed: 100,
   backSpeed: 100,
   backDelay: 1000,
   loop: true
});

document.getElementById('phone').addEventListener('input', function (e) {
   e.target.value = e.target.value.replace(/[^\d]/g, '');
});


const form = document.querySelector("form");
const fname=document.getElementById("name");
const femail=document.getElementById("email");
const fphone=document.getElementById("phone");
const fsubject=document.getElementById("subject");
const fmessage=document.getElementById("message");
function sendEmail()
{ 
   const b_message = `Name: ${fname.value}<br>Email: ${femail.value}<br>Phone: ${fphone.value}<br>Message: ${fmessage.value}`;

   Email.send({
      Host : "smtp.elasticemail.com",
      Username : "ak5303858@gmail.com",
      Password : "CCB72BF9DD2A3FD46AA8EE62A8354F4AE8E5",
      To : 'ak5303858@gmail.com',
      From : "ak5303858@gmail.com",
      Subject : fsubject.value,
      Body : b_message
  }).then(
    message => {
      if(message=="OK")
      {
         Swal.fire({
            title: "Success!",
            text: "Message Sent Successfully!",
            icon: "success"
          });
      }
    }
  );
}

form.addEventListener("submit",(e)=>
{
   e.preventDefault();
   sendEmail();
   document.querySelector("form").reset();
})
