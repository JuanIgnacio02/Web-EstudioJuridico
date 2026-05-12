# Estudio Jurídico Pérez — Sitio Web

Sitio web profesional para la Abogada **Gimena Pérez**, San Rafael, Mendoza.

🌐 **Live:** [gimenaperezabogada.com.ar](https://gimenaperezabogada.com.ar)

---

## Páginas

| Página | Descripción |
|--------|-------------|
| `index.html` | Home — presentación y acceso a todas las áreas |
| `accidentes.html` | Accidentes laborales, de tránsito, ART |
| `divorcios.html` | Divorcios, alimentos, cuidado personal |
| `sucesiones.html` | Sucesiones y herencias |
| `contratos.html` | Redacción y revisión de contratos |

## Stack

- HTML5 + CSS3 + Vanilla JS
- [GSAP 3.12](https://gsap.com/) — animaciones y ScrollTrigger
- [Cloudflare Pages](https://pages.cloudflare.com/) — hosting y CDN

## Correr localmente

```bash
npx serve .
# → http://localhost:3000
```

## Deploy

El deploy es automático. Cada push a `main` dispara un build en Cloudflare Pages.

## SEO

- Canonical tags por página
- Open Graph + Twitter Card
- JSON-LD (LegalService + Attorney)
- `sitemap.xml` y `robots.txt`
- Favicon SVG

## Estructura

```
/
├── index.html
├── accidentes.html
├── divorcios.html
├── sucesiones.html
├── contratos.html
├── styles.css        # Estilos globales (navbar, footer, botones)
├── index.css         # Estilos específicos del home
├── service.css       # Estilos compartidos entre páginas de servicio
├── animations.js     # Animaciones GSAP + ScrollTrigger
├── main.js           # Navbar scroll, smooth scroll, active links
├── favicon.svg
├── robots.txt
└── sitemap.xml
```
