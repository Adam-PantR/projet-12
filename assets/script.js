const slides = [
	{
		"image":"./assets/image/banner-infographiste.webp",
		"tagLine":"Impressions tous formats <span>en boutique et en ligne</span>"
	},
	{
		"image":"./assets/image/banner-webmaster.webp",
		"tagLine":"Tirages haute définition grand format <span>pour vos bureaux et events</span>"
	},
	{
		"image":"./assets/image/banner-webdesigner.webp",
		"tagLine":"Grand choix de couleurs <span>de CMJN aux pantones</span>"
	},
];


// ----------------------------------------------------------------------------------------------------------------

// GENERATION IMAGES

// ----------------------------------------------------------------------------------------------------------------


for (let i = 0 ; i < 3; i++ ){

	const imgCarrousel = slides[i];

	//On créer une image pour chacune des images présentes dans le tableau "slides"
	const imagesElement = document.createElement("img");
	imagesElement.src = imgCarrousel.image;
  imagesElement.alt = ("bannière de carousel " + [i]);
	imagesElement.className = "banner-img carrousel-image";

	//On créer une div pour y contenir l'image et le texte créé
	const divElement = document.createElement("div");
	divElement.className = "itemSlider";
	const carrousel=document.getElementsByClassName("slider");
	carrousel[0].appendChild(divElement)
	divElement.appendChild(imagesElement);
}

// ----------------------------------------------------------------------------------------------------------------

// SLIDE

// ----------------------------------------------------------------------------------------------------------------

//On défini la slide de départ comme celle à la position 0
let currentSlide = 0;

//On récupère tous les éléments de l'HTML nécessaire
const container = document.querySelector(".slider");
const items = document.querySelectorAll(".itemSlider");

//On défini la taille du carrousel et des images
const totalSlides = items.length;
const imageWidth = items[0].clientWidth;

//On donne la taille appliquée au décalage de l'axe X lors du slide
function positionCarrousel() {
	container.style.transform = `translateX(-${currentSlide * imageWidth}px)`;
  }

//On créer le bouton gauche
  const left = document.querySelector("#left");
left.addEventListener("click", () => {
	//Décalage sur la gauche
  if (currentSlide > 0) {
    currentSlide--;
  } 
  //remise à la fin du carrousel si dépassé le début
  else {
    currentSlide = totalSlides - 1;
  }
  //On change la position du DOT actif (qui sera défini par la suite)
  setActiveDot();
  positionCarrousel();
});

//On créer le bouton droit
const right = document.querySelector("#right");
right.addEventListener("click", () => {
	//Décalage sur la droite
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
  } 
  //remise au départ du carrousel si arrivé au bout
  else {
    currentSlide = 0;
  }
   //On change la position du DOT actif (qui sera défini par la suite)
  setActiveDot();
  positionCarrousel();
});


// ----------------------------------------------------------------------------------------------------------------

// DOTS

// ----------------------------------------------------------------------------------------------------------------


const dots = document.querySelectorAll('.dot');
const slider = document.querySelector('.slider');

// On repprend tous les élement possédant la class dot
dots.forEach((dot, index) => {
  // On défini dot comme l'élément qui sera actif, et qui changera de slide visile au clique 
  dot.addEventListener('click', () => {
	// On défini l'index du dot sur lequel on clique, il est le même appelé plus haut lors des lide gauche et droit
    currentSlide = index;
    setActiveDot();
    setSliderPosition();
  });
});

// On créer une fonction pour définir visuelement le dot qui est actif et se repéré sur le carrousel
function setActiveDot() {
  dots.forEach(dot => dot.classList.remove('dot_selected'));
  dots[currentSlide].classList.add('dot_selected');
}
// On défini le nombre de slide à déplacer lors d'un clique. Il sera caclculé par rapport au nombre totaux de slide, ici 4, donc 25% par slide
function setSliderPosition() {
  slider.style.transform = `translateX(-${currentSlide * 100/3}%)`;
}
setActiveDot();
setSliderPosition();



// ----------------------------------------------------------------------------------------------------------------

// FONCTION GAUCHE ET DROITE EN MARCHE 

// ----------------------------------------------------------------------------------------------------------------

//
//VERIFICATION DE LA FONCTIONNALITE DE LA FONCTION GAUCHE ET DROITE 
//

let gauche = document.getElementById('left');
let droite = document.getElementById('right');

function clickGauche(){
	console.log('gauche');	

}
function clickDroite(){
	console.log('droite');
}

let fonctionGauche = gauche.addEventListener("click", clickGauche);
let fonctionDroite = droite.addEventListener("click", clickDroite);
// -------------------------------------------------------------------------------------------------------------------------------------

// MOUVEMENT DES PROJET AU CLICK & DRAG DE LA SOURIS

// -------------------------------------------------------------------------------------------------------------------------------------

// Ajustements au click

const track = document.getElementById('projets');
const ArrowProjetLeft = document.getElementById('Arrow-Projet-Left');
const ArrowProjetRight = document.getElementById('Arrow-Projet-Right');


window.onmousedown = e => {
  track.dataset.mouseDownAt = e.clientX;
}
window.onmousemove = e => {
  if(track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth /2;

  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

  track.dataset.percentage = nextPercentage;

  // track.style.transform = `translate(${nextPercentage}%, 0%)`;
  track.animate ({
    transform:`translate(${nextPercentage}%, 0%)`},
    {duration:1200, fill:"forwards"});

  for(const imageProjets of track.getElementsByClassName("projet-image")) {
    // imageProjets.style.objectPosition = `${nextPercentage +100}% 50%`;
    imageProjets.animate({
      objectPosition:`${nextPercentage +50}% 50%`
    }, {duration:1200, fill:"forwards"});
  }
}
window.onmouseup = () => {
  track.dataset.mouseDownAt = "0"
  track.dataset.prevPercentage = track.dataset.percentage;
}


// Menu déroulant version mobile


const menuIcon = document.querySelector('.menu-icon');
const headerContent = document.getElementById('header-mobile-toggle');
const xMark = document.getElementById('x-mark');
const burgerMenu = document.getElementById('burger-menu');

xMark.addEventListener('click', function () {
  console.log(headerContent);
  headerContent.classList.toggle('active');
  if (headerContent.classList.contains('active')) {
    xMark.style.display = "flex";
    burgerMenu.style.display = "none";
  } else {
    xMark.style.display = "none";
    burgerMenu.style.display = "flex";
  }
});


burgerMenu.addEventListener('click', function () {
  console.log(headerContent);
  headerContent.classList.toggle('active');
  if (headerContent.classList.contains('active')) {
    xMark.style.display = "flex";
    burgerMenu.style.display = "none";
  } else {
    xMark.style.display = "none";
    burgerMenu.style.display = "flex";
  }
});



