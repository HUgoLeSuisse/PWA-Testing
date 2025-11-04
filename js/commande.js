const returnBTN = document.querySelector("#retour");
returnBTN.addEventListener("click", (event)=> {
  
   const onglet2 = document.querySelector("#onglet2");
   onglet2.style.display = "none";
})

/**
  Met à jour la valeur de l'affichage du range pour le nombre de places
*/
function modifierNbPlaces() {
  nbPlacesDisplay.textContent = ~~places.value;
}
places.addEventListener("change", modifierNbPlaces);
places.addEventListener("mousemove", modifierNbPlaces);
places.addEventListener("touchmove", modifierNbPlaces);

let films = getFilms();

films.then(
  (data) => {
    const select = document.querySelector("#film");
    for (const element of data) {
      select.innerHTML += 
      `<option value="${element.nom}">${element.nom}</option>`
    }
    films = data;
  }
);

let form = document.querySelector("#reservationForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let data = new FormData(event.target);

  if (data.get("film") == "") {
    alert("Veuillez choisire un film !");
    return;
  }
    let film ;
for (const element of films) {
  if (element.nom == data.get("film")) {
    film = element;
  }
}

   const onglet2 = document.querySelector("#onglet2");
   onglet2.style.display = "block";
   const img = document.querySelector("#imageFilm");
   img.src = "img/"+ film.image;
   const username = document.querySelector("#nomUtilisateur");
   nomUtilisateur.innerText = data.get("nom");
   const filmChoisi = document.querySelector("#filmChoisi");
   filmChoisi.innerHTML = data.get("film");
   const placesReservees = document.querySelector("#placesReservees");
   placesReservees.innerHTML = data.get("places");

   const prix = document.querySelector("#prix");
   prix.innerText = Number(data.get("places")) * (data.get("lunettes") == "oui" ? 20 : 15);



})

async function getFilms() {

  const resp = await fetch("https://www.roulioz.net/serveur_films.php");
  
  films = await resp.json();
  if (films == "") {
    films = downloadFromLS();
  } else {
    uploadInLS(films);
  }
  return films
}

function uploadInLS(data) {
  localStorage.setItem("film", JSON.stringify(data));
}

function downloadFromLS() {
  let data = localStorage.getItem("film");
  if (data == "") {
    localStorage.setItem("film", ` [{nom: "John Wick", image: "johnwick.jpg", description:"Film d'action avec plein de flingues"}]`);
    data = localStorage.getItem("film");
  }
  return JSON.parse(data);
}