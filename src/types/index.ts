//Types pour les équipements
export interface Equipement {
  nom: string;
  type: "Divers" | "Combat" | "Voyage" | "Soins" | "Compagnon";
  usage: string;
  descriptif?: string;
  disponibilite: 0 | 1 | 2 | 3 | 4;
  encombrement: 0 | 1 | 2 | 3;
}

// Types pour les religions
export interface Religion {
  nom: string;
  equipement_religieux: string[];
  vetements: string[];
}

// Types pour les lignages
export interface Lignage {
  nom: string;
  aspect_physique_commun: string[];
  vetements: string[];
  coutume_tradition: string[];
  rites: string[];
  metiers: string[];
}

// Types pour les compétences
export interface Competence {
  id?: string;
  nom: string;
  description: string;
  ultime?: boolean;
  niveau?: number;
  niveau1?: string;
  niveau2?: string;
  modificationPhysique?: string;
  fonctionnement: string;
}

// Types pour les arbres de compétences
export interface SousArbre {
  id?: string;
  nom: string;
  competences: Competence[];
  descriptif?: string;
}

export interface Arbre {
  id?: string;
  nom: string;
  sousArbres: SousArbre[];
  descriptif?: string;
}

// Types pour les caractéristiques
export interface Caracteristiques {
  physique: {
    force: number;
    constitution: number;
    adresse: number;
  };
  social: {
    charisme: number;
    manipulation: number;
    sangFroid: number;
  };
  mental: {
    perception: number;
    intelligence: number;
    astuce: number;
  };
}

// Types pour le combat
export interface Combat {
  armure: string;
  maitrisesGenerales: Array<{
    type: string;
    niveau: number;
  }>;
  maitrisesSpecifiques: Array<{
    nom: string;
    niveau: number;
  }>;
  armes: Array<{
    nom: string;
    maitriseGenerale: string;
    maitriseSpecifique: string;
  }>;
  attaques: Array<{
    titre: string;
    valeur: string;
  }>;
}

// Types pour le personnage
export interface Character {
  id?: string;
  nom: string;
  prenom: string;
  religion?: Religion;
  lignage?: Lignage;
  classe?: string;
  classe2?: string;
  magie?: string;
  concept?: string;
  description?: string;
  caracteristiques: Caracteristiques;
  capacites: {
    physique: Record<string, number>;
    social: Record<string, number>;
    mental: Record<string, number>;
  };
  combat: Combat;
  equipements: Equipement[];
  competences: Competence[];
}
