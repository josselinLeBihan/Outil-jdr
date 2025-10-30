// ...existing code...
import React, { use, useState, useEffect } from 'react';
import { PAGES } from './constants/navigation';
import { parseCSVFile, transformCSVToSkillsData } from './utils/csvParser';
import { Breadcrumb } from './components/Breadcrumb';
import { UploadPage } from './pages/UploadPage';
import { HomePage } from './pages/HomePage';
import { ArbrePage } from './pages/ArbrePage';
import { SousArbrePage } from './pages/SousArbrePage';
import { CompetencePage } from './pages/CompetencePage';
import { NpcCreatorPage } from './pages/NpcCreatorPage';


const App = () => {
  const [skillsData, setSkillsData] = useState(null);
  const [currentPage, setCurrentPage] = useState(PAGES.UPLOAD);
  const [selectedArbre, setSelectedArbre] = useState(null);
  const [selectedSousArbre, setSelectedSousArbre] = useState(null);
  const [selectedCompetence, setSelectedCompetence] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const csvData = await parseCSVFile(file);
      console.log(csvData)
      const transformed = transformCSVToSkillsData(csvData);
      
      if (transformed.arbres.length === 0) {
        setError('Aucune donnée valide trouvée dans le fichier CSV');
      } else {
        setSkillsData(transformed);
        setCurrentPage(PAGES.HOME);
      }
    } catch (err) {
      setError('Erreur lors du traitement du fichier : ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const navigateToNPCreator = () => {
    setCurrentPage(PAGES.NPC_CREATOR);
  }

  const navigateToArbre = (arbre) => {
    setSelectedArbre(arbre);
    setSelectedSousArbre(null);
    setSelectedCompetence(null);
    setCurrentPage(PAGES.ARBRE);
  };

  const navigateToSousArbre = (sousArbre) => {
    setSelectedSousArbre(sousArbre);
    setSelectedCompetence(null);
    setCurrentPage(PAGES.SOUS_ARBRE);
  };

  const navigateToCompetence = (competence) => {
    setSelectedCompetence(competence);
    setCurrentPage(PAGES.COMPETENCE);
  };

  const navigateHome = () => {
    setCurrentPage(PAGES.HOME);
    setSelectedArbre(null);
    setSelectedSousArbre(null);
    setSelectedCompetence(null);
  };


useEffect(() => {
    const loadDefaultData = async () => {
      try {
        console.log('Début du chargement des données par défaut');
        const response = await fetch('/assets/default_data.csv');
        if (!response.ok) {
          throw new Error('Fichier default_data.csv non trouvé');
        }
        
        const blob = await response.blob();
        const file = new File([blob], 'default_data.csv', { type: 'text/csv' });
        
        const csvData = await parseCSVFile(file);
        const transformed = transformCSVToSkillsData(csvData);
        
        console.log('Données transformées:', transformed);
        
        if (transformed.arbres.length === 0) {
          setError('Aucune donnée valide trouvée dans le fichier CSV');
        } else {
          setSkillsData(transformed);
          setCurrentPage(PAGES.HOME);
        }
      } catch (err) {
        console.error('Erreur détaillée:', err);
        setError('Erreur lors du chargement des données par défaut : ' + err.message);
      }
    };
    console.log('SkillsData:', skillsData)
    loadDefaultData();
}, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Menu de navigation */}

        {currentPage !== PAGES.UPLOAD && (
          <header className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold">Créateur de personnage</h1>
            <nav className="space-x-2">
              <button
                onClick={navigateHome}
                className={`px-3 py-1 rounded ${currentPage === PAGES.HOME ? 'bg-slate-800 text-white' : 'bg-white border'}`}
              >
              Compétences
            </button>
            <button
              onClick={navigateToNPCreator}
              className={`px-3 py-1 rounded ${currentPage === PAGES.NPC_CREATOR ? 'bg-slate-800 text-white' : 'bg-white border'}`}
            >
              Créateur de PNJ
            </button>
          </nav>
        </header>
        )}
       

        {skillsData && (
          <Breadcrumb
            selectedArbre={selectedArbre}
            selectedSousArbre={selectedSousArbre}
            selectedCompetence={selectedCompetence}
            onNavigateHome={navigateHome}
            onNavigateToArbre={navigateToArbre}
            onNavigateToSousArbre={navigateToSousArbre}
          />
        )}
        
        {currentPage === PAGES.UPLOAD && (
          <UploadPage onFileUpload={handleFileUpload} loading={loading} error={error} />
        )}
        {currentPage === PAGES.HOME && skillsData && (
          <HomePage arbres={skillsData.arbres} onSelectArbre={navigateToArbre} />
        )}
        {currentPage === PAGES.ARBRE && selectedArbre && (
          <ArbrePage arbre={selectedArbre} onSelectSousArbre={navigateToSousArbre} />
        )}
        {currentPage === PAGES.SOUS_ARBRE && selectedSousArbre && (
          <SousArbrePage sousArbre={selectedSousArbre} onSelectCompetence={navigateToCompetence} />
        )}
        {currentPage === PAGES.COMPETENCE && selectedCompetence && (
          <CompetencePage competence={selectedCompetence} />
        )}
        {currentPage === PAGES.NPC_CREATOR  && skillsData &&(
          <NpcCreatorPage arbres={skillsData.arbres}/>
        )}
      </div>
    </div>
  );
};

export default App;
// ...existing code...