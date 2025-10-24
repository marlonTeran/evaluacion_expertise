import { DeducibleDomainService } from '../../domain/service/DeducibleService';
import { DeducibleRequest } from '../dto/request/DeducibleRequest';
import { DeducibleResponse } from '../dto/response/DeducibleResponse';

export class DeducibleApplicationService {
  private readonly deducibleDomainService: DeducibleDomainService;

  constructor(deducibleDomainService: DeducibleDomainService) {
    this.deducibleDomainService = deducibleDomainService;
  }

  public async calcularDeducible(request: DeducibleRequest): Promise<DeducibleResponse> {
    const result = await this.deducibleDomainService.calcularDeducible(request);
    return result as DeducibleResponse;
  }
}
