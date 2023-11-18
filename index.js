let chave = "9bb5de967509e1fcf1c764a0ad5d8c5f";

const cityEl = document.querySelector(".city");
const tempEl = document.querySelector(".temp");
const descriptionEl = document.querySelector(".descricao");
const iconEl = document.querySelector(".icon");
const moistureEl = document.querySelector(".moisture");
function showInformation(dados) {
  console.log(dados);
  if (dados.cod === "404") {
    document.querySelector(".city").innerHTML = "Cidade não encontrada";
    tempEl.innerHTML = "";
    descriptionEl.innerHTML = "";
    moistureEl.innerHTML = "";
  } else {
    const city = dados.name;
    const temperature = dados.main.temp;
    const description = dados.weather[0].description;
    const moisture = dados.main.humidity;
    const icon = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;

    cityEl.innerHTML = city;
    tempEl.innerHTML = `Temperatura: ${Math.floor(temperature)}°C`;
    descriptionEl.innerHTML = description;
    iconEl.src = icon;
    moistureEl.innerHTML = `Umidade: ${moisture}%`;
  }
}

async function searchCity(cidade) {
  let dados = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      cidade +
      "&appid=" +
      chave +
      "&lang=pt_br" +
      "&units=metric"
  ).then((resposta) => resposta.json());

  showInformation(dados);
}

function search() {
  let cidade = document.querySelector(".input-city").value;
  searchCity(cidade);
}

// Adicione este trecho para escutar a tecla Enter
document
  .querySelector(".input-city")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      search();
    }
  });
