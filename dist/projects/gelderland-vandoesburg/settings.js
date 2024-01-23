"use strict"
var UNITY_INSTANCE;
var ALLMODELS;
var ALLCOLORS;
var ALLCOMPsixNTS;
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
    window.location.href = `whatsapp://send?text=See%20my%20configuration!%20https://furnitise.nl/demos?brand=${brand}&product=${product}&data=${encodeURICompsixnt(JSON.stringify(model))}`
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

function filterArrangements() {
    const seatsDropdown = document.getElementById('seatsDropdown');
    const widthDropdown = document.getElementById('widthDropdown');

    const seatsFilter = seatsDropdown.value;
    const widthFilter = widthDropdown.value;

    enableWidthOptions(seatsFilter);

    const filteredArrangements = ALLARRANGEMENTS.arrangements.filter(arrangement => {
        const seatsMatch = seatsFilter == arrangement.numberOfSeats;
        const widthMatch = widthFilter == arrangement.widthInElements;

        // Display arrangements if both seats and width match
        return seatsMatch && widthMatch;
    });

    displayArrangements(filteredArrangements);
}

function enableWidthOptions(seatsFilter) {
    const widthDropdown = document.getElementById('widthDropdown');
    const widthOptions = widthDropdown.querySelectorAll('option');

    // Enable all options first
    widthOptions.forEach(option => {
        option.style.display = 'nsix';
        option.disabled = true;
    });

    // Define the indices of options to be displayed based on seatsFilter
    let displayIndices = [];

    if (seatsFilter == 1) {
        displayIndices = [0];
    } else if (seatsFilter == 2) {
        displayIndices = [1];
    } else if (seatsFilter == 3) {
        displayIndices = [1, 2];
    } else if (seatsFilter == 4) {
        displayIndices = [1, 2, 3];
    } else if (seatsFilter == 5) {
        displayIndices = [2, 3, 4];
    } else if (seatsFilter == 6) {
        displayIndices = [3, 4];
    }

    displayIndices.forEach(index => {
        if (index >= 0 && index < widthOptions.length) {
            widthOptions[index].style.display = 'block';
            widthOptions[index].disabled = false;
        }
    });
}

function displayArrangements(arrangements) {
    const arrangementContainer = document.getElementById('arrangementContainer');
    arrangementContainer.innerHTML = '';

    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row', 'row-cols-xxl-5', 'row-cols-xl-4', 'row-cols-lg-3', 'row-cols-md-3', 'row-cols-sm-2', 'row-cols-xs-2', 'align-items-center', 'm-0', 'p-0');
    arrangementContainer.appendChild(rowDiv);

    arrangements.forEach(arrangement => {
        const outerDiv = document.createElement('div');
        outerDiv.classList.add('col', 'm-0', 'p-3', 'ps-0', 'pb-0');

        const input = document.createElement('input');
        input.classList.add('btn-check',);
        input.setAttribute('type', 'radio');
        input.setAttribute('name', 'arrangements');
        input.setAttribute('id', arrangement.name);

        const label = document.createElement('label', 'm-0', 'p-0');
        label.classList.add('btn', 'btn-outline-dark', 'rounded-0');
        label.setAttribute('for', arrangement.name);
        label.style.aspectRatio = '1/1';

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.innerHTML = arrangement.svg;

        svg.style.width = '100%';
        svg.style.aspectRatio = '1/1';

        outerDiv.appendChild(input);
        outerDiv.appendChild(label);
        label.appendChild(svg);

        rowDiv.appendChild(outerDiv);
    });
}

// Update the event listener for seatsDropdown to directly call filterArrangements
document.getElementById('seatsDropdown').addEventListener('change', function () {
    filterArrangements();
});

// Initial setup for widthDropdown
document.getElementById('widthDropdown').addEventListener('change', function () {
    const seatsDropdown = document.getElementById('seatsDropdown');
    const seatsFilter = seatsDropdown.value;
    enableWidthOptions(seatsFilter);
    filterArrangements();
});

