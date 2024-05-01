import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { SeedController } from './seed.controller';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [PokemonModule],
})
export class SeedModule {}
