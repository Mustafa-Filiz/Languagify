import { Spinner, SpinnerProps } from '@nextui-org/react'
import { FC } from 'react'

interface LoadingSpinnerProps extends SpinnerProps {}

const LoadingSpinner: FC<LoadingSpinnerProps> = (props) => {
  return <Spinner {...props} />
}

export default LoadingSpinner
