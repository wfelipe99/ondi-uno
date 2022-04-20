import type { Game, Move } from 'boardgame.io'
import { INVALID_MOVE, PlayerView } from 'boardgame.io/core'
const Shuffle = require('shuffle')

export type UnoDeck = {
  id: string
  type: string
  number: string | undefined
}

const uno: UnoDeck[] = [
  { id: '1', type: 'red', number: '0' },
  { id: '2', type: 'red', number: '1' },
  { id: '3', type: 'red', number: '2' },
  { id: '4', type: 'red', number: '3' },
  { id: '5', type: 'red', number: '4' },
  { id: '6', type: 'red', number: '5' },
  { id: '7', type: 'red', number: '6' },
  { id: '8', type: 'red', number: '7' },
  { id: '9', type: 'red', number: '8' },
  { id: '10', type: 'red', number: '9' },
  { id: '11', type: 'red', number: '1' },
  { id: '12', type: 'red', number: '2' },
  { id: '13', type: 'red', number: '3' },
  { id: '14', type: 'red', number: '4' },
  { id: '15', type: 'red', number: '5' },
  { id: '16', type: 'red', number: '6' },
  { id: '17', type: 'red', number: '7' },
  { id: '18', type: 'red', number: '8' },
  { id: '19', type: 'red', number: '9' },
  { id: '20', type: 'red', number: 'skip' },
  { id: '21', type: 'red', number: 'skip' },
  { id: '22', type: 'red', number: 'reverse' },
  { id: '23', type: 'red', number: 'reverse' },
  { id: '24', type: 'red', number: 'picker' },
  { id: '25', type: 'red', number: 'picker' },
  { id: '26', type: 'pick_four', number: undefined },
  { id: '27', type: 'color_changer', number: undefined },

  { id: '28', type: 'yellow', number: '0' },
  { id: '29', type: 'yellow', number: '1' },
  { id: '30', type: 'yellow', number: '2' },
  { id: '31', type: 'yellow', number: '3' },
  { id: '32', type: 'yellow', number: '4' },
  { id: '33', type: 'yellow', number: '5' },
  { id: '34', type: 'yellow', number: '6' },
  { id: '35', type: 'yellow', number: '7' },
  { id: '36', type: 'yellow', number: '8' },
  { id: '37', type: 'yellow', number: '9' },
  { id: '38', type: 'yellow', number: '1' },
  { id: '39', type: 'yellow', number: '2' },
  { id: '40', type: 'yellow', number: '3' },
  { id: '41', type: 'yellow', number: '4' },
  { id: '42', type: 'yellow', number: '5' },
  { id: '43', type: 'yellow', number: '6' },
  { id: '44', type: 'yellow', number: '7' },
  { id: '45', type: 'yellow', number: '8' },
  { id: '46', type: 'yellow', number: '9' },
  { id: '47', type: 'yellow', number: 'skip' },
  { id: '48', type: 'yellow', number: 'skip' },
  { id: '49', type: 'yellow', number: 'reverse' },
  { id: '50', type: 'yellow', number: 'reverse' },
  { id: '51', type: 'yellow', number: 'picker' },
  { id: '52', type: 'yellow', number: 'picker' },
  { id: '53', type: 'pick_four', number: undefined },
  { id: '54', type: 'color_changer', number: undefined },

  { id: '55', type: 'green', number: '0' },
  { id: '56', type: 'green', number: '1' },
  { id: '57', type: 'green', number: '2' },
  { id: '58', type: 'green', number: '3' },
  { id: '59', type: 'green', number: '4' },
  { id: '60', type: 'green', number: '5' },
  { id: '61', type: 'green', number: '6' },
  { id: '62', type: 'green', number: '7' },
  { id: '63', type: 'green', number: '8' },
  { id: '64', type: 'green', number: '9' },
  { id: '65', type: 'green', number: '1' },
  { id: '66', type: 'green', number: '2' },
  { id: '67', type: 'green', number: '3' },
  { id: '68', type: 'green', number: '4' },
  { id: '69', type: 'green', number: '5' },
  { id: '70', type: 'green', number: '6' },
  { id: '71', type: 'green', number: '7' },
  { id: '72', type: 'green', number: '8' },
  { id: '73', type: 'green', number: '9' },
  { id: '74', type: 'green', number: 'skip' },
  { id: '75', type: 'green', number: 'skip' },
  { id: '76', type: 'green', number: 'reverse' },
  { id: '77', type: 'green', number: 'reverse' },
  { id: '78', type: 'green', number: 'picker' },
  { id: '79', type: 'green', number: 'picker' },
  { id: '80', type: 'pick_four', number: undefined },
  { id: '81', type: 'color_changer', number: undefined },

  { id: '82', type: 'blue', number: '0' },
  { id: '83', type: 'blue', number: '1' },
  { id: '84', type: 'blue', number: '2' },
  { id: '85', type: 'blue', number: '3' },
  { id: '86', type: 'blue', number: '4' },
  { id: '87', type: 'blue', number: '5' },
  { id: '88', type: 'blue', number: '6' },
  { id: '89', type: 'blue', number: '7' },
  { id: '90', type: 'blue', number: '8' },
  { id: '91', type: 'blue', number: '9' },
  { id: '92', type: 'blue', number: '1' },
  { id: '93', type: 'blue', number: '2' },
  { id: '94', type: 'blue', number: '3' },
  { id: '95', type: 'blue', number: '4' },
  { id: '96', type: 'blue', number: '5' },
  { id: '97', type: 'blue', number: '6' },
  { id: '98', type: 'blue', number: '7' },
  { id: '99', type: 'blue', number: '8' },
  { id: '100', type: 'blue', number: '9' },
  { id: '101', type: 'blue', number: 'skip' },
  { id: '102', type: 'blue', number: 'skip' },
  { id: '103', type: 'blue', number: 'reverse' },
  { id: '104', type: 'blue', number: 'reverse' },
  { id: '105', type: 'blue', number: 'picker' },
  { id: '106', type: 'blue', number: 'picker' },
  { id: '107', type: 'pick_four', number: undefined },
  { id: '108', type: 'color_changer', number: undefined },

  { id: '109', type: 'red', number: '0' },
  { id: '110', type: 'red', number: '1' },
  { id: '111', type: 'red', number: '2' },
  { id: '112', type: 'red', number: '3' },
  { id: '113', type: 'red', number: '4' },
  { id: '114', type: 'red', number: '5' },
  { id: '115', type: 'red', number: '6' },
  { id: '116', type: 'red', number: '7' },
  { id: '117', type: 'red', number: '8' },
  { id: '118', type: 'red', number: '9' },
  { id: '119', type: 'red', number: '1' },
  { id: '120', type: 'red', number: '2' },
  { id: '121', type: 'red', number: '3' },
  { id: '122', type: 'red', number: '4' },
  { id: '123', type: 'red', number: '5' },
  { id: '124', type: 'red', number: '6' },
  { id: '125', type: 'red', number: '7' },
  { id: '126', type: 'red', number: '8' },
  { id: '127', type: 'red', number: '9' },
  { id: '128', type: 'red', number: 'skip' },
  { id: '129', type: 'red', number: 'skip' },
  { id: '130', type: 'red', number: 'reverse' },
  { id: '131', type: 'red', number: 'reverse' },
  { id: '132', type: 'red', number: 'picker' },
  { id: '133', type: 'red', number: 'picker' },
  { id: '134', type: 'pick_four', number: undefined },
  { id: '135', type: 'color_changer', number: undefined },

  { id: '136', type: 'yellow', number: '0' },
  { id: '137', type: 'yellow', number: '1' },
  { id: '138', type: 'yellow', number: '2' },
  { id: '139', type: 'yellow', number: '3' },
  { id: '140', type: 'yellow', number: '4' },
  { id: '141', type: 'yellow', number: '5' },
  { id: '142', type: 'yellow', number: '6' },
  { id: '143', type: 'yellow', number: '7' },
  { id: '144', type: 'yellow', number: '8' },
  { id: '145', type: 'yellow', number: '9' },
  { id: '146', type: 'yellow', number: '1' },
  { id: '147', type: 'yellow', number: '2' },
  { id: '148', type: 'yellow', number: '3' },
  { id: '149', type: 'yellow', number: '4' },
  { id: '150', type: 'yellow', number: '5' },
  { id: '151', type: 'yellow', number: '6' },
  { id: '152', type: 'yellow', number: '7' },
  { id: '153', type: 'yellow', number: '8' },
  { id: '154', type: 'yellow', number: '9' },
  { id: '155', type: 'yellow', number: 'skip' },
  { id: '156', type: 'yellow', number: 'skip' },
  { id: '157', type: 'yellow', number: 'reverse' },
  { id: '158', type: 'yellow', number: 'reverse' },
  { id: '159', type: 'yellow', number: 'picker' },
  { id: '160', type: 'yellow', number: 'picker' },
  { id: '171', type: 'pick_four', number: undefined },
  { id: '172', type: 'color_changer', number: undefined },

  { id: '173', type: 'green', number: '0' },
  { id: '174', type: 'green', number: '1' },
  { id: '175', type: 'green', number: '2' },
  { id: '176', type: 'green', number: '3' },
  { id: '177', type: 'green', number: '4' },
  { id: '178', type: 'green', number: '5' },
  { id: '179', type: 'green', number: '6' },
  { id: '180', type: 'green', number: '7' },
  { id: '181', type: 'green', number: '8' },
  { id: '182', type: 'green', number: '9' },
  { id: '183', type: 'green', number: '1' },
  { id: '184', type: 'green', number: '2' },
  { id: '185', type: 'green', number: '3' },
  { id: '186', type: 'green', number: '4' },
  { id: '187', type: 'green', number: '5' },
  { id: '188', type: 'green', number: '6' },
  { id: '189', type: 'green', number: '7' },
  { id: '190', type: 'green', number: '8' },
  { id: '191', type: 'green', number: '9' },
  { id: '192', type: 'green', number: 'skip' },
  { id: '193', type: 'green', number: 'skip' },
  { id: '194', type: 'green', number: 'reverse' },
  { id: '195', type: 'green', number: 'reverse' },
  { id: '196', type: 'green', number: 'picker' },
  { id: '197', type: 'green', number: 'picker' },
  { id: '198', type: 'pick_four', number: undefined },
  { id: '199', type: 'color_changer', number: undefined },

  { id: '200', type: 'blue', number: '0' },
  { id: '201', type: 'blue', number: '1' },
  { id: '202', type: 'blue', number: '2' },
  { id: '203', type: 'blue', number: '3' },
  { id: '204', type: 'blue', number: '4' },
  { id: '205', type: 'blue', number: '5' },
  { id: '206', type: 'blue', number: '6' },
  { id: '207', type: 'blue', number: '7' },
  { id: '208', type: 'blue', number: '8' },
  { id: '209', type: 'blue', number: '9' },
  { id: '210', type: 'blue', number: '1' },
  { id: '211', type: 'blue', number: '2' },
  { id: '212', type: 'blue', number: '3' },
  { id: '213', type: 'blue', number: '4' },
  { id: '214', type: 'blue', number: '5' },
  { id: '215', type: 'blue', number: '6' },
  { id: '216', type: 'blue', number: '7' },
  { id: '217', type: 'blue', number: '8' },
  { id: '218', type: 'blue', number: '9' },
  { id: '219', type: 'blue', number: 'skip' },
  { id: '220', type: 'blue', number: 'skip' },
  { id: '221', type: 'blue', number: 'reverse' },
  { id: '222', type: 'blue', number: 'reverse' },
  { id: '223', type: 'blue', number: 'picker' },
  { id: '224', type: 'blue', number: 'picker' },
  { id: '225', type: 'pick_four', number: undefined },
  { id: '226', type: 'color_changer', number: undefined },
]

