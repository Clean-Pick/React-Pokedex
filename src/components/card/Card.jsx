import "./Card.css"
import Sprite from "./temp/1.png"

export default function Card({name}, {attSp}) {

    return (
        <>
            <div className="card__container">
                <div className="card__topSection__container">
                    <div className="card__topSection__container__name">
                        <h4>{name}</h4>
                    </div>
                    <div className="card__topSection__container__attSp">
                    </div>
                    <div className="card__topSection__container__types">

                    </div>
                    <div className="card__topSection__container__defSp">

                    </div>
                </div>

                <div className="card__spriteContainer">
                    <img src={Sprite} alt=""/>
                </div>

                <div className="card__botSection__container">

                </div>


            </div>
        </>
    )
}