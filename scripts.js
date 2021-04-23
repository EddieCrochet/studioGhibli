fetch('https://ghibliapi.herokuapp.com/films')
.then((response) => {
    return response.json()
})
.then((data) => {
    //work with data here
    console.log(data)
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

        // Append the cards to the container element
        container.appendChild(card);

        // Each child will contain an h1 and a p
        card.appendChild(h1);
        card.appendChild(p);
    })
})
.catch((err) => {
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