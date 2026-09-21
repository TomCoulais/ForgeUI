# Forge UI

Kitu, une agence web spécialisée dans la construction de sites web. Avec le temps, Kitu s'est spécialisée dans la création de landing pages sur-mesure pour des clients au profil de freelance (influenceurs, formateurs…) à la manière de https://linktr.ee/ ou encore https://lnk.bio/fr/…

Afin d'automatiser son processus de création, elle souhaite développer en interne un outil nommé Kitui, permettant de paramétrer sur une interface web un Kit UI charté à l'image du client.

C'est ainsi qu'est né Forge UI.

## ✨ Fonctionnalités

- 🎨 Création de fichier CSS
- ⚡ Génération en temps réel des pages personnalisées
- 🔧 Personnalisation avancée des couleurs, polices et layouts
- 📊 Prévisualisation en direct de vos modifications

## 🚀 Initialisation

### Installation

```bash
git clone https://github.com/TomCoulais/ForgeUI
```

### Configuration du fichier .env

Avant de lancer le backend, il faut créer un fichier .env dans le dossier back/ contenant les informations suivantes :

```env
POSTGRES_DB=name_db
POSTGRES_USER=name_user
POSTGRES_PASSWORD=password
DATABASE_URL="postgresql://app:test@127.0.0.1:52397/db"

JWT_SECRET=votre_chaine_secrete_aleatoire
```

### Lancement du projet

```bash
cd ForgeUI
```

- Lancer le front :
```bash
cd front
npm run dev
```

- Lancer le back :
```bash
cd back
npm run dev
```

## 🛠️ Technologies utilisées

### Frontend

- Vue.js - Framework SPA
- Tailwind CSS - Styling utilitaire
- Vite

### Backend

- Node.js - Runtime JavaScript
- Express.js - Framework web
- PostgreSQL - Base de données
- JWT - Authentification sécurisée

---

<div align="center">
  <strong>Développé avec ❤️ par l'équipe imaginaire Kitu</strong>
</div>
