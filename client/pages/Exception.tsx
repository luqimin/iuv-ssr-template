import { Result, Button } from 'antd';
import { ResultStatusType } from 'antd/lib/result';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    code?: ResultStatusType;
    title?: string;
    subTitle?: string;
}

export default (props: Props) => {
    const { code = 500, title = '发生些许错误，请稍后重试', subTitle } = props;
    return (
        <Result
            status={code}
            title={title}
            subTitle={subTitle}
            extra={
                <Link replace to="/">
                    <Button type="primary">返回首页</Button>
                </Link>
            }
        />
    );
};
