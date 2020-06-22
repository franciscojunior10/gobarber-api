import express, { request, response } from 'express';

const app = express();

app.get('/', (request, response) => {
    return response.json({ message: 'okkk' });
})

app.listen((3333), () => {
    console.log(
        'Servidor Executando! ... http://localhost:3333'
    );
})