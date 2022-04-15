import type { Game, Move } from "boardgame.io";
import { PlayerView } from "boardgame.io/core";
const Shuffle = require("shuffle");

type UnoDeck = {
  color?: string;
  number?: number | string;
  wild?: string;
};

const uno: UnoDeck[] = [
  { color: "red", number: 0 },
  { color: "red", number: 1 },
  { color: "red", number: 2 },
  { color: "red", number: 3 },
  { color: "red", number: 4 },
  { color: "red", number: 5 },
  { color: "red", number: 6 },
  { color: "red", number: 7 },
  { color: "red", number: 8 },
  { color: "red", number: 9 },
  { color: "red", number: 1 },
  { color: "red", number: 2 },
  { color: "red", number: 3 },
  { color: "red", number: 4 },
  { color: "red", number: 5 },
  { color: "red", number: 6 },
  { color: "red", number: 7 },
  { color: "red", number: 8 },
  { color: "red", number: 9 },
  { color: "red", number: "skip" },
  { color: "red", number: "skip" },
  { color: "red", number: "reverse" },
  { color: "red", number: "reverse" },
  { color: "red", number: "picker" },
  { color: "red", number: "picker" },
  { wild: "pick_four" },
  { wild: "color_changer" },

  { color: "yellow", number: 0 },
  { color: "yellow", number: 1 },
  { color: "yellow", number: 2 },
  { color: "yellow", number: 3 },
  { color: "yellow", number: 4 },
  { color: "yellow", number: 5 },
  { color: "yellow", number: 6 },
  { color: "yellow", number: 7 },
  { color: "yellow", number: 8 },
  { color: "yellow", number: 9 },
  { color: "yellow", number: 1 },
  { color: "yellow", number: 2 },
  { color: "yellow", number: 3 },
  { color: "yellow", number: 4 },
  { color: "yellow", number: 5 },
  { color: "yellow", number: 6 },
  { color: "yellow", number: 7 },
  { color: "yellow", number: 8 },
  { color: "yellow", number: 9 },
  { color: "yellow", number: "skip" },
  { color: "yellow", number: "skip" },
  { color: "yellow", number: "reverse" },
  { color: "yellow", number: "reverse" },
  { color: "yellow", number: "picker" },
  { color: "yellow", number: "picker" },
  { wild: "pick_four" },
  { wild: "color_changer" },

  { color: "green", number: 0 },
  { color: "green", number: 1 },
  { color: "green", number: 2 },
  { color: "green", number: 3 },
  { color: "green", number: 4 },
  { color: "green", number: 5 },
  { color: "green", number: 6 },
  { color: "green", number: 7 },
  { color: "green", number: 8 },
  { color: "green", number: 9 },
  { color: "green", number: 1 },
  { color: "green", number: 2 },
  { color: "green", number: 3 },
  { color: "green", number: 4 },
  { color: "green", number: 5 },
  { color: "green", number: 6 },
  { color: "green", number: 7 },
  { color: "green", number: 8 },
  { color: "green", number: 9 },
  { color: "green", number: "skip" },
  { color: "green", number: "skip" },
  { color: "green", number: "reverse" },
  { color: "green", number: "reverse" },
  { color: "green", number: "picker" },
  { color: "green", number: "picker" },
  { wild: "pick_four" },
  { wild: "color_changer" },

  { color: "blue", number: 0 },
  { color: "blue", number: 1 },
  { color: "blue", number: 2 },
  { color: "blue", number: 3 },
  { color: "blue", number: 4 },
  { color: "blue", number: 5 },
  { color: "blue", number: 6 },
  { color: "blue", number: 7 },
  { color: "blue", number: 8 },
  { color: "blue", number: 9 },
  { color: "blue", number: 1 },
  { color: "blue", number: 2 },
  { color: "blue", number: 3 },
  { color: "blue", number: 4 },
  { color: "blue", number: 5 },
  { color: "blue", number: 6 },
  { color: "blue", number: 7 },
  { color: "blue", number: 8 },
  { color: "blue", number: 9 },
  { color: "blue", number: "skip" },
  { color: "blue", number: "skip" },
  { color: "blue", number: "reverse" },
  { color: "blue", number: "reverse" },
  { color: "blue", number: "picker" },
  { color: "blue", number: "picker" },
  { wild: "pick_four" },
  { wild: "color_changer" },
];

type Deck = {
  total: number;
  availableCards: UnoDeck[];
};

type PlayerInfo = {
  [key: string]: {
    name: string;
    totalOfCards: number;
  };
};

export type Player = {
  [key: string]: UnoDeck[];
};

export interface OndiUnoState {
  secret: {
    deck: Deck;
  };
  players: Player;
  publicPlayersInfo: PlayerInfo;
}

const drawCard: Move<OndiUnoState> = (G, ctx) => {
  G.secret.deck.total--;
};

export const OndiUno: Game<OndiUnoState> = {
  name: "oni-uno",

  setup: (ctx) => {
    const deck = Shuffle.shuffle({ deck: uno });

    // TODO: Can I make this works? (I need to modify how deck.deal works)
    // Eu posso abstrair isso usando [][], mas como deal funciona de uma maneira muito específica, preciso deixar hand1, hand2...
    // const hands: UnoDeck[][] = []
    const hand1: UnoDeck[] = [];
    const hand2: UnoDeck[] = [];
    const hand3: UnoDeck[] = [];
    const hand4: UnoDeck[] = [];
    const privatePlayersInfo: Player = {};
    const publicPlayersInfo: PlayerInfo = {};

    // Cria os players
    for (let i = 0; i < ctx.numPlayers; i++) {
      // It must be a string `${i}` because of boardgame works this way
      privatePlayersInfo[`${i}`] = [];
    }

    // Distribui as cartas baseado na quantidade de players
    if (ctx.numPlayers === 2) {
      deck.deal(7, [hand1, hand2]);

      privatePlayersInfo["0"] = hand1;
      privatePlayersInfo["1"] = hand2;
    } else if (ctx.numPlayers === 3) {
      deck.deal(7, [hand1, hand2, hand3]);

      privatePlayersInfo["0"] = hand1;
      privatePlayersInfo["1"] = hand2;
      privatePlayersInfo["2"] = hand3;
    } else {
      deck.deal(7, [hand1, hand2, hand3, hand4]);

      privatePlayersInfo["0"] = hand1;
      privatePlayersInfo["1"] = hand2;
      privatePlayersInfo["2"] = hand3;
      privatePlayersInfo["3"] = hand4;
    }

    // Precisa ser depois de distribuir as cartas
    const deckInfo: Deck = {
      total: deck.length,
      availableCards: deck.cards,
    };

    for (let i = 0; i < ctx.numPlayers; i++) {
      let name = "";
      if (i === 0) name = "Padrxn";
      else if (i === 1) name = "DIABLE Jumb";
      else if (i === 2) name = "Fiat Uno";
      else name = "SENTA EM QUANTOS?";

      publicPlayersInfo[`${i}`] = {
        name,
        totalOfCards: privatePlayersInfo[`${i}`].length,
      };
    }

    return {
      secret: { deck: deckInfo },
      players: privatePlayersInfo,
      publicPlayersInfo,
    };
  },

  turn: {
    minMoves: 1,
    maxMoves: 1,
  },
  minPlayers: 2,
  maxPlayers: 4,
  // TODO: Deck should be stripped too
  playerView: PlayerView.STRIP_SECRETS,
  moves: {
    drawCard,
  },
};
