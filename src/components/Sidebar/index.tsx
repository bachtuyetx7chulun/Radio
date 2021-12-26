import React, { FC, ReactElement } from 'react'
import styles from '@styles/SideBar/SideBar.module.scss'
import SidebarUser from './SidebarUser'
import SideBarItem from './SidebarItem'

const SideBar: FC = (): ReactElement => {
  return (
    <div className={styles.SideBar}>
      <SidebarUser />
      <div className={styles.SideBarContent}>
        <SideBarItem
          active={true}
          name="Dashboard"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAV1JREFUSEvtlTFSwkAUht8DJ5SmIdaMwVY8gXIEy6Qx3MAbiCfQG5gqseQGyg1iK5mhdimMJTjynADBJdlkH4PMWLjtvv2///37NkHY88I96wMbYHpj05jOn1JDs0atm/ithGOOBfgRp85SFCMuhAWwnNgHgKsNxwS+eLR7ui60AKV4psqAVAIsd9QHwptKl0i3Imj3y2pKAU039pDgQRdBuk8IvUlgpzEWlhKwjfg6rRJIAdB0XztItXQcTY57qSYhnHcnwUkkn9sAVIh/EML1p1EfpPO/6vAeAA5zJgqQNWA561/jEueXIrQHslhFjMmsUW9lD3ENsJxRBICnqlhEaBeiXBl6V8eIkQiPzxZPMiv4XQC9iLC9ePXKKbKcmHLOWBGpOuUCEkTypsbBULrku/x97QJgTew/QBvT34noyImfCeBca1kqQIDhW2hf5M9ofzjbQNif611F5fPfwnCnGZ2gm00AAAAASUVORK5CYII="
        />
        <SideBarItem
          active={false}
          name="Setting"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAaJJREFUSEu1lU0uBUEUhb+3AkamrMDPCpAwI1gBYgEIc8wJGxCsAGHGgBX4WQFTI1ZAzsu9L9X9qquqJX2Tl5fuunXPqXtPne7RcfQ6rk8JwAYwC0zbT5xe7fcEaH0OuAE2ge+QdApgFTgFJlqc8hbQvkE0AZwB25b1Blwaww97J1AnUMev1IwBHAIHtmsXEFhTCHg9WMyeQH1+sQ0z1udUh5QvQiuAimseyRloeFNAjPkksGhoj4Bal42wRerptW0UM48x4BxYqlW7B7aArxRKCOC9r7O/ixT3mgJZLgWQpqX3sPdql9qWCuW8NyWEJ9BwRqBy+faA4wzAPnBSAhDL+Q/ArxXqk89ZhZSTU4sE4Tkucz33hZIDUE6bIe+YvVzZnSgCaCNTWck4sGbWUgTgs5FaFuzhIaIcZ/8ZGmSsRaPAhZmZLPioQKqhxcwDknw/YgB+Hzxn0M8GKTpzLQ/lxgBcZmE9FZGZuV2LsS6l3vv3Ikqk5AQ5Q/sxS5fVDEXTDOTzbsGagz6JYq1BK57t3z9EFYsOUUruQe4EyfXOAf4AZT5VGeu0ARkAAAAASUVORK5CYII="
        />
      </div>
    </div>
  )
}

export default SideBar
