"use strict"
var UNITY_INSTANCE;
var ALLMODELS;
var ALLCOLORS;
var ALLCOMPONENTS;
var FEATUREDMODEL;

var DECORWALLINDEX = 0;
var DECORFLOORINDEX = 0;

const urlParams = new URLSearchParams(window.location.search);

downloadPdf(model, mainImage, output);

// used by FromUnityToJavascript.jslib
async function uploadRenderTexture(blob, medium) {
    const result = await blobToBase64(blob);
    downloadPdf(FEATUREDMODEL, result);
}

function blobToBase64(blob) {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}

function generateRenderTexture(medium) {
    const renderTexture = {
        medium: medium,
        angleName: "perspective",
        widthForImage: FEATUREDMODEL.width,
        heightForImage: FEATUREDMODEL.height,
        depthForImage: 36
    };
    UNITY_INSTANCE.SendMessage('LSerieMaze', 'SaveRenderTexture', JSON.stringify(renderTexture));
}

function shareConfiguration(model) {
    window.location.href = `whatsapp://send?text=See%20my%20configuration!%20https://furnitise.nl/demos?brand=${brand}&product=${product}&data=${encodeURIComponent(JSON.stringify(model))}`
}

function submitForm() {
    window.parent.postMessage(
        JSON.stringify(FEATUREDMODEL.articleList),
        "https://www.pastoe.com",
    );

    console.log(JSON.stringify(FEATUREDMODEL.articleList));
}

// used by FromUnityToJavascript.jslib
async function downloadModel(blob, fileName) {
    const result = await blobToBase64(blob);
    downloadModel(result);
}

function downloadModelButton() {
    UNITY_INSTANCE.SendMessage('Amsterdammer', 'ModelExport');
}

function downloadModel(bytes) {
    console.log('MODEL DOWNLOADED!!! ' + bytes);
}

function updateFeaturedModel(model) {
    UNITY_INSTANCE.SendMessage('LSerieMaze', 'SetLSerieMaze', JSON.stringify(model));
}

function addDecor(modelType, modelWidth, modelHeight, modelDepth, TvHeight, TvDistanceFromWall, wallColor, wallPath, floorColor, floorPath) {
    const decor = {
        typeForDecor: modelType,
        widthForDecor: modelWidth,
        heightForDecor: modelHeight,
        depthForDecor: modelDepth,
        heightForTV: TvHeight,
        distanceFromWall: TvDistanceFromWall,
        colorForWall: wallColor,
        pathForWall: wallPath,
        colorForFloor: floorColor,
        pathForFloor: floorPath
    };
    UNITY_INSTANCE.SendMessage('LSerieMaze', 'AddDecor', JSON.stringify(decor));
}

function toggleDecor(toggle) {
    UNITY_INSTANCE.SendMessage('LSerieMaze', 'ToggleDecor', toggle);
}

function updateCamera(modelWidth, modelHeight) {
    var size = {
        width: modelWidth,
        height: modelHeight
    };
    UNITY_INSTANCE.SendMessage('LSerieMaze', 'SetFLCamera', JSON.stringify(size));
}

