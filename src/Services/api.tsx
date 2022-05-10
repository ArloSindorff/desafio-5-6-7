import axios from "axios";

export const FilmesGeneros = axios.create({
    baseURL: 'https://6268498401dab900f1cc17df.mockapi.io/',
    headers: {
        'Content-Type': 'application/json'
    }
})