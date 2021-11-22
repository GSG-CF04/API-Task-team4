const container = document.querySelector(".container");
const searchInput = document.querySelector(".search");
const searchIcon = document.querySelector(".searchIcon");

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
    });
}

searchIcon.addEventListener("click", (e) => {
  e.preventDefault();
  container.innerHTML = "";
  searchForAdvice(searchInput.value);
  searchInput.value = "";
});
