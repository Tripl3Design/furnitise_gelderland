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
    UNITY_INSTANCE.SendMessage('Amsterdammer', 'SaveRenderTexture', JSON.stringify(renderTexture));
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
    UNITY_INSTANCE.SendMessage('Amsterdammer', 'SetAmsterdammer', JSON.stringify(model));
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
    UNITY_INSTANCE.SendMessage('Amsterdammer', 'AddDecor', JSON.stringify(decor));
}

function toggleDecor(toggle) {
    UNITY_INSTANCE.SendMessage('Amsterdammer', 'ToggleDecor', toggle);
}

function updateCamera(modelWidth, modelHeight) {
    console.log(modelWidth, modelHeight);
    var size = {
        width: modelWidth,
        height: modelHeight
        //offset: modelOffset
    };
    UNITY_INSTANCE.SendMessage('Amsterdammer', 'SetFLCamera', JSON.stringify(size));
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

    //type
    document.getElementById(model.type).checked = true;

    const typeValues = document.querySelectorAll('input[type=radio][name="type"]');
    for (const typeValue of typeValues) {
        typeValue.onclick = (type) => {

            model.type = type.target.id;

            if (model.type == "cabinet") {
                model.width = 37;
                model.height = 205;
                model.winerack = false;
                model.shelves = 0;
                model.interior = undefined;
                if (model.outsideColor.path != undefined) {
                    model.outsideColor = { "color": "f7f6f4", "lacquer": "basic" };
                } else {
                    model.outsideColor = { "color": model.outsideColor.color, "lacquer": model.outsideColor.lacquer };
                }
                updateCamera(model.width, model.height);
            }
            if (model.type == "sideboardOnFrame") {
                model.width = 156;
                model.height = 75;
                model.winerack = undefined;
                model.shelves = undefined;
                if (model.interior != "two" || model.interior != "three" || model.interior == undefined) {
                    model.interior = "one";
                } else {
                    model.interior = model.interior;
                }
                if (model.outsideColor.path != undefined) {
                    model.outsideColor = { "color": "f7f6f4", "lacquer": "basic" };
                } else {
                    model.outsideColor = { "color": model.outsideColor.color, "lacquer": model.outsideColor.lacquer };
                }
                updateCamera(model.width, model.height);
            }
            if (model.type == "sideboardOnFrameTV") {
                model.width = 156;
                model.height = 112;
                model.winerack = undefined;
                model.shelves = undefined;
                model.interior = undefined;
                if (model.outsideColor.path != undefined) {
                    model.outsideColor = { "color": "f7f6f4", "lacquer": "basic" };
                } else {
                    model.outsideColor = { "color": model.outsideColor.color, "lacquer": model.outsideColor.lacquer };
                }
                updateCamera(model.width, model.height);
            }
            if (model.type == "sideboard") {
                model.width = 156;
                model.height = 75;
                model.winerack = undefined;
                model.shelves = undefined;
                model.interior = undefined;
                if (model.outsideColor.path != undefined) {
                    model.outsideColor = { "color": "f7f6f4", "lacquer": "basic" };
                } else {
                    model.outsideColor = { "color": model.outsideColor.color, "lacquer": model.outsideColor.lacquer };
                }
                updateCamera(model.width, model.height);
            }
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
    let noType;
    if (urlParams.has('noType')) {
        noType = "d-none";
    } else {
        noType = "d-block";
    }
    let noSize;
    if (urlParams.has('noSize')) {
        noSize = "d-none";
    } else {
        noSize = "d-block";
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
            <div class="d-flex justify-content-start m-0 p-0 ">
                <div class="card border-0 grid gap row-gap-3">
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="type" value="cabinet" id="cabinet">
                        <label class="form-check-label" for="cabinet">cabinet</label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="type" value="sideboard" id="sideboard">
                        <label class="form-check-label" for="sideboard">sideboard</label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="type" value="sideboard on frame &quot;twist&quot;" id="sideboardOnFrame">
                        <label class="form-check-label" for="sideboardOnFrame">sideboard on frame "twist"</label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="type" value="sideboard on frame &quot;twist&quot; TV" id="sideboardOnFrameTV">
                        <label class="form-check-label" for="sideboardOnFrameTV">sideboard on frame "twist" TV</label>
                    </div>
                </div>
            </div>
        </div>`
    }
    if (model.type == "cabinet") {
        accordions.sizeCabinet = {
            "title": "size",
            "options": ['width', 'height'],
            "display": noSize,
            "code": /*html*/ `
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                <div class="d-flex justify-content-start m-0 p-0">
                    <div class="card border-0 grid gap row-gap-3 me-5">
                        <div class="h6">width</div>
                        <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="cabinet_width" id="37">
                            <label class="form-check-label" for="37">37 cm</label>
                        </div>
                        <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="cabinet_width" id="55">
                            <label class="form-check-label" for="55">55 cm</label>
                        </div>
                        <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="cabinet_width" id="74">
                            <label class="form-check-label" for="74">74 cm</label>
                        </div>
                    </div>
                    <div class="card border-0 grid gap row-gap-3">
                        <div class="h6">height</div>
                        <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="cabinet_height" id="170">
                            <label class="form-check-label" for="170">170 cm</label>
                        </div>
                        <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="cabinet_height" id="205">
                            <label class="form-check-label" for="205">205 cm</label>
                        </div>
                        <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="cabinet_height" id="221">
                            <label class="form-check-label" for="221">221 cm</label>
                        </div>
                    </div>
                </div>
            </div>`
        }
    }
    if (model.type == "sideboard" || model.type == "sideboardOnFrame") {
        accordions.sizeSideboard = {
            "title": "size",
            "options": [],
            "display": noSize,
            "code": /*html*/ `
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                <div class="d-flex justify-content-start m-0 p-0">
                    <div class="card border-0 grid gap row-gap-3 me-5">
                        <div class="h6">width</div>
                        <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="sideboard_width" id="156">
                            <label class="form-check-label" for="156">156 cm</label>
                        </div>
                        <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="sideboard_width" id="194">
                            <label class="form-check-label" for="194">194 cm</label>
                        </div>
                    </div>
                </div>
            </div>`
        }
    }
    if (model.type == "cabinet") {
        accordions.optionsCabinet = {
            "title": "options",
            "options": ['winerack', 'shelves'],
            "display": "d-block",
            "code": /*html*/ `
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                <div class="d-flex justify-content-start m-0 p-0">
                    <div class="card border-0 grid gap row-gap-3 me-5">
                    <div class="h6 fw-normal form-check">
                            <input type="checkbox" class="form-check-input" id="winerack">
                            <label class="form-check-label" for="winerack">winerack</label>
                        </div>
                        <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="winerackcolor" id="winerackoutsidecolor" value="outsidecolor">
                            <label class="form-check-label" for="winerackoutsidecolor">in color outside</label>
                        </div>
                        <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="winerackcolor" id="winerackinsidecolor" value="insidecolor">
                            <label class="form-check-label" for="winerackinsidecolor">in color inside</label>
                        </div>
                    </div>
                    <div class="card border-0 grid gap row-gap-3">
                        <div class="h6">extra shelves</div>
                        <select class="form-select" id="shelves" aria-label="shelves">
                            <option id="0_shelves" value="0">0</option>
                            <option id="1_shelves" value="1">1</option>
                            <option id="2_shelves" value="2">2</option>
                            <option id="3_shelves" value="3">3</option>
                            <option id="4_shelves" value="4">4</option>
                            <option id="5_shelves" value="5">5</option>
                            <option id="6_shelves" value="6">6</option>
                            <option id="7_shelves" value="7">7</option>
                            <option id="8_shelves" value="8">8</option>
                        </select>
                    </div>
                </div>
            </div>`
        }
    }
    if (model.type == "sideboardOnFrame" && model.width == 156) {
        accordions.optionsSideboardOnFrame156 = {
            "title": "options",
            "options": [],
            "display": "d-block",
            "code": /*html*/ `
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                <div class="d-flex justify-content-start m-0 p-0">
                    <div class="card border-0 grid gap row-gap-3">
                        <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="interior" id="156_one" value="one">
                            <label class="form-check-label" for="156_one" id="156_oneLabel">interior with winerack</label>
                        </div>
                        <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="interior" id="156_two" value="two">
                            <label class="form-check-label" for="156_two" id="156_twoLabel">interior shelves horizontal</label>
                        </div>
                        <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="interior" id="156_three" value="three">
                            <label class="form-check-label" for="156_three" id="156_threeLabel">interior shelves vertical</label>
                        </div>
                    </div>
                </div>
            </div>`
        }
    }
    if (model.type == "sideboardOnFrame" && model.width == 194) {
        accordions.optionsSideboardOnFrame194 = {
            "title": "options",
            "options": ['optionsSideboardOnFrame'],
            "display": "d-block",
            "code": /*html*/ `
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                <div class="d-flex justify-content-start m-0 p-0">
                    <div class="card border-0 grid gap row-gap-3">
                        <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="interior" id="194_one" value="one">
                            <label class="form-check-label" for="194_one" id="194_oneLabel">interior with winerack</label>
                        </div>
                        <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="interior" id="194_two" value="two">
                            <label class="form-check-label" for="194_two" id="194_twoLabel">interior with extended winerack</label>
                        </div>
                        <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="interior" id="194_three" value="three">
                            <label class="form-check-label" for="194_three" id="194_threeLabel">interior with shelves</label>
                        </div>
                    </div>
                </div>
            </div>`
        }
    }
    if (model.type == "cabinet") {
        accordions.outsideColors = {
            "title": "outside colors",
            "options": ['outsideColors'],
            "display": "d-block",
            "code": /*html*/ `
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                <div class="col-xxl-5 col-xl-5 col-12 m-0 p-0">
                    <div class="row m-0 p-0 pb-2">
                        <div class="d-flex justify-content-start m-0 p-0">
                            <div class="h6 fw-normal form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="outsideColorsLacquer" id="outsideColorsLacquer_basic" value="basic">
                                <label class="form-check-label" for="outsideColorsLacquer">basic</label>
                            </div>
                            <div class="h6 fw-normal form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="outsideColorsLacquer" id="outsideColorsLacquer_structure" value="structure">
                                <label class="form-check-label" for="outsideColorsLacquer">structure</label>
                            </div>
                            <div class="h6 fw-normal form-check form-check-inline invisible"><!-- invisible because gloss is not applicable -->
                                <input class="form-check-input" type="radio" name="outsideColorsLacquer" id="outsideColorsLacquer_gloss" value="gloss">
                                <label class="form-check-label" for="outsideColorsLacquer">gloss</label>
                            </div>
                        </div>
                    </div>
                    
                    <div id="outsideColorsPicker" class="m-0 p-0"></div>
                </div>
                <div class="col-xxl-1 col-xl-1 col-12 m-0 p-0">
                </div>
                <div class="col-xxl-3 col-xl-3 col-7 m-0 p-0">
                    <div class="row m-0 p-0 pb-2">
                        <div class="d-flex justify-content-start m-0 p-0">
                            <div class="h6 fw-normal form-check form-check-inline invisible">
                                <input class="form-check-input" type="radio" name="outsideColorsLacquer" id="outsideColorsLacquer_veneer" value="veneer">
                                <label class="form-check-label" for="outsideColorsLacquer">veneer</label>
                            </div>
                        </div>
                        <div id="outsideTexturesPicker" class="m-0 p-0"></div>
                    </div>
                </div>
            </div>`,
            "onload": function () {
                let containerElemOutsideColorsColors = document.getElementById("outsideColorsPicker");
                addColors('outsideColors', ALLCOLORS.outsideColors, containerElemOutsideColorsColors);
                let containerElemOutsideColorsTextures = document.getElementById("outsideTexturesPicker");
                addTextures('outsideColors', ALLCOLORS.outsideColors, containerElemOutsideColorsTextures);
            }
        }
    }
    if (model.type == "sideboard" || model.type == "sideboardOnFrame" || model.type == "sideboardOnFrameTV") {
        accordions.outsideColors = {
            "title": "outside colors",
            "options": ['outsideColors'],
            "display": "d-block",
            "code": /*html*/ `
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                <div class="col-xxl-5 col-xl-5 col-12 m-0 p-0">
                    <div class="row m-0 p-0 pb-2">
                        <div class="d-flex justify-content-start m-0 p-0">
                            <div class="h6 fw-normal form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="outsideColorsLacquer" id="outsideColorsLacquer_basic" value="basic">
                                <label class="form-check-label" for="outsideColorsLacquer">basic</label>
                            </div>
                            <div class="h6 fw-normal form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="outsideColorsLacquer" id="outsideColorsLacquer_structure" value="structure">
                                <label class="form-check-label" for="outsideColorsLacquer">structure</label>
                            </div>
                            <div class="h6 fw-normal form-check form-check-inline invisible"><!-- invisible because gloss is not applicable -->
                                <input class="form-check-input" type="radio" name="outsideColorsLacquer" id="outsideColorsLacquer_gloss" value="gloss">
                                <label class="form-check-label" for="outsideColorsLacquer">gloss</label>
                            </div>
                        </div>
                        <div  id="outsideColorsPicker" class="m-0 p-0"></div>
                    </div>
                </div>
            </div>`,
            "onload": function () {
                let containerElemOutsideColorsColors = document.getElementById("outsideColorsPicker");
                addColors('outsideColors', ALLCOLORS.outsideColors, containerElemOutsideColorsColors);
            }
        }
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