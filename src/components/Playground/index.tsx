import React, { FC, ReactElement } from 'react'
import YouTube, { Options } from 'react-youtube'

const PlayGround: FC = (): ReactElement => {
  const options = {
    width: '100%',
    height: '500px',
    playerVars: {
      start: 0,
      autoplay: 1,
      controls: 1,
      showinfo: 0,
      cc_load_policty: 0,
      iv_load_policy: 3,
      fs: 0,
    },
  } as Options

  return (
    <div>
      <button
        onClick={() => {
          const video = document.getElementById('video') as HTMLVideoElement
          video.volume = 0.5
        }}
      >
        CLick
      </button>
      <YouTube
        id="video"
        videoId="6z0TZjl47J0"
        opts={options}
        onReady={(event) => {
          event.target.setVolume(0)
          event.target.playVideo()
        }}
      />
    </div>
  )
}

export default PlayGround