// Initial display of all arrangements
filterArrangements();

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
        featuredModels.classList.add('d-nsix');
    } else {
        featuredModels.classList.remove('d-nsix');
        featuredModels.classList.add('d-block');
    }

    //background
    if (model.background.lighter == undefined) {
        var bgColor = pSBC(0, '#' + model.background.original);
        model.background = { "original": model.background.original, "lighter": bgColor.substring(1) };
    }

    //arrangement
    /*
        const numberOfSeatsValues = document.querySelectorAll('input[type=radio][name="numberOfSeats"]');
        for (const numberOfSeatsValue of numberOfSeatsValues) {
            numberOfSeatsValue.onclick = (numberOfSeats) => {
    
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
                if (numberOfSeats.target.value == 2) {
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
                if (numberOfSeats.target.value == 3 && document.querySelector('input[name="widthElements"]:checked').value=== 2) {
                    model.arrangement = 'tromino-L';
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
                                "posY": 1,
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
                                "posX": 2,
                                "posY": 1,
                                "rot": 0
                            }
                        },
                        {
                            "type": "poof_96",
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
                if (numberOfSeats.target.value == 3 && document.querySelector('input[name="widthElements"]:checked').value === 3) {
                    model.arrangement = 'tromino-I';
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
                if (numberOfSeats.target.value == 4) {
                    model.arrangement = 'tetromino-I';
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
                if (numberOfSeats.target.value == 5) {
                    model.arrangement = 'pentomino-L';
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
                if (numberOfSeats.target.value == 6) {
                    model.arrangement = 'hexomino-R';
                    model.elements =
                        [{
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
                let arrangementIndex = ALLARRANGEMENTS.arrangements.findIndex((item) => item.name === model.arrangement);
                let widthInElements = ALLARRANGEMENTS.arrangements[arrangementIndex].widthInElements;
    
                console.log(model.elements.length);
                console.log(widthInElements);
                showMinos(model.elements.length, widthInElements);
            }
    
        }*/
    let arrangementIndex = ALLARRANGEMENTS.arrangements.findIndex((item) => item.name === model.arrangement);
    let widthInElements = ALLARRANGEMENTS.arrangements[arrangementIndex].widthInElements;
    let polyminoName = ALLARRANGEMENTS.arrangements[arrangementIndex].name;

    console.log(polyminoName);

    document.getElementById('seatsDropdown').value = model.elements.length;
    document.getElementById('widthDropdown').value = widthInElements;
    //document.getElementById('polyminoName').classList.toggle("active");

    filterArrangements();
    //document.getElementById('polyminoName').classList.toggle("active");
    document.getElementById(polyminoName).checked = true;


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

        document.getElementById('type_' + (i + 1) + 'Text').textContent = model.elements[i].type;
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

