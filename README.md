# Ammar's portfolio

A static website ready for GitHub Pages. No build tools or dependencies are required.

- `index.html` contains the story, projects, and contact details.
- `styles.css` contains the shared styles and local font declarations.
- `assets/` contains the headshot, fonts, and case study PDFs.

Open `index.html` in a browser to preview. Publish the repository using GitHub Pages from the root of the chosen branch. Asset paths are relative and work on a project site.

## Collaborator profiles

Edit the `collaborators` array in `collaboration.js` to add each person's name, specialty, photo path, description, and profile URLs. Leave unknown fields empty; only supplied information and valid HTTP(S) links are shown. A populated node opens its profile on hover or click and can be operated by keyboard or touch. The center photo uses `assets/headshot.jpeg`; replace its `src` in `index.html` when a new portrait is ready.
