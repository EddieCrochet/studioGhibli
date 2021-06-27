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
            btnVehicles.innerHTML = "Vehicles";

            
            //applying the neccessary fetch to each
            btnLocations.addEventListener("click", function() {
                fetch(filteredMovie.locations[0])
                    .then((response) => {
                        return response.json()
                    })
                    .then((data) => {
                        moreMovieDetails(data, curID);
                    })
            });

            btnPeople.addEventListener("click", function() {
                fetch(filteredMovie.people[0])
                    .then((response) => {
                        return response.json()
                    })
                    .then((data) => {
                        moreMovieDetails(data, curID);
                    })
            });

           
            btnVehicles.addEventListener("click", function() {
                fetch(filteredMovie.vehicles[0])
                    .then((response) => {
                        return response.json()
                    })
                    .then((data) => {
                        moreMovieDetails(data, curID);
                    })
            });

            //append all information and buttons to new card
            card.append(title, originalTitle, romanisedTitle, director, producer,
                 releaseYear, rtScore, runTime, desc, btnLocations, btnPeople, btnVehicles);

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

const moreMovieDetails = (data, curID) => {
    //console.log(data[0]);
    //console.log(filteredMovie);
    const propNames = Object.getOwnPropertyNames(data[0]);

    //setting the property name for each respective set of data
    let prop1, prop2, prop3;

    if(propNames.includes('climate' && 'terrain' && 'surface_water')){
        prop1 = 'climate';
        prop2 = 'terrain';
        prop3 = 'surface_water';
    } else if (propNames.includes('age' && 'eye_color' && 'hair_color')) {
        prop1 = 'age';
        prop2 = 'eye_color';
        prop3 = 'hair_color';
    } else if (propNames.includes('vehicle_class' && 'description' && 'length')) {
        prop1 = 'vehicle_class';
        prop2 = 'description';
        prop3 = 'length';
    }

    //my attempt to not do the above with all those if statements... not working so far
    // let prop1 = propNames.filter(el => el === ('climate' || 'age' || 'vehicle_class'));
    // let prop2 = propNames.filter(el => el === ('terrain' || 'eye_color' || 'description'));
    // let prop3 = propNames.filter(el => el === ('surface_water' || 'hair_color' || 'length'));

    console.log(prop1, prop2, prop3)
    
    ul.innerHTML = "";

    container.appendChild(ul);
    ul.setAttribute('id', 'movieDeets')
    //this is what I was talking about when I say th data was messed up...
    // I have to go through all this loop-ception just to get the id string i need to compare
    for(let i = 0; i < data.length; i++){
        let cur = data[i];
    //create new dom element to hold location data
        const domEl = document.createElement('div');
        for(let j = 0; j < cur.films.length; j++){
            console.log(cur.films.length)
            
            if(cur.films[j].substring(38) == curID){
                // HERE IS LOCATIONS OF CURRENT MOVIE
                //console.log(curLoc);

                domEl.innerHTML = 
                `<b>${cur.name}</b>, ${prop1}: ${cur[prop1]}, ${prop2}: ${cur[prop2]}, ${prop3}: ${cur[prop3]}`;
                const li = document.createElement('li');
                li.appendChild(domEl);
                ul.appendChild(li);
            }
        }
    }
    if(ul.innerHTML == ""){
        //set dom string to something to display if no data here
        ul.innerHTML = "nothing to see here";
    }
}

//create ul element for future uses
const ul = document.createElement('ul');

const app = document.getElementById('root');

const container = document.getElementById('container');