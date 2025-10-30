// constants/characterDefaults.js


export const CARACTERISTIQUES = {
  physique:  ['Force', 'Constitution', 'Adresse' ,],
  social:   ['Charisme', 'Manipulation', 'SangFroid' ],
  mental:   ['Perception', 'Intelligence', 'Astuce' ]
}

export const DEFAULT_CARACTERISTIQUES = { 
    physique: { force: 0, constitution: 0, adresse: 0 },
    social: { charisme: 0, manipulation: 0, sangFroid: 0 },
    mental: { perception: 0, intelligence: 0, astuce: 0 }
}

export const CAPACITES = {
  physique:  ['Acrobaties', 'Discretion', 'Escalade', 'Equitation', 'Natation', 'Survie' ],
  social:   ['Animaux', 'Bluff', 'Commandement', 'Empathie', 'Exp. rue', 'Representation' ],
  mental:   ['Artisanat', 'Art de la magie', 'Erudition', 'Investigation', 'Medecine', 'Religion' ]
}

export const DEFAULT_CAPACITES = {
    physique: { acrobaties: 0, discretion: 0, escalade: 0, equitation: 0, natation: 0, survie: 0 },
    social: { animaux: 0, bluff: 0, commandement: 0, empathie: 0, expRue: 0, representation: 0 },
    mental: { artisanat: 0, artMagie: 0, erudition: 0, investigation: 0, medecine: 0, religion: 0 }
}

export const EMPTY_CHARACTER = {
  nom: '',
  prenom: '',
  lignage: '',
  classe: '',
  magie: '',
  concept: '',
  caracteristiques: {
    ...DEFAULT_CARACTERISTIQUES
  },
  capacites: {
    ...DEFAULT_CAPACITES
  },
  combat: {
    armure: '',
    attaques: [{ titre: '', valeur: '' }]
  },
  equipement: [
    { nom: '', descriptif: '' }
  ],
  competences: [
    { nom: '', descriptif: '', niveau: 1 }
  ]
};

export const CARACTERISTIQUES_TARGET = { at4: 1, at3: 3, at2: 4, at1: 1 };
export const CAPACITES_TARGET = { at4: 1, at3: 3, at2: 2, at1: 2 };

export const CAPACITY_NAMES = {
  acrobaties: 'Acrobaties',
  discretion: 'Discrétion',
  escalade: 'Escalade',
  equitation: 'Équitation',
  natation: 'Natation',
  survie: 'Survie',
  animaux: 'Animaux',
  bluff: 'Bluff',
  commandement: 'Commandement',
  empathie: 'Empathie',
  expRue: 'Exp. de la rue',
  representation: 'Représentation',
  artisanat: 'Artisanat',
  artMagie: 'Art de la magie',
  erudition: 'Érudition',
  investigation: 'Investigation',
  medecine: 'Médecine',
  religion: 'Religion'
};