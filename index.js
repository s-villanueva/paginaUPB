// index.js

document.addEventListener("DOMContentLoaded", () => {
    const iframe = document.getElementById("mainmenu");

    // Mapeo de rutas
    const rutas = {
        microcontroladores: "microcontroladores.html",
        embebidos: "sistemas_embebidos.html",
        comunicaciones: "comunicaciones.html",
        senales: "procesamiento_senales.html",
        ia: "ai.html",
        practicas1: "practicas.html",
        practicas2: "simulacion_circuitos.html",
        practicas3: "simulacion_microcontroladores.html",
        sis_sig: "signal_and_systems.html",
        electronica2: "electro_aplicada_2.html",
        ing_control: "ing_control.html"
    };

    // Captura de todos los enlaces
    const links = document.querySelectorAll("a[data-target]");

    links.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault(); 
            const destino = link.getAttribute("data-target");

            // Cambiar src del iframe
            if (rutas[destino]) {
                iframe.src = rutas[destino];
            }

            // Quitar clase activa de todos
            links.forEach(l => {
                l.classList.remove("bg-[#ff8107]", "text-white", "font-medium");
                l.classList.add("text-[#D6D6D6]");
            });

            // Aplicar clase activa al link clickeado
            link.classList.add("bg-[#ff8107]", "text-white", "font-medium", "rounded-lg");
            link.classList.remove("text-gray-700", "hover:text-blue-600");
        });
    });
});
