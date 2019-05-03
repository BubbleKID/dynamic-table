import {
  desc, stableSort, getSorting,
} from '../../../src/Components/Helper';

describe('desc() function', () => {
  describe('given three values', () => {
    it('it should get compare result 1, -1 or 0', () => {
      const a = {
        price: '10',
        updatedAt: 'Wed May 16 2018 01:17:41 GMT+1000 (AEST)',
        tradingPair: {
          uuid: '493746ad-2269-4fce-8e4a-c2be0f60bebe',
          symbol: 'ETH/AUD',
        },
      };
      const b = {
        price: '20',
        updatedAt: 'Sat May 05 2018 05:20:31 GMT+1000 (AEST)',
        tradingPair: {
          uuid: '2d6a3336-a149-43ba-a653-d2fd712a45e2',
          symbol: 'ETH/BTC',
        },
      };

      expect(desc(a, b, 'price')).toBe(1);
      expect(desc(b, a, 'price')).toBe(-1);
      expect(desc(b, a, 'updatedAt')).toBe(1);
      expect(desc(a, b, 'updatedAt')).toBe(-1);
      expect(desc(b, a, 'tradingPair')).toBe(-1);
      expect(desc(a, b, 'tradingPair')).toBe(1);
      expect(desc('a', 'b', 'price')).toBe(0);
    });
  });
});

describe('stableSort() function', () => {
  describe('given two values', () => {
    it('it should get sorted result', () => {
      expect(stableSort([{ price: 10 }, { price: 20 }], getSorting('desc', 'price')))
        .toEqual([{ price: 20 }, { price: 10 }]);
      expect(stableSort([{ price: 10 }, { price: 20 }], getSorting(0, 'price')))
        .toEqual([{ price: 10 }, { price: 20 }]);
      expect(stableSort(['', ''], getSorting('', ''))).toEqual(['', '']);
    });
  });
});
