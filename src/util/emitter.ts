import mitt from 'mitt';

type Events = {
    toLogin: boolean
    logined: void
};

export const emitter = mitt<Events>()