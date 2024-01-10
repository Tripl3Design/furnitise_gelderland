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
        depthForImage: 37
    };
    UNITY_INSTANCE.SendMessage('VanDoesburg', 'SaveRenderTexture', JSON.stringify(renderTexture));
}

function shareConfiguration(model) {
    window.location.href = `whatsapp://send?text=See%20my%20configuration!%20https://furnitise.nl/demos?brand=${brand}&product=${product}&data=${encodeURIComponent(JSON.stringify(model))}`
}

function submitForm() {
    window.parent.postMessage(
        JSON.stringify(FEATUREDMODEL.articleList),
        "https://gelderland.com",
    );

    console.log(JSON.stringify(FEATUREDMODEL.articleList));
}

// used by FromUnityToJavascript.jslib
async function downloadModel(blob, fileName) {
    const result = await blobToBase64(blob);
    downloadModel(result);
}

function downloadModelButton() {
    UNITY_INSTANCE.SendMessage('VanDoesburg', 'ModelExport');
}

function downloadModel(bytes) {
    console.log('MODEL DOWNLOADED!!! ' + bytes);
}

function updateFeaturedModel(model) {
    UNITY_INSTANCE.SendMessage('VanDoesburg', 'SetVanDoesburg', JSON.stringify(model));
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
    UNITY_INSTANCE.SendMessage('VanDoesburg', 'AddDecor', JSON.stringify(decor));
}

function toggleDecor(toggle) {
    UNITY_INSTANCE.SendMessage('VanDoesburg', 'ToggleDecor', toggle);
}

