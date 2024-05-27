import React from 'react';

import styles from './yaMap.module.css';

const YaMap = () => (
    <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3Acb50cfafaa5452366f623c29287055b9fb4b1b33f8e763d134a5b487d26e5f74&amp;source=constructor"
        className={styles.map}
        width="1280"
        height="720"
        frameBorder="0"/>
);

export default YaMap;