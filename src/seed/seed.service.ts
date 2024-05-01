import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios, { AxiosInstance } from 'axios';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeAPIResponse } from './interfaces/poke-response.interfaces';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ){}

  async createSeed() {

    await this.pokemonModel.deleteMany({})
    //Cuidado con esta instrucción, elimina todo lo que hay en la colección

    const { data } = await this.axios.get<PokeAPIResponse>('https://pokeapi.co/api/v2/pokemon?limit=650&offset=0');

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
