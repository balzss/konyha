import getUniqueName from '../../utils/getUniqueName';

describe('utils/getUniqueName', () => {
  it('returns same name if passed with empty list', () => {
    const newName = getUniqueName('hello', []);
    expect(newName).toEqual('hello');
  });

  it('returns same name if no collision', () => {
    const newName = getUniqueName('hello', ['hello hello']);
    expect(newName).toEqual('hello');
  });

  it('returns with first index if theres one collision', () => {
    const newName = getUniqueName('hello', ['hello']);
    expect(newName).toEqual('hello (1)');
  });

  it('returns with index if theres one collision and extra options', () => {
    const newName = getUniqueName('hello', ['hello', 'hello bello']);
    expect(newName).toEqual('hello (1)');
  });

  it('returns with index if there are multiple collisions', () => {
    const newName = getUniqueName('hello', [
      'hello',
      'hello (1)',
      'hello bello',
      'hello (2)',
      'hello (4)',
      'hello (3) (1)',
    ]);
    expect(newName).toEqual('hello (3)');
  });

  it('returns with new index if name is already indexed', () => {
    const newName = getUniqueName('hello (2)', [
      'hello (2)',
      'hello (2) bello',
      'hello (2) (1)',
      'hello (2) (2)',
      'hello (2) (5)',
    ]);
    expect(newName).toEqual('hello (2) (3)');
  });

  it('returns with same name if theres no exact match', () => {
    const newName = getUniqueName('hello (2)', [
      'hello (2) bello (1)',
      'hello (2) (1)',
      'hello (2) (2)',
      'hello (2) (5)',
    ]);
    expect(newName).toEqual('hello (2)');
  });

  it('returns with 1 if indexing starts higher', () => {
    const newName = getUniqueName('hello', ['hello', 'hello (3)', 'hello (4)']);
    expect(newName).toEqual('hello (1)');
  });
});
