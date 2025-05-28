const fs = require('fs');
const path = require('path');

exports.generateCssFile = (req, res) => {
    const { userId, kitName, colors, fonts, layout, components } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'UserId manquant. Veuillez vous connecter pour créer un kit.' });
    }

    if (!colors || !fonts || !layout || !components) {
        return res.status(400).json({ error: 'Données manquantes (contenu du kit).' });
    }

    const addPx = (value) => {
        if (typeof value === 'number') return `${value}px`;
        if (typeof value === 'string' && /^\d+$/.test(value)) return `${value}px`;
        return value;
    };

    let cssContent = `:root {\n`;
    cssContent += `    --color-dark-${colors.name}: ${colors.dark};\n`;
    cssContent += `    --color-light-${colors.name}: ${colors.light};\n`;
    cssContent += `    --color-accent-${colors.name}: ${colors.accent};\n`;
    cssContent += `}\n\n`;

    if (fonts.title) {
        const sizeValue = parseFloat(fonts.title.size);
        const sizeUnit = fonts.title.size.replace(sizeValue, '');

        for (let i = 1; i <= 6; i++) {
            const reducedSize = sizeValue - (i - 1) * 2;
            cssContent += `h${i} {\n`;
            cssContent += `    font-family: '${fonts.title.name}', sans-serif;\n`;
            cssContent += `    font-size: ${reducedSize}${addPx(sizeUnit)};\n`;
            cssContent += `    font-weight: ${addPx(fonts.title.weight)};\n`;
            cssContent += `}\n\n`;
        }
    }

    if (fonts.text) {
        cssContent += `.text {\n`;
        cssContent += `    font-family: '${fonts.text.fontfamily}', sans-serif;\n`;
        cssContent += `    font-size: ${addPx(fonts.text.size)};\n`;
        cssContent += `}\n\n`;
    }

    cssContent += `.container {\n`;
    cssContent += `    max-width: ${addPx(layout.container?.maxWidth) || '1200px'};\n`;
    cssContent += `    padding: ${addPx(layout.container?.padding) || '1rem'};\n`;
    cssContent += `    margin: 0 auto;\n`;
    cssContent += `}\n\n`;

    if (Array.isArray(components.buttons)) {
        components.buttons.forEach((button, index) => {
            cssContent += `.button-${index + 1} {\n`;
            cssContent += `    padding: ${addPx(button.padding) || '0.5rem'};\n`;
            cssContent += `    font-size: ${addPx(button.fontSize) || '1rem'};\n`;
            cssContent += `    border-radius: ${addPx(button.border?.radius) || '4px'};\n`;
            cssContent += `    cursor: pointer;\n`;
            cssContent += `}\n\n`;
        });
    }

    if (Array.isArray(components.tiles)) {
        components.tiles.forEach((tile, index) => {
            cssContent += `.tile-${index + 1} {\n`;
            cssContent += `    margin: ${addPx(tile.margin) || '1rem'};\n`;
            cssContent += `    border-radius: ${addPx(tile.border?.radius) || '8px'};\n`;
            cssContent += `    padding: 1rem;\n`;
            cssContent += `    box-shadow: 0 2px 5px rgba(0,0,0,0.1);\n`;
            cssContent += `    background-color: var(--color-light-${colors.name});\n`;
            cssContent += `}\n\n`;
        });
    }

    cssContent += `.grid {\n`;
    cssContent += `    display: grid;\n`;
    cssContent += `    grid-template-columns: repeat(${layout.grid?.breakpoints?.columns || 1}, 1fr);\n`;
    cssContent += `    gap: ${addPx(layout.grid?.breakpoints?.gap) || '1rem'};\n`;
    cssContent += `}\n\n`;

    const userIdStr = String(userId);
    const userDir = path.join(__dirname, '../public/kits', userIdStr);

    if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir, { recursive: true });
    }

    const timestamp = Date.now();
    const safeKitName = kitName ? kitName.replace(/[^a-z0-9-_]/gi, '_').toLowerCase() : `kit-${timestamp}`;
    const cssFilename = `${safeKitName}.css`;
    const cssPath = path.join(userDir, cssFilename);

    fs.writeFile(cssPath, cssContent, (err) => {
        if (err) {
            console.error('Erreur lors de l\'écriture du fichier CSS:', err);
            return res.status(500).json({ error: 'Erreur lors de la création du fichier CSS.' });
        }

        const publicUrl = `/kits/${userIdStr}/${cssFilename}`;
        return res.status(200).json({ 
            message: 'Fichier CSS créé avec succès.', 
            url: publicUrl,
            cssContent: cssContent
        });
    });
};

