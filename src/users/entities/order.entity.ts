import { User } from "./user.entity";
import { Product } from "../../products/entities/products.entity";

export class Order {
    data: Date;
    user: User;
    products: Product[];
}
