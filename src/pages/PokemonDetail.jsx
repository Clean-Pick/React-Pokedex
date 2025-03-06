import { useLoaderData } from "react-router-dom";

export default function PokemonDetail(){
    const pokemonData = useLoaderData();
    console.log(pokemonData);
}