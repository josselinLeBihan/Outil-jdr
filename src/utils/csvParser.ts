import Papa from "papaparse";
import { Equipement, Lignage, Religion } from "../types";

export const parseCSVFile = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,
      complete: (results) => {
        resolve(results.data);
      },
      error: (err) => {
        reject(err);
      },
    });
  });
};

/**
 * Transforme les lignes CSV en structure d'arbres / sous-arbres / compétences.
 *
 * Format de retour:
 * {
 *   arbres: [
 *     {
 *       id: string,            // identifiant URL-friendly de l'arbre (lowercase, tirets)
 *       nom: string,           // nom affichable de l'arbre (ex: "Arcanes")
 *       sousArbres: [
 *         {
 *           id: string,        // identifiant URL-friendly du sous-arbre
 *           nom: string,       // nom affichable du sous-arbre
 *           competences: [
 *             {
 *               id: string,                 // identifiant unique de la compétence (ou fallback généré)
 *               nom: string,                // nom affichable de la compétence
 *               ultime: boolean,            // true si marqué comme ultime (true/1/oui/x)
 *               modificationPhysique?: string, // chaîne si présente, sinon undefined
 *               description: string,        // description (chaîne, vide si absente)
 *               fonctionnement: string,     // fonctionnement (chaîne, vide si absente)
 *               niveau1: string,            // niveau 1 (chaîne, vide si absente)
 *               niveau2: string             // niveau 2 (chaîne, vide si absente)
 *             },
 *             ...
 *           ]
 *         },
 *         ...
 *       ]
 *     },
 *     ...
 *   ]
 * }
 *
 * Remarques:
 * - Tous les champs de texte sont retournés tels quels (string). Seul 'ultime' est booléen.
 * - Les ids sont générés en remplaçant les espaces par des tirets et en passant en minuscule.
 * - Les champs du CSV tolèrent plusieurs variantes de nom de colonne (ex: 'Arbres' ou 'arbres').
 */
export const transformCSVToSkillsData = (csvData) => {
  const arbresMap = new Map();

  csvData.forEach((row) => {
    const arbreNom = (row.Arbres || row.arbres || row.arbre)?.trim();
    const sousArbreNom = (row.sousArbre || row.SousArbre)?.trim();

    if (!arbreNom || !sousArbreNom) return;

    if (!arbresMap.has(arbreNom)) {
      arbresMap.set(arbreNom, {
        id: arbreNom.toLowerCase().replace(/\s+/g, "-"),
        nom: arbreNom,
        sousArbres: [],
      });
    }

    const arbre = arbresMap.get(arbreNom);

    let sousArbre = arbre.sousArbres.find((sa) => sa.nom === sousArbreNom);
    if (!sousArbre) {
      sousArbre = {
        id: sousArbreNom.toLowerCase().replace(/\s+/g, "-"),
        nom: sousArbreNom,
        competences: [],
      };
      arbre.sousArbres.push(sousArbre);
    }

    const ultimeValue = row.ultime || row.Ultime || "";
    const isUltime =
      ultimeValue.toLowerCase() === "true" ||
      ultimeValue === "1" ||
      ultimeValue.toLowerCase() === "oui" ||
      ultimeValue.toLowerCase() === "x";

    const modifPhysique =
      row.modificationPhysique || row.ModificationPhysique || "";
    const niveau2Value = row["Niveau 2"] || row.niveau2 || row.Niveau2 || "";

    const competence = {
      id: row.nom?.toLowerCase().replace(/\s+/g, "-") || `comp-${Date.now()}`,
      nom: row.nom || "",
      ultime: isUltime,
      modificationPhysique: modifPhysique.trim() || undefined,
      description: (row.description || "").trim(),
      fonctionnement: (row.fonctionnement || "").trim(),
      niveau1: (row.niveau1 || "").trim(),
      niveau2: niveau2Value.trim(),
    };

    sousArbre.competences.push(competence);
  });

  return {
    arbres: Array.from(arbresMap.values()),
  };
};

/**
 * Transforme les données CSV parsées par PapaParse en tableau de Religion
 * Les données en entrée sont déjà un tableau d'objets avec header: true
 * Les sous-listes dans chaque colonne sont séparées par ";"
 *
 * @param csvData - Les données parsées par PapaParse (array d'objets)
 * @returns Un tableau de Religion
 */

