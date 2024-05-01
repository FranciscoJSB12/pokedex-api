import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { SeedController } from './seed.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    PokemonModule, 
    CommonModule
  ],
})
export class SeedModule {}
