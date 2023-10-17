"use strict"
var UNITY_INSTANCE;
var ALLMODELS;
var ALLCOLORS;
var ALLCOMPONENTS;
var FEATUREDMODEL;
var FEATUREDMODELINDEX;

var DECORWALLINDEX = 0;
var DECORFLOORINDEX = 0;

const urlParams = new URLSearchParams(window.location.search);

function updateFeaturedModel(model) {
    UNITY_INSTANCE.SendMessage('Landscape', 'SetLandscape', JSON.stringify(model));
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
    UNITY_INSTANCE.SendMessage('Landscape', 'AddDecor', JSON.stringify(decor));
}

function toggleRadioButtons(toggle) {
    UNITY_INSTANCE.SendMessage('Landscape', 'ToggleRadioButtonGroup', toggle);
}

function toggleSizingButtons(toggle) {
    UNITY_INSTANCE.SendMessage('Landscape', 'ToggleSizingButtons', toggle);
}

function toggleDecor(toggle) {
    UNITY_INSTANCE.SendMessage('Landscape', 'ToggleDecor', toggle);
}

function updateCamera(modelWidth, modelHeight) {
    const size = {
        width: modelWidth,
        height: modelHeight
    };
    UNITY_INSTANCE.SendMessage('Landscape', 'SetFLCamera', JSON.stringify(size));
}

function setComponentNumber(radioNumberFromUnity, radioLayerNumber, radioComponentNumber) {
    //console.log("radioNumberFromUnity " + radioNumberFromUnity);
    //console.log("radioLayerNumber " + radioLayerNumber);
    //console.log("radioComponentNumber " + radioComponentNumber);

    FEATUREDMODEL.radioButton.number = radioNumberFromUnity;
    FEATUREDMODEL.radioButton.layer = radioLayerNumber;
    FEATUREDMODEL.radioButton.component = radioComponentNumber;

    let accordionButtonComponent = document.getElementById('collapse-check-selectedComponent');
    let accordionButtonComponentColor = document.getElementById('collapse-check-selectedComponentColor');
    if (accordionButtonComponent.getAttribute('aria-expanded') == 'true') {
        updateControlPanel(FEATUREDMODEL, 'selectedComponent');
    }
    if (accordionButtonComponentColor.getAttribute('aria-expanded') == 'true') {
        updateControlPanel(FEATUREDMODEL, 'selectedComponentColor');
    }
}

