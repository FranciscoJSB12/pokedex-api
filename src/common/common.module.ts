import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapter/axios.adapter';

//Muy importante estas configuraciones para usar el Axios adapter en otros módulos
@Module({
    providers: [AxiosAdapter],
    exports: [AxiosAdapter]
})
export class CommonModule {}
