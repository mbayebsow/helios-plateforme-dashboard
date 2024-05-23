export let HeliosAPI = "http://localhost:3500";

export const General = {
  name: "HELIOS",
  subName: "Platform",
  copyright: "TELDOO GROUP",
  version: "0.0.1",
};

export const errorCode = [
  {
    code: 75997,
    message: "Changement de reseau detecter. Reconnecter vous svp.",
  },
  {
    code: 75996,
    message: "Session non valide !",
  },
  {
    code: 75736,
    message: "Session expirer !",
  },
  {
    code: 75658,
    message: "Pas de session en cour",
  },
  {
    code: 75839,
    message: "Session non valide !",
  },
  {
    code: 90456,
    message: "Code de verification non valide",
  },
  {
    code: 36743,
    message: "Pas d'utilisateur trouver",
  },
];

export const MenuItems = [
  {
    title: "Dashboard",
    icon: "Home",
    link: "/",
  },
  {
    title: "Projets",
    icon: "IbmCloudProjects",
    link: "/",
  },
  {
    title: "Mes taches",
    icon: "Task",
    link: "/",
  },
  {
    title: "Devis",
    icon: "ChartCustom",
    link: "/",
  },
  {
    title: "Factures",
    icon: "Receipt",
    link: "/",
  },
  {
    title: "Transactions",
    icon: "Wallet",
    link: "/",
  },
  {
    title: "Contrats",
    icon: "WhitePaper",
    link: "/",
  },
  {
    title: "Catalogues",
    icon: "ShoppingCatalog",
    link: "/",
  },
  {
    title: "Commandes",
    icon: "ShoppingCartPlus",
    link: "/",
  },
  {
    title: "Employers",
    icon: "Identification",
    link: "/",
  },
  {
    title: "Clients",
    icon: "UserMultiple",
    link: "/",
  },
];

export const employeesStatue = [
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Banni",
    value: "banni",
  },
  {
    label: "Suspendu",
    value: "suspendu",
  },
  {
    label: "Waiting",
    value: "waiting",
  },
];

export const taskPriority = [
  {
    label: "Faible",
    text: "Faible",
    value: "faible",
  },
  {
    label: "Moyen",
    text: "Moyen",
    value: "moyen",
  },
  {
    label: "Important",
    text: "Important",
    value: "important",
  },
];

export const taskStatus = [
  {
    text: "A faire",
    value: "a_faire",
    status: "default",
  },
  {
    text: "En cour",
    value: "en_cour",
    status: "processing",
  },
  {
    text: "Terminer",
    value: "terminer",
    status: "success",
  },
  {
    text: "Annuler",
    value: "annuler",
    status: "error",
  },
];

export const projectStatue = [
  {
    label: "Pas commence",
    text: "Pas commence",
    value: "pas_commence",
  },
  {
    label: "En cours",
    text: "En cours",
    value: "en_cours",
  },
  {
    label: "Terminer",
    text: "Terminer",
    value: "terminer",
  },
  {
    label: "Suspendu",
    text: "Suspendu",
    value: "suspendu",
  },
  {
    label: "Annuler",
    text: "Annuler",
    value: "annuler",
  },
];

export const humanize = (str) => {
  var i,
    frags = str.split("_");
  for (i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(" ");
};
