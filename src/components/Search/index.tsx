import { searchVideo } from '@adapters/xhr/search-video'
import { Avatar, Button, Card, Col, Grid, Input, Modal, Row, Text } from '@nextui-org/react'
import styles from '@styles/Search/Search.module.scss'
import { CONVERT_YTB_DURATION_TO_SECONDS } from '@utils/index'
import React, { FC, ReactElement, useRef, useState } from 'react'

const SearchBox: FC = (): ReactElement => {
  const [visible, setVisible] = useState(false)
  const [videos, setVideos] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [addList, setAddList] = useState<any[]>([])
  const searchRef = useRef<any>(null)
  const handler = () => setVisible(true)
  const closeHandler = () => {
    setVisible(false)
    setVideos([])
    setSearch('')
  }

  const handleSearch = (payload: string) => {
    if (searchRef.current) {
      clearTimeout(searchRef.current)
    }

    searchRef.current = setTimeout(async () => {
      const data = (await searchVideo(payload)) || []
      setSearch(payload)
      setVideos(data)
    }, 500)
  }

  return (
    <div className={styles.SearchBox}>
      <Grid.Container style={{ padding: '0 10px' }}>
        <Text className={styles.Title}>
          <span>Voting</span>
        </Text>
        <Grid xs={12} className={styles.SearchWrap} onClick={handler}>
          <div className={styles.FlexCenter}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAApFJREFUSEvlll9SGkEQxr/eoSrkSTxByAmCJ4iUaLlY/DtB9AbmBOIJYk4QcgIIlGxVxFJPEG4QPEHWp5AqZzrV6y7uysKOVCgfMm/s9Mxvvv6meyC80KAX4sIaPPAutg3RO4epYIh9MmZcr+7drHrwpeCud1VU0CcADlMBBB+MnoY6bbnlyXMOsRDcH14eg/iT7WZMOG7sVz7bxqeCB96ow8CHaBMCvoqy+z/qutUq+93uVSH3Sm+D0IzHAejU3cqRDXwO/ETprTKmeXCwN1602fn595J2nB6AN0EM08d6decsC54Ah57+DBfd6qkqiUL5LSqdvG44oCKTGevfuZv4nMprOVwA11BvszxPgOMpVsZsRUqDLDh8AkZhpoTgM9COfA2V/5B5sabmVtIvZLhBAtz3Rpy28KnniTTGUjuLI/j1/crmsnTPwFKnDLoKwIxWrVoR32ZjMByJb9fyfTAcNZnQAbABgq9ZbUlqw+/dh8NzuebuXi+Cz8DxS6WnajPyb9HCBCQ8qNwDlde/bC7ZDPzNu2gTSJoF6m7FqqPJGol3JBOhusguBp823N1gPm2srDhts7jiNLvia6w9zqpLmY+nP14VSxXLZN8bSc1u2JRD2mbx259ll1Ud26iN13GWv2HJPm77pHNN9FRtZd1uWR16K82jCOBOT1Uxa11Wr54oY1oWvVpqV6BWXWtOcaQ9pVN1QNyL+nOg8PX9ezA1099qOqq7O9JgFo5/9R7fEdBLPpHL4Zn/QHLQbQZE2Uba8eUimWnuTDzte5eHAH95jFsMt+pQQY1KL2enxGQKDtPYYTNJ894Wbg22Kakoxga+FvBDM4qnfT7lawM/wuXRmb/hawWvVE7P8XSV2P9P8V9zV24uBO66UQAAAABJRU5ErkJggg==" />
            <span className={styles.Span}>Quick search...</span>
          </div>
          <div style={{ marginRight: '10px' }} className={styles.FlexCenter}>
            <span className={styles.SpanCrtl}>Crtl</span>
            <span className={styles.SpanK}>K</span>
          </div>
        </Grid>
        <Grid xs={12} hidden={addList.length !== 0}>
          <Text color="grey" size={12} style={{ marginBottom: '10px' }}>
            You don't have a track to submit !
          </Text>
        </Grid>

        {addList.map((video) => {
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
                    color={'grey'}
                    weight="bold"
                    size={13}
                    className={`${styles.MarginLeft10} ${styles.MarginTop5}`}
                    style={{ lineHeight: 1.1, width: '210px' }}
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
                        style={{ width: '13px' }}
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAASpJREFUSEvFlcFxwjAQRf+CuacBM+TI6BBTQSiBDgIVpJZUQNIBJSQdiMMORzLQQO4YNiNNnLGxZdnYSnyy9Mf/zV/tyoTADwX2x/8ADtPpgobDJxJJTEIBPuVyeRnvdhuztvpg8EzAxOpEWs7nt0zPV6WQYJ8kd1GariGycJTu/Wd/XqkTbdIoWt1r/ZXpBcBRKQ3goeO56Jh5VgIclFoSsO5obj8XYDVmfjXvvwmOSpn4j30AAHzEzLaMeYD0ZG5tYmbr/aeAsCUKfsimXj216TZmtgNaOAOzsIN2OplS3ToL23Q0mjsHrSOkZF5KkMW6IUmluRPQMonTvBbQEFJr7gV4IF7zRgAHpJF5Y8AVBNetWHeHtfplmu4yZvk+912QrQA+syo9OOAbnnqVGQbaO3kAAAAASUVORK5CYII="
                      />
                      <Text size={13} style={{ marginLeft: '2px' }} weight="bold" transform="uppercase" color="#816F6A">
                        1,000
                      </Text>
                    </div>
                  </Row>
                </div>
                <div className={styles.AddButton}>
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAXdJREFUSEvFlUFygjAUhv+HXQveoAtc155A3HaGKb1Be4L2JvUI7Q1UZrqVI+BaOtMbCK6V1wkjKWDAgDplF5L3f//LS14IV/7oyvpQArbu8JmJX8EYaRkghASe9hffn9X1JcDGu7WM9GapLXysFqbGbjKY/cT5VAmwde2QgTst13WLCKG5iO6PAIlrvwF4P0v8EEygl76//hBDmcFF3P/ZlllIQOLaXON+DoYDglmaZyQgBAAeVXGmH2XapwBz04+8zcNwZBgcSAgjSVNyBl/rMHHtmQqiC4jTPU2EkIQAyMWzfz1eArCqWegCRFwJIn5IYI24WNMGUIKIQZPzPJN2gMKeS0CxJooq6wMK4sJ5aYsaIHqAivihoDgqfPUI69aAgZnlR0+KPZeFP/eYQkAIcBRHMWYgIMA756J1ak0ErPp+lNXr1E3uCFA0u4Ze1ApSdH/xDIT4vrdzlA9O7NqiYONWdmX/xwqgaf4GFDX+59HvkkVdzC+IOOMZlOvqjQAAAABJRU5ErkJggg==" />
                </div>
              </Card>
            </Grid>
          )
        })}
        <Grid xs={12}>
          <Button color="gradient" auto disabled={addList.length === 0}>
            Submit
          </Button>
        </Grid>
        <Grid xs={12} className={styles.SearchSuggest}>
          <Text className={styles.Title}>
            <span>Suggest</span>
          </Text>
        </Grid>
        {[1, 23, 2, 3, 23, 5, 5, 5, 5, 5].map((_, index) => {
          return (
            <Grid xs={12} className={`${styles.ListItem} ${styles.ItemWrap}`} key={index}>
              <Card width="100%" bordered hoverable>
                <Avatar
                  src="https://picsum.photos/200/300"
                  size={50}
                  style={{ marginBottom: 'auto', marginTop: 'auto' }}
                />
                <div>
                  <Text
                    color={'grey'}
                    weight="bold"
                    size={13}
                    className={`${styles.MarginLeft10} ${styles.MarginTop5}`}
                    style={{ lineHeight: 1.1, width: '210px' }}
                  >
                    Netrum & Halvorsen - Phoenix
                  </Text>
                  <Row className={styles.MarginLeft5}>
                    <div className={styles.OptionDetail}>
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJlJREFUSEtjZKAxYKSx+QyjFhAM4YENoiveBqv/MTHX6m0+e4OgU3EowOuDK94G/0H6GP8zNGhvu9BIjiVEWQAx+P8NRkamWu0t59eQYhEJFsCNXUNKsJFjAdgmYoONbAuIDbbBa8H//wyNutsuNBCKcHJ8QKtIpmEyJTY4sAUXoSCibVFBKAKJkR/Y0pQYFxJSM+oDQiHEAAAxwVAZc2rZCQAAAABJRU5ErkJggg==" />
                      <Text size={13} weight="bold" transform="uppercase" color="#816F6A">
                        2:50
                      </Text>
                    </div>
                    <div className={`${styles.OptionDetail} ${styles.MarginLeft10}`}>
                      <img
                        style={{ width: '13px' }}
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAASpJREFUSEvFlcFxwjAQRf+CuacBM+TI6BBTQSiBDgIVpJZUQNIBJSQdiMMORzLQQO4YNiNNnLGxZdnYSnyy9Mf/zV/tyoTADwX2x/8ADtPpgobDJxJJTEIBPuVyeRnvdhuztvpg8EzAxOpEWs7nt0zPV6WQYJ8kd1GariGycJTu/Wd/XqkTbdIoWt1r/ZXpBcBRKQ3goeO56Jh5VgIclFoSsO5obj8XYDVmfjXvvwmOSpn4j30AAHzEzLaMeYD0ZG5tYmbr/aeAsCUKfsimXj216TZmtgNaOAOzsIN2OplS3ToL23Q0mjsHrSOkZF5KkMW6IUmluRPQMonTvBbQEFJr7gV4IF7zRgAHpJF5Y8AVBNetWHeHtfplmu4yZvk+912QrQA+syo9OOAbnnqVGQbaO3kAAAAASUVORK5CYII="
                      />
                      <Text size={13} style={{ marginLeft: '2px' }} weight="bold" transform="uppercase" color="#816F6A">
                        1,000
                      </Text>
                    </div>
                  </Row>
                </div>
                <div className={styles.AddButton}>
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAPRJREFUSEtjZKAxYKSx+QxYLXBq/5XAyPg/n4GBwYBIB1xgYGScsLecbSG6ehQLHPr/CzD//LWfBIPRzbvwl53N8UAh4weYBIoFzh0/LzAwMOgT6Wpcyi7srWA3xLDAqfNHAeN/xn4KDQdr//+fMXFfJdsCEBvuAyq5HuY+uC+QLfhPyPV7K9jB6p07fhKtdtQCnKEKC068QQRTRChusMXJ4LAA3eWjqYjozEOzjEYoNSHJX9xbwQ4u6knKycRagKuwIxhERFoAdz0tfHDxLzubA9YKx6n9xwFGRkZ7Il2Jruzi//+ME2B1ALLkwFT6ZPoCqzYAn/6SGYHO5j4AAAAASUVORK5CYII=" />
                </div>
              </Card>
            </Grid>
          )
        })}
      </Grid.Container>
      <Modal
        className={styles.SearchModal}
        aria-labelledby="modal-title"
        open={visible}
        width="700px"
        onClose={closeHandler}
        property="top"
        style={{ marginTop: '-200px' }}
      >
        <Modal.Header style={{ marginTop: '10px' }}>
          <Input
            className={styles.Span}
            clearable
            bordered
            fullWidth
            color="primary"
            size="large"
            placeholder="Search video ..."
            contentLeftStyling={true}
            contentRightStyling={true}
            onChange={(e) => handleSearch(e.target.value)}
            contentLeft={
              <img
                style={{ transform: 'translateY(2px)', width: '25px', maxWidth: '25px' }}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAABMFJREFUaEPtmlFS5DYQhrv9IB6XPUHgBNk9QdgTZPcECydY5o2RqVpThXt42+EEOzlBhhOEPUEmJwicIMMjUOVONaVJGY1ky7KAchi9TIFlSZ9a+rvVMsIrK/jKeGED/H+3+MbCfSystX4HAL8CgPzumN96kwsAuAKASwD4QUTy97OW3hY+OjraQcQviPjRQHYBuGLmOTOfn52dyUQ8eYkGLopi+/b29isiHqYYJTNPt7a2ToqiWKZoz9dGFPB4PP6IiN8BYDvx4JbMfDCZTOaJ2/2vuc7A4/H4Wyqr+qDE2pPJZPQU0MHAsoTv7u7EqrJXvQUR/wKAGSIuqqparoRJBC3Lsm1mFkHbZ+afW4BmSqlR6iUeDKy1/r0F9kQpNQ0doJlA2f9fG8BnRHSQ0tJBwFrrKQB88XR8UVXVYazKispnWSbtiztzlXMiSiKM0ngrsBEosa6rnBBRkcICWmtpx2ltZv6USsgagc2y+9ujxgdENEsBu2pDa70PAKITdlkqpXZDt0ujxjQ9zPN8xsyfHXUaLSurAgB+kUgLER9cFzOLf11kWXZZluWFr98GSydZ2l4Lm70l1rXLBRE5ldos/28BEZdEWCPfMtVaix9e29NVVe3GasUKwgvsEypfpy3C5jNoQUQn9sOGye6tGU3AYl05ANSLt8NIYEDEUVmWotKPimdpXxHRbh/dcAKbU8+fdsNKqbdNwtGw59vG+N4+ORnB/Mfx4lrdtsbrz33Aay5CIqiyLCVKaiw16B8mRJybg8aeCUlFzOyyIKL39j/zPF/YEZlvRbSNq3EPu0SjS0ciXg2C5PS3Ll+b5/khM4sI1otXNEOgfRaW5fzImlmWfTg9PZWDe++itZZ2bEuv6cPx8fFeVVV/WB06V0PooHzAnHrv1NvzgEgGZK9ez6clRNQaIfomIBi4TyeuzrXW9qTKyeqtXddRD/qM5cWAQ5fgiwEDQC93EAoYsKSviciOD4Kbd1rY5Q5Silbo6EL3emh7Us+3pNdi2S5uqcsAmuo+p1ty+cpe7iBmErTWa+6x78QnDS1joHzvPGtoKYPQWkti/CdrQL1PK6GT4jk83BBRr9RwsuNhKEhIvRc5HjZ0OieiTyEDj63jyZDeKKV2+qZ5GkO02BRPLKjZSr5k3tOmeKRzIxyyl984IJ4ziXetlHrX17peP1yHa0nTOlM0MRbWWkuK1pnyTRn0BJ06WtI386qqRrHJNaMVcub1XeFItvNDqrvkIGCxWED6plBKnYcuO7Nd5DYjJJGfDDoYWAZ4f38/9eSp66tYbvUln71ARPGbD7f8crZl5jeI+HCZ5vg6oG0nJIEOBl6NJjY72UZjPb/xCGVv6M7AMjAjZHLN4lLvjmyPql9nWbYv16zmOxBX+72go4BrLkv2n+9WsSv4uVKqWGmASe9I7ispdDTwisaorFxnisrasXcbtCzdqe9e+SmgewPXiWSAiLjHzJKD3rFyytfmk6UlIl4y82WIq0kNnRS4zZyxz1NCDwJ45dZSCNlggFNBDwo4ALr1RDU4YB80Iv5WlqVEcI1lkMA2dChs0PGwbcZe8rlR7/0unzUN1sKxE70Bjp25oby3sfBQLBU7zo2FY2duKO+9Ogv/Cy32hFuRH4l6AAAAAElFTkSuQmCC"
              />
            }
            contentRight={
              <img
                onClick={closeHandler}
                style={{ transform: 'translateY(2px)', width: '25px', maxWidth: '25px' }}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAVVJREFUSEvtVtFtwjAQfWeExSfdgA3KCMkmsEH9E2CCSPy4G5RO0o4QJugK9A8JKa5Cm2Abkl5xJFMJ/+by3t3z3TsTIh2KxIvbItZaj83h8NiHGjQcbpVSOx/rrGK9Xs9gzEsfpA0G0Vxl2cbGdIh1nk8gxEevpDWYlA925T5xAiHefmIVyrIISkKIKQB9xCjLVK1W7zVeO7EXeE0COs9PhdyJbQm7pDmLGwwmfqf618GXWusx9vuqIYDRqLg0f9WnBtCYjVou5233zybmNpADCBSQMr2UJJv4D441JWOerUR3IEpVljnjxye2259bvmNHrkP9A2K7uboqth3pO+4TRMnVUnPV9ZprCymT3pqrbZ054wS8qsViFjxO8Qykw9S518B1wvt2avanIXpCZYdh5+Rwv+zjOE+f46jEeOzVqlbLolmPYVK3rtfbetCHFsn5P1rFX/qbMi7CQhdDAAAAAElFTkSuQmCC"
              />
            }
            contentClickable={true}
          />
        </Modal.Header>
        <Modal.Body style={{ overflow: 'hidden' }}>
          {search.length !== 0 ? (
            <Row>
              <Text color="gray" weight={'bold'} margin={'-15px 0 0 0'}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: '500' }}>Results for</span> `{search}`
              </Text>
            </Row>
          ) : (
            <Row justify="center" align="center" style={{ height: '200px', transform: 'translateY(-50px)' }}>
              <Text weight={'bold'} color="#9d9d9d" size={20}>
                Find a favorite video ...{' '}
              </Text>
            </Row>
          )}

          <Grid.Container style={{ height: '100%', maxHeight: '300px', overflowY: 'scroll' }} gap={2}>
            {search.length !== 0 &&
              videos.map((video) => {
                return (
                  <Grid
                    xs={12}
                    sm={6}
                    key={video?.id}
                    onClick={() => {
                      const currentAddList = [...addList, video]
                      setAddList(currentAddList)
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <Card width="100%" cover>
                      <Card.Image
                        className="video-thumbnail"
                        autoResize={false}
                        src={video?.snippet?.thumbnails?.medium?.url}
                        width="100%"
                        height="150px"
                        alt="Card image background"
                      />
                      <Card.Footer blur color="#3a383830" style={{ position: 'absolute', zIndex: 1, bottom: 0 }}>
                        <Row>
                          <Col>
                            <Text color="#fff" size={12}>
                              {video?.snippet?.title}
                            </Text>
                            <Text color="#fff" weight={'bold'} size={12}>
                              [ {CONVERT_YTB_DURATION_TO_SECONDS(video?.contentDetails?.duration)} ]
                            </Text>
                          </Col>
                        </Row>
                      </Card.Footer>
                    </Card>
                  </Grid>
                )
              })}
          </Grid.Container>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default SearchBox
