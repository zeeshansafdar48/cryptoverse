import React from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Typography, Row, Col, Statistic } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News, Loader } from '../components';

const { Title } = Typography;

function Homepage() {
  const { data, isFetching } = useGetCryptosQuery(100);

  if (isFetching) return <Loader />;

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
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={3} className="show-more">
          <Link to={'/cryptocurrencies'}>Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to={'/news'}>Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
}

export default Homepage;
