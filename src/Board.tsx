// @ts-nocheck
import type { BoardProps } from "boardgame.io/react";
import type { OndiUnoState } from "./Game";
import { Grid, Image, VStack, HStack, GridItem } from "@chakra-ui/react";
import MotionImage from "./MotionImage";
import { useRef, useState } from "react";

const discardCardAnimation = {
  discard: (i) => {
    // Número randômico entre 1 e 60
    const number = Math.floor(Math.random() * 45) + 1;
    const positiveOrNegative = Math.random() < 0.5 ? 1 : -1;

    const degree = number * positiveOrNegative;

    // TODO: tentar deixar a carta centralizada na tela sem uso de condicional
    const baseX = () => {
      if (window.innerWidth >= 1920) return 453;
      else if (window.innerWidth >= 1300) return 410;
      else if (window.innerWidth >= 1000) return 380;
    };

    const baseY = () => {
      if (window.innerHeight >= 900) return -373;
      else if (window.innerHeight >= 800) return -330;
      else if (window.innerHeight <= 600) return -160;
    };

    /**
     * i * 100 => Eu acho que o 100 está ligado ao tamanho da carta e ao spacing
     * Quanto maior o i (index), mais para a direita está a carta. Assim, quanto mais para
     * a direita, mais eu preciso retirar da coordenada x final desta carta
     *
     * */
    return {
      x: baseX() - i * 100,
      y: baseY(),
      // Rotate randomly beetwen -45° and 45°
      rotate: degree,
      transition: { duration: 0.6 },
    };
  },
  hover: {
    y: -50,
    transition: { duration: 0.25 },
  },
};

export default function OndiUnoBoard({
  ctx,
  G,
  moves,
}: BoardProps<OndiUnoState>) {
  const [discardThisCard, setDiscardThisCard] = useState("");
  const [discardedCards, setDiscardedCards] = useState([]);

  const discardCard = (e) => {
    e.target.style.zIndex = discardedCards.length;
    setDiscardThisCard(e.target.id);
    setDiscardedCards((oldArray) => [...oldArray, e.target.id]);
  };

  const renderCardsOfThisPlayer = () => {
    const elements = [];

    G.players["0"].map((card, i) => {
      let ImagePath = "";
      if (card.color) ImagePath = `cards/${card.color}_${card.number}.png`;
      else ImagePath = `cards/wild_${card.wild}.png`;

      return elements.push(
        // Height must be: height of card + height of animation on hover (182 + 100 = 282px)
        /*<MotionFlex
          id={`wrapper-card-${card.color ?? card.wild}-${
            card.number ?? "wild"
          }-${i}`}
          variants={discardCardAnimation}
          animate={
            discardThisCard ===
              `wrapper-card-${card.color ?? card.wild}-${
                card.number ?? "wild"
              }-${i}` && "discard"
          }
          key={i}
          align="flex-end"
          onClick={(e) => discardCard(e)}
          pb="4"
        >*/
        <MotionImage
          id={`card-${card.color ?? card.wild}-${card.number ?? "wild"}-${i}`}
          variants={discardCardAnimation}
          custom={i}
          whileHover={
            !discardedCards.includes(
              `card-${card.color ?? card.wild}-${card.number ?? "wild"}-${i}`
            ) && "hover"
          }
          animate={
            discardThisCard ===
              `card-${card.color ?? card.wild}-${card.number ?? "wild"}-${i}` &&
            "discard"
          }
          src={process.env.PUBLIC_URL + ImagePath}
          onClick={(e) => discardCard(e)}
          alt="Carta"
          key={i}
        />
        // </MotionFlex>
      );
    });

    return elements;
  };

  const renderCardsOfOthersPlayers = (seat: number) => {
    if (!G.publicPlayersInfo[seat]) return null;

    const totalOfCards = Object.values(G.publicPlayersInfo[seat])[1];

    const transformRotateValue = (seat: number) => {
      if (seat === 1) return 90;
      else if (seat === 2) return 180;
      else return -90;
    };

    const elements = [];

    elements.push(
      [...Array(totalOfCards)].map((a, i) => (
        <Image
          key={i}
          src={process.env.PUBLIC_URL + "cards/card_back.png"}
          transform={`rotate(${transformRotateValue(seat)}deg)`}
          alt="BackCard"
        />
      ))
    );

    return elements;
  };

  return (
    <Grid
      h="100vh"
      w="100vw"
      templateColumns="repeat(6, 1fr)"
      templateRows="repeat(5, 1fr)"
      bgColor="teal.400"
    >
      {/* Seat 2 */}
      <GridItem area="1 / 1 / 2 / 7">
        <HStack justify="center" spacing="-24">
          {renderCardsOfOthersPlayers(2)}
        </HStack>
      </GridItem>

      {/* Seat 1 */}
      <GridItem area="2 / 1 / 5 / 3">
        <VStack spacing="-40">{renderCardsOfOthersPlayers(1)}</VStack>
      </GridItem>

      {/* Seat 0 - The player */}
      <GridItem area="5 / 1 / 6 / 7">
        <HStack position="relative" spacing="-8" justify="center">
          {renderCardsOfThisPlayer()}
        </HStack>
      </GridItem>

      {/* Seat 3 */}
      <GridItem area="2 / 5 / 5 / 7">
        <VStack spacing="-40">{renderCardsOfOthersPlayers(3)}</VStack>
      </GridItem>

      {/* Deck */}
      <GridItem placeSelf="center" area="2 / 3 / 5 / 4">
        <Image
          src={process.env.PUBLIC_URL + "cards/card_back.png"}
          alt="BackCard"
        />
      </GridItem>

      {/* Discards */}
      {/* <GridItem placeSelf="center" area="2 / 4 / 5 / 5">
        <Image
          src={process.env.PUBLIC_URL + "cards/card_back.png"}
          alt="BackCard"
        />
      </GridItem> */}
    </Grid>
  );
}
