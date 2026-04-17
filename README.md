# Parki - Plateforme de Location de Parkings (Maroc)

Parki est une plateforme moderne permettant aux conducteurs au Maroc de trouver et réserver des places de parking en quelques secondes, et aux propriétaires de rentabiliser leurs espaces vides.

## 🚀 Technologies

- **Frontend :** React 18, Tailwind CSS 4.0, Framer Motion, Zustand, Leaflet, Recharts.
- **Backend :** Node.js (ESM), Express, MongoDB (Mongoose).
- **Paiements :** Stripe Checkout & Webhooks.
- **Sécurité :** JWT, Bcrypt, Helmet, Rate Limiting.

## 📦 Structure du Projet

```text
├── client/          # Application Frontend (Vite)
├── server/          # API Backend (Node.js)
└── README.md
```

## 🛠️ Démarrage Rapide

### 1. Configuration du Backend
```bash
cd server
npm install
# Créez un fichier .env avec :
# MONGO_URI, JWT_SECRET, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET,
# EMAIL_HOST, EMAIL_USER, EMAIL_PASS
npm start
```

### 2. Configuration du Frontend
```bash
cd client
npm install
npm run dev
```

## ✨ Fonctionnalités Clés

- 📍 **Recherche Géo-spatiale :** Trouvez des parkings à Casablanca, Rabat, Marrakech, etc.
- 💳 **Paiement Sécurisé :** Intégration Stripe adaptée (MAD).
- 📱 **Mobile-First :** Expérience utilisateur fluide type Airbnb sur tous les écrans.
- 📊 **Dashboard Propriétaire :** Statistiques de revenus et gestion des réservations.
- 📧 **Notifications :** Confirmations automatiques par email.

## 📷 Intégration Caméra (Architecture)

Parki supporte l'automatisation par détection de plaques (ANPR) :

1. **Entrée :** Le système Raspberry Pi / OpenCV envoie un `POST /api/camera/entry` avec le numéro de plaque. L'API valide la réservation et enregistre l'heure d'entrée (`checkinTime`).
2. **Sortie :** Lors du `POST /api/camera/exit`, l'API calcule la durée réelle, le prix final, et génère un PaymentIntent Stripe pour paiement à la sortie.
3. **Sécurité :** Les requêtes caméra sont protégées par une clé API (`X-API-KEY`).
