fetch('https://ghibliapi.herokuapp.com/films')
.then((response) => {
    return response.json()
})
.then((data) => {
    //work with data here
    data.forEach((movie) => {
        //creating a div with the card class
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        // create an h1 and set the text content to the film's title
        const h1 = document.createElement('h1');
        h1.textContent = movie.title;

        // create a p and set the text content to the film's description
        const p = document.createElement('p');
        movie.description = movie.description.substring(0, 3000);
        p.textContent = `${movie.description}...`;

        //const link = document.createElement('a');
        //link.href = "individual.html";
        card.style.textDecoration = 'none';
        card.style.color = 'black';

        // Append the cards to the container element
        container.appendChild(card);

        // Each child will contain an h1 and a p
        card.appendChild(h1);
        card.appendChild(p);
    })
    let cards = document.getElementsByClassName("card");
    for(let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function(){
            let curID = data[i].id;
            let filteredMovie = data.filter(movie => movie.id === curID);
            // clicked on movie from the API is stored in var above

            
        });
    }
})
.catch((err) => {
    console.log(err);
    //Do something with an error here
    const errorMessage = document.createElement('section');
    errorMessage.setAttribute('class', 'errorSect');
    errorMessage.textContent = 'Gahsh dahg nahbbit! Aint wrkin.';
    app.appendChild(errorMessage);
})

const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);