import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Index from './Index';
import PokemonDetail from './pages/PokemonDetail';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    loader: () => {
      // Utilisation de `defer` pour indiquer que le loader retourne une promesse
      return fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10000')
        .then((res) => res.json());
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
