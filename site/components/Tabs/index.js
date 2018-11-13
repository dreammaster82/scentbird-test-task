import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './style.css';

function MyTabs({onChange, tab, items}) {
    return(
        <div className="tabs">
            <Tabs
                value={tab}
                onChange={onChange}
                classes={{flexContainer: 'tabs__tabs', root: 'tabs__root'}}
            >
                {!!items.length && items.map((it, index) => {
                    return <Tab label={it.label} key={index} />
                })}
            </Tabs>
            <div className="tabs__text">{items[tab].text}</div>
        </div>
    );
};

export default MyTabs;