import { TestBed, inject } from '@angular/core/testing';

import { MahjongApiService } from './mahjong-api.service';

describe('MahjongApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MahjongApiService]
    });
  });

  it('should ...', inject([MahjongApiService], (service: MahjongApiService) => {
    expect(service).toBeTruthy();
  }));
});
