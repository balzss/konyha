import slugify from '../../utils/slugify';

describe('utils/slugify', () => {
  it('hello -> hello', () => {
    const slug = slugify('hello');
    expect(slug).toEqual('hello');
  });

  it('trims input', () => {
    const slug = slugify(' hello  ');
    expect(slug).toEqual('hello');
  });

  it('converts to lower case', () => {
    const slug = slugify('HeLLo');
    expect(slug).toEqual('hello');
  });

  it('normalizes unicode', () => {
    const slug = slugify('hëŀlő');
    expect(slug).toEqual('hello');
  });

  it('replaces spaces with dashes', () => {
    const slug = slugify('h e l l o');
    expect(slug).toEqual('h-e-l-l-o');
  });

  it('removes non url characters', () => {
    const slug = slugify('+h.e?l"l(o#');
    expect(slug).toEqual('hello');
  });
})
