import Papa from "papaparse";
import { Competence, Equipement, Lignage, Religion, SousArbre } from "../types";

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
 * Transforme la structure d'arbres/sous-arbres/compétences en données CSV
 * C'est l'inverse de transformCSVToSkillsData
 *
 * @param skillsData - La structure de données retournée par transformCSVToSkillsData
 * @returns Un tableau d'objets prêt à être converti en CSV par PapaParse
 */
export const transformSkillsDataToCSV = (skillsData: { arbres: any[] }) => {
  console.log("Transformation des données de compétences en CSV");
  const csvRows: any[] = [];

  skillsData.arbres.forEach((arbre) => {
    arbre.sousArbres.forEach((sousArbre: SousArbre) => {
      sousArbre.competences.forEach((competence: Competence) => {
        const row = {
          Arbres: arbre.nom,
          sousArbre: sousArbre.nom,
          nom: competence.nom,
          ultime: competence.ultime ? "true" : "false",
          modificationPhysique: competence.modificationPhysique || "",
          description: competence.description || "",
          fonctionnement: competence.fonctionnement || "",
          niveau1: competence.niveau1 || "",
          "Niveau 2": competence.niveau2 || "",
        };
        csvRows.push(row);
      });
    });
  });

  return csvRows;
};

/**
 * Exporte les données de compétences en fichier CSV et déclenche le téléchargement
 *
 * @param skillsData - La structure de données retournée par transformCSVToSkillsData
 * @param filename - Le nom du fichier à télécharger (par défaut: "competences.csv")
 */
export const exportSkillsDataToCSV = (
  skillsData: { arbres: any[] },
  filename: string = "competences.csv",
) => {
  // Transformer les données en format CSV
  const csvRows = transformSkillsDataToCSV(skillsData);

  // Convertir en CSV avec PapaParse
  const csv = Papa.unparse(csvRows, {
    header: true,
    delimiter: ",",
    newline: "\n",
  });

  // Créer un blob et déclencher le téléchargement
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
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

/**
 * Sauvegarde un contenu dans un fichier avec dialogue de sélection d'emplacement
 *
 * @param content - Le contenu à sauvegarder (string ou Blob)
 * @param options - Options de sauvegarde
 * @param options.suggestedName - Nom de fichier suggéré (par défaut: "fichier.txt")
 * @param options.description - Description du type de fichier (par défaut: "Fichier texte")
 * @param options.mimeType - Type MIME du fichier (par défaut: "text/plain")
 * @param options.extensions - Extensions acceptées (par défaut: [".txt"])
 * @returns Promise<boolean> - true si sauvegarde réussie, false sinon
 */
export const saveFile = async (
  content: string | Blob,
  options: {
    suggestedName?: string;
    description?: string;
    mimeType?: string;
    extensions?: string[];
  } = {},
): Promise<boolean> => {
  const {
    suggestedName = "fichier.txt",
    description = "Fichier texte",
    mimeType = "text/plain",
    extensions = [".txt"],
  } = options;

  try {
    // Convertir le contenu en Blob si nécessaire
    const blob =
      content instanceof Blob
        ? content
        : new Blob([content], { type: mimeType });

    // Utiliser l'API File System Access si disponible
    if ("showSaveFilePicker" in window) {
      const fileOptions = {
        types: [
          {
            description,
            accept: {
              [mimeType]: extensions,
            },
          },
        ],
        suggestedName,
      };

      const handle = await (window as any).showSaveFilePicker(fileOptions);
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();

      return true;
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute("download", suggestedName);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      return true;
    }
  } catch (err: any) {
    // L'utilisateur a annulé
    if (err.name === "AbortError") {
      console.log("Sauvegarde annulée par l'utilisateur");
      return false;
    }

    // Autre erreur
    console.error("Erreur lors de la sauvegarde:", err);
    return false;
  }
};

/**
 * Sauvegarde des données au format CSV
 */
export const saveCSVFile = async (
  csvData: any[],
  suggestedName: string = "export.csv",
): Promise<boolean> => {
  const csv = Papa.unparse(csvData, {
    header: true,
    delimiter: ",",
    newline: "\n",
  });

  return saveFile(csv, {
    suggestedName,
    description: "Fichier CSV",
    mimeType: "text/csv",
    extensions: [".csv"],
  });
};

/**
 * Sauvegarde des données au format JSON
 */
export const saveJSONFile = async (
  data: any,
  suggestedName: string = "export.json",
): Promise<boolean> => {
  const json = JSON.stringify(data, null, 2);

  return saveFile(json, {
    suggestedName,
    description: "Fichier JSON",
    mimeType: "application/json",
    extensions: [".json"],
  });
};
