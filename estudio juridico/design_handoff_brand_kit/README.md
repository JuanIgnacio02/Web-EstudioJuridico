# Handoff: Brand Kit — Estudio Jurídico Pérez

## Overview
Brand kit completo para el sitio web del Estudio Jurídico de la abogada Gimena Pérez (San Rafael, Mendoza). Define los tokens de diseño, tipografía, colores, componentes y voz de marca que deben usarse en toda la interfaz.

## About the Design Files
Los archivos en este bundle son **referencias de diseño creadas en HTML** — prototipos que muestran el aspecto visual y los componentes de la marca. La tarea es **implementar estos tokens y componentes en el codebase existente** (el sitio está en Vercel: https://web-estudio-juridico-lilac.vercel.app/) respetando sus patrones y estructura — no copiar el HTML directamente.

## Fidelity
**Alta fidelidad (hifi)**: El brand kit es pixel-perfect con colores, tipografía, espaciado e interacciones finales. Implementar con máxima fidelidad visual.

---

## Design Tokens

### Colores
```css
--negro:       #0e0e0c;   /* Texto principal, CTAs primarios, fondos oscuros */
--gris-oscuro: #3a3a38;   /* Subtítulos, texto secundario */
--gris:        #888884;   /* Labels, captions, bordes suaves */
--gris-claro:  #c8c8c4;   /* Divisores, bordes decorativos */
--beige:       #e8e2d8;   /* Fondos de sección, cards suaves */
--beige-claro: #f2ede6;   /* Fondos alternos, badges */
--blanco:      #faf9f7;   /* Fondo base del sitio */
```

### Tipografía

#### Fuentes
- **Display / Títulos**: `Cormorant Garamond` (Google Fonts) — pesos 300, 400, 500; incluye itálica
- **Cuerpo / UI**: `DM Sans` (Google Fonts) — pesos 300, 400, 500

#### Escala tipográfica
| Nombre       | Fuente             | Tamaño | Peso | Style  | Letter-spacing | Line-height |
|--------------|--------------------|--------|------|--------|----------------|-------------|
| Hero/Display | Cormorant Garamond | 54px   | 300  | normal | -1px           | 1.0         |
| H1           | Cormorant Garamond | 36px   | 400  | normal | 0              | 1.2         |
| H1 Itálico   | Cormorant Garamond | 36px   | 300  | italic | 0              | 1.2         |
| H2           | Cormorant Garamond | 24px   | 300  | normal | 0              | 1.4         |
| Label        | DM Sans            | 11px   | 400  | normal | 2.5px          | 1.0         |
| Cuerpo       | DM Sans            | 15px   | 300  | normal | 0              | 1.75        |
| Legal/Small  | DM Sans            | 12px   | 400  | normal | 0              | 1.6         |

### Espaciado
Sistema basado en múltiplos de 8px:
```
XS  →  4px
SM  →  8px
MD  →  16px
LG  →  24px
XL  →  32px
2XL →  48px
3XL →  64px
4XL →  80px
```

### Borders y radios
- **Sin border-radius** en casi todos los elementos (estilo recto, sobrio)
- Bordes: `1px solid #e8e2d8` (beige) para separadores suaves
- Bordes de énfasis: `1px solid #0e0e0c` (negro)

---

## Componentes

### Logo
Tres variantes — todas usan el monograma "GP" en círculo + wordmark:

| Variante    | Fondo      | Marca          | Texto          |
|-------------|------------|----------------|----------------|
| Principal   | `#faf9f7`  | borde negro    | negro          |
| Inversa     | `#0e0e0c`  | borde blanco   | blanco         |
| Beige       | `#e8e2d8`  | borde gris osc.| negro          |

Wordmark: `Gimena` (Regular) + `Pérez` (Italic) / sublinea: uppercase 10px DM Sans, gris, 2px letter-spacing

### Botones
Todos: `font-family: DM Sans`, `font-size: 12px`, `letter-spacing: 1px`, `text-transform: uppercase`, `padding: 13px 28px`, **sin border-radius**

| Variante       | Fondo      | Texto      | Borde              | Hover fondo   |
|----------------|------------|------------|--------------------|---------------|
| btn-solid      | `#0e0e0c`  | `#faf9f7`  | ninguno            | `#3a3a38`     |
| btn-outline    | transparent| `#0e0e0c`  | 1px `#0e0e0c`      | `#0e0e0c`/blanco|
| btn-ghost      | transparent| `#3a3a38`  | ninguno + " →"     | negro         |
| btn-beige      | `#e8e2d8`  | `#0e0e0c`  | ninguno            | `#f2ede6`     |
| btn-inv-solid  | `#faf9f7`  | `#0e0e0c`  | ninguno            | —             |
| btn-inv-outline| transparent| `#faf9f7`  | 1px rgba(fff,0.4)  | blanco/negro  |
| btn-wa         | `#25D366`  | white      | ninguno            | `#1ebe5a`     |

### Badges / Tags
```
padding: 5px 14px
font-size: 10px
letter-spacing: 1.5px
text-transform: uppercase
sin border-radius
```
Variantes: negro/blanco · beige/negro · outline/gris · outline/negro

### Cards de servicio
```
padding: 32px
sin border-radius
border-right: 1px solid #e8e2d8 (separador entre cards)
```
- Número grande: Cormorant Garamond 56px Light, color `#e8e2d8`
- Título: Cormorant Garamond 22px Regular
- Cuerpo: DM Sans 13px, color `#3a3a38`, line-height 1.65
- Tag al pie: badge estilo beige

Variante oscura (primera card): fondo `#0e0e0c`, número `#2a2a28`, título blanco, cuerpo gris.

---

## Voz y Tono

### Sí usar
- Tuteo directo: "podés reclamar", "te acompañamos"
- Frases cortas y sin rodeos
- Empatía sin condescendencia
- Primera persona en comunicación directa
- Promesas concretas y verificables

### No usar
- Jerga legal sin explicación
- Tono corporativo impersonal
- Promesas exageradas
- Anglicismos innecesarios

### Frases de marca
> "Cuando me contratás, hablás conmigo directamente."
> "Solo cobramos cuando vos cobrás."
> "Más de 10 años resolviendo casos reales en Mendoza."

---

## Sitio de referencia
- **URL**: https://web-estudio-juridico-lilac.vercel.app/
- **Secciones**: Accidentes · Divorcios · Sucesiones · Contratos
- **WhatsApp**: +54 260 468-9061
- **Instagram**: @abogada.gimenaperez
- **Matrícula**: SCJM Mendoza N.º 8988 · Federal T° 336 F° 126

## Archivos en este bundle
- `Brand Kit.html` — Referencia visual completa del brand kit
- `README.md` — Este documento
