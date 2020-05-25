let esUrl : string

if (process.env.NODE_ENV === 'production') {
  esUrl = 'http://localhost:9200'
} else if (process.env.NODE_ENV === 'development') {
  esUrl = 'http://localhost:9200'
} else {
  esUrl = 'http://localhost:9200'
}

export { esUrl }