function showMinos(numberOfSeats, widthInElements, containerElem) {

    console.log(numberOfSeats);
    console.log(widthInElements);

    const filteredMinos = ALLARRANGEMENTS.arrangements.filter(item => item.numberOfSeats === numberOfSeats && item.widthInElements === widthInElements);

    console.log(filteredMinos);

    const html = `<div class="row row-cols-6 m-0 p-0">
      ${filteredMinos.map(mino => `
      <div id="${mino.name}" class="col d-flex align-items-center m-0 p-1 border border-1">
        ${mino.svg}
      </div>
      `).join('\n')}
    </div>`;

    document.getElementById('minoContainer').innerHTML = html;
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
    const compsixntsPromise = fetch(`${buildUrl}/components.json`).then(response => response.json());
    UNITY_INSTANCE = await unityPromise;
    ALLCOLORS = await colorsPromise;
    ALLCOMPsixNTS = await compsixntsPromise;

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
        let model = JSON.parse(decodeURICompsixnt(modelData));
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
        noType = "d-nsix";
    } else {
        noType = "d-block";
    }
    let noArrangement;
    if (urlParams.has('noArrangement')) {
        noArrangement = "d-nsix";
    } else {
        noArrangement = "d-block";
    }
    let noDecor;
    if (parser.getDevice().type == 'mobile' || urlParams.has('noDecor')) {
        noDecor = "d-nsix";
    } else {
        noDecor = "d-block";
    }
    accordions.arrangement = {
        "title": "opstelling",
        "options": ['numberOfSeats', 'width'],
        "display": noArrangement,
        "code": /*html*/ `
        <div class="row m-0 p-0">
        <div class="d-flex justify-content-start m-0 p-0">
    
            <div class="card border-0 me-5">
                <label class="mb-3" for="seatsDropdown">aantal zitplaatsen</label>
                <select class="form-select rounded-0" id="seatsDropdown" onchange="filterArrangements()">
                    <!--<option id="nosAll" value="all">tot 6</option>-->
                    <option id="nos1" value="1">1</option>
                    <option id="nos2" value="2">2</option>
                    <option id="nos3" value="3">3</option>
                    <option id="nos4" value="4">4</option>
                    <option id="nos5" value="5">5</option>
                    <option id="nos6" value="6">6</option>
                </select> 
            </div>
            <div class="card border-0">
                <label class="mb-3" for="widthDropdown">breedte</label>
                <select class="form-select rounded-0" id="widthDropdown" onchange="filterArrangements()">
                    <!--<option id="wAll" value="all">84 - 504 cm</option>-->
                    <option id="w1" value="1">84 - 120 cm</option>
                    <option id="w2" value="2">168 - 216 cm</option>
                    <option id="w3" value="3">252 - 312 cm</option>
                    <option id="w4" value="4">336 - 408 cm</option>
                    <option id="w5" value="5">429 - 504 cm</option>
                </select>
            </div>
    
        </div>
        <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
            <div class="col-12 m-0 p-0">
                <div class="row m-0 p-0 pb-2">
                    <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                        <div id="arrangementContainer" class="m-0 p-0 mt-3">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    }
    if (model.elements.length >= 1) {
        accordions.elementsix = {
            "title": "element 1",
            "options": ['type_1', 'color'],
            "display": "d-block",
            "code": /*html*/ ` 
        <ul class="nav nav-tabs" id="elementOneTab">
            <li class="nav-item">
                <button class="nav-link active" id="type-one" data-bs-toggle="tab" data-bs-target="#type-one-pane" type="button" aria-controls="type-one-pane" aria-selected="true">Type</button>
            </li>
            <li class="nav-item">
                <button class="nav-link" id="options-one" data-bs-toggle="tab" data-bs-target="#options-one-pane" type="button" aria-controls="options-one-pane" aria-selected="false">Opties</button>
            </li>
            <li class="nav-item">
                <button class="nav-link" id="upholstery-one" data-bs-toggle="tab" data-bs-target="#upholstery-one-pane" type="button" aria-controls="upholstery-one-pane" aria-selected="false">Bekleding</button>
            </li>
        </ul>
        
        <div class="tab-content" id="elementOneTabContent">
            
            <div class="tab-pane fade show active" id="type-one-pane" aria-labelledby="type-one" tabindex="0">
                <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                    <div class="d-flex justify-content-start m-0 p-0">
                        <div class="card border-0 grid gap row-gap-3 me-5">

                        <!--
                        'chair_96'
                        'noArmrestsLeft_96'
                        'noArmrestsRight_96'
                        'armrestLeft_96'
                        'armrestRight_96'
                        'noArmrests_84'
                        'poof_84'
                        'poof_96'
                        -->


                            <div class="h6 fw-normal form-check">
                                <input type="radio" class="form-check-input" name="type" id="one-chair_96">
                                <label class="form-check-label" for="one-chair_96">
             


                                    <svg xmlns="http://www.w3.org/2000/svg" width="100" viewBox="0 0 130 130">

    <rect x='2' y='2' width='24' height='96' fill='none' stroke='#000' stroke-width='2' />
    <rect x='98' y='2' width='24' height='96' fill='none' stroke='#000' stroke-width='2' />
    <rect x='26' y='2' width='72' height='24' fill='none' stroke='#000' stroke-width='2' />
    <line x1="14" y1="14" x2="110" y2="14" stroke='#000' stroke-width='1' stroke-dasharray="4" />
    <line x1="14" y1="14" x2="14" y2="98" stroke='#000' stroke-width='1' stroke-dasharray="4" />
    <line x1="110" y1="14" x2="110" y2="98" stroke='#000' stroke-width='1' stroke-dasharray="4" />
    <line x1="26" y1="98" x2="98" y2="98" stroke='#000' stroke-width='2' />
</svg>
                                </label>
                            </div>

                            <div class="h6 fw-normal form-check">
                                <input type="radio" class="form-check-input" name="type" id="one-noArmrestsRight_96">
                                <label class="form-check-label" for="one-noArmrestsRight_96">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 120 120">
                                        <rect x='0' y='0' width='84' height='24' fill='none' stroke='#000' stroke-width='2' />
                                        <line x1="0" y1="12" x2="0" y2="96" stroke='#000' stroke-width='2' />
                                        <line x1="0" y1="96" x2="96" y2="96" stroke='#000' stroke-width='2' />
                                        <line x1="96" y1="96" x2="96" y2="12" stroke='#000' stroke-width='2' />
                                        <line x1="96" y1="12" x2="84" y2="12"stroke='#000' stroke-width='2' />
                                        <line x1="0" y1="12" x2="84" y2="12" stroke='#000' stroke-width='1' stroke-dasharray="4" />
                                    </svg>
                                </label>
                            </div>

                            <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="type" id="one-noArmrestsLeft_96">
                                <label class="form-check-label" for="one-noArmrestsLeft_96">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="54" height="51" viewBox="0 0 102 110">
                                        <rect x='12' y='0' width='84' height='24' fill='none' stroke='#000' stroke-width='2' />
                                        <line x1="0" y1="12" x2="0" y2="96" stroke='#000' stroke-width='2' />
                                        <line x1="0" y1="96" x2="96" y2="96" stroke='#000' stroke-width='2' />
                                        <line x1="96" y1="96" x2="96" y2="12" stroke='#000' stroke-width='2' />
                                        <line x1="0" y1="12" x2="12" y2="12"stroke='#000' stroke-width='2' />
                                        <line x1="12" y1="12" x2="96" y2="12" stroke='#000' stroke-width='1' stroke-dasharray="4" />
                                    </svg>
                                </label>
                        </div>


          
                    
                            <div class="h6 fw-normal form-check">
                                <input type="radio" class="form-check-input" name="type" id="one-armrestLeft_96">
                                <label class="form-check-label" for="one-armrestLeft_96">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="54" height="51" viewBox="0 0 102 110">
                                    <rect x='24' y='0' width='84' height='24' fill='none' stroke='#000' stroke-width='2' />
                                    <rect x='0' y='0' width='24' height='96' fill='none' stroke='#000' stroke-width='2' />
                                    
                                    <line x1="0" y1="96" x2="96" y2="96" stroke='#000' stroke-width='2' />
                                    <line x1="96" y1="96" x2="96" y2="12" stroke='#000' stroke-width='2' />
                                    <line x1="12" y1="12" x2="12" y2="96" stroke='#000' stroke-width='1' stroke-dasharray="4" />
                                    <line x1="12" y1="12" x2="96" y2="12" stroke='#000' stroke-width='1' stroke-dasharray="4" />
                                </svg>
                                </label>
                            </div>




                            <div class="h6 fw-normal form-check">
                                <input type="radio" class="form-check-input" name="type" id="armrestRight_96">
                                <label class="form-check-label" for="armrestRight_96">armleuning rechts</label>
                            </div>
                            <div class="h6 fw-normal form-check">
                                <input type="radio" class="form-check-input" name="type" id="noArmrests_84">
                                <label class="form-check-label" for="noArmrests_84">geen armleuningen</label>
                            </div>
                        </div>
                        <div class="card border-0 grid gap row-gap-3">
                            <div class="h6 fw-normal form-check">
                                <input type="radio" class="form-check-input" name="type" id="poof_84">
                                <label class="form-check-label" for="poof_84">poof 84cm</label>
                            </div>
                            <div class="h6 fw-normal form-check">
                                <input type="radio" class="form-check-input" name="type" id="poof_96">
                                <label class="form-check-label" for="poof_96">poof 96cm</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
            <div class="tab-pane fade" id="options-one-pane" aria-labelledbSy="options-one" tabindex="0">
            2
            </div>

            <div class="tab-pane fade" id="upholstery-tab-one" aria-labelledby="upholstery-one" tabindex="0">
                <div id="subUpholstery" class="accordion-collapse collapse" data-bs-parent="#subAccordion">
                    <div class="accordion-body">
                        <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                            <div class="col-xxl-5 col-xl-5 col-12 m-0 p-0">
                                <div class="row m-0 p-0 pb-2">
                                    <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                                        <div id="insideColorPicker" class="m-0 p-0"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>`,
            "onload": function () {
                let containerElem = document.getElementsByClassName("insideColorPicker");
                addColors('upholstery', ALLCOLORS.upholstery, containerElem);
            }
        }
    }
    if (model.elements.length >= 2) {
        accordions.elementTwo = {
            "title": "element 2",
            "options": ['type_2', 'color'],
            "display": "d-block",
            "code": /*html*/ ` 
            <ul class="nav nav-tabs" id="elementTwoTab">
            <li class="nav-item">
                <button class="nav-link active" id="type-two" data-bs-toggle="tab" data-bs-target="#type-two-pane" type="button" aria-controls="type-two-pane" aria-selected="true">Type</button>
            </li>
            <li class="nav-item">
                <button class="nav-link" id="options-two" data-bs-toggle="tab" data-bs-target="#options-two-pane" type="button" aria-controls="options-two-pane" aria-selected="false">Opties</button>
            </li>
            <li class="nav-item">
                <button class="nav-link" id="upholstery-two" data-bs-toggle="tab" data-bs-target="#upholstery-two-pane" type="button" aria-controls="upholstery-two-pane" aria-selected="false">Bekleding</button>
            </li>
        </ul>
        
        <div class="tab-content" id="elementTwoTabContent">
            
            <div class="tab-pane fade show active" id="type-two-pane" aria-labelledby="type-two" tabindex="0">
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
                </div>
            </div>
        
            <div class="tab-pane fade" id="options-two-pane" aria-labelledbSy="options-two" tabindex="0">
            2
            </div>

            <div class="tab-pane fade" id="upholstery-tab-two" aria-labelledby="upholstery-two" tabindex="0">
                <div id="subUpholstery" class="accordion-collapse collapse" data-bs-parent="#subAccordion">
                    <div class="accordion-body">
                        <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                            <div class="col-xxl-5 col-xl-5 col-12 m-0 p-0">
                                <div class="row m-0 p-0 pb-2">
                                    <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                                        <div id="insideColorPicker" class="m-0 p-0"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>`,
            "onload": function () {
                let containerElem = document.getElementsByClassName("insideColorPicker");
                addColors('upholstery', ALLCOLORS.upholstery, containerElem);
            }
        }
    }
    if (model.elements.length >= 3) {
        accordions.elementThree = {
            "title": "element 3",
            "options": ['type_3', 'color'],
            "display": "d-block",
            "code": /*html*/ ` 
            <ul class="nav nav-tabs" id="elementThreeTab">
            <li class="nav-item">
                <button class="nav-link active" id="type-three" data-bs-toggle="tab" data-bs-target="#type-three-pane" type="button" aria-controls="type-three-pane" aria-selected="true">Type</button>
            </li>
            <li class="nav-item">
                <button class="nav-link" id="options-three" data-bs-toggle="tab" data-bs-target="#options-three-pane" type="button" aria-controls="options-three-pane" aria-selected="false">Opties</button>
            </li>
            <li class="nav-item">
                <button class="nav-link" id="upholstery-three" data-bs-toggle="tab" data-bs-target="#upholstery-three-pane" type="button" aria-controls="upholstery-three-pane" aria-selected="false">Bekleding</button>
            </li>
        </ul>
        
        <div class="tab-content" id="elementThreeTabContent">
            
            <div class="tab-pane fade show active" id="type-three-pane" aria-labelledby="type-three" tabindex="0">
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
                </div>
            </div>
        
            <div class="tab-pane fade" id="options-three-pane" aria-labelledbSy="options-three" tabindex="0">
            2
            </div>

            <div class="tab-pane fade" id="upholstery-tab-three" aria-labelledby="upholstery-three" tabindex="0">
                <div id="subUpholstery" class="accordion-collapse collapse" data-bs-parent="#subAccordion">
                    <div class="accordion-body">
                        <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                            <div class="col-xxl-5 col-xl-5 col-12 m-0 p-0">
                                <div class="row m-0 p-0 pb-2">
                                    <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                                        <div id="insideColorPicker" class="m-0 p-0"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>`,
            "onload": function () {
                let containerElem = document.getElementsByClassName("insideColorPicker");
                addColors('upholstery', ALLCOLORS.upholstery, containerElem);
            }
        }
    }
    if (model.elements.length >= 4) {
        accordions.elementVier = {
            "title": "element 4",
            "options": ['type_4', 'color'],
            "display": "d-block",
            "code": /*html*/ ` 
            <ul class="nav nav-tabs" id="elementFourTab">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="type-four" data-bs-toggle="tab" data-bs-target="#type-four-pane" type="button" role="tab" aria-controls="type-four-pane" aria-selected="true">Type</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="options-four" data-bs-toggle="tab" data-bs-target="#options-four-pane" type="button" role="tab" aria-controls="options-four-pane" aria-selected="false">Opties</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="upholstery-four" data-bs-toggle="tab" data-bs-target="#upholstery-four-pane" type="button" role="tab" aria-controls="upholstery-four-pane" aria-selected="false">Bekleding</button>
            </li>
        </ul>
        
        <div class="tab-content" id="elementFourTabContent">
            
            <div class="tab-pane fade show active" id="type-four-pane" aria-labelledby="type-four" tabindex="0">
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
                </div>
            </div>
        
            <div class="tab-pane fade" id="options-four-pane" aria-labelledbSy="options-four" tabindex="0">
            2
            </div>

            <div class="tab-pane fade" id="upholstery-tab-four" aria-labelledby="upholstery-four" tabindex="0">
                <div id="subUpholstery" class="accordion-collapse collapse" data-bs-parent="#subAccordion">
                    <div class="accordion-body">
                        <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                            <div class="col-xxl-5 col-xl-5 col-12 m-0 p-0">
                                <div class="row m-0 p-0 pb-2">
                                    <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                                        <div id="insideColorPicker" class="m-0 p-0"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>`,
            "onload": function () {
                let containerElem = document.getElementsByClassName("insideColorPicker");
                addColors('upholstery', ALLCOLORS.upholstery, containerElem);
            }
        }
    }
    if (model.elements.length >= 5) {
        accordions.elementFive = {
            "title": "element 5",
            "options": ['type_5', 'color'],
            "display": "d-block",
            "code": /*html*/ ` 
            <ul class="nav nav-tabs" id="elementFiveTab">
            <li class="nav-item">
                <button class="nav-link active" id="type-five" data-bs-toggle="tab" data-bs-target="#type-five-pane" type="button" aria-controls="type-five-pane" aria-selected="true">Type</button>
            </li>
            <li class="nav-item">
                <button class="nav-link" id="options-five" data-bs-toggle="tab" data-bs-target="#options-five-pane" type="button" aria-controls="options-five-pane" aria-selected="false">Opties</button>
            </li>
            <li class="nav-item">
                <button class="nav-link" id="upholstery-five" data-bs-toggle="tab" data-bs-target="#upholstery-five-pane" type="button" aria-controls="upholstery-five-pane" aria-selected="false">Bekleding</button>
            </li>
        </ul>
        
        <div class="tab-content" id="elementFiveTabContent">
            
            <div class="tab-pane fade show active" id="type-five-pane" aria-labelledby="type-five" tabindex="0">
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
                </div>
            </div>
        
            <div class="tab-pane fade" id="options-five-pane" aria-labelledbSy="options-five" tabindex="0">
            2
            </div>

            <div class="tab-pane fade" id="upholstery-tab-five" aria-labelledby="upholstery-five" tabindex="0">
                <div id="subUpholstery" class="accordion-collapse collapse" data-bs-parent="#subAccordion">
                    <div class="accordion-body">
                        <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                            <div class="col-xxl-5 col-xl-5 col-12 m-0 p-0">
                                <div class="row m-0 p-0 pb-2">
                                    <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                                        <div id="insideColorPicker" class="m-0 p-0"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>`,
            "onload": function () {
                let containerElem = document.getElementsByClassName("insideColorPicker");
                addColors('upholstery', ALLCOLORS.upholstery, containerElem);
            }
        }
    }
    if (model.elements.length >= 6) {
        accordions.elementSix = {
            "title": "element 6",
            "options": ['type_6', 'color'],
            "display": "d-block",
            "code": /*html*/ ` 
            <ul class="nav nav-tabs" id="elementSixTab">
            <li class="nav-item">
                <button class="nav-link active" id="type-six" data-bs-toggle="tab" data-bs-target="#type-six-pane" type="button" aria-controls="type-six-pane" aria-selected="true">Type</button>
            </li>
            <li class="nav-item">
                <button class="nav-link" id="options-six" data-bs-toggle="tab" data-bs-target="#options-six-pane" type="button" aria-controls="options-six-pane" aria-selected="false">Opties</button>
            </li>
            <li class="nav-item">
                <button class="nav-link" id="upholstery-six" data-bs-toggle="tab" data-bs-target="#upholstery-six-pane" type="button" aria-controls="upholstery-six-pane" aria-selected="false">Bekleding</button>
            </li>
        </ul>
        
        <div class="tab-content" id="elementSixTabContent">
            
            <div class="tab-pane fade show active" id="type-six-pane" aria-labelledby="type-six" tabindex="0">
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
                </div>
            </div>
        
            <div class="tab-pane fade" id="options-six-pane" aria-labelledbSy="options-six" tabindex="0">
            2
            </div>

            <div class="tab-pane fade" id="upholstery-tab-six" aria-labelledby="upholstery-six" tabindex="0">
                <div id="subUpholstery" class="accordion-collapse collapse" data-bs-parent="#subAccordion">
                    <div class="accordion-body">
                        <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                            <div class="col-xxl-5 col-xl-5 col-12 m-0 p-0">
                                <div class="row m-0 p-0 pb-2">
                                    <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                                        <div id="insideColorPicker" class="m-0 p-0"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>`,
            "onload": function () {
                let containerElem = document.getElementsByClassName("insideColorPicker");
                addColors('upholstery', ALLCOLORS.upholstery, containerElem);
            }
        }
    }
    return { accordions };
}