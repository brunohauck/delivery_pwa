import { Menu } from './../menu/menu';
export class OrderMenu{
    constructor(
        public menu: Menu,
        public menu_id: number,
        public quantity: number
    ){}
}