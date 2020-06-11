describe('TestBed', () => {
  beforeEach(() => {
    // Reset NODE_ENV when necessary
    process.env.NODE_ENV = 'test';

    // Replace stdout write with jest mock each iteration
    // Allows us to check if logging occurs
    process.stdout.write = jest.fn();
  });

  it('unit test 1', () => {
    expect(true).toEqual(true);
  });
});
