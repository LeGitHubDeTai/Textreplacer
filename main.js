/*-----------------------------------------------------------------------------------------------------------\
|  _____     _   _____ _             _ _          _____  _____  _____  __      _______  _____  _____  _____  |
| |_   _|   (_) /  ___| |           | (_)        / __  \|  _  |/ __  \/  |    / / __  \|  _  |/ __  \|____ | |
|   | | __ _ _  \ `--.| |_ _   _  __| |_  ___    `' / /'| |/' |`' / /'`| |   / /`' / /'| |/' |`' / /'    / / |
|   | |/ _` | |  `--. \ __| | | |/ _` | |/ _ \     / /  |  /| |  / /   | |  / /   / /  |  /| |  / /      \ \ |
|   | | (_| | | /\__/ / |_| |_| | (_| | | (_) |  ./ /___\ |_/ /./ /____| |_/ /  ./ /___\ |_/ /./ /___.___/ / |
|   \_/\__,_|_| \____/ \__|\__,_|\__,_|_|\___/   \_____/ \___/ \_____/\___/_/   \_____/ \___/ \_____/\____/  |
\-----------------------------------------------------------------------------------------------------------*/
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const rootDir = process.env.dir || './out'; // Dossier racine par défaut
const searchTextArray = process.env.intext ? process.env.intext.split(',') : [];
const replaceText = process.env.outext || '';

function listFilesRecursively(dir) {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            console.log(`Dossier: ${filePath}`);
            listFilesRecursively(filePath);
        } else if (stats.isFile()) {
            console.log(`Fichier: ${filePath}`);

            const fileExtension = path.extname(filePath).toLowerCase();

            const IMAGE_VIDEO_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.mp4', '.avi', '.svg'];

            // Vérifiez si le fichier est une image ou une vidéo
            if (IMAGE_VIDEO_EXTENSIONS.includes(fileExtension)) {
                console.log(`Le fichier ${filePath} est une image ou une vidéo. Le remplacement de liens est ignoré.`);
                return; // Ne faites rien si c'est une image ou une vidéo
            }

            let fileContent = fs.readFileSync(filePath, 'utf8');
            let replaced = true;

            while (replaced) {
                replaced = false;
                searchTextArray.forEach(searchText => {
                    if (fileContent.includes(searchText)) {
                        console.log(`Trouvé dans le fichier: ${filePath}`);
                        fileContent = fileContent.replace(searchText, replaceText);
                        replaced = true;
                    }
                });
            }

            // Écrire le contenu modifié dans le fichier
            fs.writeFileSync(filePath, fileContent, 'utf8');
        }
    });
}

console.log(`Scanning directory: ${rootDir}`);
listFilesRecursively(rootDir);
console.log('Done');
