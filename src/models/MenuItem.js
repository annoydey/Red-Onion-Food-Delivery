import {model, models, Schema} from "mongoose";

const MenuItemSchema = new Schema({
    name: {type:String, required:true},
    price: {type: Number},
}, {timestamps: true});

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);
