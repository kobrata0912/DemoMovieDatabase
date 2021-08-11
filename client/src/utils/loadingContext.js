import { createContext } from 'react'

const LoadingContext = createContext({
  shouldBeLoading: false,
  showLoading: () => {},
  hideLoading: () => {}
})

export default LoadingContext