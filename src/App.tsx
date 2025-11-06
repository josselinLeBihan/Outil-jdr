import React, { useState, useEffect, useCallback } from "react";
import { PAGES } from "./constants/navigation";
import {
  parseCSVFile,
  transformCSVToSkillsData,
  transformCSVToLignageData,
  transformCSVToReligionData,
  transformCSVToEquipementsData,
  transformSkillsDataToCSV,
  saveCSVFile,
} from "./utils/csvParser";
import { Breadcrumb } from "./components/Breadcrumb";
import { UploadPage } from "./pages/UploadPage";
import { HomePage } from "./pages/HomePage";
import { ArbrePage } from "./pages/ArbrePage";
import { EquipementsPage } from "./pages/EquipementsPage";
import { SousArbrePage } from "./pages/SousArbrePage";
import { CompetencePage } from "./pages/CompetencePage";
import { NpcCreatorPage } from "./pages/NpcCreatorPage";
import {
  Arbre,
  SousArbre,
  Competence,
  Lignage,
  Religion,
  Equipement,
} from "./types";

const App: React.FC = () => {
  const [skillsData, setSkillsData] = useState<{ arbres: Arbre[] } | null>(
    null,
  );

  const [equipementsData, setEquipementsData] = useState<Equipement[] | null>(
    null,
  );
  const [lignageData, setLignageData] = useState<Lignage[] | null>(null);
  const [religionData, setReligionData] = useState<Religion[] | null>(null);
  const [currentPage, setCurrentPage] = useState(PAGES.UPLOAD);
  const [selectedArbre, setSelectedArbre] = useState<Arbre | null>(null);
  const [selectedSousArbre, setSelectedSousArbre] = useState<SousArbre | null>(
    null,
  );
  const [selectedCompetence, setSelectedCompetence] =
    useState<Competence | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const csvData = await parseCSVFile(file);
      const transformed = transformCSVToSkillsData(csvData);

      if (transformed.arbres.length === 0) {
        setError("Aucune donnée valide trouvée dans le fichier CSV");
      } else {
        setSkillsData(transformed);
        setCurrentPage(PAGES.HOME);
      }
    } catch (err: unknown) {
      setError(
        "Erreur lors du traitement du fichier : " +
          ((err as Error)?.message ?? String(err)),
      );
    } finally {
      setLoading(false);
    }
  };

  const navigateToUpload = () => {
    setCurrentPage(PAGES.UPLOAD);
  };

  const navigateToNPCreator = () => {
    setCurrentPage(PAGES.NPC_CREATOR);
  };

  const navigateToEquipements = () => {
    setCurrentPage(PAGES.EQUIPEMENTS);
  };

  const navigateToArbre = (arbre: Arbre) => {
    setSelectedArbre(arbre);
    setSelectedSousArbre(null);
    setSelectedCompetence(null);
    setCurrentPage(PAGES.ARBRE);
  };

  const navigateToSousArbre = (sousArbre: SousArbre) => {
    setSelectedSousArbre(sousArbre);
    setSelectedCompetence(null);
    setCurrentPage(PAGES.SOUS_ARBRE);
  };

  const navigateToCompetence = (competence: Competence) => {
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
        // Chargement des equipements
        const equipementsResponse = await fetch("/assets/equipement_data.csv");
        if (!equipementsResponse.ok) {
          throw new Error("Fichier equipement_data.csv non trouvé");
        }

        // Chargement des compétences
        const skillsResponse = await fetch("/assets/default_data.csv");
        if (!skillsResponse.ok) {
          throw new Error("Fichier default_data.csv non trouvé");
        }

        // Chargement des lignages
        const lignageResponse = await fetch("/assets/lignage_data.csv");
        if (!lignageResponse.ok) {
          throw new Error("Fichier lignage_data.csv non trouvé");
        }
        // Chargement des religions
        const religionsResponse = await fetch("/assets/religions_data.csv");
        if (!lignageResponse.ok) {
          throw new Error("Fichier religions_data.csv non trouvé");
        }

        const skillsBlob = await skillsResponse.blob();
        const equipementsBlob = await equipementsResponse.blob();
        const lignageBlob = await lignageResponse.blob();
        const religionsBlob = await religionsResponse.blob();

        const equipementsFile = new File(
          [equipementsBlob],
          "equipement_data.csv",
          {
            type: "text/csv",
          },
        );
        const skillsFile = new File([skillsBlob], "default_data.csv", {
          type: "text/csv",
        });
        const lignageFile = new File([lignageBlob], "lignage_data.csv", {
          type: "text/csv",
        });
        const religionsFile = new File([religionsBlob], "religions_data.csv", {
          type: "text/csv",
        });

        const [
          equipementCsvData,
          skillsCsvData,
          lignageCsvData,
          religionsCsvData,
        ] = await Promise.all([
          parseCSVFile(equipementsFile),
          parseCSVFile(skillsFile),
          parseCSVFile(lignageFile),
          parseCSVFile(religionsFile),
        ]);

        const transformedEquipements =
          transformCSVToEquipementsData(equipementCsvData);
        const transformedSkills = transformCSVToSkillsData(skillsCsvData);
        const transformedLignage = transformCSVToLignageData(lignageCsvData);
        const transformedReligions =
          transformCSVToReligionData(religionsCsvData);

        if (transformedSkills.arbres.length === 0) {
          setError(
            "Aucune donnée valide trouvée dans le fichier CSV des compétences",
          );
        } else {
          setEquipementsData(transformedEquipements);
          setSkillsData(transformedSkills);
          setLignageData(transformedLignage);
          setReligionData(transformedReligions);
          setCurrentPage(PAGES.HOME);
          console.log("Lignage data loaded:", transformedLignage);
          console.log("Skills data loaded:", transformedSkills);
        }
      } catch (err: unknown) {
        console.error("Erreur détaillée:", err);
        setError(
          "Erreur lors du chargement des données : " +
            ((err as Error)?.message ?? String(err)),
        );
      }
    };
    loadDefaultData();
  }, []);

  const handleEditCompetence = useCallback((updatedCompetence: Competence) => {
    setSkillsData((prevData) => {
      if (!prevData) return prevData;

      const updatedArbres = prevData.arbres.map((arbre) => ({
        ...arbre,
        sousArbres: arbre.sousArbres.map((sousArbre) => ({
          ...sousArbre,
          competences: sousArbre.competences.map((comp) =>
            comp.id === updatedCompetence.id ? updatedCompetence : comp,
          ),
        })),
      }));

      console.log("Updated Arbres:", updatedArbres);
      return { arbres: updatedArbres };
    });

    // Mettre à jour la compétence sélectionnée
    setSelectedCompetence(updatedCompetence);
  }, []);

  const exportData = async () => {
    if (!skillsData) return;
    const csvRows = transformSkillsDataToCSV(skillsData);
    const success = await saveCSVFile(csvRows, "competences.csv");

    if (success) {
      console.log("Exportation réussie !");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Menu de navigation */}

        {currentPage && (
          <header className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold">Créateur de personnage</h1>
            <nav className="space-x-2">
              <button
                onClick={navigateHome}
                className={`px-3 py-1 rounded ${currentPage === PAGES.HOME ? "bg-slate-800 text-white" : "bg-white border"}`}
              >
                Compétences
              </button>
              <button
                onClick={navigateToNPCreator}
                className={`px-3 py-1 rounded ${currentPage === PAGES.NPC_CREATOR ? "bg-slate-800 text-white" : "bg-white border"}`}
              >
                Créateur de PNJ
              </button>
              <button
                onClick={navigateToEquipements}
                className={`px-3 py-1 rounded ${currentPage === PAGES.EQUIPEMENTS ? "bg-slate-800 text-white" : "bg-white border"}`}
              >
                Equipements
              </button>
              <button
                onClick={navigateToUpload}
                className={`px-3 py-1 rounded ${currentPage === PAGES.UPLOAD ? "bg-slate-800 text-white" : "bg-white border"}`}
              >
                Nouvelles données
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
          <UploadPage
            onFileUpload={handleFileUpload}
            loading={loading}
            error={error}
          />
        )}
        {currentPage === PAGES.HOME && skillsData && (
          <>
            <HomePage
              arbres={skillsData.arbres}
              onSelectArbre={navigateToArbre}
            />
          </>
        )}
        {currentPage === PAGES.ARBRE && selectedArbre && (
          <>
            <button
              className="px-3 py-1 rounded mb-4 bg-green-600 text-white hover:bg-green-700"
              onClick={exportData}
            >
              Exporter les changements
            </button>
            <ArbrePage
              arbre={selectedArbre}
              onSelectSousArbre={navigateToSousArbre}
            />
          </>
        )}
        {currentPage === PAGES.SOUS_ARBRE && selectedSousArbre && (
          <SousArbrePage
            sousArbre={selectedSousArbre}
            onSelectCompetence={navigateToCompetence}
          />
        )}
        {currentPage === PAGES.COMPETENCE && selectedCompetence && (
          <CompetencePage
            competence={selectedCompetence}
            onEditCompetence={handleEditCompetence}
          />
        )}
        {currentPage === PAGES.NPC_CREATOR && skillsData && lignageData && (
          <NpcCreatorPage
            equipements={equipementsData}
            arbres={skillsData.arbres}
            lignages={lignageData}
            religions={religionData}
          />
        )}
        {currentPage === PAGES.EQUIPEMENTS && equipementsData && (
          <EquipementsPage equipements={equipementsData} />
        )}
      </div>
    </div>
  );
};

export default App;
