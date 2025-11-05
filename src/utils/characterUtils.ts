// utils/characterUtils.js
import {
  CAPACITY_NAMES,
  CARACTERISTIQUES_TARGET,
  CAPACITES_TARGET,
} from "../constants/characterDefaults";
import { Character } from "../types";

export const calculateVie = (character: Character) => {
  return 4 + (character?.caracteristiques.physique.constitution || 1);
};

export const calculateInitiative = (character: Character) => {
  return (
    (character?.caracteristiques.physique.adresse || 1) +
    (character?.caracteristiques.mental.perception || 1)
  );
};

export const calculateDistribution = (values) => {
  return {
    at4: values.filter((v) => v === 4).length,
    at3: values.filter((v) => v === 3).length,
    at2: values.filter((v) => v === 2).length,
    at1: values.filter((v) => v === 1).length,
  };
};

export const calculateCaracteristiquesDistribution = (character: Character) => {
  if (!character) return { at4: 0, at3: 0, at2: 0, at1: 0 };

  const values = [
    ...Object.values(character.caracteristiques.physique),
    ...Object.values(character.caracteristiques.social),
    ...Object.values(character.caracteristiques.mental),
  ];

  return calculateDistribution(values);
};

export const calculateCapacitesDistribution = (character: Character) => {
  if (!character) return { at4: 0, at3: 0, at2: 0, at1: 0 };

  const values = [
    ...Object.values(character.capacites.physique),
    ...Object.values(character.capacites.social),
    ...Object.values(character.capacites.mental),
  ];

  return calculateDistribution(values);
};

export const getStatus = (distribution, target) => {
  return {
    at4: {
      current: distribution.at4,
      target: target.at4,
      diff: distribution.at4 - target.at4,
    },
    at3: {
      current: distribution.at3,
      target: target.at3,
      diff: distribution.at3 - target.at3,
    },
    at2: {
      current: distribution.at2,
      target: target.at2,
      diff: distribution.at2 - target.at2,
    },
    at1: {
      current: distribution.at1,
      target: target.at1,
      diff: distribution.at1 - target.at1,
    },
  };
};

export const getCaracteristiquesStatus = (character: Character) => {
  const dist = calculateCaracteristiquesDistribution(character);
  return getStatus(dist, CARACTERISTIQUES_TARGET);
};

export const getCapacitesStatus = (character: Character) => {
  const dist = calculateCapacitesDistribution(character);
  return getStatus(dist, CAPACITES_TARGET);
};

export const formatCapacityName = (key) => {
  return CAPACITY_NAMES[key] || key;
};

