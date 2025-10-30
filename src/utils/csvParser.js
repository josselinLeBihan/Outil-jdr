import Papa from 'papaparse';

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
      }
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

  csvData.forEach(row => {
    const arbreNom = (row.Arbres || row.arbres || row.arbre)?.trim();
    const sousArbreNom = (row.sousArbre || row.SousArbre)?.trim();
    
    if (!arbreNom || !sousArbreNom) return;

    if (!arbresMap.has(arbreNom)) {
      arbresMap.set(arbreNom, {
        id: arbreNom.toLowerCase().replace(/\s+/g, '-'),
        nom: arbreNom,
        sousArbres: []
      });
    }

    const arbre = arbresMap.get(arbreNom);
    
    let sousArbre = arbre.sousArbres.find(sa => sa.nom === sousArbreNom);
    if (!sousArbre) {
      sousArbre = {
        id: sousArbreNom.toLowerCase().replace(/\s+/g, '-'),
        nom: sousArbreNom,
        competences: []
      };
      arbre.sousArbres.push(sousArbre);
    }

    const ultimeValue = row.ultime || row.Ultime || '';
    const isUltime = ultimeValue.toLowerCase() === 'true' || 
                     ultimeValue === '1' || 
                     ultimeValue.toLowerCase() === 'oui' ||
                     ultimeValue.toLowerCase() === 'x';

    const modifPhysique = row.modificationPhysique || row.ModificationPhysique || '';
    const niveau2Value = row['Niveau 2'] || row.niveau2 || row.Niveau2 || '';

    const competence = {
      id: row.nom?.toLowerCase().replace(/\s+/g, '-') || `comp-${Date.now()}`,
      nom: row.nom || '',
      ultime: isUltime,
      modificationPhysique: modifPhysique.trim() || undefined,
      description: (row.description || '').trim(),
      fonctionnement: (row.fonctionnement || '').trim(),
      niveau1: (row.niveau1 || '').trim(),
      niveau2: niveau2Value.trim()
    };

    sousArbre.competences.push(competence);
  });

  return {
    arbres: Array.from(arbresMap.values())
  };
};