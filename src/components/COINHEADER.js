import React from 'react'
import { CoinHeader } from './app.styles'

const COINHEADER = ({ handleSort, isSorted }) => {
    return (
        <CoinHeader>
            <div className='grid'>#</div>
            <div className='grid'>Icon</div>
            <div className='grid'>Name</div>
            <div className='grid'>Symbol</div>
            <div className='grid price' onClick={handleSort}>Price {isSorted ? "↓" : !isSorted && isSorted !== false ? "↕" : "↑"}</div>
            <div className='grid'>24h</div>
        </CoinHeader>
    )
}

export default COINHEADER