export const riskGroups = {
  dc: 'Doença respiratória',
  hiv: 'HIV',
  diab: 'Diabetes',
  hiperT: 'Hipertensão',
  doenCardio: 'Doenças cardiovasculares',
} as const;

export type RiskGroupKey = keyof typeof riskGroups;

export enum RiskGroupsEnum {
  DC = 'dc', // Doença respiratória
  HIV = 'hiv', // HIV
  DIABETES = 'diab', // Diabetes
  HYPERTENSION = 'hiperT', // Hipertensão
  CARDIOVASCULAR = 'doenCardio', // Doenças cardiovasculares
}
