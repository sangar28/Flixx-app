const global = {
  currentPage: window.location.pathname,
  search: {
    type: "",
    term: "",
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    apiKey: "12edb22d4ab1458b8614fa6424e5543b",
    apiUrl: "https://api.themoviedb.org/3",
  },
};

// display popular movies
async function displayPopularMovies() {
  try {
    const { results } = await fetchApi("movie/popular");

    results.forEach((movie) => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
          ${
            movie.poster_path
              ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="card-img-top">`
              : `<img src="/images/no-image.jpg" alt="${movie.title}" class="card-img-top">`
          }
        </a>
        <div class="card-body">
          <h5 class="movie-title">${movie.title}</h5>
          <div class="movie-text">
            <div class="text-muted">${movie.release_date}</div>
          </div>
        </div>
      `;

      document.querySelector("#popular-movies").appendChild(div);
    });
  } catch (error) {
    console.error("Error in displayPopularMovies:", error);
  }
}

// display popular tv shows
async function displayPopularTvshows() {
  try {
    const { results } = await fetchApi("tv/popular");

    results.forEach((show) => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
        <a href="tv-details.html?id=${show.id}">
          ${
            show.poster_path
              ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" alt="${show.name}" class="card-img-top">`
              : `<img src="/images/no-image.jpg" alt="${show.name}" class="card-img-top">`
          }
        </a>
        <div class="card-body">
          <h5 class="movie-title">${show.name}</h5>
          <div class="movie-text">
            <div class="text-muted">${show.first_air_date}</div>
          </div>
        </div>
      `;

      document.querySelector("#popular-shows").appendChild(div);
    });
  } catch (error) {
    console.error("Error in displayPopularTvshows:", error);
  }
}

// movie details page
async function movieDetails() {
  try {
    const movieId = window.location.search.split("=")[1];

    const movie = await fetchApi(`movie/${movieId}`);

    displayBackground("movie", movie.backdrop_path);

    const div = document.createElement("div");
    div.innerHTML = `<div class="details-top">
      <div>
        ${
          movie.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="card-img-top">`
            : `<img src="/images/no-image.jpg" alt="${movie.title}" class="card-img-top">`
        }
      </div>
      <div>
        <h1 class="uppercase">${movie.title}</h1>
        <p>
          <i class="fas fa-star text-primary"></i>
          ${movie.vote_average.toFixed(1)}/10
        </p>
        <p class="text-muted">${movie.release_date}</p>
        <p>${movie.overview}</p>
        <h5 class="uppercase">Genrs</h5>
        <ul class="list-group">
          ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
        </ul>
        <a href="${
          movie.homepage
        }" class="btn" target="-blank">Visit Movie Homepage</a>
      </div>
    </div>
    <div class="details-bottom">
      <h2 class="uppercase">Movie info</h2>
      <ul>
        <li><span class="text-primary">Budget:</span> $${addCommasNumber(
          movie.budget
        )}</li>
        <li><span class="text-primary">Revenue:</span> $${addCommasNumber(
          movie.revenue
        )}</li>
        <li><span class="text-primary">Run time:</span> ${
          movie.runtime
        } minutes</li>
        <li><span class="text-primary">Status:</span> ${movie.status}</li>
      </ul>
      <h4>Production Companies</h4>
      ${movie.production_companies
        .map((company) => `<span>${company.name}</span>`)
        .join(", ")}
    </div>`;

    document.querySelector("#movie-details").appendChild(div);
  } catch (error) {
    console.error("Error in movieDetails:", error);
  }
}

// show details page
async function showDetails() {
  try {
    const showId = window.location.search.split("=")[1];
    console.log(showId);

    const show = await fetchApi(`tv/${showId}`);

    displayBackground("tv", show.backdrop_path);

    const div = document.createElement("div");
    div.innerHTML = `<div class="details-top">
      <div>
        ${
          show.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" alt="${show.name}" class="card-img-top">`
            : `<img src="/images/no-image.jpg" alt="${show.name}" class="card-img-top">`
        }
      </div>
      <div>
        <h1 class="uppercase">${show.name}</h1>
        <p>
          <i class="fas fa-star text-primary"></i>
          ${show.vote_average.toFixed(1)}/10
        </p>
        <p class="text-muted">${show.first_air_date}</p>
        <p>${show.overview}</p>
        <h5 class="uppercase">Genrs</h5>
        <ul class="list-group">
          ${show.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
        </ul>
        <a href="${
          show.homepage
        }" class="btn" target="-blank">Visit Show Homepage</a>
      </div>
    </div>
    <div class="details-bottom">
      <h2 class="uppercase">show info</h2>
      <ul>
        <li><span class="text-primary">Number of Episodes:</span> ${
          show.number_of_episodes
        }</li>
        <li><span class="text-primary">Last Episode To Air:</span> ${
          show.last_episode_to_air.name
        }</li>
        <li><span class="text-primary">Status:</span> ${show.status}</li>
      </ul>
      <h4>Production Companies</h4>
      ${show.production_companies
        .map((company) => `<span>${company.name}</span>`)
        .join(", ")}
    </div>`;

    document.querySelector("#show-details").appendChild(div);
  } catch (error) {
    console.error("Error in showDetails:", error);
  }
}

// movie detailpagebackground
function displayBackground(type, backdrop_path) {
  const overlay = document.createElement("div");
  overlay.style.background = `url(https://image.tmdb.org/t/p/original/${backdrop_path})`;
  overlay.style.backgroundPosition = "center";
  overlay.style.backgroundSize = "cover";
  overlay.style.backgroundRepeat = "no-repeat";
  overlay.style.height = "100vh";
  overlay.style.width = "100vw";
  overlay.style.position = "absolute";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.zIndex = "-1";
  overlay.style.opacity = "0.3";

  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(overlay);
  } else {
    document.querySelector("#show-details").appendChild(overlay);
  }
}

// search movies/shows
async function search() {
  try {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    global.search.type = urlParams.get("type");
    global.search.term = urlParams.get("search-term");

    if (global.search.term !== "" && global.search.term !== null) {
      const { results, total_pages, page, total_results } = await searchApi();

      global.search.page = page;
      global.search.totalPages = total_pages;
      global.search.totalResults = total_results;

      if (results.length === 0) {
        showAlert("No Resluts Found");
      }

      displaySearchResults(results);
      document.querySelector("#search-results").value = "";
    } else {
      showAlert("please enter a search term");
    }
  } catch (error) {
    console.error("Error in search:", error);
  }
}

// display search results
function displaySearchResults(results) {
  // clear before display results
  document.querySelector("#search-results").innerHTML = "";
  document.querySelector("#search-result-heading").innerHTML = "";
  document.querySelector("#pagination").innerHTML = "";

  // Set heading once, outside loop (FIXED)
  document.querySelector("#search-result-heading").innerHTML = `
    <h2>${results.length} Of ${global.search.totalResults} Results for ${global.search.term}</h2>
  `;

  results.forEach((result) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <a href="${global.search.type}-details.html?id=${result.id}">
        ${
          result.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500${
                result.poster_path
              }" alt="${
                global.search.type === "movie" ? result.title : result.name
              }" class="card-img-top">`
            : `<img src="/images/no-image.jpg" alt="${
                global.search.type === "movie" ? result.title : result.name
              }" class="card-img-top">`
        }
      </a>
      <div class="card-body">
        <h5 class="movie-title">${
          global.search.type === "movie" ? result.title : result.name
        }</h5>
        <div class="movie-text">
          <div class="text-muted">${
            global.search.type === "movie"
              ? result.release_date
              : result.first_air_date
          }</div>
        </div>
      </div>
    `;

    document.querySelector("#search-results").appendChild(div);
  });
  displayPagination();
}

//pagination
function displayPagination() {
  const div = document.createElement("div");
  div.classList.add("pagination");
  div.innerHTML = `
    <button class="btn btn-primary" id="prev">Prev</button>
    <button class="btn btn-primary" id="next">Next</button>
    <div class="page-counter">${global.search.page} of ${global.search.totalPages}</div>
  `;

  document.querySelector("#pagination").appendChild(div);

  // disable prev on first page (FIXED: Simplified)
  if (global.search.page === 1) {
    document.querySelector("#prev").style.display = "none";
  }

  // disable next on last page
  if (global.search.page === global.search.totalPages) {
    document.querySelector("#next").style.display = "none";
  }

  // next page
  document.querySelector("#next").addEventListener("click", async () => {
    global.search.page++;
    try {
      const { results, total_pages } = await searchApi();
      displaySearchResults(results);
    } catch (error) {
      console.error("Error in next page:", error);
    }
  });

  // prev page
  document.querySelector("#prev").addEventListener("click", async () => {
    global.search.page--;
    try {
      const { results, total_pages } = await searchApi();
      displaySearchResults(results);
    } catch (error) {
      console.error("Error in prev page:", error);
    }
  });
}

// //display now playing
async function displaySlider() {
  try {
    const { results } = await fetchApi("movie/now_playing");

    results.forEach((movie) => {
      const div = document.createElement("div");
      div.classList.add("swiper-slide");

      div.innerHTML = `<a href="movie-details.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
      </h4>`;

      document.querySelector(".swiper-wrapper").appendChild(div);
    });

    // Initialize Swiper once, after all slides (FIXED: Moved outside forEach)
    initSwiper();
  } catch (error) {
    console.error("Error in displaySlider:", error);
  }
}

function initSwiper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

// fetch from TMDB api (FIXED: Added await to response.json())
async function fetchApi(endpoint) {
  const api_key = global.api.apiKey;
  const api_url = global.api.apiUrl;

  showSpinner();

  try {
    const response = await fetch(
      `${api_url}/${endpoint}?api_key=${api_key}&page=${global.search.page}`
    );
    const data = await response.json(); // FIXED: Added await here

    hideSpinner();

    return data;
  } catch (error) {
    hideSpinner();
    console.error("Error in fetchApi:", error);
    throw error;
  }
}

// search movies/tv shows (FIXED: Added await to response.json())
async function searchApi() {
  const api_key = global.api.apiKey;
  const api_url = global.api.apiUrl;

  showSpinner();

  try {
    const response = await fetch(
      `${api_url}/search/${global.search.type}?api_key=${api_key}&query=${global.search.term}&page=${global.search.page}`
    );
    const data = await response.json(); // FIXED: Added await here

    hideSpinner();

    return data;
  } catch (error) {
    hideSpinner();
    console.error("Error in searchApi:", error);
    throw error;
  }
}

// spinner
function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

// show alert
function showAlert(message, className = "error") {
  const div = document.createElement("div");
  div.classList.add("alert", className);
  div.appendChild(document.createTextNode(message));
  const alertContainer = document.querySelector("#alert");
  if (alertContainer) {
    alertContainer.appendChild(div);
  } else {
    // Fallback: Append to body if #alert doesn't exist
    document.body.appendChild(div);
  }

  setTimeout(() => div.remove(), 3000);
}

// active link
function higlightActiveLink() {
  const links = document.querySelectorAll(".nav-links");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}

// add commas to numbers
function addCommasNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// page router
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displaySlider();
      displayPopularMovies();
      break;

    case "/shows.html":
      displayPopularTvshows();
      break;

    case "/movie-details.html":
      movieDetails();
      break;

    case "/tv-details.html":
      showDetails();
      break;

    case "/search.html":
      search();
      break;
  }
  higlightActiveLink();

  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".main-header");

    if (window.scrollY > 0) {
      navbar.classList.add("header-scroll");
    } else {
      navbar.classList.remove("header-scroll");
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
