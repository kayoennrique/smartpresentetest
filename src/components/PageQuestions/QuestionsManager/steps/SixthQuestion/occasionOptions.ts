export type OccasionOption = {
  id: string;
  label: string;
};

export const OCCASION_OPTIONS: OccasionOption[] = [
  { id: "ANIVERSARIO", label: "Aniversário" },
  { id: "ANIV_NAMORO", label: "Aniversário de namoro" },
  { id: "ANIV_CASAMENTO", label: "Aniversário de casamento" },
  { id: "DIA_DOS_NAMORADOS", label: "Dia dos Namorados" },
  { id: "SEM_OCASIAO", label: "Apenas para presentear" },
];
