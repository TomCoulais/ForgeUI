const fs = require('fs');
const path = require('path');

exports.generateCssFile = (req, res) => {
    const { colors, fonts, layout, components } = req.body;

    if (!colors || !fonts || !layout || !components) {
        return res.status(400).json({ error: 'Informations de style manquantes.' });
    }

    let cssContent = `:root {\n`;

    // Variables de couleurs
    cssContent += `    --color-dark-${colors.name}: ${colors.dark};\n`;
    cssContent += `    --color-light-${colors.name}: ${colors.light};\n`;
    cssContent += `    --color-accent-${colors.name}: ${colors.accent};\n`;
    cssContent += `}\n\n`;

    if (fonts.title) {
        // Extraire la valeur numérique et l'unité de taille (ex: 32px → 32, "px")
        const sizeValue = parseFloat(fonts.title.size);
        const sizeUnit = fonts.title.size.replace(sizeValue, '');
    
        // Boucle de h1 à h6 avec réduction de taille (ex: chaque niveau -2px)
        for (let i = 1; i <= 6; i++) {
            const reducedSize = sizeValue - (i - 1) * 2; // réduit de 2px à chaque fois
            cssContent += `h${i} {\n`;
            cssContent += `    font-family: '${fonts.title.name}', sans-serif;\n`;
            cssContent += `    font-size: ${reducedSize}${sizeUnit};\n`;
            cssContent += `    font-weight: ${fonts.title.weight};\n`;
            cssContent += `}\n\n`;
        }
    }
    
    // Texte générique
    if (fonts.text) {
        cssContent += `.text-${fonts.text.name || 'base'} {\n`;
        cssContent += `    font-family: '${fonts.text.fontfamily}', sans-serif;\n`;
        cssContent += `    font-size: ${fonts.text.size};\n`;
        cssContent += `}\n\n`;
    }

    // Conteneur principal
    cssContent += `.container-${layout.container.name} {\n`;
    cssContent += `    max-width: ${layout.container.maxWidth || '1200px'};\n`;
    cssContent += `    padding: ${layout.container.padding || '1rem'};\n`;
    cssContent += `    margin: 0 auto;\n`;
    cssContent += `}\n\n`;

// Boutons dynamiques
if (Array.isArray(components.buttons)) {
    components.buttons.forEach(button => {
        cssContent += `.button-${button.name} {\n`;
        cssContent += `    margin: ${button.margin || '0.5rem'};\n`;
        cssContent += `    font-size: ${button.fontSize || '1rem'};\n`;
        cssContent += `    border-radius: ${button.border.radius || '4px'};\n`;
        cssContent += `    padding: 0.5rem 1rem;\n`;
        cssContent += `    cursor: pointer;\n`;
        cssContent += `}\n\n`;
    });
}

// Tuiles dynamiques
if (Array.isArray(components.tiles)) {
    components.tiles.forEach(tile => {
        cssContent += `.tile-${tile.name} {\n`;
        cssContent += `    margin: ${tile.margin || '1rem'};\n`;
        cssContent += `    border-radius: ${tile.border.radius || '8px'};\n`;
        cssContent += `    padding: 1rem;\n`;
        cssContent += `    box-shadow: 0 2px 5px rgba(0,0,0,0.1);\n`;
        cssContent += `    background-color: var(--color-light-${colors.name});\n`;
        cssContent += `}\n\n`;
    });
}


    // Responsive grid
    if (layout.breakpoints && Array.isArray(layout.breakpoints)) {
        layout.breakpoints.forEach(breakpoint => {
            cssContent += `@media (min-width: ${breakpoint.minWidth}) {\n`;
            cssContent += `    .grid-${layout.grid.name} {\n`;
            cssContent += `        display: grid;\n`;
            cssContent += `        grid-template-columns: repeat(${breakpoint.columns}, 1fr);\n`;
            cssContent += `        gap: ${breakpoint.gap || '1rem'};\n`;
            cssContent += `    }\n`;
            cssContent += `}\n\n`;
        });
    }

    const cssPath = path.join(__dirname, '../public/styles.css');

    fs.writeFile(cssPath, cssContent, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la création du fichier CSS.' });
        }
        return res.status(200).json({ message: 'Fichier CSS créé avec succès.' });
    });
};
