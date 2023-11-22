"use strict"

var UNITY_INSTANCE;
var ALLMODELS;
var ALLCOLORS;
var FEATUREDMODEL;
var FEATUREDMODELINDEX;

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
        widthForImage: 73,
        heightForImage: 87,
        depthForImage: 70
    };
    UNITY_INSTANCE.SendMessage('Frame', 'SaveRenderTexture', JSON.stringify(renderTexture));
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
    UNITY_INSTANCE.SendMessage('Frame', 'AddDecor', JSON.stringify(decor));
}

function toggleDecor(toggle) {
    UNITY_INSTANCE.SendMessage('Frame', 'ToggleDecor', toggle);
}

function updateFeaturedModel(model) {
    UNITY_INSTANCE.SendMessage('Frame', 'SetFrame', JSON.stringify(model));
}

function updateCamera(modelWidth, modelHeight) {
    var size = {
        width: modelWidth,
        height: modelHeight
    };
    UNITY_INSTANCE.SendMessage('Frame', 'SetFLCamera', JSON.stringify(size));
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
        showSelected(false);
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
        showSelected(false);
    }));
    document.getElementById('floorText').innerHTML = '<img src="https://' + window.location.host + '/' + ALLCOLORS.decorFloor[DECORFLOORINDEX].colorPathThumb + '" class="rounded-pill shadow" style="width: calc(1rem + 1vw);">';
    document.getElementById('decorFloorColorsIndex_' + DECORFLOORINDEX).classList.remove('colorButton');
    document.getElementById('decorFloorColorsIndex_' + DECORFLOORINDEX).classList.add('colorButtonActive');

    //price
    if (model.type == "F02") {
        if (model.glasstop == true) {
            if (model.color.path != undefined) {
                document.getElementById('price').textContent = "€ 3950,-";
            } else {
                document.getElementById('price').textContent = "€ 3125,-";
            }
        } else {
            if (model.color.path != undefined) {
                document.getElementById('price').textContent = "€ 3575,-";
            } else {
                document.getElementById('price').textContent = "€ 2750,-";
            }
        }
    }
    if (model.type == "F03") {
        if (model.glasstop == true) {
            if (model.color.path != undefined) {
                document.getElementById('price').textContent = "€ 2870,-";
            } else {
                document.getElementById('price').textContent = "€ 2275,-";
            }
        } else {
            if (model.color.path != undefined) {
                document.getElementById('price').textContent = "€ 2570,-";
            } else {
                document.getElementById('price').textContent = "€ 1975,-";
            }
        }
    }
    if (model.type == "F07") {
        if (model.glasstop == true) {
            if (model.color.path != undefined) {
                document.getElementById('price').textContent = "€ 3135,-";
            } else {
                document.getElementById('price').textContent = "€ 2475,-";
            }
        } else {
            if (model.color.path != undefined) {
                document.getElementById('price').textContent = "€ 2860,-";
            } else {
                document.getElementById('price').textContent = "€ 2200,-";
            }
        }
    }

    //type
    document.getElementById(model.type).checked = true;

    const typeValues = document.querySelectorAll('input[type=radio][name="type"]');
    for (const typeValue of typeValues) {
        typeValue.onclick = (type) => {

            model.type = undefined;
            model.type = type.target.value;

            if (model.type == 'F02') {
                updateCamera(270, 60);
            }
            if (model.type == 'F03') {
                updateCamera(180, 60);
            }
            if (model.type == 'F07') {
                updateCamera(140, 100);
            }
            updateControlPanel(model, 'type');
            updateFeaturedModel(model);
            showSelected(false);
        }
    }
    document.getElementById('typeText').textContent = document.getElementById(model.type).value;

    //options
    if (model.glasstop == true) {
        glasstop.checked = true;
    } else {
        glasstop.checked = false;
    }

    document.getElementById('glasstop').addEventListener('click', () => {
        let glasstop = document.getElementById('glasstop');
        if (glasstop.checked == true) {
            model.glasstop = true;
            if (model.glasstopcolor == undefined) {
                model.glasstopcolor = "020307";
            }
        } else {
            model.glasstop = false;
            model.glasstopcolor = undefined;
        }
        updateControlPanel(model);
        updateFeaturedModel(model);
        showSelected(false);
    });

    if (document.getElementById("glasstop").checked) {
        document.getElementById('optionsText').textContent = "glasstop";
    } else {
        document.getElementById('optionsText').textContent = "no glasstop";
    }

    //glasstop color
    if (model.glasstop == true) {
        const glasstopColor = model.glasstopcolor;
        var glasstopColorIndex = ALLCOLORS.glasstopColors.findIndex((item) => item.colorHex === glasstopColor);
        var glasstopColorValue = document.querySelectorAll('.glasstopColors_colorButton');

        if (parser.getDevice().type != 'mobile' && parser.getDevice().type != 'tablet') {
            glasstopColorValue.forEach(item => item.addEventListener('mouseover', () => {
                document.getElementById('glasstopColorsText').style.visibility = 'visible';
                document.getElementById('glasstopColorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: ' + document.getElementById(item.id).style.backgroundColor + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + document.getElementById(item.id).alt + '';
                document.getElementById('glasstopColorsText').classList.add('fst-italic');
                updateFeaturedModel(model, false);
                showSelected(true);
            }));

            glasstopColorValue.forEach(item => item.addEventListener('mouseout', () => {
                document.getElementById('glasstopColorsText').style.visibility = 'hidden';
                document.getElementById('glasstopColorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: #' + model.glasstopcolor + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + ALLCOLORS.glasstopColors[glasstopColorIndex].colorName + '';
                document.getElementById('glasstopColorsText').classList.remove('fst-italic');
                updateFeaturedModel(model, false);
                showSelected(true);
            }));
        }

        glasstopColorValue.forEach(item => item.addEventListener('click', () => {
            glasstopColorValue.forEach(item => { item.classList.remove('colorButtonActive') });
            const colorId = item.id.split('_');
            glasstopColorIndex = colorId[1];

            model.glasstopcolor = ALLCOLORS.glasstopColors[glasstopColorIndex].colorHex;

            updateControlPanel(model, 'glasstopColors');
            updateFeaturedModel(model);
            showSelected(true);
        }));
        document.getElementById('glasstopColorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: #' + model.glasstopcolor + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + ALLCOLORS.glasstopColors[glasstopColorIndex].colorName + '';
        document.getElementById('glasstopColorsIndex_' + glasstopColorIndex).classList.remove('colorButton');
        document.getElementById('glasstopColorsIndex_' + glasstopColorIndex).classList.add('colorButtonActive');
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
        updateFeaturedModel(model, false);
        showSelected(true);
    }));

    //color
    const color = model.color.color;
    var colorIndex = ALLCOLORS.colors.findIndex((item) => item.colorHex === color);
    var colorValue = document.querySelectorAll('.colors_colorButton');

    if (parser.getDevice().type != 'mobile' && parser.getDevice().type != 'tablet') {
        colorValue.forEach(item => item.addEventListener('mouseover', () => {
            document.getElementById('colorsText').style.visibility = 'visible';
            document.getElementById('colorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: ' + document.getElementById(item.id).style.backgroundColor + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + document.getElementById(item.id).alt + '';
            document.getElementById('colorsText').classList.add('fst-italic');
            updateFeaturedModel(model, false);
            showSelected(true);
        }));

        colorValue.forEach(item => item.addEventListener('mouseout', () => {
            document.getElementById('colorsText').style.visibility = 'hidden';
            document.getElementById('colorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: #' + model.color.color + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + ALLCOLORS.colors[colorIndex].colorName + '';
            document.getElementById('colorsText').classList.remove('fst-italic');
            updateFeaturedModel(model, false);
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
        model.background = { "original": ALLCOLORS.colors[colorIndex].colorBg };

        updateControlPanel(model, 'colors');
        updateFeaturedModel(model);
        showSelected(true);
    }));
    if (ALLCOLORS.colors[colorIndex].colorPath != undefined) {
        document.getElementById('colorsText').innerHTML = '<img src="https://' + window.location.host + '/' + ALLCOLORS.colors[colorIndex].colorPathThumb + '" class="rounded-pill shadow" style="width: calc(1rem + 1vw);">&nbsp;&nbsp;&nbsp;&nbsp;' + ALLCOLORS.colors[colorIndex].colorName + '';
    } else {
        document.getElementById('colorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: #' + model.color.color + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + ALLCOLORS.colors[colorIndex].colorName + '';
    }
    document.getElementById('colorsIndex_' + colorIndex).classList.remove('colorButton');
    document.getElementById('colorsIndex_' + colorIndex).classList.add('colorButtonActive');

    // Decor
    if (model.type == 'F02') {
        addDecor("F02", 270, 60, 54, 60, 0, ALLCOLORS.decorWall[DECORWALLINDEX].colorHex, ALLCOLORS.decorWall[DECORWALLINDEX].colorPath, ALLCOLORS.decorFloor[DECORFLOORINDEX].colorHex, ALLCOLORS.decorFloor[DECORFLOORINDEX].colorPath);
    }
    if (model.type == 'F03') {
        addDecor("F03", 180, 60, 54, 60, 0, ALLCOLORS.decorWall[DECORWALLINDEX].colorHex, ALLCOLORS.decorWall[DECORWALLINDEX].colorPath, ALLCOLORS.decorFloor[DECORFLOORINDEX].colorHex, ALLCOLORS.decorFloor[DECORFLOORINDEX].colorPath);
    }
    if (model.type == 'F07') {
        addDecor("F07", 140, 100, 45, 100, 0, ALLCOLORS.decorWall[DECORWALLINDEX].colorHex, ALLCOLORS.decorWall[DECORWALLINDEX].colorPath, ALLCOLORS.decorFloor[DECORFLOORINDEX].colorHex, ALLCOLORS.decorFloor[DECORFLOORINDEX].colorPath);
    }

    //pdf generator
    // is global FEATUREDMODEL for pdf really necessary?
    FEATUREDMODEL = model;
}

function showFeaturedModel(model) {
    if (model.type == 'F02') {
        updateCamera(270, 60);
    }
    if (model.type == 'F03') {
        updateCamera(180, 60);
    }
    if (model.type == 'F07') {
        updateCamera(140, 100);
    }
    updateControlPanel(model);
    updateFeaturedModel(model);
}

function showFeaturedModelByIndex(index) {
    FEATUREDMODELINDEX = index;
    FEATUREDMODEL = JSON.parse(JSON.stringify(ALLMODELS[index]));
    showFeaturedModel(FEATUREDMODEL);
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
    //const componentsPromise = fetch(`${buildUrl}/components.json`).then(response => response.json());
    UNITY_INSTANCE = await unityPromise;
    ALLCOLORS = await colorsPromise;
    //ALLCOMPONENTS = await componentsPromise;


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
    let noType;
    if (urlParams.has('noType')) {
        noType = "d-none";
    } else {
        noType = "d-block";
    }
    let noDecor;
    if (parser.getDevice().type == 'mobile' || urlParams.has('noDecor')) {
        noDecor = "d-none";
    } else {
        noDecor = "d-block";
    }
    accordions.type = {
        "title": "type",
        "options": ['type'],
        "display": noType,
        "code": /*html*/ `
        <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
            <div class="d-flex justify-content-start m-0 p-0">
                <div class="card border-0 grid gap row-gap-3">
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="type" value="F02" id="F02">
                        <label class="form-check-label" for="onPlinth">F02 60 x 270 x 54</label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="type" value="F03" id="F03">
                        <label class="form-check-label" for="wallMounted">F03 60 x 180 x 54</label> 
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="type" value="F07" id="F07">
                        <label class="form-check-label" for="onFrame">F07 100 x 140 x 45</label>
                    </div>
                </div>
            </div>
        </div>`
    }
    accordions.options = {
        "title": "options",
        "options": ['options'],
        "display": "d-block",
        "code": /*html*/ `
        <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
            <div class="h6 fw-normal form-check">
                <input type="checkbox" class="form-check-input" id="glasstop">
                <label class="form-check-label" for="glasstop">glass top</label>
            </div>
        </div>`,
    }
    if (model.glasstop == true) {
        accordions.glasstopColors = {
            "title": "glasstop colors",
            "options": ['glasstopColors'],
            "display": "d-block",
            "code": /*html*/ `
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                <div class="col-xxl-5 col-xl-5 col-12 m-0 p-0">
                    <div class="row m-0 p-0 pb-2">
                        <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                                <!--<div class="card border-0 pb-2">structure&nbsp;</div>-->
                            <div  id="glasstopColorsColorPicker" class="m-0 p-0"></div>
                        </div>
                    </div>
                </div>
            </div>`,
            "onload": function () {
                let containerElem = document.getElementById("glasstopColorsColorPicker");
                addColors('glasstopColors', ALLCOLORS.glasstopColors, containerElem);
            }
        }
    }
    accordions.colors = {
        "title": "colors",
        "options": ['colors'],
        "display": "d-block",
        "code": /*html*/ `
        <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
            <div class="col-xxl-5 col-xl-5 col-12 m-0 p-0">
                <div class="row m-0 p-0 pb-2">
                    <div class="d-flex justify-content-start m-0 p-0">
                        <div class="h6 fw-normal form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="colorsLacquer" id="colorsLacquer_basic" value="basic">
                            <label class="form-check-label" for="colorsLacquer">basic</label>
                        </div>
                        <div class="h6 fw-normal form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="colorsLacquer" id="colorsLacquer_structure" value="structure">
                            <label class="form-check-label" for="colorsLacquer">structure</label>
                        </div>
                        <div class="h6 fw-normal form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="colorsLacquer" id="colorsLacquer_gloss" value="gloss">
                            <label class="form-check-label" for="colorsLacquer">gloss</label>
                        </div>
                    </div>
                </div>
                <div id="colorsColorPicker" class="m-0 p-0"></div>
            </div>
            <div class="col-xxl-1 col-xl-1 col-12 m-0 p-0">
            </div>
            <div class="col-xxl-3 col-xl-3 col-7 m-0 p-0">
                <div class="row m-0 p-0 pb-2">
                    <div class="d-flex justify-content-start m-0 p-0">
                        <div class="h6 fw-normal form-check form-check-inline invisible">
                            <input class="form-check-input" type="radio" name="colorsLacquer" id="colorsLacquer_veneer" value="veneer">
                            <label class="form-check-label" for="colorsLacquer">veneer</label>
                        </div>
                    </div>
                    <div id="colorsTexturePicker" class="m-0 p-0"></div>
                </div>
            </div>
        </div>`,
        "onload": function () {
            let containerElemColorsColors = document.getElementById("colorsColorPicker");
            addColors('colors', ALLCOLORS.colors, containerElemColorsColors);
            let containerElemColorsTextures = document.getElementById("colorsTexturePicker");
            addTextures('colors', ALLCOLORS.colors, containerElemColorsTextures);
        }
    }
    accordions.decor = {
        "title": "decor",
        "options": ['wall', 'floor'],
        "display": noDecor,
        "code": /*html*/ `
        <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
            <div class="col-xxl-3 col-xl-3 col-7 m-0 p-0">
                <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                    <div class="h6 fw-normal card border-0 pb-2">wall</div>
                    <div  id="decorWallColorPicker" class="m-0 p-0"></div>
                </div>
            </div>
            <div class="col-xxl-1 col-xl-1 col-12 m-0 p-0">
            </div>
            <div class="col-xxl-3 col-xl-3 col-7 m-0 p-0">
                <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                    <div class="h6 fw-normal card border-0 pb-2">floor</div>
                    <div  id="decorFloorColorPicker" class="m-0 p-0"></div>
                </div>
            </div>
        </div>`,
        "onload": function () {
            let containerElemDecorColors = document.getElementById("decorWallColorPicker");
            addTextures('decorWallColors', ALLCOLORS.decorWall, containerElemDecorColors);
            let containerElemDecorTextures = document.getElementById("decorFloorColorPicker");
            addTextures('decorFloorColors', ALLCOLORS.decorFloor, containerElemDecorTextures);
        }
    }
    return { accordions };
}