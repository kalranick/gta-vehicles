import vehiclesData from './vehicles.json';

test('includes GTA6 mock vehicles with the existing vehicle record shape', () => {
  expect(Array.isArray(vehiclesData.GTA6)).toBe(true);
  expect(vehiclesData.GTA6.length).toBeGreaterThan(0);

  vehiclesData.GTA6.forEach((vehicle) => {
    expect(vehicle).toEqual(expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String),
      category: expect.any(String),
      url: expect.any(String),
    }));
  });
});
