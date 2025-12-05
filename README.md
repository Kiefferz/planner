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

### Formations tactiques
- **7 formations disponibles** : 4-2-3-1, 3-4-3, 3-5-2, 4-3-3, 4-1-3-2, 4-4-2, 4-1-4-1
- **Sélection dynamique** : Changez de formation à tout moment sans perdre vos données

### Système d'alerte visuelle
- 🔴 **Rouge** : Moins de 2 joueurs (manque critique de profondeur) - Icône ⚠️
- 🟠 **Orange** : 2 joueurs (profondeur limitée, risque en cas de blessure) - Icône ⚡
- ⚪ **Normal** : 3 joueurs remplis (profondeur suffisante)

Les alertes se mettent à jour en temps réel lors de la saisie, vous permettant d'identifier instantanément les postes nécessitant du renfort.

### Gestion de la profondeur
- **3 joueurs par poste** : Visualisez la profondeur de banc pour chaque position (titulaire + 2 remplaçants)
- **Identification rapide** : Les alertes visuelles vous indiquent immédiatement les postes à renforcer

### Informations de l'équipe
- **Logo personnalisé** : Chargez un logo depuis une URL (logo par défaut FM Planner inclus)
- **Nom de l'équipe** : Enregistrez le nom de votre équipe
- **Saison** : Indiquez la saison en cours (ex: 2024/2025)

### Export/Import
- **Exporter votre équipe** : Exporter votre équipe pour la charger plus tard (utile si plusieurs save)
- **Import rapide** : Chargez vos formations précédentes en un clic
- **Sauvegarde automatique** : Toutes les modifications sont sauvegardées automatiquement dans le navigateur
- **Persistance** : Vos données sont conservées même après un rafraîchissement de page (F5)

### Interface
- **Design moderne** : Interface épurée avec effets glassmorphism et animations
- **Dark mode** : Basculez entre mode clair et sombre avec un switch
- **Menu paramètres** : Accès rapide à l'export, l'import et la fonction de vidage


## 🚀 Installation

**Utilisez directement la version en ligne** : [https://kiefferz.github.io/planner/](https://kiefferz.github.io/planner/)

## 📖 Utilisation

### Configuration de l'équipe

- **Logo** : Saisissez l'URL de l'image du logo dans le champ prévu. L'image se charge automatiquement. Cliquez sur l'image pour modifier l'URL. Le logo par défaut FM Planner s'affiche si aucun logo n'est chargé.
- **Nom équipe** : Saisissez le nom de votre équipe
- **Saison** : Indiquez la saison (ex: 2024/2025 ou Saison 2024/2025)
- **Formation** : Sélectionnez la formation tactique souhaitée dans le menu déroulant

### Gestion des joueurs

- Remplissez les champs pour chaque position (3 joueurs par poste)
- **Système d'alerte** : Surveillez les couleurs des cadres pour identifier rapidement les postes à renforcer
  - Cadre rouge = moins de 2 joueurs (critique)
  - Cadre orange = 2 joueurs (attention)
  - Cadre normal = 3 joueurs (OK)
- Les données sont sauvegardées automatiquement dans le navigateur à chaque modification

### Export/Import

- **Exporter** : Télécharge un fichier JSON avec toutes les données (joueurs, logo, nom équipe, saison, formation)
  - Le nom du fichier est généré automatiquement : `nom_equipe_saison2024_2025.json`
- **Importer** : Charge un fichier JSON précédemment exporté
  - Les données sont restaurées automatiquement (formation, joueurs, infos équipe)
- **Vider** : Réinitialise tous les champs (avec confirmation)

### Astuces

- Les données sont sauvegardées automatiquement à chaque modification
- Utilisez le bouton "Vider" dans le menu Paramètres pour réinitialiser tous les champs
- Cliquez sur le logo pour le modifier
- Les alertes se mettent à jour en temps réel lors de la saisie
- Vos données sont conservées même après un rafraîchissement de page (F5)


## 🔮 Axes d'amélioration

### À venir
- 🔄 **Formations personnalisées** : Possibilité de créer ses propres formations
- 🔄 **Statistiques** : Analyse de la profondeur par poste et recommandations
- 🔄 **Personnalisation de la profondeur de banc** : Possibilité de personnalisé sa profondeur de banc (actuellement a 3) + personnalisation des seuils d'alerte de profondeur

## 🌐 Hébergement GitHub Pages

Le projet est hébergé gratuitement sur GitHub Pages :

**Site en ligne** : [https://kiefferz.github.io/planner/](https://kiefferz.github.io/planner/)



## 🛠️ Technologies

- **HTML5** : Structure de la page
- **CSS3** : Styles, animations, transitions, glassmorphism, dark mode
- **JavaScript (Vanilla ES6+)** : Logique de l'application
- **LocalStorage API** : Sauvegarde automatique et persistance
- **File API** : Export/Import de fichiers JSON
- **FileReader API** : Lecture des fichiers importés

## 📄 Licence

Libre d'utilisation.

---

**Créé pour simplifier la préparation de mercato dans Football Manager** ⚽
