import random from 'random';
import { DEFAULT_LIST } from '../config/messageList';

export function getMessage(){
    let totleMessage=DEFAULT_LIST;
    const index=random.int(0,totleMessage.length-1);
    const message=totleMessage[index];
    return message;
}

