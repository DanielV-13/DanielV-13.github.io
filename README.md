# Portafolio · Daniel Vaca Velastegui

Portafolio personal interactivo. El **universo es el menú principal**: viajas por escalas (agujero negro → cúmulo de galaxias → sistema solar → Tierra) y haces zoom en cada objeto para entrar a una subpágina.

🔗 **Sitio en vivo:** https://danielv-13.github.io
🗂️ **Versiones anteriores:** [v16](https://danielv-13.github.io/v16/) · [v15](https://danielv-13.github.io/v15/) · [v14](https://danielv-13.github.io/v14/) · [v13](https://danielv-13.github.io/v13/) · [v12](https://danielv-13.github.io/v12/) · [v11](https://danielv-13.github.io/v11/) · [v10](https://danielv-13.github.io/v10/) · [v9](https://danielv-13.github.io/v9/) · [v8](https://danielv-13.github.io/v8/) · [v7](https://danielv-13.github.io/v7/) · [v6](https://danielv-13.github.io/v6/) · [v5](https://danielv-13.github.io/v5/) · [v4](https://danielv-13.github.io/v4/) · [v3](https://danielv-13.github.io/v3/) · [v2 (página con scroll)](https://danielv-13.github.io/v2/) · [v1 (cielo estrellado por materias)](https://danielv-13.github.io/v1/)

## Cómo se navega

| Objeto del universo | Subpágina |
|---|---|
| 6 galaxias (una por área) | `#work` (filtrada: `#work/ml`, `#work/games`…) |
| El Sol | `#about` · el modelo estándar de mi historia |
| La Tierra | `#journey` · pegatinas y trayectoria |
| El satélite | `#arcade` · Particle Invaders |

Siempre se vuelve con «← Universo», `Esc` o el botón Atrás del navegador. El contador «Explorado n/9» y los objetos que brillan muestran lo que falta por ver (se guarda en el navegador).

## Estructura

```
index.html        ← página final (se genera con build.py)
build.py          ← une src/ en un solo index.html
src/template.html ← HTML y CSS
src/1-data.js     ← TODO el contenido: proyectos, trayectoria, historia (tabla), pegatinas, paradas (EN/ES)
src/2-core.js     ← idioma, sonido, rutas/subpáginas, explorados, proyectos, historia, trayectoria
src/3-canvas.js   ← animaciones, universo-menú, portales de vista previa, portada CMS del libro
src/4-fx.js       ← colisión del nombre, cursor-partícula, Particle Invaders, intro, arranque
assets/projects/  ← imágenes y videos de los proyectos
assets/logos/     ← logos monocromos (máscaras que se tiñen con la paleta)
assets/space/     ← nebulosa de fondo y textura de polvo del disco
assets/js/bh3d.js ← agujero negro 3D (three.js), generado desde src3d/bh3d.js
src3d/bh3d.js     ← código del agujero negro 3D
v1/ … v16/        ← versiones anteriores
```

## Editar y publicar

1. Cambia el contenido en `src/1-data.js` (o el diseño en `src/template.html`).
2. Ejecuta `python build.py` para regenerar `index.html`.
3. Haz commit y push: GitHub Pages publica en un minuto.

## Agujero negro 3D

`src3d/bh3d.js` se empaqueta con three.js en `assets/js/bh3d.js` (se carga después de abrir la página; mientras tanto se ve el agujero negro 2D):

```
npm i three esbuild
npx esbuild src3d/bh3d.js --bundle --format=esm --minify --outfile=assets/js/bh3d.js
```

## Créditos

- Nebulosa («Alien Space Nebula») y textura de polvo del disco (del modelo «black hole»): recursos de Sketchfab con licencia libre, reducidos para la web. _Pendiente: añadir el nombre de sus autores._

- Logos de tecnologías: [Simple Icons](https://simpleicons.org) (CC0).
