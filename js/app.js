/**
 * Football Planner Application
 * Gestion de la formation tactique 4-2-3-1
 */

// Formation actuelle
let currentFormation = '4-2-3-1';

// Mapping des labels pour chaque position
const positionLabels = {
    'gb': 'GB',
    'dg': 'DG',
    'dd': 'DD',
    'dc': 'DC',
    'dc-left': 'DC',
    'dc-right': 'DC',
    'dc-top': 'DC',
    'dc-middle': 'DC',
    'dc-bottom': 'DC',
    'dcg': 'DCG',
    'dcd': 'DCD',
    'mg': 'MG',
    'mc': 'MC',
    'md': 'MD',
    'mcg': 'MCG',
    'mcd': 'MCD',
    'mdc': 'MDC',
    'mdc-left': 'MDC',
    'mdc-right': 'MDC',
    'mdc-top': 'MDC',
    'mdc-bottom': 'MDC',
    'moc': 'MOC',
    'aig': 'AIG',
    'aid': 'AID',
    'alg': 'ALG',
    'ald': 'ALD',
    'bu': 'BU',
    'bu-left': 'BU',
    'bu-right': 'BU',
    'bu-top': 'BU',
    'bu-bottom': 'BU'
};

// Stockage des valeurs des inputs avant changement de formation
let savedPlayerValues = {};

// ============================================
// GESTION DES FORMATIONS
// ============================================

/**
 * Met à jour l'alerte visuelle pour une position selon le nombre de joueurs remplis
 * @param {string} positionKey - Clé de la position (ex: 'gb', 'dg')
 */
function updatePositionAlert(positionKey) {
    const positionDiv = document.querySelector(`.position-${positionKey}`);
    if (!positionDiv) return;
    
    const positionBox = positionDiv.querySelector('.position-box');
    const inputs = positionDiv.querySelectorAll('.player-input');
    const alertIcon = positionDiv.querySelector('.alert-icon');
    
    if (!positionBox || !inputs || !alertIcon) return;
    
    // Compter le nombre de joueurs remplis
    let filledCount = 0;
    inputs.forEach(input => {
        if (input.value.trim() !== '') {
            filledCount++;
        }
    });
    
    // Retirer toutes les classes d'alerte
    positionBox.classList.remove('alert-danger', 'alert-warning');
    alertIcon.textContent = '';
    alertIcon.className = 'alert-icon';
    
    // Appliquer les classes et icônes selon le nombre de joueurs
    if (filledCount < 2) {
        // Moins de 2 joueurs : rouge + icône danger
        positionBox.classList.add('alert-danger');
        alertIcon.textContent = '⚠️';
        alertIcon.className = 'alert-icon alert-icon-danger';
    } else if (filledCount < 3) {
        // Moins de 3 joueurs (donc 2) : orange + icône warning
        positionBox.classList.add('alert-warning');
        alertIcon.textContent = '⚡';
        alertIcon.className = 'alert-icon alert-icon-warning';
    }
    // Si 3 joueurs remplis, on laisse le style par défaut
}

/**
 * Sauvegarde les valeurs actuelles des inputs
 */
function saveCurrentPlayerValues() {
    savedPlayerValues = {};
    document.querySelectorAll('.player-input').forEach(input => {
        const position = input.getAttribute('data-position');
        const index = input.getAttribute('data-index');
        const value = input.value.trim();
        if (value) {
            if (!savedPlayerValues[position]) {
                savedPlayerValues[position] = {};
            }
            savedPlayerValues[position][index] = value;
        }
    });
}

/**
 * Crée un élément de position HTML
 * @param {string} positionKey - Clé de la position (ex: 'gb', 'dg')
 * @param {object} layout - Configuration de positionnement
 * @returns {HTMLElement} Élément de position créé
 */
