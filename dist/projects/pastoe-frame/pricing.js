//price & articleList
function pricing(model) {
    const articleList = [];
    Object.assign(model, { articleList: {} });

        if (model.type == "F02") {
            if (model.glasstop == true) {
                if (model.color.lacquer == 'veneer') {
                    document.querySelector('.productInfoPrice').textContent = "€ 3950,-";
                } else {
                    document.querySelector('.productInfoPrice').textContent = "€ 3125,-";
                }
            } else {
                if (model.color.lacquer == 'veneer') {
                    document.querySelector('.productInfoPrice').textContent = "€ 3575,-";
                } else {
                    document.querySelector('.productInfoPrice').textContent = "€ 2750,-";
                }
            }
        }
        if (model.type == "F03") {
            if (model.glasstop == true) {
                if (model.color.lacquer == 'veneer') {
                    document.querySelector('.productInfoPrice').textContent = "€ 2870,-";
                } else {
                    document.querySelector('.productInfoPrice').textContent = "€ 2275,-";
                }
            } else {
                if (model.color.lacquer == 'veneer') {
                    document.querySelector('.productInfoPrice').textContent = "€ 2570,-";
                } else {
                    document.querySelector('.productInfoPrice').textContent = "€ 1975,-";
                }
            }
        }
        if (model.type == "F07") {
            if (model.glasstop == true) {
                if (model.color.lacquer == 'veneer') {
                    document.querySelector('.productInfoPrice').textContent = "€ 3135,-";
                } else {
                    document.querySelector('.productInfoPrice').textContent = "€ 2475,-";
                }
            } else {
                if (model.color.lacquer == 'veneer') {
                    document.querySelector('.productInfoPrice').textContent = "€ 2860,-";
                } else {
                    document.querySelector('.productInfoPrice').textContent = "€ 2200,-";
                }
            }
        }
}