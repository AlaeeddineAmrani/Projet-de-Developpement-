const urlParams = new URLSearchParams(window.location.search);
const idVoyage = urlParams.get('id');

if (idVoyage) {
    console.log("On modifie le voyage n°", idVoyage);

    document.querySelector('h1').textContent = "Modifier le voyage";
    document.querySelector('button').textContent = "Mettre à jour";

    fetch(`/voyages/${idVoyage}`)
        .then(response => response.json())
        .then(data => {

            document.getElementById('garedepart').value = data.gare_depart;
            document.getElementById('garearrivee').value = data.gare_arrivee;
            document.getElementById('duree').value = data.duree; 
            document.getElementById('prix').value = data.prix;
            document.getElementById('immatriculation').value = data.id_car; 

            if (data.date_depart) {
                const dateObj = new Date(data.date_depart);

                dateObj.setMinutes(dateObj.getMinutes() - dateObj.getTimezoneOffset());
    
                document.getElementById('datedepart').value = dateObj.toISOString().slice(0, 16);
            }
        });
}


const form = document.querySelector('form');
form.addEventListener('submit', async function(e){
    e.preventDefault();

    const nomgaredepart = document.querySelector('#garedepart').value;
    const nomgarearrivee = document.querySelector('#garearrivee').value;
    const datedepart = document.querySelector('#datedepart').value;
    const duree = document.querySelector('#duree').value;
    const immatriculation = document.querySelector('#immatriculation').value;
    const prix = document.querySelector('#prix').value;

    const newtrajet = {
        nomgaredepart,
        nomgarearrivee,
        datedepart,
        duree,
        immatriculation,
        prix
    }

    try{
        const response = await fetch('/trajet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newtrajet)
        })
        const data = await response.json();

        if (data.statut == 'Succès') {
            alert("Trajet ajouté !");
            //window.location.href = '/succes';
        } else {
            alert("Erreur : " + data.message); 
        }

    }catch(err){
        console.log(err);
        alert("Impossible de contacter le serveur");
    }
})
