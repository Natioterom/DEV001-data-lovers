
export const tarjetas = (personaje) =>{
  const tarjeta =`
    <article class="card">
      <header class="header-card">
        <img src="${personaje.image}">
      </header>
      <div class="card-body spacing">
      <p class="name-character">${personaje.name}</p>
      <p>${personaje.species}</p>
      <p>${personaje.status}</p>
      </div>
    </article>`
  return(tarjeta);
};
