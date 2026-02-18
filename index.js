const form = document.querySelector('form')
const render = document.getElementById('render')

form.addEventListener('submit', async function(e){
    e.preventDefault()
    const inputElm = document.getElementById('input-elm')
                        let moviesArray = []

    const response = await fetch(`http://www.omdbapi.com/?apikey=3d68c74e&s=${inputElm.value}`)
    const data = await response.json()
       data.Search.forEach(function(searchResult){
             fetch(`http://www.omdbapi.com/?apikey=3d68c74e&i=${searchResult.imdbID}`)
                  .then(res => res.json())
                  .then(dataObj => {
                    moviesArray.push(dataObj)
                    renderMovies(moviesArray)
                  })
       })
       inputElm.value = ''
})

function renderMovies(moviesArray){
    let eachMovie = ''
    moviesArray.forEach(function(movie){
         eachMovie += `
                    <div>
                       <img src="${movie.Poster}"/>
                       <div>
                            <div>
                                <h2>${movie.Title}</h2>
                                <i></i>
                                <p>${movie.imdbRating}</p>
                            </div>
                            <div>
                                <p>${movie.Runtime}</p>
                                <p>${movie.Genre}</p>
                                <div>
                                    <i class="fa-solid fa-circle-plus"></i>
                                     <a href="watchlist.html">Watchlist</a>
                                </div>
                            </div>
                            <p>${movie.Plot}</p>
                       </div>
                    </div>
                    `
    })
    render.innerHTML = eachMovie
}