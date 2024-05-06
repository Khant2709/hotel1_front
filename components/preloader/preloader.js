import React from 'react';

import styles from './preloader.module.scss';

const Preloader = () => {
    return (
        <section className={styles.main}>
            <div className={`${styles.loader} ${styles.loader1}`}>
                <div>
                    <div>
                        <div>
                            <div>
                                <div>
                                    <div>
                                        <div>
                                            <div/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Preloader;