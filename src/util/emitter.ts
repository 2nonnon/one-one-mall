import mitt from 'mitt';
interface Category {
    id: number
    parentId: number
    name: string
    children?: Array<Category>
}
type Events = {
    toLogin: boolean
    logined: void
    'category-change': Category[]
};

export const emitter = mitt<Events>()