function createPositionElement(positionKey, layout) {
    const positionDiv = document.createElement('div');
    positionDiv.className = `position-${positionKey}`;
    positionDiv.style.position = 'absolute';
    
    if (layout.top) positionDiv.style.top = layout.top;
    if (layout.left) positionDiv.style.left = layout.left;
    if (layout.right) positionDiv.style.right = layout.right;
    if (layout.transform) {
        positionDiv.style.transform = layout.transform;
    }
    
    const positionBox = document.createElement('div');
    positionBox.className = 'position-box';
    
    const label = document.createElement('div');
    label.className = 'position-label';
    
    // Créer un conteneur pour le texte et l'icône
    const labelText = document.createElement('span');
    labelText.textContent = positionLabels[positionKey] || positionKey.toUpperCase();
    label.appendChild(labelText);
    
    // Créer un conteneur pour l'icône d'alerte (sera ajouté dynamiquement)
    const alertIcon = document.createElement('span');
    alertIcon.className = 'alert-icon';
    label.appendChild(alertIcon);
    
    positionBox.appendChild(label);
    
    // Créer 3 inputs pour chaque position
    for (let i = 0; i < 3; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'player-input';
        input.setAttribute('data-position', positionKey);
        input.setAttribute('data-index', i.toString());
        input.placeholder = (i + 1).toString();
        
        // Restaurer la valeur sauvegardée si elle existe
        if (savedPlayerValues[positionKey] && savedPlayerValues[positionKey][i.toString()]) {
            input.value = savedPlayerValues[positionKey][i.toString()];
        }
        
        // Ajouter l'écouteur pour sauvegarder automatiquement et mettre à jour l'alerte
        input.addEventListener('input', function() {
            saveToLocalStorage();
            updatePositionAlert(positionKey);
        });
        
        positionBox.appendChild(input);
    }
    
    // Mettre à jour l'alerte après création
    updatePositionAlert(positionKey);
    
    positionDiv.appendChild(positionBox);
    return positionDiv;
}

/**
 * Change la formation tactique
 * @param {string} formation - Nom de la formation (ex: '4-2-3-1')
 */
function changeFormation(formation, skipSaveCurrent = false) {
    if (typeof formations === 'undefined') {
        console.error('Le fichier formations.js n\'est pas chargé');
        return;
    }
    
    if (!formations[formation]) {
        console.error('Formation inconnue:', formation);
        return;
    }

    // Sauvegarder les valeurs actuelles avant de changer (sauf si on charge depuis localStorage/import)
    if (!skipSaveCurrent) {
        saveCurrentPlayerValues();
    }

    currentFormation = formation;
    const config = formations[formation];
    const fieldContainer = document.getElementById('fieldContainer');
    
    if (!fieldContainer) {
        console.error('Le conteneur field-container n\'existe pas');
        return;
    }

    // Vider le conteneur
    fieldContainer.innerHTML = '';

    // Créer et ajouter chaque position
    config.positions.forEach(positionKey => {
        if (config.layout[positionKey]) {
            const positionElement = createPositionElement(positionKey, config.layout[positionKey]);
            fieldContainer.appendChild(positionElement);
        }
    });

    // Restaurer les valeurs sauvegardées après création
    // Utiliser setTimeout pour s'assurer que le DOM est complètement rendu
    setTimeout(() => {
        Object.keys(savedPlayerValues).forEach(position => {
            Object.keys(savedPlayerValues[position]).forEach(index => {
                const input = document.querySelector(`[data-position="${position}"][data-index="${index}"]`);
                if (input) {
                    input.value = savedPlayerValues[position][index];
                }
            });
        });

        // Mettre à jour les alertes pour toutes les positions après restauration
        config.positions.forEach(positionKey => {
            updatePositionAlert(positionKey);
        });

        // Sauvegarder dans localStorage APRÈS avoir restauré les valeurs
        saveToLocalStorage();
    }, 50);

    // Mettre à jour le select
    const select = document.getElementById('formationSelect');
    if (select) {
        select.value = formation;
    }
}

// ============================================
// GESTION DU LOGO
// ============================================

/**
 * Charge le logo depuis une URL
 * @param {string} url - URL de l'image du logo
 */
function loadLogo(url) {
    if (!url || url.trim() === '') return;
    
    const logoImg = document.getElementById('teamLogo');
    const logoInput = document.getElementById('logoUrlInput');
    
    logoImg.onload = function() {
        // Image chargée avec succès
        logoImg.classList.remove('hidden');
        logoInput.classList.add('hidden');
        saveToLocalStorage();
    };
    
    logoImg.onerror = function() {
        // Erreur de chargement        
        logoInput.value = ''; // Garder l'URL dans l'input
    };
    
    logoImg.src = url.trim();
}

/**
 * Édite le logo (clic sur l'image)
 */
function editLogo() {
    const logoImg = document.getElementById('teamLogo');
    const logoInput = document.getElementById('logoUrlInput');
    
    logoInput.value = logoImg.src || '';
    logoInput.classList.remove('hidden');
    logoImg.classList.add('hidden');
    logoInput.focus();
}

// ============================================
// UTILITAIRES
// ============================================

/**
 * Récupère un paramètre depuis l'URL
 * @param {string} name - Nom du paramètre
 * @returns {string|null} Valeur du paramètre ou null
 */
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// ============================================
// EXPORT / IMPORT
// ============================================

/**
 * Exporte les données de la formation en JSON
 */
