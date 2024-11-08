import { message } from 'antd';

export const Message = (type: "success" | "error" | "warning", msg: string) => {
    message.open({
        type: type,
        content: msg,
    });
}