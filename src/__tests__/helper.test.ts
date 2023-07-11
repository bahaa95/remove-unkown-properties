import { Types, getType, isNativeObject } from '../helper';

describe('helper.test', () => {
  describe('Types', () => {
    it('should return correct type', () => {
      expect(typeof Types.Boolean).toBe('boolean');
      expect(typeof Types.Number).toBe('number');
      expect(typeof Types.Function).toBe('function');
      expect(typeof Types.Object).toBe('object');
      expect(typeof Types.Array).toBe('object');
      expect(typeof Types.String).toBe('string');
      expect(typeof Types.Undefined).toBe('undefined');
      expect(typeof Types.Null).toBe('object');
    });
  });

  describe('convertToString', () => {
    it('should return a string representation for value type', () => {
      expect(getType('any string value')).toBe('[object String]');
      expect(getType(100)).toBe('[object Number]');
      expect(getType(true)).toBe('[object Boolean]');
      expect(getType({ any: '' })).toBe('[object Object]');
      expect(getType([1, 2])).toBe('[object Array]');
      expect(getType(() => {})).toBe('[object Function]');
    });
  });

  describe('isNativeObject', () => {
    it('should return true if value is a native object', () => {
      expect(isNativeObject({ property: 'any' })).toBe(true);
      expect(isNativeObject({})).toBe(true);
    });
    it('should return false if value is a not native object', () => {
      expect(isNativeObject(null)).toBe(false);
      expect(isNativeObject([1, 2])).toBe(false);
      expect(isNativeObject(function () {})).toBe(false);
    });
  });
});
