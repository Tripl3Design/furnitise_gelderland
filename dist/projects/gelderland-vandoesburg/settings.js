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

/*
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

    // overall width
    let maxPosX = Number.NEGATIVE_INFINITY;
    let minPosX = Number.POSITIVE_INFINITY;
    let typeAtMaxPosX;
    let typeAtMinPosX;
    let rotAtMaxPosX;
    let rotAtMinPosX;

    const container = document.getElementById('sofaContainer');
    const scaleFactor = 24;

    const orderMap = {
        'quarterround': 1,
        'hocker_96': 1,
        'hocker_84': 1,
        'noArmrestsLeft_96': 2,
        'noArmrestsRight_96': 2,
        'noArmrests_84': 2,
        'armrestRight_172': 3,
        'armrestLeft_172': 3,
        'armrestLeft_96': 3,
        'armrestRight_96': 3,
        'chair_96': 4
    };

    // Sort elements based on orderMap
    model.elements.sort((a, b) => orderMap[a.type] - orderMap[b.type]);

    model.elements.forEach(({ type, location: { posX, posY, rot } }, index) => {
        const svgContent = ALLARRANGEMENTS.elements[type].svg;
        const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
        group.setAttribute('id', `${index + 1}-${type}`);
        group.setAttribute('class', 'svgArrangement');
        group.setAttribute('transform', `translate(${posX * scaleFactor}, ${-posY * scaleFactor}) rotate(${rot}, 62, 56)`);

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = svgContent;

        const svgElement = tempDiv.querySelector('svg');
        if (svgElement) {
            svgElement.setAttribute('id', `svg-${index + 1}-${type}`);
        }

        group.innerHTML = tempDiv.innerHTML;

        container.appendChild(group);
    });

    let previousClickedElement = null; // To store the previously clicked element

    const svgArrangements = document.querySelectorAll('.svgArrangement');
    var selectedElementIndex;
    svgArrangements.forEach(item => {
        item.addEventListener('click', () => {
            let selectedElement = item.id;
            console.log('selected element = ' + selectedElement);
            let selectedElementNumber = selectedElement.split('-');
            selectedElementIndex = parseInt(selectedElementNumber[1], 10);


            // If there is a previously clicked element, reset its fill color to white
            if (previousClickedElement) {
                const previousSvgElement = document.getElementById(`svg-${previousClickedElement.id}`);
                if (previousSvgElement) {
                    const previousSvgElements = previousSvgElement.querySelectorAll('*');
                    previousSvgElements.forEach(element => {
                        element.setAttribute('fill', 'white');
                    });
                }
            }

            // Set the fill color of the currently clicked element to light grey
            const svgElement = document.getElementById(`svg-${item.id}`);
            if (svgElement) {
                const svgElements = svgElement.querySelectorAll('*');
                svgElements.forEach(element => {
                    element.setAttribute('fill', 'lightgrey');
                });
            } else {
                console.warn(`SVG element with id 'svg-${item.id}' not found`);
            }

            // Update the previously clicked element
            previousClickedElement = item;

            updateControlPanel(model, 'arrangement');
            updateFeaturedModel(model);
            showSelected(false);
        });
    });

    console.log(selectedElementIndex);
    const thisElement = model.elements[selectedElementIndex];
    console.log(thisElement);

    // Measure width
    if (thisElement.location.posX > maxPosX) {
        maxPosX = thisElement.location.posX;
        [typeAtMaxPosX, rotAtMaxPosX] = [thisElement.type, thisElement.location.rot];
    }

    if (thisElement.location.posX < minPosX) {
        minPosX = thisElement.location.posX;
        [typeAtMinPosX, rotAtMinPosX] = [thisElement.type, thisElement.location.rot];
    }

    // Set radio buttons and checkboxes
    const radioTypeId = `${selectedElementIndex + 1}-${thisElement.type}`;
    document.getElementById(radioTypeId).checked = true;

    const checkboxes = {
        xl: `xl-${selectedElementIndex + 1}`,
        cushion: `cushion-${selectedElementIndex + 1}`,
        frontcushion: `frontcushion-${selectedElementIndex + 1}`
    };

    thisElement.cushion = ['hocker_84', 'hocker_96'].includes(thisElement.type) ? false : thisElement.cushion;

    document.getElementById(checkboxes.cushion).disabled = ['hocker_84', 'hocker_96'].includes(thisElement.type);
    document.getElementById(checkboxes.frontcushion).disabled = ['hocker_84', 'hocker_96'].includes(thisElement.type);

    for (const checkbox of Object.values(checkboxes)) {
        document.getElementById(checkbox).checked = thisElement[checkbox.split('-')[0]];
    }

    document.getElementById(checkboxes.frontcushion).disabled = !thisElement.cushion;

    // Event listeners for radio buttons
    document.querySelectorAll(`input[type=radio][name='type-${selectedElementIndex + 1}']`).forEach((typeValue) => {
        typeValue.onclick = (item) => {
            thisElement.type = item.target.value;

            updateControlPanel(model, `element_${selectedElementIndex + 1}`);
            updateFeaturedModel(model);
            showSelected(false);
        };
    });

    // Event listeners for checkboxes
    const handleCheckboxClick = (checkboxId, property) => {
        const checkbox = document.getElementById(checkboxId);
        thisElement[property] = checkbox.checked;

        updateControlPanel(model, `element_${selectedElementIndex + 1}`);
        updateFeaturedModel(model);
        showSelected(false);
    };

    document.getElementById(`xl-${selectedElementIndex + 1}`).onclick = () => handleCheckboxClick(`xl-${selectedElementIndex + 1}`, 'xl');
    document.getElementById(`cushion-${selectedElementIndex + 1}`).onclick = () => handleCheckboxClick(`cushion-${selectedElementIndex + 1}`, 'cushion');
    document.getElementById(`frontcushion-${selectedElementIndex + 1}`).onclick = () => handleCheckboxClick(`frontcushion-${selectedElementIndex + 1}`, 'frontcushion');

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

    document.getElementById(`type_${selectedElementIndex + 1}Text`).innerHTML = typeSvgMap[thisElement.type] || '';

    //upholstery
    const upholsteryColor = thisElement.upholstery.upholstery;
    var upholsteryColorIndex = ALLCOLORS.upholsteryColors.findIndex((item) => item.colorHex == upholsteryColor);

    var upholsteryColorValue = document.querySelectorAll(`.upholsteryColors${selectedElementIndex + 1}_colorButton`);

   
            if (parser.getDevice().type != 'mobile' && parser.getDevice().type != 'tablet') {
                upholsteryColorValue.forEach(item => item.addEventListener('mouseover', () => {
                    //document.getElementById('upholsteryColorsText').style.visibility = 'visible';
                    //document.getElementById('upholsteryColorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: ' + document.getElementById(item.id).style.backgroundColor + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + document.getElementById(item.id).alt + '';
                    //document.getElementById('upholsteryColorsText').classList.add('fst-italic');
                    updateFeaturedModel(model, false);
                    showSelected(false);
                }));
    
                upholsteryColorValue.forEach(item => item.addEventListener('mouseout', () => {
                    //document.getElementById('upholsteryColorsText').style.visibility = 'hidden';
                    //document.getElementById('upholsteryColorsText').classList.remove('fst-italic');
                    updateFeaturedModel(model, false);
                    showSelected(false);
                }));
            }
    
    upholsteryColorValue.forEach(item => item.addEventListener('click', () => {

        upholsteryColorValue.forEach(item => { item.classList.remove('colorButtonActive') });
        const upholsteryColorId = item.id.split('_');
        upholsteryColorIndex = upholsteryColorId[1];

        model.elements[i].upholstery.upholstery = ALLCOLORS.upholsteryColors[upholsteryColorIndex].colorHex;
        document.getElementById(`upholsteryColors${i + 1}Index_${upholsteryColorIndex}`).classList.add('colorButtonActive');

        updateControlPanel(model, `element_${i + 1}`);
        updateFeaturedModel(model);
        showSelected(false);
    }));
    //model.upholstery.code = ALLCOLORS.upholsteryColors[upholsteryColorIndex].colorCode;
    //model.upholstery.name = ALLCOLORS.upholsteryColors[upholsteryColorIndex].colorName;
    //document.getElementById('upholsteryColorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: #' + elem.upholstery.upholstery + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + elem.upholstery.name;
    document.getElementById(`upholsteryColors${i + 1}Index_${upholsteryColorIndex}`).classList.remove('colorButton');
    document.getElementById(`upholsteryColors${i + 1}Index_${upholsteryColorIndex}`).classList.add('colorButtonActive');


    document.getElementById(`color_${i + 1}Text`).innerHTML = `<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: #${elem.upholstery.upholstery}">`;
}
*/
function updateControlPanel(model, selectedLayer, expandedLayer) {
    const settings = initSettings(model);
    const elem = document.getElementById('controlpanelContainer');
    if (selectedLayer !== undefined) {
        controlPanel_updateLayer(selectedLayer, settings);
    } else {
        controlPanel(settings, ALLMODELS, elem, expandedLayer);
    }

    toggleFeaturedModels();
    updateBackgroundColor(model);
    updateModelElements(model);
    handleElementSelection(model);
    selectDefaultElement(model, 0);  // Select the first element as the default



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

function updateBackgroundColor(model) {
    if (model.background.lighter === undefined) {
        let bgColor = pSBC(0, `#${model.background.original}`);
        model.background = {
            original: model.background.original,
            lighter: bgColor.substring(1)
        };
    }
}

function updateModelElements(model) {
    const container = document.getElementById('sofaContainer');
    const scaleFactor = 24;
    const orderMap = getOrderMap();

    // Sort elements based on orderMap
    model.elements.sort((a, b) => orderMap[a.type] - orderMap[b.type]);

    model.elements.forEach(({ type, cushion, frontcushion, xl, location: { posX, posY, rot } }, index) => {
        const svgContent = ALLARRANGEMENTS.elements[type].svg;
        const group = createSvgGroup(index, type, cushion, frontcushion, xl, posX, posY, rot, scaleFactor, svgContent);
        container.appendChild(group);
    });
}

function getOrderMap() {
    return {
        'sideTable': 0,
        'oakTable': 0,
        'quarterround': 1,
        'hocker_96': 1,
        'hocker_84': 1,
        'noArmrestsLeft_96': 2,
        'noArmrestsRight_96': 2,
        'noArmrests_84': 2,
        'armrestRight_172': 3,
        'armrestLeft_172': 3,
        'armrestLeft_96': 3,
        'armrestRight_96': 3,
        'chair_96': 4
    };
}

function createSvgGroup(index, type, cushion, frontcushion, xl, posX, posY, rot, scaleFactor, svgContent) {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute('id', `${index + 1}-${type}`);
    group.setAttribute('class', 'svgArrangement');
    if (type == 'quarterround') {
        group.setAttribute('transform', `translate(${(posX) * scaleFactor}, ${-posY * scaleFactor}) rotate(${rot}, 50, 50)`);
    } else {
        group.setAttribute('transform', `translate(${posX * scaleFactor}, ${-posY * scaleFactor}) rotate(${rot}, 62, 56)`);
    }
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = svgContent;

    const svgElement = tempDiv.querySelector('svg');
    if (svgElement) {
        svgElement.setAttribute('id', `svg-${index + 1}-${type}`);

        const seat = svgElement.querySelector('g[name="seat"]');
        if (xl) {
            if (seat) {
                const rect = seat.querySelector('rect');
                if (rect) {
                    rect.setAttribute('height', '100');
                }
            }
        }
    }

    group.innerHTML = tempDiv.innerHTML;
    return group;
}

function handleElementSelection(model) {
    let previousClickedElement = null;
    const svgArrangements = document.querySelectorAll('.svgArrangement');

    svgArrangements.forEach(item => {
        item.addEventListener('click', () => {
            const selectedElementIndex = parseInt(item.id.split('-')[0], 10) - 1;
            handleElementClick(item, selectedElementIndex, model, previousClickedElement);
            previousClickedElement = item;

            var typeName = item.id.split('-')[1];
            var elementKey = Object.keys(ALLARRANGEMENTS.elements).find(key => key.includes(typeName));
            var nameNl = ALLARRANGEMENTS.elements[elementKey]["name-nl"];
            document.getElementById('typeText').textContent = nameNl;


            const elem = model.elements[selectedElementIndex];

            document.getElementById('rotate90').onclick = () => {
                elem.location.rot = (elem.location.rot + 90) % 360;

                updateControlPanel(model);
                updateFeaturedModel(model);
                showSelected(false);
            };
            document.getElementById('moveToLeft').onclick = () => {
                elem.location.posX = elem.location.posX - 0.25;

                updateControlPanel(model);
                updateFeaturedModel(model);
                showSelected(false);
            };
            document.getElementById('moveToRight').onclick = () => {
                elem.location.posX = elem.location.posX + 0.25;

                updateControlPanel(model);
                updateFeaturedModel(model);
                showSelected(false);
            };
            document.getElementById('moveUp').onclick = () => {
                elem.location.posY = elem.location.posY + 0.25;

                updateControlPanel(model);
                updateFeaturedModel(model);
                showSelected(false);
            };
            document.getElementById('moveDown').onclick = () => {
                elem.location.posY = elem.location.posY - 0.25;

                updateControlPanel(model);
                updateFeaturedModel(model);
                showSelected(false);
            };



            document.getElementById(typeName).checked = true;

            const checkboxes = {
                xl: `xl`,
                cushion: `cushion`,
                frontcushion: `frontcushion`
            };

            elem.cushion = ['hocker_84', 'hocker_96'].includes(typeName) ? false : elem.cushion;

            document.getElementById(checkboxes.cushion).disabled = ['hocker_84', 'hocker_96'].includes(elem.type);
            document.getElementById(checkboxes.frontcushion).disabled = ['hocker_84', 'hocker_96'].includes(elem.type);

            for (const checkbox of Object.values(checkboxes)) {
                document.getElementById(checkbox).checked = typeName[checkbox.split('-')[0]];
            }

            document.getElementById(checkboxes.frontcushion).disabled = !typeName.cushion;

            // Event listeners for radio buttons
            document.querySelectorAll(`input[type=radio][name='type']`).forEach((typeValue) => {
                typeValue.onclick = (item) => {
                    elem.type = item.target.value;

                    updateControlPanel(model);
                    updateFeaturedModel(model);
                    showSelected(false);
                };
            });

            // Event listeners for checkboxes
            const handleCheckboxClick = (checkboxId, property) => {
                const checkbox = document.getElementById(checkboxId);
                thistypeNameElement[property] = checkbox.checked;

                updateControlPanel(model);
                updateFeaturedModel(model);
                showSelected(false);
            };

            document.getElementById(`xl`).onclick = () => handleCheckboxClick(`xl`, 'xl');
            document.getElementById(`cushion`).onclick = () => handleCheckboxClick(`cushion`, 'cushion');
            document.getElementById(`frontcushion`).onclick = () => handleCheckboxClick(`frontcushion`, 'frontcushion');
        });
    });
}

function handleElementClick(item, selectedElementIndex, model, previousClickedElement) {
    resetPreviousElementColor(previousClickedElement);
    setElementColor(item, 'lightgrey');

    if (selectedElementIndex >= 0 && selectedElementIndex < model.elements.length) {
        const thisElement = model.elements[selectedElementIndex];
        measureWidth(thisElement);
        setRadioButtonsAndCheckboxes(selectedElementIndex, thisElement);
        addEventListenersToButtonsAndCheckboxes(selectedElementIndex, thisElement, model);
    }
}

function resetPreviousElementColor(previousClickedElement) {
    if (previousClickedElement) {
        const previousSvgElement = document.getElementById(`svg-${previousClickedElement.id}`);
        if (previousSvgElement) {
            previousSvgElement.querySelectorAll('*').forEach(element => {
                element.setAttribute('fill', 'white');
            });
        }
    }
}

function setElementColor(item, color) {
    const svgElement = document.getElementById(`svg-${item.id}`);
    console.log(`svg-${item.id}`);
    if (svgElement) {
        svgElement.querySelectorAll('*').forEach(element => {
            element.setAttribute('fill', color);
        });
    }




    //updateControlPanel(model, 'element');
    //updateFeaturedModel(model);
    //showSelected(false);
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

function setRadioButtonsAndCheckboxes(selectedElementIndex, thisElement) {
    const radioTypeId = `${selectedElementIndex + 1}-${thisElement.type}`;
    const radioElement = document.getElementById(radioTypeId);
    if (radioElement) {
        radioElement.checked = true;
    }

    const checkboxes = getCheckboxes(selectedElementIndex);
    disableCheckboxes(checkboxes, thisElement);

    for (const checkboxId of Object.values(checkboxes)) {
        const checkbox = document.getElementById(checkboxId);
        if (checkbox) {
            checkbox.checked = thisElement[checkboxId.split('-')[0]];
        }
    }

    const frontcushionCheckbox = document.getElementById(checkboxes.frontcushion);
    if (frontcushionCheckbox) {
        frontcushionCheckbox.disabled = !thisElement.cushion;
    }
}

function getCheckboxes(selectedElementIndex) {
    return {
        xl: `xl-${selectedElementIndex + 1}`,
        cushion: `cushion-${selectedElementIndex + 1}`,
        frontcushion: `frontcushion-${selectedElementIndex + 1}`
    };
}

function disableCheckboxes(checkboxes, thisElement) {
    const typesToDisable = ['hocker_84', 'hocker_96'];
    for (const checkboxId of Object.values(checkboxes)) {
        const checkbox = document.getElementById(checkboxId);
        if (checkbox) {
            checkbox.disabled = typesToDisable.includes(thisElement.type);
        }
    }
}

function addEventListenersToButtonsAndCheckboxes(selectedElementIndex, thisElement, model) {
    document.querySelectorAll(`input[type=radio][name='type-${selectedElementIndex + 1}']`).forEach((typeValue) => {
        typeValue.onclick = (item) => {
            thisElement.type = item.target.value;
            updateControlPanel(model);
            updateFeaturedModel(model);
            showSelected(false);
        };
    });

    const checkboxes = getCheckboxes(selectedElementIndex);
    for (const [key, checkboxId] of Object.entries(checkboxes)) {
        const checkbox = document.getElementById(checkboxId);
        if (checkbox) {
            checkbox.onclick = () => handleCheckboxClick(checkboxId, key, thisElement, model, selectedElementIndex);
        }
    }
}

function handleCheckboxClick(checkboxId, property, thisElement, model, selectedElementIndex) {
    const checkbox = document.getElementById(checkboxId);
    if (checkbox) {
        thisElement[property] = checkbox.checked;
        updateControlPanel(model);
        updateFeaturedModel(model);
        showSelected(false);
    }
}

function selectDefaultElement(model, defaultIndex) {
    const svgArrangements = document.querySelectorAll('.svgArrangement');
    if (svgArrangements.length > defaultIndex) {
        const defaultElement = svgArrangements[defaultIndex];

        if (defaultElement instanceof HTMLElement) {
            if (typeof defaultElement.click === 'function') {
                defaultElement.click();
            }
        } else if (defaultElement instanceof SVGElement) {
            const clickEvent = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });
            defaultElement.dispatchEvent(clickEvent); // Dispatch the click event
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
    var buildUrl = `https://${brand}-${product}.web.app/projects/${brand}-${product}`;
    //var buildUrl = `http://127.0.0.1:5000/projects/${brand}-${product}`;
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
       <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
            <div class="col-12 m-0 p-0">
                <div class="row m-0 p-0 pb-2">
                <div class="d-flex justify content start">
                <button id="rotate90" type="button" class="btn btn-outline-dark"><span class="material-symbols-outlined">refresh</span></button>
                <button id="moveToLeft" type="button" class="btn btn-outline-dark"><span class="material-symbols-outlined">arrow_left_alt</span></button>
                <button id="moveToRight" type="button" class="btn btn-outline-dark"><span class="material-symbols-outlined">arrow_right_alt</span></button>
                <button id="moveUp" type="button" class="btn btn-outline-dark"><span class="material-symbols-outlined">arrow_upward_alt</span></button>
                <button id="moveDown" type="button" class="btn btn-outline-dark"><span class="material-symbols-outlined">arrow_downward_alt</span></button>
<!--
 <button type="button" class="btn btn-primary d-flex align-items-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="194" height="124">
      <g name="tabletop">
        <rect x="1" y="1" width="190" height="50" fill="white" stroke="black" stroke-width="1" />
      </g>
    </svg>
    <span class="ml-2">tafel eiken</span>
  </button>
  -->
                </div>
                
                    <div class="row m-0 p-0">
                        <svg id="sofaContainer" viewBox="-350 -150 800 400" xmlns="http://www.w3.org/2000/svg">
                            <!-- SVG elements will be dynamically inserted here -->
                        </svg>
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