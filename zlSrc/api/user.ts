const baseUrl = 'https://vercel-zl-service-git-dev-zhangliu.vercel.app/api/gptUser';

export const getUserInfo = async (userId: string) => {
    if (!userId) return null;

    const res = await fetch(`${baseUrl}?userId=${userId}`, { headers: { 'x-zl-action': 'getUser' } });
    const data = await res.json();

    if (!data) return null;
    if (+data.code !== 0) return null;
    return data.data;
}

export const decreaseLimit = async (userId: string) => {
    if (!userId) throw new Error('No params: userId!');

    const res = await fetch(`${baseUrl}`, {
        method: 'put',
        headers: { 'x-zl-action': 'decreaseLimit', 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
    });
    const data = await res.json();
    if (+data.code !== 0) throw new Error(data.message)
}