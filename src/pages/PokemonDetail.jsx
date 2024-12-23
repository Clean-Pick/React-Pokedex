import { useLoaderData } from "react-router-dom";
import { useEffect, useRef } from "react";
import Sword from "../assets/icons/sword.png";
import Sparkles from "../assets/icons/sparkles.png";
import MagicShield from "../assets/icons/magic_shield.png";
import Wing from "../assets/icons/wing.png";
import Heart from "../assets/icons/heart.png";
import Shield from "../assets/icons/shield.png";
import "./PokemonDetail.css";

export default function PokemonDetail() {
  const pokemonData = useLoaderData();
  const audioRef = useRef(null);
  console.log(pokemonData);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  });

  return (
    <>
      <div className="container_PokemonDetail">
        <div className="header_PokemonDetail">
          <div className="profile">
            <h1>{pokemonData.name}</h1>
            <div className="card__PokemonDetail">
              <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
            </div>
            <audio ref={audioRef} controls>
              <source src={pokemonData.cries.latest} type="audio/ogg" />
              Your browser does not support the audio element.
            </audio>
          </div>
          <div className="stats">
            <div className="stats_top">
              {/* Attaque spécial */}
              <div className="attSp">
                <span className="imgContainer">
                  <img src={Sparkles} alt="" />
                </span>
                <p>{pokemonData.stats[3].base_stat} </p>
              </div>

              {/* Défense spécial */}
              <div className="defSp">
                <span className="imgContainer">
                  <img src={MagicShield} alt="" />
                </span>
                <p>{pokemonData.stats[4].base_stat} </p>
              </div>

              {/* Attaque */}
              <div className="att">
                <span className="imgContainer">
                  <img src={Sword} alt="" />
                </span>
                <p>{pokemonData.stats[1].base_stat} </p>
              </div>
            </div>

            <div className="stats_bottom">
              {/* HP */}
              <div className="hp">
                <span className="imgContainer">
                  <img src={Heart} alt="" />
                </span>
                <p>{pokemonData.stats[0].base_stat} </p>
              </div>

              {/* Vitesse */}
              <div className="speed">
                <span className="imgContainer">
                  <img src={Wing} alt="" />
                </span>
                <p>{pokemonData.stats[5].base_stat} </p>
              </div>

              {/* Défense */}
              <div className="def">
                <span className="imgContainer">
                  <img src={Shield} alt="" />
                </span>
                <p>{pokemonData.stats[2].base_stat} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
