const SK = require('../src/SkNsUtil.js');

describe('Common utilities', () => {
  test('convert number to string', () => {
    expect(SK.util.toNumber('123')).toBe(123);
  });

  test('check if function exists', () => {
    function sampleFun() {
      console.log('Hello, this is a function');
    }
    expect(SK.util.functionExists(sampleFun)).toBeTruthy();
  });
});

describe('Object utilities', () => {
  var source = { a: 1, b: 2, c: 3 };

  test('merge objects', () => {
    var forMerge = { b: 4, d: 5 },
        expected = { a: 1, b: 2, c: 3, d: 5 };
    let source = { a: 1, b: 2, c: 3 };

    expect(SK.object.merge(source, forMerge)).toEqual(expected);
  });

  describe('compare objects', () => {
    var target = {};

    test('with empty target', () => {
      expect(SK.object.compare(source, target)).toBeFalsy();
    });

    test('with exact target', () => {
      let target = { a:1, b: 2, c:3 };
      expect(SK.object.compare(source, target)).toBeTruthy();
    })
  });
});
