import React, { useState, useEffect } from "react";
import { CompetenceDetail } from "./CompetenceDetail";
import { Arbre, Competence, SousArbre } from "../types";

interface CompetenceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (competence: Competence) => void;
  arbres: Arbre[];
}

const CompetenceSearchModal: React.FC<CompetenceSearchModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  arbres = [],
}) => {
  const [step, setStep] = useState<
    "arbres" | "sousArbres" | "competences" | "competenceDetail"
  >("arbres");
  const [selectedArbre, setSelectedArbre] = useState<Arbre | null>(null);
  const [selectedSousArbre, setSelectedSousArbre] = useState<SousArbre | null>(
    null,
  );
  const [selectedCompetenceDetail, setSelectedCompetenceDetail] =
    useState<Competence | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setStep("arbres");
      setSelectedArbre(null);
      setSelectedSousArbre(null);
      setSelectedCompetenceDetail(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectCompetenceDetail = (competence: Competence) => {
    setSelectedCompetenceDetail(competence);
    setStep("competenceDetail");
  };

  const handleSelectArbre = (arbre: Arbre) => {
    setSelectedArbre(arbre);
    setStep("sousArbres");
  };

  const handleSelectSousArbre = (sousArbre: SousArbre) => {
    setSelectedSousArbre(sousArbre);
    setStep("competences");
  };

  const handleSelectCompetence = (competence: Competence) => {
    if (onSelect) onSelect(competence);
    if (onClose) onClose();
  };

  const goBack = () => {
    if (step === "competenceDetail") {
      setStep("competences");
      setSelectedCompetenceDetail(null);
    } else if (step === "competences") {
      setStep("sousArbres");
      setSelectedSousArbre(null);
    } else if (step === "sousArbres") {
      setStep("arbres");
      setSelectedArbre(null);
    } else {
      onClose && onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-red-400">
              Choisir une compétence
            </h2>
            <div className="text-sm text-gray-400 mt-1">
              {step === "arbres" && "Sélectionnez un arbre"}
              {step === "sousArbres" && `Arbre: ${selectedArbre?.nom || ""}`}
              {step === "competences" &&
                `Arbre: ${selectedArbre?.nom || ""} › ${selectedSousArbre?.nom || ""}`}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={goBack}
              className="text-sm text-gray-300 hover:text-white px-2"
            >
              Retour
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {step === "arbres" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.isArray(arbres) && arbres.length > 0 ? (
                arbres.map((arbre, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelectArbre(arbre)}
                    className="bg-gray-700 p-4 rounded cursor-pointer hover:bg-gray-600"
                  >
                    <h3 className="font-bold text-white">{arbre.nom}</h3>
                    {arbre.descriptif && (
                      <p className="text-gray-300 text-sm">
                        {arbre.descriptif}
                      </p>
                    )}
                    <div className="text-xs text-gray-400 mt-2">
                      {Array.isArray(arbre.sousArbres)
                        ? arbre.sousArbres.length
                        : 0}{" "}
                      sous‑arbres
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-400">Aucun arbre disponible.</div>
              )}
            </div>
          )}

          {step === "sousArbres" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.isArray(selectedArbre?.sousArbres) &&
              selectedArbre.sousArbres.length > 0 ? (
                selectedArbre.sousArbres.map((sa, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelectSousArbre(sa)}
                    className="bg-gray-700 p-4 rounded cursor-pointer hover:bg-gray-600"
                  >
                    <h3 className="font-bold text-white">{sa.nom}</h3>
                    {sa.descriptif && (
                      <p className="text-gray-300 text-sm">{sa.descriptif}</p>
                    )}
                    <div className="text-xs text-gray-400 mt-2">
                      {Array.isArray(sa.competences)
                        ? sa.competences.length
                        : 0}{" "}
                      compétences
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-400">
                  Aucun sous‑arbre disponible pour cet arbre.
                </div>
              )}
            </div>
          )}

          {step === "competences" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.isArray(selectedSousArbre?.competences) &&
              selectedSousArbre.competences.length > 0 ? (
                selectedSousArbre.competences.map((c, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelectCompetenceDetail(c)}
                    className="bg-gray-700 p-4 rounded cursor-pointer hover:bg-gray-600"
                  >
                    <h3 className="font-bold text-white">{c.nom}</h3>
                    {c.description && (
                      <p className="text-gray-300 text-sm">{c.description}</p>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-gray-400">
                  Aucune compétence dans ce sous‑arbre.
                </div>
              )}
            </div>
          )}

          {step === "competenceDetail" && selectedCompetenceDetail && (
            <CompetenceDetail
              competence={selectedCompetenceDetail}
              onBack={goBack}
              isCreationMode={true}
              onSelect={handleSelectCompetence}
            />
          )}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompetenceSearchModal;
