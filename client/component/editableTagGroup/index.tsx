/**
 * tag选择器
 */
import { IconTagClose } from '@component/icon';
import { DEFAULT_COLORS } from '@const/colors';
import { Icon, Input, Tag, Tooltip } from 'antd';
import * as React from 'react';

import styles from './index.less';

export interface EditableTagGroupProps {
    value?: string[];
    /**
     * 可创建的最大标签数，默认不限制
     */
    max?: number;
    /**
     * 新建标签文本
     */
    newText?: string;
    tips?: string;
    onChange?(value: string[]): void;
}

export default class EditableTagGroup extends React.PureComponent<EditableTagGroupProps, any> {
    input: Input;

    constructor(props: any) {
        super(props);
        this.state = {
            inputVisible: false,
            inputValue: '',
            /**
             * 当前正在编辑的tag
             */
            editIndex: -1,
        };
    }

    saveInputRef = (input: Input) => (this.input = input);

    /**
     * 删除tag
     */
    handleClose = (removedTag: string) => {
        const tags = this.props.value!.filter((tag) => tag !== removedTag);
        this.triggerChange(tags);
    }

    /**
     * 开始编辑tag
     */
    startEditTag = (i: number) => {
        this.setState({ editIndex: i });
    }

    /**
     * 取消编辑tag
     */
    handleCancelEdit = () => {
        this.setState({ editIndex: -1 });
    }

    /**
     * 编辑tag
     */
    handleEditTag = (inputValue: string, i: number) => {
        let tags = this.props.value || [];
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags];
            tags[i] = inputValue;
        }
        this.handleCancelEdit();
        this.triggerChange(tags);
    }

    /**
     * 显示新建input
     */
    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    }

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ inputValue: e.target.value });
    }

    handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = this.props.value || [];
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        this.setState({
            inputVisible: false,
            inputValue: '',
        });
        this.triggerChange(tags);
    }

    triggerChange = (value: string[]) => {
        this.props.onChange!(value);
    }

    render() {
        const { inputVisible, inputValue, editIndex } = this.state;
        const { value, newText, max = Infinity, tips } = this.props;
        const tags = value || [];

        return (
            <div className={styles.wrap}>
                <div className={styles.tags}>
                    {tags.map((tag, index) => {
                        const isLongTag = tag.length > 20;
                        if (index >= max) {
                            return null;
                        }
                        const tagElem = (
                            <Tag key={tag} className={styles.tag}>
                                <span className={styles.dot} style={{ borderColor: DEFAULT_COLORS[index % 5] }} />
                                {editIndex === index ? (
                                    <Input
                                        autoFocus
                                        className={styles.editInput}
                                        size="small"
                                        defaultValue={tag}
                                        onBlur={(e: any) => {
                                            this.handleEditTag(e.target.value, index);
                                        }}
                                        onPressEnter={(e: any) => {
                                            this.handleEditTag(e.target.value, index);
                                        }}
                                    />
                                ) : (
                                    <span
                                        className={styles.text}
                                        onClick={() => {
                                            this.startEditTag(index);
                                        }}
                                    >
                                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                    </span>
                                )}
                                <IconTagClose className={styles.close} onClick={() => this.handleClose(tag)} />
                            </Tag>
                        );
                        return isLongTag ? (
                            <Tooltip title={tag} key={tag}>
                                {tagElem}
                            </Tooltip>
                        ) : (
                            tagElem
                        );
                    })}
                    {tags.length < max && inputVisible && (
                        <Input
                            ref={this.saveInputRef}
                            type="text"
                            className={styles.input}
                            value={inputValue}
                            onChange={this.handleInputChange}
                            onBlur={this.handleInputConfirm}
                            onPressEnter={this.handleInputConfirm}
                        />
                    )}
                    {tags.length < max && !inputVisible && (
                        <Tag className={styles.new} onClick={this.showInput}>
                            <Icon type="plus" /> {newText || '新建'}
                        </Tag>
                    )}
                </div>
                {tips && <div className={styles.tips}>{tips}</div>}
            </div>
        );
    }
}
