const form = document.querySelector('form')
const render = document.getElementById('render')
const explore = document.getElementById("explore")


form.addEventListener('submit', async function(e){
    e.preventDefault()
    const inputElm = document.getElementById('input-elm')
    let moviesArray = []

    const response = await fetch(`http://www.omdbapi.com/?apikey=3d68c74e&s=${inputElm.value}`)
    const data = await response.json()
    if(data.Response === "True"){
         data.Search.forEach(function(searchResult){
            fetch(`http://www.omdbapi.com/?apikey=3d68c74e&i=${searchResult.imdbID}`)
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
                                <div>
                                    <i class="fa-solid fa-circle-plus"></i>
                                     <a href="watchlist.html">Watchlist</a>
                                </div>
                            </div>
                            <p class="plot">${movie.Plot}</p>
                       </div>
                    </div>
                    `
    })
    explore.classList.add('hidden')
    render.innerHTML = eachMovie
}