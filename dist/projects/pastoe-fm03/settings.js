"use strict"
var UNITY_INSTANCE;
var ALLMODELS;
var ALLCOLORS;
var FEATUREDMODEL;
var FEATUREDMODELINDEX;

function updateFeaturedModel(model) {
    UNITY_INSTANCE.SendMessage('Fm03', 'SetFm03', JSON.stringify(model));
}

function updateControlPanel(model, selectedLayer, expandedLayer) {
    const settings = initSettings(model);
    const elem = document.getElementById('controlpanelContainer');
    if (selectedLayer !== undefined) {
        controlPanel_updateLayer(selectedLayer, settings);
    } else {
        controlPanel(settings, ALLMODELS, elem, expandedLayer);
    }

    //background
    if (model.background.lighter == undefined) {
        var bgColor = pSBC(0, '#' + model.background.original);
        model.background = { "original": model.background.original, "lighter": bgColor.substring(1) };
    }

    //fabricColor
    if (model.fabricColor != undefined) {
        const fabricColor = model.fabricColor;
        var fabricColorIndex = ALLCOLORS.fabricColors.findIndex(item => item.colorPath === fabricColor);

        var fabricColorValue = document.querySelectorAll('.fabricColors_colorButton');
        fabricColorValue.forEach(item => { item.classList.remove('colorButtonActive') });
        fabricColorValue.forEach(item => item.addEventListener('click', () => {
            const fabricColorId = item.id.split('_');
            fabricColorIndex = fabricColorId[1];

            model.fabricColor = ALLCOLORS.fabricColors[fabricColorIndex].colorPath;
            document.getElementById('fabricColorsIndex_' + fabricColorIndex).classList.add('colorButtonActive');

            model.background = { "original": ALLCOLORS.fabricColors[fabricColorIndex].colorBg };

            updateControlPanel(model, 'fabricColors');
            updateFeaturedModel(model);
            showSelected();
        }));
            document.getElementById('fabricColorsText').innerHTML = '<img src="https://' + window.location.host + '/' + ALLCOLORS.fabricColors[fabricColorIndex].colorPathThumb + '" class="rounded-pill shadow" style="width: calc(1rem + 1vw);">';
            document.getElementById('fabricColorsIndex_' + fabricColorIndex).classList.remove('colorButton');
            document.getElementById('fabricColorsIndex_' + fabricColorIndex).classList.add('colorButtonActive');
    }

        //price
        if (ALLCOLORS.fabricColors[fabricColorIndex].colorBrand == "textaafoam") {
            document.getElementById('price').textContent = "EURO 850,-";
        } else {
            document.getElementById('price').textContent = "EURO 950,-";
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
            companyName: 'Furnitise',
            productName: product.charAt(0).toUpperCase() + product.slice(1),
            productVersion: '0.1',
        };

        const unityPromise = createUnityInstance(canvas, config, (progress) => {
            progressBar.style.width = 100 * progress + '%';
        });
        const modelPromise = fetch(`projects/${brand}-${product}/models.json`).then(response => response.json());
        const colorsPromise = fetch(`projects/${brand}-${product}/colors.json`).then(response => response.json());
        UNITY_INSTANCE = await unityPromise;
        ALLMODELS = await modelPromise;
        ALLCOLORS = await colorsPromise;

        loadingScreen();

        const urlParams = new URLSearchParams(window.location.search);

        let modelIndex;
        let modelId;

        if (urlParams.has('model')) {
            modelId = urlParams.get('model');
            modelIndex = ALLMODELS.findIndex((item) => item.id === modelId);
        } else {
            modelIndex = Math.floor(Math.random() * ALLMODELS.length);
            modelId = ALLMODELS[modelIndex].id;
        }
        showFeaturedModel(ALLMODELS[modelIndex]);
    }

    function initSettings(model) {
        const accordions = {};
        accordions.fabricColors = {
            "title": "fabrics",
            "options": ['fabricColors'],
            "code": /*html*/ `
        <div class="row m-0 p-0 pb-2">
            <div class="col-4 m-0 p-0">
                <div class="row m-0 p-0 pb-2">
                    <div  id="fabricColorsTexturePicker" class="m-0 p-0"></div>
                </div>
            </div>
        </div>`,
            "onload": function () {
                let containerElem = document.getElementById("fabricColorsTexturePicker");
                addTextures('fabricColors', ALLCOLORS.fabricColors, containerElem);
            }
        }
        return { accordions };
    }

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));