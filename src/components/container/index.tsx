import React from 'react'
import styles from './index.module.css'

type Props = {
    children: React.ReactElement[] | React.ReactElement
}

export const Container: React.FC<Props> = ({children}) => {
  return (
    <div className={styles.container_main}>{children}</div>
  )
}
