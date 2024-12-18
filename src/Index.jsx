import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";

export default function Index() {
  const detailData = useLoaderData();

  const [search, setSearch] = useState(""); // État pour la barre de recherche

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase()); // Met à jour la saisie
  };

  const filteredPokemon = (data) => {
    // Si la barre de recherche est vide, retourner tous les Pokémon
    if (!search.trim()) {
      return data;
    }
    // Sinon, filtrer par nom
    return data.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search)
    );
  };

  return (
    <div>
      <h1>Home page</h1>
      <input
        type="text"
        placeholder="Rechercher un Pokémon..."
        value={search}
        onChange={handleSearch}
      />
      <div className="pokemon-container">
          {filteredPokemon(detailData).map((pokemon) => (
            <div key={pokemon.name} className="card">
              <Link to={`/${pokemon.name}`} className="pokemon-link">
                <img src={pokemon.sprite} alt={pokemon.name} />
                <p>{pokemon.name}</p>
              </Link>
            </div>
          ))}
        </div>
    </div>
  );
}
