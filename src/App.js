import { Link, Route, Routes } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { Navbar, Homepage, Cryptocurrencies, CryptoDetails, News, Stats } from './components';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route exact path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route exact path="/cryptocurrencies/:coinId" element={<CryptoDetails />} />
              <Route exact path="/stats" element={<Stats />} />
              <Route exact path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
            Cryptoverse <br />
            All right reserved
          </Typography.Title>
          <Space>
            <Link to={'/'}>Home</Link>
            <Link to={'/cryptocurrencies'}>Cryptocurrencies</Link>
            <Link to={'/news'}>News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
