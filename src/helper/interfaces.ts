export interface SinistroType {
  id: number;
  name: string;
}

export interface Plan {
  id: number;
  name: string;
  description: string;
}

export interface SinistroType {
  id: number;
  name: string;
}

export interface Usuario {
  apolice: string;
  planType: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  cep: string;
  street: string;
  district: string;
  city: string;
  state: string;
}

export interface Technician {
  matricula: string;
  technicianBy: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  nctps: string;
  cep: string;
  street: string;
  district: string;
  city: string;
  state: string;
}

export interface Sinistro {
  matricula: string;
  apolice: string;
  planType: string;
  initHour: Date;
  endHour: Date;
  address: string;
  district: string;
  city: string;
  cep: string;
  resp_locale: string;
  phone_contact: string;
  sinistrosTypes: SinistroType[];
}

export interface Chamado {
  apolice: string;
  planType: string;
  date: Date;
  cep: string;
  address: string;
  district: string;
  city: string;
  resp_locale: string;
  phone_contact: string;
  sinistrosTypes: SinistroType[];
}

export interface ResponsePlans {
  plans: Plan[];
}
export interface ResponseSinistrosType {
  sinistrosTypes: SinistroType[];
}

export interface ResponseSinistros {
  sinistros: Sinistro[];
}

export interface ResponseChamados {
  chamados: Chamado[];
}

export interface ResponseTechnician {
  technicians: Technician;
}

export interface ResponseUsuario {
  usuarios: Usuario;
}
