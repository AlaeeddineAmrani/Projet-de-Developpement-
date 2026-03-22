console.log("Le script login.js est bien chargé !");

const form = document.querySelector("form");
form.addEventListener('submit', async function(e){
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const mot_de_passe = document.querySelector('#mot_de_passe').value;

    const user = {
        email,
        mot_de_passe
    }
    
    try{
        const response = await fetch('/login', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        const data = await response.json();

        if (data.statut == "Succèsclient") {
            localStorage.setItem('nomUser', data.nom);
            localStorage.setItem('idUser', data.id);
            window.location.href = '/user';
        } 
        else if(data.statut == "Succèsadmin"){
            localStorage.setItem('nomAdmin', data.nom);
            window.location.href = '/admin';
        }
        else {
            alert("Erreur : " + data.message); 
        }
    } catch(err) {
        console.error(err);
        alert("Impossible de contacter le serveur");
    }
})

