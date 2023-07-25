// LaunchDetailsPage.js
// LaunchDetailsPage.js
import React from 'react';
import { useParams } from 'react-router-dom'; // Import 'useParams' here

// ... Rest of the code ...


const LaunchDetailsPage = ({ launches }) => {
  const { flightNumber } = useParams();
  const selectedLaunch = launches.find((launch) => launch.flight_number === Number(flightNumber));

  return (
    <div>
      {selectedLaunch ? (
        <div>
          <h2>{selectedLaunch.mission_name}</h2>
          <p>Launch Date: {selectedLaunch.launch_date_utc}</p>
          {/* Add other details here */}
        </div>
      ) : (
        <div>No launch details found.</div>
      )}
    </div>
  );
};

export default LaunchDetailsPage;
