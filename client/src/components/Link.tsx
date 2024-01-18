import { Link as LinkRoute, LinkProps } from '@tanstack/react-router'
import { Link as LinkUI } from '@nextui-org/react'
import { FC } from 'react'

interface ILinkProps extends LinkProps {}

const Link: FC<ILinkProps> = (props) => {
  return (
    <LinkUI>
      <LinkRoute {...props}>{props?.children}</LinkRoute>
    </LinkUI>
  )
}

export default Link