export const exportToMarkdown = (character: Character) => {
  if (!character) return;

  const dots = (value: number) => "●".repeat(value) + "○".repeat(5 - value);

  let markdown = `# ${character.prenom} ${character.nom}\n\n`;

  // Présentation
  markdown += `## Présentation\n\n`;
  markdown += `- **Nom :** ${character.nom}\n`;
  markdown += `- **Prénom :** ${character.prenom}\n`;

  // Lignage (peut être un objet ou une chaîne)
  if (character.lignage) {
    const lignageName =
      typeof character.lignage === "string"
        ? character.lignage
        : character.lignage.nom;
    markdown += `- **Lignage  :** ${lignageName}\n`;
  }

  // Religion (objet)
  if (character.religion) {
    const religionName =
      typeof character.religion === "string"
        ? character.religion
        : character.religion.nom;
    markdown += `- **Religion :** ${religionName}\n`;
  }

  // Classes et magie
  if (character.classe) {
    markdown += `- **Classe :** ${character.classe}\n`;
  }
  if (character.classe2) {
    markdown += `- **Classe secondaire :** ${character.classe2}\n`;
  }
  if (character.magie) {
    markdown += `- **Magie :** ${character.magie}\n`;
  }

  markdown += `\n`;

  // Concept et description
  if (character.concept) {
    markdown += `### Concept\n\n${character.concept}\n\n`;
  }
  if (character.description) {
    markdown += `### Description\n\n${character.description}\n\n`;
  }

  // Caractéristiques
  markdown += `## Caractéristiques\n\n`;
  markdown += `### Physique\n\n`;
  markdown += `- **Force :** ${dots(character.caracteristiques.physique.force)}\n`;
  markdown += `- **Constitution :** ${dots(character.caracteristiques.physique.constitution)}\n`;
  markdown += `- **Adresse :** ${dots(character.caracteristiques.physique.adresse)}\n\n`;

  markdown += `### Social\n\n`;
  markdown += `- **Charisme :** ${dots(character.caracteristiques.social.charisme)}\n`;
  markdown += `- **Manipulation :** ${dots(character.caracteristiques.social.manipulation)}\n`;
  markdown += `- **Sang-froid :** ${dots(character.caracteristiques.social.sangFroid)}\n\n`;

  markdown += `### Mental\n\n`;
  markdown += `- **Perception :** ${dots(character.caracteristiques.mental.perception)}\n`;
  markdown += `- **Intelligence :** ${dots(character.caracteristiques.mental.intelligence)}\n`;
  markdown += `- **Astuce :** ${dots(character.caracteristiques.mental.astuce)}\n\n`;

  // Capacités
  markdown += `## Capacités\n\n`;

  markdown += `### Physique\n\n`;
  Object.keys(character.capacites.physique).forEach((cap) => {
    const value = character.capacites.physique[cap];
    if (value > 0) {
      markdown += `- **${formatCapacityName(cap)} :** ${dots(value)}\n`;
    }
  });
  markdown += `\n`;

  markdown += `### Social\n\n`;
  Object.keys(character.capacites.social).forEach((cap) => {
    const value = character.capacites.social[cap];
    if (value > 0) {
      markdown += `- **${formatCapacityName(cap)} :** ${dots(value)}\n`;
    }
  });
  markdown += `\n`;

  markdown += `### Mental\n\n`;
  Object.keys(character.capacites.mental).forEach((cap) => {
    const value = character.capacites.mental[cap];
    if (value > 0) {
      markdown += `- **${formatCapacityName(cap)} :** ${dots(value)}\n`;
    }
  });
  markdown += `\n`;

  // Combat
  markdown += `## Combat\n\n`;
  markdown += `- **Vie :** ${calculateVie(character)}\n`;
  markdown += `- **Initiative :** ${calculateInitiative(character)}\n`;
  markdown += `- **Armure :** ${character.combat?.armure || "Aucune"}\n\n`;

  // Maîtrises générales
  if (
    character.combat?.maitrisesGenerales &&
    character.combat.maitrisesGenerales.length > 0
  ) {
    markdown += `### Maîtrises Générales\n\n`;
    character.combat.maitrisesGenerales.forEach((maitrise) => {
      if (maitrise.type) {
        markdown += `- **${maitrise.type} :** Niveau ${maitrise.niveau}\n`;
      }
    });
    markdown += `\n`;
  }

  // Maîtrises spécifiques
  if (
    character.combat?.maitrisesSpecifiques &&
    character.combat.maitrisesSpecifiques.length > 0
  ) {
    markdown += `### Maîtrises Spécifiques\n\n`;
    character.combat.maitrisesSpecifiques.forEach((maitrise) => {
      if (maitrise.nom) {
        markdown += `- **${maitrise.nom} :** Niveau ${maitrise.niveau}\n`;
      }
    });
    markdown += `\n`;
  }

  // Armes
  if (character.combat?.armes && character.combat.armes.length > 0) {
    markdown += `### Armes\n\n`;
    character.combat.armes.forEach((arme) => {
      if (arme.nom) {
        markdown += `- **${arme.nom}** \n`;
        markdown += `  - Attaque : ${arme.attaque}\n`;
        markdown += `  - Dégats : ${arme.degats}\n`;
      }
    });
    markdown += `\n`;
  }

  // Équipement
  if (character.equipements && character.equipements.length > 0) {
    markdown += `## Équipement\n\n`;
    character.equipements.forEach((item) => {
      if (item.nom) {
        markdown += `### ${item.nom}\n\n`;
        markdown += `- **Type :** ${item.type}\n`;
        markdown += `- **Usage :** ${item.usage}\n`;
        markdown += `- **Disponibilité :** ${item.disponibilite}\n`;
        markdown += `- **Encombrement :** ${item.encombrement}\n`;
        if (item.descriptif) {
          markdown += `\n${item.descriptif}\n`;
        }
        markdown += `\n`;
      }
    });
  }

  // Compétences
  if (character.competences && character.competences.length > 0) {
    markdown += `## Compétences\n\n`;
    character.competences.forEach((comp) => {
      if (comp.nom) {
        markdown += `### ${comp.nom}`;
        if (comp.niveau) {
          markdown += ` (Niveau ${comp.niveau})`;
        }
        if (comp.ultime) {
          markdown += ` ⭐ ULTIME`;
        }
        markdown += `\n\n`;

        if (comp.description) {
          markdown += `**Description : ** ${comp.description}\n\n`;
        }

        if (comp.fonctionnement) {
          markdown += `**Fonctionnement :** ${comp.fonctionnement}\n\n`;
        }

        if (comp.niveau1) {
          markdown += `**Niveau 1 :** ${comp.niveau1}\n\n`;
        }

        if (comp.niveau2) {
          markdown += `**Niveau 2 :** ${comp.niveau2}\n\n`;
        }

        if (comp.modificationPhysique) {
          markdown += `**Modification physique :** ${comp.modificationPhysique}\n\n`;
        }
      }
    });
  }

  // Télécharger le fichier
  const blob = new Blob([markdown], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${character.prenom}_${character.nom}.md`.replace(/\s+/g, "_");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
/**
 * Génère un ID unique pour un personnage s'il n'en a pas
 */
export function generateCharacterId(character: Character): string {
  if (character.id) return character.id;
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  return `char_${timestamp}_${random}`;
}

/**
 * Exporte un personnage vers un fichier JSON
 * Crée un nouveau fichier ou met à jour un fichier existant
 */
export async function exportCharacterToFile(
  character: Character,
): Promise<void> {
  try {
    // Générer un ID si nécessaire
    const characterWithId = {
      ...character,
      id: generateCharacterId(character),
    };

    // Convertir en JSON
    const jsonData = JSON.stringify(characterWithId, null, 2);

    // Créer un blob et télécharger le fichier
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    const fileName = `${characterWithId.prenom}_${characterWithId.nom}_${characterWithId.id}.json`;
    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    console.log(`✅ Personnage exporté : ${fileName}`);
  } catch (error) {
    console.error("❌ Erreur lors de l'export :", error);
    throw new Error(`Échec de l'export du personnage : ${error}`);
  }
}

