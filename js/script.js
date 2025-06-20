const fetchJoke = document.getElementById("fetchJoke");
const jokeList = document.getElementById("jokeList");

const getJoke = async () => {
  try {
    const response = await fetch("https://api.chucknorris.io/jokes/random");
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Este es el error", err);
  }
};

fetchJoke.addEventListener("click", () => {
  getJoke().then((data) => {
    const joke = [...loadFromLocalStorage(), data.value];
    saveToLocalStorage(joke);
    renderJokes(joke);
  });
});

const renderJokes = (jokes) => {
  jokeList.innerHTML = "";
  jokes.forEach((joke, index) => {
    const template = `
      <li>
      <h2>${joke}</h2>
      <button onclick="deleteJoke(${index})">ELIMINAR</button>
      </li>`;
    jokeList.innerHTML += template;
  });
};

const saveToLocalStorage = (joke) => {
  localStorage.setItem("chuckNorrisJokes", JSON.stringify(joke));
};

const loadFromLocalStorage = () => {
  const savedItems = localStorage.getItem("chuckNorrisJokes");
  return savedItems ? JSON.parse(savedItems) : [];
};

renderJokes(loadFromLocalStorage());
