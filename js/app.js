/**
 * Football Planner Application
 * Gestion de la formation tactique 4-2-3-1
 */

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
        alert('❌ Impossible de charger l\'image. Vérifiez l\'URL.');
        logoInput.value = url; // Garder l'URL dans l'input
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
        formation: '4-2-3-1',
        logoUrl: logoUrl,
        teamName: teamName,
        season: season,
        players: players,
        exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `formation-football-${new Date().toISOString().split('T')[0]}.json`;
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
                if (data.logoUrl) {
                    document.getElementById('logoUrlInput').value = data.logoUrl;
                    loadLogo(data.logoUrl);
                }
                if (data.teamName) {
                    document.getElementById('teamName').value = data.teamName;
                }
                if (data.season) {
                    document.getElementById('season').value = data.season;
                }

                // Réinitialiser tous les champs
                const inputs = document.querySelectorAll('.player-input');
                inputs.forEach(input => input.value = '');

                // Remplir les champs avec les données importées
                Object.keys(data.players).forEach(position => {
                    const positionData = data.players[position];
                    // Support ancien format (array) et nouveau format (object)
                    if (Array.isArray(positionData)) {
                        positionData.forEach((name, index) => {
                            const input = document.querySelector(`[data-position="${position}"][data-index="${index}"]`);
                            if (input) {
                                input.value = name;
                            }
                        });
                    } else {
                        Object.keys(positionData).forEach(index => {
                            const input = document.querySelector(`[data-position="${position}"][data-index="${index}"]`);
                            if (input) {
                                input.value = positionData[index];
                            }
                        });
                    }
                });

                // Sauvegarder dans localStorage
                saveToLocalStorage();

                alert('✅ Données importées avec succès !');
            } else {
                alert('❌ Format de fichier invalide.');
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
            if (data.logoUrl) {
                document.getElementById('logoUrlInput').value = data.logoUrl;
                loadLogo(data.logoUrl);
            }
            if (data.teamName) {
                document.getElementById('teamName').value = data.teamName;
            }
            if (data.season) {
                document.getElementById('season').value = data.season;
            }

            // Charger les joueurs
            const players = data.players || data; // Support ancien format
            if (players && typeof players === 'object') {
                Object.keys(players).forEach(position => {
                    const positionData = players[position];
                    // Support ancien format (array) et nouveau format (object)
                    if (Array.isArray(positionData)) {
                        positionData.forEach((name, index) => {
                            const input = document.querySelector(`[data-position="${position}"][data-index="${index}"]`);
                            if (input) {
                                input.value = name;
                            }
                        });
                    } else if (typeof positionData === 'object') {
                        Object.keys(positionData).forEach(index => {
                            const input = document.querySelector(`[data-position="${position}"][data-index="${index}"]`);
                            if (input) {
                                input.value = positionData[index];
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
    document.getElementById('logoUrlInput').value = '';

    // Réinitialiser le logo
    const logoImg = document.getElementById('teamLogo');
    const logoInput = document.getElementById('logoUrlInput');
    logoImg.src = '';
    logoImg.classList.add('hidden');
    logoInput.classList.remove('hidden');

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
    // Charger le logo depuis l'URL si présent
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

    // Sauvegarder automatiquement dans le localStorage
    document.querySelectorAll('.player-input').forEach(input => {
        input.addEventListener('input', function() {
            saveToLocalStorage();
        });
    });

    // Sauvegarder les infos équipe
    document.getElementById('teamName').addEventListener('input', saveToLocalStorage);
    document.getElementById('season').addEventListener('input', saveToLocalStorage);

    // Charger depuis le localStorage
    loadFromLocalStorage();
    
    // Charger le thème
    loadTheme();
}

// Initialiser l'application quand le DOM est prêt
window.addEventListener('load', init);

