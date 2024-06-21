import { FunctionalComponent } from '@types';
import { EMPTY_FUNCTION } from '@utils';
import React from 'react';
import {
  Easing,
  SharedValue,
  runOnUI,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

type TableRegionValueType =
  | { state: 'free' }
  | { count: number; state: 'busy' | 'locked' };
type TableRegionType = Record<
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11 // Here starts enemy spots
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23,
  TableRegionValueType
>;

const EMPTY_TABLE_REGION_OBJECT: TableRegionType = {
  0: { state: 'free' },
  1: { state: 'free' },
  2: { state: 'free' },
  3: { state: 'free' },
  4: { state: 'free' },
  5: { state: 'free' },
  6: { state: 'free' },
  7: { state: 'free' },
  8: { state: 'free' },
  9: { state: 'free' },
  10: { state: 'free' },
  11: { state: 'free' },
  // Add enemy values
  12: { state: 'free' },
  13: { state: 'free' },
  14: { state: 'free' },
  15: { state: 'free' },
  16: { state: 'free' },
  17: { state: 'free' },
  18: { state: 'free' },
  19: { state: 'free' },
  20: { state: 'free' },
  21: { state: 'free' },
  22: { state: 'free' },
  23: { state: 'free' },
};

type GameScoreType = Record<0 | 1 | 2, number[]>;

type GameProvider = {};

type GameContextState = {
  activeCardTranslateY: SharedValue<number>;
  activeCardTranslateX: SharedValue<number>;
  activeRegion: SharedValue<-1 | 0 | 1 | 2>;
  firstRegionCount: SharedValue<number>;
  secondRegionCount: SharedValue<number>;
  thirdRegionCount: SharedValue<number>;
  tableRegion: SharedValue<TableRegionType>;
  placeCardInPlaceholder: (
    region: -1 | 0 | 1 | 2,
    current: SharedValue<number>,
    count: number,
    type: 'me' | 'enemy',
  ) => number;
  handDeck: SharedValue<number[]>;
  handDeckLimitCard: SharedValue<number>;
  putCardInHandDeck: (count: number) => number;
  turnEnergy: SharedValue<number>;
  energyAnimation: SharedValue<number>;
  onEndTurn: () => void;
  focusCount: SharedValue<number>;
  focusTimeout: SharedValue<number>;
  gameRound: SharedValue<number>;
  gameScore: SharedValue<GameScoreType>;
  onAnswerQuestion: (
    correct: boolean,
    count: number,
    type: 'me' | 'enemy',
  ) => void;
  disableInteractions: SharedValue<number>;
  // Enemy related
  enemyCards: SharedValue<number[]>;
  enemyLastCard: SharedValue<number>;
};

export const GameContext = React.createContext<GameContextState>({
  activeCardTranslateY: {
    value: 0,
    addListener: EMPTY_FUNCTION,
    removeListener: EMPTY_FUNCTION,
    modify: EMPTY_FUNCTION,
  },
  activeCardTranslateX: {
    value: 0,
    addListener: EMPTY_FUNCTION,
    removeListener: EMPTY_FUNCTION,
    modify: EMPTY_FUNCTION,
  },
  activeRegion: {
    value: -1,
    addListener: EMPTY_FUNCTION,
    removeListener: EMPTY_FUNCTION,
    modify: EMPTY_FUNCTION,
  },
  firstRegionCount: {
    value: 0,
    addListener: EMPTY_FUNCTION,
    removeListener: EMPTY_FUNCTION,
    modify: EMPTY_FUNCTION,
  },
  secondRegionCount: {
    value: 0,
    addListener: EMPTY_FUNCTION,
    removeListener: EMPTY_FUNCTION,
    modify: EMPTY_FUNCTION,
  },
  thirdRegionCount: {
    value: 0,
    addListener: EMPTY_FUNCTION,
    removeListener: EMPTY_FUNCTION,
    modify: EMPTY_FUNCTION,
  },
  tableRegion: {
    value: { ...EMPTY_TABLE_REGION_OBJECT },
    addListener: EMPTY_FUNCTION,
    removeListener: EMPTY_FUNCTION,
    modify: EMPTY_FUNCTION,
  },
  placeCardInPlaceholder: () => 0,
  handDeck: {
    value: [],
    addListener: EMPTY_FUNCTION,
    removeListener: EMPTY_FUNCTION,
    modify: EMPTY_FUNCTION,
  },
  handDeckLimitCard: {
    value: 2,
    addListener: EMPTY_FUNCTION,
    removeListener: EMPTY_FUNCTION,
    modify: EMPTY_FUNCTION,
  },
  putCardInHandDeck: () => 0,
  turnEnergy: {
    value: 1,
    addListener: EMPTY_FUNCTION,
    removeListener: EMPTY_FUNCTION,
    modify: EMPTY_FUNCTION,
  },
  energyAnimation: {
    value: 0,
    addListener: EMPTY_FUNCTION,
    removeListener: EMPTY_FUNCTION,
    modify: EMPTY_FUNCTION,
  },
  onEndTurn: EMPTY_FUNCTION,
  focusCount: {
    value: -1,
    addListener: EMPTY_FUNCTION,
    removeListener: EMPTY_FUNCTION,
    modify: EMPTY_FUNCTION,
  },
  focusTimeout: {
    value: 0,
    addListener: EMPTY_FUNCTION,
    removeListener: EMPTY_FUNCTION,
    modify: EMPTY_FUNCTION,
  },
  gameRound: {
    value: 1,
    addListener: EMPTY_FUNCTION,
    removeListener: EMPTY_FUNCTION,
    modify: EMPTY_FUNCTION,
  },
  gameScore: {
    value: { 0: [0, 0], 1: [0, 0], 2: [0, 0] },
    addListener: EMPTY_FUNCTION,
    removeListener: EMPTY_FUNCTION,
    modify: EMPTY_FUNCTION,
  },
  onAnswerQuestion: EMPTY_FUNCTION,
  disableInteractions: {
    value: 0,
    addListener: EMPTY_FUNCTION,
    removeListener: EMPTY_FUNCTION,
    modify: EMPTY_FUNCTION,
  },
  enemyCards: {
    value: [],
    addListener: EMPTY_FUNCTION,
    removeListener: EMPTY_FUNCTION,
    modify: EMPTY_FUNCTION,
  },
  enemyLastCard: {
    value: 0,
    addListener: EMPTY_FUNCTION,
    removeListener: EMPTY_FUNCTION,
    modify: EMPTY_FUNCTION,
  },
});

const GameProvider: FunctionalComponent<GameProvider> = ({ children }) => {
  const activeCardTranslateY = useSharedValue(0);
  const activeCardTranslateX = useSharedValue(0);

  const activeRegion = useSharedValue<-1 | 0 | 1 | 2>(-1);

  const firstRegionCount = useSharedValue(0);
  const secondRegionCount = useSharedValue(1);
  const thirdRegionCount = useSharedValue(2);

  const turnEnergy = useSharedValue(1);
  const energyAnimation = useSharedValue(0);

  const focusCount = useSharedValue(-1);
  const focusTimeout = useSharedValue(0);

  const gameRound = useSharedValue(1);

  const gameScore = useSharedValue<GameScoreType>({
    0: [0, 0],
    1: [0, 0],
    2: [0, 0],
  });

  const tableRegion = useSharedValue<TableRegionType>({
    ...EMPTY_TABLE_REGION_OBJECT,
  });

  const handDeck = useSharedValue<number[]>([0, 1, 2]);
  const handDeckLimitCard = useSharedValue(2);

  const disableInteractions = useSharedValue(0);

  const enemyCards = useSharedValue<number[]>([]);
  const enemyLastCard = useSharedValue<number>(12);

  const timeout = useSharedValue(0);

  const animateEnergy = () => {
    'worklet';

    energyAnimation.value = withSequence(
      withTiming(1, { duration: 200 }),
      withTiming(0, { duration: 200 }),
      withTiming(1, { duration: 200 }),
      withTiming(0, { duration: 200 }),
    );
  };

  const putCardInHandDeck = (count: number) => {
    'worklet';

    if (handDeck.value.includes(count)) {
      return handDeck.value.findIndex((number) => number === count);
    }

    const deck = [...handDeck.value];
    const cardsInDeck = deck.length;

    deck.push(count);

    handDeck.value = [...deck];

    return cardsInDeck;
  };

  const placeCardInPlaceholder = (
    region: -1 | 0 | 1 | 2,
    current: SharedValue<number>,
    count: number,
    type: 'me' | 'enemy',
  ) => {
    'worklet';

    const initialPlace = current.value;
    const record: Record<number, TableRegionValueType> = {
      ...tableRegion.value,
    };

    if (region === -1) {
      current.value = -1;
      record[initialPlace] = { state: 'free' };
      tableRegion.value = { ...record } as any;
      // Put the card back in deck
      if (type === 'me') {
        putCardInHandDeck(count);

        // Handle energy
        if (initialPlace !== -1) {
          turnEnergy.value = turnEnergy.value + 1;
        }
      }

      return -1;
    }

    const start = (type === 'enemy' ? 12 : 0) + region * 4;
    const end = (type === 'enemy' ? 12 : 0) + region * 4 + 3;

    if (current.value >= start && current.value <= end) {
      return initialPlace;
    } else if (record[start].state === 'free') {
      if (initialPlace === -1 && type === 'me') {
        if (turnEnergy.value === 0) {
          current.value = -1;
          record[initialPlace] = { state: 'free' };
          tableRegion.value = { ...record } as any;
          // Put the card back in deck
          putCardInHandDeck(count);
          // Handle energy
          animateEnergy();
          // Return
          return -1;
        } else {
          turnEnergy.value = turnEnergy.value - 1;
        }
      }

      current.value = start;
      record[initialPlace] = { state: 'free' };
      record[start] = { count, state: 'busy' };
      tableRegion.value = { ...record } as any;

      if (type === 'me') {
        const deck = [...handDeck.value];
        const newDeck = deck.filter((number) => number !== count);

        handDeck.value = [...newDeck];
      }

      return start;
    } else if (record[start + 1].state === 'free') {
      if (initialPlace === -1 && type === 'me') {
        if (turnEnergy.value === 0) {
          current.value = -1;
          record[initialPlace] = { state: 'free' };
          tableRegion.value = { ...record } as any;
          // Put the card back in deck
          putCardInHandDeck(count);
          // Handle energy
          animateEnergy();
          // Return
          return -1;
        } else {
          turnEnergy.value = turnEnergy.value - 1;
        }
      }

      current.value = start + 1;
      record[initialPlace] = { state: 'free' };
      record[start + 1] = { count, state: 'busy' };
      tableRegion.value = { ...record } as any;

      if (type === 'me') {
        const deck = [...handDeck.value];
        const newDeck = deck.filter((number) => number !== count);

        handDeck.value = [...newDeck];
      }

      return start + 1;
    } else if (record[start + 2].state === 'free') {
      if (initialPlace === -1 && type === 'me') {
        if (turnEnergy.value === 0) {
          current.value = -1;
          record[initialPlace] = { state: 'free' };
          tableRegion.value = { ...record } as any;
          // Put the card back in deck
          putCardInHandDeck(count);
          // Handle energy
          animateEnergy();
          // Return
          return -1;
        } else {
          turnEnergy.value = turnEnergy.value - 1;
        }
      }

      current.value = start + 2;
      record[initialPlace] = { state: 'free' };
      record[start + 2] = { count, state: 'busy' };
      tableRegion.value = { ...record } as any;

      if (type === 'me') {
        const deck = [...handDeck.value];
        const newDeck = deck.filter((number) => number !== count);

        handDeck.value = [...newDeck];
      }

      return start + 2;
    } else if (record[start + 3].state === 'free') {
      if (initialPlace === -1 && type === 'me') {
        if (turnEnergy.value === 0) {
          current.value = -1;
          record[initialPlace] = { state: 'free' };
          tableRegion.value = { ...record } as any;
          // Put the card back in deck
          putCardInHandDeck(count);
          // Handle energy
          animateEnergy();
          // Return
          return -1;
        } else {
          turnEnergy.value = turnEnergy.value - 1;
        }
      }

      current.value = start + 3;
      record[initialPlace] = { state: 'free' };
      record[start + 3] = { count, state: 'busy' };
      tableRegion.value = { ...record } as any;

      if (type === 'me') {
        const deck = [...handDeck.value];
        const newDeck = deck.filter((number) => number !== count);

        handDeck.value = [...newDeck];
      }

      return start + 3;
    }

    current.value = -1;
    record[initialPlace] = { state: 'free' };
    tableRegion.value = { ...record } as any;

    if (type === 'me') {
      // Put the card back in deck
      putCardInHandDeck(count);
      // Handle energy
      if (initialPlace !== -1) {
        turnEnergy.value = turnEnergy.value + 1;
      }
    }

    return -1;
  };

  const lockCards = () => {
    'worklet';

    const findSearchedElement = () => {
      const tableRegionRecord: Record<number, TableRegionValueType> = {
        ...tableRegion.value,
      };
      const searchedIndex = Object.keys(tableRegion.value).findIndex((key) => {
        return tableRegionRecord[Number(key)].state === 'busy';
      });

      if (searchedIndex !== -1) {
        const element = tableRegionRecord[searchedIndex];

        if (element.state === 'busy') {
          element.state = 'locked';
          tableRegion.value = { ...tableRegionRecord } as any;

          return element.count;
        } else {
          return -1;
        }
      } else {
        return -1;
      }
    };

    const repeatFunction = () => {
      const result = findSearchedElement();

      if (result !== -1) {
        focusCount.value = result;
        focusTimeout.value = 30;
        focusTimeout.value = withDelay(
          1000,
          withTiming(0, { duration: 30000, easing: Easing.linear }, () => {
            focusCount.value = -1;
            focusCount.value = withDelay(
              1500,
              withTiming(-1, { duration: 0 }, repeatFunction),
            );
          }),
        );
      } else {
        disableInteractions.value = 0;

        // Increment round count
        gameRound.value = gameRound.value + 1;
        turnEnergy.value = gameRound.value;
        animateEnergy();

        // Add card to deck
        // if the hand deck doesn't have enough cards
        if (handDeck.value.length < 5) {
          const newCard = handDeckLimitCard.value + 1;

          handDeck.value = [...handDeck.value, newCard];
          handDeckLimitCard.value = newCard;
        }
      }
    };

    repeatFunction();
  };

  const onEndTurn = () => {
    runOnUI(() => {
      const start = enemyLastCard.value;
      const end = enemyLastCard.value + gameRound.value - 1;
      enemyCards.value = [...Array.from(Array(end + 1).keys()).slice(start)];
      enemyLastCard.value = end + 1;

      disableInteractions.value = 1;

      timeout.value = withTiming(
        timeout.value + 1,
        { duration: 500 },
        lockCards,
      );
    })();
  };

  const onAnswerQuestion = (
    correct: boolean,
    place: number,
    type: 'me' | 'enemy',
  ) => {
    'worklet';

    if (correct) {
      const index = Math.floor((place % 12) / 4);
      const record: Record<number, number[]> = { ...gameScore.value };

      record[index][type === 'me' ? 0 : 1] =
        record[index][type === 'me' ? 0 : 1] + 1;
      record[index] = [...record[index]];

      gameScore.value = { ...record } as any;
    }
  };

  const getNewContextValue = React.useCallback((): GameContextState => {
    return {
      activeCardTranslateY,
      activeCardTranslateX,
      activeRegion,
      firstRegionCount,
      secondRegionCount,
      thirdRegionCount,
      tableRegion,
      placeCardInPlaceholder,
      handDeck,
      handDeckLimitCard,
      putCardInHandDeck,
      turnEnergy,
      energyAnimation,
      onEndTurn,
      focusCount,
      focusTimeout,
      gameRound,
      gameScore,
      onAnswerQuestion,
      disableInteractions,
      enemyCards,
      enemyLastCard,
    };
  }, []);

  const contextValue = getNewContextValue();

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export default GameProvider;
