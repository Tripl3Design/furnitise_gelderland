"use strict"
var UNITY_INSTANCE;
var ALLMODELS;
var ALLCOLORS;
var ALLCOMPONENTS;
var ALLARRANGEMENTS;
var FEATUREDMODEL;

let arrWidth;

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

    // overall width
    let maxPosX = Number.NEGATIVE_INFINITY;
    let minPosX = Number.POSITIVE_INFINITY;
    let typeAtMaxPosX;
    let typeAtMinPosX;
    let rotAtMaxPosX;
    let rotAtMinPosX;

    const difference = maxPosX - minPosX;
    arrWidth = difference * 24;

    if ((typeAtMinPosX === 'chair_96' && (rotAtMinPosX === 0 || rotAtMinPosX === 180)) || (typeAtMinPosX === 'armrestLeft_96' && rotAtMinPosX === 0)) {
        arrWidth += 60;
    } else if (typeAtMinPosX === 'noArmrests_84' || (typeAtMinPosX === 'hocker_84' && (rotAtMinPosX === 0 || rotAtMinPosX === 180))) {
        arrWidth += 42;
    } else {
        arrWidth += 48;
    }

    if ((typeAtMaxPosX === 'chair_96' && (rotAtMaxPosX === 0 || rotAtMaxPosX === 180)) || (typeAtMaxPosX === 'armrestRight_96' && rotAtMaxPosX === 0)) {
        arrWidth += 60;
    } else if (typeAtMaxPosX === 'noArmrests_84' || (typeAtMaxPosX === 'hocker_84' && (rotAtMaxPosX === 0 || rotAtMaxPosX === 180))) {
        arrWidth += 42;
    } else {
        arrWidth += 48;
    }

    document.getElementById('dimensionsText').textContent = arrWidth + ' cm';

    //updateCamera(arrWidth, arrWidth);
    // updateControlPanel(model, undefined, 'arrangement');
    // updateFeaturedModel(model);
    // showSelected();

    document.getElementById('numberOfSeatsText').textContent = model.elements.length + '-zits';

    pricing(model);

    // is global FEATUREDMODEL for pdf really necessary?
    FEATUREDMODEL = model;
}

function toggleFeaturedModels() {
    let featuredModels = document.getElementById('featuredModels');
    if (urlParams.has('noFeaturedModels')) {
        featuredModels.classList.remove('d-block');
        featuredModels.classList.add('d-none');
    } else {
        featuredModels.classList.remove('d-none');
        featuredModels.classList.add('d-block');
    }
}

