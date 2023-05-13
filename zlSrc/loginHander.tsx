import Prompt from './components/Prompt';

const ONE_DAY = 24 * 60 * 60;

export const ACTION_MAP = {
    NEED_LOGIN: 'NEED_LOGIN',
    ERROR_TOKEN: 'ERROR_TOKEN',
    NEED_LIMIT: 'NEED_LIMIT',
}

export const userTokenKey = 'gpt_user_token';

export const tryHandleLogin = async (messages: any[]) => {
    const lastMsg = messages[messages.length - 1];
    if (!lastMsg) return false;
    if (lastMsg.role !== 'assistant') return;

    if (lastMsg.content === ACTION_MAP.NEED_LOGIN) {
        const message = '请输入您的令牌（若无，请加微信：zhangliu2 申请）';
        let userToken = (await Prompt.show(message)).trim() || '';
        if (!userToken) {
            lastMsg.content = '您未设置口令，无法使用该功能！';
            return;
        };
        document.cookie = `${userTokenKey}=${userToken}; max-age=${ONE_DAY * 30}`;
        lastMsg.content = '好的，您已设置令牌，可以继续提问啦！';
        return;
    }

    if (lastMsg.content === ACTION_MAP.ERROR_TOKEN) {
        const message = '您的令牌错误，请加微信：zhangliu2 申请';
        let userToken = (await Prompt.show(message))?.trim() || '';
        if (!userToken) {
            lastMsg.content = '您设置口令错误，无法使用该功能！';
            return;
        };
        document.cookie = `${userTokenKey}=${userToken}; max-age=${ONE_DAY * 30}`;
        lastMsg.content = '好的，您已设置令牌，可以继续提问啦！';
        return;
    }

    if (lastMsg.content === ACTION_MAP.NEED_LIMIT) {
        const message = '您的令牌错误已经失效，请加微信：zhangliu2 处理。';
        alert(message);
        return;
    }

    lastMsg.content = '';
    return;
}