import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';

function Cryptocurrencies({ simplified }) {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredCryptos = cryptosList?.data?.coins.filter((crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredCryptos);
  }, [cryptosList, searchTerm]);

  if (isFetching) return 'Loading...';

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Crypto Currencies"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col key={currency?.uuid} xs={24} sm={12} lg={6} className="crypto-card">
            <Link to={`/cryptocurrencies/${currency?.uuid}`}>
              <Card
                title={`${currency?.rank} ${currency?.name}`}
                extra={<img className="crypto-image" src={currency?.iconUrl} alt="crypto" />}
                hoverable
              >
                <p>Price: {millify(currency?.price)}</p>
                <p>Market Cap: {millify(currency?.marketCap)}</p>
                <p>Daily Change: {millify(currency?.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Cryptocurrencies;