/**
 * Importe un personnage depuis un fichier JSON
 * Retourne l'objet Character récupéré
 */
export async function importCharacterFromFile(file: File): Promise<Character> {
  try {
    // Vérifier que c'est bien un fichier JSON
    if (!file.name.endsWith(".json")) {
      throw new Error("Le fichier doit être au format JSON");
    }

    // Lire le contenu du fichier
    const text = await file.text();
    const character: Character = JSON.parse(text);
    console.log(`Personnage importé :`, character);

    // Validation basique
    if (!character.nom) {
      throw new Error(
        "Le fichier ne contient pas de personnage valide (nom ou prénom manquant)",
      );
    }

    if (!character.caracteristiques) {
      throw new Error("Le fichier ne contient pas de caractéristiques valides");
    }

    // S'assurer qu'il y a un ID
    if (!character.id) {
      character.id = generateCharacterId(character);
    }

    console.log(`✅ Personnage importé : ${character.prenom} ${character.nom}`);
    return character;
  } catch (error) {
    console.error("❌ Erreur lors de l'import :", error);
    throw new Error(`Échec de l'import du personnage : ${error}`);
  }
}

/**
 * Charge plusieurs fichiers de personnages et retourne une liste
 */
export async function importMultipleCharactersFromFiles(
  files: FileList | File[],
): Promise<Character[]> {
  const characters: Character[] = [];
  const errors: string[] = [];

  for (const file of Array.from(files)) {
    try {
      const character = await importCharacterFromFile(file);
      characters.push(character);
    } catch (error) {
      errors.push(`${file.name}: ${error}`);
    }
  }

  if (errors.length > 0) {
    console.warn("⚠️ Certains fichiers n'ont pas pu être importés :", errors);
  }

  console.log(`✅ ${characters.length} personnage(s) importé(s) avec succès`);
  return characters;
}

/**
 * Ouvre un dialogue pour importer un seul personnage
 * Retourne une Promise avec le personnage importé
 */
export function openImportDialog(): Promise<Character> {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    input.onchange = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];

      if (!file) {
        reject(new Error("Aucun fichier sélectionné"));
        return;
      }

      try {
        const character = await importCharacterFromFile(file);
        resolve(character);
      } catch (error) {
        reject(error);
      }
    };

    input.oncancel = () => {
      reject(new Error("Import annulé par l'utilisateur"));
    };

    input.click();
  });
}

/**
 * Ouvre un dialogue pour importer plusieurs personnages
 * Retourne une Promise avec la liste des personnages importés
 */
export function openImportMultipleDialog(): Promise<Character[]> {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.multiple = true;

    input.onchange = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      const files = target.files;

      if (!files || files.length === 0) {
        reject(new Error("Aucun fichier sélectionné"));
        return;
      }

      try {
        const characters = await importMultipleCharactersFromFiles(files);
        if (characters.length === 0) {
          reject(new Error("Aucun personnage valide trouvé"));
          return;
        }
        resolve(characters);
      } catch (error) {
        reject(error);
      }
    };

    input.oncancel = () => {
      reject(new Error("Import annulé par l'utilisateur"));
    };

    input.click();
  });
}

/**
 * Calcule la valeur du jet en fonction du personnage et de l'arme
 * centralise la logique de calcul
 */
export const calculateValeurJet = (
  character: Character,
  arme: { maitriseGenerale?: string; maitriseSpecifique?: string } = {},
): number => {
  const phys = character?.caracteristiques?.physique || {
    force: 0,
    constitution: 0,
    adresse: 0,
  };
  const physTotal =
    (phys.force || 0) + (phys.constitution || 0) + (phys.adresse || 0);
  const basePhys = physTotal < 7 ? 1 : 2;

  const maitriseGenNiveau =
    character?.combat?.maitrisesGenerales?.find(
      (m: any) => m.type === arme.maitriseGenerale,
    )?.niveau || 0;

  const maitriseSpecNiveau =
    character?.combat?.maitrisesSpecifiques?.find(
      (m: any) => m.nom === arme.maitriseSpecifique,
    )?.niveau || 0;

  return basePhys + maitriseGenNiveau + maitriseSpecNiveau * 2;
};
