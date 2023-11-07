import { Test, TestingModule } from '@nestjs/testing';
import { HasingService } from './hashing.service';

describe('HasingService', () => {
  let service: HasingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HasingService],
    }).compile();

    service = module.get<HasingService>(HasingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
