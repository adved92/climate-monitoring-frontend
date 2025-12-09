import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Header
      appTitle: "Energy Conservation System",
      appSubtitle: "Check weather anywhere in the world",
      
      // Navigation
      home: "Home",
      comparison: "Compare",
      history: "History",
      favorites: "Favorites",
      notifications: "Notifications",
      profile: "Profile",
      
      // Search
      searchPlaceholder: "Enter city name or coordinates",
      search: "Search",
      useMyLocation: "Use My Location",
      
      // Weather Data
      temperature: "Temperature",
      feelsLike: "Feels Like",
      humidity: "Humidity",
      pressure: "Pressure",
      windSpeed: "Wind Speed",
      precipitation: "Precipitation",
      visibility: "Visibility",
      uvIndex: "UV Index",
      airQuality: "Air Quality",
      
      // Forecast
      forecast: "Forecast",
      hourlyForecast: "Hourly Forecast",
      dailyForecast: "7-Day Forecast",
      today: "Today",
      tomorrow: "Tomorrow",
      
      // Disasters
      earthquakes: "Earthquakes",
      storms: "Storms",
      floods: "Floods",
      wildfires: "Wildfires",
      noData: "No data available",
      
      // Comparison
      compareLocations: "Compare Locations",
      addLocation: "Add Location",
      removeLocation: "Remove",
      clearAll: "Clear All",
      maxLocations: "Maximum 4 locations reached",
      noLocationsAdded: "No locations added yet",
      addLocationsPrompt: "Add 2-4 locations to start comparing",
      
      // Theme
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      auto: "Auto",
      
      // Language
      language: "Language",
      english: "English",
      spanish: "Spanish",
      french: "French",
      german: "German",
      chinese: "Chinese",
      japanese: "Japanese",
      
      // Notifications
      enableNotifications: "Enable Notifications",
      disableNotifications: "Disable Notifications",
      notificationSettings: "Notification Settings",
      weatherAlerts: "Weather Alerts",
      severeWeather: "Severe Weather",
      dailySummary: "Daily Summary",
      
      // Common
      loading: "Loading...",
      error: "Error",
      retry: "Retry",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      close: "Close",
      back: "Back",
      next: "Next",
      
      // Messages
      locationNotFound: "Location not found",
      networkError: "Network error. Please check your connection.",
      dataUnavailable: "Data currently unavailable",
      
      // Footer
      poweredBy: "Powered by OpenWeatherMap, USGS, and NOAA"
    }
  },
  es: {
    translation: {
      appTitle: "Sistema de Conservación de Energía",
      appSubtitle: "Consulta el clima en cualquier parte del mundo",
      
      home: "Inicio",
      comparison: "Comparar",
      history: "Historial",
      favorites: "Favoritos",
      notifications: "Notificaciones",
      profile: "Perfil",
      
      searchPlaceholder: "Ingrese nombre de ciudad o coordenadas",
      search: "Buscar",
      useMyLocation: "Usar Mi Ubicación",
      
      temperature: "Temperatura",
      feelsLike: "Sensación Térmica",
      humidity: "Humedad",
      pressure: "Presión",
      windSpeed: "Velocidad del Viento",
      precipitation: "Precipitación",
      visibility: "Visibilidad",
      uvIndex: "Índice UV",
      airQuality: "Calidad del Aire",
      
      forecast: "Pronóstico",
      hourlyForecast: "Pronóstico por Hora",
      dailyForecast: "Pronóstico de 7 Días",
      today: "Hoy",
      tomorrow: "Mañana",
      
      earthquakes: "Terremotos",
      storms: "Tormentas",
      floods: "Inundaciones",
      wildfires: "Incendios Forestales",
      noData: "No hay datos disponibles",
      
      compareLocations: "Comparar Ubicaciones",
      addLocation: "Agregar Ubicación",
      removeLocation: "Eliminar",
      clearAll: "Limpiar Todo",
      maxLocations: "Máximo 4 ubicaciones alcanzadas",
      noLocationsAdded: "No se han agregado ubicaciones",
      addLocationsPrompt: "Agregue 2-4 ubicaciones para comenzar a comparar",
      
      theme: "Tema",
      light: "Claro",
      dark: "Oscuro",
      auto: "Automático",
      
      language: "Idioma",
      english: "Inglés",
      spanish: "Español",
      french: "Francés",
      german: "Alemán",
      chinese: "Chino",
      japanese: "Japonés",
      
      enableNotifications: "Activar Notificaciones",
      disableNotifications: "Desactivar Notificaciones",
      notificationSettings: "Configuración de Notificaciones",
      weatherAlerts: "Alertas Meteorológicas",
      severeWeather: "Clima Severo",
      dailySummary: "Resumen Diario",
      
      loading: "Cargando...",
      error: "Error",
      retry: "Reintentar",
      save: "Guardar",
      cancel: "Cancelar",
      delete: "Eliminar",
      edit: "Editar",
      close: "Cerrar",
      back: "Atrás",
      next: "Siguiente",
      
      locationNotFound: "Ubicación no encontrada",
      networkError: "Error de red. Por favor verifique su conexión.",
      dataUnavailable: "Datos no disponibles actualmente",
      
      poweredBy: "Desarrollado por OpenWeatherMap, USGS y NOAA"
    }
  },
  fr: {
    translation: {
      appTitle: "Système de Conservation d'Énergie",
      appSubtitle: "Consultez la météo partout dans le monde",
      
      home: "Accueil",
      comparison: "Comparer",
      history: "Historique",
      favorites: "Favoris",
      notifications: "Notifications",
      profile: "Profil",
      
      searchPlaceholder: "Entrez le nom de la ville ou les coordonnées",
      search: "Rechercher",
      useMyLocation: "Utiliser Ma Position",
      
      temperature: "Température",
      feelsLike: "Ressenti",
      humidity: "Humidité",
      pressure: "Pression",
      windSpeed: "Vitesse du Vent",
      precipitation: "Précipitations",
      visibility: "Visibilité",
      uvIndex: "Indice UV",
      airQuality: "Qualité de l'Air",
      
      forecast: "Prévisions",
      hourlyForecast: "Prévisions Horaires",
      dailyForecast: "Prévisions sur 7 Jours",
      today: "Aujourd'hui",
      tomorrow: "Demain",
      
      earthquakes: "Tremblements de Terre",
      storms: "Tempêtes",
      floods: "Inondations",
      wildfires: "Feux de Forêt",
      noData: "Aucune donnée disponible",
      
      compareLocations: "Comparer les Emplacements",
      addLocation: "Ajouter un Emplacement",
      removeLocation: "Supprimer",
      clearAll: "Tout Effacer",
      maxLocations: "Maximum de 4 emplacements atteint",
      noLocationsAdded: "Aucun emplacement ajouté",
      addLocationsPrompt: "Ajoutez 2-4 emplacements pour commencer à comparer",
      
      theme: "Thème",
      light: "Clair",
      dark: "Sombre",
      auto: "Automatique",
      
      language: "Langue",
      english: "Anglais",
      spanish: "Espagnol",
      french: "Français",
      german: "Allemand",
      chinese: "Chinois",
      japanese: "Japonais",
      
      enableNotifications: "Activer les Notifications",
      disableNotifications: "Désactiver les Notifications",
      notificationSettings: "Paramètres de Notification",
      weatherAlerts: "Alertes Météo",
      severeWeather: "Météo Sévère",
      dailySummary: "Résumé Quotidien",
      
      loading: "Chargement...",
      error: "Erreur",
      retry: "Réessayer",
      save: "Enregistrer",
      cancel: "Annuler",
      delete: "Supprimer",
      edit: "Modifier",
      close: "Fermer",
      back: "Retour",
      next: "Suivant",
      
      locationNotFound: "Emplacement non trouvé",
      networkError: "Erreur réseau. Veuillez vérifier votre connexion.",
      dataUnavailable: "Données actuellement indisponibles",
      
      poweredBy: "Propulsé par OpenWeatherMap, USGS et NOAA"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
