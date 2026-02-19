let watchlistArray = JSON.parse(localStorage.getItem("watchlistArray"))
const render = document.getElementById('render')
const explore = document.getElementById("explore")


renderWatchList()

function renderWatchList(){
    let eachMovie = ''
    if(watchlistArray.length > 0){
        watchlistArray.forEach(function(movie){
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
                                    <button class="remove-watchlist">
                                        <i class="fa-solid fa-circle-minus" id="${movie.imdbID}"></i>
                                        <p>Remove</p>
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
}


document.addEventListener('click', function(e){
   if(e.target.closest('.remove-watchlist')){
    handleRemoveClick(e.target.id)
   }

})


function handleRemoveClick(id){
  watchlistArray =  watchlistArray.filter(function(movie){
       return id !== movie.imdbID
  })
    if(watchlistArray.length > 0){
            renderWatchList()
    }else if(watchlistArray.length === 0){
        render.innerHTML = ''
            explore.classList.remove('hidden')
    }
         localStorage.setItem("watchlistArray", JSON.stringify(watchlistArray))
}

