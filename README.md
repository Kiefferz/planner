# ⚽ Football Planner - Planner rapide pour Football Manager

Application web légère et rapide pour gérer les formations tactiques de football, conçue spécialement pour **Football Manager (FM)**.

## 🎯 Objectif du projet

Ce planner a été créé pour répondre à un besoin spécifique : **préparer rapidement son mercato dans Football Manager** sans avoir à multiplier les clics dans le jeu.

### Pourquoi ce planner ?

- **Double écran** : Utilisez-le sur votre second écran pendant que vous jouez à FM
- **Rapidité** : Ciblez les postes clés instantanément sans naviguer dans les menus du jeu
- **Fiabilité** : Le planner intégré à FM est souvent bugué et inexploitable
- **Simplicité** : Interface épurée, focus sur l'essentiel

### Cas d'usage

Lors de la préparation de votre mercato, vous pouvez rapidement visualiser :
- Les postes où vous avez de la profondeur (3 joueurs)
- Les postes critiques à renforcer (moins de 3 joueurs)
- La répartition de votre effectif par position

Tout cela sans quitter votre partie FM ni perdre de temps dans les menus du jeu.

## 📋 Fonctionnalités

- **Formation tactique 4-2-3-1** : Visualisation claire des positions sur le terrain
- **Gestion de la profondeur** : 3 joueurs par poste (titulaire + 2 remplaçants) pour identifier rapidement les besoins
- **Logo d'équipe** : Personnalisation avec logo via URL
- **Informations équipe** : Nom de l'équipe et saison
- **Export/Import JSON** : Sauvegardez vos formations et partagez-les
- **Sauvegarde automatique** : Données sauvegardées automatiquement dans le navigateur

## 🏗️ Structure du projet

```
planner/
├── index.html          # Page principale
├── css/
│   └── style.css       # Styles CSS
├── js/
│   └── app.js          # Logique JavaScript
├── assets/
│   └── pitch.png       # Image du terrain
├── README.md           # Documentation
├── .nojekyll           # Configuration GitHub Pages
└── .gitignore          # Fichiers ignorés par Git
```

## 🚀 Installation

1. Clonez le dépôt ou téléchargez les fichiers
2. Assurez-vous que `pitch.png` est dans le dossier `assets/`
3. Ouvrez `index.html` dans un navigateur

**Ou utilisez directement la version en ligne** : [https://kiefferz.github.io/planner/](https://kiefferz.github.io/planner/)

## 📖 Utilisation

### Configuration de l'équipe

- **Logo** : Saisissez l'URL de l'image du logo. L'image se charge automatiquement. Cliquez sur l'image pour modifier l'URL.
- **Nom équipe** : Saisissez le nom de votre équipe
- **Saison** : Indiquez la saison (ex: 2024/2025)

### Gestion des joueurs

- Remplissez les champs pour chaque position (titulaire + 2 remplaçants)
- **3 joueurs par poste** : Permet d'identifier rapidement la profondeur de votre effectif
- Les données sont sauvegardées automatiquement dans le navigateur

### Export/Import

- **Exporter** : Télécharge un fichier JSON avec toutes les données (joueurs, logo, nom équipe, saison)
- **Importer** : Charge un fichier JSON précédemment exporté
- **Vider** : Réinitialise tous les champs

## 🎯 Positions disponibles (Formation 4-2-3-1)

- **GB** : Gardien de but
- **DG** : Défenseur gauche
- **DC** : Défenseur central (2 positions)
- **DD** : Défenseur droit
- **MDC** : Milieu défensif (2 positions)
- **AIG** : Ailier gauche / Attaquant intérieur gauche
- **MOC** : Milieu offensif central
- **AID** : Ailier droit
- **BU** : Buteur / Attaquant de pointe

## 🔮 Axes d'amélioration

### Formation actuelle
- ✅ **4-2-3-1** : Formation disponible et fonctionnelle

### À venir
- 🔄 **Autres formations** : D'autres formations tactiques seront ajoutées progressivement
- 🔄 **Personnalisation** : Possibilité de créer ses propres formations
- 🔄 **Statistiques** : Analyse de la profondeur par poste

## 🌐 Hébergement GitHub Pages

Le projet est hébergé gratuitement sur GitHub Pages :

**Site en ligne** : [https://kiefferz.github.io/planner/](https://kiefferz.github.io/planner/)

### Pour héberger votre propre version

1. Créez un dépôt GitHub (public)
2. Uploadez tous les fichiers
3. Allez dans Settings → Pages
4. Sélectionnez la branche `main` et le dossier `/ (root)`
5. Votre site sera accessible à : `https://votre-username.github.io/nom-du-repo/`

## 📝 Format des données

Le fichier JSON exporté contient :

```json
{
  "formation": "4-2-3-1",
  "logoUrl": "https://...",
  "teamName": "Nom équipe",
  "season": "2024/2025",
  "players": {
    "gb": { "0": "Joueur1", "1": "Joueur2", "2": "Joueur3" },
    "dg": { "0": "Joueur1", "1": "Joueur2", "2": "Joueur3" },
    ...
  },
  "exportDate": "2024-12-05T..."
}
```

## 🛠️ Technologies

- **HTML5** : Structure de la page
- **CSS3** : Styles et mise en page
- **JavaScript (Vanilla)** : Logique de l'application
- **LocalStorage API** : Sauvegarde automatique
- **File API** : Export/Import de fichiers JSON

## 📄 Licence

Libre d'utilisation pour usage personnel et professionnel.

---

**Créé pour simplifier la préparation de mercato dans Football Manager** ⚽