function exportData() {
    const players = {};
    const inputs = document.querySelectorAll('.player-input');
    
    inputs.forEach(input => {
        const position = input.getAttribute('data-position');
        const index = input.getAttribute('data-index');
        const name = input.value.trim();
        if (name) {
            if (!players[position]) {
                players[position] = {};
            }
            players[position][index] = name;
        }
    });

    const logoUrl = document.getElementById('teamLogo').src || '';
    const teamName = document.getElementById('teamName').value.trim() || '';
    const season = document.getElementById('season').value.trim() || '';

    const data = {
        formation: currentFormation,
        logoUrl: logoUrl,
        teamName: teamName,
        season: season,
        players: players,
        exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    // Générer le nom du fichier : nom_equipe_saisonxxxx_xxxx.json
    // Fonction pour nettoyer le texte (remplacer espaces et caractères spéciaux par _)
    function sanitizeFileName(text) {
        return text
            .replace(/[^a-zA-Z0-9]/g, '_') // Remplacer tous les caractères non alphanumériques par _
            .replace(/_+/g, '_') // Remplacer les underscores multiples par un seul
            .replace(/^_|_$/g, ''); // Supprimer les underscores en début et fin
    }
    
    // Construire le nom du fichier
    const cleanTeamName = sanitizeFileName(teamName || 'equipe');
    let cleanSeason = '';
    
    if (season) {
        // Extraire les années de la saison (format: "Saison 2023/2024" ou "2023/2024" ou "2023-2024")
        const seasonMatch = season.match(/(\d{4})[\/\-](\d{4})/);
        if (seasonMatch) {
            cleanSeason = `${seasonMatch[1]}_${seasonMatch[2]}`;
        } else {
            // Si le format n'est pas reconnu, nettoyer la saison telle quelle
            cleanSeason = sanitizeFileName(season);
        }
    }
    
    // Construire le nom final
    let fileName = '';
    if (cleanSeason) {
        fileName = `${cleanTeamName}_saison${cleanSeason}.json`;
    } else {
        fileName = `${cleanTeamName}.json`;
    }
    
    // Si le nom est vide, utiliser un nom par défaut
    if (!fileName || fileName === '.json') {
        fileName = `formation-football-${new Date().toISOString().split('T')[0]}.json`;
    }
    
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert('✅ Données exportées avec succès !');
}

/**
 * Importe les données depuis un fichier JSON
 * @param {Event} event - Événement de changement de fichier
 */
function importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.players) {
                // Charger les informations de l'équipe
                const logoImg = document.getElementById('teamLogo');
                const logoInput = document.getElementById('logoUrlInput');
                
                if (data.logoUrl && data.logoUrl.trim() !== '' && data.logoUrl !== 'assets/fm_planner.png') {
                    // Charger le logo personnalisé
                    logoInput.value = data.logoUrl;
                    loadLogo(data.logoUrl);
                } else {
                    // Afficher le logo par défaut
                    if (logoImg && logoInput) {
                        logoImg.src = 'assets/fm_planner.png';
                        logoImg.classList.remove('hidden');
                        logoInput.value = '';
                        logoInput.classList.add('hidden');
                    }
                }
                
                if (data.teamName) {
                    document.getElementById('teamName').value = data.teamName;
                }
                if (data.season) {
                    document.getElementById('season').value = data.season;
                }

                // Charger les joueurs dans savedPlayerValues pour qu'ils soient restaurés après création
                savedPlayerValues = {};
                Object.keys(data.players).forEach(position => {
                    const positionData = data.players[position];
                    savedPlayerValues[position] = {};
                    // Support ancien format (array) et nouveau format (object)
                    if (Array.isArray(positionData)) {
                        positionData.forEach((name, index) => {
                            if (name) {
                                savedPlayerValues[position][index.toString()] = name;
                            }
                        });
                    } else if (typeof positionData === 'object' && positionData !== null) {
                        Object.keys(positionData).forEach(index => {
                            if (positionData[index]) {
                                savedPlayerValues[position][index] = positionData[index];
                            }
                        });
                    }
                });

                // Charger la formation (les valeurs seront restaurées automatiquement)
                // Passer skipSaveCurrent=true pour ne pas écraser savedPlayerValues
                if (data.formation && typeof formations !== 'undefined' && formations[data.formation]) {
                    document.getElementById('formationSelect').value = data.formation;
                    changeFormation(data.formation, true);
                } else {
                    // Si pas de formation, utiliser la formation actuelle
                    changeFormation(currentFormation, true);
                }

                alert('✅ Données importées avec succès !');
            } else {
                alert('❌ Format de fichier invalide. Le fichier doit contenir un objet "players".');
            }
        } catch (error) {
            alert('❌ Erreur lors de l\'importation : ' + error.message);
        }
    };
    reader.readAsText(file);
    
    // Réinitialiser l'input file pour permettre de réimporter le même fichier
    event.target.value = '';
}

