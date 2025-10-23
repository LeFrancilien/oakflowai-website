# Guide de Dépannage Docker/WSL

## Problème: Erreur WSL 0x80070422

Si vous rencontrez l'erreur suivante:
```
An error occurred while running a WSL command. Please check your WSL configuration and try again.
running wslexec: The service cannot be started, either because it is disabled or because it has no enabled devices associated with it.
Wsl/0x80070422
```

### Solutions

#### Solution 1: Activer les services Windows requis

1. **Ouvrir Services Windows**
   - Appuyez sur `Win + R`
   - Tapez `services.msc` et appuyez sur Entrée

2. **Vérifier et activer ces services:**

   **LxssManager (WSL Service)**
   - Recherchez "LxssManager" dans la liste
   - Clic droit → Propriétés
   - Type de démarrage: Automatique
   - Cliquez sur "Démarrer" si le service n'est pas démarré
   - Cliquez sur "OK"

   **Windows Update**
   - Recherchez "Windows Update"
   - Clic droit → Propriétés
   - Type de démarrage: Manuel (déclenché) ou Automatique
   - Cliquez sur "Démarrer" si possible
   - Cliquez sur "OK"

3. **Redémarrer votre ordinateur**

#### Solution 2: Réinstaller WSL

1. **Ouvrir PowerShell en tant qu'administrateur**

2. **Désinstaller les distributions WSL:**
   ```powershell
   wsl --list
   wsl --unregister docker-desktop
   wsl --unregister docker-desktop-data
   ```

3. **Réinstaller WSL:**
   ```powershell
   wsl --install
   ```

4. **Redémarrer votre ordinateur**

#### Solution 3: Vérifier les fonctionnalités Windows

1. **Ouvrir PowerShell en tant qu'administrateur**

2. **Activer les fonctionnalités requises:**
   ```powershell
   dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
   dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
   ```

3. **Redémarrer votre ordinateur**

4. **Mettre à jour WSL vers WSL2:**
   ```powershell
   wsl --set-default-version 2
   ```

#### Solution 4: Réparer Docker Desktop

1. **Désinstaller Docker Desktop**
   - Paramètres Windows → Applications → Docker Desktop → Désinstaller

2. **Supprimer les données résiduelles:**
   - Supprimez les dossiers suivants s'ils existent:
     - `C:\Users\[VotreNom]\AppData\Local\Docker`
     - `C:\Users\[VotreNom]\AppData\Roaming\Docker`
     - `C:\ProgramData\Docker`

3. **Réinstaller Docker Desktop**
   - Téléchargez la dernière version depuis [docker.com](https://www.docker.com/products/docker-desktop)
   - Lancez l'installation
   - Assurez-vous de cocher "Use WSL 2 instead of Hyper-V"

#### Solution 5: Vérifier les politiques de groupe

1. **Ouvrir l'éditeur de stratégie de groupe**
   - Appuyez sur `Win + R`
   - Tapez `gpedit.msc` et appuyez sur Entrée

2. **Naviguer vers:**
   ```
   Configuration ordinateur → Modèles d'administration → Système → Gestion de la communication Internet → Paramètres de communication Internet
   ```

3. **Vérifier que "Désactiver Windows Update" est sur "Non configuré" ou "Désactivé"**

### Vérifications après résolution

Une fois le problème résolu, vérifiez que tout fonctionne:

```powershell
# Vérifier WSL
wsl --status

# Lister les distributions WSL
wsl --list --verbose

# Démarrer Docker Desktop
# Puis vérifier Docker
docker --version
docker run hello-world
```

### Besoin d'aide supplémentaire?

Si le problème persiste:
1. Vérifiez que Windows est à jour
2. Vérifiez que votre version de Windows supporte WSL2 (Windows 10 version 1903+ ou Windows 11)
3. Vérifiez que la virtualisation est activée dans le BIOS
4. Consultez les logs Docker Desktop: Paramètres → Troubleshoot → Get diagnostics

### Prévention

Pour éviter ce problème à l'avenir:
- Ne désactivez pas les services Windows requis (LxssManager, Windows Update)
- Maintenez Windows et Docker Desktop à jour
- Ne modifiez pas manuellement les configurations WSL sans savoir ce que vous faites
