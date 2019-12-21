import React from 'react'

import { tabs } from '../constants/index'

const Tab = props => {
    const handleClick = tab => {
        props.onClick(tab);
    }
    return (
        <ul className="tabs">
            {tabs.map(tab =>
                <li
                    key={tab}
                    className={tab === props.selectedTab ? 'active' : null}
                    onClick={() => handleClick(tab)}
                >
                    {tab}
                </li>
            )}
        </ul>
    )
}

export default Tab