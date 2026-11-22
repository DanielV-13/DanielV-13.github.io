# Portafolio · Daniel Vaca Velastegui

Portafolio personal interactivo: un viaje por las escalas del universo donde cada parada es una sección (agujero negro → cúmulo de galaxias → sistema solar → Tierra).

🔗 **Sitio en vivo:** https://danielv-13.github.io
🗂️ **Versión anterior (cielo estrellado por materias):** https://danielv-13.github.io/v1/

## Estructura

```
index.html        ← página final (se genera con build.py)
build.py          ← une src/ en un solo index.html
src/template.html ← HTML y CSS
src/1-data.js     ← TODO el contenido: proyectos, trayectoria, historia, paradas del universo (EN/ES)
src/2-core.js     ← idioma, sonido, navegación, proyectos y ventana de detalle
src/3-canvas.js   ← animaciones de las tarjetas, agujero negro y el universo
src/4-fx.js       ← colisión del nombre, cursor-partícula, Particle Invaders, intro del libro
assets/projects/  ← imágenes y video de los proyectos
v1/               ← versión anterior del portafolio
```

## Editar y publicar

1. Cambia el contenido en `src/1-data.js` (o el diseño en `src/template.html`).
2. Ejecuta `python build.py` para regenerar `index.html`.
3. Haz commit y push: GitHub Pages publica en un minuto.

Hecho a mano con HTML, CSS y canvas, sin frameworks.
