import { Menu } from './../menu/menu';
import { OrderMenu } from './order_menu';
export class Cart{
    constructor(
        public id: string,
        public ordermenus: OrderMenu[],
        public customer_id: string,
        public name: string,
        public address: string,
        public phone: string,
        public delivery_tax: number,
        public cart_total: number,
        public status: string
    ){}
}