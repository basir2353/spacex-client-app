import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import LaunchDetailsPage from './LaunchDetailsPage';
import './App.css';
import './SearchBar.css';

const App = () => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    fetch('https://api.spacexdata.com/v3/launches')
      .then((response) => response.json())
      .then((data) => {
        setLaunches(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (launches.length === 0) return <div>No launches available</div>;

  const filteredLaunches = launches.filter((launch) => launch.links.flickr_images.length > 0);
  const filteredLaunchesBySearch = filteredLaunches.filter((launch) =>
    launch.mission_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCardClick = (selectedLaunch) => {
    setSelectedCard(selectedLaunch);
  };

  return (
    <Router>
      <div className="app-container">
        <h1>SpaceX Launches</h1>
        <div className="search-bar">
          <div className="container">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search missions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input"
              />
              <div className="search__icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="launch-cards-container">
          {filteredLaunchesBySearch.length === 0 ? (
            <div>No matching launches found</div>
          ) : (
            filteredLaunchesBySearch.map((launch) => (
              <Link
                key={launch.flight_number}
                to={`/launch/${launch.flight_number}`}
                className={`card ${selectedCard === launch ? 'selected' : ''}`}
                onClick={() => handleCardClick(launch)}
              >
                <div className="card-inner">
                  <h2>{launch.mission_name}</h2>
                  {selectedCard === launch ? (
                    <>
                      <p>Launch Date: {launch.launch_date_utc}</p>
                      <p>Details: {launch.details}</p>
                    </>
                  ) : (
                    <>
                      {launch.links.flickr_images[0] && (
                        <img src={launch.links.flickr_images[0]} alt={launch.mission_name} />
                      )}
                      <p>Rocket: {launch.rocket.rocket_name}</p>
                    </>
                  )}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
      <Routes>
        <Route path="/launch/:flightNumber" element={<LaunchDetailsPage launches={filteredLaunchesBySearch} />} />
      </Routes>
    </Router>
  );
};

export default App;
