const nom = localStorage.getItem('nomAdmin');
const NOM = nom.toUpperCase();
if (NOM) {
    document.getElementById('titre-bienvenue').innerText = "Bienvenue " + NOM;   
}

const btnajoutervoyages = document.querySelector('#btnajoutervoyages');
btnajoutervoyages.addEventListener('click', function(e){
    e.preventDefault();
    window.location.href = '/trajet';
})

const btnajoutercars = document.querySelector('#btnajoutercars');
btnajoutercars.addEventListener('click', function(e){
    e.preventDefault();
    window.location.href = '/car';
})

const btngerervoyages = document.querySelector('#btngerervoyages');
btngerervoyages.addEventListener('click', function(e){
    e.preventDefault();
    window.location.href = '/voyages'
})

const btngererusers = document.querySelector('#btngererusers');
btngererusers.addEventListener('click', function(e){
    e.preventDefault();
    window.location.href = '/users'
})