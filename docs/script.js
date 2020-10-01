let container = createDiv("container");
let row = createDiv("row");
let col = createDiv("col-12");
let heading = document.createElement("h1");
heading.innerHTML = "RestCountries & Weather using fetch API";
col.append(heading);
row.append(col);

let API_KEY = "2de849ba4967069451302d2dea7b66ad";

let modal = createDiv("modal fade");
modal.id = "exampleModal";
modal.tabIndex = "-1";
modal.role = "dialog";
modal.setAttribute("aria-labelledby", "exampleModalLabel");
modal.setAttribute("aria-hidden", "true");

let modalDialog = createDiv("modal-dialog");
modalDialog.role = "document";

let modalContent = createDiv("modal-content");

let modalHeader = createDiv("modal-header");
let h5 = createH5("modal-title");
h5.id = "exampleModalLabel";
let modalBody = createDiv("modal-body");
let modalFooter = createDiv("modal-footer");
let modalButton = createModalButton();

modalFooter.append(modalButton);

let but = createButton();

modalHeader.append(h5, but);
modalContent.append(modalHeader, modalBody, modalFooter);
modalDialog.append(modalContent);
modal.append(modalDialog);

document.body.append(row, modal);

async function fetchData() {
  try {
    let data = await fetch(
      "https://raw.githubusercontent.com/rvsp/restcountries-json-data/master/res-countries.json"
    );
    let responseData = await data.json();
    console.log(responseData);
    for (let i = 0; i < responseData.length; i++) {
      var row;
      let col = createDiv("col-sm-12 col-lg-4 col-md-4");
      let card = createDiv("card");
      let header = createDiv("card-header");
      let cardBody = createDiv("card-body");
      let h6 = createH6(
        "card-subtitle mb-2 text-muted",
        "Capital: " + responseData[i].capital
      );
      let p = createPara("card-text", "Region: " + responseData[i].region);
      let countryCode = createPara(
        "card-text",
        "Country Code: " + responseData[i].alpha3Code
      );
      let flagImage = createImg(responseData[i].flag);
      let latlng = createPara(
        "card-text",
        "lat: " +
        responseData[i].latlng[0] +
        ", lng: " +
        responseData[i].latlng[1]
      );
      let a = createA(
        responseData[i].flag,
        "btn btn-primary",
        "Click for Weather",
        responseData[i].capital
      );
      header.innerHTML = responseData[i].name;
      if (i % 3 === 0) {
        row = createDiv("row");
        cardBody.append(flagImage, h6, p, latlng, countryCode, a);
        card.append(header, cardBody);
        col.append(card);
        row.append(col);
      } else {
        cardBody.append(flagImage, h6, p, latlng, countryCode, a);
        card.append(header, cardBody);
        col.append(card);
        row.append(col);
        container.append(row);
        document.body.append(container);
      }
    }
  } catch (err) {
    console.log("Could not fetch the data");
  }
}

fetchData();

container.addEventListener("click", (e) => {
  let countryName = e.target.value;
  if (!countryName) return;
  let unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    countryName +
    "&appid=" +
    API_KEY +
    "&units=" +
    unit;
  displayWeather(url);
});

async function displayWeather(url) {
  let responseData = await fetch(url);
  let data = await responseData.json();
  let areaName = data.name;
  let temperature = data.main.temp;
  let description = data.weather[0].main;
  let modalHeader = document.querySelector("#exampleModalLabel");
  modalHeader.innerHTML = areaName;
  let modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML =
    "Temperature : " +
    temperature +
    "&#176 Celsius <br/>" +
    "Description : " +
    description;
}

function createDiv(className, styles) {
  let element = document.createElement("div");
  element.className = className;
  if (styles) {
    element.styles = styles;
  }
  return element;
}

function createH5(className, text) {
  let element = document.createElement("h5");
  element.className = className;
  element.innerHTML = text;
  return element;
}

function createH6(className, text) {
  let element = document.createElement("h6");
  element.className = className;
  element.innerHTML = text;
  return element;
}

function createPara(className, text) {
  let element = document.createElement("p");
  element.className = className;
  element.innerHTML = text;
  return element;
}

function createImg(url) {
  let element = document.createElement("img");
  element.className = "card-img-top";
  element.src = url;
  element.alt = "Card Image";
  return element;
}

function createA(href, className, text, countryName) {
  let element = document.createElement("button");
  element.type = "button";
  element.setAttribute("data-toggle", "modal");
  element.setAttribute("data-target", "#exampleModal");
  element.value = countryName;
  element.className = className;
  element.innerHTML = text;
  return element;
}

function createButton() {
  let button = document.createElement("button");
  button.type = "button";
  button.class = "close";
  button.setAttribute("data-dismiss", "modal");
  button.setAttribute("aria-label", "Close");

  let span = document.createElement("span");
  span.setAttribute("aria-hidden", "true");
  span.innerHTML = "&times;";

  button.append(span);
  return button;
}

function createModalButton() {
  let modalButton = document.createElement("button");
  modalButton.setAttribute("data-dismiss", "modal");
  modalButton.type = "button";
  modalButton.className = "btn btn-secondary";
  modalButton.innerHTML = "Close";
  return modalButton;
}