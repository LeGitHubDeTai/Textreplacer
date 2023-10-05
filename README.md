# Recherche et Remplacement de Texte dans des Fichiers Récurssifs

Ce programme Node.js permet de parcourir récursivement un dossier, de lister les dossiers et fichiers qu'il contient, puis d'effectuer une recherche et un remplacement de texte dans les fichiers.

## Configuration

1. Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé sur votre système.

2. Clonez ou téléchargez ce repository sur votre machine.

3. Installez les dépendances en exécutant la commande suivante dans le répertoire du projet :

```bash
npm install
```

4. Créez un fichier `.env` dans le même répertoire que votre code avec les variables d'environnement suivantes :

```env
dir=/chemin/vers/le/dossier/racine
mode=null
intext=texte1,texte2,texte3
outext=texte_de_remplacement
```

- `dir`: Le chemin du dossier racine que vous souhaitez scanner.
- `mode`: Le mode d'exécution ('null' pour l'exécution normale, 'one' pour rechercher le texte complet).
- `intext`: Une liste de textes à rechercher (séparés par des virgules).
- `outext`: Le texte de remplacement.

## Utilisation

1. Une fois la configuration terminée, exécutez le programme en utilisant la commande suivante :

```bash
npm start
```

2. Le programme commencera à scanner le dossier racine spécifié récursivement.

3. Pour chaque fichier, il effectuera une recherche de tous les textes spécifiés dans `intext` et les remplacera par le texte spécifié dans `outext`. Les fichiers modifiés seront enregistrés avec les modifications.

4. Le programme affichera également les fichiers dans lesquels les remplacements ont été effectués.

## Exemple

Supposons que vous ayez configuré le fichier `.env` de la manière suivante :

```env
dir=./exemple
intext=chercher1,chercher2
outext=remplacer
```

Lors de l'exécution du programme, il recherchera "chercher1" et "chercher2" dans tous les fichiers du dossier `./exemple` et de ses sous-dossiers, les remplacera par "remplacer", puis enregistrera les fichiers modifiés.

## Avertissement

Assurez-vous de faire une copie de sauvegarde de vos fichiers avant d'exécuter ce programme, car il peut entraîner des modifications permanentes dans vos fichiers.

## Licence

Ce programme est sous licence MIT. Consultez le fichier `LICENSE` pour plus de détails.
