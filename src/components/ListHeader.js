import React from 'react'
import { ListHeader } from './app.styles'

const LISTHEADER = ({ value }) => {
    return (
        <ListHeader>
            <h3>Coin <strong>{value ? value : 'List'}</strong>
            </h3>
        </ListHeader>
    )
}

export default LISTHEADER