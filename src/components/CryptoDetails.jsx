import React from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Typography } from 'antd';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';

import { useGetCryptoDetailsQuery } from '../services/cryptoApi';
import { Loader } from '../components';

const { Title, Text } = Typography;

function CryptoDetails() {
  const { coinId } = useParams();

  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const cryptoDetails = data?.data?.coin;
  console.log('cryptoDetails', cryptoDetails);

  if (isFetching) return <Loader />;

  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${millify(cryptoDetails?.price || 0)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: '24h Volume',
      value: `$ ${millify(cryptoDetails['24hVolume'] || 0)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: 'Market Cap',
      value: `$ ${millify(cryptoDetails?.marketCap || 0)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: 'All-time-high(daily avg.)',
      value: `$ ${millify(cryptoDetails?.allTimeHigh.price || 0)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    {
      title: 'Number Of Exchanges',
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: 'Aprroved Supply',
      value: cryptoDetails?.approvedSupply ? <CheckOutlined /> : <StopOutlined />,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Total Supply',
      value: `$ ${millify(cryptoDetails?.supply?.total || 0)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Circulating Supply',
      value: `$ ${millify(cryptoDetails?.supply?.circulating || 0)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {data?.data?.coin.name} Price
        </Title>
        <p>
          {cryptoDetails?.name} live price in US Dollar (USD). View value statistics, market cap and
          supply.
        </p>
      </Col>
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails?.name} Value Statistics
            </Title>
            <p>
              An overview showing the statistics of {cryptoDetails?.name}, such as the base and
              quote currency, the rank, and trading volume.
            </p>
          </Col>
          {stats?.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other Stats Info
            </Title>
            <p>
              An overview showing the statistics of {cryptoDetails?.name}, such as the base and
              quote currency, the rank, and trading volume.
            </p>
          </Col>
          {genericStats?.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {cryptoDetails?.name}?
          </Title>
          {HTMLReactParser(cryptoDetails?.description)}
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {cryptoDetails?.name} Links
          </Title>
          {cryptoDetails?.links?.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">
                {link.type}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
}

export default CryptoDetails;
