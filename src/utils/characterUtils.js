// utils/characterUtils.js
import { CAPACITY_NAMES, CARACTERISTIQUES_TARGET, CAPACITES_TARGET } from '../constants/characterDefaults';

export const calculateVie = (character) => {
  return 4 + (character?.caracteristiques.physique.constitution || 1);
};

export const calculateInitiative = (character) => {
  return (character?.caracteristiques.physique.adresse || 1) + 
         (character?.caracteristiques.mental.perception || 1);
};

export const calculateDistribution = (values) => {
  return {
    at4: values.filter(v => v === 4).length,
    at3: values.filter(v => v === 3).length,
    at2: values.filter(v => v === 2).length,
    at1: values.filter(v => v === 1).length
  };
};

export const calculateCaracteristiquesDistribution = (character) => {
  if (!character) return { at4: 0, at3: 0, at2: 0, at1: 0 };
  
  const values = [
    ...Object.values(character.caracteristiques.physique),
    ...Object.values(character.caracteristiques.social),
    ...Object.values(character.caracteristiques.mental)
  ];
  
  return calculateDistribution(values);
};

export const calculateCapacitesDistribution = (character) => {
  if (!character) return { at4: 0, at3: 0, at2: 0, at1: 0 };
  
  const values = [
    ...Object.values(character.capacites.physique),
    ...Object.values(character.capacites.social),
    ...Object.values(character.capacites.mental)
  ];
  
  return calculateDistribution(values);
};

export const getStatus = (distribution, target) => {
  return {
    at4: { current: distribution.at4, target: target.at4, diff: distribution.at4 - target.at4 },
    at3: { current: distribution.at3, target: target.at3, diff: distribution.at3 - target.at3 },
    at2: { current: distribution.at2, target: target.at2, diff: distribution.at2 - target.at2 },
    at1: { current: distribution.at1, target: target.at1, diff: distribution.at1 - target.at1 }
  };
};

export const getCaracteristiquesStatus = (character) => {
  const dist = calculateCaracteristiquesDistribution(character);
  return getStatus(dist, CARACTERISTIQUES_TARGET);
};

export const getCapacitesStatus = (character) => {
  const dist = calculateCapacitesDistribution(character);
  return getStatus(dist, CAPACITES_TARGET);
};

export const formatCapacityName = (key) => {
  return CAPACITY_NAMES[key] || key;
};

export const exportToMarkdown = (character) => {
  if (!character) return;

  const dots = (value) => '●'.repeat(value) + '○'.repeat(5 - value);
  
  let markdown = `# ${character.prenom} ${character.nom}\n\n`;
  
  // Présentation
  markdown += `## Présentation\n\n`;
  markdown += `- **Nom:** ${character.nom}\n`;
  markdown += `- **Prénom:** ${character.prenom}\n`;
  markdown += `- **Lignage:** ${character.lignage}\n\n`;
  
  // Caractéristiques
  markdown += `## Caractéristiques\n\n`;
  markdown += `### Physique\n`;
  markdown += `- Force: ${dots(character.caracteristiques.physique.force)}\n`;
  markdown += `- Constitution: ${dots(character.caracteristiques.physique.constitution)}\n`;
  markdown += `- Adresse: ${dots(character.caracteristiques.physique.adresse)}\n\n`;
  
  markdown += `### Social\n`;
  markdown += `- Charisme: ${dots(character.caracteristiques.social.charisme)}\n`;
  markdown += `- Manipulation: ${dots(character.caracteristiques.social.manipulation)}\n`;
  markdown += `- Sang froid: ${dots(character.caracteristiques.social.sangFroid)}\n\n`;
  
  markdown += `### Mental\n`;
  markdown += `- Perception: ${dots(character.caracteristiques.mental.perception)}\n`;
  markdown += `- Intelligence: ${dots(character.caracteristiques.mental.intelligence)}\n`;
  markdown += `- Astuce: ${dots(character.caracteristiques.mental.astuce)}\n\n`;
  
  // Capacités
  markdown += `## Capacités\n\n`;
  markdown += `### Physique\n`;
  Object.keys(character.capacites.physique).forEach(cap => {
    markdown += `- ${formatCapacityName(cap)}: ${dots(character.capacites.physique[cap])}\n`;
  });
  markdown += `\n`;
  
  markdown += `### Social\n`;
  Object.keys(character.capacites.social).forEach(cap => {
    markdown += `- ${formatCapacityName(cap)}: ${dots(character.capacites.social[cap])}\n`;
  });
  markdown += `\n`;
  
  markdown += `### Mental\n`;
  Object.keys(character.capacites.mental).forEach(cap => {
    markdown += `- ${formatCapacityName(cap)}: ${dots(character.capacites.mental[cap])}\n`;
  });
  markdown += `\n`;
  
  // Combat
  markdown += `## Combat\n\n`;
  markdown += `- **Vie:** ${calculateVie(character)}\n`;
  markdown += `- **Initiative:** ${calculateInitiative(character)}\n`;
  markdown += `- **Armure:** ${character.combat.armure || 'N/A'}\n\n`;
  
  if (character.combat.attaques.length > 0) {
    markdown += `### Attaques\n\n`;
    character.combat.attaques.forEach(att => {
      if (att.titre) {
        markdown += `- **${att.titre}:** ${att.valeur || 'N/A'}\n`;
      }
    });
    markdown += `\n`;
  }
  
  // Équipement
  markdown += `## Équipement\n\n`;
  character.equipement.forEach(item => {
    if (item.nom) {
      markdown += `### ${item.nom}\n`;
      if (item.descriptif) {
        markdown += `${item.descriptif}\n\n`;
      } else {
        markdown += `\n`;
      }
    }
  });
  
  // Compétences
  markdown += `## Compétences\n\n`;
  character.competences.forEach(comp => {
    if (comp.nom) {
      markdown += `### ${comp.nom} (Niveau ${comp.niveau})\n`;
      if (comp.descriptif) {
        markdown += `${comp.descriptif}\n\n`;
      } else {
        markdown += `\n`;
      }
    }
  });
  
  // Télécharger le fichier
  const blob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${character.prenom}_${character.nom}.md`.replace(/\s+/g, '_');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};