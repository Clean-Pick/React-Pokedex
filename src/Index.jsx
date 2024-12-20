import { useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import Card from "./components/card/Card";

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
  }, [detailData]);

  const handleSearch = (event) => {
      setSearch(event.target.value.toLowerCase()); // Met à jour la saisie
  };

  const handleFavoriteChange = (id) => {
      setDetailData((detailData) =>
          detailData.map((pokemon) =>
              pokemon.id === id ? {
                      ...pokemon,
                      favorite: pokemon.favorite ? false : true
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

  const typeColors = {
    1: "#A8A77A",
    2: "#C22E28",
    3: "#A98FF3",
    4: "#A33EA1",
    5: "#E2BF65",
    6: "#B6A136",
    7: "#A6B91A",
    8: "#735797",
    9: "#B7B7CE",
    10: "#EE8130",
    11: "#6390F0",
    12: "#7AC74C",
    13: "#F7D02C",
    14: "#F95587",
    15: "#96D9D6",
    16: "#6F35FC",
    17: "#705746",
    18: "#D685AD",
    19: "#FFD700", // Ajout fictif pour "stellar"
    20: "#68A090"  // Unknown (10001)
  };
  
  const typeColorsDark = {
    1: "#8A8A62",
    2: "#9E241E",
    3: "#8572C3",
    4: "#812E80",
    5: "#B99A52",
    6: "#938224",
    7: "#889015",
    8: "#5A466E",
    9: "#9292A5",
    10: "#C56729",
    11: "#4E72C0",
    12: "#629C3B",
    13: "#C5A623",
    14: "#C03F6A",
    15: "#78ADA9",
    16: "#562CBB",
    17: "#584435",
    18: "#AC6B87",
    19: "#CCAC00",  // Sombre pour "stellar"
    20: "#517273"  // Unknown (10001)
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
      {/*Section et Div sont nécessaires pour encastrer les résultats dans une grille de 6 résultats par row,*/}
      {/*modifiable dans App.css. Si vous trouve zune autre méthode , n'hésitez pas !*/}
      <section className="listContainer">
          <div className="itemsContainer">
              {filteredPokemon(detailData).slice(0, visibleItems).map((pokemon) => (
                <div key={pokemon.name} className="card">
                  <input 
                    type="checkbox" 
                    id={pokemon.id}
                    checked={pokemon.favorite}
                    onChange={() => handleFavoriteChange(pokemon.id)}
                  />
                  <Link to={`/${pokemon.name}`} className="pokemon-link">
                    <Card
                        name={pokemon.name}
                        attSp={pokemon.specialAttack}
                        defSp={pokemon.specialDefense}
                        sprite={pokemon.sprite}
                        type1={pokemon.type1}
                        type2={pokemon.type2}
                        att={pokemon.attack}
                        speed={pokemon.speed}
                        health={pokemon.healthPoint}
                        def={pokemon.defense}
                        id={pokemon.id}
                        color_type1={typeColors[pokemon.type1Id]}
                        color_type2={typeColors[pokemon.type2Id]}
                        top_color={typeColorsDark[pokemon.type1Id]}
                        bot_color={typeColorsDark[pokemon.type2Id]}
                    />
                  </Link>
                </div>
              ))}
          </div>
      </section>
    </div>
  );
}
