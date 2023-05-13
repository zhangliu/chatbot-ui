import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.css';

let el: any;

class Prompt extends React.Component {
    static show(title = '请输入', options = {}): Promise<string> {
        const {
            defaultValue = '',
            confirmText = '确定',
            cancelText = '取消',
        } = (options || {}) as any;
        if (el) return Promise.resolve('');

        el = document.createElement('div');
        document.body.appendChild(el);

        return new Promise(resolve => {

            function handleConfirm(value: string) {
                removePrompt();
                resolve(value);
            }

            function handleCancel() {
                removePrompt();
                resolve('');
            }

            function removePrompt() {
                ReactDOM.unmountComponentAtNode(el);
                document.body.removeChild(el);
                el = null;
            }

            ReactDOM.render(
                <PromptBox
                    title={title}
                    defaultValue={defaultValue}
                    confirmText={confirmText}
                    cancelText={cancelText}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />,
                el
            );
        })
    }

    render() {
        return null;
    }
}

function PromptBox(props: any) {
    const [value, setValue] = useState(props.defaultValue);

    function handleChange(event: any) {
        setValue(event.target.value);
    }

    function handleConfirm() {
        props.onConfirm(value);
    }

    function handleCancel() {
        props.onCancel();
    }

    return (
        <div className={styles['prompt-box']}>
            <div className={styles['prompt-title']}>{props.title}</div>
            <div className={styles['prompt-content']}>
                <input type="text" value={value} onChange={handleChange} />
            </div>
            <div className={styles['prompt-buttons']}>
                <button onClick={handleCancel}>{props.cancelText}</button>
                <button onClick={handleConfirm}>{props.confirmText}</button>
            </div>
        </div>
    );
}

export default Prompt;