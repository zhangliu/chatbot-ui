const ONE_DAY = 24 * 60 * 60;

export const ACTION_MAP = {
    NEED_LOGIN: 'NEED_LOGIN',
    ERROR_TOKEN: 'ERROR_TOKEN',
    NEED_LIMIT: 'NEED_LIMIT',
}

export const userTokenKey = 'gpt_user_token';

export const tryHandleLogin = (messages: any[]) => {
    const lastMsg = messages[messages.length - 1];
    if (!lastMsg) return false;
    if (lastMsg.role !== 'assistant') return;

    if (lastMsg.content === ACTION_MAP.NEED_LOGIN) {
        const message = '请输入您的令牌（若无，请加微信：zhangliu2 申请）';
        let userToken = prompt(message)?.trim() || '';
        while (!userToken) userToken = prompt(message, userToken)?.trim() || '';
        document.cookie = `${userTokenKey}=${userToken}; max-age=${ONE_DAY * 30}`;
        lastMsg.content = '好的，您已设置令牌，可以继续提问啦！';
        return;
    }

    if (lastMsg.content === ACTION_MAP.ERROR_TOKEN) {
        const message = '您的令牌错误，请加微信：zhangliu2 申请';
        let userToken = prompt(message)?.trim() || '';
        while (!userToken) userToken = prompt(message, userToken)?.trim() || '';
        document.cookie = `${userTokenKey}=${userToken}; max-age=${ONE_DAY * 30}`;
        lastMsg.content = '好的，您已设置令牌，可以继续提问啦！';
        return;
    }

    if (lastMsg.content === ACTION_MAP.NEED_LIMIT) {
        const message = '您的令牌错误已经失效，请加微信：zhangliu2 处理。';
        alert(message);
        return;
    }

    return;
}