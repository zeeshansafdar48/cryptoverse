import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { useGetCryptoStatsQuery } from '../services/cryptoApi';
import { CoinsCard, Loader } from '../components';

const { Title } = Typography;

function Stats() {
  const { data, isFetching } = useGetCryptoStatsQuery();

  if (isFetching) return <Loader />;

  console.log('data', data);
  const stats = data?.data || {};
  const bestCoins = data?.data?.bestCoins || [];
  const newestCoins = data?.data?.newestCoins || [];

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
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Best 3 Coins in the world
        </Title>
      </div>
      <CoinsCard coins={bestCoins} />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Newest 3 Coins in the world
        </Title>
      </div>
      <CoinsCard coins={newestCoins} />
    </>
  );
}

export default Stats;
