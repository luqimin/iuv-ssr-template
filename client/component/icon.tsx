/**
 * 图标
 */
import { Icon } from 'antd';
import { IconProps } from 'antd/lib/icon';
import * as React from 'react';

/* tslint:disable:max-line-length max-file-line-count */

export const IconTagClose = (props: IconProps = {}) => {
    return (
        <Icon
            {...props}
            component={() => (
                <svg width="1em" height="1em" viewBox="0 0 12 12" fill="currentColor">
                    <path
                        fill=""
                        fillRule="nonzero"
                        d="M6 0a6 6 0 1 0 0 12A6 6 0 1 0 6 0zm2.406 7.815a.422.422 0 0 1-.598.596L6 6.598 4.192
                        8.41a.419.419 0 0 1-.597 0 .422.422 0 0 1 0-.596L5.404 6l-1.81-1.815a.422.422 0 0
                        1 .597-.596L6 5.402l1.808-1.814a.422.422 0 0 1 .598.596L6.596 6l1.81 1.815z"
                    />
                </svg>
            )}
        />
    );
};
