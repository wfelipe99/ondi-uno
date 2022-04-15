// @ts-nocheck
import type { BoardProps } from "boardgame.io/react";
import type { OndiUnoState } from "./Game";
import { Box, Grid, Img, VStack, HStack, GridItem } from "@chakra-ui/react";

export default function OndiUnoBoard({
  ctx,
  G,
  moves,
}: BoardProps<OndiUnoState>) {
  const renderCardsOfThisPlayer = () => {
    const elements = [];

    G.players["0"].map((card, i) => {
      let imgPath = "";
      if (card.color) imgPath = `cards/${card.color}_${card.number}.png`;
      else imgPath = `cards/wild_${card.wild}.png`;

      return elements.push(
        <Img key={i} src={process.env.PUBLIC_URL + imgPath} alt="Carta" />
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
        <Img
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
        <HStack spacing="-8" justify="center">
          {renderCardsOfThisPlayer()}
        </HStack>
      </GridItem>

      {/* Seat 3 */}
      <GridItem area="2 / 5 / 5 / 7">
        <VStack spacing="-40">{renderCardsOfOthersPlayers(3)}</VStack>
      </GridItem>

      {/* Deck */}
      <GridItem placeSelf="center" area="2 / 3 / 5 / 4">
        <Img
          src={process.env.PUBLIC_URL + "cards/card_back.png"}
          alt="BackCard"
        />
      </GridItem>

      {/* Discards */}
      <GridItem placeSelf="center" area="2 / 4 / 5 / 5">
        <Img
          src={process.env.PUBLIC_URL + "cards/card_back.png"}
          alt="BackCard"
        />
      </GridItem>
    </Grid>
  );
}
