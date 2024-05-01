# Ejecutar en desarrollo

1. Clonar repositorio
2. Ejecutar

```
npm install
```

3. Tener Nest CLI instalado

```
npm i -g @nestjs/cli
```

4. Levantar la base de datos

```
docker compose up -d
```

5. Clonar el archivo `.env.template` y renombrar la copia a `.env`

6. Llenar las variables de entorno definidas en el archivo `.env`

7. Arrancar el servidor en modo de desarrollo con el comando

```
npm run start:dev
```

8. Reconstruir la base de datos con la semilla

```
http://localhost:3000/api/v1/seed/
```

# Production Build

1. Crear el archivo de `.env.prod`
2. Llenar las variables de entorno de producción
3. Crear la nueva image

```
sudo docker compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

# Levantar la imagen creada

```
docker compose -f docker-compose.prod.yaml --env-file .env.prod up -d
```

## Stack usado

- MongoDB
- Nest
