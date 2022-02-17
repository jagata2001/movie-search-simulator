const searchContainer = document.querySelector(".search-container");
const clear = searchContainer.querySelector("#clear");
const searchInput = searchContainer.querySelector("span input[type='text']");
const loading = document.querySelector(".loading");
const movies = document.querySelector(".movies");
const randomMovies = [];
let searchedStatus = false;
searchContainer.addEventListener("click",(e)=>{
  if(!e.currentTarget.classList.contains("active"))
          e.currentTarget.classList.add("active");
});

clear.addEventListener("click",()=>{
  searchInput.value = "";
  while (movies.firstChild)
        movies.removeChild(movies.firstChild);
        searchedStatus = false;
  showRandomMovies();
});
const showImages = ()=>{
  const movieImages = movies.querySelectorAll("img");
  setTimeout(()=>{
    for(each of movieImages){
      each.src = each.dataset.src;
      each.removeAttribute("data-src");
    }
  },100);
}
let userEndsWriting = null;
searchInput.addEventListener("keyup", (e)=>{
  e.preventDefault();
  if (!String.fromCharCode(e.keyCode).match(/(\w|\s)/g) &&
        e.keyCode != 8 && e.keyCode != 46
      ) return;
  const keyword = e.currentTarget.value;
  if(keyword.length == 0){
    if(searchedStatus)
        clearInterval(userEndsWriting);
        showRandomMovies();
        searchedStatus = false;
    return;
  }
  searchedStatus = true;
  clearInterval(userEndsWriting);
  userEndsWriting = setTimeout(async ()=>{
      if(!loading.classList.contains("active"))
              loading.classList.add("active");

      const data = await searchMovie(keyword);
      showMovies(data);
      showImages();
      if(loading.classList.contains("active"))
              loading.classList.remove("active");
  },500);

},false);
/* created by jagata */
const movieTitles = Object.keys(data);
const searchMovie = (keyword,maxMovieQuantity=8) =>{
  return new Promise((resolve, reject) => {
          setTimeout(() => {
            const matchedMovies = [];
            for(movieTitle of movieTitles){
              if(movieTitle.includes(keyword)){
                  const movieData = data[movieTitle];
                  movieData["title"] = movieTitle;
                  matchedMovies.push(movieData);
              }
              if(matchedMovies.length === maxMovieQuantity)
                  break;
            }
            resolve(matchedMovies);
          }, 800);
      });
}


const showMovies = (searchedData) =>{
  while (movies.firstChild)
        movies.removeChild(movies.firstChild);
  for(element of searchedData){
    const movie = document.createElement("div");
    movie.className = "movie";
    const img = document.createElement("img");
    img.src = "./image_loading.gif";
    img.setAttribute("data-src",element["poster"]);
    img.alt = element["title"];
    const movieData = document.createElement("div");
    movieData.className = "movie-data";
    const h2 = document.createElement("h2");
    h2.textContent = element["title"].split(" / ")[1];
    const description = document.createElement("p");
    description.className = "description";
    description.textContent = element["description"];
    const additionalInformation = document.createElement("div");
    additionalInformation.className = "additional-information";
    const releaseDate = document.createElement("p");
    releaseDate.className = "release-date";
    releaseDate.textContent = "year:";
    const releaseDateSpan = document.createElement("span");
    releaseDate.textContent = element["year"];
    releaseDate.appendChild(releaseDateSpan);
    const imdb = document.createElement("p");
    imdb.className = "imdb";
    imdb.textContent = "imdb:";
    const imdbSpan = document.createElement("span");
    imdbSpan.textContent = element["imgb_data"]["data"]["score"];
    imdb.appendChild(imdbSpan);
    additionalInformation.appendChild(releaseDate);
    additionalInformation.appendChild(imdb);
    movieData.appendChild(h2);
    movieData.appendChild(description);
    movieData.appendChild(additionalInformation);
    movie.appendChild(img);
    movie.appendChild(movieData);
    movies.append(movie);
  }
}

const loadRandomMovies = (quantity)=>{
  for(let i=0;i<quantity;i++){
    const movieTitle = movieTitles[Math.floor(Math.random()*movieTitles.length)];
    const movieData = data[movieTitle];
    movieData["title"] = movieTitle;
    randomMovies.push(movieData);
  }
}
const showRandomMovies = ()=>{
  if(!loading.classList.contains("active"))
          loading.classList.add("active");
  showMovies(randomMovies);
  showImages();
  if(loading.classList.contains("active"))
          loading.classList.remove("active");
}
loadRandomMovies(24);
window.addEventListener("load",()=>{
  showRandomMovies();
});
/* created by jagata */
