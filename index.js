let isClicked = false

function greetingsHomePage(greeting) {
    const cultureText = document.querySelector(".lang-one");
    const cultureEng = document.querySelector(".lang-two");

    cultureText.style.opacity = "0";
    cultureEng.style.opacity = "0";

    setTimeout(() => {
        cultureText.textContent = greeting.text;

        cultureEng.textContent = greeting.translation
            ? "~(" + greeting.translation + ")~"
            : "";

        cultureText.style.opacity = "1";
        cultureEng.style.opacity = "1";
    }, 400);
}


function scrollToPage(className) {
    return new Promise((resolve) => {
        const page = document.querySelector("." + className);

        if (!page) {
            resolve();
            return;
        }

        page.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        window.addEventListener("scrollend", resolve, { once: true });
    });
}

function setActiveNav(element) {
    const currentActive = document.querySelector(".nav-active");

    if (currentActive) {
        currentActive.classList.remove("nav-active");
    }

    element.classList.add("nav-active");
}

document.querySelector(".nav-home").addEventListener("click", async (event) => {
    event.preventDefault();
    isClicked = true
    setActiveNav(event.currentTarget);
    await scrollToPage("greetings-container");                
    isClicked = false

   
});

document.querySelector(".nav-about").addEventListener("click", async (event) => {
    event.preventDefault();
    isClicked = true
    setActiveNav(event.currentTarget)
    await scrollToPage("first-page");                
    isClicked = false

   
});

document.querySelector(".nav-timeline").addEventListener("click", async (event) => {
    event.preventDefault();
    isClicked = true
    setActiveNav(event.currentTarget)
    await scrollToPage("second-page");                
    isClicked = false

});

document.querySelector(".nav-project").addEventListener("click", async (event) => {
    event.preventDefault();
    isClicked = true
    setActiveNav(event.currentTarget)
    await scrollToPage("third-page");                
    isClicked = false

   
});

document.querySelector(".nav-contact").addEventListener("click", async (event) => {
    event.preventDefault();
    isClicked = true 
    setActiveNav(event.currentTarget)
    await scrollToPage("fourth-page");               
    isClicked = false

    
});

const greetings = [
    {
        text: "Hej!!"
    },
    {
        text: "Bonjour!"
    },
    {
        text: "ٱلسَّلَامُ عَلَيْكُمْ",
        translation: "As-salāmu ʿalaykum"
    },
    {
        text: "স্বাগতম",
        translation: "Shagotom"
    },
    {
        text: "χαιρετώ",
        translation: "kha-ye-TO"
    },
    {
        text: "வணக்கம்",
        translation: "Vaṇakkam"
    },
    {
        text: "Chào bạn!"
    },
    {
        text: "Привет",
        translation: "Privyet"
    },
    {
        text: "こんにちは",
        translation: "Konnichiwa"
    },
    {
        text: "സ്വാഗതം",
        translation: "Swagatham"
    },
    {
        text: "आदाब",
        translation: "Aadaab"
    },
    {
        text: "你好",
        translation: "Nǐ hǎo"
    },
    {
        text: "Willkommen!"
    },
    {
        text: "Hello!!"
    }
];


let i = 0;


setInterval(() => {

    greetingsHomePage(greetings[i]);

    i++;

    if (i >= greetings.length) {
        i = 0;
    }

}, 2000);

const pages = document.querySelectorAll(".page");

const navMap = {
  "page-one": ".nav-home",
  "page-two": ".nav-about",
  "page-three": ".nav-timeline",
  "page-four": ".nav-project",
  "page-five": ".nav-contact"
};

const observer = new IntersectionObserver((entries) => {


  
  if (isClicked === true) return;



  entries.forEach((entry) => {
    if (entry.isIntersecting) {

      document.querySelectorAll(".nav a").forEach((link) => {
        link.classList.remove("nav-active");
      });

      const navLink = document.querySelector(
        navMap[entry.target.id]
      );

      if (navLink) {
        navLink.classList.add("nav-active");
      }
    }
  });
}, {
  threshold: 0.4
});

pages.forEach((page) => observer.observe(page));


const sendButton = document.querySelector(".send-button");

sendButton.addEventListener("click", handleSubmit);

async function handleSubmit(event) {

    event.preventDefault();

    const form = document.querySelector(".contact-form-fields");


    if (!form.checkValidity()) {
        
        form.reportValidity();
        return;
    }

    const name = form.querySelector('input[name="name"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const message = form.querySelector('textarea[name="message"]').value;



    const formFields = new FormData();

    formFields.append("entry.650640414", name);
    formFields.append("entry.263452189", email);
    formFields.append("entry.1132895996", message);

    let response;

      try {
        await fetch(
            "https://docs.google.com/forms/d/e/1FAIpQLSdHjyUB31ddAqSS_TK12YL2dsrj0GZrUbpu3HNzOqs017zsJg/formResponse",
            {
                method: "POST",
                body: formFields,
                mode: "no-cors"
            }
        );
    } catch (error) {
        console.error(error);
    }

    form.reset();
    alert("Message sent!");
    
}