type SpecialColors = 'blue' | 'green' | 'red' | 'yellow' | null

type Deck = {
  total: number
  availableCards: UnoDeck[]
}

type PlayerInfo = {
  [key: string]: {
    name: string
    totalOfCards: number
  }
}

export type Player = {
  [key: string]: UnoDeck[]
}

export interface OndiUnoState {
  secret: {
    deck: Deck
  }
  players: Player
  publicPlayersInfo: PlayerInfo
  discardedCards: {
    total: number
    cards: UnoDeck[]
  }
  nextSpecialColor: SpecialColors
  cardAccumulatorForNextPlayer: number
}

const drawCard: Move<OndiUnoState> = (G, ctx) => {
  // @ts-ignore
  // Pure function: https://javascript.plainenglish.io/how-to-avoid-side-effects-using-pure-functions-in-javascript-366acaafb60c
  const newAvailableCards = [].concat(G.secret.deck.availableCards)
  const card = newAvailableCards.pop() as unknown as UnoDeck

  G.secret.deck.total--
  G.secret.deck.availableCards = newAvailableCards
  G.players[ctx.currentPlayer].push(card)

  const validCardsToDiscard = G.players[ctx.currentPlayer].filter((card) => {
    const lastDiscardedCard = G.discardedCards.cards.at(-1)

    if (G.cardAccumulatorForNextPlayer > 0) {
      if (lastDiscardedCard?.type === 'pick_four' && card.type !== 'pick_four') return false
      if (lastDiscardedCard?.number === 'picker' && card.number !== 'picker') return false
    }

    if (card.type === 'pick_four' || card.type === 'color_changer') return true
    if (card.type === lastDiscardedCard?.type || card.number === lastDiscardedCard?.number)
      return true
    if (card.type === G.nextSpecialColor) return true

    return false
  })

  if (validCardsToDiscard.length !== 0) {
    ctx.events?.setStage('discard')
    return
  }

  ctx.events?.endTurn()
}

