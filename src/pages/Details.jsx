import React from 'react';

function Details() {
  return (
    <section className="details-page" aria-labelledby="details-heading">
      <ol className="details-progress" aria-label="Progress">
        <li aria-current="step">
          <span className="details-progress-number" aria-hidden="true">1</span>
          <span>Step 1</span>
        </li>
        <li>
          <span className="details-progress-number" aria-hidden="true">2</span>
          <span>Step 2</span>
        </li>
        <li>
          <span className="details-progress-number" aria-hidden="true">3</span>
          <span>Step 3</span>
        </li>
      </ol>
      <h2 id="details-heading">Personal Details</h2>
      <form className="details-form">
        <label htmlFor="first-name">First name</label>
        <input id="first-name" name="firstName" type="text" autoComplete="given-name" required />

        <label htmlFor="last-name">Last name</label>
        <input id="last-name" name="lastName" type="text" autoComplete="family-name" required />

        <label htmlFor="date-of-birth">Date of birth</label>
        <input id="date-of-birth" name="dateOfBirth" type="date" autoComplete="bday" required />
      </form>
    </section>
  );
}

export default Details;