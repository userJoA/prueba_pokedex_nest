import { Injectable } from '@nestjs/common';

import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) { }
  
  async executeSeed() {
    // limpiar la coleccion
    await this.pokemonModel.deleteMany({});
    // traer los pokemons
    const data  = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=750');

    //const insertPromisesArray: Promise<any>[] = [];
    const pokemonToInsert: { name: string, no: number }[] = [];
    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
     // insertPromisesArray.push(
     //   this.pokemonModel.create({ name, no })
     // );
      pokemonToInsert.push({ name, no });
    })
    //await Promise.all(insertPromisesArray);
    await this.pokemonModel.insertMany(pokemonToInsert);
    return `Seed executed, ${data.results.length} pokemons created.`;
  }
}