function measureWidth(thisElement) {
    let maxPosX = Number.NEGATIVE_INFINITY;
    let minPosX = Number.POSITIVE_INFINITY;
    let typeAtMaxPosX;
    let typeAtMinPosX;
    let rotAtMaxPosX;
    let rotAtMinPosX;

    if (thisElement && thisElement.location) {
        if (thisElement.location.posX > maxPosX) {
            maxPosX = thisElement.location.posX;
            [typeAtMaxPosX, rotAtMaxPosX] = [thisElement.type, thisElement.location.rot];
        }

        if (thisElement.location.posX < minPosX) {
            minPosX = thisElement.location.posX;
            [typeAtMinPosX, rotAtMinPosX] = [thisElement.type, thisElement.location.rot];
        }
    }
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
    //var buildUrl = `https://${brand}-${product}.web.app/projects/${brand}-${product}`;
    var buildUrl = `http://127.0.0.1:5000/projects/${brand}-${product}`;
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

    UNITY_INSTANCE = await unityPromise;
    console.log(`BRAND: ${brand}, PRODUCT  ${product}, TITLE ${title}`);

    const componentsPromise = fetch(`projects/${brand}-${product}/components.json`).then(response => response.json());
    ALLCOMPONENTS = await componentsPromise;
    const colorsPromise = fetch(`projects/${brand}-${product}/colors.json`).then(response => response.json());
    ALLCOLORS = await colorsPromise;
    const modelsPromise = fetch(`projects/${brand}-${product}/models.json`).then(response => response.json());
    ALLMODELS = await modelsPromise;
    const arrangementsPromise = fetch(`projects/${brand}-${product}/arrangements.json`).then(response => response.json());
    ALLARRANGEMENTS = await arrangementsPromise;

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
    let noArrangement;
    if (urlParams.has('noArrangement')) {
        noArrangement = "d-none";
    } else {
        noArrangement = "d-block";
    }
    let noArrangementNew;
    if (urlParams.has('noArrangement')) {
        noArrangementNew = "d-none";
    } else {
        noArrangementNew = "d-block";
    }
    let noDecor;
    if (parser.getDevice().type == 'mobile' || urlParams.has('noDecor')) {
        noDecor = "d-none";
    } else {
        noDecor = "d-block";
    }
    accordions.arrangement = {
        title: "opstelling",
        options: ['numberOfSeats', 'dimensions'],
        display: noArrangement,
        collapsible: false,
        code: /*html*/ `
        <style>
        .cloneableObject {
            cursor: pointer;
        }
      
        .grid-line {
            stroke: lightgray;
            stroke-width: 1;
        }       

        .selected rect,
        .selected path {
            fill: lightgrey;
        }
    </style>
        <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
            <div class="col-12 m-0 p-0 pb-2">
                        <button onclick="deleteSelected()" type="button" class="btn btn-outline-dark rounded-0"><span class="material-symbols-outlined m-0 p-0">delete</span>verwijder</button>
                        <button onclick="rotateSelected()" type="button" class="btn btn-outline-dark rounded-0"><span class="material-symbols-outlined">rotate_90_degrees_cw</span>roteer</button>
                        <button onclick="mirrorSelected()" type="button" class="btn btn-outline-dark rounded-0"><span class="material-symbols-outlined">flip</span>spiegel</button>
                        <button onclick="#" type="button" class="btn btn-outline-dark rounded-0 m-0">XL versie</button>
                        <button onclick="#" type="button" class="btn btn-outline-dark rounded-0 m-0">extra kussen</button>
                  </div>
                <div class="row m-0 p-0">
                    <svg id="svgDragzone" style="width: 100%; height: 500px;" class="border border-1 border-black m-0 p-0" onmousedown="reAppend(this)" onmouseup="objectCloneDrop(event, this); disableMove();"
                        onmousemove="indicateDrag(this); moveObject(event, this); objectCloneDragDestination(event, this)"
                        onmouseleave="disableMove()"> 

                    </svg>

                    

                    </div>
                    <div class="row m-0 p-0">









                    <div id="svgContainer" class="d-flex flex-wrap align-items-start overflow-hidden" onmousemove="objectCloneDragOrigin(event, this)" onmouseup="disableDrag(this)">
             
                    <div class="cloneableObjectWrapper">
                        <svg class="cloneableObject" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 124 124" width="124" height="124" onmousedown="objectCloneGet(this)">
                            <g name="chair_96" transform="rotate(0, 62, 62)">
                                <g name="seat">
                                    <rect fill="white" x="14" y="26" width="96" height="84" stroke="black" stroke-width="2"></rect>
                                </g>
                                <g name="rests">
                                    <rect x="2" y="14" width="24" height="96" fill="white" stroke="black" stroke-width="2"></rect>
                                    <rect x="98" y="14" width="24" height="96" fill="white" stroke="black" stroke-width="2"></rect>
                                    <rect x="26" y="14" width="72" height="24" fill="white" stroke="black" stroke-width="2"></rect>
                                    <line x1="14" y1="26" x2="110" y2="26" stroke="black" stroke-width="1" stroke-dasharray="4"></line>
                                    <line x1="14" y1="26" x2="14" y2="114" stroke="black" stroke-width="1" stroke-dasharray="4"></line>
                                    <line x1="110" y1="26" x2="110" y2="114" stroke="black" stroke-width="1" stroke-dasharray="4"></line>
                                </g>
                            </g>
                        </svg>
                    </div>
            
                    <div class="cloneableObjectWrapper">
                        <svg class="cloneableObject" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 124 124" width="124" height="124" onmousedown="objectCloneGet(this)">
                            <g name="noArmrestsRight_96" transform="rotate(0, 62, 62)">
                                <g name="seat">
                                    <rect fill="white" x="14" y="26" width="96" height="84" stroke="black" stroke-width="2"></rect>
                                </g>
                                <g name="rests">
                                    <rect x="14" y="14" width="84" height="24" fill="white" stroke="black" stroke-width="2"></rect>
                                    <line x1="14" y1="26" x2="96" y2="26" stroke="black" stroke-width="1" stroke-dasharray="4"></line>
                                </g>
                            </g>
                        </svg>
                    </div>
            
                    <div class="cloneableObjectWrapper">
                        <svg class="cloneableObject" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 124 124" width="124" height="124" onmousedown="objectCloneGet(this)">
                            <g name="armrestRight_96" transform="rotate(0, 62, 62)">
                                <g name="seat">
                                    <rect fill="white" x="14" y="26" width="96" height="84" stroke="black" stroke-width="2"></rect>
                                </g>
                                <g name="rests">
                                    <rect x="98" y="14" width="24" height="96" fill="white" stroke="black" stroke-width="2"></rect>
                                    <rect x="14" y="14" width="84" height="24" fill="white" stroke="black" stroke-width="2"></rect>
                                    <line x1="14" y1="26" x2="110" y2="26" stroke="black" stroke-width="1" stroke-dasharray="4"></line>
                                    <line x1="110" y1="26" x2="110" y2="114" stroke="black" stroke-width="1" stroke-dasharray="4"></line>
                                </g>
                            </g>
                        </svg>
                    </div>
            
                    <div class="cloneableObjectWrapper">
                        <svg class="cloneableObject" xmlns="http://www.w3.org/2000/svg" viewBox='0 0 124 124' width="124" height="124" onmousedown="objectCloneGet(this)">
                            <g name="noArmrests_84" transform="rotate(0, 56, 56)">
                                <g name='seat'>
                                    <rect fill='white' x='14' y='14' width='84' height='84' stroke='black' stroke-width='2'></rect>
                                </g>
                                <g name="rests">
                                    <rect x='14' y='2' width='84' height='24' fill='white' stroke='black' stroke-width='2'></rect>
                                    <line x1='14' y1='14' x2='96' y2='14' stroke='black' stroke-width='1' stroke-dasharray='4'></line>
                                </g>
                            </g>
                        </svg>
                    </div>
            
                    <div class="cloneableObjectWrapper">
                        <svg class="cloneableObject" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 124 124" width="124" height="124" onmousedown="objectCloneGet(this)">
                            <g name="noArmrests_100" transform="rotate(0, 62, 62)">
                                <g name='seat'>
                                    <rect fill='white' x='14' y='14' width='102' height='108' stroke='black' stroke-width='2'></rect>
                                </g>
                                <g name="rests">
                                    <rect x='14' y='14' width='102' height='24' fill='white' stroke='black' stroke-width='2'></rect>
                                    <line x1='14' y1='14' x2='102' y2='14' stroke='black' stroke-width='1' stroke-dasharray='4'></line>
                                </g>
                            </g>
                        </svg>
                    </div>
            
                    <div class="cloneableObjectWrapper">
                        <svg class="cloneableObject" xmlns="http://www.w3.org/2000/svg" viewBox='0 0 196 196' width="196" height="196" onmousedown="objectCloneGet(this)">
                            <g name="armrestLeft_172" transform="rotate(0, 95, 95)">
                                <g name='seat'>
                                    <rect fill='white' x='2' y='50' width='174' height='102' stroke='black' stroke-width='2'></rect>
                                </g>
                                <g name="rests">
                                    <rect x='164' y='38' width='24' height='96' fill='white' stroke='black' stroke-width='2'></rect>
                                    <rect x='2' y='38' width='162' height='24' fill='white' stroke='black' stroke-width='2'></rect>
                                    <line x1='2' y1='50' x2='174' y2='50' stroke='black' stroke-width='1' stroke-dasharray='4'></line>
                                    <line x1='176' y1='50' x2='176' y2='132' stroke='black' stroke-width='1' stroke-dasharray='4'></line>
                                </g>
                            </g>
                        </svg>
                    </div>
            
                    <div class="cloneableObjectWrapper">
                        <svg class="cloneableObject" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 106 106" width="106" height="106" onmousedown="objectCloneGet(this)">
                            <g name="quarterround" transform="rotate(0, 53, 53)">
                                <g name="seat">
                                    <path d="M 2,2 L 104,2 A 104,104 0 0,1 2,104 L 2,2 Z" fill="white" stroke="black" stroke-width="2"></path>
                                </g>
                            </g>
                        </svg>
                    </div>
            
                    <div class="cloneableObjectWrapper">
                        <svg class="cloneableObject" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 124 124" width="124" height="124" onmousedown="objectCloneGet(this)">
                            <g name="hocker_96" transform="rotate(0, 62, 62)">
                                <g name="seat">
                                    <rect x='2' y='14' width='96' height='84' fill='white' stroke='black' stroke-width='2'></rect>
                                </g>
                            </g>
                        </svg>
                    </div>
            
                    <div class="cloneableObjectWrapper">
                        <svg class="cloneableObject" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 118 118" width="118" height="118" onmousedown="objectCloneGet(this)">
                            <g name="hocker_84" transform="rotate(0, 62, 62)">
                                <g name="seat">
                                    <rect x='14' y='14' width='84' height='84' fill='white' stroke='black' stroke-width='2'></rect>
                                </g>
                            </g>
                        </svg>
                    </div>
            
                    <div class="cloneableObjectWrapper">
                        <svg class="cloneableObject" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 106 106" width="106" height="106" onmousedown="objectCloneGet(this)">
                            <g name="coffeetable" transform="rotate(0, 53, 53)">
                                <g name="tabletop">
                                    <rect x='2' y='2' width='78' height='102' fill='white' stroke='black' stroke-width='1'></rect>
                                    <path d='M 18 104 L 18 57 Q 18 53 14 53 L 2 53' stroke='black' stroke-width='1' fill='none'></path>
                                </g>
                            </g>
                        </svg>
                    </div>
            
                    <div class="cloneableObjectWrapper">
                        <svg class="cloneableObject" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 196 196" width="196" height="196" onmousedown="objectCloneGet(this)">
                            <g name="sidetable" transform="rotate(0, 97, 97)">
                                <g name="tabletop">
                                    <rect x='2' y='2' width='192' height='48' fill='white' stroke='black' stroke-width='1'></rect>
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>












                </div>
            </div>
        </div>`
    }
    accordions.element = {
        "title": "element",
        "options": ['type'],
        "display": "d-block",
        "code": /*html*/ ` 
<div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
<!--
    <div class="d-flex justify-content-start m-0 p-0 pt-2">
        <div class="card border-0 grid gap row-gap-3 me-5">
            <div class="h6 fw-normal form-check">
                <input type="radio" class="form-check-input" name="type" id="chair_96" value="chair_96">
                <label class="form-check-label" for="chair_96">
                    ${ALLARRANGEMENTS.elements.chair_96.svg}&nbsp;&nbsp;&nbsp;fauteuil
                </label>
            </div>
            <div class="h6 fw-normal form-check">
                <input type="radio" class="form-check-input" name="type" id="noArmrestsRight_96" value="noArmrestsRight_96">
                <label class="form-check-label" for="noArmrestsRight_96">
                    ${ALLARRANGEMENTS.elements.noArmrestsRight_96.svg}&nbsp;&nbsp;&nbsp;geen armleuningen r
                </label>
            </div>
            <div class="h6 fw-normal form-check">
                <input type="radio" class="form-check-input" name="type" id="noArmrestsLeft_96" value="noArmrestsLeft_96">
                <label class="form-check-label" for="noArmrestsLeft_96">
                    ${ALLARRANGEMENTS.elements.noArmrestsLeft_96.svg}&nbsp;&nbsp;&nbsp;geen armleuningen l
                </label>
            </div>
            <div class="h6 fw-normal form-check">
                <input type="radio" class="form-check-input" name="type" id="noArmrests_84" value="noArmrests_84">
                <label class="form-check-label" for="noArmrests_84">
                    ${ALLARRANGEMENTS.elements.noArmrests_84.svg}&nbsp;&nbsp;&nbsp;geen armleuningen
                </label>
            </div>
        </div>
        <div class="card border-0 grid gap row-gap-3">
            <div class="h6 fw-normal form-check">
                <input type="radio" class="form-check-input" name="type" id="armrestLeft_96" value="armrestLeft_96">
                <label class="form-check-label" for="armrestLeft_96">
                    ${ALLARRANGEMENTS.elements.armrestLeft_96.svg}&nbsp;&nbsp;&nbsp;armleuning links
                </label>
            </div>
            <div class="h6 fw-normal form-check">
                <input type="radio" class="form-check-input" name="type" id="armrestRight_96" value="armrestRight_96">
                <label class="form-check-label" for="armrestRight_96">
                    ${ALLARRANGEMENTS.elements.armrestRight_96.svg}&nbsp;&nbsp;&nbsp;armleuning rechts
                </label>
            </div>
            <div class="h6 fw-normal form-check">
                <input type="radio" class="form-check-input" name="type" id="hocker_84" value="hocker_84">
                <label class="form-check-label" for="hocker_84">
                    ${ALLARRANGEMENTS.elements.hocker_84.svg}&nbsp;&nbsp;&nbsp;hocker 84cm breed
                </label>
            </div>
            <div class="h6 fw-normal form-check">
                <input type="radio" class="form-check-input" name="type" id="hocker_96" value="hocker_96">
                <label class="form-check-label" for="hocker_96">
                    ${ALLARRANGEMENTS.elements.hocker_96.svg}&nbsp;&nbsp;&nbsp;hocker 96cm breed
                </label>
            </div>
        </div>
        <div class="card border-0 grid gap row-gap-3">
            <div class="h6 fw-normal form-check">
                <input type="radio" class="form-check-input" name="type" id="quarterround" value="quarterround">
                <label class="form-check-label" for="quarterround">
                    ${ALLARRANGEMENTS.elements.quarterround.svg}&nbsp;&nbsp;&nbsp;kwartrond
                </label>
            </div>
            <div class="h6 fw-normal form-check">
                <input type="radio" class="form-check-input" name="type" id="armrestRight_172" value="armrestRight_172">
                <label class="form-check-label" for="armrestRight_172">
                    ${ALLARRANGEMENTS.elements.armrestRight_172.svg}&nbsp;&nbsp;&nbsp;2,5 zits armleuning rechts
                </label>
            </div>
            <div class="h6 fw-normal form-check">
                <input type="radio" class="form-check-input" name="type" id="armrestLeft_172" value="armrestLeft_172">
                <label class="form-check-label" for="armrestLeft_172">
                    ${ALLARRANGEMENTS.elements.armrestLeft_172.svg}&nbsp;&nbsp;&nbsp;2,5 zits armleuning links
                </label>
            </div>
        </div>
    </div>
 

    <div class="d-flex justify-content-start m-0 p-0 pt-2">
        <div class="card border-0 grid gap row-gap-3 me-5">
            <div class="h6 fw-normal form-check">
                <input type="radio" class="form-check-input" name="type" id="sideTable" value="sideTable">
                <label class="form-check-label" for="sideTable">
                    ${ALLARRANGEMENTS.elements.sideTable.svg}&nbsp;&nbsp;&nbsp;salontafel
                </label>
            </div>
        </div>
        <div class="card border-0 grid gap row-gap-3 me-5">
            <div class="h6 fw-normal form-check">
                <input type="radio" class="form-check-input" name="type" id="oakTable" value="oakTable">
                <label class="form-check-label" for="oakTable">
                    ${ALLARRANGEMENTS.elements.oakTable.svg}&nbsp;&nbsp;&nbsp;tafel eiken
                </label>
            </div>
        </div>
    </div>
   -->
    <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
        <div class="d-flex justify-content-start m-0 p-0 pt-4">
            <div class="card border-0 grid gap row-gap-3 me-5">
                <div class="h6 fw-normal form-check">
                    <input type="checkbox" class="form-check-input" id="cushion" value="cushion">
                    <label class="form-check-label" for="cushion">rugkussen</label>
                </div>
                <div class="h6 fw-normal form-check">
                    <input type="checkbox" class="form-check-input" id="xl" value="xl">
                    <label class="form-check-label" for="xl">xl</label>
                </div>
            </div>
            <div class="card border-0 grid gap row-gap-3">
                <div class="h6 fw-normal form-check">
                    <input type="checkbox" class="form-check-input" id="frontcushion" value="frontcushion">
                    <label class="form-check-label" for="frontcushion">extra rugkussen</label>
                </div>
            </div>
        </div>
    </div>
</div>
`
    },
        accordions.upholstery = {
            "title": "bekleding",
            "options": ['color'],
            "display": "d-block",
            "code": /*html*/ ` 


        <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
            <div class="col-xxl-5 col-xl-5 col-12 m-0 p-0">
                <div class="row m-0 p-0 pb-2">
                    <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                        <div class="h6 fw-normal card border-0 pb-2">structure&nbsp;</div>
                        <div id="upholsteryColorPicker" class="m-0 p-0">

                    </div>
                </div>
            </div>
        </div>`,
            "onload": function () {
                let containerElem = document.getElementById("upholsteryColorPicker");
                addTextures('upholsteryColors', ALLCOLORS.upholsteryColors, containerElem);
            }
        }
    return { accordions };
}