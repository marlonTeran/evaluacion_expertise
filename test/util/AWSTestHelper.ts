export const getPayloadInput = (inputName: any) => require(`./../request/${inputName}.json`);
export const getRespuestaEsperada = (responseName: any) => require(`./../response/${responseName}.json`);
