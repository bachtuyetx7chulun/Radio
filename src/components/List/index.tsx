import CONTEXT from '@contexts/context'
import { Avatar, Card, Grid, Row, Text } from '@nextui-org/react'
import styles from '@styles/List/ListTrack.module.scss'
import { CONVERT_YTB_DURATION_TO_SECONDS, RANDOM_COLOR } from '@utils/index'
import React, { FC, ReactElement, useContext } from 'react'

const ListTrack: FC = (): ReactElement => {
  const { videos } = useContext(CONTEXT)

  return (
    <div className={styles.ListTrack}>
      <Grid.Container>
        <Text className={styles.Title}>
          <span>Play QUEUE</span>
        </Text>
      </Grid.Container>

      <Grid.Container className={styles.ListWrap}>
        {videos?.map((video: any, index: number) => {
          if (index === 0) {
            return (
              <Grid xs={12} className={styles.ListItem} key={video?.id}>
                <Card width="100%" bordered hoverable>
                  <Avatar
                    className={styles.Avatar}
                    size="large"
                    src={video?.snippet?.thumbnails?.medium?.url}
                    color="success"
                    squared
                  />
                  <div className={styles.CardContent}>
                    <Text className={styles.CardText}>{video?.snippet?.title}</Text>
                  </div>
                  <div className={styles.CardOptions}>
                    <div className={styles.OptionDetail}>
                      <Text size={13} weight="bold" transform="uppercase" color="#dd6d5c">
                        Live
                      </Text>
                      <img
                        style={{ width: '15px', transform: 'translateY(-5px)' }}
                        src="https://upload.wikimedia.org/wikipedia/commons/4/41/Red_circle.gif"
                      />
                    </div>
                    <div className={styles.OptionDetail}>
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJlJREFUSEtjZKAxYKSx+QyjFhAM4YENoiveBqv/MTHX6m0+e4OgU3EowOuDK94G/0H6GP8zNGhvu9BIjiVEWQAx+P8NRkamWu0t59eQYhEJFsCNXUNKsJFjAdgmYoONbAuIDbbBa8H//wyNutsuNBCKcHJ8QKtIpmEyJTY4sAUXoSCibVFBKAKJkR/Y0pQYFxJSM+oDQiHEAAAxwVAZc2rZCQAAAABJRU5ErkJggg==" />
                      <Text size={13} weight="bold" transform="uppercase" color="#816F6A">
                        {CONVERT_YTB_DURATION_TO_SECONDS(video?.contentDetails?.duration)}
                      </Text>
                    </div>
                    <div className={styles.OptionDetail}>
                      <img
                        style={{ width: '13px', transform: 'translateY(1px)' }}
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAASpJREFUSEvFlcFxwjAQRf+CuacBM+TI6BBTQSiBDgIVpJZUQNIBJSQdiMMORzLQQO4YNiNNnLGxZdnYSnyy9Mf/zV/tyoTADwX2x/8ADtPpgobDJxJJTEIBPuVyeRnvdhuztvpg8EzAxOpEWs7nt0zPV6WQYJ8kd1GariGycJTu/Wd/XqkTbdIoWt1r/ZXpBcBRKQ3goeO56Jh5VgIclFoSsO5obj8XYDVmfjXvvwmOSpn4j30AAHzEzLaMeYD0ZG5tYmbr/aeAsCUKfsimXj216TZmtgNaOAOzsIN2OplS3ToL23Q0mjsHrSOkZF5KkMW6IUmluRPQMonTvBbQEFJr7gV4IF7zRgAHpJF5Y8AVBNetWHeHtfplmu4yZvk+912QrQA+syo9OOAbnnqVGQbaO3kAAAAASUVORK5CYII="
                      />
                      <Text size={13} style={{ marginLeft: '2px' }} weight="bold" transform="uppercase" color="#816F6A">
                        {video?.statistics?.likeCount}
                      </Text>
                    </div>
                  </div>
                </Card>
              </Grid>
            )
          }

          return (
            <Grid xs={12} className={`${styles.ListItem} ${styles.ItemWrap}`} key={video?.id}>
              <Card width="100%" bordered hoverable>
                <Avatar
                  src={video?.snippet?.thumbnails?.medium?.url}
                  size={50}
                  style={{ marginBottom: 'auto', marginTop: 'auto' }}
                />
                <div>
                  <Text
                    color={RANDOM_COLOR()}
                    weight="bold"
                    size={13}
                    className={styles.MarginLeft10}
                    style={{
                      whiteSpace: 'nowrap',
                      width: '200px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {video?.snippet?.title}
                  </Text>
                  <Row className={styles.MarginLeft5}>
                    <div className={styles.OptionDetail}>
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJlJREFUSEtjZKAxYKSx+QyjFhAM4YENoiveBqv/MTHX6m0+e4OgU3EowOuDK94G/0H6GP8zNGhvu9BIjiVEWQAx+P8NRkamWu0t59eQYhEJFsCNXUNKsJFjAdgmYoONbAuIDbbBa8H//wyNutsuNBCKcHJ8QKtIpmEyJTY4sAUXoSCibVFBKAKJkR/Y0pQYFxJSM+oDQiHEAAAxwVAZc2rZCQAAAABJRU5ErkJggg==" />
                      <Text size={13} weight="bold" transform="uppercase" color="#816F6A">
                        {CONVERT_YTB_DURATION_TO_SECONDS(video?.contentDetails?.duration)}
                      </Text>
                    </div>
                    <div className={`${styles.OptionDetail} ${styles.MarginLeft10}`}>
                      <img
                        style={{ width: '13px', transform: 'translateY(1px)' }}
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAASpJREFUSEvFlcFxwjAQRf+CuacBM+TI6BBTQSiBDgIVpJZUQNIBJSQdiMMORzLQQO4YNiNNnLGxZdnYSnyy9Mf/zV/tyoTADwX2x/8ADtPpgobDJxJJTEIBPuVyeRnvdhuztvpg8EzAxOpEWs7nt0zPV6WQYJ8kd1GariGycJTu/Wd/XqkTbdIoWt1r/ZXpBcBRKQ3goeO56Jh5VgIclFoSsO5obj8XYDVmfjXvvwmOSpn4j30AAHzEzLaMeYD0ZG5tYmbr/aeAsCUKfsimXj216TZmtgNaOAOzsIN2OplS3ToL23Q0mjsHrSOkZF5KkMW6IUmluRPQMonTvBbQEFJr7gV4IF7zRgAHpJF5Y8AVBNetWHeHtfplmu4yZvk+912QrQA+syo9OOAbnnqVGQbaO3kAAAAASUVORK5CYII="
                      />
                      <Text size={13} style={{ marginLeft: '2px' }} weight="bold" transform="uppercase" color="#816F6A">
                        {video?.statistics?.likeCount}
                      </Text>
                    </div>
                  </Row>
                </div>
              </Card>
            </Grid>
          )
        })}
      </Grid.Container>
    </div>
  )
}

export default ListTrack
