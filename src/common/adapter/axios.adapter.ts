import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from "../interfaces/http-adapter.interface";

//IMPORTANTE: este decorador es totalmente necesario para poder inyectarlo en el servicio
//Adicionalmente estos providers están a nivel de módulo, por que este Axios adapter hay 
//que exportarlo para que sea visible a los otros módulos
@Injectable()
export class AxiosAdapter implements HttpAdapter {

    private readonly axios: AxiosInstance = axios;

    async get<T>(url: string): Promise<T> {
        try {
            const { data } = await this.axios.get<T>(url);
            return data;
        } catch (err) {
            throw new Error("Something went wrong while fetching the data");
        }
    }
}