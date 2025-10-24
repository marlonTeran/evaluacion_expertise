import { DeducibleApplicationService } from '../../application/service/DeducibleService';

export class DeducibleController {
  private readonly deducibleApplicationService: DeducibleApplicationService;

  constructor(deducibleApplicationService: DeducibleApplicationService) {
    this.deducibleApplicationService = deducibleApplicationService;
  }

  public async calculoDeducible(request: any): Promise<object> {
    return await this.deducibleApplicationService.calcularDeducible(request);
  }
}
