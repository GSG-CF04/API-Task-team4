const container = document.querySelector(".container");
const searchInput = document.querySelector(".search");
const searchIcon = document.querySelector(".searchIcon");
const searchForm = document.querySelector(".search-form");
const genButton = document.querySelector(".random-quote");
const genInput = document.querySelector(".gen-input");
const genForm = document.querySelector(".gen-form");

//Search For An Advice
function searchForAdvice(search) {
  fetch(`https://api.adviceslip.com/advice/search/${search}`)
    .then((response) => response.json())
    .then((data) => {
      let { slips } = data;
      slips.map((element) => {
        let card = document.createElement("div");
        card.setAttribute("class", "card");
        container.appendChild(card);
        card.insertAdjacentHTML(
          "beforeend",
          `<p class="qoute">${element.advice}</p>`
        );
      });
    })
    .catch((err) => {
      container.innerHTML = "";
      let card = document.createElement("div");
      card.setAttribute("class", "card");
      container.appendChild(card);
      card.insertAdjacentHTML(
        "beforeend",
        `<p class="qoute">There is no such an advice ☹,please try something else</p>`
      );
    });
}

searchIcon.addEventListener("click", (e) => {
  e.preventDefault();
  container.innerHTML = "";
  searchForAdvice(searchInput.value);
  searchInput.value = "";
});
//Random advices generator
const generateRandomAdvice = (i) => {
  for (let count = 0; count < i; count++) {
    slipId = Math.floor(Math.random() * 200) + 1;
    fetch(`https://api.adviceslip.com/advice/${slipId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let { slip } = data;
        // container.innerHTML = "";
        let card = document.createElement("div");
        card.setAttribute("class", "card");
        container.appendChild(card);
        card.insertAdjacentHTML(
          "beforeend",
          `<p class="qoute">${slip.advice}</p>`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
// Initializing the page with 9 advices
generateRandomAdvice(9);

genForm.addEventListener("submit", (e) => {
  e.preventDefault();
  container.innerHTML = "";
  generateRandomAdvice(+genInput.value);
  genInput.value = "";
});
