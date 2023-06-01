import { ServiceItem } from 'src/workshop-service-management/domain/entities/service-item';

export class CreateProposalDto {
  constructor(
    public readonly humanResources: number,
    public readonly price: number,
    public readonly currency: string,
    public readonly start: Date,
    public readonly end: Date,
  ) {}
}
