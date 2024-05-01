import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ){}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (err) {
      this.handleExceptions(err);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.pokemonModel.find().skip(offset).limit(limit).sort({ nro: 1}).select('-__v');
    //.sort({nro: 1}) te ordena la columna nro en forma ascedente
    //.select('-__v') le quita esa columna
  }

  async findOne(searchTerm: string) {
    let pokemon: Pokemon;

    if (!isNaN(+searchTerm)) pokemon = await this.pokemonModel.findOne({ nro: searchTerm});

    if (!pokemon && isValidObjectId(searchTerm)) pokemon = await this.pokemonModel.findById(searchTerm);

    if (!pokemon) pokemon = await this.pokemonModel.findOne({ name: searchTerm.toLowerCase().trim()});
    
    if (!pokemon) throw new NotFoundException(`Pokemon not found`);

    return pokemon;
  }

  async update(searchTerm: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(searchTerm);

    if (updatePokemonDto.name) updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    try {
      await pokemon.updateOne(updatePokemonDto, { new: true });
      // El new: true significa que va a devolver el nuevo objeto, por defecto da el viejo
  
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch(err) {
      this.handleExceptions(err);
    }
  }

  async remove(id: string) {
    /*Una forma
    const pokemon = await this.findOne(id);
    await pokemon.deleteOne();*/

    /*Otra forma
    const result = this.pokemonModel.findByIdAndDelete(id);
    */

    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if (deletedCount === 0) throw new BadRequestException(`Pokemon with id ${id} not found`);

    return {
      ok: true,
      message: "Item deleted successfully",
    };
  }

  private handleExceptions(err: any) {
    if (err.code === 11000) throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(err.keyValue)}`);

    console.log(err);

    throw new InternalServerErrorException(`Can't create pokemon - check server logs`);
  }
}
