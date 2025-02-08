// Función para mostrar la sección activa
function showSection(section) {
    // Ocultamos todas las secciones
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => sec.classList.remove('active'));

    // Mostramos la sección seleccionada
    const selectedSection = document.getElementById(section);
    selectedSection.classList.add('active');

    // Guardamos la sección activa en localStorage para persistencia
    localStorage.setItem('activeSection', section);
}

// Al cargar la página, verificar si hay una sección activa en el localStorage
window.onload = function() {
    const activeSection = localStorage.getItem('activeSection') || 'concepto';
    showSection(activeSection);

    // Aplicar la clase 'active' al enlace correspondiente
    const links = document.querySelectorAll("a");
    links.forEach(link => {
        if (link.getAttribute("href") === `#${activeSection}`) {
            link.classList.add("active");
        }
    });
};

document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("a");

    links.forEach(link => {
        link.addEventListener("click", function () {
            // Solo afecta a los enlaces relacionados con las secciones
            if (link.getAttribute("href").startsWith("#")) {
                links.forEach(l => l.classList.remove("active")); // Remueve la clase de todos los enlaces
                this.classList.add("active"); // Agrega la clase al enlace clickeado
            }
        });
    });

    const tabsContainer = document.querySelector(".tabs"); // Selecciona solo el contenedor de tabs
    if (!tabsContainer) return; // Si no existe, termina la ejecución

    const tabs = tabsContainer.querySelectorAll("a"); // Solo las etiquetas <a> dentro de .tabs
    const articles = document.querySelectorAll("article");

    // Recuperar el índice de la pestaña activa desde localStorage
    const activeTabIndex = localStorage.getItem("activeTabIndex");

    // Si hay un índice activo guardado, seleccionamos esa pestaña
    if (activeTabIndex !== null) {
        tabs[activeTabIndex].classList.add("active");
        articles.forEach((article, index) => {
            article.style.display = index === parseInt(activeTabIndex) ? "block" : "none";
        });
    } else {
        // Si no hay índice guardado, seleccionamos la primera pestaña por defecto
        tabs[0].classList.add("active");
        articles.forEach((article, index) => {
            article.style.display = index === 0 ? "block" : "none";
        });
    }

    // Agregar evento de clic a cada pestaña
    tabs.forEach((tab, index) => {
        tab.addEventListener("click", function (event) {
            event.preventDefault(); // Evita la recarga de la página

            // Remover la clase 'active' solo de los enlaces dentro de .tabs
            tabs.forEach(t => t.classList.remove("active"));

            // Agregar 'active' a la pestaña actual
            tab.classList.add("active");

            // Ocultar todos los artículos
            articles.forEach(article => article.style.display = "none");

            // Mostrar el artículo correspondiente al índice de la pestaña
            articles[index].style.display = "block";

            // Guardar el índice de la pestaña activa en localStorage
            localStorage.setItem("activeTabIndex", index);
        });
    });
});

