import { Product } from "../../components";
import css from "./style.module.scss";

export const Home = () => {
  const prods = [
    {
      id: 1,
      flavor: "фуа-гра",
      serving: 10,
      mouseCount: null,
      mouse: "мышь в подарок",
      weight: "0.5",
      disable: false,
      footer: "Печень утки разварная с артишоками.",
    },
    {
      id: 2,
      flavor: "рыбой",
      serving: 40,
      mouseCount: 2,
      mouse: "мыши в подарок",
      weight: "2",
      disable: false,
      footer: "Головы щучьи с чесноком да свежайшая сёмгушка.",
    },
    {
      id: 3,
      flavor: "курой",
      serving: 100,
      mouseCount: 5,
      mouse: "мышей в подарок заказчик доволен",
      weight: "5",
      disable: false,
      footer: "Филе из цыплят с трюфелями в бульоне.",
    },
  ];

  return (
    <div className={css.products}>
      <h1 className={css.products__title}>Ты сегодня покормил кота?</h1>
      <div className={css.product__cards}>
        {prods.map((prod) => (
          <Product key={prod.id} {...prod} />
        ))}
      </div>
    </div>
  );
};
