import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document {
    @Prop({
        unique: true,
        index: true
        /*El indice sabe específicamente donde está el 
        elemento que estás buscando*/
    })
    name: string;

    @Prop({
        unique: true,
        index: true
    })
    nro: number;
}

/*Exportamos un schema, es el que le dice a la base 
de datos estas son  las definiciones, reglas, columnas que quiero que uses*/

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
