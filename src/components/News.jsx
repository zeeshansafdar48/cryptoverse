import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Typography, Avatar, Select } from 'antd';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Title, Text } = Typography;
const { Option } = Select;
const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';

function News({ simplified }) {
  const count = simplified ? 6 : 10;
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count,
  });
  const { data } = useGetCryptosQuery(100);

  if (!cryptoNews?.value) return 'Loading...';

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => (
              <Option value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews?.value?.map((news, i) => (
        <Col key={i} xs={24} sm={12} lg={8}>
          <Card className="news-card" hoverable>
            <a href={news?.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news?.name?.length > 40 ? news?.name.substring(0, 40) + '...' : news?.name}
                </Title>
                <img
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt="news"
                  style={{ maxWidth: '200px', maxHeight: '100px' }}
                />
              </div>
              <p>
                {news?.description?.length > 100
                  ? news?.description.substring(0, 100) + '...'
                  : news?.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={news?.provider[0]?.image?.thumbnail?.contentUrl || demoImage}
                    alt="news"
                  />
                  <Text className="provider-name">{news?.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news?.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default News;
