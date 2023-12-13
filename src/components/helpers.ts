
export function formattedTime(timestamp: string) {

    const dateObj = new Date(timestamp);

    const formattedTime = dateObj.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    });

    return formattedTime;
}

export const sortedData = (data: any) => {
    return data.sort((a: any, b: any) => a.timestamp.localeCompare(b.timestamp));
}