import {
  desc,
  stableSort,
  getSorting,
  dateFormat,
} from '../../../src/components/Helper';

describe('desc() function', () => {
  describe('given three values', () => {
    it('it should get compare result 1, -1 or 0', () => {
      expect(desc({ price: 10 }, { price: 20 }, 'price')).toBe(1);
      expect(desc({ price: 20 }, { price: 10 }, 'price')).toBe(-1);
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

describe('dateFormat() function', () => {
  describe('given date values', () => {
    it('it should get date string in yyyy-MM-dd format', () => {
      expect(dateFormat('Sat Dec 5 2019 17:28:43 GMT+1000 (澳大利亚东部标准时间)')).toBe('2019-12-05');
    });
  });
});
