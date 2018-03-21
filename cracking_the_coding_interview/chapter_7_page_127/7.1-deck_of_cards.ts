class Card {
    constructor(public type: string, public value?: number) { }
}

class CardsDeck {
    // All cards
    private cardsCollection: { [id: string]: { numberOfCards: number, card: Card } };
    // Cards references
    private shuffledCardsArray: Card[];

    constructor() {
        this.resetToInitialDeck();
    }

    resetToInitialDeck() {
        this.cardsCollection = {};
        // add simple cards first
        for (let i = 2; i < 11; i++) {
            this.cardsCollection[i.toString()] = { numberOfCards: 4, card: new Card(i.toString(), i) }
        }

        this.cardsCollection['A'] = { numberOfCards: 4, card: new Card('A', 11) };
        this.cardsCollection['J'] = { numberOfCards: 4, card: new Card('J', 12) };
        this.cardsCollection['Q'] = { numberOfCards: 4, card: new Card('Q', 13) };
        this.cardsCollection['K'] = { numberOfCards: 4, card: new Card('K', 14) };
    }

    setNumberOfCards(type: string, numberOfCards: number) {
        if (this.cardsCollection[type]) {
            this.cardsCollection[type].numberOfCards = numberOfCards;

            if (numberOfCards === 0) {
                delete this.cardsCollection[type];
            }
        }
    }

    setCardValue(type: string, value: number) {
        if (this.cardsCollection[type]) {
            this.cardsCollection[type].card = new Card(type, value);
        }
    }

    shuffleDeck() {
        this.fillShuffledCardsArray();

        let i = 0
        while (i < 1000) {
            let randomNumber = Math.floor(Math.random() * (this.shuffledCardsArray.length - 1));
            let zeroCard = this.shuffledCardsArray[0];
            let card = this.shuffledCardsArray[randomNumber];
            this.shuffledCardsArray[0] = this.shuffledCardsArray[randomNumber];
            this.shuffledCardsArray[randomNumber] = zeroCard;
            i++;
        }
    }

    isEmpty(): boolean {
        return this.shuffledCardsArray.length === 0;
    }

    getNextCard(): Card {
        let randomNumber = Math.floor(Math.random() * (this.shuffledCardsArray.length - 1));
        let card = this.shuffledCardsArray[randomNumber];

        if (!card ||
            !this.cardsCollection[card.type] ||
            this.cardsCollection[card.type].numberOfCards === 0) {
            return this.getNextCard();
        }

        this.cardsCollection[card.type].numberOfCards--;
        this.shuffledCardsArray.splice(randomNumber, 1);
        return new Card(card.type, card.value);
    }

    logDeck() {
        // console.log('Deck cards', this.shuffledCardsArray.reduce((acc, c) => acc += c.type + ',', ''));
    }

    private fillShuffledCardsArray(): any {
        this.shuffledCardsArray = [];
        for (let key in this.cardsCollection) {
            for (let i = 0; i < this.cardsCollection[key].numberOfCards; i++) {
                this.shuffledCardsArray.push(this.cardsCollection[key].card);
            }
        }
    }

    private getCardType(index: number): string {
        if (index > 2 && index < 11) {
            return index.toString();
        }

        if (index === 11) {
            return 'A';
        }

        if (index === 12) {
            return 'J';
        }

        if (index === 13) {
            return 'Q';
        }

        if (index === 14) {
            return 'K';
        }
    }
}

class BlackJack {
    cardDecks: CardsDeck[] = [];
    players: Player[] = [];
    dealer: Player;

    constructor(dekcsNumber: number, playerNames: string[]) {
        this.setupGame(dekcsNumber, playerNames)
    }

    startGame() {
        this.cardDecks.forEach(d => d.shuffleDeck());
        while (!this.isGameDone()) {
            this.startRound();
            if (this.isGameDone()) {
                return;
            }
            this.playGameRound();
            this.showWinnders();
        }
    }

    getNextCard(): Card {
        let randomDeck = Math.floor(Math.random() * (this.cardDecks.length));
        this.cardDecks.forEach(d => {
            d.logDeck();
        });

        this.cardDecks[randomDeck].logDeck();
        if (!this.cardDecks[randomDeck] ||
            this.cardDecks[randomDeck].isEmpty()) {
            return this.getNextCard();
        }

        return this.cardDecks[randomDeck].getNextCard();
    }

    isGameDone(): boolean {
        let firstNotEmpty = this.cardDecks.find(d => !d.isEmpty());

        if (firstNotEmpty) {
            return false;
        }

        return true;
    }

    private startRound() {
        this.players.forEach(p => {
            this.setupRound(p);
        });

        this.setupRound(this.dealer);
    }

    private setupRound(player: Player) {
        player.reset();
        if (this.isGameDone()) {
            return;
        }

        player.addCard(this.getNextCard());

        if (this.isGameDone()) {
            return;
        }
        player.addCard(this.getNextCard());
    }

    private playGameRound() {
        this.players.forEach(p => p.playRound(this));
        this.dealer.playRound(this);
    }

    private showWinnders() {
        this.players.forEach(p => {
            if (p.hasBlackjack()) {
                console.log('Winnder', p.name);
            }
        });


        if (this.dealer.hasBlackjack()) {
            console.log('Winnder', this.dealer.name);
        }
    }

    private setupGame(dekcsNumber: number, playerNames: string[]) {
        this.cardDecks = [];
        for (let i = 0; i < dekcsNumber; i++) {
            let deck = new CardsDeck();
            deck.setCardValue('J', 10);
            deck.setCardValue('Q', 10);
            deck.setCardValue('K', 10);
            this.cardDecks.push(deck);
        }

        this.players = [];
        playerNames.forEach(v => this.players.push(new Player(v)));
        this.dealer = new Player('Dealer');
    }
}

class Player {
    cards: Card[] = [];
    totalCount: number = 0;

    constructor(public name: string) {
    }

    playRound(game: BlackJack) {
        while (!game.isGameDone() &&
            (!this.hasBlackjack() || this.totalCount < 18)) {
            this.addCard(game.getNextCard());
        }
    }

    reset() {
        this.cards = [];
        this.totalCount = 0;
    }

    addCard(card: Card) {
        this.cards.push(card);
        this.totalCount += card.value;
    }

    hasBlackjack(): boolean {
        return this.totalCount === 21;
    }
}

const blackJack = new BlackJack(4, ['Dorel', 'Cristel', 'Vagonu', 'Tapu']);
blackJack.startGame();