const loadQuote = async (url) => {
  let quote = document.querySelector("div.quote")
  const response = await fetch(url);
  quote.removeChild(quote.childNodes[0])
  const data = await response.json();
  if (data.content && data.author) {
    quote.innerHTML += `
        <div class="container" onclick="copyQuote(this)">
            <div class="speech">
              ${data.content}
            </div>
            <div class="author">
               ${data.author}
            </div>
         </div>
      `;
  } else {
    quote.innerHTML = `
    <h2 style="text-align:center">
      No such Author or Query Found. Sorry Try Again.
    </h2>
          `;
  }

}
const copyQuote = (element) => {
  let quoesContainer = element.children;
  let quote = quoesContainer[0].innerText;
  let author = quoesContainer[1].innerText;
  let text = `Quote : ${quote}

Speaker/Author : ${author}
  `;
  navigator.clipboard.writeText(text);
  let toast = document.getElementById("toast");
  toast.style.color = "white";
  toast.style.background = "black"
  setTimeout(() => {
    toast.style.color = "transparent";
    toast.style.background = "transparent";
  }, 500);
}
const addMoreQuotes = async () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 100) {
    for (let i = 0; i < 10; i++) {
      loadQuote(url);
    }
  }
}

const toggleMenu = () => {
  let header = document.querySelector("header");
  let nav = document.querySelector("nav");
  if (header.style.height == "30rem") {
    header.style.height = "6rem";
    nav.style.display = "none";

  } else {
    header.style.height = "30rem";
    nav.style.display = "block";
  }
}

var url = "https://api.quotable.io/random";
const menu = document.querySelector("div.menu");

window.addEventListener("load", () => {
  for (let i = 0; i < 10; i++) {
    loadQuote(url);
  }
})

searchAuthor.addEventListener("keypress", (e) => {
  if (e.key === 'Enter') {
    let author = searchAuthor.value;
    if (author) {
      url = `https://api.quotable.io/random?author=${author}`;
      let quote = document.querySelector("div.quote")
      quote.innerHTML = "";
      for (let i = 0; i < 10; i++) {
        loadQuote(url);
      }
    }
  }
})

menu.addEventListener("click", toggleMenu);
window.addEventListener("scroll", addMoreQuotes);