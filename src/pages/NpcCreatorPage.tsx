import React, { useState } from "react";
import CharacterListPage from "./CharacterListPage";
import CharacterDetailPage from "./CharacterDetailPage";
import { EMPTY_CHARACTER } from "../constants/characterDefaults";
import { Arbre, Character, Equipement, Lignage, Religion } from "../types";

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

  const saveCharacter = () => {
    if (!currentChar) return;
    if (currentChar.nom || currentChar.prenom) {
      if (currentChar.id) {
        setCharacters(
          characters.map((c) =>
            c.id === currentChar.id ? { ...currentChar } : c,
          ),
        );
      } else {
        setCharacters([
          ...characters,
          { ...currentChar, id: Date.now().toString() },
        ]);
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
    const newChar: any = { ...currentChar };
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

  const addAttaque = () => {
    if (!currentChar) return;
    const newChar: any = { ...currentChar };
    newChar.combat = newChar.combat || {
      armure: "Aucune",
      maitrisesGenerales: [],
      maitrisesSpecifiques: [],
      armes: [],
      attaques: [],
    };
    newChar.combat.attaques = newChar.combat.attaques || [];
    newChar.combat.attaques.push({ titre: "", valeur: "" });
    setCurrentChar(newChar);
  };

  const removeAttaque = (index: number) => {
    if (!currentChar) return;
    const newChar: any = { ...currentChar };
    newChar.combat = newChar.combat || { attaques: [] };
    newChar.combat.attaques = newChar.combat.attaques || [];
    if (newChar.combat.attaques.length > 1) {
      newChar.combat.attaques.splice(index, 1);
    }
    setCurrentChar(newChar);
  };

  const updateAttaque = (index: number, field: string, value: any) => {
    if (!currentChar) return;
    const newChar: any = { ...currentChar };
    newChar.combat = newChar.combat || { attaques: [] };
    newChar.combat.attaques = newChar.combat.attaques || [];
    if (newChar.combat.attaques[index])
      newChar.combat.attaques[index][field] = value;
    setCurrentChar(newChar);
  };

  const removeEquipement = (index: number) => {
    if (!currentChar) return;
    const newChar: any = { ...currentChar };
    newChar.equipement = newChar.equipement || [];
    newChar.equipement.splice(index, 1);
    setCurrentChar(newChar);
  };

  const updateEquipement = (index: number, field: string, value: any) => {
    if (!currentChar) return;
    const newChar: any = { ...currentChar };
    newChar.equipement = newChar.equipement || [];
    if (newChar.equipement[index]) newChar.equipement[index][field] = value;
    setCurrentChar(newChar);
  };

  const addEquipement = (equipement: any = null) => {
    if (!currentChar) return;
    const newChar: any = { ...currentChar };
    newChar.equipement = newChar.equipement || [];

    newChar.equipement = Array.isArray(newChar.equipements)
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
  };

  const addCompetence = (competence: any = null) => {
    if (!currentChar) return;
    const newChar: any = { ...currentChar };
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
    const newChar: any = { ...currentChar };
    newChar.competences = Array.isArray(newChar.competences)
      ? [...newChar.competences]
      : [];
    newChar.competences.splice(index, 1);
    setCurrentChar(newChar);
  };

  const updateCompetence = (index: number, field: string, value: any) => {
    if (!currentChar) return;
    const newChar: any = { ...currentChar };
    newChar.competences = Array.isArray(newChar.competences)
      ? [...newChar.competences]
      : [];
    if (newChar.competences[index]) newChar.competences[index][field] = value;
    setCurrentChar(newChar);
  };

  // Maîtrises générales
  const addMaitriseGenerale = () => {
    if (!currentChar) return;
    const newChar: any = { ...currentChar };
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
    const newChar: any = { ...currentChar };
    newChar.combat = newChar.combat || { maitrisesGenerales: [] };
    newChar.combat.maitrisesGenerales = newChar.combat.maitrisesGenerales || [];
    newChar.combat.maitrisesGenerales.splice(index, 1);
    setCurrentChar(newChar);
  };

  const updateMaitriseGenerale = (index: number, field: string, value: any) => {
    if (!currentChar) return;
    const newChar: any = { ...currentChar };
    newChar.combat = newChar.combat || { maitrisesGenerales: [] };
    newChar.combat.maitrisesGenerales = newChar.combat.maitrisesGenerales || [];
    if (newChar.combat.maitrisesGenerales[index])
      newChar.combat.maitrisesGenerales[index][field] = value;
    setCurrentChar(newChar);
  };

  // Maîtrises spécifiques
  const addMaitriseSpecifique = () => {
    if (!currentChar) return;
    const newChar: any = { ...currentChar };
    newChar.combat = newChar.combat || { maitrisesSpecifiques: [] };
    newChar.combat.maitrisesSpecifiques =
      newChar.combat.maitrisesSpecifiques || [];
    newChar.combat.maitrisesSpecifiques.push({ nom: "", niveau: 1 });
    setCurrentChar(newChar);
  };

  const removeMaitriseSpecifique = (index: number) => {
    if (!currentChar) return;
    const newChar: any = { ...currentChar };
    newChar.combat = newChar.combat || { maitrisesSpecifiques: [] };
    newChar.combat.maitrisesSpecifiques =
      newChar.combat.maitrisesSpecifiques || [];
    newChar.combat.maitrisesSpecifiques.splice(index, 1);
    setCurrentChar(newChar);
  };

  const updateMaitriseSpecifique = (
    index: number,
    field: string,
    value: any,
  ) => {
    if (!currentChar) return;
    const newChar: any = { ...currentChar };
    newChar.combat = newChar.combat || { maitrisesSpecifiques: [] };
    newChar.combat.maitrisesSpecifiques =
      newChar.combat.maitrisesSpecifiques || [];
    if (newChar.combat.maitrisesSpecifiques[index])
      newChar.combat.maitrisesSpecifiques[index][field] = value;
    setCurrentChar(newChar);
  };

  // Armes
  const addArme = () => {
    if (!currentChar) return;
    const newChar: any = { ...currentChar };
    newChar.combat = newChar.combat || { armes: [] };
    newChar.combat.armes = newChar.combat.armes || [];
    newChar.combat.armes.push({
      nom: "",
      maitriseGenerale: "",
      maitriseSpecifique: "",
    });
    setCurrentChar(newChar);
  };

  const removeArme = (index: number) => {
    if (!currentChar) return;
    const newChar: any = { ...currentChar };
    newChar.combat = newChar.combat || { armes: [] };
    newChar.combat.armes = newChar.combat.armes || [];
    newChar.combat.armes.splice(index, 1);
    setCurrentChar(newChar);
  };

  const updateArme = (index: number, field: string, value: any) => {
    if (!currentChar) return;
    const newChar: any = { ...currentChar };
    newChar.combat = newChar.combat || { armes: [] };
    newChar.combat.armes = newChar.combat.armes || [];
    if (newChar.combat.armes[index]) newChar.combat.armes[index][field] = value;
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
      onAddAttaque={addAttaque}
      onRemoveAttaque={removeAttaque}
      onUpdateAttaque={updateAttaque}
      onAddEquipement={addEquipement}
      onRemoveEquipement={removeEquipement}
      onUpdateEquipement={updateEquipement}
      onAddCompetence={addCompetence}
      onRemoveCompetence={removeCompetence}
      onUpdateCompetence={updateCompetence}
      onAddMaitriseGenerale={addMaitriseGenerale}
      onRemoveMaitriseGenerale={removeMaitriseGenerale}
      onUpdateMaitriseGenerale={updateMaitriseGenerale}
      onAddMaitriseSpecifique={addMaitriseSpecifique}
      onRemoveMaitriseSpecifique={removeMaitriseSpecifique}
      onUpdateMaitriseSpecifique={updateMaitriseSpecifique}
      onAddArme={addArme}
      onRemoveArme={removeArme}
      onUpdateArme={updateArme}
    />
  );
};
