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

    //arrangement

    if (model.elements.length == 1) {
        document.getElementById('w1').checked = true;
        document.getElementById('nos1').checked = true;

        document.getElementById('w1').disabled = false;
        document.getElementById('w2').disabled = true;
        document.getElementById('w3').disabled = true;
        document.getElementById('w4').disabled = true;
        document.getElementById('w5').disabled = true;
        //document.getElementById('w6').disabled = true;
    }
    if (model.elements.length == 2) {
        document.getElementById('w2').checked = true;
        document.getElementById('nos2').checked = true;

        document.getElementById('w1').disabled = true;
        document.getElementById('w2').disabled = false;
        document.getElementById('w3').disabled = true;
        document.getElementById('w4').disabled = true;
        document.getElementById('w5').disabled = true;
        //document.getElementById('w6').disabled = true;
    }
    if (model.elements.length == 3) {
        document.getElementById('w3').checked = true;
        document.getElementById('nos3').checked = true;

        document.getElementById('w1').disabled = true;
        document.getElementById('w2').disabled = false;
        document.getElementById('w3').disabled = false;
        document.getElementById('w4').disabled = true;
        document.getElementById('w5').disabled = true;
        //document.getElementById('w6').disabled = true;
    }
    if (model.elements.length == 4) {
        document.getElementById('w4').checked = true;
        document.getElementById('nos4').checked = true;

        document.getElementById('w1').disabled = true;
        document.getElementById('w2').disabled = false;
        document.getElementById('w3').disabled = false;
        document.getElementById('w4').disabled = false;
        document.getElementById('w5').disabled = true;
        //document.getElementById('w6').disabled = true;
    }
    if (model.elements.length == 5) {
        document.getElementById('w4').checked = true;
        document.getElementById('nos5').checked = true;

        document.getElementById('w1').disabled = true;
        document.getElementById('w2').disabled = true;
        document.getElementById('w3').disabled = false;
        document.getElementById('w4').disabled = false;
        document.getElementById('w5').disabled = false;
        //document.getElementById('w6').disabled = true;
    }
    if (model.elements.length == 6) {
        document.getElementById('w4').checked = true;
        document.getElementById('nos6').checked = true;

        document.getElementById('w1').disabled = true;
        document.getElementById('w2').disabled = true;
        document.getElementById('w3').disabled = false;
        document.getElementById('w4').disabled = false;
        document.getElementById('w5').disabled = false;
        //document.getElementById('w6').disabled = false;
    }

    const numberOfSeatsValues = document.querySelectorAll('input[type=radio][name="numberOfSeats"]');
    for (const numberOfSeatsValue of numberOfSeatsValues) {
        numberOfSeatsValue.onclick = (numberOfSeats) => {

            console.log('numberOfSeats: ' + numberOfSeats.target.value);

            if (numberOfSeats.target.value == 1) {
                model.arrangement = 'unomino';
                model.elements =
                    [{
                        "type": "chair_96",
                        "cushion": true,
                        "xl": false,
                        "upholstery": (model.elements[0] && model.elements[0].upholstery) || { "upholstery": "ff0000" },
                        "cushionUpholstery": (model.elements[0] && model.elements[0].cushionUpholstery) || { "upholstery": "ff0000" },
                        "frontcushionUpholstery": (model.elements[0] && model.elements[0].frontcushionUpholstery) || { "upholstery": "ff0000" },
                        "location": {
                            "posX": 0,
                            "posY": 0,
                            "rot": 0
                        }
                    }];
            }
            if (numberOfSeats.target.value  == 2) {
                model.arrangement = 'domino';
                model.elements =
                    [{
                        "type": "armrestLeft_96",
                        "cushion": true,
                        "frontcushion": false,
                        "xl": false,
                        "upholstery": (model.elements[0] && model.elements[0].upholstery) || { "upholstery": "ff0000" },
                        "cushionUpholstery": (model.elements[0] && model.elements[0].cushionUpholstery) || { "upholstery": "ff0000" },
                        "frontcushionUpholstery": (model.elements[0] && model.elements[0].frontcushionUpholstery) || { "upholstery": "ff0000" },
                        "location": {
                            "posX": -2,
                            "posY": 0,
                            "rot": 0
                        }
                    },
                    {
                        "type": "armrestRight_96",
                        "cushion": true,
                        "frontcushion": false,
                        "xl": false,
                        "upholstery": (model.elements[2] && model.elements[2].upholstery) || (model.elements[0] && model.elements[0].upholstery) || { "upholstery": "ff0000" },
                        "cushionUpholstery": (model.elements[2] && model.elements[2].cushionUpholstery) || (model.elements[0] && model.elements[0].cushionUpholstery) || { "upholstery": "ff0000" },
                        "frontcushionUpholstery": (model.elements[2] && model.elements[2].frontcushionUpholstery) || (model.elements[0] && model.elements[0].frontcushionUpholstery) || { "upholstery": "ff0000" },
                        "location": {
                            "posX": 2,
                            "posY": 0,
                            "rot": 0
                        }
                    }];
            }
            if (numberOfSeats.target.value  == 3) {
                model.arrangement = 'tromino I';
                model.elements =
                    [{
                        "type": "armrestLeft_96",
                        "cushion": true,
                        "frontcushion": false,
                        "xl": false,
                        "upholstery": (model.elements[0] && model.elements[0].upholstery) || { "upholstery": "ff0000" },
                        "cushionUpholstery": (model.elements[0] && model.elements[0].cushionUpholstery) || { "upholstery": "ff0000" },
                        "frontcushionUpholstery": (model.elements[0] && model.elements[0].frontcushionUpholstery) || { "upholstery": "ff0000" },
                        "location": {
                            "posX": -3.75,
                            "posY": 0,
                            "rot": 0
                        }
                    },
                    {
                        "type": "noArmrests_84",
                        "cushion": true,
                        "frontcushion": false,
                        "xl": false,
                        "upholstery": (model.elements[1] && model.elements[1].upholstery) || (model.elements[0] && model.elements[0].upholstery) || { "upholstery": "ff0000" },
                        "cushionUpholstery": (model.elements[1] && model.elements[1].cushionUpholstery) || (model.elements[0] && model.elements[0].cushionUpholstery) || { "upholstery": "ff0000" },
                        "frontcushionUpholstery": (model.elements[1] && model.elements[1].frontcushionUpholstery) || (model.elements[0] && model.elements[0].frontcushionUpholstery) || { "upholstery": "ff0000" },
                        "location": {
                            "posX": 0,
                            "posY": 0,
                            "rot": 0
                        }
                    },
                    {
                        "type": "armrestRight_96",
                        "cushion": true,
                        "frontcushion": false,
                        "xl": false,
                        "upholstery": (model.elements[2] && model.elements[2].upholstery) || (model.elements[0] && model.elements[0].upholstery) || { "upholstery": "ff0000" },
                        "cushionUpholstery": (model.elements[2] && model.elements[2].cushionUpholstery) || (model.elements[0] && model.elements[0].cushionUpholstery) || { "upholstery": "ff0000" },
                        "frontcushionUpholstery": (model.elements[2] && model.elements[2].frontcushionUpholstery) || (model.elements[0] && model.elements[0].frontcushionUpholstery) || { "upholstery": "ff0000" },
                        "location": {
                            "posX": 3.75,
                            "posY": 0,
                            "rot": 0
                        }
                    }];
            }
            if (numberOfSeats.target.value  == 4) {
                model.arrangement = 'tetromino J';
                model.elements =
                    [{
                        "type": "armrestLeft_96",
                        "cushion": true,
                        "frontcushion": false,
                        "xl": false,
                        "upholstery": (model.elements[0] && model.elements[0].upholstery) || { "upholstery": "ff0000" },
                        "cushionUpholstery": (model.elements[0] && model.elements[0].cushionUpholstery) || { "upholstery": "ff0000" },
                        "frontcushionUpholstery": (model.elements[0] && model.elements[0].frontcushionUpholstery) || { "upholstery": "ff0000" },
                        "location": {
                            "posX": -6,
                            "posY": 0,
                            "rot": 0
                        }
                    },
                    {
                        "type": "noArmrestsRight_96",
                        "cushion": true,
                        "frontcushion": false,
                        "xl": false,
                        "upholstery": (model.elements[1] && model.elements[1].upholstery) || (model.elements[0] && model.elements[0].upholstery) || { "upholstery": "ff0000" },
                        "cushionUpholstery": (model.elements[1] && model.elements[1].cushionUpholstery) || (model.elements[0] && model.elements[0].cushionUpholstery) || { "upholstery": "ff0000" },
                        "frontcushionUpholstery": (model.elements[1] && model.elements[1].frontcushionUpholstery) || (model.elements[0] && model.elements[0].frontcushionUpholstery) || { "upholstery": "ff0000" },
                        "location": {
                            "posX": -2,
                            "posY": 0,
                            "rot": 0
                        }
                    },
                    {
                        "type": "armrestRight_96",
                        "cushion": true,
                        "frontcushion": true,
                        "xl": true,
                        "upholstery": (model.elements[2] && model.elements[2].upholstery) || (model.elements[0] && model.elements[0].upholstery) || { "upholstery": "ff0000" },
                        "cushionUpholstery": (model.elements[2] && model.elements[2].cushionUpholstery) || (model.elements[0] && model.elements[0].cushionUpholstery) || { "upholstery": "ff0000" },
                        "frontcushionUpholstery": (model.elements[2] && model.elements[2].frontcushionUpholstery) || (model.elements[0] && model.elements[0].frontcushionUpholstery) || { "upholstery": "ff0000" },
                        "location": {
                            "posX": 1.75,
                            "posY": -0.25,
                            "rot": 270
                        }
                    },
                    {
                        "type": "poof_96",
                        "cushion": true,
                        "frontcushion": false,
                        "xl": false,
                        "upholstery": (model.elements[3] && model.elements[3].upholstery) || (model.elements[0] && model.elements[0].upholstery) || { "upholstery": "ff0000" },
                        "cushionUpholstery": (model.elements[3] && model.elements[3].cushionUpholstery) || (model.elements[0] && model.elements[0].cushionUpholstery) || { "upholstery": "ff0000" },
                        "frontcushionUpholstery": (model.elements[3] && model.elements[3].frontcushionUpholstery) || (model.elements[0] && model.elements[0].frontcushionUpholstery) || { "upholstery": "ff0000" },
                        "location": {
                            "posX": 6,
                            "posY": -0.25,
                            "rot": 270
                        }
                    }];
            }
            if (numberOfSeats.target.value  == 5) {
                model.arrangement = 'pentomino Q';
                model.elements =
                    [{
                        "type": "armrestLeft_96",
                        "cushion": true,
                        "frontcushion": false,
                        "xl": false,
                        "upholstery": (model.elements[0] && model.elements[0].upholstery) || { "upholstery": "ff0000" },
                        "cushionUpholstery": (model.elements[0] && model.elements[0].cushionUpholstery) || { "upholstery": "ff0000" },
                        "frontcushionUpholstery": (model.elements[0] && model.elements[0].frontcushionUpholstery) || { "upholstery": "ff0000" },
                        "location": {
                          "posX": -6,
                          "posY": 0,
                          "rot": 0
                        }
                      },
                      {
                        "type": "armrestRight_96",
                        "cushion": true,
                        "frontcushion": false,
                        "xl": false,
                        "upholstery": (model.elements[1] && model.elements[1].upholstery) || (model.elements[0] && model.elements[0].upholstery) || { "upholstery": "ff0000" },
                        "cushionUpholstery": (model.elements[1] && model.elements[1].cushionUpholstery) || (model.elements[0] && model.elements[0].cushionUpholstery) || { "upholstery": "ff0000" },
                        "frontcushionUpholstery": (model.elements[1] && model.elements[1].frontcushionUpholstery) || (model.elements[0] && model.elements[0].frontcushionUpholstery) || { "upholstery": "ff0000" },
                        "location": {
                          "posX": -2,
                          "posY": 0,
                          "rot": 0
                        }
                      },
                      {
                        "type": "noArmrestsLeft_96",
                        "cushion": true,
                        "frontcushion": true,
                        "xl": true,
                        "upholstery": (model.elements[2] && model.elements[2].upholstery) || (model.elements[0] && model.elements[0].upholstery) || { "upholstery": "ff0000" },
                        "cushionUpholstery": (model.elements[2] && model.elements[2].cushionUpholstery) || (model.elements[0] && model.elements[0].cushionUpholstery) || { "upholstery": "ff0000" },
                        "frontcushionUpholstery": (model.elements[2] && model.elements[2].frontcushionUpholstery) || (model.elements[0] && model.elements[0].frontcushionUpholstery) || { "upholstery": "ff0000" },
                        "location": {
                          "posX": 2,
                          "posY": -1,
                          "rot": 0
                        }
                      },
                      {
                        "type": "noArmrests_84",
                        "cushion": false,
                        "frontcushion": false,
                        "xl": false,
                        "upholstery": (model.elements[3] && model.elements[3].upholstery) || (model.elements[0] && model.elements[0].upholstery) || { "upholstery": "ff0000" },
                        "cushionUpholstery": (model.elements[3] && model.elements[3].cushionUpholstery) || (model.elements[0] && model.elements[0].cushionUpholstery) || { "upholstery": "ff0000" },
                        "frontcushionUpholstery": (model.elements[3] && model.elements[3].frontcushionUpholstery) || (model.elements[0] && model.elements[0].frontcushionUpholstery) || { "upholstery": "ff0000" },
                        "location": {
                          "posX": 5.75,
                          "posY": -1,
                          "rot": 0
                        }
                      },
                      {
                        "type": "noArmrestsLeft_96",
                        "cushion": true,
                        "frontcushion": false,
                        "xl": false,
                        "upholstery": (model.elements[4] && model.elements[4].upholstery) || (model.elements[0] && model.elements[0].upholstery) || { "upholstery": "ff0000" },
                        "cushionUpholstery": (model.elements[4] && model.elements[4].cushionUpholstery) || (model.elements[0] && model.elements[0].cushionUpholstery) || { "upholstery": "ff0000" },
                        "frontcushionUpholstery": (model.elements[4] && model.elements[4].frontcushionUpholstery) || (model.elements[0] && model.elements[0].frontcushionUpholstery) || { "upholstery": "ff0000" },
                        "location": {
                          "posX": 5.75,
                          "posY": 2.75,
                          "rot": 270
                        }
                      }
                    ];
            }
            if (numberOfSeats.target.value  == 6) {
                model.arrangement = 'hexomino R';
                model.elements =
                    [ {
                        "type": "armrestRight_96",
                        "cushion": true,
                        "xl": false,
                        "upholstery": (model.elements[0] && model.elements[0].upholstery) || { "upholstery": "ff0000" },
                        "cushionUpholstery": (model.elements[0] && model.elements[0].cushionUpholstery) || { "upholstery": "ff0000" },
                        "frontcushionUpholstery": (model.elements[0] && model.elements[0].frontcushionUpholstery) || { "upholstery": "ff0000" },
                        "location": {
                          "posX": -6,
                          "posY": -2,
                          "rot": 180
                        }
                      },
                      {
                        "type": "armrestLeft_96",
                        "cushion": true,
                        "xl": false,
                        "upholstery": (model.elements[1] && model.elements[1].upholstery) || (model.elements[0] && model.elements[0].upholstery) || { "upholstery": "ff0000" },
                        "cushionUpholstery": (model.elements[1] && model.elements[1].cushionUpholstery) || (model.elements[0] && model.elements[0].cushionUpholstery) || { "upholstery": "ff0000" },
                        "frontcushionUpholstery": (model.elements[1] && model.elements[1].frontcushionUpholstery) || (model.elements[0] && model.elements[0].frontcushionUpholstery) || { "upholstery": "ff0000" },
                        "location": {
                          "posX": -2,
                          "posY": -2,
                          "rot": 180
                        }
                      },
                      {
                        "type": "noArmrestsLeft_96",
                        "cushion": true,
                        "xl": true,
                        "upholstery": (model.elements[2] && model.elements[2].upholstery) || (model.elements[0] && model.elements[0].upholstery) || { "upholstery": "ff0000" },
                        "cushionUpholstery": (model.elements[2] && model.elements[2].cushionUpholstery) || (model.elements[0] && model.elements[0].cushionUpholstery) || { "upholstery": "ff0000" },
                        "frontcushionUpholstery": (model.elements[2] && model.elements[2].frontcushionUpholstery) || (model.elements[0] && model.elements[0].frontcushionUpholstery) || { "upholstery": "ff0000" },
                        "location": {
                          "posX": 2,
                          "posY": -2.5,
                          "rot": 0
                        }
                      },
                      {
                        "type": "noArmrests_84",
                        "cushion": true,
                        "xl": true,
                        "upholstery": (model.elements[3] && model.elements[3].upholstery) || (model.elements[0] && model.elements[0].upholstery) || { "upholstery": "ff0000" },
                        "cushionUpholstery": (model.elements[3] && model.elements[3].cushionUpholstery) || (model.elements[0] && model.elements[0].cushionUpholstery) || { "upholstery": "ff0000" },
                        "frontcushionUpholstery": (model.elements[3] && model.elements[3].frontcushionUpholstery) || (model.elements[0] && model.elements[0].frontcushionUpholstery) || { "upholstery": "ff0000" },
                        "location": {
                          "posX": 5.75,
                          "posY": -2.5,
                          "rot": 0
                        }
                      },
                      {
                        "type": "poof_96",
                        "cushion": true,
                        "xl": false,
                        "upholstery": (model.elements[4] && model.elements[4].upholstery) || (model.elements[0] && model.elements[0].upholstery) || { "upholstery": "ff0000" },
                        "cushionUpholstery": (model.elements[4] && model.elements[4].cushionUpholstery) || (model.elements[0] && model.elements[0].cushionUpholstery) || { "upholstery": "ff0000" },
                        "frontcushionUpholstery": (model.elements[4] && model.elements[4].frontcushionUpholstery) || (model.elements[0] && model.elements[0].frontcushionUpholstery) || { "upholstery": "ff0000" },
                        "location": {
                          "posX": 2.25,
                          "posY": 1.25,
                          "rot": 90
                        }
                      },
                      {
                        "type": "noArmrestsLeft_96",
                        "cushion": true,
                        "xl": true,
                        "upholstery": (model.elements[5] && model.elements[5].upholstery) || (model.elements[0] && model.elements[0].upholstery) || { "upholstery": "ff0000" },
                        "cushionUpholstery": (model.elements[5] && model.elements[5].cushionUpholstery) || (model.elements[0] && model.elements[0].cushionUpholstery) || { "upholstery": "ff0000" },
                        "frontcushionUpholstery": (model.elements[5] && model.elements[5].frontcushionUpholstery) || (model.elements[0] && model.elements[0].frontcushionUpholstery) || { "upholstery": "ff0000" },
                        "location": {
                          "posX": 5.75,
                          "posY": 1.25,
                          "rot": 270
                        }
                      }
                    ];
            }

            console.log(model);
            model.elements.length = numberOfSeats.target.value;

            updateControlPanel(model, 'arrangement');
            updateFeaturedModel(model);
            showSelected(false);
        }
    }


    // overall width
    let maxPosX = Number.NEGATIVE_INFINITY;
    let minPosX = Number.POSITIVE_INFINITY;
    let typeAtMaxPosX;
    let typeAtMinPosX;
    let rotAtMaxPosX;
    let rotAtMinPosX;
    for (let i = 0; i < model.elements.length; i++) {

        // measure width
        if (model.elements[i].location.posX > maxPosX) {
            maxPosX = model.elements[i].location.posX;
            typeAtMaxPosX = model.elements[i].type;
            rotAtMaxPosX = model.elements[i].location.rot;
        }

        if (model.elements[i].location.posX < minPosX) {
            minPosX = model.elements[i].location.posX;
            typeAtMinPosX = model.elements[i].type;
            rotAtMinPosX = model.elements[i].location.rot;
        }
    }
    const difference = maxPosX - minPosX;
    arrWidth = difference * 24;

    if ((typeAtMinPosX === 'chair_96' && (rotAtMinPosX === 0 || rotAtMinPosX === 180)) || (typeAtMinPosX === 'armrestLeft_96' && rotAtMinPosX === 0)) {
        arrWidth += 60;
    } else if (typeAtMinPosX === 'noArmrests_84' || (typeAtMinPosX === 'poof_84' && (rotAtMinPosX === 0 || rotAtMinPosX === 180))) {
        arrWidth += 42;
    } else {
        arrWidth += 48;
    }

    if ((typeAtMaxPosX === 'chair_96' && (rotAtMaxPosX === 0 || rotAtMaxPosX === 180)) || (typeAtMaxPosX === 'armrestRight_96' && rotAtMaxPosX === 0)) {
        arrWidth += 60;
    } else if (typeAtMaxPosX === 'noArmrests_84' || (typeAtMaxPosX === 'poof_84' && (rotAtMaxPosX === 0 || rotAtMaxPosX === 180))) {
        arrWidth += 42;
    } else {
        arrWidth += 48;
    }

    console.log('Max posX: ' + maxPosX + ' (Type: ' + typeAtMaxPosX + ', Rot: ' + rotAtMaxPosX + ')');
    console.log('Min posX: ' + minPosX + ' (Type: ' + typeAtMinPosX + ', Rot: ' + rotAtMinPosX + ')');
    console.log('Difference multiplied by 24: ' + arrWidth);
    document.getElementById('widthText').textContent = arrWidth + ' cm';







    //updateCamera(arrWidth, arrWidth);
    //updateControlPanel(model, undefined, 'arrangement');
    //updateFeaturedModel(model);
    // showSelected();

    document.getElementById('numberOfSeatsText').textContent = model.elements.length + '-zits';

    /* 
    'chair_96'
    'noArmrestsLeft_96'
    'noArmrestsRight_96'
    'armrestLeft_96'
    'armrestRight_96'
    'noArmrests_84'
    'poof_84'
    'poof_96'
    */

    pricing(model);

    // is global FEATUREDMODEL for pdf really necessary?
    FEATUREDMODEL = model;
}

