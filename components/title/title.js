import React from 'react';

import styles from './title.module.css';
import stylesFontsT from '../../src/styles/fonts/timesNewRoman.module.css';

const Title = ({Tag, text}) =>  (
        <Tag className={`${stylesFontsT.newRoman700} ${styles.title}`}>{text}</Tag>
    );

export default Title;