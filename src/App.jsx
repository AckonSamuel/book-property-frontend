import React from 'react';
import Layout from './Layout';
import './App.css';
import BookingModal from './components/MainDashboard';

function App() {
  return (
    <div className="App">
      <Layout>
        <BookingModal />
      </Layout>

    </div>
  );
}

export default App;