export function transformCSVToReligionData(csvData: any[]): Religion[] {
  const religions: Religion[] = [];

  // Vérifier que csvData est bien un array
  if (!Array.isArray(csvData)) {
    console.error("csvData n'est pas un tableau:", csvData);
    return religions;
  }

  // Parser chaque ligne
  for (let i = 0; i < csvData.length; i++) {
    const row = csvData[i];

    // Ignorer les lignes vides ou invalides
    if (!row || typeof row !== "object") {
      console.warn(`Ligne ${i + 1} ignorée: données invalides`);
      continue;
    }

    // Vérifier que les colonnes nécessaires existent
    if (!row.nom) {
      console.warn(`Ligne ${i + 1} ignorée: colonne 'nom' manquante`);
      continue;
    }

    const religion: Religion = {
      nom: String(row.nom || "").trim(),
      equipement_religieux: splitAndClean(row.aspect_physique_commun),
      vetements: splitAndClean(row.vetements),
    };

    religions.push(religion);
  }

  console.log(`${religions.length} religion(s) transformé(s)`);
  return religions;
}
/**
 * Transforme les données CSV parsées par PapaParse en tableau d'Equipements
 * Les données en entrée sont déjà un tableau d'objets avec header: true
 *
 * @param csvData - Les données parsées par PapaParse (array d'objets)
 * @returns Un tableau d'Equipement
 */

export function transformCSVToEquipementsData(csvData: any[]): Equipement[] {
  const equipements: Equipement[] = [];

  // Vérifier que csvData est bien un array
  if (!Array.isArray(csvData)) {
    console.error("csvData n'est pas un tableau:", csvData);
    return equipements;
  }

  // Parser chaque ligne
  for (let i = 0; i < csvData.length; i++) {
    const row = csvData[i];

    // Ignorer les lignes vides ou invalides
    if (!row || typeof row !== "object") {
      console.warn(`Ligne ${i + 1} ignorée: données invalides`);
      continue;
    }

    // Vérifier que les colonnes nécessaires existent
    if (!row.nom) {
      console.warn(`Ligne ${i + 1} ignorée: colonne 'nom' manquante`);
      continue;
    }

    const equipement: Equipement = {
      nom: String(row.nom || "").trim(),
      type: String(row.type || "").trim() as
        | "Divers"
        | "Combat"
        | "Voyage"
        | "Soins"
        | "Compagnon",
      usage: String(row.usage || "").trim(),
      disponibilite: Number(row.disponibilite) as 1 | 2 | 3 | 4,
      encombrement: Number(row.encombrement) as 1 | 2 | 3,
    };

    equipements.push(equipement);
  }

  console.log(`${equipements.length} equipement(s) transformé(s)`);
  return equipements;
}

/**
 * Transforme les données CSV parsées par PapaParse en tableau de Lignage
 * Les données en entrée sont déjà un tableau d'objets avec header: true
 * Les sous-listes dans chaque colonne sont séparées par ";"
 *
 * @param csvData - Les données parsées par PapaParse (array d'objets)
 * @returns Un tableau de Lignage
 */
export function transformCSVToLignageData(csvData: any[]): Lignage[] {
  const lignages: Lignage[] = [];

  // Vérifier que csvData est bien un array
  if (!Array.isArray(csvData)) {
    console.error("csvData n'est pas un tableau:", csvData);
    return lignages;
  }

  // Parser chaque ligne
  for (let i = 0; i < csvData.length; i++) {
    const row = csvData[i];

    // Ignorer les lignes vides ou invalides
    if (!row || typeof row !== "object") {
      console.warn(`Ligne ${i + 1} ignorée: données invalides`);
      continue;
    }

    // Vérifier que les colonnes nécessaires existent
    if (!row.nom) {
      console.warn(`Ligne ${i + 1} ignorée: colonne 'nom' manquante`);
      continue;
    }

    const lignage: Lignage = {
      nom: String(row.nom || "").trim(),
      aspect_physique_commun: splitAndClean(row.aspect_physique_commun),
      vetements: splitAndClean(row.vetements),
      coutume_tradition: splitAndClean(row.coutume_tradition),
      rites: splitAndClean(row.rites),
      metiers: splitAndClean(row.metiers),
    };

    lignages.push(lignage);
  }

  console.log(`${lignages.length} lignage(s) transformé(s)`);
  return lignages;
}

/**
 * Sépare une chaîne par ";" et nettoie les éléments
 * @param value - La valeur à séparer
 * @returns Un tableau de strings nettoyées
 */
function splitAndClean(value: any): string[] {
  if (!value) return [];

  return String(value)
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}
