import React from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Typography, Row, Col, Statistic } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Title } = Typography;

function Homepage() {
  const { data, isFetching } = useGetCryptosQuery();

  if (isFetching) return 'Loading...';

  const stats = data?.data?.stats || {};

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={millify(stats?.totalCoins)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Exchanges" value={millify(stats?.totalExchanges)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market Cap" value={millify(stats?.totalMarketCap)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total 24th Volume" value={millify(stats?.total24hVolume)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={millify(stats?.totalMarkets)} />
        </Col>
      </Row>
    </>
  );
}

export default Homepage;