function updateControlPanel(model, selectedLayer, expandedLayer) {
    const settings = initSettings(model);
    const elem = document.getElementById('controlpanelContainer');
    if (selectedLayer !== undefined) {
        controlPanel_updateLayer(selectedLayer, settings);
    } else {
        controlPanel(settings, ALLMODELS, elem, expandedLayer);
    }

    //componentNumber
    if (model.radioButton == undefined) {
        Object.assign(model, { radioButton: { number: 1, layer: 0, component: 0 } });
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

    //mounting
    document.getElementById(model.mounting.type).checked = true;

    const mountingValues = document.querySelectorAll('input[type=radio][name="mounting"]');
    for (const mountingValue of mountingValues) {
        mountingValue.onclick = (mounting) => {

            model.mounting = undefined;
            if (mounting.target.value == "onFrame") {
                model.mounting = { "type": "onFrame", "color": "020307" }
            } else {
                model.mounting = { "type": mounting.target.value }
            }
            updateFeaturedModel(model);
            updateControlPanel(model, 'mounting');
            showSelected(false);
        }
    }
    document.getElementById('mountingText').textContent = model.mounting.type;

    //width
    const widthSlider = document.getElementById('widthslider');
    widthSlider.value = model.width * 10;

    let frontColors = [];
    for (var l = 0; l < model.layers.length; l++) {
        for (var c = 0; c < model.layers[l].components.length; c++) {
            var frontColorsIndex = ALLCOLORS.colors.findIndex((item) => item.colorHex == model.layers[l].components[c].color.color);
            console.log(frontColorsIndex)
            if (ALLCOLORS.colors[frontColorsIndex].colorPath != undefined) {
                frontColors.push({ "color": model.layers[l].components[c].color.color, "path": ALLCOLORS.colors[frontColorsIndex].colorPath, "lacquer": "veneer" });
            } else {
                frontColors.push({ "color": model.layers[l].components[c].color.color, "lacquer": "basic" });
            }
        }
    }
    console.log("frontColors" + frontColors);

    widthSlider.oninput = () => {
        let componentSlots = widthSlider.value / 10 / 28.5;
        //let numOfComps = Math.floor(Math.random() * componentSlots) + 1;

        model.width = widthSlider.value / 10;

        let array = [28.5, 57, 85.5, 114];
        let sum = model.width;
        let limit = componentSlots / 2;

        function iterCompWidths(index, temp) {
            var s = temp.reduce((a, b) => a + b, 0);
            if (s === sum) compWidths.push(temp);
            if (s >= sum || index >= array.length || temp.length >= limit) return;
            iterCompWidths(index, temp.concat(array[index]));
            iterCompWidths(index + 1, temp);
        }

        let compWidths = [];
        let newCompWidths = [];
        iterCompWidths(0, []);

        for (var l = 0; l < model.layers.length; l++) {
            newCompWidths = compWidths[l].sort(() => Math.random() - 0.5);
            model.layers[l].components = [];
            if (model.layers[l].height == 19 || model.layers[l].height == 38) {
                for (var c = 0; c < newCompWidths.length; c++) {
                    let newColor = frontColors[Math.floor(Math.random() * frontColors.length)];
                    console.log(newCompWidths[c]);
                    console.log(newColor);
                    model.layers[l].components.push(JSON.parse(JSON.stringify({
                        "width": newCompWidths[c],
                        "grid": "single",
                        "color": newColor,
                        "front": [
                            {
                                "type": "drawer",
                                "rotation": "left",
                                "height": model.layers[l].height
                            }
                        ]
                    })));
                }
            }
            if (model.layers[l].height == 57) {
                for (var c = 0; c < newCompWidths.length; c++) {
                    let newColor = frontColors[Math.floor(Math.random() * frontColors.length)];
                    model.layers[l].components.push(JSON.parse(JSON.stringify({
                        "width": newCompWidths[c],
                        "grid": "doubleYX",
                        "color": newColor,
                        "front": [{
                            "type": "drawer",
                            "height": 38
                        },
                        {
                            "type": "flap",
                            "height": 19
                        }
                        ]
                    })));
                }
            }
        }
        updateControlPanel(model, 'width');
        updateFeaturedModel(model);
        toggleSizingButtons('true')

        showSelected();
    }
    document.getElementById('widthText').innerHTML = model.width + ' cm';

    const numLayers = model.layers.length;

    //layerHeight
    let allLayerHeights = [];
    for (let l = 0; l < numLayers; l++) {
        allLayerHeights.push(model.layers[l].height);
    }
    const sumAllLayerHeights = allLayerHeights.reduce((a, b) => a + b);
    let totalHeight;
    if (model.mounting.type == 'onFrame') {
        totalHeight = Math.round((sumAllLayerHeights + (numLayers * 1.2) + 20.2) * 10) / 10;
    }
    if (model.mounting.type == 'onPlinth') {
        totalHeight = Math.round((sumAllLayerHeights + (numLayers * 1.2) + 3) * 10) / 10;
    }
    if (model.mounting.type == 'wallMounted') {
        totalHeight = Math.round((sumAllLayerHeights + (numLayers * 1.2) + 1.6) * 10) / 10;
    }
    document.getElementById('totalHeightText').textContent = totalHeight + ' cm';
    document.getElementById('totalLayerHeightText').innerHTML = `<small>total height is ${totalHeight} cm</small>`;

    //add layer
    const addLayer = document.getElementById('addLayer');
    addLayer.addEventListener('click', () => {
        if (totalHeight < 200) {
            FEATUREDMODEL.layers.push(JSON.parse(JSON.stringify(FEATUREDMODEL.layers[0])));
        } else {
            alert('Maximum height of Landscape reached');
        }
        updateControlPanel(model, undefined, 'layers');
        updateFeaturedModel(model);
        showSelected();
    });

    //remove layer
    var removeLayer = document.getElementsByName('removeLayer');
    removeLayer.forEach(removeLayer => removeLayer.addEventListener('click', () => {
        FEATUREDMODEL.layers.splice(removeLayer.id.slice(-1), 1);
        updateControlPanel(model, undefined, 'layers');
        updateFeaturedModel(model);
        showSelected();
    }));

    if (numLayers == 1) {
        document.getElementById('layerAmountText').textContent = numLayers + ' layer';
    } else {
        document.getElementById('layerAmountText').textContent = numLayers + ' layers';
    }

    for (let l = 0; l < numLayers; l++) {
        var layerHeightValue = document.getElementsByName('layerHeight_' + (l + 1));
        layerHeightValue.forEach(layerHeightValue => layerHeightValue.addEventListener('click', () => {
            changeHeight(l, layerHeightValue.id.slice(-2));
            updateControlPanel(model, undefined, 'layers');
            updateFeaturedModel(model);
            showSelected();
        }));

        //components
        const components = model.layers[l].components.length;
    }
    /*
        //options
        for (let l = 0; l < numLayers; l++) {
            const components = model.layers[l].components.length;
            for (let c = 0; c < components; c++) {
                const component = model.layers[l].components[c];
                const fronts = model.layers[l].components[c].front.length;
                for (let f = 0; f < fronts; f++) {
                    const front = model.layers[l].components[c].front[f];
    
                    // rotation
                    const rotationRadioName = document.querySelectorAll(`input[type=radio][name="rotation_${l}_${c}_${f}"]`);
                    rotationRadioName.forEach(rotation => rotation.addEventListener('click', () => {
                        front.rotation = rotation.value;
                        updateControlPanel(model);
                        updateFeaturedModel(model);
                    }));
    
                    let rotationElem = document.getElementById(`rotation_${l}_${c}_${f}`);
                    if (rotationElem) {
                        if (front.rotation == 'left') {
                            document.getElementById(`rotationLeft_${l}_${c}_${f}`).checked = true;
                        } else {
                            document.getElementById(`rotationRight_${l}_${c}_${f}`).checked = true;
                        }
                    }
    
                    // shelves
                    const shelvesRadioName = document.querySelectorAll(`input[type=radio][name="shelvesAmount_${l}_${c}_${f}"]`);
                    shelvesRadioName.forEach(shelves => shelves.addEventListener('click', () => {
                        if (shelves.value != 0 || shelves.value == undefined) {
                            front.shelves = shelves.value
                        } else {
                            delete front.shelves;
                        }
                        updateControlPanel(model);
                        updateFeaturedModel(model);
                    }));
    
                    let shelvesElem = document.getElementById(`shelvesAmount_${l}_${c}_${f}`);
                    if (shelvesElem) {
                        if (front.shelves == 0 || front.shelves == undefined) {
                            document.getElementById(`shelvesAmount_0_${l}_${c}_${f}`).checked = true;
                        } else if (front.shelves == 1) {
                            document.getElementById(`shelvesAmount_1_${l}_${c}_${f}`).checked = true;
                        } else {
                            document.getElementById(`shelvesAmount_2_${l}_${c}_${f}`).checked = true;
                        }
                    }
    
                    // innerdrawer
                    const innerdrawerRadioName = document.querySelectorAll(`input[type=radio][name="innerdrawer_${l}_${c}_${f}"]`);
                    innerdrawerRadioName.forEach(innerdrawer => innerdrawer.addEventListener('click', () => {
    
                        if (innerdrawer.value == 'true') {
                            front.innerdrawer = { "color": "f7f6f4", "lacquer": "basic" }
                        } else {
                            delete front.innerdrawer;
                        }
                        updateControlPanel(model);
                        updateFeaturedModel(model);
                    }));
    
                    let innerdrawerElem = document.getElementById(`innerdrawer_${l}_${c}_${f}`);
                    if (innerdrawerElem) {
                        if (front.innerdrawer == undefined) {
                            document.getElementById(`innerdrawerNo_${l}_${c}_${f}`).checked = true;
                        } else {
                            document.getElementById(`innerdrawerYes_${l}_${c}_${f}`).checked = true;
                        }
                    }
                }
            }
        }
    */
    //selected component grid
    document.getElementById(model.layers[model.radioButton.layer].components[model.radioButton.component].grid).checked = true;








    let gridCandidateType = [];
    for (var allGrids = 0; allGrids < ALLCOMPONENTS.grid.length; allGrids++) {

        var onEdge = false;
        if (model.radioButton.component == 0 || model.radioButton.component == model.layers[model.radioButton.layer].components.length - 1) onEdge = true;

        var neighbourIsOpen = false;
        if (model.radioButton.component != model.layers[model.radioButton.layer].components.length - 1) {
            if (model.layers[model.radioButton.layer].components[model.radioButton.component + 1].grid == "open") neighbourIsOpen = true;
        }
        if (model.radioButton.component != 0) {
            if (model.layers[model.radioButton.layer].components[model.radioButton.component - 1].grid == "open") neighbourIsOpen = true;
        }

        const gridCandidate = ALLCOMPONENTS.grid[allGrids];
        if (gridCandidate.width == model.layers[model.radioButton.layer].components[model.radioButton.component].width && gridCandidate.height == model.layers[model.radioButton.layer].height && !(onEdge && ALLCOMPONENTS.grid[allGrids].type == "open") && !(neighbourIsOpen && ALLCOMPONENTS.grid[allGrids].type == "open")) {
            gridCandidateType.push(gridCandidate.type);
        }
    }
    if (gridCandidateType.includes("open")) {
        document.getElementById("openDisplay").style.display = "block";
    } else {
        document.getElementById("openDisplay").style.display = "none";
    }
    if (gridCandidateType.includes("single")) {
        document.getElementById("singleDisplay").style.display = "block";
    } else {
        document.getElementById("singleDisplay").style.display = "none";
    }
    if (gridCandidateType.includes("double")) {
        document.getElementById("doubleDisplay").style.display = "block";
    } else {
        document.getElementById("doubleDisplay").style.display = "none";
    }
    if (gridCandidateType.includes("doubleXY")) {
        document.getElementById("doubleXYDisplay").style.display = "block";
    } else {
        document.getElementById("doubleXYDisplay").style.display = "none";
    }
    if (gridCandidateType.includes("doubleYX")) {
        document.getElementById("doubleYXDisplay").style.display = "block";
    } else {
        document.getElementById("doubleYXDisplay").style.display = "none";
    }
    if (gridCandidateType.includes("triple")) {
        document.getElementById("tripleDisplay").style.display = "block";
    } else {
        document.getElementById("tripleDisplay").style.display = "none";
    }

    const componentGridValues = document.querySelectorAll(`input[type=radio][name='selectedComponentGrid']`)

    for (const componentGridValue of componentGridValues) {
        componentGridValue.onclick = (grid) => {
            //model.layers[model.radioButton.layer].components[model.radioButton.component].front = [];
            model.layers[model.radioButton.layer].components[model.radioButton.component].grid = grid.target.id;

            if (grid.target.id == "open") {
                model.layers[model.radioButton.layer].components[model.radioButton.component].front = [
                    { "type": "open", "height": model.layers[model.radioButton.layer].height }
                ]
            }

            if (grid.target.id == "single") {
                model.layers[model.radioButton.layer].components[model.radioButton.component].front = [
                    { "type": "door", "rotation": "left", "height": model.layers[model.radioButton.layer].height }
                ]
            }
            if (grid.target.id == "double") {
                model.layers[model.radioButton.layer].components[model.radioButton.component].front = [
                    { "type": "drawer", "height": model.layers[model.radioButton.layer].height / 2 },
                    { "type": "drawer", "height": model.layers[model.radioButton.layer].height / 2 }
                ]
            }
            if (grid.target.id == "doubleXY") {
                model.layers[model.radioButton.layer].components[model.radioButton.component].front = [
                    { "type": "drawer", "height": model.layers[model.radioButton.layer].height / 3 },
                    { "type": "door", "rotation": "left", "height": model.layers[model.radioButton.layer].height / 3 * 2 }
                ]
            }
            if (grid.target.id == "doubleYX") {
                model.layers[model.radioButton.layer].components[model.radioButton.component].front = [
                    { "type": "door", "rotation": "left", "height": model.layers[model.radioButton.layer].height / 3 * 2 },
                    { "type": "drawer", "height": model.layers[model.radioButton.layer].height / 3 }
                ]
            }
            if (grid.target.id == "triple") {
                model.layers[model.radioButton.layer].components[model.radioButton.component].front = [
                    { "type": "drawer", "height": model.layers[model.radioButton.layer].height / 3 },
                    { "type": "drawer", "height": model.layers[model.radioButton.layer].height / 3 },
                    { "type": "flap", "height": model.layers[model.radioButton.layer].height / 3 }
                ]
            }
            updateControlPanel(model, 'selectedComponent');
            updateFeaturedModel(model);
            showSelected(false);
        }
    }

    //selected component type
    document.getElementById(model.layers[model.radioButton.layer].components[model.radioButton.component].front[0].type + 'One').checked = true;
    if (model.layers[model.radioButton.layer].components[model.radioButton.component].front[1] != undefined) {
        document.getElementById(model.layers[model.radioButton.layer].components[model.radioButton.component].front[1].type + 'Two').checked = true;
    }
    if (model.layers[model.radioButton.layer].components[model.radioButton.component].front[2] != undefined) {
        document.getElementById(model.layers[model.radioButton.layer].components[model.radioButton.component].front[2].type + 'Three').checked = true;
    }

    let componentCandidateTypeOne = [];
    let componentCandidateTypeTwo = [];
    let componentCandidateTypeThree = [];
    for (var allComponents = 0; allComponents < ALLCOMPONENTS.components.length; allComponents++) {
        const componentCandidate = ALLCOMPONENTS.components[allComponents];
        if (componentCandidate.width == model.layers[model.radioButton.layer].components[model.radioButton.component].width && componentCandidate.height == model.layers[model.radioButton.layer].components[model.radioButton.component].front[0].height) {
            componentCandidateTypeOne.push(componentCandidate.type);
        }
        if (model.layers[model.radioButton.layer].components[model.radioButton.component].front[1] != undefined) {
            if (componentCandidate.width == model.layers[model.radioButton.layer].components[model.radioButton.component].width && componentCandidate.height == model.layers[model.radioButton.layer].components[model.radioButton.component].front[1].height) {
                componentCandidateTypeTwo.push(componentCandidate.type);
            }
        }
        if (model.layers[model.radioButton.layer].components[model.radioButton.component].front[2] != undefined) {
            if (componentCandidate.width == model.layers[model.radioButton.layer].components[model.radioButton.component].width && componentCandidate.height == model.layers[model.radioButton.layer].components[model.radioButton.component].front[2].height) {
                componentCandidateTypeThree.push(componentCandidate.type);
            }
        }
    }

    // fronts 1
    if (componentCandidateTypeOne.includes("door")) {
        document.getElementById("doorDisplayOne").style.display = "block";
    } else {
        document.getElementById("doorDisplayOne").style.display = "none";
    }
    if (componentCandidateTypeOne.includes("drawer")) {
        document.getElementById("drawerDisplayOne").style.display = "block";
    } else {
        document.getElementById("drawerDisplayOne").style.display = "none";
    }
    if (componentCandidateTypeOne.includes("flap")) {
        document.getElementById("flapDisplayOne").style.display = "block";
    } else {
        document.getElementById("flapDisplayOne").style.display = "none";
    }
    // open space is disabled
    if (componentCandidateTypeOne.includes("open")) {
        document.getElementById("openDisplayOne").style.display = "none";
    } else {
        document.getElementById("openDisplayOne").style.display = "none";
    }

    //fronts 2
    if (componentCandidateTypeTwo.includes("door")) {
        document.getElementById("doorDisplayTwo").style.display = "block";
    } else {
        document.getElementById("doorDisplayTwo").style.display = "none";
    }
    if (componentCandidateTypeTwo.includes("drawer")) {
        document.getElementById("drawerDisplayTwo").style.display = "block";
    } else {
        document.getElementById("drawerDisplayTwo").style.display = "none";
    }
    if (componentCandidateTypeTwo.includes("flap")) {
        document.getElementById("flapDisplayTwo").style.display = "block";
    } else {
        document.getElementById("flapDisplayTwo").style.display = "none";
    }
    // open space is disabled
    if (componentCandidateTypeTwo.includes("open")) {
        document.getElementById("openDisplayTwo").style.display = "none";
    } else {
        document.getElementById("openDisplayTwo").style.display = "none";
    }

    //fronts 3
    if (componentCandidateTypeThree.includes("door")) {
        document.getElementById("doorDisplayThree").style.display = "block";
    } else {
        document.getElementById("doorDisplayThree").style.display = "none";
    }
    if (componentCandidateTypeThree.includes("drawer")) {
        document.getElementById("drawerDisplayThree").style.display = "block";
    } else {
        document.getElementById("drawerDisplayThree").style.display = "none";
    }
    if (componentCandidateTypeThree.includes("flap")) {
        document.getElementById("flapDisplayThree").style.display = "block";
    } else {
        document.getElementById("flapDisplayThree").style.display = "none";
    }
    // open space is disabled
    if (componentCandidateTypeThree.includes("open")) {
        document.getElementById("openDisplayThree").style.display = "none";
    } else {
        document.getElementById("openDisplayThree").style.display = "none";
    }

    const componentValuesOne = document.querySelectorAll(`input[type=radio][name='selectedComponentTypeOne']`);
    for (const componentValue of componentValuesOne) {
        componentValue.onclick = (component) => {
            console.log(component.target.id)

            if (component.target.id == "doorOne") {
                model.layers[model.radioButton.layer].components[model.radioButton.component].front[0].type = door;
                model.layers[model.radioButton.layer].components[model.radioButton.component].front[0].rotation = left;
            } else {
                model.layers[model.radioButton.layer].components[model.radioButton.component].front[0].type = component.target.value;
            }
            updateControlPanel(model, 'selectedComponent');
            updateFeaturedModel(model);
            showSelected(false);
        }
    }
    const componentValuesTwo = document.querySelectorAll(`input[type=radio][name='selectedComponentTypeTwo']`);
    for (const componentValue of componentValuesTwo) {
        componentValue.onclick = (component) => {
            console.log(component.target.id)

            if (component.target.id == "doorOne") {
                model.layers[model.radioButton.layer].components[model.radioButton.component].front[0].type = door;
                model.layers[model.radioButton.layer].components[model.radioButton.component].front[0].rotation = left;
            } else {
                model.layers[model.radioButton.layer].components[model.radioButton.component].front[0].type = component.target.value;
            }
            updateControlPanel(model, 'selectedComponent');
            updateFeaturedModel(model);
            showSelected(false);
        }
    }
    const componentValuesThree = document.querySelectorAll(`input[type=radio][name='selectedComponentTypeThree']`);
    for (const componentValue of componentValuesThree) {
        componentValue.onclick = (component) => {
            console.log(component.target.id)

            if (component.target.id == "doorOne") {
                model.layers[model.radioButton.layer].components[model.radioButton.component].front[0].type = door;
                model.layers[model.radioButton.layer].components[model.radioButton.component].front[0].rotation = left;
            } else {
                model.layers[model.radioButton.layer].components[model.radioButton.component].front[0].type = component.target.value;
            }
            updateControlPanel(model, 'selectedComponent');
            updateFeaturedModel(model);
            showSelected(false);
        }
    }
    document.getElementById('selectedComponentText').textContent = model.layers[model.radioButton.layer].components[model.radioButton.component].grid;

    /*
        for (let frontNumber = model.layers[layerNumber].components[componentNumber].front.length - 1; frontNumber >= 0; frontNumber--) {
            const thisCellType = model.layers[layerNumber].components[componentNumber].front[frontNumber].type;
     
     
            for (var allComps = 0; allComps < ALLCOMPONENTS.components.length; allComps++) {
                const candidate = ALLCOMPONENTS.components[allComps];
                const thisCellheight = model.layers[layerNumber].components[componentNumber].front[frontNumber].height;
                if (thisCellType != "winerack" && thisCellType != "open" && candidate.width == model.layers[layerNumber].components[componentNumber].width && candidate.height == thisCellheight && candidate.type != "open") {
     
                }
            }
     
            for (var allComps = 0; allComps < ALLCOMPONENTS.components.length; allComps++) {
                const candidate = ALLCOMPONENTS.components[allComps];
                const thisCellheight = model.layers[layerNumber].components[componentNumber].front[frontNumber].height;
                if (candidate.width == model.layers[layerNumber].components[componentNumber].width && candidate.height == thisCellheight && candidate.type == thisCellType) {
                    const front = FEATUREDMODEL.layers[layerNumber].components[componentNumber].front[frontNumber];
                    if (candidate.options != undefined && candidate.options.includes("shelves")) {
     
                    }
     
                    if (candidate.options != undefined && candidate.options.includes("rotation")) {
     
                    }
     
                    if (candidate.options != undefined && candidate.options.includes("innerdrawer")) {
      
                    }
                }
            }
    */

    //layer color
    const layerColor = model.color.color;
    var layerColorIndex = ALLCOLORS.colors.findIndex((item) => item.colorHex == layerColor);
    var layerColorValue = document.querySelectorAll('.layerColor_colorButton');

    if (parser.getDevice().type != 'mobile' && parser.getDevice().type != 'tablet') {
        layerColorValue.forEach(item => item.addEventListener('mouseover', () => {
            document.getElementById('layerColorText').style.visibility = 'visible';
            document.getElementById('layerColorText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: ' + document.getElementById(item.id).style.backgroundColor + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + document.getElementById(item.id).alt + '';
            document.getElementById('layerColorText').classList.add('fst-italic');
            showSelected(true);
        }));

        layerColorValue.forEach(item => item.addEventListener('mouseout', () => {
            document.getElementById('layerColorText').style.visibility = 'hidden';
            document.getElementById('layerColorText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: #' + model.color.color + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + ALLCOLORS.colors[layerColorIndex].colorName + '';
            document.getElementById('layerColorText').classList.remove('fst-italic');
            showSelected(true);
        }));
    }

    layerColorValue.forEach(item => item.addEventListener('click', () => {
        layerColorValue.forEach(item => { item.classList.remove('colorButtonActive') });
        const layerColorId = item.id.split('_');
        layerColorIndex = layerColorId[1];

        if (ALLCOLORS.colors[layerColorIndex].colorPath != undefined) {
            model.color = { "color": ALLCOLORS.colors[layerColorIndex].colorHex, "path": ALLCOLORS.colors[layerColorIndex].colorPath, "lacquer": "veneer" };
            document.getElementById('layerColorLacquer_basic').disabled = true;
            document.getElementById('layerColorLacquer_structure').disabled = true;
            document.getElementById('layerColorLacquer_gloss').disabled = true;
            document.getElementById('layerColorLacquer_veneer').checked = true;
        } else {
            if (model.color.lacquer != undefined && model.color.lacquer != "veneer") {
                model.color = { "color": ALLCOLORS.colors[layerColorIndex].colorHex, "lacquer": model.color.lacquer };
            } else {
                model.color = { "color": ALLCOLORS.colors[layerColorIndex].colorHex, "lacquer": "basic" };
            }
            document.getElementById('layerColorLacquer_basic').disabled = false;
            document.getElementById('layerColorLacquer_structure').disabled = false;
            document.getElementById('layerColorLacquer_gloss').disabled = false;
            document.getElementById('layerColorLacquer_' + model.color.lacquer).checked = true;
        }
        //model.background = { "original": allColors.colors[layerColorIndex].colorBg };
        updateControlPanel(model, 'layerColor');
        updateFeaturedModel(model);
        showSelected(true);
    }));
    if (ALLCOLORS.colors[layerColorIndex].colorPath != undefined) {
        document.getElementById('layerColorText').innerHTML = '<img src="https://' + window.location.host + '/' + ALLCOLORS.colors[layerColorIndex].colorPathThumb + '" class="rounded-pill shadow" style="width: calc(1rem + 1vw);">';
    } else {
        document.getElementById('layerColorText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: #' + model.color.color + ';">';
    }
    document.getElementById('layerColorIndex_' + layerColorIndex).classList.remove('colorButton');
    document.getElementById('layerColorIndex_' + layerColorIndex).classList.add('colorButtonActive');

    //selected component color lacquer
    let selectedComponentColorLacquer = document.querySelectorAll('input[type=radio][name="selectedComponentLacquer"]');
    selectedComponentColorLacquer.forEach(radio => { radio.replaceWith(radio.cloneNode(true)) });
    selectedComponentColorLacquer = document.querySelectorAll('input[type=radio][name="selectedComponentLacquer"]');

    if (model.layers[model.radioButton.layer].components[model.radioButton.component].color.lacquer == "veneer") {
        document.getElementById('selectedComponentLacquer_basic').disabled = true;
        document.getElementById('selectedComponentLacquer_structure').disabled = true;
        document.getElementById('selectedComponentLacquer_gloss').disabled = true;
        document.getElementById('selectedComponentLacquer_veneer').checked = true;
    } else {
        document.getElementById('selectedComponentLacquer_basic').disabled = false;
        document.getElementById('selectedComponentLacquer_structure').disabled = false;
        document.getElementById('selectedComponentLacquer_gloss').disabled = false;
        document.getElementById('selectedComponentLacquer_' + model.layers[model.radioButton.layer].components[model.radioButton.component].color.lacquer).checked = true;
    }
    selectedComponentColorLacquer.forEach(radio => radio.addEventListener('click', () => {
        model.layers[model.radioButton.layer].components[model.radioButton.component].color.lacquer = radio.value;
        document.getElementById('selectedComponentLacquer_' + model.layers[model.radioButton.layer].components[model.radioButton.component].color.lacquer).checked = true;
        updateControlPanel(model, 'selectedComponentColor');
        updateFeaturedModel(model);
        showSelected(false);
    }));

    //selected component color
    const selectedComponentColor = model.layers[model.radioButton.layer].components[model.radioButton.component].color.color;
    var selectedComponentColorIndex = ALLCOLORS.colors.findIndex((item) => item.colorHex == selectedComponentColor);
    var selectedComponentColorValue = document.querySelectorAll('.selectedComponentColor_colorButton');

    if (parser.getDevice().type != 'mobile' && parser.getDevice().type != 'tablet') {
        selectedComponentColorValue.forEach(item => item.addEventListener('mouseover', () => {
            document.getElementById('selectedComponentColorText').style.visibility = 'visible';
            document.getElementById('selectedComponentColorText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: ' + document.getElementById(item.id).style.backgroundColor + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + document.getElementById(item.id).alt + '';
            document.getElementById('selectedComponentColorText').classList.add('fst-italic');
            showSelected(true);
        }));

        selectedComponentColorValue.forEach(item => item.addEventListener('mouseout', () => {
            document.getElementById('selectedComponentColorText').style.visibility = 'hidden';
            document.getElementById('selectedComponentColorText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: #' + model.layers[model.radioButton.layer].components[model.radioButton.component].color.color + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + ALLCOLORS.colors[selectedComponentColorIndex].colorName + '';
            document.getElementById('selectedComponentColorText').classList.remove('fst-italic');
            showSelected(true);
        }));
    }

    selectedComponentColorValue.forEach(item => item.addEventListener('click', () => {
        selectedComponentColorValue.forEach(item => { item.classList.remove('colorButtonActive') });
        const selectedComponentColorId = item.id.split('_');
        selectedComponentColorIndex = selectedComponentColorId[1];

        if (ALLCOLORS.colors[selectedComponentColorIndex].colorPath != undefined) {
            model.layers[model.radioButton.layer].components[model.radioButton.component].color = { "color": ALLCOLORS.colors[selectedComponentColorIndex].colorHex, "path": ALLCOLORS.colors[selectedComponentColorIndex].colorPath, "lacquer": "veneer" };
            document.getElementById('selectedComponentLacquer_basic').disabled = true;
            document.getElementById('selectedComponentLacquer_structure').disabled = true;
            document.getElementById('selectedComponentLacquer_gloss').disabled = true;
            document.getElementById('selectedComponentLacquer_veneer').checked = true;
        } else {
            if (model.layers[model.radioButton.layer].components[model.radioButton.component].color.lacquer != undefined) {
                model.layers[model.radioButton.layer].components[model.radioButton.component].color = { "color": ALLCOLORS.colors[selectedComponentColorIndex].colorHex, "lacquer": model.layers[model.radioButton.layer].components[model.radioButton.component].color.lacquer };
            } else {
                model.layers[model.radioButton.layer].components[model.radioButton.component].color = { "color": ALLCOLORS.colors[selectedComponentColorIndex].colorHex, "lacquer": "basic" };
            }
            document.getElementById('selectedComponentLacquer_basic').disabled = false;
            document.getElementById('selectedComponentLacquer_structure').disabled = false;
            document.getElementById('selectedComponentLacquer_gloss').disabled = false;
            document.getElementById('selectedComponentLacquer_' + model.color.lacquer).checked = true;
        }
        updateControlPanel(model, 'selectedComponentColor');
        updateFeaturedModel(model);
        showSelected(true);
    }));
    if (ALLCOLORS.colors[selectedComponentColorIndex].colorPath != undefined) {
        document.getElementById('selectedComponentColorText').innerHTML = '<img src="https://' + window.location.host + '/' + ALLCOLORS.colors[selectedComponentColorIndex].colorPathThumb + '" class="rounded-pill shadow" style="width: calc(1rem + 1vw);">';
    } else {
        document.getElementById('selectedComponentColorText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: #' + model.layers[model.radioButton.layer].components[model.radioButton.component].color.color + ';">';
    }
    document.getElementById('selectedComponentColorIndex_' + selectedComponentColorIndex).classList.remove('colorButton');
    document.getElementById('selectedComponentColorIndex_' + selectedComponentColorIndex).classList.add('colorButtonActive');

    // price
    if (model.mounting.type == "onPlinth") {
        document.getElementById('mountingText').textContent = 'on plinth';
        document.getElementById('price').textContent = "€ ...,-";
    } else if (model.mounting.type == "wallMounted") {
        document.getElementById('mountingText').textContent = 'wall mounted';
        document.getElementById('price').textContent = "€ ...,-";
    } else if (model.mounting.type == "onFrame") {
        document.getElementById('mountingText').textContent = 'on frame';
        document.getElementById('price').textContent = "€ ...,-";
    }
}

function showFeaturedModel(model) {
    updateControlPanel(model);
    updateFeaturedModel(model);
}

function showFeaturedModelByIndex(index) {
    FEATUREDMODELINDEX = index;
    FEATUREDMODEL = JSON.parse(JSON.stringify(ALLMODELS[index]));
    showFeaturedModel(FEATUREDMODEL);
}

async function initUnity() {
    var canvas = document.getElementById("modelviewer");
    var buildUrl = `projects/${brand}-${product}/Build`;
    var config = {
        dataUrl: `${buildUrl}/${brand}-${product}.data`,
        frameworkUrl: `${buildUrl}/${brand}-${product}.framework.js`,
        codeUrl: `${buildUrl}/${brand}-${product}.wasm`,
        //streamingAssetsUrl: "StreamingAssets",
        companyName: 'TripleDesign',
        productName: product.charAt(0).toUpperCase() + product.slice(1),
        productVersion: '0.1',
    };

    const unityPromise = createUnityInstance(canvas, config, (progress) => {
        progressBar.style.width = 100 * progress + '%';
    });
    const modelPromise = fetch(`../projects/${brand}-${product}/models.json`).then(response => response.json());
    const colorsPromise = fetch(`../projects/${brand}-${product}/colors.json`).then(response => response.json());
    const componentsPromise = fetch(`../projects/${brand}-${product}/components.json`).then(response => response.json());
    UNITY_INSTANCE = await unityPromise;
    ALLMODELS = await modelPromise;
    ALLCOLORS = await colorsPromise;
    ALLCOMPONENTS = await componentsPromise;

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

function addLayerTable(model, containerElem) {
    // HACK: store model in global variable
    FEATUREDMODEL = model;
    const s = [];
    s.push( /*html*/ `
    <div class="d-flex justify-content-end m-0 p-0 pb-2 border-bottom border-secondery">
        <div class="m-0 p-0 px-2">
            <button type="button" class="btn btn-light btn-sm" id="addLayer"><i class="bi-plus-square"></i><small> add layer</small></button>
        </div>
    </div>
  
    `);

    for (let l = FEATUREDMODEL.layers.length - 1; l >= 0; l--) {
        s.push( /*html*/ `
       <div class="d-flex m-0 p-0 pt-2 pb-2 border-bottom border-secondery">
            <div class="m-0 p-0 px-2">${l + 1}</div>
            <div class="dropdown m-0 p-0 px-2">
                <button class="btn btn-light btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <small>${FEATUREDMODEL.layers[l].height + ' cm'}</small>
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" name="layerHeight_${l + 1}" id="layerHeight_${l + 1}_19"><small>19 cm</small></a></li>
                    <li><a class="dropdown-item" name="layerHeight_${l + 1}" id="layerHeight_${l + 1}_38"><small>38 cm</small></a></li>
                    <li><a class="dropdown-item" name="layerHeight_${l + 1}" id="layerHeight_${l + 1}_57"><small>57 cm</small></a></li>
                </ul>
            </div>
            `);
        if (FEATUREDMODEL.layers.length > 1) {
            s.push( /*html*/ `
            <div class="m-0 p-0 px-2">
                <button type="button" class="btn btn-light btn-sm" name="removeLayer" id="removeLayer_${l}"><i class="bi-trash"></i><small> remove layer</small></button>
            </div>
              `);
        }
        s.push( /*html*/ `
        </div>
      `);
    }
    s.push( /*html*/ `
  <div class="p-0 m-0" id="totalLayerHeightText"><small></small></div>
    `);
    containerElem.innerHTML = s.join('\n');
}

function optionsDiv(model, containerElem) {
    // HACK: store model in global variable
    FEATUREDMODEL = model;
    const s = [];

    let layerNumber = 0;
    let componentNumber = 0;
    let frontNumber = 0;


    s.push( /*html*/
        `
<div class="card m-0 p-0" style="width: 170px;">
    <div class="m-0 p-2">
    `);
    for (let frontNumber = model.layers[layerNumber].components[componentNumber].front.length - 1; frontNumber >= 0; frontNumber--) {
        const thisCellType = model.layers[layerNumber].components[componentNumber].front[frontNumber].type;
        s.push( /*html*/ `
        <div class="m-0 p-0">
            <button class="btn btn-light btn-sm dropdown-toggle" type="button" id="dropdown_frontType" data-bs-toggle="dropdown" aria-expanded="false"><small>${thisCellType}</small></button>
            <ul class="dropdown-menu" aria-labelledby="dropdown_frontType">
            `);
        for (var allComps = 0; allComps < ALLCOMPONENTS.components.length; allComps++) {
            const candidate = ALLCOMPONENTS.components[allComps];
            const thisCellheight = model.layers[layerNumber].components[componentNumber].front[frontNumber].height;
            if (thisCellType != "winerack" && thisCellType != "open" && candidate.width == model.layers[layerNumber].components[componentNumber].width && candidate.height == thisCellheight && candidate.type != "open") {
                s.push( /*html*/ `
                <li onclick="componentSwap(${layerNumber},${componentNumber},${frontNumber},'${candidate.type}')"><div id="componentOptions_${allComps}" class="dropdown-item"><small>${candidate.type}</small></div></li>
                `);
            }
        }
        s.push( /*html*/ `
            </ul>
            `);
        for (var allComps = 0; allComps < ALLCOMPONENTS.components.length; allComps++) {
            const candidate = ALLCOMPONENTS.components[allComps];
            const thisCellheight = model.layers[layerNumber].components[componentNumber].front[frontNumber].height;
            if (candidate.width == model.layers[layerNumber].components[componentNumber].width && candidate.height == thisCellheight && candidate.type == thisCellType) {
                const front = FEATUREDMODEL.layers[layerNumber].components[componentNumber].front[frontNumber];
                if (candidate.options != undefined && candidate.options.includes("shelves")) {
                    s.push( /*html*/ `
                        <div><small>shelves:</small></div>
                        <div id="shelvesAmount_${layerNumber}_${componentNumber}_${frontNumber}" class="btn-group" role="group" aria-label="shelves button group">
                            <input type="radio" class="btn-check" name="shelvesAmount_${layerNumber}_${componentNumber}_${frontNumber}" value="0" id="shelvesAmount_0_${layerNumber}_${componentNumber}_${frontNumber}" autocomplete="off" checked>
                            <label class="btn btn-light btn-sm" for="shelvesAmount_0_${layerNumber}_${componentNumber}_${frontNumber}"><small>0</small></label>
                            <input type="radio" class="btn-check" name="shelvesAmount_${layerNumber}_${componentNumber}_${frontNumber}" value="1" id="shelvesAmount_1_${layerNumber}_${componentNumber}_${frontNumber}" autocomplete="off">
                            <label class="btn btn-light btn-sm" for="shelvesAmount_1_${layerNumber}_${componentNumber}_${frontNumber}"><small>1</small></label>
                            <input type="radio" class="btn-check" name="shelvesAmount_${layerNumber}_${componentNumber}_${frontNumber}" value="2" id="shelvesAmount_2_${layerNumber}_${componentNumber}_${frontNumber}" autocomplete="off">
                            <label class="btn btn-light btn-sm" for="shelvesAmount_2_${layerNumber}_${componentNumber}_${frontNumber}"><small>2</small></label>
                        </div>
                        `);
                }

                if (candidate.options != undefined && candidate.options.includes("rotation")) {
                    s.push( /*html*/ `
                        <div><small>rotation:</small></div>
                        <div id="rotation_${layerNumber}_${componentNumber}_${frontNumber}" class="btn-group" role="group" aria-label="rotation button group">
                            <input type="radio" class="btn-check" name="rotation_${layerNumber}_${componentNumber}_${frontNumber}" value="left" id="rotationLeft_${layerNumber}_${componentNumber}_${frontNumber}" autocomplete="off" checked>
                            <label class="btn btn-light btn-sm" for="rotationLeft_${layerNumber}_${componentNumber}_${frontNumber}"><small>left</small></label>
                            <input type="radio" class="btn-check" name="rotation_${layerNumber}_${componentNumber}_${frontNumber}" value="right" id="rotationRight_${layerNumber}_${componentNumber}_${frontNumber}" autocomplete="off">
                            <label class="btn btn-light btn-sm" for="rotationRight_${layerNumber}_${componentNumber}_${frontNumber}"><small>right</small></label>
                        </div>
                        `);
                }

                if (candidate.options != undefined && candidate.options.includes("innerdrawer")) {
                    s.push( /*html*/ `
                        <div><small>innerdrawer:</small></div>
                        <div id="innerdrawer_${layerNumber}_${componentNumber}_${frontNumber}" class="m-0 p-1 btn-group" role="group" aria-label="innerdrawer group">
                            <input type="radio" class="btn-check" name="innerdrawer_${layerNumber}_${componentNumber}_${frontNumber}" value="false" id="innerdrawerNo_${layerNumber}_${componentNumber}_${frontNumber}" autocomplete="off" checked>
                            <label class="btn btn-light btn-sm" for="innerdrawerNo_${layerNumber}_${componentNumber}_${frontNumber}"><small>no</small></label>
                            <input type="radio" class="btn-check" name="innerdrawer_${layerNumber}_${componentNumber}_${frontNumber}" value="true" id="innerdrawerYes_${layerNumber}_${componentNumber}_${frontNumber}" autocomplete="off">
                            <label class="btn btn-light btn-sm" for="innerdrawerYes_${layerNumber}_${componentNumber}_${frontNumber}"><small>yes</small></label>
                        </div>
                        `);
                }
            }
        }
        s.push( /*html*/ `
    </div> 
    `);
    }
    s.push( /*html*/ `
</div>
    `);

    containerElem.innerHTML = s.join('\n');
}


function changeWidth(layerNumber, oldWidth, newWidth, oldNumberOfComponents) {
    let componentSlots = newWidth / 28.5;
    let numOfComps = Math.floor(Math.random() * componentSlots) + 1;

    FEATUREDMODEL.width = newWidth;
    getCompWidths([28.5, 57, 85.5, 114], newWidth, componentSlots / 2, oldNumberOfComponents);
    updateFeaturedModel(FEATUREDMODEL, 'size');
    showSelected();
}

function getCompWidths(array, sum, limit, oldNumberOfComponents) {
    function iter(index, temp) {
        var s = temp.reduce((a, b) => a + b, 0);
        if (s === sum) compWiths.push(temp);
        if (s >= sum || index >= array.length || temp.length >= limit) return;
        iter(index, temp.concat(array[index]));
        iter(index + 1, temp);
    }

    var compWiths = [];
    iter(0, []);
    var newCompWidths = compWiths[0].sort(() => Math.random() - 0.5);
    console.log(newCompWidths);
    console.log(oldNumberOfComponents, newCompWidths.length);

    for (var i = 0; i < newCompWidths.length; i++) {
        if (FEATUREDMODEL.layers[0].components[i] != undefined) {
            FEATUREDMODEL.layers[0].components[i].width = newCompWidths[i];

        }
        if (newCompWidths.length <= FEATUREDMODEL.layers[0].components.length) {
            FEATUREDMODEL.layers[0].components.pop();
        } else {
            FEATUREDMODEL.layers[0].components.push(JSON.parse(JSON.stringify({
                "width": newCompWidths[newCompWidths.length - 1],
                "grid": "single",
                "front": [{
                    "type": "drawer",
                    "color": { "color": "f7f6f4", "lacquer": "basic" },
                    "height": FEATUREDMODEL.layers[0].height
                }],
                "layer": {
                    "bottomBackTop": { "color": "f7f6f4", "lacquer": "basic" },
                    "left": { "color": "f7f6f4", "lacquer": "basic" },
                    "right": { "color": "f7f6f4", "lacquer": "basic" }
                }
            })));
        }
    }
}

function changeNumLayers(numLayers, newNumLayers) {
    if (numLayers > newNumLayers) {
        FEATUREDMODEL.layers.pop();
    } else {
        FEATUREDMODEL.layers.push(JSON.parse(JSON.stringify(FEATUREDMODEL.layers[0])));
    }
    updateFeaturedModel(FEATUREDMODEL);
    updateControlPanel(FEATUREDMODEL, undefined, 'size');
    //updateControlPanel(FEATUREDMODEL, 'layer_'+newNumLayers,1);
    showSelected();
}

function changeHeight(layerNumber, newHeight) {
    for (let i = 0; i < FEATUREDMODEL.layers[layerNumber].components.length; i++) {
        let componentNumber = FEATUREDMODEL.layers[layerNumber].components[i];
        const oldFronts = componentNumber.front;
        const frontColor = (oldFronts[0] && oldFronts[0].color) || { "color": "f7f6f4", "lacquer": "basic" };

        if (newHeight == 19) {
            componentNumber.front[0].height == 19;
            if (componentNumber.grid != "open") {
                componentNumber.grid = "single";
                componentNumber.front = undefined;
                componentNumber.front = [
                    { "type": "drawer", "height": newHeight, "color": frontColor }
                ]
            } else {
                componentNumber.front = undefined;
                componentNumber.front = [
                    { "type": "open", "shelves": 0, "height": newHeight, "color": frontColor }
                ]
            }
        }
        if (newHeight == 38) {
            if (componentNumber.grid == "single") {
                componentNumber.front = undefined;
                componentNumber.grid = "single";
                componentNumber.front = [
                    { "type": "door", "rotation": "right", "height": newHeight, "color": frontColor }
                ]
            }
            if (componentNumber.grid == "doubleXY" || componentNumber.grid == "doubleYX" || componentNumber.grid == "triple") {
                componentNumber.front = undefined;
                componentNumber.grid = "double";
                componentNumber.front = [
                    { "type": "flap", "height": newHeight / 2, "color": frontColor },
                    { "type": "drawer", "height": newHeight / 2, "color": frontColor }
                ]
            }
            if (componentNumber.grid == "open" && componentNumber.width != 57) {
                componentNumber.front = undefined;
                componentNumber.front = [
                    { "type": "open", "shelves": 1, "height": newHeight, "color": frontColor }
                ]
            }
            if (componentNumber.grid == "open" && componentNumber.width == 57) {
                componentNumber.front = undefined;
                componentNumber.front = [
                    { "type": "winerack", "height": newHeight, "color": frontColor }
                ]
            }
        }
        if (newHeight == 57) {
            if (componentNumber.grid == "single" && componentNumber.width <= 57) {
                componentNumber.front = undefined;
                componentNumber.front = [
                    { "type": "door", "rotation": "left", "height": newHeight, "color": frontColor }
                ]
            }
            if (componentNumber.grid == "single" && componentNumber.width > 57) {
                componentNumber.front = undefined;
                componentNumber.grid = "doubleXY";
                componentNumber.front = [
                    { "type": "flap", "height": 19, "color": frontColor },
                    { "type": "drawer", "height": 38, "color": frontColor }
                ]
            }
            if (componentNumber.grid == "double") {
                componentNumber.front = undefined;
                componentNumber.grid = "triple";
                componentNumber.front = [
                    { "type": "drawer", "height": 19, "color": frontColor },
                    { "type": "flap", "height": 19, "color": frontColor },
                    { "type": "drawer", "height": 19, "color": frontColor }
                ]
            }
            if (componentNumber.grid == "open") {
                componentNumber.front = undefined;
                componentNumber.front = [
                    { "type": "open", "shelves": 2, "height": newHeight, "color": frontColor }
                ]
            }
        }
    }

    FEATUREDMODEL.layers[layerNumber].height = newHeight;
}

function changeGridUnity(name) {
    console.log(name);
    let compInfo = name.split("_");
    let newGrid = compInfo[0];
    let layerNumber = compInfo[1];
    let componentNumber = compInfo[2];

    console.log(newGrid);
    console.log(layerNumber);
    console.log(componentNumber);

    let thisHeight = FEATUREDMODEL.layers[layerNumber].height;
    let component = FEATUREDMODEL.layers[layerNumber].components[componentNumber];
    if (newGrid == "winerack") {
        component.grid = "open";
    } else {
        component.grid = newGrid;
    }
    const oldFronts = component.front;
    const frontColor = (oldFronts[0] && oldFronts[0].color) || { "color": "f7f6f4", "path": "", "lacquer": "basic" };
    component.front = undefined;

    if (newGrid == "winerack") {
        component.front = [
            { "type": "winerack", "height": thisHeight, "color": frontColor }
        ]
    }
    if (newGrid == "open") {
        component.front = [
            { "type": "open", "shelves": 1, "height": thisHeight, "color": frontColor }
        ]
    }
    if (newGrid == "single") {
        component.front = [
            { "type": "door", "rotation": "left", "height": thisHeight, "color": frontColor }
        ]
    }
    if (newGrid == "double") {
        component.front = [
            { "type": "drawer", "height": thisHeight / 2, "color": frontColor },
            { "type": "drawer", "height": thisHeight / 2, "color": frontColor }
        ]
    }
    if (newGrid == "doubleXY") {
        component.front = [
            { "type": "flap", "height": thisHeight / 3, "color": frontColor },
            { "type": "drawer", "height": thisHeight / 3 * 2, "color": frontColor }
        ]
    }
    if (newGrid == "doubleYX") {
        component.front = [
            { "type": "flap", "height": thisHeight / 3 * 2, "color": frontColor },
            { "type": "drawer", "height": thisHeight / 3, "color": frontColor }
        ]
    }
    if (newGrid == "triple") {
        component.front = [
            { "type": "drawer", "height": thisHeight / 3, "color": frontColor, },
            { "type": "flap", "height": thisHeight / 3, "color": frontColor },
            { "type": "drawer", "height": thisHeight / 3, "color": frontColor }
        ]
    }
    updateFeaturedModel(FEATUREDMODEL);
    showSelected();
}

function componentSwap(layerNumber, componentNumber, frontNumber, newType) {
    let component = FEATUREDMODEL.layers[layerNumber].components[componentNumber];
    component.front[frontNumber].type = newType;
    updateControlPanel(FEATUREDMODEL, undefined, 'components');
    updateFeaturedModel(FEATUREDMODEL);
    showSelected();
}

function changeCompWidthUnity(side, layerNumber, componentNumber) {
    let neighbourComponentNumber;
    let newWidth = FEATUREDMODEL.layers[layerNumber].components[componentNumber].width - 28.5;
    let newNeighbourWidth;
    if (side == 'left') {
        neighbourComponentNumber = componentNumber - 1;
        newNeighbourWidth = FEATUREDMODEL.layers[layerNumber].components[neighbourComponentNumber].width + 28.5;
    }
    if (side == 'right') {
        neighbourComponentNumber = componentNumber + 1;
        newNeighbourWidth = FEATUREDMODEL.layers[layerNumber].components[neighbourComponentNumber].width + 28.5;
    }
    if (newWidth == 0) {
        FEATUREDMODEL.layers[layerNumber].components.splice(componentNumber, 1);
        if (side == 'left') {
            FEATUREDMODEL.layers[layerNumber].components[neighbourComponentNumber].width = newNeighbourWidth;
        }
        if (side == "right") {
            FEATUREDMODEL.layers[layerNumber].components[neighbourComponentNumber - 1].width = newNeighbourWidth;
        }
    } else {
        FEATUREDMODEL.layers[layerNumber].components[componentNumber].width = newWidth;
        FEATUREDMODEL.layers[layerNumber].components[neighbourComponentNumber].width = newNeighbourWidth;
    }

    updateControlPanel(FEATUREDMODEL, undefined, 'component');
    updateFeaturedModel(FEATUREDMODEL);
    showSelected(false);
}

function splitCompUnity(layerNumber, componentNumber, slotNumber) {
    let myComponents = FEATUREDMODEL.layers[layerNumber].components;
    let widthBefore = myComponents[componentNumber].width;
    let newComponentNumber = componentNumber + 1;
    let leftComponentWidth = slotNumber * 28.5;
    let rightComponentWidth = widthBefore - (slotNumber * 28.5);

    myComponents.splice(newComponentNumber, 0, JSON.parse(JSON.stringify(myComponents[componentNumber])));
    myComponents[componentNumber].width = leftComponentWidth;
    myComponents[newComponentNumber].width = rightComponentWidth;

    updateControlPanel(FEATUREDMODEL, undefined, 'component');
    updateFeaturedModel(FEATUREDMODEL);
    showSelected(false);
}

function initSettings(model) {
    const accordions = {};
    let noMounting;
    if (urlParams.has('noMounting')) {
        noMounting = "d-none";
    } else {
        noMounting = "d-block";
    }
    let noWidth;
    if (urlParams.has('noWidth')) {
        noWidth = "d-none";
    } else {
        noWidth = "d-block";
    }
    let noLayers;
    if (urlParams.has('noWidth')) {
        noLayers = "d-none";
    } else {
        noLayers = "d-block";
    }
    let noDecor;
    if (parser.getDevice().type == 'mobile' || urlParams.has('noDecor')) {
        noDecor = "d-none";
    } else {
        noDecor = "d-block";
    }
    accordions.mounting = {
        "title": "mounting",
        "options": ['mounting'],
        "display": noMounting,
        "code": /*html*/ `
        <div class="row m-0 p-0 pb-2">
            <div class="d-flex justify-content-start m-0 p-0">
                <div class="card border-0">
                    <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                        <input type="radio" class="form-check-input" name="mounting" value="onPlinth" id="onPlinth">
                        <label class="form-check-label" for="onPlinth">on plinth</label>
                    </div>
                    <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                        <input type="radio" class="form-check-input" name="mounting" value="wallMounted" id="wallMounted">
                        <label class="form-check-label" for="wallMounted">wall mounted</label> 
                    </div>
                    <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                        <input type="radio" class="form-check-input" name="mounting" value="onFrame" id="onFrame">
                        <label class="form-check-label" for="onFrame">on frame</label>
                    </div>
                </div>
            </div>
        </div>`
    }
    accordions.width = {
        "title": "width",
        "options": ['width'],
        "display": noWidth,
        "code": /*html*/ `
        <div class="row m-0 p-0 pb-2">
            <div class="row m-0 p-0 pb-4">
                <div class="h6 m-0 p-0 pb-1">width (general)</div>
                <input id="widthslider" type="range" class="form-range m-0 p-0" value="" min="570" max="3990" step="285" list="tickmarks">
                <datalist class="m-0 p-0" id="tickmarks" >
                    <option class="m-0 p-0 small" value="570" label="57"></option>
                    <option class="m-0 p-0 small" value="855" label="85.5"></option>
                    <option class="m-0 p-0 small" value="1140" label="114"></option>
                    <option class="m-0 p-0 small" value="1425" label="142.5"></option>
                    <option class="m-0 p-0 small" value="1710" label="171"></option>
                    <option class="m-0 p-0 small" value="1995" label="199.5"></option>
                    <option class="m-0 p-0 small" value="2280" label="228"></option>
                    <option class="m-0 p-0 small" value="2565" label="256.5"></option>
                    <option class="m-0 p-0 small" value="2850" label="285"></option>
                    <option class="m-0 p-0 small" value="3135" label="313.5"></option>
                    <option class="m-0 p-0 small" value="3420" label="342"></option>
                    <option class="m-0 p-0 small" value="3705" label="370.5"></option>
                    <option class="m-0 p-0 small" value="3990" label="399"></option>
                </datalist>
        </div>`
    }
    accordions.layers = {
        "title": "layers",
        "options": ['totalHeight', 'layerAmount'],
        "display": noLayers,
        "code": /*html*/ `
        <div class="row m-0 p-0 pb-2">
            <div class="row m-0 p-0">
                <div class="row m-0 p-0" id="layerTable"></div>
            </div>
        </div>`,
        "onload": function () {
            let containerElemLayerTable = document.getElementById('layerTable');
            addLayerTable(model, containerElemLayerTable);
        }
    }
    accordions.layerColor = {
        "title": "layerColor",
        "options": ['layerColor'],
        "display": "d-block",
        "code": /*html*/ `
        <div class="row m-0 p-0 pb-2">
            <div class="col-5 m-0 p-0">
                <div class="row m-0 p-0 pb-2">
                    <div class="d-flex justify-content-start m-0 p-0">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="layerColorlacquer" id="layerColorLacquer_basic" value="basic">
                            <label class="form-check-label" for="basic">basic</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="layerColorlacquer" id="layerColorLacquer_structure" value="structure">
                            <label class="form-check-label" for="structure">structure</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="layerColorlacquer" id="layerColorLacquer_gloss" value="gloss">
                            <label class="form-check-label" for="gloss">gloss</label>
                        </div>
                    </div>
                </div>
                <div id="layerColorPicker" class="m-0 p-0"></div>
            </div>
            <div class="col-1 m-0 p-0">
            </div>
            <div class="col-3 m-0 p-0">
                <div class="row m-0 p-0 pb-2">
                    <div class="d-flex justify-content-start m-0 p-0">
                        <div class="form-check form-check-inline invisible">
                            <input class="form-check-input" type="radio" name="layerColorLacquer" id="layerColorLacquer_veneer" value="veneer">
                            <label class="form-check-label" for="layerColorLacquer">veneer</label>
                        </div>
                    </div>
                    <div id="layerTexturesPicker" class="m-0 p-0"></div>
                </div>
            </div>
        </div>`,
        "onload": function () {
            let containerElemLayerColorsColors = document.getElementById("layerColorPicker");
            addColors('layerColor', ALLCOLORS.colors, containerElemLayerColorsColors);
            let containerElemLayerColorsTextures = document.getElementById("layerTexturesPicker");
            addTextures('layerColor', ALLCOLORS.colors, containerElemLayerColorsTextures);
        }
    }
    accordions.selectedComponent = {
        "title": "component",
        "options": ['selectedComponent'],
        "display": "d-block",
        "code": /*html*/ `
        <div class="row m-0 p-0 pb-2">
            <div class="d-flex justify-content-start m-0 p-0">
                <div class="card border-0">
                    <div id="openDisplay" class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                        <input type="radio" class="form-check-input" name="selectedComponentGrid" id="open">
                        <label class="form-check-label" for="open">open space</label>
                    </div>
                    <div id="singleDisplay" class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                        <input type="radio" class="form-check-input" name="selectedComponentGrid" id="single">
                        <label class="form-check-label" for="single">single</label>
                    </div>
                    <div id="doubleDisplay" class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                        <input type="radio" class="form-check-input" name="selectedComponentGrid" id="double">
                        <label class="form-check-label" for="double">double</label>
                    </div>
                    <div id="doubleXYDisplay" class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                        <input type="radio" class="form-check-input" name="selectedComponentGrid" id="doubleXY">
                        <label class="form-check-label" for="doubleXY">double XY</label>
                    </div>
                    <div id="doubleYXDisplay" class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                        <input type="radio" class="form-check-input" name="selectedComponentGrid" id="doubleYX">
                        <label class="form-check-label" for="doubleYX">double YX</label>
                    </div>
                    <div id="tripleDisplay" class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                        <input type="radio" class="form-check-input" name="selectedComponentGrid" id="triple">
                        <label class="form-check-label" for="triple">triple</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="row m-0 p-0 pb-2">
            <div class="col-4 m-0 p-0">
                <div class="card border-0">
                    <div id="doorDisplayOne" class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                        <input type="radio" class="form-check-input" name="selectedComponentTypeOne" value="door" id="doorOne">
                        <label class="form-check-label" for="doorOne">door</label>
                    </div>
                    <div id="drawerDisplayOne" class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                        <input type="radio" class="form-check-input" name="selectedComponentTypeOne" value="drawer" id="drawerOne">
                        <label class="form-check-label" for="drawerOne">drawer</label>
                    </div>
                    <div id="flapDisplayOne" class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                        <input type="radio" class="form-check-input" name="selectedComponentTypeOne" value="flap" id="flapOne">
                        <label class="form-check-label" for="flapOne">flap</label>
                    </div>
                    <div id="openDisplayOne" class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                        <input type="radio" class="form-check-input" name="selectedComponentTypeOne" value="open" id="openOne">
                        <label class="form-check-label" for="openOne">open space</label>
                    </div>
                </div>
            </div>
            <div class="col-4 m-0 p-0">
                <div class="card border-0">
                    <div id="doorDisplayTwo" class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                        <input type="radio" class="form-check-input" name="selectedComponentTypeTwo" id="doorTwo">
                        <label class="form-check-label" for="doorTwo">door</label>
                    </div>
                    <div id="drawerDisplayTwo" class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                        <input type="radio" class="form-check-input" name="selectedComponentTypeTwo" id="drawerTwo">
                        <label class="form-check-label" for="drawerTwo">drawer</label>
                    </div>
                    <div id="flapDisplayTwo" class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                        <input type="radio" class="form-check-input" name="selectedComponentTypeTwo" id="flapTwo">
                        <label class="form-check-label" for="flapTwo">flap</label>
                    </div>
                    <div id="openDisplayTwo" class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                        <input type="radio" class="form-check-input" name="selectedComponentTypeTwo" id="openTwo">
                        <label class="form-check-label" for="openTwo">open space</label>
                    </div>
                </div>
            </div>
            <div class="col-4 m-0 p-0">
                <div class="card border-0">
                    <div id="doorDisplayThree" class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                        <input type="radio" class="form-check-input" name="selectedComponentTypeThree" id="doorThree">
                        <label class="form-check-label" for="doorThree">door</label>
                    </div>
                    <div id="drawerDisplayThree" class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                        <input type="radio" class="form-check-input" name="selectedComponentTypeThree" id="drawerThree">
                        <label class="form-check-label" for="drawerThree">drawer</label>
                    </div>
                    <div id="flapDisplayThree" class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                        <input type="radio" class="form-check-input" name="selectedComponentTypeThree" id="flapThree">
                        <label class="form-check-label" for="flapThree">flap</label>
                    </div>
                    <div id="openDisplayThree" class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                        <input type="radio" class="form-check-input" name="selectedComponentTypeThree" id="openThree">
                        <label class="form-check-label" for="openThree">open space</label>
                    </div>
                </div>
            </div>
        </div>`
    }

    accordions.selectedComponentColor = {
        "title": "componentcolor",
        "options": ['selectedComponentColor'],
        "display": "d-block",
        "code": /*html*/ `
        <div class="row m-0 p-0 pb-2">
            <div class="col-5 m-0 p-0">
                <div class="row m-0 p-0 pb-2">
                    <div class="d-flex justify-content-start m-0 p-0">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="selectedComponentLacquer" id="selectedComponentLacquer_basic" value="basic">
                            <label class="form-check-label" for="basic">basic</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="selectedComponentLacquer" id="selectedComponentLacquer_structure" value="structure">
                            <label class="form-check-label" for="structure">structure</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="selectedComponentLacquer" id="selectedComponentLacquer_gloss" value="gloss">
                            <label class="form-check-label" for="gloss">gloss</label>
                        </div>
                    </div>
                </div>
                <div id="selectedComponentColorPicker" class="m-0 p-0"></div>
            </div>
            <div class="col-1 m-0 p-0">
            </div>
            <div class="col-3 m-0 p-0">
                <div class="row m-0 p-0 pb-2">
                    <div class="d-flex justify-content-start m-0 p-0">
                        <div class="form-check form-check-inline invisible">
                            <input class="form-check-input" type="radio" name="selectedComponentLacquer" id="selectedComponentLacquer_veneer" value="veneer">
                            <label class="form-check-label" for="selectedComponentLacquer">veneer</label>
                        </div>
                    </div>
                    <div id="selectedComponentTexturesPicker" class="m-0 p-0"></div>
                </div>
            </div>
        </div>`,
        "onload": function () {
            let containerElemselectedComponentColors = document.getElementById("selectedComponentColorPicker");
            addColors('selectedComponentColor', ALLCOLORS.colors, containerElemselectedComponentColors);
            let containerElemselectedComponentTextures = document.getElementById("selectedComponentTexturesPicker");
            addTextures('selectedComponentColor', ALLCOLORS.colors, containerElemselectedComponentTextures);
        }
    }
    accordions.decor = {
        "title": "decor",
        "options": ['wall', 'floor'],
        "display": noDecor,
        "code": /*html*/ `
        <div class="row m-0 p-0 pb-2">
            <div class="col-3 m-0 p-0">
                <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                    <div class="card border-0 pb-2">wall</div>
                    <div  id="decorWallColorPicker" class="m-0 p-0"></div>
                </div>
            </div>
            <div class="col-1 m-0 p-0">
            </div>
            <div class="col-3 m-0 p-0">
                <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                    <div class="card border-0 pb-2">floor</div>
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

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));