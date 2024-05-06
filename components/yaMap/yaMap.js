import React from 'react';

import styles from './yaMap.module.css';

const YaMap = () => (
    <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A5c785a1c1fd31726354cc4dc6927c28d22d4785defb56abc39c067c709e1eff4&amp;source=constructor"
        className={styles.map}
        width="1280"
        height="720"
        frameBorder="0"/>
);

export default YaMap;

