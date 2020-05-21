/**
 * 图片组件, 添加图片加载失败兜底方法
 */
import * as React from 'react';

export interface ImagesProps {
    /**
     * 图片src
     */
    src: string;
    alt?: string;

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

    handleError = () => {
        this.setState({ error: true });
    };

    render() {
        const { error } = this.state;
        const { className, style, alt, ...rest } = this.props;

        return (
            <div style={{ display: 'flex' }}>
                {error ? (
                    <div className={this.props.className} style={{ borderRadius: '50%', backgroundColor: '#ccc', ...this.props.style }} />
                ) : (
                    <img {...rest} alt={alt} onError={this.handleError} />
                )}
            </div>
        );
    }
}
