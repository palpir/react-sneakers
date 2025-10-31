import { useState } from "react";
import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import { useEffect } from "react";

const Card = ({
  id,
  name,
  price,
  src,
  onFavorite,
  onPluss,
  favorited = false,
  added = false,
  loading,
}) => {
  const [plus, setPlus] = useState(added);
  const dataObj = { id, name, price, src, parentId: id };

  // Синхронизация состояния с пропсом при его изменении
  useEffect(() => {
    setPlus(added);
  }, [added]);

  const onClickPlus = () => {
    setPlus(!plus);
    onPluss(dataObj);
  };

  const [favorite, setFavorite] = useState(favorited);
  const onClickFavorite = (prev) => {
    setFavorite((prev) => !prev);
    onFavorite(dataObj);
  };

  return (
    <div className={styles.card}>
      {" "}
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={265}
          viewBox="0 0 150 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="125" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div
            className={styles.favorite}
            onClick={() => {
              onClickFavorite();
            }}
          >
            {onFavorite && (
              <img
                src={favorite ? "/img/liked.svg" : "/img/unliked.svg"}
                alt="unliked"
              />
            )}
          </div>
          <img width="100%" height={130} src={src} alt="Sneakers" />
          <h5>{name}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена</span>
              <b>{price}</b>
            </div>

            <div>
              {onPluss && (
                <img
                  className={styles.plus}
                  onClick={onClickPlus}
                  src={plus ? "/img/btnChecked.svg" : "/img/plus.svg"}
                  alt="plus"
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Card;
