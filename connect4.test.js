describe('Tests for the Game class', () => {
    let game = '';
    beforeEach(() => {
        game = new Game();

    })
    it('should create a class with a few properties ', () => {
        expect(game.width).toEqual(7);
        expect(game.height).toEqual(6);

    });
    it('should populate the board using makeBoard', () => {
        expect(game.board).toEqual([
            [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
            [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
            [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
            [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
            [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
            [undefined, undefined, undefined, undefined, undefined, undefined, undefined]
        ])
    });
    it('should build an html table', () => {
        const htmlBoard = document.getElementById('board');
        htmlBoard.innerHTML = '';
        game.makeHtmlBoard();
        expect(htmlBoard.innerHTML).toEqual('<tr id="column-top"><td id="0"></td><td id="1"></td><td id="2"></td><td id="3"></td><td id="4"></td><td id="5"></td><td id="6"></td></tr><tr><td id="0-0"></td><td id="0-1"></td><td id="0-2"></td><td id="0-3"></td><td id="0-4"></td><td id="0-5"></td><td id="0-6"></td></tr><tr><td id="1-0"></td><td id="1-1"></td><td id="1-2"></td><td id="1-3"></td><td id="1-4"></td><td id="1-5"></td><td id="1-6"></td></tr><tr><td id="2-0"></td><td id="2-1"></td><td id="2-2"></td><td id="2-3"></td><td id="2-4"></td><td id="2-5"></td><td id="2-6"></td></tr><tr><td id="3-0"></td><td id="3-1"></td><td id="3-2"></td><td id="3-3"></td><td id="3-4"></td><td id="3-5"></td><td id="3-6"></td></tr><tr><td id="4-0"></td><td id="4-1"></td><td id="4-2"></td><td id="4-3"></td><td id="4-4"></td><td id="4-5"></td><td id="4-6"></td></tr><tr><td id="5-0"></td><td id="5-1"></td><td id="5-2"></td><td id="5-3"></td><td id="5-4"></td><td id="5-5"></td><td id="5-6"></td></tr>')
    });
    afterEach(() => {
        const htmlBoard = document.getElementById('board');
        htmlBoard.innerHTML = '';

    })
});


