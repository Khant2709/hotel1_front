import React from 'react';

import styles from '../../styles/blog.module.css';
import stylesFont from '../../styles/fonts/timesNewRoman.module.css';
import HeaderLineBackground from "../../../components/headerLineBackgrund/headerLineBackground";

const BlogPage = () => {
    return (

        <>
            <HeaderLineBackground hotelNumber={'hotel1'} display={true}/>
            <div className={styles.main}>
                <p className={stylesFont.newRoman700}>На данный момент страница находиться в разработке</p>
            </div>
        </>
    );
};

export default BlogPage;