// ============================================
// LOCALSTORAGE
// ============================================

/**
 * Sauvegarde les données dans le localStorage
 */
function saveToLocalStorage() {
    const players = {};
    document.querySelectorAll('.player-input').forEach(input => {
        const position = input.getAttribute('data-position');
        const index = input.getAttribute('data-index');
        const name = input.value.trim();
        if (name) {
            if (!players[position]) {
                players[position] = {};
            }
            players[position][index] = name;
        }
    });

    const logoUrl = document.getElementById('teamLogo').src || '';
    const teamName = document.getElementById('teamName').value.trim() || '';
    const season = document.getElementById('season').value.trim() || '';

    const data = {
        formation: currentFormation,
        logoUrl: logoUrl,
        teamName: teamName,
        season: season,
        players: players
    };

    localStorage.setItem('footballFormation', JSON.stringify(data));
}

/**
 * Charge les données depuis le localStorage
 */
function loadFromLocalStorage() {
    const saved = localStorage.getItem('footballFormation');
    if (saved) {
        try {
            const data = JSON.parse(saved);

            // Charger les infos équipe
            const logoImg = document.getElementById('teamLogo');
            const logoInput = document.getElementById('logoUrlInput');
            
            if (data.logoUrl && data.logoUrl !== 'assets/fm_planner.png' && data.logoUrl.trim() !== '') {
                // Charger le logo personnalisé sauvegardé
                logoInput.value = data.logoUrl;
                loadLogo(data.logoUrl);
            } else {
                // Afficher le logo par défaut si aucun logo personnalisé n'est sauvegardé
                if (logoImg && logoInput) {
                    logoImg.src = 'assets/fm_planner.png';
                    logoImg.classList.remove('hidden');
                    logoInput.value = '';
                    logoInput.classList.add('hidden');
                }
            }
            if (data.teamName) {
                document.getElementById('teamName').value = data.teamName;
            }
            if (data.season) {
                document.getElementById('season').value = data.season;
            }

            // Charger les joueurs dans savedPlayerValues pour qu'ils soient restaurés après création
            const players = data.players || data; // Support ancien format
            if (players && typeof players === 'object') {
                savedPlayerValues = {};
                Object.keys(players).forEach(position => {
                    const positionData = players[position];
                    savedPlayerValues[position] = {};
                    // Support ancien format (array) et nouveau format (object)
                    if (Array.isArray(positionData)) {
                        positionData.forEach((name, index) => {
                            if (name) {
                                savedPlayerValues[position][index.toString()] = name;
                            }
                        });
                    } else if (typeof positionData === 'object') {
                        Object.keys(positionData).forEach(index => {
                            if (positionData[index]) {
                                savedPlayerValues[position][index] = positionData[index];
                            }
                        });
                    }
                });
            }
        } catch (error) {
            console.error('Erreur lors du chargement:', error);
        }
    }
}

// ============================================
// VIDER LES DONNÉES
// ============================================

/**
 * Vide tous les champs et réinitialise l'application
 */
function clearAllData() {
    // Demander confirmation
    if (!confirm('⚠️ Êtes-vous sûr de vouloir vider tous les champs ? Cette action est irréversible.')) {
        return;
    }

    // Vider tous les champs de joueurs
    document.querySelectorAll('.player-input').forEach(input => {
        input.value = '';
    });

    // Vider les champs équipe
    document.getElementById('teamName').value = '';
    document.getElementById('season').value = '';

    // Réinitialiser le logo
    const logoImg = document.getElementById('teamLogo');
    const logoInput = document.getElementById('logoUrlInput');
    
    // Vider l'input du logo
    if (logoInput) {
        logoInput.value = '';
    }
    
    // Réinitialiser au logo par défaut
    if (logoImg) {
        logoImg.src = 'assets/fm_planner.png';
        logoImg.classList.remove('hidden');
    }
    if (logoInput) {
        logoInput.value = '';
        logoInput.classList.add('hidden');
    }

    // Vider le localStorage
    localStorage.removeItem('footballFormation');

    alert('✅ Tous les champs ont été vidés !');
}

// ============================================
// DARK MODE
// ============================================

/**
 * Bascule entre le mode clair et sombre
 */
