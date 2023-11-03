//price & articleList
function pricing(model) {
    const articleList = [];
    Object.assign(model, { articleList: {} });

    if (model.type == "cabinet") {
        let cabinetBodyPrice;
        let cabinetBodyReducedPrice;
        let cabinetWinerackPrice;
        let cabinetShelfPrice;

        let cabinetBodyIndex = ALLCOMPONENTS.cabinet.body.findIndex(item => item.width == model.width && item.height == model.height);
        let cabinetWinerackIndex = ALLCOMPONENTS.cabinet.winerack.findIndex(item => item.width == model.width);
        let cabinetShelfIndex = ALLCOMPONENTS.cabinet.shelf.findIndex(item => item.width == model.width);

        //body
        let combinationCabinetIndex = ALLCOMPONENTS.cabinet.combination.findIndex(item => item.width == model.width && item.height == model.height && model.outsideColor.color == item.outsideColor.color && model.outsideColor.lacquer == item.outsideColor.lacquer && model.insideColor.color == item.insideColor);
        if (combinationCabinetIndex != -1) {
            cabinetBodyPrice = ALLCOMPONENTS.cabinet.combination[combinationCabinetIndex].price.original;
            cabinetBodyReducedPrice = ALLCOMPONENTS.cabinet.combination[combinationCabinetIndex].price.reduced;
        } else {
            if (model.outsideColor.lacquer == 'veneer') {
                cabinetBodyPrice = ALLCOMPONENTS.cabinet.body[cabinetBodyIndex].price.veneer;
            } else {
                if (model.outsideColor.color == model.insideColor.color) {
                    cabinetBodyPrice = ALLCOMPONENTS.cabinet.body[cabinetBodyIndex].price.monotone;
                } else {
                    cabinetBodyPrice = ALLCOMPONENTS.cabinet.body[cabinetBodyIndex].price.duotone;
                }
            }
        }
        model.articleList.body = { "code": ALLCOMPONENTS.cabinet.body[cabinetBodyIndex].code, "outsideColor": model.outsideColor.code, "insideColor": model.insideColor.code };
        //winerack
        if (model.winerack == true) {
            cabinetWinerackPrice = ALLCOMPONENTS.cabinet.winerack[cabinetWinerackIndex].price;
            if (model.winerackColor == "outsidecolor") {
                model.articleList.winerack = { "code": ALLCOMPONENTS.cabinet.winerack[cabinetWinerackIndex].code, "color": model.outsideColor.code };
            } else {
                model.articleList.winerack = { "code": ALLCOMPONENTS.cabinet.winerack[cabinetWinerackIndex].code, "color": model.insideColor.code };
            }
        } else {
            cabinetWinerackPrice = 0;
        }
        //shelf
        if (model.shelves != undefined && model.shelves != 0) {
            cabinetShelfPrice = ALLCOMPONENTS.cabinet.shelf[cabinetShelfIndex].price;
            model.articleList.shelf = { "code": ALLCOMPONENTS.cabinet.shelf[cabinetShelfIndex].code, "color": model.insideColor.code, "amount": model.shelves };
        } else {
            cabinetShelfPrice = 0;
        }
        cabinetShelfPrice = cabinetShelfPrice * model.shelves;

        let cabinetPrice = cabinetBodyPrice + cabinetWinerackPrice + cabinetShelfPrice;
        let cabinetReducedPrice = cabinetBodyReducedPrice + cabinetWinerackPrice + cabinetShelfPrice;
        if (cabinetBodyReducedPrice != undefined) {
            document.getElementById('price').textContent = '€ ' + cabinetReducedPrice + ',-';
            document.getElementById('name').textContent = ALLCOMPONENTS.cabinet.combination[combinationCabinetIndex].name;
        }
        else {
            document.getElementById('price').textContent = '€ ' + cabinetPrice + ',-';
            document.getElementById('name').textContent = null;
        }
    }

    if (model.type == "sideboard") {
        let sideboardBodyPrice;
        let sideboardBodyReducedPrice;
        let sideboardBodyIndex = ALLCOMPONENTS.sideboard.body.findIndex(item => item.width == model.width);
        //body
        let combinationSideboardIndex = ALLCOMPONENTS.sideboard.combination.findIndex(item => item.width == model.width && item.outsideColor.color == model.outsideColor.color && item.outsideColor.lacquer == model.outsideColor.lacquer && item.insideColor == model.insideColor.color);
        if (combinationSideboardIndex != -1) {
            sideboardBodyPrice = ALLCOMPONENTS.sideboard.combination[combinationSideboardIndex].price.original;
            sideboardBodyReducedPrice = ALLCOMPONENTS.sideboard.combination[combinationSideboardIndex].price.reduced;
        } else {
            if (model.outsideColor.color == model.insideColor.color) {
                sideboardBodyPrice = ALLCOMPONENTS.sideboard.body[sideboardBodyIndex].price.monotone;
            } else {
                sideboardBodyPrice = ALLCOMPONENTS.sideboard.body[sideboardBodyIndex].price.duotone;
            }
        }
        model.articleList.body = { "code": ALLCOMPONENTS.sideboard.body[sideboardBodyIndex].code, "outsideColor": model.outsideColor.code, "insideColor": model.insideColor.code };
        if (sideboardBodyReducedPrice != undefined) {
            document.getElementById('price').textContent = '€ ' + sideboardBodyReducedPrice + ',-';
            document.getElementById('name').textContent = ALLCOMPONENTS.sideboard.combination[combinationSideboardIndex].name;
        } else {
            document.getElementById('price').textContent = '€ ' + sideboardBodyPrice + ',-';
            document.getElementById('name').textContent = null;
        }
    }
    if (model.type == "sideboardOnFrame") {
        let sideboardOnFrameBodyPrice;
        let sideboardOnFrameBodyReducedPrice;
        let sideboardOnFrameBodyIndex = ALLCOMPONENTS.sideboardOnFrame.body.findIndex(item => item.width == model.width && item.interior == model.interior);
        //body
        var combinationSideboardOnFrameIndex = ALLCOMPONENTS.sideboardOnFrame.combination.findIndex(item => item.width == model.width && item.outsideColor.color == model.outsideColor.color && item.outsideColor.lacquer == model.outsideColor.lacquer && item.insideColor == model.insideColor.color && item.interior == model.interior);
        if (combinationSideboardOnFrameIndex != -1) {
            sideboardOnFrameBodyPrice = ALLCOMPONENTS.sideboardOnFrame.combination[combinationSideboardOnFrameIndex].price.original;
            sideboardOnFrameBodyReducedPrice = ALLCOMPONENTS.sideboardOnFrame.combination[combinationSideboardOnFrameIndex].price.reduced;
        } else {
            if (model.outsideColor.color == model.insideColor.color) {
                sideboardOnFrameBodyPrice = ALLCOMPONENTS.sideboardOnFrame.body[sideboardOnFrameBodyIndex].price.monotone;
            } else {
                sideboardOnFrameBodyPrice = ALLCOMPONENTS.sideboardOnFrame.body[sideboardOnFrameBodyIndex].price.duotone;
            }
        }
        model.articleList.body = { "code": ALLCOMPONENTS.sideboardOnFrame.body[sideboardOnFrameBodyIndex].code, "outsideColor": model.outsideColor.code, "insideColor": model.insideColor.code };
        if (sideboardOnFrameBodyReducedPrice != undefined) {
            document.getElementById('price').textContent = '€ ' + sideboardOnFrameBodyReducedPrice + ',-';
            document.getElementById('name').textContent = ALLCOMPONENTS.sideboardOnFrame.combination[combinationSideboardOnFrameIndex].name;
        } else {
            document.getElementById('price').textContent = '€ ' + sideboardOnFrameBodyPrice + ',-';
            document.getElementById('name').textContent = null;
        }
    }
    if (model.type == "sideboardOnFrameTV") {
        var sideboardOnFrameTVBodyPrice;
        let sideboardOnFrameTVBodyIndex = ALLCOMPONENTS.sideboardOnFrameTV.body.findIndex(
            item => item.width == model.width
        );
        //body              
        if (model.outsideColor.color == model.insideColor.color) {
            sideboardOnFrameTVBodyPrice = ALLCOMPONENTS.sideboardOnFrameTV.body[sideboardOnFrameTVBodyIndex].price.monotone;
        } else {
            sideboardOnFrameTVBodyPrice = ALLCOMPONENTS.sideboardOnFrameTV.body[sideboardOnFrameTVBodyIndex].price.duotone;
        }
        model.articleList.body = { "code": ALLCOMPONENTS.sideboardOnFrameTV.body[sideboardOnFrameTVBodyIndex].code, "outsideColor": model.outsideColor.code, "insideColor": model.insideColor.code };
        document.getElementById('price').textContent = '€ ' + sideboardOnFrameTVBodyPrice + ',-';
        document.getElementById('name').textContent = null;
    }
}