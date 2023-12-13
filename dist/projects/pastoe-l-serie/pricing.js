//price & articleList
function pricing(model) {
    const articleList = [];
    Object.assign(model, { articleList: {} });

    let serieBodyPrice;
    let serieBodyReducedPrice;

    let serieBodyIndex = ALLCOMPONENTS.serie.body.findIndex(item => item.variant == model.variant);

    //body
    let combinationMazeIndex = ALLCOMPONENTS.serie.combination.findIndex(item => model.color.color == item.color.color && model.color.lacquer == item.color.lacquer && model.interiorColor.color == item.interiorColor.color && model.handleColor.color == item.handleColor.color);
    if (combinationMazeIndex != -1) {
        serieBodyPrice = ALLCOMPONENTS.serie.combination[combinationMazeIndex].price.original;
        serieBodyReducedPrice = ALLCOMPONENTS.serie.combination[combinationMazeIndex].price.reduced;
    } else {
        if (model.color.lacquer == 'basic') {
            serieBodyPrice = ALLCOMPONENTS.serie.body[serieBodyIndex].price.basic;
        }
        if (model.color.lacquer == 'structure') {
            serieBodyPrice = ALLCOMPONENTS.serie.body[serieBodyIndex].price.structure;
        }
        if (model.color.lacquer == 'gloss') {
            serieBodyPrice = ALLCOMPONENTS.serie.body[serieBodyIndex].price.gloss;
        }
        if (model.color.lacquer == 'veneer') {
            serieBodyPrice = ALLCOMPONENTS.serie.body[serieBodyIndex].price.veneer;
        }
    }
    model.articleList.body = { "code": ALLCOMPONENTS.serie.body[serieBodyIndex].code, "color": model.color.code, "interiorColor": model.interiorColor.code };

    let seriePrice = serieBodyPrice;
    let serieReducedPrice = serieBodyReducedPrice;
    if (serieBodyReducedPrice != undefined) {
        document.querySelector('.productInfoPrice').textContent = 'EURO ' + serieReducedPrice + ',-';
        document.querySelector('.productInfoName').textContent = ALLCOMPONENTS.serie.combination[combinationMazeIndex].name;
    }
    else {
        document.querySelector('.productInfoPrice').textContent = 'EURO ' + seriePrice + ',-';
        document.querySelector('.productInfoName').textContent = null;
    }

}