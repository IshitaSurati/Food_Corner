export const navbar = () => {
  return `
    <nav class="navbar bg-dark border-bottom border-body navbar-expand-lg" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="/index.html">FoodCorner</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarScroll">
          <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/index.html">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/pages/login.html">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/pages/signup.html">Signup</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/pages/cart.html">Cart</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/pages/add.html">Add</a>
            </li>
          </ul>
          <form class="d-flex" role="search" id="searchForm">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  `;
};
