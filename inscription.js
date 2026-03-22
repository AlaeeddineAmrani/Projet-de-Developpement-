console.log("Le script inscription.js est bien chargé !");

const form = document.querySelector('form');
form.addEventListener('submit', async function(e){
    e.preventDefault();
    const nom = document.querySelector('#nom').value;
    const prenom = document.querySelector('#prenom').value;
    const email = document.querySelector('#email').value;
    const mot_de_passe = document.querySelector('#motdepasse').value;
    const newuser = {
        nom,
        prenom,
        email,
        mot_de_passe
    }

    try {
        const response = await fetch('/inscription', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newuser)
        });

        const data = await response.json();

        if (data.statut == 'Succès') {
            window.location.href = '/login';
        } else {
            alert("Erreur : " + data.message); 
        }

    } catch (erreur) {
        console.error(erreur);
        alert("Impossible de contacter le serveur");
    }

})