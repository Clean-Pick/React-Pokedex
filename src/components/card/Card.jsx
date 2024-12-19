import "./Card.css"
import Sprite from "./temp/1.png"
import Sword from "../../assets/icons/sword.png"
import Sparkles from "../../assets/icons/sparkles.png"
import MagicShield from "../../assets/icons/magic_shield.png"
import Wing from "../../assets/icons/wing.png"
import Heart from "../../assets/icons/heart.png"
import Shield from "../../assets/icons/shield.png"

export default function Card({name, attSp, defSp, type1, type2, att, speed, health, def, id}) {

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
                    <img src={Sprite} alt=""/>
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
        </>
    )
}
