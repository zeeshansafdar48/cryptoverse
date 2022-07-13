import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'antd';

function CoinsCard({ coins }) {
  return (
    <Row gutter={[32, 32]} className="crypto-card-container">
      {coins?.map((coin, index) => (
        <Col key={coin?.uuid} xs={24} sm={12} lg={6} className="crypto-card">
          <Link to={`/cryptocurrencies/${coin?.uuid}`}>
            <Card
              title={`${index + 1} - ${coin?.name}`}
              extra={<img className="crypto-image" src={coin?.iconUrl} alt="crypto" />}
              hoverable
            >
              <p>Name: {coin?.name}</p>
              <p>Symbol: {coin?.symbol}</p>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
}

export default CoinsCard;
