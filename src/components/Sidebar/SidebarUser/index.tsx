import styles from '@styles/SideBar/SidebarUser.module.scss'
import { Avatar, Col, Row } from '@nextui-org/react'
import React, { FC, ReactElement } from 'react'

const SidebarUser: FC = (): ReactElement => {
  return (
    <div>
      <Row className={styles.SidebarUser}>
        <Col className={styles.LeftSide}>
          <Avatar
            style={{ verticalAlign: 'middle', width: '50px', height: '50px' }}
            src={'https://i.pinimg.com/originals/ef/6a/f2/ef6af24693c843f38998462660a21be5.gif'}
          ></Avatar>
        </Col>
        <Col className={styles.RightSide}>
          <span>Cáo con</span>
          <span className={styles.Label}>
            admin <sup className={styles.Purple}>+</sup>
          </span>
        </Col>
      </Row>
    </div>
  )
}

export default SidebarUser