function toggleDarkMode() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const isDarkMode = themeToggle.checked;
    
    if (isDarkMode) {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
    
    // Sauvegarder la préférence
    localStorage.setItem('darkMode', isDarkMode);
}

/**
 * Charge le thème depuis le localStorage
 */
function loadTheme() {
    const savedTheme = localStorage.getItem('darkMode');
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    
    if (savedTheme === 'true') {
        body.classList.add('dark-mode');
        themeToggle.checked = true;
    } else {
        body.classList.remove('dark-mode');
        themeToggle.checked = false;
    }
}

// ============================================
// DROPDOWN SETTINGS
// ============================================

/**
 * Bascule l'affichage du menu déroulant des paramètres
 */
function toggleSettingsDropdown() {
    const menu = document.getElementById('settingsMenu');
    menu.classList.toggle('show');
}

/**
 * Ferme le menu déroulant si on clique en dehors
 */
document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.settings-dropdown');
    const menu = document.getElementById('settingsMenu');
    
    if (dropdown && !dropdown.contains(event.target) && menu.classList.contains('show')) {
        menu.classList.remove('show');
    }
});

// ============================================
// INITIALISATION
// ============================================

/**
 * Initialise l'application au chargement de la page
 */
function init() {
    console.log('Initialisation de l\'application...');
    console.log('Formations disponibles:', typeof formations !== 'undefined' ? Object.keys(formations) : 'NON CHARGÉES');
    
    // Vérifier que formations.js est chargé
    if (typeof formations === 'undefined') {
        console.error('Le fichier formations.js n\'est pas chargé, réessai dans 100ms...');
        setTimeout(init, 100);
        return;
    }
    
    // Vérifier que le DOM est prêt
    if (!document.getElementById('formationSelect')) {
        console.error('Le DOM n\'est pas prêt, réessai dans 100ms...');
        setTimeout(init, 100);
        return;
    }
    
    // Vérifier que le conteneur existe
    if (!document.getElementById('fieldContainer')) {
        console.error('Le conteneur fieldContainer n\'existe pas, réessai dans 100ms...');
        setTimeout(init, 100);
        return;
    }

    // Afficher le logo par défaut au démarrage
    const logoImg = document.getElementById('teamLogo');
    const logoInput = document.getElementById('logoUrlInput');
    if (logoImg && logoInput) {
        // Le logo par défaut est déjà dans le HTML, on s'assure qu'il est visible
        logoImg.classList.remove('hidden');
        logoInput.classList.add('hidden');
    }

    // Charger le logo depuis l'URL si présent (surcharge le logo par défaut)
    const logoUrl = getUrlParameter('logo');
    if (logoUrl) {
        document.getElementById('logoUrlInput').value = decodeURIComponent(logoUrl);
        loadLogo(decodeURIComponent(logoUrl));
    }

    // Écouter la saisie dans l'input logo
    document.getElementById('logoUrlInput').addEventListener('blur', function() {
        const url = this.value.trim();
        if (url) {
            loadLogo(url);
        }
    });

    // Charger le logo avec Enter
    document.getElementById('logoUrlInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const url = this.value.trim();
            if (url) {
                loadLogo(url);
            }
        }
    });

    // Les event listeners sont ajoutés lors de la création des positions dans createPositionElement

    // Sauvegarder les infos équipe
    document.getElementById('teamName').addEventListener('input', saveToLocalStorage);
    document.getElementById('season').addEventListener('input', saveToLocalStorage);
    
    // Écouter le changement de formation
    document.getElementById('formationSelect').addEventListener('change', function() {
        changeFormation(this.value);
    });

    // Charger le thème
    loadTheme();

    // Charger les données depuis le localStorage AVANT de créer la formation
    // Cela permet de charger les valeurs des joueurs dans savedPlayerValues
    loadFromLocalStorage();

    // Charger la formation depuis le localStorage ou utiliser la formation par défaut
    const savedData = localStorage.getItem('footballFormation');
    let formationToLoad = '4-2-3-1'; // Formation par défaut
    
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            if (data.formation && typeof formations !== 'undefined' && formations[data.formation]) {
                formationToLoad = data.formation;
            }
        } catch (e) {
            console.error('Erreur lors du chargement de la formation:', e);
        }
    }
    
    // Initialiser la formation (les valeurs seront restaurées automatiquement)
    // Passer skipSaveCurrent=true car on charge depuis localStorage
    console.log('Chargement de la formation:', formationToLoad);
    changeFormation(formationToLoad, true);
    
    console.log('Initialisation terminée');
}

// Initialiser l'application quand le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // DOM déjà chargé
    window.addEventListener('load', init);
}

