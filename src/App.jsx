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
          
          return {
            id: pokemonData.id,
            name: pokemonData.name,
            type: pokemonData.types[0].type.name,
            sprite: pokemonData.sprites.front_default,
          };
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
