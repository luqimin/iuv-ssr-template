/**
 * 图片组件, 添加图片加载失败兜底方法
 */
import * as React from 'react';

export interface ImagesProps {
    /**
     * 图片src
     */
    src: string;

    style?: any;
    className?: string;

    /**
     * 图片加载错误回调
     */
    onError?(): void;
}

export default class Image extends React.PureComponent<ImagesProps> {
    state = {
        /**
         * 图片是否加载错误
         */
        error: false,
    };

    handleError = (event: any) => {
        this.setState({ error: true });
    }

    render() {
        const error = this.state.error;

        return (
            <div style={{ display: 'flex' }}>
                {error ? (
                    <div
                        className={this.props.className}
                        style={{ borderRadius: '50%', backgroundColor: '#ccc', ...this.props.style }}
                    />
                ) : (
                    <img {...this.props} onError={this.handleError} />
                )}
            </div>
        );
    }
}
