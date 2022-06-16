export class Chapitre {
  nom: string;
  desc: string;
  formation: string;
}

export class Ressource {
  titre: string;
  desc: string;
  idch: string;
  fic: string;
  type: string;
}
export class Formation {
  name: string;
  desc: string;
  cat: string;
  nbrH: number;
  year: number;

  dateDepot: string;
  urlimg: string;
  chapitre: string[];
  apprenants: string[];
  month: number;
}
export class Categori {
  name: string;
  logo: string;
}
export class Apprenant {
  name: string;
  lastname: string;
  tel: number;
  isValid: boolean;
  email: string;
  password: string;
  logo: string;
  formations: string[];
  idR: string[];
  mois: number;
  year: number;
}
export class Formateur {
  name: string;
  lastname: string;
  tel: number;
  isValid: boolean;
  email: string;
  password: string;
  logo: string;
  spec: string;
  idR: string[];
  mois: number;
  year: number;
}
