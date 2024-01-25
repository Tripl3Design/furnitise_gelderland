//price & articleList
function pricing(model) {
    const articleList = [];
    Object.assign(model, { articleList: {} });
        document.querySelector('.productInfoPrice').textContent = '€ ' + (model.elements.length * 989) + ',-';
        document.querySelector('.productInfoName').textContent = null;
}