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
        option.style.display = 'none';
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
                            "type": "hocker_96",
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
                            "type": "hocker_96",
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
                            "type": "hocker_96",
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
        const elem = model.elements[i];

        // Measure width
        if (elem.location.posX > maxPosX) {
            maxPosX = elem.location.posX;
            [typeAtMaxPosX, rotAtMaxPosX] = [elem.type, elem.location.rot];
        }

        if (elem.location.posX < minPosX) {
            minPosX = elem.location.posX;
            [typeAtMinPosX, rotAtMinPosX] = [elem.type, elem.location.rot];
        }

        // Set radio buttons and checkboxes
        const radioTypeId = `${i + 1}-${elem.type}`;
        document.getElementById(radioTypeId).checked = true;

        const checkboxes = {
            xl: `${i + 1}-xl`,
            cushion: `${i + 1}-cushion`,
            frontcushion: `${i + 1}-frontcushion`
        };

        elem.cushion = ['hocker_84', 'hocker_96'].includes(elem.type) ? false : elem.cushion;

        document.getElementById(checkboxes.cushion).disabled = ['hocker_84', 'hocker_96'].includes(elem.type);
        document.getElementById(checkboxes.frontcushion).disabled = ['hocker_84', 'hocker_96'].includes(elem.type);

        for (const checkbox of Object.values(checkboxes)) {
            document.getElementById(checkbox).checked = elem[checkbox.split('-')[1]];
        }

        document.getElementById(checkboxes.frontcushion).disabled = !elem.cushion;

        // Event listeners for radio buttons
        document.querySelectorAll(`input[type=radio][name='${i + 1}-type']`).forEach((typeValue) => {
            typeValue.onclick = (item) => {
                elem.type = item.target.value;
                updateControlPanel(model, `element_${i + 1}`);
                updateFeaturedModel(model);
                showSelected(false);
            };
        });

        // Event listeners for checkboxes
        const handleCheckboxClick = (checkbox, property) => {
            console.log(checkbox.target.value);
            elem[property] = checkbox.checked;

            updateControlPanel(model, `element_${i + 1}`);
            updateFeaturedModel(model);
            showSelected(false);
        };

        document.getElementById(`${i + 1}-xl`).onclick = (event) => handleCheckboxClick(event, 'xl');
        document.getElementById(`${i + 1}-cushion`).onclick = (event) => handleCheckboxClick(event, 'cushion');
        document.getElementById(`${i + 1}-frontcushion`).onclick = (event) => handleCheckboxClick(event, 'frontcushion');

        // Display SVGs
        const typeSvgMap = {
            'chair_96': ALLARRANGEMENTS.elements.chair_96.svg,
            'noArmrestsRight_96': ALLARRANGEMENTS.elements.noArmrestsRight_96.svg,
            'noArmrestsLeft_96': ALLARRANGEMENTS.elements.noArmrestsLeft_96.svg,
            'noArmrests_84': ALLARRANGEMENTS.elements.noArmrests_84.svg,
            'armrestRight_96': ALLARRANGEMENTS.elements.armrestRight_96.svg,
            'armrestLeft_96': ALLARRANGEMENTS.elements.armrestLeft_96.svg,
            'hocker_84': ALLARRANGEMENTS.elements.hocker_84.svg,
            'hocker_96': ALLARRANGEMENTS.elements.hocker_96.svg,
        };

        document.getElementById(`type_${i + 1}Text`).innerHTML = typeSvgMap[elem.type] || '';

        //upholstery
        const upholsteryColor = elem.upholstery.upholstery;
        var upholsteryColorIndex = ALLCOLORS.upholsteryColors.findIndex((item) => item.colorHex == upholsteryColor);
        
        var upholsteryColorValue = document.querySelectorAll(`.upholsteryColors${i + 1}_colorButton`);
       