function updateCamera(modelWidth, modelHeight) {
    console.log(modelWidth, modelHeight);
    var size = {
        width: modelWidth,
        height: modelHeight
        //offset: modelOffset
    };
    UNITY_INSTANCE.SendMessage('VanDoesburg', 'SetFLCamera', JSON.stringify(size));
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

    //number of seats
    console.log(model.elements.length);

    document.getElementById(model.elements.length).checked = true;

    const numberOfSeatsValues = document.querySelectorAll('input[type=radio][name="numberOfSeats"]');
    for (const numberOfSeatsValue of numberOfSeatsValues) {
        numberOfSeatsValue.onclick = (numberOfSeats) => {

            model.elements.length = numberOfSeats.target.id;
        }
    }

    //type
    document.getElementById(model.type).checked = true;

    const typeValues = document.querySelectorAll('input[type=radio][name="type"]');
    for (const typeValue of typeValues) {
        typeValue.onclick = (type) => {

            model.type = type.target.id;

            updateControlPanel(model, undefined, 'type');
            updateFeaturedModel(model);
            showSelected(false);
        }
    }
    document.getElementById('typeText').textContent = document.getElementById(model.type).value;

    //size
    //width
    if (model.type != "sideboardOnFrameTV") {
        document.getElementById(model.width).checked = true;
    }

    if (model.type == "sideboard" || model.type == "sideboardOnFrame") {
        const widthValues = document.querySelectorAll('input[type=radio][name="sideboard_width"]');
        for (const widthValue of widthValues) {
            widthValue.onclick = (width) => {

                model.width = width.target.id;

                updateCamera(model.width, model.height);
                updateControlPanel(model, undefined, 'sizeSideboard');
                updateFeaturedModel(model);
                showSelected(false);
            }
        }
        document.getElementById('sizeSideboardText').textContent = 'width ' + document.getElementById(model.width).id;
    }

    if (model.type == "cabinet") {
        const widthValues = document.querySelectorAll('input[type=radio][name="cabinet_width"]');
        for (const widthValue of widthValues) {
            widthValue.onclick = (width) => {

                model.width = width.target.id;

                updateCamera(model.width, model.height);
                updateControlPanel(model, undefined, 'sizeCabinet');
                updateFeaturedModel(model);
                showSelected(false);
            }
        }
        document.getElementById('widthText').textContent = 'width ' + document.getElementById(model.width).id;

        //height
        document.getElementById(model.height).checked = true;

        const heightValues = document.querySelectorAll('input[type=radio][name="cabinet_height"]');
        for (const heightValue of heightValues) {
            heightValue.onclick = (height) => {

                model.height = height.target.id;

                updateCamera(model.width, model.height);
                updateControlPanel(model, undefined, 'sizeCabinet');
                updateFeaturedModel(model);
                showSelected(false);
            }
        }
        document.getElementById('heightText').textContent = 'height ' + document.getElementById(model.height).id;

        //options
        //winerack
        if (model.winerack == true && model.winerackColor == undefined) {
            model.winerackColor = 'insidecolor';
        }
        if (model.winerackColor == 'outsidecolor') {
            document.getElementById('winerackoutsidecolor').checked = true;
        }
        if (model.winerackColor == 'insidecolor') {
            document.getElementById('winerackinsidecolor').checked = true;
        }
        if (model.winerack == true) {
            winerack.checked = true;
            document.getElementById('winerackoutsidecolor').disabled = false;
            document.getElementById('winerackinsidecolor').disabled = false;
            if (model.outsideColor.path !== undefined) {
                document.getElementById('winerackoutsidecolor').disabled = true;
                document.getElementById('winerackinsidecolor').disabled = true;
                document.getElementById('winerackinsidecolor').checked = true;
            }
        } else {
            winerack.checked = false;
            document.getElementById('winerackoutsidecolor').disabled = true;
            document.getElementById('winerackinsidecolor').disabled = true;
        }

        document.getElementById('winerack').addEventListener('click', () => {
            let winerack = document.getElementById('winerack');
            if (winerack.checked == true) {
                model.winerack = true;
            } else {
                model.winerack = false;
            }
            updateControlPanel(model, 'optionsCabinet');
            updateFeaturedModel(model);
            showSelected(false);
        });

        const winerackcolorValues = document.querySelectorAll('input[type=radio][name="winerackcolor"]');
        for (const winerackcolorValue of winerackcolorValues) {
            winerackcolorValue.onclick = (winerackcolor) => {

                model.winerackColor = winerackcolor.target.value;

                updateControlPanel(model, 'optionsCabinet');
                updateFeaturedModel(model);
                showSelected(false);
            }
        }
        if (document.getElementById("winerack").checked) {
            document.getElementById('winerackText').textContent = "winerack";
        } else {
            document.getElementById('winerackText').textContent = "no winerack";
        }

        //shelves
        document.getElementById('shelves').addEventListener('change', () => {

            model.shelves = document.getElementById("shelves").value;

            updateControlPanel(model, 'optionsCabinet');
            updateFeaturedModel(model);
            showSelected(false);
        });
        document.getElementById(`${model.shelves}_shelves`).selected = true;

        if (model.shelves == 0) {
            document.getElementById('shelvesText').textContent = "no extra shelves";
        } else if (model.shelves == 1) {
            document.getElementById('shelvesText').textContent = "1 extra shelf";
        } else {
            document.getElementById('shelvesText').textContent = document.getElementById("shelves").value + " extra shelves";
        }
    }

    if (model.type == "sideboardOnFrame") {
        //interiors
        document.getElementById(model.width + '_' + model.interior).checked = true;

        const interiorValues = document.querySelectorAll('input[type=radio][name="interior"]');
        for (const interiorValue of interiorValues) {
            interiorValue.onclick = (interior) => {

                model.interior = interior.target.value;

                updateControlPanel(model, 'optionsSideboardOnFrame' + model.width);
                updateFeaturedModel(model);
                showSelected(false);
            }
        }
        document.getElementById('optionsSideboardOnFrame' + model.width + 'Text').textContent = document.getElementById(model.width + '_' + model.interior + 'Label').textContent;
    }

    //outside color lacquer
    let outsideColorLacquer = document.querySelectorAll('input[type=radio][name="outsideColorsLacquer"]');
    outsideColorLacquer.forEach(radio => { radio.replaceWith(radio.cloneNode(true)) });
    outsideColorLacquer = document.querySelectorAll('input[type=radio][name="outsideColorsLacquer"]');
    if (model.outsideColor.lacquer == "veneer") {
        document.getElementById('outsideColorsLacquer_basic').disabled = true;
        document.getElementById('outsideColorsLacquer_structure').disabled = true;
        document.getElementById('outsideColorsLacquer_gloss').disabled = true;
        document.getElementById('outsideColorsLacquer_veneer').checked = true;
    } else {
        document.getElementById('outsideColorsLacquer_basic').disabled = false;
        document.getElementById('outsideColorsLacquer_structure').disabled = false;
        document.getElementById('outsideColorsLacquer_gloss').disabled = false;
        document.getElementById('outsideColorsLacquer_' + model.outsideColor.lacquer).checked = true;
    }
    outsideColorLacquer.forEach(radio => radio.addEventListener('click', () => {
        model.outsideColor.lacquer = radio.value;
        document.getElementById('outsideColorsLacquer_' + model.outsideColor.lacquer).checked = true;
        updateControlPanel(model, 'outsideColors');
        updateFeaturedModel(model, false);
        showSelected(true);
    }));

    //outside color
    const outsideColor = model.outsideColor.color;
    var outsideColorIndex = ALLCOLORS.outsideColors.findIndex((item) => item.colorHex == outsideColor);
    var outsideColorValue = document.querySelectorAll('.outsideColors_colorButton');

    if (parser.getDevice().type != 'mobile' && parser.getDevice().type != 'tablet') {
        outsideColorValue.forEach(item => item.addEventListener('mouseover', () => {
            document.getElementById('outsideColorsText').style.visibility = 'visible';
            document.getElementById('outsideColorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: ' + document.getElementById(item.id).style.backgroundColor + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + document.getElementById(item.id).alt + '';
            document.getElementById('outsideColorsText').classList.add('fst-italic');
            updateFeaturedModel(model, false);
            showSelected(true);
        }));

        outsideColorValue.forEach(item => item.addEventListener('mouseout', () => {
            document.getElementById('outsideColorsText').style.visibility = 'hidden';
            document.getElementById('outsideColorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: #' + model.outsideColor.color + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + ALLCOLORS.outsideColors[outsideColorIndex].colorName + '';
            document.getElementById('outsideColorsText').classList.remove('fst-italic');
            updateFeaturedModel(model, false);
            showSelected(true);
        }));
    }

    outsideColorValue.forEach(item => item.addEventListener('click', () => {
        outsideColorValue.forEach(item => { item.classList.remove('colorButtonActive') });
        const outsideColorId = item.id.split('_');
        outsideColorIndex = outsideColorId[1];

        if (ALLCOLORS.outsideColors[outsideColorIndex].colorPath != undefined) {
            model.outsideColor = { "color": ALLCOLORS.outsideColors[outsideColorIndex].colorHex, "path": ALLCOLORS.outsideColors[outsideColorIndex].colorPath, "lacquer": "veneer" };
            document.getElementById('outsideColorsLacquer_basic').disabled = true;
            document.getElementById('outsideColorsLacquer_structure').disabled = true;
            document.getElementById('outsideColorsLacquer_gloss').disabled = true;
            document.getElementById('outsideColorsLacquer_veneer').checked = true;
        } else {
            if (model.outsideColor.lacquer != undefined && model.outsideColor.lacquer != "veneer") {
                model.outsideColor = { "color": ALLCOLORS.outsideColors[outsideColorIndex].colorHex, "lacquer": model.outsideColor.lacquer };
            } else {
                model.outsideColor = { "color": ALLCOLORS.outsideColors[outsideColorIndex].colorHex, "lacquer": "basic" };
            }
            document.getElementById('outsideColorsLacquer_basic').disabled = false;
            document.getElementById('outsideColorsLacquer_structure').disabled = false;
            document.getElementById('outsideColorsLacquer_gloss').disabled = false;
            document.getElementById('outsideColorsLacquer_' + model.outsideColor.lacquer).checked = true;
        }
        updateControlPanel(model, 'outsideColors');
        updateFeaturedModel(model, false);
        showSelected(true);
    }));
    if (ALLCOLORS.outsideColors[outsideColorIndex].colorPath != undefined) {
        model.outsideColor.code = ALLCOLORS.outsideColors[outsideColorIndex].colorCode;
        document.getElementById('outsideColorsText').innerHTML = '<img src="https://' + window.location.host + '/' + ALLCOLORS.outsideColors[outsideColorIndex].colorPathThumb + '" class="rounded-pill shadow" style="width: calc(1rem + 1vw);">&nbsp;&nbsp;&nbsp;&nbsp;' + model.outsideColor.name;
    } else {
        if (model.outsideColor.lacquer == "basic") {
            model.outsideColor.code = ALLCOLORS.outsideColors[outsideColorIndex].colorCode.basic;
        }
        if (model.outsideColor.lacquer == "structure") {
            model.outsideColor.code = ALLCOLORS.outsideColors[outsideColorIndex].colorCode.structure;
        }
        if (model.outsideColor.lacquer == "gloss") {
            model.outsideColor.code = ALLCOLORS.outsideColors[outsideColorIndex].colorCode.gloss;
        }
        model.outsideColor.name = ALLCOLORS.outsideColors[outsideColorIndex].colorName;
        document.getElementById('outsideColorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: #' + model.outsideColor.color + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + model.outsideColor.name;
    }
    document.getElementById('outsideColorsIndex_' + outsideColorIndex).classList.remove('colorButton');
    document.getElementById('outsideColorsIndex_' + outsideColorIndex).classList.add('colorButtonActive');

    //insideColor
    const insideColor = model.insideColor.color;
    var insideColorIndex = ALLCOLORS.insideColors.findIndex((item) => item.colorHex == insideColor);
    var insideColorValue = document.querySelectorAll('.insideColors_colorButton');

    if (parser.getDevice().type != 'mobile' && parser.getDevice().type != 'tablet') {
        insideColorValue.forEach(item => item.addEventListener('mouseover', () => {
            document.getElementById('insideColorsText').style.visibility = 'visible';
            document.getElementById('insideColorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: ' + document.getElementById(item.id).style.backgroundColor + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + document.getElementById(item.id).alt + '';
            document.getElementById('insideColorsText').classList.add('fst-italic');
            updateFeaturedModel(model, false);
            showSelected(true);
        }));

        insideColorValue.forEach(item => item.addEventListener('mouseout', () => {
            document.getElementById('insideColorsText').style.visibility = 'hidden';
            document.getElementById('insideColorsText').classList.remove('fst-italic');
            updateFeaturedModel(model, false);
            showSelected(true);
        }));
    }

    insideColorValue.forEach(item => item.addEventListener('click', () => {
        insideColorValue.forEach(item => { item.classList.remove('colorButtonActive') });
        const insideColorId = item.id.split('_');
        insideColorIndex = insideColorId[1];

        model.insideColor = { "color": ALLCOLORS.insideColors[insideColorIndex].colorHex, "lacquer": "structure" };
        document.getElementById('insideColorsIndex_' + insideColorIndex).classList.add('colorButtonActive');

        updateControlPanel(model, 'insideColors');
        updateFeaturedModel(model, false);
        showSelected(true);
    }));
    model.insideColor.code = ALLCOLORS.insideColors[insideColorIndex].colorCode.structure;
    model.insideColor.name = ALLCOLORS.insideColors[insideColorIndex].colorName;
    document.getElementById('insideColorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: #' + model.insideColor.color + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + model.insideColor.name;
    document.getElementById('insideColorsIndex_' + insideColorIndex).classList.remove('colorButton');
    document.getElementById('insideColorsIndex_' + insideColorIndex).classList.add('colorButtonActive');

    //rollshutter
    document.getElementById('rollshutter').oninput = () => {

        model.rollshutter = document.getElementById('rollshutter').value;
        updateFeaturedModel(model);
        showSelected(false);
    }
    //document.getElementById("rollshutterText").textContent = model.rollshutter + '% open';
    document.getElementById('rollshutter').value = model.rollshutter;

    pricing(model);

    //adddecor
    if (model.type == "cabinet") {
        addDecor(model.type, model.width, model.height, 37, model.height, 0, ALLCOLORS.decorWall[DECORWALLINDEX].colorHex, ALLCOLORS.decorWall[DECORWALLINDEX].colorPath, ALLCOLORS.decorFloor[DECORFLOORINDEX].colorHex, ALLCOLORS.decorFloor[DECORFLOORINDEX].colorPath);
    }
    if (model.type == "sideboardOnFrameTV") {
        addDecor(model.type, model.width, model.height, 37, 25, 13, ALLCOLORS.decorWall[DECORWALLINDEX].colorHex, ALLCOLORS.decorWall[DECORWALLINDEX].colorPath, ALLCOLORS.decorFloor[DECORFLOORINDEX].colorHex, ALLCOLORS.decorFloor[DECORFLOORINDEX].colorPath);
    }
    if (model.type == "sideboard" || model.type == "sideboardOnFrame") {
        addDecor(model.type, model.width, model.height, 37, model.height, 0, ALLCOLORS.decorWall[DECORWALLINDEX].colorHex, ALLCOLORS.decorWall[DECORWALLINDEX].colorPath, ALLCOLORS.decorFloor[DECORFLOORINDEX].colorHex, ALLCOLORS.decorFloor[DECORFLOORINDEX].colorPath);
    }

    //pdf generator
    // is global FEATUREDMODEL for pdf really necessary?
    FEATUREDMODEL = model;
    console.log(model);
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
    let noNumberOfSeats;
    if (urlParams.has('noNumberOfSeats')) {
        noNumberOfSeats = "d-none";
    } else {
        noNumberOfSeats = "d-block";
    }
    let noType;
    if (urlParams.has('noType')) {
        noType = "d-none";
    } else {
        noType = "d-block";
    }
    let noArrangements;
    if (urlParams.has('noArrangements')) {
        noArrangements = "d-none";
    } else {
        noArrangements = "d-block";
    }
    let noDecor;
    if (parser.getDevice().type == 'mobile' || urlParams.has('noDecor')) {
        noDecor = "d-none";
    } else {
        noDecor = "d-block";
    }
    accordions.numberOfSeats = {
        "title": "number of seats",
        "options": ['numberOfSeats'],
        "display": noNumberOfSeats,
        "code": /*html*/ `
        <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
        <div class="d-flex justify-content-start m-0 p-0">
            <div class="card border-0 grid gap row-gap-3 me-5">
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="numberOfSeats" value="1" id="1">
                        <label class="form-check-label" for="1">1</label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="numberOfSeats" value="2" id="2">
                        <label class="form-check-label" for="2">2</label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="numberOfSeats" value="3" id="3">
                        <label class="form-check-label" for="3">3</label>
                    </div>
                </div>
                <div class="card border-0 grid gap row-gap-3">
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="numberOfSeats" value="4" id="4">
                        <label class="form-check-label" for="4">4</label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="numberOfSeats" value="5" id="5">
                        <label class="form-check-label" for="5">5</label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="numberOfSeats" value="6" id="6">
                        <label class="form-check-label" for="6">6</label>
                    </div>
                </div>
            </div>
        </div>`
    }
    accordions.arrangements = {
        "title": "arrangements",
        "options": ['arrangements'],
        "display": noArrangements,
        "code": /*html*/ `
        <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
        <div class="d-flex justify-content-start m-0 p-0">
            <div class="card border-0 ">
    
                <div class="fw-bold">1 seat</div>
                <div class="border border-1">
                    <p>unomino</p>
                    <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
    
                <div class="fw-bold">2 seater</div>
                <div class="border border-1">
                    <p>domino</p>
                    <svg width="80" height="50" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
    
                <div class="fw-bold">3 seater</div>
                <div class="border border-1">
                <p>tromino I</p>
                    <svg width="110" height="50" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>tromino L</p>
                    <svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
    
                <div class="fw-bold">4 seater</div>
                <div class="border border-1">
                <p>tetromino I</p>
                    <svg width="140" height="50" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>tetromino J</p>
                    <svg width="110" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>tetromino L</p>
                    <svg width="110" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>tetromino T</p>
                    <svg width="110" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>tetromino O</p>
                    <svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>tetromino S</p>
                    <svg width="110" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>tetromino Z</p>
                    <svg width="110" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
    
                <div class="fw-bold">5 seater</div>
                <div class="border border-1">
                <p>pentomino I</p>
                    <svg width="170" height="50" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="130" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>pentomino J (reflected L)</p>
                    <svg width="140" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>pentomino Y' (reflected Y)</p>
                    <svg width="140" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>pentomino Y</p>
                    <svg width="140" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>pentomino L</p>
                    <svg width="140" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>pentomino N</p>
                    <svg width="140" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>pentomino N' (reflected N)</p>
                    <svg width="140" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>pentomino F</p>
                    <svg width="110" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>pentomino S</p>
                    <svg width="110" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>pentomino F' (reflected F)</p>
                    <svg width="110" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>pentomino Z</p>
                    <svg width="110" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>pentomino P</p>
                    <svg width="110" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>pentomino Q</p>
                    <svg width="110" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>pentomino T</p>
                    <svg width="110" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>pentomino U</p>
                    <svg width="110" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>pentomino V</p>
                    <svg width="110" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>pentomino W</p>
                    <svg width="110" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>

                <div class="fw-bold">6 seater</div>
                <!-- we dont't support 6 elements next to each other
                <div class="border border-1">
                <p>hexomino I</p>
                    <svg width="200" height="50" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="130" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="160" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                -->
                <div class="border border-1">
                <p>hexomino L</p>
                    <svg width="170" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="130" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino L'</p>
                    <svg width="170" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="130" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="130" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino 1</p>
                    <svg width="170" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="130" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino 1'</p>
                    <svg width="170" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="130" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino D</p>
                    <svg width="170" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="130" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino N</p>
                    <svg width="170" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="130" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino N'</p>
                    <svg width="170" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="130" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino P</p>
                    <svg width="140" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino P'</p>
                    <svg width="140" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino U</p>
                    <svg width="140" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino U'</p>
                    <svg width="140" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino C</p>
                    <svg width="140" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino B</p>
                    <svg width="140" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino V</p>
                    <svg width="140" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino V'</p>
                    <svg width="140" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino 7</p>
                    <svg width="140" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino 7'</p>
                    <svg width="140" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino T</p>
                    <svg width="140" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino F</p>
                    <svg width="140" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino F'</p>
                    <svg width="140" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino 6</p>
                    <svg width="140" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino 6'</p>
                    <svg width="140" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino Z</p>
                    <svg width="140" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino 8</p>
                    <svg width="140" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino X</p>
                    <svg width="140" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino Y</p>
                    <svg width="140" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino Y'</p>
                    <svg width="140" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino G</p>
                    <svg width="140" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino G'</p>
                    <svg width="140" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino 5</p>
                    <svg width="170" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="130" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino S</p>
                    <svg width="140" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino O</p>
                    <svg width="110" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino 4</p>
                    <svg width="140" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino 4'</p>
                    <svg width="140" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino R</p>
                    <svg width="110" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino R'</p>
                    <svg width="110" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino 9</p>
                    <svg width="140" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino 9'</p>
                    <svg width="140" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino 2</p>
                    <svg width="140" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino 2'</p>
                    <svg width="140" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino W</p>
                    <svg width="140" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino W'</p>
                    <svg width="140" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino J</p>
                    <svg width="110" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino J'</p>
                    <svg width="110" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino H</p>
                    <svg width="110" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino H'</p>
                    <svg width="110" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino E</p>
                    <svg width="110" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino M</p>
                    <svg width="140" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino M'</p>
                    <svg width="140" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino A</p>
                    <svg width="110" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino K</p>
                    <svg width="110" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino K</p>
                    <svg width="110" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino Q</p>
                    <svg width="110" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino Q'</p>
                    <svg width="110" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="10" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>
                <div class="border border-1">
                <p>hexomino 3</p>
                    <svg width="140" height="110" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="10" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="40" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="40" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="70" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                        <rect x="100" y="70" width="30" height="30" fill="#d4d4d4" stroke="#000" stroke-width="2" />
                    </svg>
                </div>



            </div>
        </div>
    </div>`
    }
    accordions.type = {
        "title": "type",
        "options": ['type'],
        "display": noType,
        "code": /*html*/ `
        <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
            <div class="d-flex justify-content-start m-0 p-0">
                <div class="card border-0 grid gap row-gap-3 me-5">
            <div class="h6 fw-normal form-check">
                <input type="radio" class="form-check-input" name="type" id="noArmrestsLeft_96">
                <label class="form-check-label" for="noArmrestsLeft_96">noArmrestsLeft_96</label>
            </div>
            <div class="h6 fw-normal form-check">
                <input type="radio" class="form-check-input" name="type" id="noArmrestsRight_96">
                <label class="form-check-label" for="noArmrestsRight_96">noArmrestsRight_96</label>
            </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="type" id="armrestLeft_96">
                        <label class="form-check-label" for="armrestLeft_96">armrestLeft_96</label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="type" id="armrestRight_96">
                        <label class="form-check-label" for="armrestRight_96">armrestRight_96</label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="type" id="noArmrests_84">
                        <label class="form-check-label" for="noArmrests_84">noArmrests_84</label>
                    </div>
                </div>
                <div class="card border-0 grid gap row-gap-3">
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="type" id="poof_84">
                        <label class="form-check-label" for="poof_84">poof_84</label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="type" id="poof_96">
                        <label class="form-check-label" for="poof_96">poof_96</label>
                    </div>
                </div>
            </div>
        </div>`
    }
    accordions.insideColors = {
        "title": "inside colors",
        "options": ['insideColors'],
        "display": "d-block",
        "code": /*html*/ `
        <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
            <div class="col-xxl-5 col-xl-5 col-12 m-0 p-0">
                <div class="row m-0 p-0 pb-2">
                    <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                        <div class="h6 fw-normal card border-0 pb-2">structure&nbsp;</div>
                        <div id="insideColorPicker" class="m-0 p-0"></div>
                    </div>
                </div>
            </div>
        </div>`,
        "onload": function () {
            let containerElem = document.getElementById("insideColorPicker");
            addColors('insideColors', ALLCOLORS.insideColors, containerElem);
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