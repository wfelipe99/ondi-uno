// @ts-nocheck
// TODO: remove @ts-nocheck
import type { BoardProps } from "boardgame.io/react";
import type { OndiUnoState } from "./Game";
import { Grid, Image, VStack, HStack, GridItem, Box } from "@chakra-ui/react";
import MotionImage from "./MotionImage";
import { useRef, useState } from "react";

export default function OndiUnoBoard({
  ctx,
  G,
  moves,
}: BoardProps<OndiUnoState>) {
  const [discardThisCard, setDiscardThisCard] = useState("");
  const [discardedCards, setDiscardedCards] = useState([]);
  const discardPlaceRef = useRef(null);
  const cardsRef = useRef([]);

  const cardAnimations = (cardId: number) => {
    const upLengthOnHover = 50;

    return {
      discard: (i) => {
        const number = Math.floor(Math.random() * 45) + 1;
        const positiveOrNegative = Math.random() < 0.5 ? 1 : -1;

        const degree = number * positiveOrNegative;

        const discardPlaceOffset =
          discardPlaceRef.current.getBoundingClientRect();
        const discardedCardOffset =
          cardsRef.current[cardId].getBoundingClientRect();

        // Hover effect is only in cards of this player
        const onHoverCompensationLength =
          discardThisCard === `card-${cardId}` ? 0 : upLengthOnHover;

        return {
          x: discardPlaceOffset.x - discardedCardOffset.x,
          // The mathematical logic for distance for y-axis is inverted from x-axis.
          // From top to bottom, it's positive. From bottom to top is negative.
          y:
            discardPlaceOffset.y -
            discardedCardOffset.y -
            onHoverCompensationLength,
          rotate: degree,
          transition: { duration: 0.6 },
        };
      },
      hover: {
        y: -upLengthOnHover,
        transition: { duration: 0.25 },
      },
    };
  };

  const discardCard = (e) => {
    if (discardedCards.includes(e.target.id)) return false;

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
        <MotionImage
          id={`card-${card.color ?? card.wild}-${card.number ?? "wild"}-${i}`}
          variants={cardAnimations(i)}
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
          ref={(el) => (cardsRef.current[i] = el)}
          onClick={(e) => discardCard(e)}
          alt="Carta"
          key={i}
        />
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
        <MotionImage
          variants={cardAnimations(i)}
          animate={discardThisCard === `card-${i + seat * 10}` && "discard"}
          key={i}
          ref={(el) => (cardsRef.current[i + seat * 10] = el)}
          id={`card-${i + seat * 10}`}
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
        <HStack mb="4" spacing="-8" justify="center">
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
      <GridItem placeSelf="center" area="2 / 4 / 5 / 5">
        <Box minW="130" minH="182" ref={discardPlaceRef}></Box>
      </GridItem>
    </Grid>
  );
}
