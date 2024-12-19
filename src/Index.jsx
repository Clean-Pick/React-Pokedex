Clean
cleanpick
Oui.
Howlnes, Le Petit Noob

Howlnes — Aujourd’hui à 16:01
Okay je vois x)
Le Petit Noob — Aujourd’hui à 16:01
je sais pas le pourquoi du comment mais il dit qu'il n'arrive pas à fetch
Clean — Aujourd’hui à 16:01
on trouvera bien une solution plus tard
Le Petit Noob — Aujourd’hui à 16:01
yep
Benjamin
Clean — Aujourd’hui à 16:02
j'ai fait de la merde ?
Le Petit Noob — Aujourd’hui à 16:02
je vais vite fais pull les nouveautés de dev sur la branch card
comme ça je peux un peu toucher au code avec toutes les features
pour être sur que ça fonctionne bien
Clean — Aujourd’hui à 16:03
Haw, ok sans souci. bon courage pour le merge cependant
Le Petit Noob — Aujourd’hui à 16:03
je croise les doigts pour que ça se fasse facilement xd
Clean — Aujourd’hui à 16:03
je te le souhaite :')
(j'ai vu viteuf qu'entre card et dev y'avait genre 1200 changements)
Le Petit Noob — Aujourd’hui à 16:03
spoiler alert : "cant automatically merge" xd
Clean — Aujourd’hui à 16:04
courage :')
Le Petit Noob — Aujourd’hui à 16:05
j'ai merge
je check si j'ai pas tout cassé xd
Clean — Aujourd’hui à 16:05
:')
Le Petit Noob — Aujourd’hui à 16:06
merde
j'ai fait une mauvaise manip xd
tranquille je vais corriger ça
Clean — Aujourd’hui à 16:07
C'tout cassé ?
Le Petit Noob — Aujourd’hui à 16:13
alors c cassé mais c'est bizarre
Clean — Aujourd’hui à 16:13
Ah ?
Le Petit Noob — Aujourd’hui à 16:13
Image
je ne retrouve pas temp dans les dossiers
c'est bizarre car je n'ai pas supprimé le dossier temp normalement 
Clean — Aujourd’hui à 16:15
Ah j'ai ptet oublié de les ajouter dans le git add, Mais c'était juste pour utiliser un sprite de Test donc rien de grave, faut juste utiliser les sprites de l'api.

Je t'envoie le dossier pour régler ça le temps que tu voies comment faire
Type de fichier joint : archive
temp.rar
32.31 KB
désoléééé
Le Petit Noob — Aujourd’hui à 16:15
tu peux le push rapidement sur card ?
Clean — Aujourd’hui à 16:15
ok
Le Petit Noob — Aujourd’hui à 16:16
nickel
Clean — Aujourd’hui à 16:16
il est voué à être supprimé ;)
Le Petit Noob — Aujourd’hui à 16:16
oui oui je sais mais c'est j'ai besoin de run au départ pour être sur que j'ai rien cassé xd
Clean — Aujourd’hui à 16:18
il veut pas, je vais le faire manuellement je pense
Le Petit Noob — Aujourd’hui à 16:18
c'est pas grave en vrai
je vais juste supprimer la ligne et tester sans le sprite
Clean — Aujourd’hui à 16:19
c'est bon
ah merde
x)
Ça a été push juste avant que je voie tes msg
Le Petit Noob — Aujourd’hui à 16:32
c'est bon !
Image
Clean — Aujourd’hui à 16:33
Niquel, j'irai voir comment tu as fait quand je reprendrai le module, merci !
Le Petit Noob — Aujourd’hui à 16:33
en gros j'ai tout mis dans index
vu que c'est dans un index que je recup les données
index.jsx
Clean — Aujourd’hui à 16:34
Oui, bien évidemment
Nan, comme ça je vois pas, mais tkt j'irai voir x)
Le Petit Noob — Aujourd’hui à 16:36
j'arrive pas à push xd
Clean — Aujourd’hui à 16:37
Ah merde
Le Petit Noob — Aujourd’hui à 16:39
euh j'ai besoin de toi du coup xd
je vais te passer du code a copier/coller dans index.jsx
et tu vas push pour moi xd
Clean — Aujourd’hui à 16:41
ok :')
Le Petit Noob — Aujourd’hui à 16:41
tu veux qu'on s'appelle rapidement ?
Clean — Aujourd’hui à 16:42
je peux pas trop je t'avoue, bien mal au crâne + vomito, dès que j'aurai réussi je retourne m'allonger :')
Le Petit Noob — Aujourd’hui à 16:42
ok pas de soucis
Clean — Aujourd’hui à 16:42
désolé
je suis prêt à copier
Le Petit Noob — Aujourd’hui à 16:43
dans index.jsx :
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
      {/*Section et Div sont nécessaires pour encastrer les résultats dans une grille de 6 résultats par row,*/}
      {/*modifiable dans App.css. Si vous trouve zune autre méthode , n'hésitez pas !*/}
      <section className="listContainer">
          <div className="itemsContainer">

              {/*Boucle/data à insérer ici.*/}
              {filteredPokemon(detailData).slice(0, visibleItems).map((pokemon) => (
                <div key={pokemon.name} className="card">
                  <input 
                    type="checkbox" 
                    id={pokemon.id}
                    checked={pokemon.favorite}
                    onChange={() => handleFavoriteChange(pokemon.id)}
                  />
                  <Link to={`/${pokemon.name}`} className="pokemon-link">
                    {/* <img src={pokemon.sprite} alt={pokemon.name} />
                    <p>{pokemon.name}</p> */}
... (21lignes restantes)
Réduire
message.txt
4 Ko
dans Card.jsx :
import "./Card.css"
// import Sprite from "./temp/1.png"
import Sword from "../../assets/icons/sword.png"
import Sparkles from "../../assets/icons/sparkles.png"
import MagicShield from "../../assets/icons/magic_shield.png"
import Wing from "../../assets/icons/wing.png"
import Heart from "../../assets/icons/heart.png"
import Shield from "../../assets/icons/shield.png"

export default function Card({name, attSp, defSp, sprite, type1, type2, att, speed, health, def, id}) {

    /* Ce qu'il reste à faire :
        -Adapter la background image de .card__container en fonction du type principal du pokémon (j'ai mis les backgrounds dans src/assets/types/bg)
        -Adapter les couleurs de .card__topSection__container et de .card__botSection__container selon le background (vert foncé avec le type bug/grass etc...)
        -Adapter l'icône des types (.card__topSection__container__types) en fonction du/des type/s du pokémon (les icones sont dans src/assets/types/icons, utiliser les SVG de préférence.)
        -Importer et Appliquer la police Nunito au projet.
        -Utiliser le module pour l'affichage du fetch à l'API
        
    */
    return (
        <>
            <div className="card__container">
                <div className="card__topSection__container">
                    <div className="card__topSection__container__name">
                        <h4>{name}</h4>
                    </div>
                    <div className="card__topSection__container__attSp">

                        <span className="imgContainer">
                            <img src={Sparkles} alt=""/>
                        </span>
                        <p>{attSp}</p>

                    </div>
                    <div className="card__topSection__container__types">
                        <span>{type1}</span>
                        <span>{type2}</span>
                    </div>
                    <div className="card__topSection__container__defSp">

                        <span className="imgContainer">
                          <img src={MagicShield} alt=""/>
                        </span>
                        <p>{defSp}</p>

                    </div>
                </div>

                <div className="card__spriteContainer">
                    <img src={sprite} alt="Sprite"/>
                </div>

                <div className="card__botSection__container">
                    <div className="card__botSection__container__offensiveStats">
                        <div className="card__botSection__container__offensiveStats__att">

                            <span className="imgContainer">
                                <img src={Sword} alt=""/>
                            </span>
                            <p>{att}</p>

                        </div>

                        <div className="card__botSection__container__offensiveStats__speed">

                            <span className="imgContainer">
                                <img src={Wing} alt=""/>
                            </span>
                            <p>{speed}</p>

                        </div>
                    </div>
                    <div className="card__botSection__container__defensiveStats">
                        <div className="card__botSection__container__defensiveStats__health">

                            <span className="imgContainer">
                                <img src={Heart} alt=""/>
                            </span>
                            <p>{health}</p>

                        </div>

                        <div className="card__botSection__container__defensiveStats__def">
                            <span className="imgContainer">

                                <img src={Shield} alt=""/>
                            </span>
                            <p>{def}</p>

                        </div>

                    </div>

                    <div className="card__botSection__container__id">
                        <p>#{id}</p>
                    </div>
                </div>


            </div>
... (4lignes restantes)
Réduire
message.txt
5 Ko
voilà normalement tu pourras push ça sans trop de soucis
Clean — Aujourd’hui à 16:44
je vérifie que ça fonctionne bien pour moi
Le Petit Noob — Aujourd’hui à 16:44
okok t'as raison
Clean — Aujourd’hui à 16:45
Image
Yep, faut juste que je vire jean-pierre
Le Petit Noob — Aujourd’hui à 16:45
il suffit de supprimer Card dans App
et ça devrait être bon
Howlnes — Aujourd’hui à 16:46
C'est pas encore sur dev ça?
Clean — Aujourd’hui à 16:46
yep, c'est parti et fonctionnel
nope
Le Petit Noob — Aujourd’hui à 16:46
nickel
je vais push card sur dev
Clean — Aujourd’hui à 16:46
Ah tiens
je peux pas scroll
Image
j'ai pas de scrollbar
je vais push ça sur Card pardon
Le Petit Noob — Aujourd’hui à 16:47
ah c'est bizarre
Clean — Aujourd’hui à 16:48
Image
Le Petit Noob — Aujourd’hui à 16:48
olala la galère xd
Clean — Aujourd’hui à 16:49
:')
je tente le merge ?
Le Petit Noob — Aujourd’hui à 16:49
vas-y
Clean — Aujourd’hui à 16:49
allez
j'vais y aller manuellement
x)
Le Petit Noob — Aujourd’hui à 16:55
si ça marche pas c'est pas grave
je le ferai manuellement demain matin
Clean — Aujourd’hui à 16:55
tkt je suis en train de 'men charger
Le Petit Noob — Aujourd’hui à 16:55
te casse pas trop la tête vu que t'es malade
Clean — Aujourd’hui à 16:56
normalement c'est ok là
j'suis un connard je l'ai fait sur dev
Howlnes — Aujourd’hui à 16:58
CONNARD
x)
Clean — Aujourd’hui à 16:58
ENCULE VA
﻿
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
      {/*Section et Div sont nécessaires pour encastrer les résultats dans une grille de 6 résultats par row,*/}
      {/*modifiable dans App.css. Si vous trouve zune autre méthode , n'hésitez pas !*/}
      <section className="listContainer">
          <div className="itemsContainer">

              {/*Boucle/data à insérer ici.*/}
              {filteredPokemon(detailData).slice(0, visibleItems).map((pokemon) => (
                <div key={pokemon.name} className="card">
                  <input 
                    type="checkbox" 
                    id={pokemon.id}
                    checked={pokemon.favorite}
                    onChange={() => handleFavoriteChange(pokemon.id)}
                  />
                  <Link to={`/${pokemon.name}`} className="pokemon-link">
                    {/* <img src={pokemon.sprite} alt={pokemon.name} />
                    <p>{pokemon.name}</p> */}
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
                    />
                  </Link>
                </div>
              ))}
          </div>
      </section>
    </div>
  );
}
