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

        //const link = document.createElement('a');
        //link.href = "individual.html";
        card.style.textDecoration = 'none';
        card.style.color = 'black';
        card.style.cursor = "pointer";

        // Append the cards to the container element
        container.appendChild(card);

        // Each child will contain an h1 and a p
        card.appendChild(h1);
    })
    let cards = document.getElementsByClassName("card");
    for(let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function(){
            //creating a div with the card class
            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            let curID = data[i].id;
            let filteredMovie = data.filter(movie => movie.id === curID)[0];
            // clicked on movie from the API is stored in var above

            container.innerHTML = "";
            // cleared the container.

            // add nodes and info for selected movie
            const title = document.createElement('h1');
            const originalTitle = document.createElement('h3');
            const romanisedTitle = document.createElement('h3');
            const director = document.createElement('h4');
            const producer = document.createElement('h4');
            const releaseYear = document.createElement('h4');
            const rtScore = document.createElement('h4');
            const runTime = document.createElement('h4');
            const desc = document.createElement('p');

            //creating buttons for extra links
            const btnLocations = document.createElement('button');
            const btnPeople = document.createElement('button');
            const btnSpecies = document.createElement('button');
            const btnVehicles = document.createElement('button');

            console.log(filteredMovie);

            //filling in detailed content about clicked on movie
            title.textContent = filteredMovie.title;
            originalTitle.textContent = filteredMovie.original_title;
            romanisedTitle.textContent = `(${filteredMovie.original_title_romanised})`;
            director.textContent = `Directed by: ${filteredMovie.director}`;
            producer.textContent = `Produced by: ${filteredMovie.producer}`;
            releaseYear.textContent = `Released: ${filteredMovie.release_date}`;
            rtScore.textContent = `Rotten Tomatoes Score: ${filteredMovie.rt_score}`;
            runTime.textContent = `Run Time: ${filteredMovie.running_time} minutes`;
            desc.textContent = filteredMovie.description;

            //filling in button labels 
            btnLocations.innerHTML = "Locations";
            btnPeople.innerHTML = "People";
            btnSpecies.innerHTML = "Species";
            btnVehicles.innerHTML = "Vehicles";
            
            //applying the neccessary fetch to each
            btnLocations.addEventListener("click", function() {
                fetch(filteredMovie.locations[0])
                    .then((response) => {
                        return response.json()
                    })
                    .then((data) => {
                        console.log("locations")
                        console.log(data);
                        console.log(filteredMovie)
                    })
            });

            btnPeople.addEventListener("click", function() {
                fetch(filteredMovie.people[0])
                    .then((response) => {
                        return response.json()
                    })
                    .then((data) => {
                        console.log("People")
                        console.log(data);
                    })
            });

            btnSpecies.addEventListener("click", function() {
                fetch(filteredMovie.species[0])
                    .then((response) => {
                        return response.json()
                    })
                    .then((data) => {
                        console.log("Species")
                        console.log(data);
                    })
            });

            btnVehicles.addEventListener("click", function() {
                fetch(filteredMovie.vehicles[0])
                    .then((response) => {
                        return response.json()
                    })
                    .then((data) => {
                        console.log("Vehicles")
                        console.log(data);
                    })
            });

            //append all information and buttons to new card
            card.append(title, originalTitle, romanisedTitle, director, producer,
                 releaseYear, rtScore, runTime, desc, btnLocations, btnPeople, btnSpecies, btnVehicles);

            container.appendChild(card);
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