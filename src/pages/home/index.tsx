import React, { ReactElement } from 'react'
import { Breadcrumb, Layout, Menu, Typography } from 'antd'
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
} from '@ant-design/icons'

const { Header, Sider, Content } = Layout
const { Title } = Typography
import styles from '@styles/home/home.module.scss'
import { Footer } from 'antd/lib/layout/layout'

const Home = (): ReactElement => {
  return (
    <Layout className={styles.home}>
      <Sider collapsible>
        <div className={styles.title__wrapper}>
          <Title className={styles.title}>QFACS</Title>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className={styles.layout}>
        <Header className={styles.header} />
        <Content className={styles.content}>
          <Breadcrumb className={styles.breadcrumb}>
            <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
          </Breadcrumb>
          <div className={styles.main}>Code ở đây</div>
        </Content>
        <Footer className={styles.footer}>
          Quick FAC Solutions ©{new Date().getFullYear()} Created by D1
        </Footer>
      </Layout>
    </Layout>
  )
}

export default Home
