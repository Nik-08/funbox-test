import classNames from "classnames";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import css from "./style.module.scss";
import catImg from "../../assets/cat.png";

interface Props {
  flavor: string;
  serving: number;
  mouseCount: null | number;
  mouse: string;
  weight: string;
  disable: boolean;
  footer: string;
}

export const Product: FC<Props> = ({
  flavor,
  serving,
  mouseCount,
  mouse,
  weight,
  disable,
  footer,
}) => {
  const [activeState, setActiveState] = useState(false);
  const [leave, setLeave] = useState(false);
  const [enter, setEnter] = useState(false);

  const setActive = () => {
    if (!disable) {
      setActiveState((prev) => !prev);
    }
  };

  const ref = useRef<HTMLDivElement>(null);

  const setMouseLeave = useCallback(() => {
    if (
      null !== ref.current &&
      ref.current.classList.contains("card__body_active")
    ) {
      setLeave((prev) => !prev);
      setEnter(false);
    }
  }, []);

  const setMouseEnter = useCallback(() => {
    setEnter((prev) => !prev);
    setLeave(false);
  }, []);

  useEffect(() => {
    if (null !== ref.current) {
      ref.current.addEventListener("mouseleave", setMouseLeave);
    }

    return () => {
      if (null !== ref.current) {
        ref.current.removeEventListener("mouseleave", setMouseLeave);
      }
    };
  }, [leave]);

  useEffect(() => {
    if (null !== ref.current && leave === true) {
      ref.current.addEventListener("mouseenter", setMouseEnter);
    }

    return () => {
      if (null !== ref.current) {
        ref.current.removeEventListener("mouseenter", setMouseEnter);
      }
    };
  }, [leave]);

  return (
    <div
      className={classNames(css.product__card, css.card, {
        [css.product__card_disabled]: disable,
        [css.product__card_active]: activeState,
      })}
    >
      <div
        className={classNames(css.card__body, {
          [css.card__body_disabled]: disable,
          card__body_active: activeState,
        })}
        onClick={setActive}
        ref={ref}
      >
        <div className={css.card__header}>
          {enter ? (
            <h4
              className={classNames(css.card__title_small, {
                [css.card__title_active]: enter,
              })}
            >
              Котэ не одобряет?
            </h4>
          ) : (
            <h4 className={css.card__title_small}>Сказочное заморское яство</h4>
          )}

          <h2 className={css.card__name}>Нямушка</h2>
          <span className={css.card__favorit}>с {flavor}</span>
          <div className={css.card__description}>
            <span className={css.card__serving}>
              <b>{serving}</b> порцций
            </span>
            <span className={css.card__mouse}>
              <b>{mouseCount}</b> {mouse}
            </span>
          </div>
        </div>
        <img src={catImg} alt='' />
        <div
          className={classNames(css.card__weight, {
            [css.card__weight_disabled]: disable,
            [css.card__weight_active]: activeState,
          })}
        >
          {weight}
          <span className={css.card__weight_kilo}>кг</span>
        </div>
      </div>

      {disable ? (
        <div
          className={classNames(css.card__footer, {
            [css.card__footer_disabled]: disable,
          })}
        >
          Печалька, c {flavor} закончился
        </div>
      ) : activeState ? (
        <div
          className={classNames(css.card__footer, {
            [css.card__body_active]: activeState,
          })}
        >
          {footer}
        </div>
      ) : (
        <div className={css.card__footer}>
          Чего сидишь? Порадуй котэ,{" "}
          <span className={css._color} onClick={setActive}>
            <span className={css.card__link}>купи</span>.
          </span>
        </div>
      )}
    </div>
  );
};