console.log(upholsteryColorValue);
/*
        if (parser.getDevice().type != 'mobile' && parser.getDevice().type != 'tablet') {
            upholsteryColorValue.forEach(item => item.addEventListener('mouseover', () => {
                //document.getElementById('upholsteryColorsText').style.visibility = 'visible';
                //document.getElementById('upholsteryColorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: ' + document.getElementById(item.id).style.backgroundColor + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + document.getElementById(item.id).alt + '';
                //document.getElementById('upholsteryColorsText').classList.add('fst-italic');
                updateFeaturedModel(model, false);
                showSelected(true);
            }));

            upholsteryColorValue.forEach(item => item.addEventListener('mouseout', () => {
                //document.getElementById('upholsteryColorsText').style.visibility = 'hidden';
                //document.getElementById('upholsteryColorsText').classList.remove('fst-italic');
                updateFeaturedModel(model, false);
                showSelected(true);
            }));
        }
*/
        upholsteryColorValue.forEach(item => item.addEventListener('click', () => {

console.log('hello');

            upholsteryColorValue.forEach(item => { item.classList.remove('colorButtonActive') });
            const upholsteryColorId = item.id.split('_');
            upholsteryColorIndex = upholsteryColorId[1];

            console.log(upholsteryColorId);
console.log(ALLCOLORS.upholsteryColors[upholsteryColorIndex].colorHex);
            model.elements[i].upholstery.upholstery = ALLCOLORS.upholsteryColors[upholsteryColorIndex].colorHex;
            document.getElementById(`upholsteryColors${i + 1}Index_${upholsteryColorIndex}`).classList.add('colorButtonActive');

            updateControlPanel(model, `element_${i + 1}`);
            updateFeaturedModel(model, false);
            showSelected(true);
        }));
        //model.upholstery.code = ALLCOLORS.upholsteryColors[upholsteryColorIndex].colorCode;
        //model.upholstery.name = ALLCOLORS.upholsteryColors[upholsteryColorIndex].colorName;
        //document.getElementById('upholsteryColorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: #' + elem.upholstery.upholstery + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + elem.upholstery.name;
        document.getElementById(`upholsteryColors${i + 1}Index_${upholsteryColorIndex}`).classList.remove('colorButton');
        document.getElementById(`upholsteryColors${i + 1}Index_${upholsteryColorIndex}`).classList.add('colorButtonActive');
                              

        document.getElementById(`color_${i + 1}Text`).innerHTML = `<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: #${elem.upholstery.upholstery}">`;
    }

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

    console.log('Max posX: ' + maxPosX + ' (Type: ' + typeAtMaxPosX + ', Rot: ' + rotAtMaxPosX + ')');
    console.log('Min posX: ' + minPosX + ' (Type: ' + typeAtMinPosX + ', Rot: ' + rotAtMinPosX + ')');
    console.log('Difference multiplied by 24: ' + arrWidth);
    document.getElementById('widthText').textContent = arrWidth + ' cm';

    //updateCamera(arrWidth, arrWidth);
    //updateControlPanel(model, undefined, 'arrangement');
    //updateFeaturedModel(model);
    // showSelected();

    document.getElementById('numberOfSeatsText').textContent = model.elements.length + '-zits';

    //upholstery




    pricing(model);

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
        accordions.element_1 = {
            "title": "element 1",
            "options": ['type_1', 'color_1'],
            "display": "d-block",
            "code": /*html*/ ` 
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
            <div class="d-flex justify-content-start m-0 p-0 pt-2">
                <div class="card border-0 grid gap row-gap-3 me-5">
        
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="1-type" id="1-chair_96" value="chair_96">
                        <label class="form-check-label" for="1-chair_96">
                            ${ALLARRANGEMENTS.elements.chair_96.svg}&nbsp;&nbsp;&nbsp;fauteuil
                        </label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="1-type" id="1-noArmrestsRight_96"
                            value="noArmrestsRight_96">
                        <label class="form-check-label" for="1-noArmrestsRight_96">
                            ${ALLARRANGEMENTS.elements.noArmrestsRight_96.svg}&nbsp;&nbsp;&nbsp;geen armleuningen -
                            rechts
                        </label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="1-type" id="1-noArmrestsLeft_96"
                            value="noArmrestsLeft_96">
                        <label class="form-check-label" for="1-noArmrestsLeft_96">
                            ${ALLARRANGEMENTS.elements.noArmrestsLeft_96.svg}&nbsp;&nbsp;&nbsp;geen armleuningen - links
                        </label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="1-type" id="1-noArmrests_84" value="noArmrests_84">
                        <label class="form-check-label" for="1-noArmrests_84">
                            ${ALLARRANGEMENTS.elements.noArmrests_84.svg}&nbsp;&nbsp;&nbsp;geen armleuningen
                        </label>
                    </div>
                </div>
                <div class="card border-0 grid gap row-gap-3">
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="1-type" id="1-armrestLeft_96" value="armrestLeft_96">
                        <label class="form-check-label" for="1-armrestLeft_96">
                            ${ALLARRANGEMENTS.elements.armrestLeft_96.svg}&nbsp;&nbsp;&nbsp;armleuning links
                        </label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="1-type" id="1-armrestRight_96"
                            value="armrestRight_96">
                        <label class="form-check-label" for="1-armrestRight_96">
                            ${ALLARRANGEMENTS.elements.armrestRight_96.svg}&nbsp;&nbsp;&nbsp;armleuning rechts
                        </label>
                    </div>
        
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="1-type" id="1-hocker_84" value="hocker_84">
                        <label class="form-check-label" for="1-hocker_84">
                            ${ALLARRANGEMENTS.elements.hocker_84.svg}&nbsp;&nbsp;&nbsp;hocker 84cm breed
                        </label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="1-type" id="1-hocker_96" value="hocker_96">
                        <label class="form-check-label" for="1-hocker_96">
                            ${ALLARRANGEMENTS.elements.hocker_96.svg}&nbsp;&nbsp;&nbsp;hocker 96cm breed
                        </label>
                    </div>
                </div>
            </div>
        
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                <div class="d-flex justify-content-start m-0 p-0 pt-4">
                    <div class="card border-0 grid gap row-gap-3 me-5">


                        <div class="h6 fw-normal form-check">
                            <input type="checkbox" class="form-check-input" id="1-cushion" value="cushion">
                            <label class="form-check-label" for="1-cushion">rugkussen</label>
                        </div>
                        <div class="h6 fw-normal form-check">
                            <input type="checkbox" class="form-check-input" id="1-xl" value="xl">
                            <label class="form-check-label" for="1-xl">xl (zitting wordt verlengt)</label>
                        </div>
                    </div>
                    <div class="card border-0 grid gap row-gap-3">           
                        <div class="h6 fw-normal form-check">
                            <input type="checkbox" class="form-check-input" id="1-frontcushion" value="frontcushion">
                            <label class="form-check-label" for="1-frontcushion">extra rugkussen</label>
                        </div>
                    </div>
                </div>
            </div>
        
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                <div class="col-12 m-0 p-0">
                    <div class="row m-0 p-0 pb-2">
                        <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                            <div id="upholsteryColorPickerOne" class="m-0 p-0"></div>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>`,
            "onload": function () {
                let containerElemOne = document.getElementById("upholsteryColorPickerOne");
                addTextures('upholsteryColors1', ALLCOLORS.upholsteryColors, containerElemOne);
            }
        }
    }
    if (model.elements.length >= 2) {
        accordions.element_2 = {
            "title": "element 2",
            "options": ['type_2', 'color_2'],
            "display": "d-block",
            "code": /*html*/ ` 
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
            <div class="d-flex justify-content-start m-0 p-0 pt-2">
                <div class="card border-0 grid gap row-gap-3 me-5">
        
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="2-type" id="2-chair_96" value="chair_96">
                        <label class="form-check-label" for="2-chair_96">
                            ${ALLARRANGEMENTS.elements.chair_96.svg}&nbsp;&nbsp;&nbsp;fauteuil
                        </label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="2-type" id="2-noArmrestsRight_96" value="noArmrestsRight_96">
                        <label class="form-check-label" for="2-noArmrestsRight_96">
                            ${ALLARRANGEMENTS.elements.noArmrestsRight_96.svg}&nbsp;&nbsp;&nbsp;geen armleuningen - rechts
                        </label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="2-type" id="2-noArmrestsLeft_96"
                            value="noArmrestsLeft_96">
                        <label class="form-check-label" for="2-noArmrestsLeft_96">
                            ${ALLARRANGEMENTS.elements.noArmrestsLeft_96.svg}&nbsp;&nbsp;&nbsp;geen armleuningen - links
                        </label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="2-type" id="2-noArmrests_84" value="noArmrests_84">
                        <label class="form-check-label" for="2-noArmrests_84">
                            ${ALLARRANGEMENTS.elements.noArmrests_84.svg}&nbsp;&nbsp;&nbsp;geen armleuningen
                        </label>
                    </div>
                </div>
                <div class="card border-0 grid gap row-gap-3">
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="2-type" id="2-armrestLeft_96" value="armrestLeft_96">
                        <label class="form-check-label" for="2-armrestLeft_96">
                            ${ALLARRANGEMENTS.elements.armrestLeft_96.svg}&nbsp;&nbsp;&nbsp;armleuning links
                        </label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="2-type" id="2-armrestRight_96"
                            value="armrestRight_96">
                        <label class="form-check-label" for="2-armrestRight_96">
                            ${ALLARRANGEMENTS.elements.armrestRight_96.svg}&nbsp;&nbsp;&nbsp;armleuning rechts
                        </label>
                    </div>
        
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="2-type" id="2-hocker_84" value="hocker_84">
                        <label class="form-check-label" for="2-hocker_84">
                            ${ALLARRANGEMENTS.elements.hocker_84.svg}&nbsp;&nbsp;&nbsp;hocker 84cm breed
                        </label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="2-type" id="2-hocker_96" value="hocker_96">
                        <label class="form-check-label" for="2-hocker_96">
                            ${ALLARRANGEMENTS.elements.hocker_96.svg}&nbsp;&nbsp;&nbsp;hocker 96cm breed
                        </label>
                    </div>
                </div>
            </div>
        
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                <div class="d-flex justify-content-start m-0 p-0 pt-4">
                    <div class="card border-0 grid gap row-gap-3 me-5">


                        <div class="h6 fw-normal form-check">
                            <input type="checkbox" class="form-check-input" id="2-cushion" value="cushion">
                            <label class="form-check-label" for="2-cushion">rugkussen</label>
                        </div>
                        <div class="h6 fw-normal form-check">
                            <input type="checkbox" class="form-check-input" id="2-xl" value="xl">
                            <label class="form-check-label" for="2-xl">xl (zitting wordt verlengt)</label>
                        </div>
                    </div>
                    <div class="card border-0 grid gap row-gap-3">           
                        <div class="h6 fw-normal form-check">
                            <input type="checkbox" class="form-check-input" id="2-frontcushion" value="frontcushion">
                            <label class="form-check-label" for="2-frontcushion">extra rugkussen</label>
                        </div>
                    </div>
                </div>
            </div>
        
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                <div class="col-12 m-0 p-0">
                    <div class="row m-0 p-0 pb-2">
                        <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                            <div id="upholsteryColorPickerTwo" class="m-0 p-0"></div>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>`,
            "onload": function () {
                let containerElemTwo = document.getElementById("upholsteryColorPickerTwo");
                addTextures('upholsteryColors2', ALLCOLORS.upholsteryColors, containerElemTwo);
            }
        }
    }
    if (model.elements.length >= 3) {
        accordions.element_3 = {
            "title": "element 3",
            "options": ['type_3', 'color_3'],
            "display": "d-block",
            "code": /*html*/ ` 
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
            <div class="d-flex justify-content-start m-0 p-0 pt-2">
                <div class="card border-0 grid gap row-gap-3 me-5">
        
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="3-type" id="3-chair_96" value="chair_96">
                        <label class="form-check-label" for="3-chair_96">
                            ${ALLARRANGEMENTS.elements.chair_96.svg}&nbsp;&nbsp;&nbsp;fauteuil
                        </label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="3-type" id="3-noArmrestsRight_96" value="noArmrestsRight_96">
                        <label class="form-check-label" for="3-noArmrestsRight_96">
                            ${ALLARRANGEMENTS.elements.noArmrestsRight_96.svg}&nbsp;&nbsp;&nbsp;geen armleuningen - rechts
                        </label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="3-type" id="3-noArmrestsLeft_96"
                            value="noArmrestsLeft_96">
                        <label class="form-check-label" for="3-noArmrestsLeft_96">
                            ${ALLARRANGEMENTS.elements.noArmrestsLeft_96.svg}&nbsp;&nbsp;&nbsp;geen armleuningen - links
                        </label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="3-type" id="3-noArmrests_84" value="noArmrests_84">
                        <label class="form-check-label" for="3-noArmrests_84">
                            ${ALLARRANGEMENTS.elements.noArmrests_84.svg}&nbsp;&nbsp;&nbsp;geen armleuningen
                        </label>
                    </div>
                </div>
                <div class="card border-0 grid gap row-gap-3">
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="3-type" id="3-armrestLeft_96" value="armrestLeft_96">
                        <label class="form-check-label" for="3-armrestLeft_96">
                            ${ALLARRANGEMENTS.elements.armrestLeft_96.svg}&nbsp;&nbsp;&nbsp;armleuning links
                        </label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="3-type" id="3-armrestRight_96"
                            value="armrestRight_96">
                        <label class="form-check-label" for="3-armrestRight_96">
                            ${ALLARRANGEMENTS.elements.armrestRight_96.svg}&nbsp;&nbsp;&nbsp;armleuning rechts
                        </label>
                    </div>
        
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="3-type" id="3-hocker_84" value="hocker_84">
                        <label class="form-check-label" for="3-hocker_84">
                            ${ALLARRANGEMENTS.elements.hocker_84.svg}&nbsp;&nbsp;&nbsp;hocker 84cm breed
                        </label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="3-type" id="3-hocker_96" value="hocker_96">
                        <label class="form-check-label" for="3-hocker_96">
                            ${ALLARRANGEMENTS.elements.hocker_96.svg}&nbsp;&nbsp;&nbsp;hocker 96cm breed
                        </label>
                    </div>
                </div>
            </div>
        
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                <div class="d-flex justify-content-start m-0 p-0 pt-4">
                    <div class="card border-0 grid gap row-gap-3 me-5">


                        <div class="h6 fw-normal form-check">
                            <input type="checkbox" class="form-check-input" id="3-cushion" value="cushion">
                            <label class="form-check-label" for="3-cushion">rugkussen</label>
                        </div>
                        <div class="h6 fw-normal form-check">
                            <input type="checkbox" class="form-check-input" id="3-xl" value="xl">
                            <label class="form-check-label" for="3-xl">xl (zitting wordt verlengt)</label>
                        </div>
                    </div>
                    <div class="card border-0 grid gap row-gap-3">           
                        <div class="h6 fw-normal form-check">
                            <input type="checkbox" class="form-check-input" id="3-frontcushion" value="frontcushion">
                            <label class="form-check-label" for="3-frontcushion">extra rugkussen</label>
                        </div>
                    </div>
                </div>
            </div>
        
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                <div class="col-12 m-0 p-0">
                    <div class="row m-0 p-0 pb-2">
                        <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                            <div id="upholsteryColorPickerThree" class="m-0 p-0"></div>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>`,
            "onload": function () {
                let containerElemThree = document.getElementById("upholsteryColorPickerThree");
                addTextures('upholsteryColors3', ALLCOLORS.upholsteryColors, containerElemThree);
            }
        }
    }
    if (model.elements.length >= 4) {
        accordions.element_4 = {
            "title": "element 4",
            "options": ['type_4', 'color_4'],
            "display": "d-block",
            "code": /*html*/ ` 
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
            <div class="d-flex justify-content-start m-0 p-0 pt-2">
                <div class="card border-0 grid gap row-gap-3 me-5">
        
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="4-type" id="4-chair_96" value="chair_96">
                        <label class="form-check-label" for="4-chair_96">
                            ${ALLARRANGEMENTS.elements.chair_96.svg}&nbsp;&nbsp;&nbsp;fauteuil
                        </label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="4-type" id="4-noArmrestsRight_96" value="noArmrestsRight_96">
                        <label class="form-check-label" for="4-noArmrestsRight_96">
                            ${ALLARRANGEMENTS.elements.noArmrestsRight_96.svg}&nbsp;&nbsp;&nbsp;geen armleuningen - rechts
                        </label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="4-type" id="4-noArmrestsLeft_96"
                            value="noArmrestsLeft_96">
                        <label class="form-check-label" for="4-noArmrestsLeft_96">
                            ${ALLARRANGEMENTS.elements.noArmrestsLeft_96.svg}&nbsp;&nbsp;&nbsp;geen armleuningen - links
                        </label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="4-type" id="4-noArmrests_84" value="noArmrests_84">
                        <label class="form-check-label" for="4-noArmrests_84">
                            ${ALLARRANGEMENTS.elements.noArmrests_84.svg}&nbsp;&nbsp;&nbsp;geen armleuningen
                        </label>
                    </div>
                </div>
                <div class="card border-0 grid gap row-gap-3">
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="4-type" id="4-armrestLeft_96" value="armrestLeft_96">
                        <label class="form-check-label" for="4-armrestLeft_96">
                            ${ALLARRANGEMENTS.elements.armrestLeft_96.svg}&nbsp;&nbsp;&nbsp;armleuning links
                        </label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="4-type" id="4-armrestRight_96"
                            value="armrestRight_96">
                        <label class="form-check-label" for="4-armrestRight_96">
                            ${ALLARRANGEMENTS.elements.armrestRight_96.svg}&nbsp;&nbsp;&nbsp;armleuning rechts
                        </label>
                    </div>
        
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="4-type" id="4-hocker_84" value="hocker_84">
                        <label class="form-check-label" for="4-hocker_84">
                            ${ALLARRANGEMENTS.elements.hocker_84.svg}&nbsp;&nbsp;&nbsp;hocker 84cm breed
                        </label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="4-type" id="4-hocker_96" value="hocker_96">
                        <label class="form-check-label" for="4-hocker_96">
                            ${ALLARRANGEMENTS.elements.hocker_96.svg}&nbsp;&nbsp;&nbsp;hocker 96cm breed
                        </label>
                    </div>
                </div>
            </div>
        
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                <div class="d-flex justify-content-start m-0 p-0 pt-4">
                    <div class="card border-0 grid gap row-gap-3 me-5">


                        <div class="h6 fw-normal form-check">
                            <input type="checkbox" class="form-check-input" id="4-cushion" value="cushion">
                            <label class="form-check-label" for="4-cushion">rugkussen</label>
                        </div>
                        <div class="h6 fw-normal form-check">
                            <input type="checkbox" class="form-check-input" id="4-xl" value="xl">
                            <label class="form-check-label" for="4-xl">xl (zitting wordt verlengt)</label>
                        </div>
                    </div>
                    <div class="card border-0 grid gap row-gap-3">           
                        <div class="h6 fw-normal form-check">
                            <input type="checkbox" class="form-check-input" id="4-frontcushion" value="frontcushion">
                            <label class="form-check-label" for="4-frontcushion">extra rugkussen</label>
                        </div>
                    </div>
                </div>
            </div>
        
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                <div class="col-12 m-0 p-0">
                    <div class="row m-0 p-0 pb-2">
                        <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                            <div id="upholsteryColorPickerFour" class="m-0 p-0"></div>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>`,
            "onload": function () {
                let containerElemFour = document.getElementById("upholsteryColorPickerFour");
                addTextures('upholsteryColors4', ALLCOLORS.upholsteryColors, containerElemFour);
            }
        }
    }
    if (model.elements.length >= 5) {
        accordions.element_5 = {
            "title": "element 5",
            "options": ['type_5', 'color_5'],
            "display": "d-block",
            "code": /*html*/ ` 
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
            <div class="d-flex justify-content-start m-0 p-0 pt-2">
                <div class="card border-0 grid gap row-gap-3 me-5">
        
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="5-type" id="5-chair_96" value="chair_96">
                        <label class="form-check-label" for="5-chair_96">
                            ${ALLARRANGEMENTS.elements.chair_96.svg}&nbsp;&nbsp;&nbsp;fauteuil
                        </label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="5-type" id="5-noArmrestsRight_96" value="noArmrestsRight_96">
                        <label class="form-check-label" for="5-noArmrestsRight_96">
                            ${ALLARRANGEMENTS.elements.noArmrestsRight_96.svg}&nbsp;&nbsp;&nbsp;geen armleuningen - rechts
                        </label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="5-type" id="5-noArmrestsLeft_96"
                            value="noArmrestsLeft_96">
                        <label class="form-check-label" for="5-noArmrestsLeft_96">
                            ${ALLARRANGEMENTS.elements.noArmrestsLeft_96.svg}&nbsp;&nbsp;&nbsp;geen armleuningen - links
                        </label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="5-type" id="5-noArmrests_84" value="noArmrests_84">
                        <label class="form-check-label" for="5-noArmrests_84">
                            ${ALLARRANGEMENTS.elements.noArmrests_84.svg}&nbsp;&nbsp;&nbsp;geen armleuningen
                        </label>
                    </div>
                </div>
                <div class="card border-0 grid gap row-gap-3">
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="5-type" id="5-armrestLeft_96" value="armrestLeft_96">
                        <label class="form-check-label" for="5-armrestLeft_96">
                            ${ALLARRANGEMENTS.elements.armrestLeft_96.svg}&nbsp;&nbsp;&nbsp;armleuning links
                        </label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="5-type" id="5-armrestRight_96"
                            value="armrestRight_96">
                        <label class="form-check-label" for="5-armrestRight_96">
                            ${ALLARRANGEMENTS.elements.armrestRight_96.svg}&nbsp;&nbsp;&nbsp;armleuning rechts
                        </label>
                    </div>
        
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="5-type" id="5-hocker_84" value="hocker_84">
                        <label class="form-check-label" for="5-hocker_84">
                            ${ALLARRANGEMENTS.elements.hocker_84.svg}&nbsp;&nbsp;&nbsp;hocker 84cm breed
                        </label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="5-type" id="5-hocker_96" value="hocker_96">
                        <label class="form-check-label" for="5-hocker_96">
                            ${ALLARRANGEMENTS.elements.hocker_96.svg}&nbsp;&nbsp;&nbsp;hocker 96cm breed
                        </label>
                    </div>
                </div>
            </div>
        
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                <div class="d-flex justify-content-start m-0 p-0 pt-4">
                    <div class="card border-0 grid gap row-gap-3 me-5">


                        <div class="h6 fw-normal form-check">
                            <input type="checkbox" class="form-check-input" id="5-cushion" value="cushion">
                            <label class="form-check-label" for="5-cushion">rugkussen</label>
                        </div>
                        <div class="h6 fw-normal form-check">
                            <input type="checkbox" class="form-check-input" id="5-xl" value="xl">
                            <label class="form-check-label" for="5-xl">xl (zitting wordt verlengt)</label>
                        </div>
                    </div>
                    <div class="card border-0 grid gap row-gap-3">           
                        <div class="h6 fw-normal form-check">
                            <input type="checkbox" class="form-check-input" id="5-frontcushion" value="frontcushion">
                            <label class="form-check-label" for="5-frontcushion">extra rugkussen</label>
                        </div>
                    </div>
                </div>
            </div>
        
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                <div class="col-12 m-0 p-0">
                    <div class="row m-0 p-0 pb-2">
                        <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                            <div id="upholsteryColorPickerFive" class="m-0 p-0"></div>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>`,
            "onload": function () {
                let containerElemFive = document.getElementById("upholsteryColorPickerFive");
                addTextures('upholsteryColors5', ALLCOLORS.upholsteryColors, containerElemFive);
            }
        }
    }
    if (model.elements.length >= 6) {
        accordions.element_6 = {
            "title": "element 6",
            "options": ['type_6', 'color_6'],
            "display": "d-block",
            "code": /*html*/ ` 
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
            <div class="d-flex justify-content-start m-0 p-0 pt-2">
                <div class="card border-0 grid gap row-gap-3 me-5">
        
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="6-type" id="6-chair_96" value="chair_96">
                        <label class="form-check-label" for="6-chair_96">
                            ${ALLARRANGEMENTS.elements.chair_96.svg}&nbsp;&nbsp;&nbsp;fauteuil
                        </label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="6-type" id="6-noArmrestsRight_96" value="noArmrestsRight_96">
                        <label class="form-check-label" for="6-noArmrestsRight_96">
                            ${ALLARRANGEMENTS.elements.noArmrestsRight_96.svg}&nbsp;&nbsp;&nbsp;geen armleuningen - rechts
                        </label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="6-type" id="6-noArmrestsLeft_96"
                            value="noArmrestsLeft_96">
                        <label class="form-check-label" for="6-noArmrestsLeft_96">
                            ${ALLARRANGEMENTS.elements.noArmrestsLeft_96.svg}&nbsp;&nbsp;&nbsp;geen armleuningen - links
                        </label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="6-type" id="6-noArmrests_84" value="noArmrests_84">
                        <label class="form-check-label" for="6-noArmrests_84">
                            ${ALLARRANGEMENTS.elements.noArmrests_84.svg}&nbsp;&nbsp;&nbsp;geen armleuningen
                        </label>
                    </div>
                </div>
                <div class="card border-0 grid gap row-gap-3">
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="6-type" id="6-armrestLeft_96" value="armrestLeft_96">
                        <label class="form-check-label" for="6-armrestLeft_96">
                            ${ALLARRANGEMENTS.elements.armrestLeft_96.svg}&nbsp;&nbsp;&nbsp;armleuning links
                        </label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="6-type" id="6-armrestRight_96"
                            value="armrestRight_96">
                        <label class="form-check-label" for="6-armrestRight_96">
                            ${ALLARRANGEMENTS.elements.armrestRight_96.svg}&nbsp;&nbsp;&nbsp;armleuning rechts
                        </label>
                    </div>
        
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="6-type" id="6-hocker_84" value="hocker_84">
                        <label class="form-check-label" for="6-hocker_84">
                            ${ALLARRANGEMENTS.elements.hocker_84.svg}&nbsp;&nbsp;&nbsp;hocker 84cm breed
                        </label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="6-type" id="6-hocker_96" value="hocker_96">
                        <label class="form-check-label" for="6-hocker_96">
                            ${ALLARRANGEMENTS.elements.hocker_96.svg}&nbsp;&nbsp;&nbsp;hocker 96cm breed
                        </label>
                    </div>
                </div>
            </div>
        
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                <div class="d-flex justify-content-start m-0 p-0 pt-4">
                    <div class="card border-0 grid gap row-gap-3 me-5">


                        <div class="h6 fw-normal form-check">
                            <input type="checkbox" class="form-check-input" id="6-cushion" value="cushion">
                            <label class="form-check-label" for="6-cushion">rugkussen</label>
                        </div>
                        <div class="h6 fw-normal form-check">
                            <input type="checkbox" class="form-check-input" id="6-xl" value="xl">
                            <label class="form-check-label" for="6-xl">xl (zitting wordt verlengt)</label>
                        </div>
                    </div>
                    <div class="card border-0 grid gap row-gap-3">           
                        <div class="h6 fw-normal form-check">
                            <input type="checkbox" class="form-check-input" id="6-frontcushion" value="frontcushion">
                            <label class="form-check-label" for="6-frontcushion">extra rugkussen</label>
                        </div>
                    </div>
                </div>
            </div>
        
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                <div class="col-12 m-0 p-0">
                    <div class="row m-0 p-0 pb-2">
                        <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                            <div id="upholsteryColorPickerSix" class="m-0 p-0"></div>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>`,
            "onload": function () {
                let containerElemSix = document.getElementById("upholsteryColorPickerSix");
                addTextures('upholsteryColors6', ALLCOLORS.upholsteryColors, containerElemSix);
            }
        }
    }
    return { accordions };
}