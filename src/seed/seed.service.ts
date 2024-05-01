import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeAPIResponse } from './interfaces/poke-response.interfaces';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  async createSeed() {
    const { data } = await this.axios.get<PokeAPIResponse>('https://pokeapi.co/api/v2/pokemon?limit=650&offset=0');

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const nro = +segments[segments.length -2];
      console.log({ name, nro });
    });

    return data.results;
  }
}
