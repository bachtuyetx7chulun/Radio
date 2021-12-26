const CONVERT_YTB_DURATION_TO_SECONDS = (duration: string): string => {
  const payload = duration.substring(2, duration.length)?.split('M')
  const minutes = payload[0]
  const seconds = ('0' + payload[1]?.replaceAll(/[a-zA-Z]/g, ''))?.slice(-2)

  return minutes + ':' + seconds
}

const RANDOM_COLOR = (): string => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

export { RANDOM_COLOR, CONVERT_YTB_DURATION_TO_SECONDS }
