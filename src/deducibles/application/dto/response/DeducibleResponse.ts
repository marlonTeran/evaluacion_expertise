export interface DeducibleResponse {
  payload: payload[];
}

interface payload {
  deducible: number;
  copago: number;
  moneda: string;
  tipo: string;
  marca: string;
  taller: string;
}
