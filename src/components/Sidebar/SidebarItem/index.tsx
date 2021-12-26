import styles from '@styles/SideBar/SidebarItem.module.scss'
import React, { FC, ReactElement } from 'react'

const SideBarItem: FC<Props> = ({ name, src, active }: Props): ReactElement => {
  return (
    <div className={`${styles.SidebarItem} ${active && styles.SidebarActive}`}>
      <img src={src} />
      <span className={styles.SidebarText}>{name}</span>
    </div>
  )
}

type Props = {
  name: string
  src: string
  active: boolean
}

export default SideBarItem
