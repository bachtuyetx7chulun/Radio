import { getCurrentVideo, getPlayList, postCurrentVideo } from '@adapters/xhr'
import { getRandomVideos } from '@adapters/xhr/generate-random-video/inex'
import CONTEXT from '@contexts/context'
import { Button } from '@nextui-org/react'
import styles from '@styles/Playground/Playground.module.scss'
import { convertTimeToSeconds } from '@utils/index'
import moment from 'moment'
import React, { FC, ReactElement, useContext, useEffect, useMemo, useState } from 'react'
import YouTube, { Options } from 'react-youtube'

const PlayGround: FC = (): ReactElement => {
  const context = useContext(CONTEXT)
  const { videos: videosContext } = context
  const [volume, setVolume] = useState(0)
  const [player, setPlayer] = useState<any>()
  const [currentVideo, setCurrentVideo] = useState<{
    videoId?: string
    createdAt?: string
    id?: number
    updatedAt?: string
  }>({
    videoId: '',
    createdAt: '',
    id: 0,
    updatedAt: '',
  })

  useEffect(() => {
    ;(async () => {
      const currentVideo = await getCurrentVideo()
      let playList = (await getPlayList()).videos

      if (playList?.length < 1) playList = await getRandomVideos()

      if (moment().diff(currentVideo.createdAt, 'seconds') > convertTimeToSeconds(currentVideo?.duration)) {
        playList = playList?.filter((video: any) => video?.id !== currentVideo?.videoId)
        if (playList?.length < 1) playList = await getRandomVideos()

        const video = await postCurrentVideo(playList[0]?.id)
        setCurrentVideo(video)
      } else {
        setCurrentVideo(currentVideo)
      }

      context.setVideos(playList)
    })()
  }, [])

  const options = useMemo(() => {
    return {
      width: '100%',
      height: '500px',
      playerVars: {
        start: moment().diff(currentVideo?.createdAt, 'seconds'),
        autoplay: 1,
        mute: 1,
        controls: 0,
        showinfo: 0,
        cc_load_policty: 0,
        iv_load_policy: 3,
        fs: 0,
        modestbranding: 1,
      },
    } as Options
  }, [currentVideo])

  const youtubeRender = useMemo(() => {
    // console.log('currentVideo', currentVideo)
    // console.log('videos', context.videos)
    // console.log('volume', volume)

    return currentVideo.videoId ? (
      <YouTube
        videoId={currentVideo?.videoId}
        opts={options}
        onEnd={async () => {
          let videos = []
          let nextVideo
          const playList = await getPlayList()
          const restVideos = playList?.videos?.filter((video: any) => video?.id !== currentVideo?.videoId)

          if (restVideos?.length < 1) {
            const randomVideos = await getRandomVideos()
            videos = randomVideos
            // console.log('case 1')
            // console.log(randomVideos)

            nextVideo = {
              videoId: randomVideos[0].id,
              createdAt: moment().toISOString(),
            }

            await postCurrentVideo(randomVideos[0].id)
          } else {
            // console.log('case 2')
            const nextVideoId = restVideos[0]?.id

            videos = restVideos
            nextVideo = {
              videoId: nextVideoId,
              createdAt: moment().toISOString(),
            }

            await postCurrentVideo(nextVideoId)
          }

          context.setVideos(videos)
          setCurrentVideo(nextVideo)
        }}
        onReady={(event: any) => {
          setPlayer(event.target)
          event.target?.unMute()
          event.target?.setVolume(volume)
        }}
      />
    ) : null
  }, [currentVideo?.videoId, videosContext, volume, player])

  return (
    <div className={styles.Background}>
      <div className="options">
        <Button
          color={volume === 0 ? '#c6c9cf' : '#494c52'}
          auto
          style={{ margin: '5px' }}
          onClick={() => {
            player.mute()
            setVolume(0)
            player.setVolume(0)
          }}
        >
          Mute
          <span></span>
        </Button>
        <Button
          auto
          color={volume === 20 ? 'primary' : '#494c52'}
          style={{ margin: '5px' }}
          onClick={() => {
            player.unMute()
            setVolume(20)
            player.setVolume(20)
          }}
        >
          Volume 20
        </Button>
        <Button
          auto
          style={{ margin: '5px' }}
          color={volume === 50 ? '#0dd910' : '#494c52'}
          onClick={() => {
            player.unMute()
            setVolume(50)
            player.setVolume(50)
          }}
        >
          Volume 50
        </Button>
        <Button
          auto
          style={{ margin: '5px' }}
          color={volume === 80 ? 'orange' : '#494c52'}
          onClick={() => {
            player.unMute()
            setVolume(80)
            player.setVolume(80)
          }}
        >
          Volume 80
        </Button>
        <Button
          auto
          style={{ margin: '5px' }}
          color={volume === 100 ? 'red' : '#494c52'}
          onClick={() => {
            player.unMute()
            setVolume(100)
            player.setVolume(100)
          }}
        >
          Volume 100
        </Button>
      </div>
      {youtubeRender}
    </div>
  )
}

export default PlayGround
