'use strict';

var Card = function(data) {
    data = data || {};
    this.id = m.prop(data.id);
    this.name = m.prop(data.name);
    this.imageurl = m.prop(data.imageurl);
};

Card.find = function(query) {
    return m.request({method: 'GET', url: '/api/cards', type: Card, data: query});
};

var Deck = function(data) {
    data = data || {};
    this.id = m.prop(data.id);
    this.name = m.prop(data.name);
};

Deck.find = function(query) {
    return m.request({method: 'GET', url: '/api/decks', data: query});
}

//data binding helper function
function binds(data) {
    return {onchange: function(e) {
        data[e.target.name] = e.target.value;
    }};
};

var DeckBuilder = {
    controller: function() {
        var ctrl = this;
        ctrl.cards = m.prop([]);
        ctrl.decks = m.prop([]);
        ctrl.selectedCard = m.prop(new Card());
        ctrl.selectedDeck = m.prop();

        ctrl.cardQuery = {
            name: ""
        };
        ctrl.cardSearch = function(e) {
            e.preventDefault();
            Card.find(ctrl.cardQuery).then(ctrl.cards);
        };
        ctrl.selectCard = function(card) {
            return function() {
                console.log("Changing selected card to: " + card.name());
                ctrl.selectedCard(card);
            };
        };

        ctrl.deckQuery = {
            name: ""
        };
        ctrl.deckSearch = function() {
            ctrl.decks = Deck.find(ctrl.deckQuery);
        };
        ctrl.selectCard = function(deck) {
            return function() {
                console.log("Changing selected deck to: " + deck.name());
                ctrl.selectedCard(deck);
            };
        };

    },
    view: function(ctrl) {
        return [
            m('h1', 'DeckBuilder'),
            m('.row', [
                m('.col-md-4', [
                    m('h1', 'Decks'),
                    m('h2', 'Search'),
                    m('.form', [
                        m('.form-group', binds(ctrl.deckQuery), [
                            m('label', {for: 'deckQueryName'}, 'Name'),
                            m('input.form-control#deckQueryName', { name: 'name', value: ctrl.deckQuery.name })
                        ]),
                        m('button.btn.btn-default', { onclick: ctrl.deckSearch }, 'Submit'),
                        m('button.btn.btn-default', 'New Deck'),
                    ]),
                    m('h2', 'Results'),
                    m('table.table.table-hover', [
                        m('thead', m('tr', m('th', 'Name'))),
                        m('tbody', [
                            ctrl.decks().map(function(deck) {
                                return m('tr', {onclick: ctrl.selectDeck(deck)}, m('td', deck.name()))
                            })
                        ])
                    ]),
                ]),
                m('.col-md-4', [
                    m('h1', 'Cards'),
                    m('h2', 'Search'),
                    m('.form', [
                        m('.form-group', binds(ctrl.cardQuery), [
                            m('label', {for: 'cardQueryName'}, 'Name'),
                            m('input.form-control#cardQueryName', { name: 'name', value: ctrl.cardQuery.name })
                        ]),
                        m('button.btn.btn-default', { onclick: ctrl.cardSearch }, 'Submit'),
                    ]),
                    m('h2', 'Results'),
                    m('table.table.table-hover', [
                        m('thead', m('tr', m('th', 'Name'))),
                        m('tbody', [
                            ctrl.cards().map(function(card) {
                                return m('tr', {onclick: ctrl.selectCard(card)}, m('td', card.name()))
                            })
                        ])
                    ]),
                ]),
                m('.col-md-4', [
                    m('img.img-responsive', {src: ctrl.selectedCard().imageurl() || "/images/cardback.hq.jpg"})
                ])
            ])
        ]
    }
}
