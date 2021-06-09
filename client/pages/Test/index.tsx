import * as React from 'react';

import styles from './index.less';

interface Props {
    testProp?: string;
}

const Test = (props: Props) => {
    return (
        <div className={styles.container}>
            TEST:
            {props.testProp || '~~~'}
        </div>
    );
};

export default Test;
