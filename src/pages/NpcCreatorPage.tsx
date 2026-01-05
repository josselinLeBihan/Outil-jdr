import React, { useState } from "react";
import CharacterListPage from "./CharacterListPage";
import CharacterDetailPage from "./CharacterDetailPage";
import { EMPTY_CHARACTER } from "../constants/characterDefaults";
import { Arbre, Character, Equipement, Lignage, Religion } from "../types";
import {
  exportCharacterToFile,
  exportToMarkdown,
  generateCharacterId,
  openImportDialog,
  openImportMultipleDialog,
  calculateValeurJet,
} from "../utils/characterUtils";

interface NpcCreatorPageProps {
  arbres: Arbre[];
  lignages: Lignage[];
  religions: Religion[];
  equipements: Equipement[];
}

export const NpcCreatorPage: React.FC<NpcCreatorPageProps> = ({
  arbres,
  lignages,
  religions,
  equipements,
}) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentChar, setCurrentChar] = useState<Character | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);

  /**
   * Exporte un personnage vers un fichier JSON
   */
  const handleExportCharacterJSON = async (char: Character) => {
    try {
      await exportCharacterToFile(char);
      alert(`Personnage ${char.prenom} ${char.nom} exporté avec succès !`);
    } catch (error) {
      alert(`Erreur lors de l'export : ${error}`);
    }
  };
  /**
   * Exporte un personnage vers un fichier JSON
   */
  const handleExportCharacterMD = async (char: Character) => {
    try {
      await exportToMarkdown(char);
      alert(`Personnage ${char.prenom} ${char.nom} exporté avec succès !`);
    } catch (error) {
      alert(`Erreur lors de l'export : ${error}`);
    }
  };

  /**
   * Importe un personnage depuis un fichier
   */
  const handleImportCharacter = async () => {
    try {
      const character = await openImportDialog();

      // Vérifier si le personnage existe déjà
      const existingIndex = characters.findIndex((c) => c.id === character.id);

      if (existingIndex >= 0) {
        // Demander confirmation pour écraser
        const confirm = window.confirm(
          `Un personnage avec l'ID ${character.id} existe déjà. Voulez-vous le remplacer ?`,
        );

        if (confirm) {
          // Remplacer le personnage existant
          const newCharacters = [...characters];
          newCharacters[existingIndex] = character;
          setCharacters(newCharacters);
          alert(`Personnage ${character.prenom} ${character.nom} mis à jour !`);
        }
      } else {
        // Ajouter le nouveau personnage
        setCharacters([...characters, character]);
        alert(
          `Personnage ${character.prenom} ${character.nom} importé avec succès !`,
        );
      }
    } catch (error) {
      if (error.message !== "Import annulé par l'utilisateur") {
        alert(`Erreur lors de l'import : ${error}`);
      }
    }
  };

  /**
   * Importe plusieurs personnages depuis des fichiers
   */
  const handleImportMultipleCharacters = async () => {
    try {
      const importedCharacters = await openImportMultipleDialog();

      // Fusionner avec les personnages existants
      const existingIds = new Set(characters.map((c) => c.id));
      const newCharacters: Character[] = [];
      const updatedCharacters: Character[] = [];

      importedCharacters.forEach((char) => {
        if (existingIds.has(char.id)) {
          updatedCharacters.push(char);
        } else {
          newCharacters.push(char);
        }
      });

      // Construire le message de confirmation
      let message = "";
      if (newCharacters.length > 0) {
        message += `${newCharacters.length} nouveau(x) personnage(s) importé(s).\n`;
      }
      if (updatedCharacters.length > 0) {
        message += `${updatedCharacters.length} personnage(s) existant(s) détecté(s).\n`;
        message += `Voulez-vous les remplacer ?`;

        if (!window.confirm(message)) {
          // Ne garder que les nouveaux
          setCharacters([...characters, ...newCharacters]);
          alert(
            `${newCharacters.length} personnage(s) importé(s) (${updatedCharacters.length} ignoré(s))`,
          );
          return;
        }
      }

      // Mettre à jour tous les personnages
      const characterMap = new Map(characters.map((c) => [c.id, c]));

      // Remplacer les personnages existants
      updatedCharacters.forEach((char) => {
        characterMap.set(char.id!, char);
      });

      // Ajouter les nouveaux
      newCharacters.forEach((char) => {
        characterMap.set(char.id!, char);
      });

      setCharacters(Array.from(characterMap.values()));
      alert(
        `${importedCharacters.length} personnage(s) importé(s) avec succès !`,
      );
    } catch (error) {
      if (error.message !== "Import annulé par l'utilisateur") {
        alert(`Erreur lors de l'import multiple : ${error}`);
      }
    }
  };

  const startNewCharacter = () => {
    setCurrentChar({ ...(EMPTY_CHARACTER as Character) });
    setEditMode(true);
  };

  const viewCharacter = (char: Character | null) => {
    setCurrentChar(char ? { ...char } : null);
    setEditMode(false);
  };

  const editCharacter = (char: Character | null) => {
    setCurrentChar(char ? { ...char } : null);
    setEditMode(true);
  };

  // Helper: convert top-level object fields to primitive (prefer id, fallback to nom)
  const sanitizeCharacterForSave = (char: Character): Character => {
    const copy: any = { ...char };

    const topLevelFields = ["arbre", "lignage", "religion"];
    topLevelFields.forEach((key) => {
      const val = copy[key];
      if (val && typeof val === "object") {
        copy[key] = val.id ?? val.nom ?? val;
      }
    });

    // If some UI expects simple strings for nested lists items, ensure arrays of objects are mapped too.
    // Example: if a list like 'competences' contains full objects but UI expects names, map here as needed.
    // Keep default behavior for other nested structures to avoid unwanted data loss.

    return copy as Character;
  };

  const saveCharacter = () => {
    if (!currentChar) return;
    if (currentChar.nom || currentChar.prenom) {
      const sanitized = sanitizeCharacterForSave(currentChar);

      if (sanitized.id) {
        setCharacters(
          characters.map((c) => (c.id === sanitized.id ? { ...sanitized } : c)),
        );
      } else {
        const newCharWithId = {
          ...sanitized,
          id: generateCharacterId(sanitized),
        };
        setCharacters([...characters, newCharWithId]);
      }
      setCurrentChar(null);
      setEditMode(false);
    }
  };

  const deleteCharacter = (id: string | undefined) => {
    setCharacters(characters.filter((c) => c.id !== id));
  };

  const goBack = () => {
    setCurrentChar(null);
    setEditMode(false);
  };

  const updateField = (path: string, value: any) => {
    console.log("Mise à jour du champ :", path, value);
    if (!currentChar) return;
    const newChar: Character = { ...currentChar };
    const keys = path.split(".");
    let obj: any = newChar;
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (obj[k] == null) obj[k] = {};
      obj = obj[k];
    }
    obj[keys[keys.length - 1]] = value;
    setCurrentChar(newChar);
  };

  const removeEquipement = (index: number) => {
    if (!currentChar) return;
    const newChar: Character = { ...currentChar };
    newChar.equipements = newChar.equipements || [];
    newChar.equipements.splice(index, 1);
    setCurrentChar(newChar);
  };

  const updateEquipement = (index: number, field: string, value: any) => {
    if (!currentChar) return;
    const newChar: Character = { ...currentChar };
    newChar.equipements = newChar.equipements || [];
    if (newChar.equipements[index]) newChar.equipements[index][field] = value;
    setCurrentChar(newChar);
  };

  const addEquipement = (equipement: any = null) => {
    if (!currentChar) return;
    const newChar: Character = { ...currentChar };
    newChar.equipements = newChar.equipements || [];

    newChar.equipements = Array.isArray(newChar.equipements)
      ? [...newChar.equipements]
      : [];
    const toAdd: Equipement = equipement
      ? {
          nom: equipement.nom ?? "",
          usage: equipement.usage ?? "",
          type: equipement.type ?? "",
          disponibilite: equipement.disponibilite ?? "",
          encombrement: equipement.encombrement ?? "",
        }
      : { nom: "", usage: "", type: "", disponibilite: "", encombrement: "" };
    newChar.equipements = [...newChar.equipements, toAdd];
    setCurrentChar(newChar);
    console.log("new char :", newChar);
  };

  const addCompetence = (competence: any = null) => {
    if (!currentChar) return;
    const newChar: Character = { ...currentChar };
    newChar.competences = Array.isArray(newChar.competences)
      ? [...newChar.competences]
      : [];
    const toAdd = competence
      ? {
          id: competence.id ?? Date.now().toString(),
          nom: competence.nom ?? "",
          description: competence.description ?? "",
          fonctionnement: competence.fonctionnement ?? "",
          niveau: competence.niveau ?? 1,
          modificationPhysique: competence.modificationPhysique || "",
        }
      : { nom: "", description: "", niveau: 1, id: Date.now().toString() };

    newChar.competences = [...newChar.competences, toAdd];
    setCurrentChar(newChar);
  };

  const removeCompetence = (index: number) => {
    if (!currentChar) return;
    const newChar: Character = { ...currentChar };
    newChar.competences = Array.isArray(newChar.competences)
      ? [...newChar.competences]
      : [];
    newChar.competences.splice(index, 1);
    setCurrentChar(newChar);
  };

  const updateCompetence = (index: number, field: string, value: any) => {
    if (!currentChar) return;
    const newChar: Character = { ...currentChar };
    newChar.competences = Array.isArray(newChar.competences)
      ? [...newChar.competences]
      : [];
    if (newChar.competences[index]) newChar.competences[index][field] = value;
    setCurrentChar(newChar);
  };

  // Maîtrises générales
  const addMaitriseGenerale = () => {
    if (!currentChar) return;
    const newChar: Character = { ...currentChar };
    newChar.combat = newChar.combat || {
      maitrisesGenerales: [],
      maitrisesSpecifiques: [],
      armes: [],
      attaques: [],
      armure: "Aucune",
    };
    newChar.combat.maitrisesGenerales = newChar.combat.maitrisesGenerales || [];
    newChar.combat.maitrisesGenerales.push({ type: "", niveau: 1 });
    setCurrentChar(newChar);
  };

  const removeMaitriseGenerale = (index: number) => {
    if (!currentChar) return;
    const newChar: Character = { ...currentChar };
    newChar.combat = newChar.combat || { maitrisesGenerales: [] };
    newChar.combat.maitrisesGenerales = newChar.combat.maitrisesGenerales || [];
    newChar.combat.maitrisesGenerales.splice(index, 1);
    setCurrentChar(newChar);
  };

  const updateMaitriseGenerale = (index: number, field: string, value: any) => {
    if (!currentChar) return;
    const newChar: Character = { ...currentChar };
    newChar.combat = newChar.combat || { maitrisesGenerales: [] };
    newChar.combat.maitrisesGenerales = newChar.combat.maitrisesGenerales || [];
    if (newChar.combat.maitrisesGenerales[index])
      newChar.combat.maitrisesGenerales[index][field] = value;
    setCurrentChar(newChar);
  };

  // Armes
  const addArme = () => {
    if (!currentChar) return;
    const newChar: Character = { ...currentChar };
    newChar.combat = newChar.combat || { armes: [] };
    newChar.combat.armes = newChar.combat.armes || [];
    newChar.combat.armes.push({
      nom: "",
      maitriseGenerale: "",
    });
    setCurrentChar(newChar);
  };

  const removeArme = (index: number) => {
    if (!currentChar) return;
    const newChar: Character = { ...currentChar };
    newChar.combat = newChar.combat || { armes: [] };
    newChar.combat.armes = newChar.combat.armes || [];
    newChar.combat.armes.splice(index, 1);
    setCurrentChar(newChar);
  };

  const updateArme = (index: number, field: string, value: any) => {
    if (!currentChar) return;
    const newChar: Character = { ...currentChar };
    newChar.combat = newChar.combat || { armes: [] };
    newChar.combat.armes = newChar.combat.armes || [];
    if (newChar.combat.armes[index]) {
      newChar.combat.armes[index][field] = value;

      // Calculer et affecter attaque si possible en utilisant la fonction utilitaire
      try {
        const armeObj = newChar.combat.armes[index];
        const attaqueVal = calculateValeurJet(newChar, armeObj);
        newChar.combat.armes[index].attaque = attaqueVal.toString();
      } catch {
        // si calcul impossible, on ne bloque pas (garder valeur courante)
      }
    }
    setCurrentChar(newChar);
  };

  if (!currentChar) {
    return (
      <CharacterListPage
        characters={characters}
        onNew={startNewCharacter}
        onView={viewCharacter}
        onEdit={editCharacter}
        onDelete={deleteCharacter}
        onExportMD={handleExportCharacterMD}
        onExportJSON={handleExportCharacterJSON}
        onImport={handleImportCharacter}
        onImportMultiple={handleImportMultipleCharacters}
      />
    );
  }

  return (
    <CharacterDetailPage
      arbres={arbres}
      equipements={equipements}
      lignages={lignages}
      religions={religions}
      character={currentChar}
      editMode={editMode}
      onUpdate={updateField}
      onSave={saveCharacter}
      onBack={goBack}
      onAddEquipement={addEquipement}
      onRemoveEquipement={removeEquipement}
      onUpdateEquipement={updateEquipement}
      onAddCompetence={addCompetence}
      onRemoveCompetence={removeCompetence}
      onUpdateCompetence={updateCompetence}
      onAddMaitriseGenerale={addMaitriseGenerale}
      onRemoveMaitriseGenerale={removeMaitriseGenerale}
      onUpdateMaitriseGenerale={updateMaitriseGenerale}
      onAddArme={addArme}
      onRemoveArme={removeArme}
      onUpdateArme={updateArme}
    />
  );
};
