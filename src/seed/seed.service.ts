import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeAPIResponse } from './interfaces/poke-response.interfaces';
import { AxiosAdapter } from 'src/common/adapter/axios.adapter';

@Injectable()
export class SeedService {
  
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter
  ){}

  async createSeed() {

    await this.pokemonModel.deleteMany({})
    //Cuidado con esta instrucción, elimina todo lo que hay en la colección

    const data = await this.http.get<PokeAPIResponse>('https://pokeapi.co/api/v2/pokemon?limit=650&offset=0');

    const pokemonsToInsert: { name: string, nro: number }[] = [];

    /*const insertPromiseArray = [];
    Data curioso: puedes llenar un arreglo de promesas

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const nro = +segments[segments.length -2];
      insertPromiseArray.push(
        this.pokemonModel.create({ name, nro})
      );
    });

    await Promise.all(insertPromiseArray);
    Ahora resuelves todas las promesas en tu arreglo
    */

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const nro = +segments[segments.length -2];
      pokemonsToInsert.push({ name, nro});
    });

    await this.pokemonModel.insertMany(pokemonsToInsert);

    return 'Seed executed';
  }
}
