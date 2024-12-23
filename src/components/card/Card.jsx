import "./Card.css";
import Sword from "../../assets/icons/sword.png";
import Sparkles from "../../assets/icons/sparkles.png";
import MagicShield from "../../assets/icons/magic_shield.png";
import Wing from "../../assets/icons/wing.png";
import Heart from "../../assets/icons/heart.png";
import Shield from "../../assets/icons/shield.png";

export default function Card({ name, attSp, defSp, sprite, type1, type2, att, speed, health, def, id, color_type1, color_type2, top_color, bot_color }) {
  return (
    <>
      <div
        className="card__container"
        style={{
          background: `linear-gradient(-30deg, ${color_type2} 50%, ${color_type1} 50%)`,
        }}
      >
        <div className="card__topSection__container">
          <div className="card__topSection__container__name" style={{ backgroundColor: top_color }}>
            <h4>{name}</h4>
          </div>
          <div className="card__topSection__container__attSp" style={{ backgroundColor: top_color }}>
            <span className="imgContainer">
              <img src={Sparkles} alt="" />
            </span>
            <p>{attSp}</p>
          </div>
          <div className="card__topSection__container__types">
            <img src={type1} alt="" />
            <img src={type2} alt="" />
          </div>
          <div className="card__topSection__container__defSp" style={{ backgroundColor: top_color }}>
            <span className="imgContainer">
              <img src={MagicShield} alt="" />
            </span>
            <p>{defSp}</p>
          </div>
        </div>

        <div className="card__spriteContainer">
          <img src={sprite} alt="Sprite" />
        </div>

        <div className="card__botSection__container">
          <div className="card__botSection__container__offensiveStats" style={{ backgroundColor: bot_color }}>
            <div className="card__botSection__container__offensiveStats__att">
              <span className="imgContainer">
                <img src={Sword} alt="" />
              </span>
              <p>{att}</p>
            </div>

            <div className="card__botSection__container__offensiveStats__speed">
              <span className="imgContainer">
                <img src={Wing} alt="" />
              </span>
              <p>{speed}</p>
            </div>
          </div>
          <div className="card__botSection__container__defensiveStats" style={{ backgroundColor: bot_color }}>
            <div className="card__botSection__container__defensiveStats__health">
              <span className="imgContainer">
                <img src={Heart} alt="" />
              </span>
              <p>{health}</p>
            </div>

            <div className="card__botSection__container__defensiveStats__def">
              <span className="imgContainer">
                <img src={Shield} alt="" />
              </span>
              <p>{def}</p>
            </div>
          </div>

          <div className="card__botSection__container__id" style={{ backgroundColor: bot_color }}>
            <p>#{id}</p>
          </div>
        </div>
      </div>
    </>
  );
}
