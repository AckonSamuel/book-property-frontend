import React from 'react';
import Layout from './Layout';
import './App.css';
import { MainDashboard } from './components/MainDashboard';

function App() {
  return (
    <div className="App">
      <Layout>
        <MainDashboard />
      </Layout>

    </div>
  );
}

export default App;
