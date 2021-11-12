const loadQuote = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  let quote = document.querySelector("div.quote")
  quote.innerHTML += `
    <div class="container">
        <div class="speech">
          ${data.content}
        </div>
        <div class="author">
           ${data.author}
        </div>
     </div>
  `;
}

const addMoreQuotes = async () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight-500) {
    for (let i = 0; i < 10; i++) {
      loadQuote(url);
    }
  }
}

const toggleMenu = () => {
  let header = document.querySelector("header");
  let nav = document.querySelector("nav");
  if (header.style.height == "25rem") {
    header.style.height = "6rem";
    nav.style.display = "none";

  } else {
    header.style.height = "25rem";
    nav.style.display = "block";
  }
}

const url = "https://api.quotable.io/random";
const menu = document.querySelector("div.menu");

window.addEventListener("load", () => {
  for (let i = 0; i < 10; i++) {
    loadQuote(url);
  }
})
menu.addEventListener("click", toggleMenu);
window.addEventListener("scroll", addMoreQuotes);