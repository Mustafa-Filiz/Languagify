import { FC } from 'react'
import { LinkIcon } from '@nextui-org/shared-icons'
import { linkAnchorClasses } from '@nextui-org/theme'

import { LinkProps as NextLinkProps, useLink } from '@nextui-org/react'
import {
  LinkProps as TanLinkProps,
  Link as TanLink,
} from '@tanstack/react-router'

type LinkPropTypes = TanLinkProps & NextLinkProps

const Link: FC<LinkPropTypes> = (props) => {
  const {
    children,
    showAnchorIcon,
    anchorIcon = <LinkIcon className={linkAnchorClasses} />,
    getLinkProps,
  } = useLink(props)

  return (
    <TanLink {...getLinkProps()}>
      {children}
      {showAnchorIcon && anchorIcon}
    </TanLink>
  )
}

export default Link
