// @ts-nocheck
// TODO: remove @ts-nocheck
import type { BoardProps } from 'boardgame.io/react'
import type { OndiUnoState, UnoDeck } from './Game'
import { Grid, Image, VStack, HStack, GridItem, Box, Flex } from '@chakra-ui/react'
import MotionImage from './MotionImage'
import { useRef, useState } from 'react'

export default function OndiUnoBoard({ ctx, G, moves }: BoardProps<OndiUnoState>) {
  const [cardsOfThisPlayer, setCardsOfThisPlayer] = useState(G.players[Object.keys(G.players)[0]])
  const [discardThisCard, setDiscardThisCard] = useState('')
  const discardPlaceRef = useRef(null)
  const cardsRef = useRef([])
  const [cardToAnimate, setCardToAnimate] = useState<UnoDeck[]>([])

  const cardAnimations = (cardId: number) => {
    const upLengthOnHover = 50

    return {
      discard: (i) => {
        const number = Math.floor(Math.random() * 45) + 1
        const positiveOrNegative = Math.random() < 0.5 ? 1 : -1

        const degree = number * positiveOrNegative

        const discardPlaceOffset = discardPlaceRef.current.getBoundingClientRect()
        const discardedCardOffset = cardsRef.current[cardId].getBoundingClientRect()

        return {
          x: discardPlaceOffset.x - discardedCardOffset.x,
          // The mathematical logic for distance for y-axis is inverted from x-axis.
          // From top to bottom, it's positive. From bottom to top is negative.
          y: discardPlaceOffset.y - discardedCardOffset.y,
          rotate: degree,
          transition: { duration: 0.6 },
        }
      },
      hover: {
        y: -upLengthOnHover,
        transition: { duration: 0.25 },
      },
    }
  }

  const discardCard = (e) => {
    const id = e.target.id
    const type = e.target.dataset.type
    const number = e.target.dataset.number
    const card: UnoDeck = { id, type, number }

    if (G.discardedCards.cards.includes(card)) return false
    if (ctx.currentPlayer !== Object.keys(G.players)[0]) return false

    e.target.style.zIndex = G.discardedCards.total
    setDiscardThisCard(`shallow-${e.target.id}`)
    console.log(discardThisCard)
    moves.discardCard(card)
  }

  const renderCardsOfThisPlayer = () => {
    const elements = []
    const thisPlayer = G.players[Object.keys(G.players)[0]]

    thisPlayer.forEach((card, i) => {
      let ImagePath = ''
      if (card.number) ImagePath = `cards/${card.type}_${card.number}.png`
      else ImagePath = `cards/wild_${card.type}.png`

      elements.push(
        <MotionImage
          id={card.id}
          data-type={card.type}
          data-number={card.number}
          variants={cardAnimations(i)}
          custom={card.id}
          whileHover={
            !G.discardedCards.cards.includes({ type: card.type, number: card.number }) && 'hover'
          }
          src={process.env.PUBLIC_URL + ImagePath}
          onClick={(e) => discardCard(e)}
          alt="Carta"
          key={card.id}
        />
      )
    })

    return elements
  }

  const shallowRenderCardsOfThisPlayer = () => {
    const elements = []

    cardsOfThisPlayer.map((card, i) => {
      let ImagePath = ''
      if (card.number) ImagePath = `cards/${card.type}_${card.number}.png`
      else ImagePath = `cards/wild_${card.type}.png`

      return elements.push(
        <MotionImage
          id={`shallow-${card.id}`}
          // display={discardThisCard === `shallow-${card.id}` ? 'block' : 'none'}
          variants={cardAnimations(card.id)}
          custom={card.id}
          animate={discardThisCard === `shallow-${card.id}` && 'discard'}
          src={process.env.PUBLIC_URL + ImagePath}
          ref={(el) => (cardsRef.current[card.id] = el)}
          alt="Carta"
          key={card.id}
        />
      )
    })

    return elements
  }

  const renderCardsOfOthersPlayers = (seat: number) => {
    if (!G.publicPlayersInfo[seat]) return null

    const totalOfCards = Object.values(G.publicPlayersInfo[seat])[1]

    const transformRotateValue = (seat: number) => {
      if (seat === 1) return 90
      else if (seat === 2) return 180
      else return -90
    }

    const elements = []

    elements.push(
      [...Array(totalOfCards)].map((a, i) => (
        <MotionImage
          variants={cardAnimations(i)}
          animate={discardThisCard === `card-${i + seat * 10}` && 'discard'}
          key={i}
          ref={(el) => (cardsRef.current[i + seat * 10] = el)}
          id={`card-${i + seat * 10}`}
          src={process.env.PUBLIC_URL + 'cards/card_back.png'}
          transform={`rotate(${transformRotateValue(seat)}deg)`}
          alt="BackCard"
        />
      ))
    )

    return elements
  }

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
      <GridItem area="5 / 1 / 6 / 7" placeSelf="center">
        <Flex position="relative" mb="4">
          <Flex position="absolute" top="0" left="0">
            {renderCardsOfThisPlayer()}
          </Flex>
          <Flex>{shallowRenderCardsOfThisPlayer()}</Flex>
        </Flex>
      </GridItem>

      {/* Seat 3 */}
      <GridItem area="2 / 5 / 5 / 7">
        <VStack spacing="-40">{renderCardsOfOthersPlayers(3)}</VStack>
      </GridItem>

      {/* Deck */}
      <GridItem placeSelf="center" area="2 / 3 / 5 / 4">
        <Image src={process.env.PUBLIC_URL + 'cards/card_back.png'} alt="BackCard" />
      </GridItem>

      {/* Discards */}
      <GridItem placeSelf="center" area="2 / 4 / 5 / 5">
        <Box minW="130" minH="182" ref={discardPlaceRef}></Box>
      </GridItem>
    </Grid>
  )
}
