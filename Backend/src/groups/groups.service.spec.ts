import { Test, TestingModule } from '@nestjs/testing';
import { GroupsService } from './groups.service';
import { Group } from './interfaces/group.interface';
import { Types } from 'mongoose';
import { groupProviders } from './group.providers';

describe('GroupsService', () => {
  let service: GroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupsService],
    }).compile();

    service = module.get<GroupsService>(GroupsService);
  });

  describe('findAll', () => {
    it('should return an array of groups', async () => {

    });
  });
});