exports.updateCssFile = (req, res) => {
    const { colors, fonts, layout, components } = req.body;
    const { userId, fileName } = req.params;

    if (!userId || !fileName) {
        return res.status(400).json({ error: 'Paramètres URL manquants (userId ou fileName).' });
    }

    if (!colors || !fonts || !layout || !components) {
        return res.status(400).json({ error: 'Données manquantes (contenu du kit).' });
    }

    const addPx = (value) => {
        if (typeof value === 'number') return `${value}px`;
        if (typeof value === 'string' && /^\d+$/.test(value)) return `${value}px`;
        return value;
    };

    let cssContent = `:root {\n`;
    cssContent += `    --color-dark-${colors.name}: ${colors.dark};\n`;
    cssContent += `    --color-light-${colors.name}: ${colors.light};\n`;
    cssContent += `    --color-accent-${colors.name}: ${colors.accent};\n`;
    cssContent += `}\n\n`;

    if (fonts.title) {
        const sizeValue = parseFloat(fonts.title.size);
        const sizeUnit = fonts.title.size.replace(sizeValue, '');

        for (let i = 1; i <= 6; i++) {
            const reducedSize = sizeValue - (i - 1) * 2;
            cssContent += `h${i} {\n`;
            cssContent += `    font-family: '${fonts.title.name}', sans-serif;\n`;
            cssContent += `    font-size: ${reducedSize}${sizeUnit};\n`;
            cssContent += `    font-weight: ${fonts.title.weight};\n`;
            cssContent += `}\n\n`;
        }
    }

    if (fonts.text) {
        cssContent += `.text {\n`;
        cssContent += `    font-family: '${fonts.text.fontfamily}', sans-serif;\n`;
        cssContent += `    font-size: ${addPx(fonts.text.size)};\n`;
        cssContent += `}\n\n`;
    }

    cssContent += `.container {\n`;
    cssContent += `    max-width: ${addPx(layout.container?.maxWidth) || '1200px'};\n`;
    cssContent += `    padding: ${addPx(layout.container?.padding) || '1rem'};\n`;
    cssContent += `    margin: 0 auto;\n`;
    cssContent += `}\n\n`;

    if (Array.isArray(components.buttons)) {
        components.buttons.forEach((button, index) => {
            cssContent += `.button-${index + 1} {\n`;
            cssContent += `    padding: ${addPx(button.padding) || '0.5rem'};\n`;
            cssContent += `    font-size: ${addPx(button.fontSize) || '1rem'};\n`;
            cssContent += `    border-radius: ${addPx(button.border?.radius) || '4px'};\n`;
            cssContent += `    cursor: pointer;\n`;
            cssContent += `}\n\n`;
        });
    }

    if (Array.isArray(components.tiles)) {
        components.tiles.forEach((tile, index) => {
            cssContent += `.tile-${index + 1} {\n`;
            cssContent += `    margin: ${addPx(tile.margin) || '1rem'};\n`;
            cssContent += `    border-radius: ${addPx(tile.border?.radius) || '8px'};\n`;
            cssContent += `    padding: 1rem;\n`;
            cssContent += `    box-shadow: 0 2px 5px rgba(0,0,0,0.1);\n`;
            cssContent += `    background-color: var(--color-light-${colors.name});\n`;
            cssContent += `}\n\n`;
        });
    }

    cssContent += `.grid {\n`;
    cssContent += `    display: grid;\n`;
    cssContent += `    grid-template-columns: repeat(${layout.grid?.breakpoints?.columns || 1}, 1fr);\n`;
    cssContent += `    gap: ${addPx(layout.grid?.breakpoints?.gap) || '1rem'};\n`;
    cssContent += `}\n\n`;

    const userDir = path.join(__dirname, '../public/kits', userId);
    const safeKitName = fileName.replace(/[^a-z0-9-_]/gi, '_').toLowerCase();
    const cssPath = path.join(userDir, `${safeKitName}.css`);

    if (!fs.existsSync(cssPath)) {
        return res.status(404).json({ error: 'Fichier CSS introuvable pour mise à jour.' });
    }

    fs.writeFile(cssPath, cssContent, (err) => {
        if (err) {
            console.error('Erreur lors de la mise à jour du fichier CSS:', err);
            return res.status(500).json({ error: 'Erreur lors de la mise à jour du fichier CSS.' });
        }

        const publicUrl = `/kits/${userId}/${safeKitName}.css`;
        return res.status(200).json({ 
            message: 'Fichier CSS mis à jour avec succès.',
            url: publicUrl,
            cssContent: cssContent
        });
    });
};


exports.getUserCssFiles = (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ error: 'Paramètre userId manquant.' });
    }

    // Convertir userId en chaîne
    const userIdStr = String(userId);
    const userDir = path.join(__dirname, '../public/kits', userIdStr);

    if (!fs.existsSync(userDir)) {
        return res.status(404).json({ error: 'Aucun fichier trouvé pour cet utilisateur.' });
    }

    fs.readdir(userDir, (err, files) => {
        if (err) {
            console.error('Erreur lors de la lecture du dossier utilisateur:', err);
            return res.status(500).json({ error: 'Erreur lors de la lecture du dossier utilisateur.' });
        }

        const cssFiles = files.filter(file => file.endsWith('.css'));
        const fileUrls = cssFiles.map(file => `/kits/${userIdStr}/${file}`);

        res.status(200).json({ files: fileUrls });
    });
};

exports.deleteCssFile = (req, res) => {
    const { userId, fileName } = req.params;
    if (!userId || !fileName) {
        return res.status(400).json({ error: 'Paramètres userId ou fileName manquants.' });
    }

    const userIdStr = String(userId);
    const filePath = path.join(__dirname, '../public/kits', userIdStr, fileName);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Fichier non trouvé.' });
    }

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Erreur lors de la suppression du fichier:', err);
            return res.status(500).json({ error: 'Erreur lors de la suppression du fichier.' });
        }

        res.status(200).json({ message: 'Fichier supprimé avec succès.' });
    });
};