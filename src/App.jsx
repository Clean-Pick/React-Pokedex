import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Index from './Index';
import PokemonDetail from './pages/PokemonDetail';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    loader: async () => {
      const data = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000')
        .then(response => response.json());

      const detailData = await Promise.all(
        data.results.map(async (result) => {
          const name = result.name;
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
          const pokemonData = await response.json();

          if(pokemonData.types.length === 1){
            return {
              id : pokemonData.id,
              name : pokemonData.name,
              type1 : pokemonData.types[0].type.name,
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
            return {
              id: pokemonData.id,
              name: pokemonData.name,
              type1: pokemonData.types[0].type.name,
              type2: pokemonData.types[1].type.name,
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
    loader: ({ params }) => {
      return fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
        .then((res) => res.json());
    }
  }
]);

function App() {
  return <RouterProvider 
    router={router} 
    fallbackElement={<div>Chargement de l'application...</div>}
  />;  
}

export default App;