function updateControlPanel(model, selectedLayer, expandedLayer) {
    const settings = initSettings(model);
    const elem = document.getElementById('controlpanelContainer');
    if (selectedLayer !== undefined) {
        controlPanel_updateLayer(selectedLayer, settings);
    } else {
        controlPanel(settings, ALLMODELS, elem, expandedLayer);
    }

    //toggle featuredModels carrousel
    let featuredModels = document.getElementById('featuredModels');
    if (urlParams.has('noFeaturedModels')) {
        featuredModels.classList.remove('d-block');
        featuredModels.classList.add('d-none');
    } else {
        featuredModels.classList.remove('d-none');
        featuredModels.classList.add('d-block');
    }

    //background
    if (model.background.lighter == undefined) {
        var bgColor = pSBC(0, '#' + model.background.original);
        model.background = { "original": model.background.original, "lighter": bgColor.substring(1) };
    }

    //decor wall
    const decorWallValue = document.querySelectorAll('.decorWallColors_colorButton');

    decorWallValue.forEach(item => item.addEventListener('click', () => {
        decorWallValue.forEach(item => { item.classList.remove('colorButtonActive') });
        const decorWallId = item.id.split('_');
        DECORWALLINDEX = decorWallId[1];
        updateControlPanel(model, 'decor');
        showSelected();
    }));
    document.getElementById('wallText').innerHTML = '<img src="https://' + window.location.host + '/' + ALLCOLORS.decorWall[DECORWALLINDEX].colorPathThumb + '" class="rounded-pill shadow" style="width: calc(1rem + 1vw);">';
    document.getElementById('decorWallColorsIndex_' + DECORWALLINDEX).classList.remove('colorButton');
    document.getElementById('decorWallColorsIndex_' + DECORWALLINDEX).classList.add('colorButtonActive');

    //decor floor
    const decorFloorValue = document.querySelectorAll('.decorFloorColors_colorButton');

    decorFloorValue.forEach(item => item.addEventListener('click', () => {
        decorFloorValue.forEach(item => { item.classList.remove('colorButtonActive') });
        const decorFloorId = item.id.split('_');
        DECORFLOORINDEX = decorFloorId[1];
        updateControlPanel(model, 'decor');
        showSelected();
    }));
    document.getElementById('floorText').innerHTML = '<img src="https://' + window.location.host + '/' + ALLCOLORS.decorFloor[DECORFLOORINDEX].colorPathThumb + '" class="rounded-pill shadow" style="width: calc(1rem + 1vw);">';
    document.getElementById('decorFloorColorsIndex_' + DECORFLOORINDEX).classList.remove('colorButton');
    document.getElementById('decorFloorColorsIndex_' + DECORFLOORINDEX).classList.add('colorButtonActive');

    //size
    //width 
    if (model.width == 101) {
        document.getElementById('w101').checked = true;

        document.getElementById('h80').disabled = true;
        document.getElementById('h112').disabled = false;
        document.getElementById('h144').disabled = true;
        document.getElementById('h176').disabled = false;
        document.getElementById('h208').disabled = true;
    }
    if (model.width == 133) {
        document.getElementById('w133').checked = true;

        document.getElementById('h80').disabled = true;
        document.getElementById('h112').disabled = false;
        document.getElementById('h144').disabled = false;
        document.getElementById('h176').disabled = true;
        document.getElementById('h208').disabled = true;
    }
    if (model.width == 197) {
        document.getElementById('w197').checked = true;

        document.getElementById('h80').disabled = false;
        document.getElementById('h112').disabled = true;
        document.getElementById('h144').disabled = true;
        document.getElementById('h176').disabled = true;
        document.getElementById('h208').disabled = false;
    }
    if (model.width == 261) {
        document.getElementById('w261').checked = true;

        document.getElementById('w261').checked = true;
        document.getElementById('h80').checked = true;
        document.getElementById('h80').disabled = false;
        document.getElementById('h112').disabled = true;
        document.getElementById('h144').disabled = true;
        document.getElementById('h176').disabled = true;
        document.getElementById('h208').disabled = true;
    }

    const widthValues = document.querySelectorAll('input[type=radio][name="width"]');
    for (const widthValue of widthValues) {
        widthValue.onclick = (width) => {

            model.width = width.target.value;

            if (model.width == 101) {
                if (model.height == 176) {
                    document.getElementById('h176').checked = true;
                    model.variant = 'combinationL110';
                } else {
                    model.height = 112;
                    document.getElementById('h112').checked = true;
                    model.variant = 'combinationL106';
                }
            }
            if (model.width == 133) {
                if (model.height == 144) {
                    document.getElementById('h144').checked = true;
                    model.variant = 'combinationL74';
                } else {
                    model.height = 112;
                    document.getElementById('h112').checked = true;
                    if (model.variant != 'combinationL71' || model.variant != 'combinationL80') {
                        model.variant = 'combinationL71';
                    }
                }
            }
            if (model.width == 197) {
                if (model.height == 208) {
                    document.getElementById('h208').checked = true;
                    model.variant = 'combinationL127';
                } else {
                    model.height = 80;
                    document.getElementById('h80').checked = true;
                    if (model.variant != 'combinationL148' || model.variant != 'combinationL149') {
                        model.variant = 'combinationL148';
                    }
                }
            }
            if (model.width == 261) {
                model.height = 80;
                document.getElementById('h80').checked = true;
                if (model.variant != 'combinationLJ08' || model.variant != 'combinationL94') {
                    model.variant = 'combinationLJ08';
                }
            }
            updateCamera(model.width, model.height);
            updateControlPanel(model, undefined, 'size');
            updateFeaturedModel(model);
            showSelected();
        }
    }
    document.getElementById('widthText').textContent = 'width ' + document.getElementById('w' + model.width).value + ' cm';

    //height
    document.getElementById('h' + model.height).checked = true;

    const heightValues = document.querySelectorAll('input[type=radio][name="height"]');
    for (const heightValue of heightValues) {
        heightValue.onclick = (height) => {

            model.height = height.target.value;

            if (model.width == 101) {
                if (document.getElementById('h112').checked == true) {
                    model.variant = 'combinationL106';
                } else {
                    document.getElementById('h176').checked = true;
                    model.variant = 'combinationL110';
                }
            }
            if (model.width == 133) {
                if (document.getElementById('h144').checked != true) {
                    document.getElementById('h112').checked = true;
                    if (model.variant != 'combinationL71') {
                        model.variant = 'combinationL80';
                    }
                } else {
                    document.getElementById('h144').checked = true;
                    model.variant = 'combinationL74';
                }
            }
            if (model.width == 197) {
                if (document.getElementById('h208').checked != true) {
                    document.getElementById('h80').checked = true;
                    model.variant = 'combinationL148';
                } else {
                    document.getElementById('h208').checked = true;
                    model.variant = 'combinationL127';
                }
            }
            if (model.width == 261) {
                document.getElementById('h80').checked = true;
                if (model.variant == 'combinationLJ08') {
                    document.getElementById('combinationLJ08').checked = true;
                }
                if (model.variant == 'combinationL94') {
                    document.getElementById('combinationL94').checked = true;
                } else {
                    model.variant = 'combinationLJ08';
                    document.getElementById('combinationLJ08').checked = true;
                }
            }
            updateCamera(model.width, model.height);
            updateControlPanel(model, undefined, 'size');
            updateFeaturedModel(model);
            showSelected();
        }
    }
    document.getElementById('heightText').textContent = 'height ' + document.getElementById('h' + model.height).value + ' cm';

    //variant
    if (model.width == 133 && model.height == 112 || model.width == 197 && model.height == 80 || model.width == 261 && model.height == 80) {
        document.getElementById(model.variant).checked = true;

        const variantValues = document.querySelectorAll('input[type=radio][name="variant"]');
        for (const variantValue of variantValues) {
            variantValue.onclick = (variant) => {

                model.variant = variant.target.id;

                updateControlPanel(model, 'variant');
                updateFeaturedModel(model);
                showSelected();
            }
        }
        document.getElementById('variantText').textContent = document.getElementById(model.variant).value;
    }

    //color lacquer
    let colorLacquer = document.querySelectorAll('input[type=radio][name="colorsLacquer"]');
    colorLacquer.forEach(radio => { radio.replaceWith(radio.cloneNode(true)) });
    colorLacquer = document.querySelectorAll('input[type=radio][name="colorsLacquer"]');
    if (model.color.lacquer == "veneer") {
        document.getElementById('colorsLacquer_basic').disabled = true;
        document.getElementById('colorsLacquer_structure').disabled = true;
        document.getElementById('colorsLacquer_gloss').disabled = true;
        document.getElementById('colorsLacquer_veneer').checked = true;
    } else {
        document.getElementById('colorsLacquer_basic').disabled = false;
        document.getElementById('colorsLacquer_structure').disabled = false;
        document.getElementById('colorsLacquer_gloss').disabled = false;
        document.getElementById('colorsLacquer_' + model.color.lacquer).checked = true;
    }
    colorLacquer.forEach(radio => radio.addEventListener('click', () => {
        model.color.lacquer = radio.value;
        document.getElementById('colorsLacquer_' + model.color.lacquer).checked = true;
        updateControlPanel(model, 'colors');
        updateFeaturedModel(model);
        showSelected(true);
    }));

    //color color
    const color = model.color.color;
    var colorIndex = ALLCOLORS.colors.findIndex((item) => item.colorHex === color);
    var colorValue = document.querySelectorAll('.colors_colorButton');

    if (parser.getDevice().type != 'mobile' && parser.getDevice().type != 'tablet') {
        colorValue.forEach(item => item.addEventListener('mouseover', () => {
            document.getElementById('colorsText').style.visibility = 'visible';
            document.getElementById('colorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: ' + document.getElementById(item.id).style.backgroundColor + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + document.getElementById(item.id).alt + '';
            document.getElementById('colorsText').classList.add('fst-italic');
            showSelected(true);
        }));

        colorValue.forEach(item => item.addEventListener('mouseout', () => {
            document.getElementById('colorsText').style.visibility = 'hidden';
            document.getElementById('colorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: #' + model.color.color + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + ALLCOLORS.colors[colorIndex].colorName + '';
            document.getElementById('colorsText').classList.remove('fst-italic');
            showSelected(true);
        }));
    }

    colorValue.forEach(item => item.addEventListener('click', () => {
        colorValue.forEach(item => { item.classList.remove('colorButtonActive') });
        const colorId = item.id.split('_');
        colorIndex = colorId[1];

        if (ALLCOLORS.colors[colorIndex].colorPath != undefined) {
            model.color = { "color": ALLCOLORS.colors[colorIndex].colorHex, "path": ALLCOLORS.colors[colorIndex].colorPath, "lacquer": "veneer" };
            document.getElementById('colorsLacquer_basic').disabled = true;
            document.getElementById('colorsLacquer_structure').disabled = true;
            document.getElementById('colorsLacquer_gloss').disabled = true;
            document.getElementById('colorsLacquer_veneer').checked = true;
        } else {
            if (model.color.lacquer != undefined && model.color.lacquer != "veneer") {
                model.color = { "color": ALLCOLORS.colors[colorIndex].colorHex, "lacquer": model.color.lacquer };
            } else {
                model.color = { "color": ALLCOLORS.colors[colorIndex].colorHex, "lacquer": "basic" };
            }
            document.getElementById('colorsLacquer_basic').disabled = false;
            document.getElementById('colorsLacquer_structure').disabled = false;
            document.getElementById('colorsLacquer_gloss').disabled = false;
            document.getElementById('colorsLacquer_' + model.color.lacquer).checked = true;
        }
        updateControlPanel(model, 'colors');
        updateFeaturedModel(model);
        showSelected(true);
    }));
    if (ALLCOLORS.colors[colorIndex].colorPath != undefined) {
        model.color.code = ALLCOLORS.colors[colorIndex].colorCode;
        model.color.name = ALLCOLORS.colors[colorIndex].colorName;
        document.getElementById('colorsText').innerHTML = '<img src="https://' + window.location.host + '/' + ALLCOLORS.colors[colorIndex].colorPathThumb + '" class="rounded-pill shadow" style="width: calc(1rem + 1vw);">&nbsp;&nbsp;&nbsp;&nbsp;' + model.color.name;
    } else {
        if (model.color.lacquer == "basic") {
            model.color.code = ALLCOLORS.colors[colorIndex].colorCode.basic;
        }
        if (model.color.lacquer == "structure") {
            model.color.code = ALLCOLORS.colors[colorIndex].colorCode.structure;
        }
        if (model.color.lacquer == "gloss") {
            model.color.code = ALLCOLORS.colors[colorIndex].colorCode.gloss;
        }
        model.color.name = ALLCOLORS.colors[colorIndex].colorName;
        document.getElementById('colorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: #' + model.color.color + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + model.color.name;
    }
    document.getElementById('colorsIndex_' + colorIndex).classList.remove('colorButton');
    document.getElementById('colorsIndex_' + colorIndex).classList.add('colorButtonActive');

    //interior color
    const interiorColor = model.interiorColor.color;
    var interiorColorIndex = ALLCOLORS.colors.findIndex((item) => item.colorHex == interiorColor);
    var interiorColorValue = document.querySelectorAll('.interiorColors_colorButton');

    if (parser.getDevice().type != 'mobile' && parser.getDevice().type != 'tablet') {
        interiorColorValue.forEach(item => item.addEventListener('mouseover', () => {
            document.getElementById('interiorColorsText').style.visibility = 'visible';
            document.getElementById('interiorColorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: ' + document.getElementById(item.id).style.backgroundColor + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + document.getElementById(item.id).alt + '';
            document.getElementById('interiorColorsText').classList.add('fst-italic');
            showSelected(true);
        }));

        interiorColorValue.forEach(item => item.addEventListener('mouseout', () => {
            document.getElementById('interiorColorsText').style.visibility = 'hidden';
            document.getElementById('interiorColorsText').classList.remove('fst-italic');
            showSelected(true);
        }));
    }

    interiorColorValue.forEach(item => item.addEventListener('click', () => {
        interiorColorValue.forEach(item => { item.classList.remove('colorButtonActive') });
        const interiorColorId = item.id.split('_');
        interiorColorIndex = interiorColorId[1];

        model.interiorColor = { "color": ALLCOLORS.colors[interiorColorIndex].colorHex, "lacquer": "structure" };
        document.getElementById('interiorColorsIndex_' + interiorColorIndex).classList.add('colorButtonActive');

        updateControlPanel(model, 'interiorColors');
        updateFeaturedModel(model);
        showSelected(true);
    }));
    model.interiorColor.code = ALLCOLORS.colors[interiorColorIndex].colorCode.structure;
    model.interiorColor.name = ALLCOLORS.colors[interiorColorIndex].colorName;
    document.getElementById('interiorColorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: #' + model.interiorColor.color + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + model.interiorColor.name;
    document.getElementById('interiorColorsIndex_' + interiorColorIndex).classList.remove('colorButton');
    document.getElementById('interiorColorsIndex_' + interiorColorIndex).classList.add('colorButtonActive');

    //handle color
    const handleColor = model.handleColor.color;
    var handleColorIndex = ALLCOLORS.handleColors.findIndex((item) => item.colorHex == handleColor);
    var handleColorValue = document.querySelectorAll('.handleColors_colorButton');

    if (parser.getDevice().type != 'mobile' && parser.getDevice().type != 'tablet') {
        handleColorValue.forEach(item => item.addEventListener('mouseover', () => {
            document.getElementById('handleColorsText').style.visibility = 'visible';
            document.getElementById('handleColorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: ' + document.getElementById(item.id).style.backgroundColor + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + document.getElementById(item.id).alt + '';
            document.getElementById('handleColorsText').classList.add('fst-italic');
            showSelected(true);
        }));

        handleColorValue.forEach(item => item.addEventListener('mouseout', () => {
            document.getElementById('handleColorsText').style.visibility = 'hidden';
            document.getElementById('handleColorsText').classList.remove('fst-italic');
            showSelected(true);
        }));
    }

    handleColorValue.forEach(item => item.addEventListener('click', () => {
        handleColorValue.forEach(item => { item.classList.remove('colorButtonActive') });
        const handleColorId = item.id.split('_');
        handleColorIndex = handleColorId[1];

        model.handleColor = { "color": ALLCOLORS.handleColors[handleColorIndex].colorHex };
        document.getElementById('handleColorsIndex_' + handleColorIndex).classList.add('colorButtonActive');

        updateControlPanel(model, 'handleColors');
        updateFeaturedModel(model, false);
        showSelected(true);
    }));
    model.handleColor.name = ALLCOLORS.handleColors[handleColorIndex].colorName;
    document.getElementById('handleColorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: #' + model.handleColor.color + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + model.handleColor.name;
    document.getElementById('handleColorsIndex_' + handleColorIndex).classList.remove('colorButton');
    document.getElementById('handleColorsIndex_' + handleColorIndex).classList.add('colorButtonActive');

    pricing(model);

    // Decor
    addDecor("l-serie", model.width, model.height, 45, model.height, 0, ALLCOLORS.decorWall[DECORWALLINDEX].colorHex, ALLCOLORS.decorWall[DECORWALLINDEX].colorPath, ALLCOLORS.decorFloor[DECORFLOORINDEX].colorHex, ALLCOLORS.decorFloor[DECORFLOORINDEX].colorPath);

    // is global FEATUREDMODEL for pdf really necessary?
    FEATUREDMODEL = model;
}

function showFeaturedModel(model) {
    updateCamera(model.width, model.height);
    updateControlPanel(model);
    updateFeaturedModel(model);
}

function showFeaturedModelByIndex(index) {
    showFeaturedModel(JSON.parse(JSON.stringify(ALLMODELS[index])));
}

async function handleModelSelection() {
    var canvas = document.getElementById("modelviewer");
    var buildUrl = `https://${brand}-${product}.web.app/projects/${brand}-${product}`;
    var config = {
        dataUrl: `${buildUrl}/Build/${brand}-${product}.data`,
        frameworkUrl: `${buildUrl}/Build/${brand}-${product}.framework.js`,
        codeUrl: `${buildUrl}/Build/${brand}-${product}.wasm`,
        //streamingAssetsUrl: "StreamingAssets",
        companyName: 'TripleDesign',
        productName: product.charAt(0).toUpperCase() + product.slice(1),
        productVersion: '0.1',
    };

    const unityPromise = createUnityInstance(canvas, config, (progress) => {
        progressBar.style.width = 100 * progress + '%';
    });
    const colorsPromise = fetch(`${buildUrl}/colors.json`).then(response => response.json());
    const componentsPromise = fetch(`${buildUrl}/components.json`).then(response => response.json());
    UNITY_INSTANCE = await unityPromise;
    ALLCOLORS = await colorsPromise;
    ALLCOMPONENTS = await componentsPromise;


    //initConfigurator(brand, product, title);


    console.log(`BRAND: ${brand}, PRODUCT  ${product}, TITLE ${title}`);

    const modelsPromise = fetch(`projects/${brand}-${product}/models.json`).then(response => response.json());
    ALLMODELS = await modelsPromise;

    loadingScreen();

    let modelIndex;
    let modelId;
    let modelData;
    if (urlParams.has('id')) {
        modelId = urlParams.get('id');
        modelIndex = ALLMODELS.findIndex((item) => item.id == modelId);
        showFeaturedModel(ALLMODELS[modelIndex]);
    }
    else if (urlParams.has('data')) {
        modelData = urlParams.get('data');
        let model = JSON.parse(decodeURIComponent(modelData));
        showFeaturedModel(model);
    } else {
        modelIndex = Math.floor(Math.random() * ALLMODELS.length);
        showFeaturedModel(ALLMODELS[modelIndex]);
    }
}

function initSettings(model) {
    const accordions = {};
    let noSize;
    if (urlParams.has('noSize')) {
        noSize = "d-none";
    } else {
        noSize = "d-block";
    }
    let noVariant;
    if (urlParams.has('noVariant')) {
        noVariant = "d-none";
    } else {
        noVariant = "d-block";
    }
    let noDecor;
    if (parser.getDevice().type == 'mobile' || urlParams.has('noDecor')) {
        noDecor = "d-none";
    } else {
        noDecor = "d-block";
    }
    accordions.size = {
        "title": "size",
        "options": ['width', 'height'],
        "display": noSize,
        "code": /*html*/ `
        <div class="row m-0 p-0 pb-2">
            <div class="row m-0 p-0 pb-2">
                <div class="d-flex justify-content-start m-0 p-0">
                    <div class="card border-0 me-5">
                        <div class="h6">width</div>
                        <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                            <input type="radio" class="form-check-input" name="width" value="101" id="w101">
                            <label class="form-check-label" for="w101">101 cm</label>
                        </div>
                        <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                            <input type="radio" class="form-check-input" name="width" value="133" id="w133">
                            <label class="form-check-label" for="w133">133 cm</label> 
                        </div>
                        <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                            <input type="radio" class="form-check-input" name="width" value="197" id="w197">
                            <label class="form-check-label" for="w133">197 cm</label> 
                        </div>
                        <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                            <input type="radio" class="form-check-input" name="width" value="261" id="w261">
                            <label class="form-check-label" for="w261">261 cm</label> 
                        </div>
                    </div>
                    <div class="card border-0">
                        <div class="h6">height</div>
                        <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                            <input type="radio" class="form-check-input" name="height" value="80" id="h80">
                            <label class="form-check-label" for="h80">80 cm</label>
                        </div>
                        <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                            <input type="radio" class="form-check-input" name="height" value="112" id="h112">
                            <label class="form-check-label" for="h112">112 cm</label> 
                        </div>
                        <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                            <input type="radio" class="form-check-input" name="height" value="144" id="h144">
                            <label class="form-check-label" for="h144">144 cm</label> 
                        </div>
                        <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                            <input type="radio" class="form-check-input" name="height" value="176" id="h176">
                            <label class="form-check-label" for="h176">176 cm</label> 
                        </div>
                        <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                            <input type="radio" class="form-check-input" name="height" value="208" id="h208">
                            <label class="form-check-label" for="h208">208 cm</label> 
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>`
    }
    if (model.width == 133 && model.height == 112) {
        accordions.variant = {
            "title": "variant",
            "options": ['variant'],
            "display": noVariant,
            "code": /*html*/ `
            <div class="row m-0 p-0 pb-2">
                <div class="d-flex justify-content-start m-0 p-0">
                    <div class="card border-0">
                        <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                            <input type="radio" class="form-check-input" name="variant" value="combination L71" id="combinationL71">
                            <label class="form-check-label" for="combinationL71">combination L71</label>
                        </div>
                        <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                            <input type="radio" class="form-check-input" name="variant" value="combination L80" id="combinationL80">
                            <label class="form-check-label" for="combinationL80">combination L80</label>
                        </div>
                    </div>
                </div>
            </div>`
        }
    }
    if (model.width == 197 && model.height == 80) {
        accordions.variant = {
            "title": "variant",
            "options": ['variant'],
            "display": noVariant,
            "code": /*html*/ `
            <div class="row m-0 p-0 pb-2">
                <div class="d-flex justify-content-start m-0 p-0">
                    <div class="card border-0">
                        <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                            <input type="radio" class="form-check-input" name="variant" value="combination L148" id="combinationL148">
                            <label class="form-check-label" for="combinationL148">combination L148</label>
                        </div>
                        <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                            <input type="radio" class="form-check-input" name="variant" value="combination L149" id="combinationL149">
                            <label class="form-check-label" for="combinationL149">combination L149</label>
                        </div>
                    </div>
                </div>
            </div> `
        }
    }
    if (model.width == 261 && model.height == 80) {
        accordions.variant = {
            "title": "variant",
            "options": ['variant'],
            "display": noVariant,
            "code": /*html*/ `
            <div class="row m-0 p-0 pb-2">
                <div class="d-flex justify-content-start m-0 p-0">
                    <div class="card border-0">
                        <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                            <input type="radio" class="form-check-input" name="variant" value="combination L94" id="combinationL94">
                            <label class="form-check-label" for="combinationL94">combination L94</label>
                        </div>
                        <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                            <input type="radio" class="form-check-input" name="variant" value="combination LJ08" id="combinationLJ08">
                            <label class="form-check-label" for="combinationLJ08">combination LJ08</label>
                        </div>
                    </div>
                </div>
            </div> `
        }
    }
    accordions.colors = {
        "title": "colors",
        "options": ['colors'],
        "display": "d-block",
        "code": /*html*/ `
        <div class="row m-0 p-0 pb-2">
        <div class="col-5 m-0 p-0">
            <div class="row m-0 p-0 pb-2">
                <div class="d-flex justify-content-start m-0 p-0">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="colorsLacquer" id="colorsLacquer_basic" value="basic">
                        <label class="form-check-label" for="colorsLacquer">basic</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="colorsLacquer" id="colorsLacquer_structure" value="structure">
                        <label class="form-check-label" for="colorsLacquer">structure</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="colorsLacquer" id="colorsLacquer_gloss" value="gloss">
                        <label class="form-check-label" for="colorsLacquer">gloss</label>
                    </div>
                </div>
            </div>
            
            <div id="colorsColorPicker" class="m-0 p-0"></div>
        </div>
        <div class="col-1 m-0 p-0">
        </div>
        <div class="col-3 m-0 p-0">
            <div class="row m-0 p-0 pb-2">
                <div class="d-flex justify-content-start m-0 p-0">
                    <div class="form-check form-check-inline invisible">
                        <input class="form-check-input" type="radio" name="colorsLacquer" id="colorsLacquer_veneer" value="veneer">
                        <label class="form-check-label" for="colorsLacquer">veneer</label>
                    </div>
                </div>
                <div id="colorsTexturePicker" class="m-0 p-0"></div>
            </div>
        </div>
    </div>`,
        "onload": function () {
            let containerElem = document.getElementById("colorsColorPicker");
            addColors('colors', ALLCOLORS.colors, containerElem);
            containerElem = document.getElementById("colorsTexturePicker");
            addTextures('colors', ALLCOLORS.colors, containerElem);
        }
    }
    accordions.interiorColors = {
        "title": "interior colors",
        "options": ['interiorColors'],
        "display": "d-block",
        "code": /*html*/ `
        <div class="row m-0 p-0 pb-2">
        <div class="col-5 m-0 p-0">
            <div class="row m-0 p-0 pb-2">
                <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                        <div class="card border-0 pb-2">structure</div>
                    <div id="interiorColorsColorPicker" class="m-0 p-0"></div>
                </div>
            </div>
        </div>
    </div>`,
        "onload": function () {
            let containerElem = document.getElementById("interiorColorsColorPicker");
            addColors('interiorColors', ALLCOLORS.colors, containerElem);
        }
    }
    accordions.handleColors = {
        "title": "handles",
        "options": ['handleColors'],
        "display": "d-block",
        "code": /*html*/ `
        <div class="row m-0 p-0 pb-2">
        <div class="col-5 m-0 p-0">
            <div class="row m-0 p-0 pb-2">
                <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                    <div  id="handleColorsColorPicker" class="m-0 p-0"></div>
                </div>
            </div>
        </div>
    </div>`,
        "onload": function () {
            let containerElem = document.getElementById("handleColorsColorPicker");
            addColors('handleColors', ALLCOLORS.handleColors, containerElem);
        }
    }
    accordions.decor = {
        "title": "decor",
        "options": ['wall', 'floor'],
        "display": noDecor,
        "code": /*html*/ `
        <div class="row m-0 p-0 pb-2">
            <div class="col-4 m-0 p-0">
                <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                    <div class="card border-0 pb-2">wall</div>
                    <div  id="decorWallColorPicker" class="m-0 p-0"></div>
                </div>
            </div>
            <div class="col-2 m-0 p-0">
            </div>
            <div class="col-4 m-0 p-0">
                <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                    <div class="card border-0 pb-2">floor</div>
                    <div  id="decorFloorColorPicker" class="m-0 p-0"></div>
                </div>
            </div>
        </div> `,
        "onload": function () {
            let containerElemDecorColors = document.getElementById("decorWallColorPicker");
            addTextures('decorWallColors', ALLCOLORS.decorWall, containerElemDecorColors);
            let containerElemDecorTextures = document.getElementById("decorFloorColorPicker");
            addTextures('decorFloorColors', ALLCOLORS.decorFloor, containerElemDecorTextures);
        }
    }
    return { accordions };
}

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));