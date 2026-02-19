const form = document.querySelector('form')
const render = document.getElementById('render')
const explore = document.getElementById("explore")
let watchlistArray = []

document.addEventListener('click', function(e){
    if(e.target.closest(".add-watchlist")){
        if(e.target.id){
        addToWatchList(e.target.id)
        }
    }
})


function addToWatchList(movieId){
    fetch(`https://www.omdbapi.com/?apikey=3d68c74e&i=${movieId}`)
        .then(res => res.json())
        .then(data => {
            watchlistArray.push(data)
        })
    localStorage.setItem("watchlistArray", JSON.stringify(watchlistArray))
}


form.addEventListener('submit', async function(e){
    e.preventDefault()
    const inputElm = document.getElementById('input-elm')
    let moviesArray = []

    const response = await fetch(`https://www.omdbapi.com/?apikey=3d68c74e&s=${inputElm.value}`)
    const data = await response.json()
    if(data.Response === "True"){
         data.Search.forEach(function(searchResult){
            fetch(`https://www.omdbapi.com/?apikey=3d68c74e&i=${searchResult.imdbID}`)
                  .then(res => res.json())
                  .then(dataObj => {
                   moviesArray.push(dataObj)
                   renderMovies(moviesArray)
                  })   
        })
    }else{
        moviesArray = []
        renderMovies(moviesArray)
        explore.classList.remove('hidden')
        explore.innerHTML = `<p>Unable to find what you're looking for. Please try another search</p>`
    }
   inputElm.value = ''
})



function renderMovies(moviesArray){
    let eachMovie = ''
    moviesArray.forEach(function(movie){
         eachMovie += `
                    <div class="image-and-details">
                       <img src="${movie.Poster}" class="movie-poster"/>
                       <div class="movie-details">
                            <div class="title-rating">
                                <h2>${movie.Title}</h2>
                                <i class="fa-solid fa-star"></i>                                
                                <p>${movie.imdbRating}</p>
                            </div>
                            <div class="time-genre">
                                <p>${movie.Runtime}</p>
                                <p>${movie.Genre}</p>
                                <button class="add-watchlist">
                                    <i class="fa-solid fa-circle-plus" id="${movie.imdbID}"></i>
                                     <p>Watchlist</p>
                                </button>
                            </div>
                            <p class="plot">${movie.Plot}</p>
                       </div>
                    </div>
                    `
    })
    explore.classList.add('hidden')
    render.innerHTML = eachMovie
}


