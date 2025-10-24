import { handler } from '../../src/deducibles/infraestructure/bootstrap/handler';
const { getPayloadInput, getRespuestaEsperada } = require('../util/AWSTestHelper');
const { loadFeature, defineFeature } = require('jest-cucumber');
const feature = loadFeature('../deducibles.feature', { loadRelativePath: true, errors: true });

defineFeature(feature, (test: any) => {
  test('Póliza con deducible texto plano',({ given, when, then }: any) =>  {
    let request: any;
    let response: any;

    given(/^la póliza tiene un deducible en forma del (.*)$/, async (texto: any) => {
        request = getPayloadInput(texto);
    });

    when('ejecutamos el conversor de deducible', async () => {
     response = await handler(request);
    });

    then(/^obtenemos la parametrización del deducible en (.*)$/, (detalle: any) => {
        const respuestaEsperada = getRespuestaEsperada(detalle);
        expect(response).toEqual(respuestaEsperada);
    });
  });
});
