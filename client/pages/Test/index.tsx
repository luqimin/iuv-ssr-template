import * as React from 'react';

import styles from './index.less';

interface Props {
    testProp?: string;
}

class Test extends React.PureComponent<Props, any> {
    render() {
        return (
            <div className={styles.container}>
                TEST:
                {this.props.testProp || '~~~'}
            </div>
        );
    }
}

export default Test;
