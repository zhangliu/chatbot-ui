export const NOT_LOGIN_QUERY_LIMIT = 50;
export const LOGINED_QUERY_LIMIT = 100;

export const ACTION_MAP = {
    NEED_LOGIN: 'NEED_LOGIN'
}

export const phoneReg = /^1[3-9]\d{9}$/;
export const userCookieKey = 'gpt_userId';

export const tryHandleLogin = (messages: any[]) => {
    const lastMsg = messages[messages.length - 1];
    if (!lastMsg) return false;
    if (lastMsg.role !== 'assistant') return;
    if (lastMsg.content !== ACTION_MAP.NEED_LOGIN) return;
    
    const userIdCookie = document.cookie.split(';').map(item => item.trim()).find(item => item.startsWith(`${userCookieKey}=`));
    const userId = (userIdCookie || '').replace(/.*?=(.*)$/, '$1');
    if (phoneReg.test(userId)) return;

    let phone = prompt('您提问次数已经用完，输入您的手机号注册后，可以继续提问！')?.trim() || '';
    while(!phoneReg.test(phone)) phone = prompt('您输入的手机号码有误，请重新输入：', phone)?.trim() || '';
    
    document.cookie = `${userCookieKey}=${phone}`;
    lastMsg.content = '恭喜，您已注册成功，可以继续提问啦！';
}