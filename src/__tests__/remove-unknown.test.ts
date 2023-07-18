import { removeUnknown } from '../remove-unknown';
import { Types } from '../helper';

describe('removeUnknown.test', () => {
  describe('removeUnknown', () => {
    it('should throw error if one or both of obj and schema is not native object', () => {
      try {
        expect(removeUnknown({}, [])).toThrow();  
      } catch {}
      
      try {
        expect(removeUnknown(null as any, {})).toThrow()
      } catch {}

      try {
        expect(removeUnknown([], [])).toThrow();
      } catch {}

      try {
        expect(removeUnknown({}, null as any)).toThrow();
      } catch {}
    });

    it('should remove unknown properties', () => {
      const person = {
        name: 'Adam',
        age: 22,
        time: new Date(), //unknown property
        address: {
          country: 'USA',
          city: 'LA',
          school: 'any', //unknown property
          codes: {
            postalCode: 'postal code',
            zipCode: 'zip code',
            barcode: 'barcode', //unknown property
          },
        },
        phoneNumbers: ['095859040', '059858433'],
        isMaried: false,
      };

      const personSchema = {
        name: String,
        age: Number,
        isMaried: Boolean,
        address: {
          country: String,
          city: String,
          codes: {
            postalCode: String,
            zipCode: String,
          },
        },
        phoneNumbers: Array,
      };

      removeUnknown(person, personSchema);

      expect(person).toHaveProperty('name');
      expect(person).toHaveProperty('age');
      expect(person).toHaveProperty('address');
      expect(person).toHaveProperty('phoneNumbers');
      expect(person).toHaveProperty('isMaried');
      expect(person).toHaveProperty('address.country');
      expect(person).toHaveProperty('address.codes.postalCode');
      expect(person).toHaveProperty('address.codes.zipCode');
      expect(person).not.toHaveProperty('time');
      expect(person).not.toHaveProperty('address.school');
      expect(person).not.toHaveProperty('address.codes.barcode');
    });

    it('should remove unknown properties and known properties if the value type not match with schema', () => {
      const person = {
        id: Symbol('any'),
        name: 'Adam',
        age: '22', // known property but with different type
        time: new Date(), //unknown property
        address: {
          country: 'USA',
          city: 'LA',
          school: 'any', //unknown property
          codes: ['5963', '059059'], //known property but with different type
        },
        cars: ['bmw'],
        isMaried: false,
        phoneNumbers: new Set(['07975044', '068590393']),
        mapObj: new Map(), //unknown property
      };

      const personSchema = {
        id: Symbol(),
        name: Types.String,
        age: Types.Number,
        isMaried: Types.Boolean,
        address: {
          country: Types.String,
          city: Types.String,
          codes: {
            postalCode: Types.String,
            zipCode: Types.String,
          },
        },
        phoneNumbers: Types.Set,
        cars: Types.Array,
      };

      removeUnknown(person, personSchema, { strict: true });
      expect(person).toHaveProperty('id');
      expect(person).toHaveProperty('name');
      expect(person).not.toHaveProperty('age');
      expect(person).not.toHaveProperty('time');
      expect(person).toHaveProperty('address');
      expect(person).toHaveProperty('address.country');
      expect(person).toHaveProperty('address.city');
      expect(person).not.toHaveProperty('codes');
      expect(person).toHaveProperty('phoneNumbers');
      expect(person).toHaveProperty('cars');
      expect(person).not.toHaveProperty('mapObj');
    });
  });
});
