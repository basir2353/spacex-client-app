// LaunchList.js
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_LAUNCHES } from './queries.js';

const LaunchList = () => {
  const { loading, error, data } = useQuery(GET_LAUNCHES);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.launches.map((launch) => (
        <div key={launch.id}>
          <h2>{launch.mission_name}</h2>
          <p>{launch.launch_date_utc}</p>
          <img src={launch.links.flickr_images[0]} alt={launch.mission_name} />
        </div>
      ))}
    </div>
  );
};

export default LaunchList;
