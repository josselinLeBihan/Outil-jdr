import React, { useState } from 'react';
import CharacterListPage from './CharacterListPage';
import CharacterDetailPage from './CharacterDetailPage';
import { EMPTY_CHARACTER } from '../constants/characterDefaults';


export const NpcCreatorPage = ({arbres}) =>{
  const [characters, setCharacters] = useState([]);
  const [currentChar, setCurrentChar] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const startNewCharacter = () => {
    setCurrentChar({ ...EMPTY_CHARACTER });
    setEditMode(true);
  };

  const viewCharacter = (char) => {
    setCurrentChar({ ...char });
    setEditMode(false);
  };

  const editCharacter = (char) => {
    setCurrentChar({ ...char });
    setEditMode(true);
  };

  const saveCharacter = () => {
    if (currentChar.nom || currentChar.prenom) {
      if (currentChar.id) {
        setCharacters(characters.map(c => c.id === currentChar.id ? { ...currentChar } : c));
      } else {
        setCharacters([...characters, { ...currentChar, id: Date.now() }]);
      }
      setCurrentChar(null);
      setEditMode(false);
    }
  };

  const deleteCharacter = (id) => {
    setCharacters(characters.filter(c => c.id !== id));
  };

  const goBack = () => {
    setCurrentChar(null);
    setEditMode(false);
  };

  const updateField = (path, value) => {
    const newChar = { ...currentChar };
    const keys = path.split('.');
    let obj = newChar;
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    setCurrentChar(newChar);
  };

  const addAttaque = () => {
    const newChar = { ...currentChar };
    newChar.combat.attaques.push({ titre: '', valeur: '' });
    setCurrentChar(newChar);
  };

  const removeAttaque = (index) => {
    const newChar = { ...currentChar };
    if (newChar.combat.attaques.length > 1) {
      newChar.combat.attaques.splice(index, 1);
    }
    setCurrentChar(newChar);
  };

  const updateAttaque = (index, field, value) => {
    const newChar = { ...currentChar };
    newChar.combat.attaques[index][field] = value;
    setCurrentChar(newChar);
  };

  const addEquipement = () => {
    const newChar = { ...currentChar };
    newChar.equipement.push({ nom: '', descriptif: '' });
    setCurrentChar(newChar);
  };

  const removeEquipement = (index) => {
    const newChar = { ...currentChar };
    newChar.equipement.splice(index, 1);
    setCurrentChar(newChar);
  };

  const updateEquipement = (index, field, value) => {
    const newChar = { ...currentChar };
    newChar.equipement[index][field] = value;
    setCurrentChar(newChar);
  };

const addCompetence = (competence = null) => {
  console.log('Adding competence:', competence);
  const newChar = { ...currentChar };
  if (!Array.isArray(newChar.competences)) newChar.competences = [];

  const toAdd = competence
    ? {
        id: competence.id ?? Date.now(),
        nom: competence.nom ?? '',
        description: competence.description ?? '',
        fonctionnement: competence.fonctionnement ?? '',
        niveau: competence.niveau ?? 1,
        modificationPhysique: competence.modificationPhysique || '',
        // gardez d'autres champs si besoin
      }
    : { nom: '', description: '', niveau: 1, id: Date.now() };

  // n'altère pas l'array original
  newChar.competences = [...newChar.competences, toAdd];

  console.log('Adding :', toAdd);
  setCurrentChar(newChar);
};

const removeCompetence = (index) => {
  const newChar = { ...currentChar };
  if (!Array.isArray(newChar.competences)) newChar.competences = [];
  newChar.competences.splice(index, 1);
  setCurrentChar(newChar);
};

const updateCompetence = (index, field, value) => {
  const newChar = { ...currentChar };
  if (!Array.isArray(newChar.competences)) newChar.competences = [];
  newChar.competences[index][field] = value;
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
    />
  );
}