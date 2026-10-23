import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import vehiclesData from '../data/vehicles.json';

const garages = Object.keys(vehiclesData.vehicles);
const categories = [...new Set(
  garages.flatMap((garage) => vehiclesData.vehicles[garage].vehicles.map((vehicle) => vehicle.category))
)].sort((a, b) => a.localeCompare(b));

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGarage, setSelectedGarage] = useState('');
  const [sortOrder, setSortOrder] = useState('garage');
  const searchQuery = searchTerm.trim().toLowerCase();
  const visibleGarages = selectedGarage ? [selectedGarage] : garages;
  const filteredVehicles = Object.fromEntries(visibleGarages.map((garage) => {
    const vehicles = vehiclesData.vehicles[garage].vehicles.filter((vehicle) => (
      vehicle.name.toLowerCase().includes(searchQuery)
      && (!selectedCategory || vehicle.category === selectedCategory)
    ));
    if (sortOrder === 'name-asc') {
      vehicles.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'name-desc') {
      vehicles.sort((a, b) => b.name.localeCompare(a.name));
    }
    return [garage, vehicles];
  }));
  const resultCount = Object.values(filteredVehicles).reduce((count, vehicles) => count + vehicles.length, 0);
  const maxRows = Math.max(0, ...Object.values(filteredVehicles).map((vehicles) => vehicles.length));

  return (
    <div className="vehicle-list">
      <div className="vehicle-controls">
        <label className="vehicle-search">
          Search cars
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>
        <label>
          Category
          <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
            <option value="">All categories</option>
            {categories.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
        </label>
        <label>
          Garage
          <select value={selectedGarage} onChange={(event) => setSelectedGarage(event.target.value)}>
            <option value="">All garages</option>
            {garages.map((garage) => <option key={garage} value={garage}>{garage}</option>)}
          </select>
        </label>
        <label>
          Sort by
          <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
            <option value="garage">Garage order</option>
            <option value="name-asc">Name (A–Z)</option>
            <option value="name-desc">Name (Z–A)</option>
          </select>
        </label>
      </div>
      <p className="vehicle-result-count" role="status">
        {resultCount} {resultCount === 1 ? 'vehicle' : 'vehicles'} found
      </p>
      {resultCount === 0 ? (
        <p className="vehicle-empty-state">No vehicles found. Try changing your search or filters.</p>
      ) : (
        <div className="vehicle-table-scroll">
          <table>
            <thead>
              <tr>
                {visibleGarages.map((garage) => (
                  <th key={garage}>
                    <span title={vehiclesData.vehicles[garage].nickname}>{garage}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: maxRows }, (_, rowIndex) => (
                <tr key={rowIndex}>
                  {visibleGarages.map((garage) => {
                    const vehicle = filteredVehicles[garage][rowIndex];
                    const content = vehicle?.name;
                    return (
                      <td key={garage} className={vehicle ? 'vehicle-item' : undefined}>
                        {vehicle && (
                          <Link
                            to={`/vehicles/${encodeURIComponent(garage)}/${vehicle.id}`}
                            title={content}
                          >
                            {content}
                          </Link>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Home;
