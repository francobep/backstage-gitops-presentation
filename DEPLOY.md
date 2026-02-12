# Cómo Publicar en GitHub Pages

Esta guía te ayudará a publicar tu presentación online de forma gratuita.

## Opción 1: Subida Manual (Rápida)

Esta opción es ideal si solo quieres subir la versión compilada (`dist`).

1.  Crea un **Nuevo Repositorio** en GitHub (ej: `backstage-gitops-presentation`).
2.  Ve a la pestaña **Settings** -> **Pages**.
3.  Descomprime el archivo `presentation-dist.zip` en tu computadora.
4.  Sube el contenido de la carpeta `dist` (index.html, assets, imagenes) a la rama `main` de tu repositorio.
5.  En **Settings -> Pages**, asegúrate que "Source" esté en "Deploy from a branch" y selecciona la rama `main` y la carpeta `/ (root)`.
6.  ¡Listo! En unos minutos tu presentación estará visible en `https://<tu-usuario>.github.io/backstage-gitops-presentation`.

## Opción 2: Despliegue Automático (Recomendada)

Esta opción configura el proyecto para que cada vez que hagas `git push`, se construya y publique automáticamente.

1.  Sube **todo el código fuente** (la carpeta `presentation-app`, ignorando `dist` y `node_modules`) a tu repositorio GitHub.
2.  En tu repositorio local, crea el archivo `.github/workflows/deploy.yml` con este contenido:

```yaml
# Simple workflow for deploying static content to GitHub Pages
name: Deploy static content to Pages

on:
  push:
    branches: ["main"]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  # Single deploy job since we're just building
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

3.  Ve a **Settings** -> **Pages** en GitHub y cambia "Build and deployment source" a **GitHub Actions**.
4.  Haz commit y push. GitHub se encargará del resto.
