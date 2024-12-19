import { useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";

export default function Index() {
  const LSKEY = "allPokemon";

  const loadedData = useLoaderData();

  const [detailData, setDetailData] = useState(() => {
    const saveDatailData = window.localStorage.getItem(LSKEY);
    return saveDatailData ? JSON.parse(saveDatailData) : loadedData;
  });

  const [search, setSearch] = useState(""); // État pour la barre de recherche

  const [visibleItems, setVisibleItems] = useState(18);

  useEffect(() => {
    window.localStorage.setItem(LSKEY, JSON.stringify(detailData));
  },[detailData]);

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase()); // Met à jour la saisie
  };

  const handleFavoriteChange = (id) => {
    setDetailData((detailData) => 
      detailData.map((pokemon) => 
        pokemon.id === id ? {
          ...pokemon,
          favorite : pokemon.favorite ? false : true
        }
        : pokemon
      )
    )
  }

  const filteredPokemon = (data) => {
    // Filtrer les Pokémon en fonction de la barre de recherche
    let filtered = data;
  
    if (search.trim()) {
      filtered = data.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search)
      );
    }
  
    // Trier les Pokémon : les favoris en premier
    return filtered.sort((a, b) => {
      if (a.favorite && !b.favorite) return -1; // `a` est favori, mais pas `b`
      if (!a.favorite && b.favorite) return 1;  // `b` est favori, mais pas `a`

      // Si les deux ont le même statut, les trier par leur `id`
      return a.id - b.id;
    });
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight - 100
    ) {
      setVisibleItems((prev) => prev + 18);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
          {filteredPokemon(detailData).slice(0, visibleItems).map((pokemon) => (
            <div key={pokemon.name} className="card">
              <input 
                type="checkbox" 
                id={pokemon.id}
                checked={pokemon.favorite}
                onChange={() => handleFavoriteChange(pokemon.id)}
              />
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
