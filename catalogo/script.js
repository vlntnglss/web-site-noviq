async function cargarCatalogo() {
    
    const path = window.location.pathname.split("/");
    const cliente = path[2]; // /catalogo/cliente/

    const response = await fetch(`/catalogo/${cliente}/data.json`);
    const data = await response.json();

    aplicarTema(data.theme);
    renderProductos(data.productos);
}

function aplicarTema(theme) {
    document.documentElement.style.setProperty('--primary', theme.color_primario);
    document.documentElement.style.setProperty('--secondary', theme.color_secundario);
    document.body.style.background = theme.color_fondo;

    if (theme.logo) {
        document.getElementById("logo").src = theme.logo;
    }
}

function renderProductos(productos) {
    const contenedor = document.getElementById("productos");

    contenedor.innerHTML = productos.map(p => `
        <div class="product">
            <img src="${p.imagen}">
            <h3>${p.nombre}</h3>
            <p class="price">$${p.precio}</p>
            <p>${p.descripcion}</p>
        </div>
    `).join("");
}

cargarCatalogo();
