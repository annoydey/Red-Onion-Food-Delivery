import mongoose, {model, models, Schema} from "mongoose";

const MenuItemSchema = new Schema({
    name: {type:String, required:true},
    category: {type: mongoose.Types.ObjectId},
    price: {type: Number},
}, {timestamps: true});

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);
