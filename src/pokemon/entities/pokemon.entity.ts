import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document {
    // Prop decorator to define a schema property
    @Prop({
        unique: true,
        index: true,
    })
    name: string;

    @Prop({
        unique: true,
        index: true,
    })
    no: number;
}


// Create the Mongoose schema based on the Pokemon class
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);