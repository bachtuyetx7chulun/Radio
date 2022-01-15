import ListTrack from '@components/List'
import PlayGround from '@components/Playground'
import SearchBox from '@components/Search'
import CONTEXT from '@contexts/context'
import { CssBaseline } from '@nextui-org/react'
import styles from '@styles/App.module.scss'
import React, { FC, ReactElement } from 'react'

const App: FC = (): ReactElement => {
  const [videos, setVideos] = React.useState<string[]>([])

  return (
    <>
      <CssBaseline />
      <CONTEXT.Provider value={{ videos, setVideos }}>
        <div className={styles.App}>
          <div className={styles.Main}>
            <div id="client"></div>
            <PlayGround />
          </div>
          <SearchBox />
          <ListTrack />
        </div>
      </CONTEXT.Provider>
    </>
  )
}

export default App
