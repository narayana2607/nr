import React, { useState, useEffect } from 'react';
import './StatusPage.css'; // Import the CSS file

const StatusPage = () => {
  const [serverStatus, setServerStatus] = useState('Loading...');
  const [databaseStatus, setDatabaseStatus] = useState('Loading...');
  const [appVersion, setAppVersion] = useState('Loading...');

  useEffect(() => {
    // Simulate fetching status data
    const fetchData = async () => {
      // Replace these with actual API calls to your server
      // Example:
      // const serverResponse = await fetch('/api/server-status');
      // const serverData = await serverResponse.json();
      // setServerStatus(serverData.status);

      // Simulate server status (replace with actual fetch)
      setTimeout(() => {
        setServerStatus('Online');
      }, 500);

      // Simulate database status (replace with actual fetch)
       setTimeout(() => {
        setDatabaseStatus('Connected');
      }, 750);

      //Simulate app version
      setTimeout(()=>{
        setAppVersion('1.0.0')
      },200)
    };

    fetchData();
  }, []);

  return (
    <div className="status-page">
      <header className="status-header">
        <h1>Application Status</h1>
      </header>
      <main className="status-main-content">
        <section className="status-section">
          <h2 className="status-section-heading">Server Status</h2>
          <div className={`status-indicator ${serverStatus === 'Online' ? 'status-online' : 'status-offline'}`}>
            {serverStatus}
          </div>
        </section>
        <section className="status-section">
          <h2 className="status-section-heading">Database Status</h2>
          <div className={`status-indicator ${databaseStatus === 'Connected' ? 'status-online' : 'status-offline'}`}>
            {databaseStatus}
          </div>
        </section>
        <section className="status-section">
          <h2 className="status-section-heading">Application Version</h2>
          <div className="app-version-info">
            {appVersion}
          </div>
        </section>
      </main>
    </div>
  );
};

export default StatusPage;
