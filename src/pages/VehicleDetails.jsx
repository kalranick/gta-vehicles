import React from 'react';
import { Link, useParams } from 'react-router-dom';
import vehiclesData from '../data/vehicles.json';

function VehicleDetails() {
  const { garage, vehicleId } = useParams();
  const vehicle = vehiclesData.vehicles[garage]?.vehicles.find(
    (item) => item.id === Number(vehicleId)
  );

  if (!vehicle) {
    return (
      <section className="vehicle-details" aria-labelledby="vehicle-details-heading">
        <h2 id="vehicle-details-heading">Vehicle not found</h2>
        <p>That vehicle could not be found in the garage list.</p>
        <Link to="/">Back to vehicles</Link>
      </section>
    );
  }

  return (
    <section className="vehicle-details" aria-labelledby="vehicle-details-heading">
      <Link to="/">Back to vehicles</Link>
      <h2 id="vehicle-details-heading">{vehicle.name}</h2>
      <dl>
        <div>
          <dt>Category</dt>
          <dd>{vehicle.category}</dd>
        </div>
        <div>
          <dt>Garage</dt>
          <dd>{garage}</dd>
        </div>
      </dl>
      <a href={vehicle.url} target="_blank" rel="noopener noreferrer">
        View vehicle reference
      </a>
    </section>
  );
}

export default VehicleDetails;
