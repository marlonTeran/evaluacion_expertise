import { DeducibleApplicationService } from '../../application/service/DeducibleService';
import { DeducibleDomainService } from '../../domain/service/DeducibleService';
import { DeducibleController } from '../controller/DeducibleController';

export const handler = async (event:any) => {
    const deducibleDomainService = new DeducibleDomainService();
    const deducibleApplicationService = new DeducibleApplicationService(deducibleDomainService);
    const deducibleController = new DeducibleController(deducibleApplicationService);

    const result = await deducibleController.calculoDeducible(event);

    return result;
}