const drawCards: Move<OndiUnoState> = (G, ctx, numberOfCards: number) => {
  // @ts-ignore
  const newAvailableCards = [].concat(G.secret.deck.availableCards)
  const cards = newAvailableCards.splice(-numberOfCards, numberOfCards) as unknown as UnoDeck[]

  G.secret.deck.total -= numberOfCards
  G.secret.deck.availableCards = newAvailableCards

  cards.map((card) => G.players[ctx.currentPlayer].push(card))

  G.cardAccumulatorForNextPlayer = 0

  /*const validCardsToDiscard = G.players[ctx.currentPlayer].filter((card) => {
    const lastDiscardedCard = G.discardedCards.cards.at(-1)

    if (lastDiscardedCard?.type === 'pick_four' && card.type !== 'pick_four') return false
    if (lastDiscardedCard?.number === 'picker' && card.number !== 'picker') return false

    if (card.type === 'pick_four' || card.type === 'color_changer') return true
    if (card.type === lastDiscardedCard?.type || card.number === lastDiscardedCard?.number)
      return true
    if (card.type === G.nextSpecialColor) return true

    return false
  })

  if (validCardsToDiscard.length !== 0) {
    ctx.events?.setActivePlayers({ currentPlayer: 'discard' })
  }*/
}

const discardCard: Move<OndiUnoState> = (G, ctx, card: UnoDeck) => {
  const lastDiscardedCard = G.discardedCards.cards.at(-1)

  if (
    card.type !== lastDiscardedCard?.type &&
    card.number !== lastDiscardedCard?.number &&
    card.type !== 'pick_four' &&
    card.type !== 'color_changer' &&
    card.type !== G.nextSpecialColor
  )
    return INVALID_MOVE

  let deleteCount = 0
  const newCardsOfThisPlayer = G.players[ctx.currentPlayer].filter((item) => {
    // I need this because I can have repeated cards and I must delete only
    if (deleteCount > 0) return true

    if (item.type === card.type && item.number === card.number) {
      deleteCount++
      return false
    }

    return true
  })

  if (card.type === 'pick_four') G.cardAccumulatorForNextPlayer += 4
  if (card.number === 'picker') G.cardAccumulatorForNextPlayer += 2

  G.players[ctx.currentPlayer] = newCardsOfThisPlayer
  G.discardedCards.total++
  G.discardedCards.cards.push(card)
  G.publicPlayersInfo[ctx.currentPlayer].totalOfCards--

  if (card.type === 'pick_four' || card.type === 'color_changer') {
    console.log('Escolha uma cor')
    ctx.events?.setStage('chooseColor')
    return
  }

  G.nextSpecialColor = null
  ctx.events?.endTurn()
}

