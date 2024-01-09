//price & articleList
function pricing(model) {
    const articleList = [];
    Object.assign(model, { articleList: {} });

    let mazeBodyPrice;
    let mazeBodyReducedPrice;

    let mazeSupplementPrice;
    let mazeBodyIndex = ALLCOMPONENTS.maze.body.findIndex(item => item.width == model.width && item.height == model.height);

    //body
    let combinationMazeIndex = ALLCOMPONENTS.maze.combination.findIndex(item => model.width == item.width && model.height == item.height && model.supplement == item.supplement && model.color.color == item.color.color && model.color.lacquer == item.color.lacquer && model.interiorColor.color == item.interiorColor.color && model.handleColor.color == item.handleColor.color);
    if (combinationMazeIndex != -1) {
        mazeBodyPrice = ALLCOMPONENTS.maze.combination[combinationMazeIndex].price.original;
        mazeBodyReducedPrice = ALLCOMPONENTS.maze.combination[combinationMazeIndex].price.reduced;
    } else {
        if (model.color.lacquer == 'basic') {
            mazeBodyPrice = ALLCOMPONENTS.maze.body[mazeBodyIndex].price.basic;
        }
        if (model.color.lacquer == 'structure') {
            mazeBodyPrice = ALLCOMPONENTS.maze.body[mazeBodyIndex].price.structure;
        }
        if (model.color.lacquer == 'gloss') {
            mazeBodyPrice = ALLCOMPONENTS.maze.body[mazeBodyIndex].price.gloss;
        }
        if (model.color.lacquer == 'veneer') {
            mazeBodyPrice = ALLCOMPONENTS.maze.body[mazeBodyIndex].price.veneer;
        }
    }
    model.articleList.body = { "code": ALLCOMPONENTS.maze.body[mazeBodyIndex].code, "color": model.color.code, "interiorColor": model.interiorColor.code };
    //supplement

    // doorset = 0
    // drawerset = 1
    // doorDrawerDoor = 2
    var mazeSupplementIndex;
    if (model.supplement == 'doorset') {
        mazeSupplementIndex = 0;
    }
    else if (model.supplement == 'drawerset') {
        mazeSupplementIndex = 1;
    }
    else if (model.supplement == 'doorDrawerDoor') {
        mazeSupplementIndex = 2;
    }
    else {
        mazeSupplementIndex = -1;
    }

    if (mazeSupplementIndex != -1) {
        if (model.color.lacquer == 'basic') {
            mazeSupplementPrice = ALLCOMPONENTS.maze.supplement[mazeSupplementIndex].price.basic;
        }
        else if (model.color.lacquer == 'structure') {
            mazeSupplementPrice = ALLCOMPONENTS.maze.supplement[mazeSupplementIndex].price.structure;
        }
        else if (model.color.lacquer == 'gloss') {
            mazeSupplementPrice = ALLCOMPONENTS.maze.supplement[mazeSupplementIndex].price.gloss;
        }
        else if (model.color.lacquer == 'veneer') {
            mazeSupplementPrice = ALLCOMPONENTS.maze.supplement[mazeSupplementIndex].price.veneer;
        }
    } else {
        mazeSupplementPrice = 0;
    }

    let mazePrice = mazeBodyPrice + mazeSupplementPrice;
    let mazeReducedPrice = mazeBodyReducedPrice + mazeSupplementPrice;
    if (mazeBodyReducedPrice != undefined) {
        document.querySelector('.productInfoPrice').textContent = '€ ' + mazeReducedPrice + ',-';
        document.querySelector('.productInfoName').textContent = ALLCOMPONENTS.maze.combination[combinationMazeIndex].name;
    }
    else {
        document.querySelector('.productInfoPrice').textContent = '€ ' + mazePrice + ',-';
        document.querySelector('.productInfoName').textContent = null;
    }
}