import { Schema, model } from "mongoose";
import { connection } from "../config/connection.js";

const userSchema = new Schema(
    {
        username: { type: String, unique: true, required: true},
        email: { type: String, unique: true, required: true,
            validate: {

                //regex provided by EmailRegex.com because we aren't re-inventing the wheel here
                validator: function(d){
                    const pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
                    return pattern.test(d);
                },
                message: props => `${props.value} is not a valid email`
            }
        },
        thoughts: [
            { type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends: [
            { type: Schema.Types.ObjectId,
                ref: 'user'
             }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
)

//do trimming of the email field
userSchema.pre('save', function(next) {
    if(this.email) this.email.trim();
    next();
  });

//virtual friend count to return with query results
userSchema.virtual('friendCount').get(function(){
    return this.friends ? this.friends.length : 0
})

export const User = model('user', userSchema);