const chooseColor: Move<OndiUnoState> = (G, ctx, color: SpecialColors) => {
  G.nextSpecialColor = color
}

export const OndiUno: Game<OndiUnoState> = {
  name: 'ondi-uno',

  setup: (ctx) => {
    const deck = Shuffle.shuffle({ deck: uno })

    // TODO: Can I make this work? (I need to modify how deck.deal works)
    // Eu posso abstrair isso usando [][], mas como deal funciona de uma maneira muito específica, preciso deixar hand1, hand2...
    // const hands: UnoDeck[][] = []
    const hand1: UnoDeck[] = []
    const hand2: UnoDeck[] = []
    const hand3: UnoDeck[] = []
    const hand4: UnoDeck[] = []
    const privatePlayersInfo: Player = {}
    const publicPlayersInfo: PlayerInfo = {}

    // Cria os players
    for (let i = 0; i < ctx.numPlayers; i++) {
      // It must be a string `${i}` because of boardgame works this way
      privatePlayersInfo[`${i}`] = []
    }

    // Distribui as cartas baseado na quantidade de players
    if (ctx.numPlayers === 2) {
      deck.deal(7, [hand1, hand2])

      privatePlayersInfo['0'] = hand1
      privatePlayersInfo['1'] = hand2
    } else if (ctx.numPlayers === 3) {
      deck.deal(7, [hand1, hand2, hand3])

      privatePlayersInfo['0'] = hand1
      privatePlayersInfo['1'] = hand2
      privatePlayersInfo['2'] = hand3
    } else {
      deck.deal(7, [hand1, hand2, hand3, hand4])

      privatePlayersInfo['0'] = hand1
      privatePlayersInfo['1'] = hand2
      privatePlayersInfo['2'] = hand3
      privatePlayersInfo['3'] = hand4
    }

    const startCard: UnoDeck = deck.draw()
    let cardAccumulatorForNextPlayer = 0

    if (startCard.type === 'pick_four') cardAccumulatorForNextPlayer += 4
    if (startCard.number === 'picker') cardAccumulatorForNextPlayer += 2

    // Precisa ser depois de distribuir as cartas
    const deckInfo: Deck = {
      total: deck.length,
      availableCards: deck.cards,
    }

    for (let i = 0; i < ctx.numPlayers; i++) {
      let name = ''
      if (i === 0) name = 'Padrxn'
      else if (i === 1) name = 'DIABLE Jumb'
      else if (i === 2) name = 'SENTA EM QUANTOS?'
      else name = 'Fiat Uno'

      publicPlayersInfo[i] = {
        name,
        totalOfCards: privatePlayersInfo[i].length,
      }
    }

    return {
      secret: { deck: deckInfo },
      players: privatePlayersInfo,
      publicPlayersInfo,
      discardedCards: {
        total: 1,
        cards: [startCard],
      },
      nextSpecialColor: null,
      cardAccumulatorForNextPlayer,
    }
  },

  turn: {
    minMoves: 1,
    maxMoves: 2,
    onBegin: (G, ctx) => {
      const validCardsToDiscard = G.players[ctx.currentPlayer].filter((card) => {
        const lastDiscardedCard = G.discardedCards.cards.at(-1)

        if (G.cardAccumulatorForNextPlayer > 0) {
          if (lastDiscardedCard?.type === 'pick_four' && card.type !== 'pick_four') return false
          if (lastDiscardedCard?.number === 'picker' && card.number !== 'picker') return false
        }

        if (card.type === 'pick_four' || card.type === 'color_changer') return true
        if (card.type === lastDiscardedCard?.type || card.number === lastDiscardedCard?.number)
          return true
        if (card.type === G.nextSpecialColor) return true

        return false
      })

      console.log(validCardsToDiscard)

      if (validCardsToDiscard.length !== 0) {
        console.log(`turn: ${ctx.turn}`)
        console.log(`currentPlayer: ${ctx.currentPlayer}`)
        console.log(`Há cartas válidas para o player ${ctx.currentPlayer}, próxima fase discard`)
        ctx.events?.setActivePlayers({ currentPlayer: 'discard' })
        return G
      }

      if (G.cardAccumulatorForNextPlayer > 0) {
        console.log('Puxa esse leque')
        drawCards(G, ctx, G.cardAccumulatorForNextPlayer)
        ctx.events?.pass()
      }

      console.log(`Não há cartas válidas para o player ${ctx.currentPlayer}, fase de draw`)
      ctx.events?.setActivePlayers({ currentPlayer: 'draw' })
      return G
    },
    stages: {
      draw: {
        moves: { drawCard },
      },
      discard: {
        moves: { discardCard },
      },
      chooseColor: {
        moves: { chooseColor },
      },
    },
  },

  minPlayers: 2,
  maxPlayers: 4,
  // TODO: I need this, but I don't know how to manipulate secret state in moves
  // playerView: PlayerView.STRIP_SECRETS,
  moves: {
    drawCard: {
      move: drawCard,
      client: false,
    },
    discardCard,
    chooseColor,
    drawCards,
  },
}
