import mongoose from 'mongoose'

const reviewSchema=mongoose.Schema(
    {
        name:{type:String,required:true},
        rating:{type:Number,required:true},
        comment:{type:String,required:true},
    },
    {
        timestamps:true
    }
)

const RecipeSchema =mongoose.Schema(
    {
        user:
        {type:mongoose.Schema.Types.ObjectId,
        required:false,
        ref:'User'
        },
        name:{
            type:String,
            required:true
        },
        image:{
            type:String,
            required:true,
        },
        video:{
            type:String,
            required:false,
        },
        ingredients:{
            type:Array,
            required:false
        },
        quantity:{
            type:Number,
            required:true,
        },
        timeCook:{
            type:String,
        },
        timePrepare:{
            type:String,
            required:false,
            default:0
        },
        toShop:{
            type:Array,
            required:false,
            default:0
        },
        steps:{
            type:Array,
            required:true,
            default:0
        },
        description:{
            type:String,
            required:true,
            default:0
        },
        calories:{
            type:Number,
            required:false,
            default:0
        },
        Tip:{
            type:String,
            required:false,
            default:0
        },
        category:{
            type:String,
            required:true,
            default:0
        },

        review:[reviewSchema]
    },
    {
        timestamps:true
    }
)
const Recipe=mongoose.model('Recipe',RecipeSchema)
export default Recipe