import { DeducibleRequest } from '../../application/dto/request/DeducibleRequest';
import { DeducibleResponse } from '../../application/dto/response/DeducibleResponse';
import { INCLUYE_TEXTO_1, INCLUYE_TEXTO_2, INCLUYE_TEXTO_3,TEXTO_REGEX, TEXTO_REGEX_DEDUCIBLE, TEXTO_REGEX_MONEDA, TEXTO_REGEX_COPAGO,
         TEXTO_MONEDA_USD, TEXTO_MONEDA_SOL, TEXTO_MONEDA_BUSQ,TEXTO_MULTIMARCA_1, TEXTO_MULTIMARCA_2, TEXTO_TALLERES_1, TEXTO_TALLERES_2,
         TEXTO_NO_TALLER, TEXTO_NO_TIPO, TEXTO_MARCA, TEXTO_NO_MARCA, INCLUYE_TEXTO_4, INCLUYE_TEXTO_5, INCLUYE_TEXTO_6 } from '../utils/Constants';

export class DeducibleDomainService {
  public async calcularDeducible(request: DeducibleRequest): Promise<DeducibleResponse> {
    const { text } = request.payload;

    let flagFinal = false;

    const matches = [...text.matchAll(TEXTO_REGEX)];console.log('matches:', matches);
    const payload = matches.map(match => {
      if(flagFinal) return null;
      if((text.includes(INCLUYE_TEXTO_1) && !match[0].includes(INCLUYE_TEXTO_2))
         || (match[0].includes(INCLUYE_TEXTO_4) 
         || match[0].includes(INCLUYE_TEXTO_5) 
         || match[0].includes(INCLUYE_TEXTO_6))) {
        return null;
      }
      if(match[0].includes(INCLUYE_TEXTO_3)) {
        flagFinal = true;
      }

      return this.procesarDeducible(match[0]);
    }).filter(Boolean);     

    console.log('Resultado:', payload);
    return {payload} as DeducibleResponse;
  }

  public procesarDeducible(cadena: any) {
    try {
      const deducibleArr = cadena.match(TEXTO_REGEX_DEDUCIBLE);
      const monedaMatchArr = cadena.match(TEXTO_REGEX_MONEDA);
      const copagoMatchArr = cadena.match(TEXTO_REGEX_COPAGO);

      const deducible = parseInt(deducibleArr[1], 10);
      const moneda = monedaMatchArr[1].includes(TEXTO_MONEDA_BUSQ) ? TEXTO_MONEDA_USD : TEXTO_MONEDA_SOL;
      const copago = parseFloat(copagoMatchArr[1]);
      const tipo = cadena.includes(TEXTO_MULTIMARCA_1) || cadena.includes(TEXTO_MULTIMARCA_2) ? TEXTO_MULTIMARCA_1 : TEXTO_NO_TIPO;
      const marca = cadena.includes(TEXTO_MARCA) ? TEXTO_MARCA.toUpperCase() : TEXTO_NO_MARCA;
      const taller = cadena.includes(TEXTO_TALLERES_1)
                    ? TEXTO_TALLERES_1
                    : cadena.includes(TEXTO_TALLERES_2)
                    ? TEXTO_TALLERES_2
                    : TEXTO_NO_TALLER

      return {
        deducible,
        copago,
        moneda,
        tipo,
        marca,
        taller
      };
    } catch (error) {
      console.error('Error procesando deducible:', error);
      return null;
    }
  }
}