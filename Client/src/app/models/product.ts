interface Price{
    value:Number ,
    currency:String
}

interface inventory{
    qty:Number 
}

export class Product{ 
    productId:Number
    name:String
    imageId:Number 
    brand :String 
    price:Price 
    inventory:inventory
    views:Number 
    category:String
    createdBy:Number  
    description:String
    createdAt:Date
    visible:Number
    constructor(
            productId:Number,
            name:String,
            imageId:Number , 
            brand :String ,
            price:Price ,
            inventory:inventory,
            views:Number ,
            category:String,
            createdBy:Number,
            description:String  ,
            createdAt:Date  ,
            visible:Number          
        ){
            this.productId=productId
            this.name=name
            this.imageId=imageId
            this.brand=brand
            this.price=price
            this.inventory=inventory
            this.views=views
            this.category=category
            this.createdBy=createdBy
            this.description=description
            this.createdAt =createdAt
            this.visible=visible
        }

        
    }