function showMinos(numberOfSeats, widthInElements, minoName, containerElem) {
    // Parameter validation
    if (!Array.isArray(minoName) || !minoName.every(mino => typeof mino === 'object')) {
        console.error('Invalid minoName parameter. Expecting an array of mino objects.');
        return;
    }

    if (!(containerElem instanceof Element)) {
        console.error('Invalid containerElem parameter. Expecting a valid HTML element.');
        return;
    }

    // Filter minos with either numberOfSeats equal to 4 or widthInElements equal to 3
    const filteredMinos = minoName.filter(mino => mino.numberOfSeats === numberOfSeats && mino.widthInElements === widthInElements);

    // Generate HTML using template literals
    const html = /*html*/ `
        <div class="row row-cols-4 m-0 p-0">
            ${filteredMinos.map(mino => /*html*/ `
                <!--<div id="${mino.name}" class="col d-flex align-items-center m-0 p-1 border border-1 img-fluid">-->
                 ${mino.svg}
                <!--</div>-->
            `).join('\n')}
        </div>
    `;

    // Update container element content
    containerElem.innerHTML = html;
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

    console.log(`BRAND: ${brand}, PRODUCT  ${product}, TITLE ${title}`);

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
    let noType;
    if (urlParams.has('noType')) {
        noType = "d-none";
    } else {
        noType = "d-block";
    }
    let noArrangement;
    if (urlParams.has('noArrangement')) {
        noArrangement = "d-none";
    } else {
        noArrangement = "d-block";
    }
    let noDecor;
    if (parser.getDevice().type == 'mobile' || urlParams.has('noDecor')) {
        noDecor = "d-none";
    } else {
        noDecor = "d-block";
    }
    accordions.arrangement = {
        "title": "opstelling",
        "options": ['numberOfSeats', 'width'],
        "display": noArrangement,
        "code": /*html*/ `
        <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
        <div class="d-flex justify-content-start m-0 p-0">
    
            <div class="card border-0 grid gap row-gap-3 me-5">
                <div class="h6">aantal zitplaatsen</div>
                <div class="h6 fw-normal form-check">
                    <input type="radio" class="form-check-input" name="numberOfSeats" value="1" id="nos1">
                    <label class="form-check-label" for="nos1">1</label>
                </div>
                <div class="h6 fw-normal form-check">
                    <input type="radio" class="form-check-input" name="numberOfSeats" value="2" id="nos2">
                    <label class="form-check-label" for="nos2">2</label>
                </div>
                <div class="h6 fw-normal form-check">
                    <input type="radio" class="form-check-input" name="numberOfSeats" value="3" id="nos3">
                    <label class="form-check-label" for="nos3">3</label>
                </div>
                <div class="h6 fw-normal form-check">
                    <input type="radio" class="form-check-input" name="numberOfSeats" value="4" id="nos4">
                    <label class="form-check-label" for="nos4">4</label>
                </div>
                <div class="h6 fw-normal form-check">
                    <input type="radio" class="form-check-input" name="numberOfSeats" value="5" id="nos5">
                    <label class="form-check-label" for="nos5">5</label>
                </div>
                <div class="h6 fw-normal form-check">
                    <input type="radio" class="form-check-input" name="numberOfSeats" value="6" id="nos6">
                    <label class="form-check-label" for="nos6">6</label>
                </div>
            </div>
            <div class="card border-0 grid gap row-gap-3">
                <div class="h6">breedte</div>
                <div class="h6 fw-normal form-check">
                    <input type="radio" class="form-check-input" name="widthElements" value="w1" id="w1">
                    <label class="form-check-label" for="w1">84 - 120 cm</label>
                </div>
                <div class="h6 fw-normal form-check">
                    <input type="radio" class="form-check-input" name="widthElements" value="w2" id="w2">
                    <label class="form-check-label" for="w2">168 - 216 cm</label>
                </div>
                <div class="h6 fw-normal form-check">
                    <input type="radio" class="form-check-input" name="widthElements" value="w3" id="w3">
                    <label class="form-check-label" for="w3">252 - 312 cm</label>
                </div>
                <div class="h6 fw-normal form-check">
                    <input type="radio" class="form-check-input" name="widthElements" value="w4" id="w4">
                    <label class="form-check-label" for="w4">336 - 408 cm</label>
                </div>
                <div class="h6 fw-normal form-check">
                    <input type="radio" class="form-check-input" name="widthElements" value="w5" id="w5">
                    <label class="form-check-label" for="w5">420 - 504 cm</label>
                </div>
                <!-- we don't support 6 seaters width
                <div class="h6 fw-normal form-check">
                    <input type="radio" class="form-check-input" name="widthElements" value="w6" id="w6">
                        <label class="form-check-label" for="w6">504 - 600 cm</label>
                </div>
                -->
            </div>
        </div>
    
        <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
            <div class="col-12 m-0 p-0">
                <div class="row m-0 p-0 pb-2">
                    <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                        <div id="showMinos" class="m-0 p-0"></div>
           
                    </div>
                </div>
            </div>
        </div>
    </div>`,
        "onload": function () {
            let containerElem = document.getElementById('showMinos');
            //let widthInElements = ALLARRANGEMENTS.arrangements.findIndex((item) => item.widthInElements == 3);


            var arrangementIndex = ALLARRANGEMENTS.arrangements.findIndex((item) => item.name === model.arrangement);





            //let arrangementKey = ALLARRANGEMENTS.arrangements.filter((mino) => mino.name === model.arrangement);
console.log(arrangementIndex);
           //const widthInElements = ALLARRANGEMENTS.arrangements.filter(mino => mino.name === model.arrangement);
            console.log(ALLARRANGEMENTS.arrangements[arrangementIndex].widthInElements);
            showMinos(model.elements.length, 3, ALLARRANGEMENTS.arrangements, containerElem);

        }
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
                <input type="radio" class="form-check-input" name="type" id="chair_96">
                <label class="form-check-label" for="chair_96">chair_96</label>
            </div>
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
    accordions.upholstery = {
        "title": "bekleding",
        "options": ['upholstery'],
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
            addColors('upholstery', ALLCOLORS.upholstery, containerElem);
        }
    }
    return { accordions };
}