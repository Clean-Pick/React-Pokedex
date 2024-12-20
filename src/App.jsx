import './reset.css'
import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Index from './Index';
import PokemonDetail from './pages/PokemonDetail';


const router = createBrowserRouter([
    {
    path: "/",
    element: <Index />,
    loader: async () => {
        const data = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2000')
        .then(response => response.json());

        const detailData = await Promise.all(
        data.results.map(async (result) => {
            const name = result.name;
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const pokemonData = await response.json();

            if(pokemonData.types.length === 1){
                const typeUrl = pokemonData.types[0].type.url;
                const idType = typeUrl.match(/\/(\d+)\//);

                return {
                    id : pokemonData.id,
                    name : pokemonData.name,
                    type1 : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/${idType[1]}.png`,
                    type2 : undefined,
                    sprite: pokemonData.sprites.front_default,
                    healthPoint : pokemonData.stats[0].base_stat,
                    attack : pokemonData.stats[1].base_stat,
                    defense : pokemonData.stats[2].base_stat,
                    specialAttack : pokemonData.stats[3].base_stat,
                    specialDefense : pokemonData.stats[4].base_stat,
                    speed : pokemonData.stats[5].base_stat,
                    favorite : false
                };
            } else {
                const typeUrl1 = pokemonData.types[0].type.url;
                const splitTypeURL1 = typeUrl1.split("/");
                const idType1 = splitTypeURL1[splitTypeURL1.length - 2];
                console.log(idType1);
                console.log(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/${idType1}.png`)

                const typeUrl2 = pokemonData.types[1].type.url;
                const idType2 = typeUrl2.match(/\/(\d+)\//);

                return {
                    id: pokemonData.id,
                    name: pokemonData.name,
                    type1: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/${idType1}.png`,
                    type2: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/${idType2[1]}.png`,
                    sprite: pokemonData.sprites.front_default,
                    healthPoint : pokemonData.stats[0].base_stat,
                    attack : pokemonData.stats[1].base_stat,
                    defense : pokemonData.stats[2].base_stat,
                    specialAttack : pokemonData.stats[3].base_stat,
                    specialDefense : pokemonData.stats[4].base_stat,
                    speed : pokemonData.stats[5].base_stat,
                    favorite : false
                };
            }
        })
        );

        // Tri des résultats par ID
        detailData.sort((a, b) => a.id - b.id);
        return detailData;
    }
    },
    {
        path: "/:name",
        element: <PokemonDetail/>,
        loader: ({params}) => {
            return fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
                .then((res) => res.json());
        }
    }
]);


function App() {

    return (
        <>
            <RouterProvider
                router={router}
                fallbackElement={<div>Chargement de l'application...</div>}
            />
        </>
    );
}

export default App;
