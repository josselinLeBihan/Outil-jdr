// pages/CharacterDetailPage.jsx
import React from 'react';
import { Save, Download } from 'lucide-react';
import PresentationSection from '../components/sections/PresentationSection';
import CaracteristiquesSection from '../components/sections/CaracteristiquesSection';
import CapacitesSection from '../components/sections/CapacitesSection';
import CombatSection from '../components/sections/CombatSection';
import EquipementSection from '../components/sections/EquipementSection';
import CompetencesSection from '../components/sections/CompetencesSection';
import { exportToMarkdown } from '../utils/characterUtils';

const CharacterDetailPage = ({
  arbres, 
  character, 
  editMode, 
  onUpdate,
  onSave, 
  onBack,
  onAddAttaque,
  onRemoveAttaque,
  onUpdateAttaque,
  onAddEquipement,
  onRemoveEquipement,
  onUpdateEquipement,
  onAddCompetence,
  onRemoveCompetence,
  onUpdateCompetence,
  onAddMaitriseGenerale,
  onRemoveMaitriseGenerale,
  onUpdateMaitriseGenerale,
  onAddMaitriseSpecifique,
  onRemoveMaitriseSpecifique,
  onUpdateMaitriseSpecifique,
  onAddArme,
  onRemoveArme,
  onUpdateArme
}) => {
  return (
    <div className="min-h-screen  text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-red-500">
            {editMode ? 'Créer un Personnage' : 'Fiche de Personnage'}
          </h1>
          <div className="flex gap-2">
            {!editMode && (
              <button
                onClick={() => exportToMarkdown(character)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
              >
                <Download size={20} />
                Exporter MD
              </button>
            )}
            {editMode && (
              <button
                onClick={onSave}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
              >
                <Save size={20} />
                Enregistrer
              </button>
            )}
            <button
              onClick={onBack}
              className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg"
            >
              Retour
            </button>
          </div>
        </div>

        <PresentationSection 
          character={character}
          editMode={editMode}
          onUpdate={onUpdate}
          arbres={arbres}
        />

        <CaracteristiquesSection 
          character={character}
          editMode={editMode}
          onUpdate={onUpdate}
        />

        <CapacitesSection 
          character={character}
          editMode={editMode}
          onUpdate={onUpdate}
        />

        <CombatSection 
          character={character}
          editMode={editMode}
          onUpdate={onUpdate}
          onAddAttaque={onAddAttaque}
          onRemoveAttaque={onRemoveAttaque}
          onUpdateAttaque={onUpdateAttaque}
          onAddMaitriseGenerale={onAddMaitriseGenerale}
          onRemoveMaitriseGenerale={onRemoveMaitriseGenerale}
          onUpdateMaitriseGenerale={onUpdateMaitriseGenerale}
          onAddMaitriseSpecifique={onAddMaitriseSpecifique}
          onRemoveMaitriseSpecifique={onRemoveMaitriseSpecifique}
          onUpdateMaitriseSpecifique={onUpdateMaitriseSpecifique}
          onAddArme={onAddArme}
          onRemoveArme={onRemoveArme}
          onUpdateArme={onUpdateArme}
        />

        <EquipementSection 
          character={character}
          editMode={editMode}
          onUpdate={onUpdateEquipement}
          onAdd={onAddEquipement}
          onRemove={onRemoveEquipement}
        />

        <CompetencesSection 
          arbres={arbres}
          character={character}
          editMode={editMode}
          onUpdate={onUpdateCompetence}
          onAdd={onAddCompetence}
          onRemove={onRemoveCompetence}
        />
      </div>
    </div>
  );
};

export default CharacterDetailPage;