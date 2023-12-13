"use strict";

const brand = "pastoe";
const product = "l-maze";
const title = "l-maze";

var UNITY_INSTANCE;
var ALLCOLORS;
var ALLCOMPONENTS;

var loader = document.createElement('script');
loader.src = `https://${brand}-${product}.web.app/projects/${brand}-${product}/Build/${brand}-${product}.loader.js`;
document.head.appendChild(loader);

var pricing = document.createElement('script');
pricing.src = `https://${brand}-${product}.web.app/projects/${brand}-${product}/pricing.js`;
document.head.appendChild(pricing);

function generateRenderTexture(medium, model) {
    const renderTexture = {
        medium: medium,
        angleName: "perspective",
        widthForImage: model.width,
        heightForImage: model.height,
        depthForImage: 54
    };
    UNITY_INSTANCE.SendMessage('LSerieMaze', 'SaveRenderTexture', JSON.stringify(renderTexture));
}

// used by FromUnityToJavascript.jslib
async function uploadRenderTexture(blob, medium, fileName) {
    const result = await blobToBase64(blob);
    const img = document.querySelector('.productRender');

    img.src = result;
    img.title = fileName;
}

function blobToBase64(blob) {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
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
    UNITY_INSTANCE.SendMessage('LSerieMaze', 'AddDecor', JSON.stringify(decor));
}

function showSearchImages(modelFromSearch) {
    document.getElementById('searchTitle').textContent = '';

    let randomColorGroupIndex = Math.floor(Math.random() * modelFromSearch.color.length);
    let attemptsForColor = 0;
    const maxAttemptsForColor = modelFromSearch.color.length;
    const chosenColors = [];
    let randomColor;

    while (attemptsForColor < maxAttemptsForColor) {
        if (!chosenColors.includes(randomColorGroupIndex)) {
            let colorGroup = ALLCOLORS.colors.filter(color => color.colorGroup === modelFromSearch.color[randomColorGroupIndex]);

            if (colorGroup.length > 0) {
                chosenColors.push(randomColorGroupIndex);

                const randomColorInGroupIndex = Math.floor(Math.random() * colorGroup.length);
                const randomColorGroup = colorGroup[randomColorInGroupIndex].colorHex;
                randomColor;
                if (colorGroup[randomColorInGroupIndex].colorPath) {
                    randomColor = {
                        color: randomColorGroup,
                        path: `https://${brand}-${product}.web.app/${colorGroup[randomColorInGroupIndex].colorPath}`,
                        lacquer: "veneer"
                    };
                } else {
                    const nonVeneerColors = colorGroup.filter(color => !color.colorPath);
                    if (nonVeneerColors.length > 0) {
                        const randomColorIndex = Math.floor(Math.random() * nonVeneerColors.length);
                        const randomNonVeneerColor = nonVeneerColors[randomColorIndex];
                        randomColor = {
                            color: randomNonVeneerColor.colorHex,
                            lacquer: "basic"
                        };
                    }
                }

                console.log("Chosen Color:", randomColor);

                break;
            }
        }

        randomColorGroupIndex = (randomColorGroupIndex + 1) % modelFromSearch.color.length;
        attemptsForColor++;

        if (attemptsForColor === modelFromSearch.color.length) {
            console.log("No colors available in any color group.");
            document.getElementById('searchTitle').textContent = 'No products available in the choosen color(s)';
            break;
        }
    }

    // get random height
    const heights = [144, 208];
    const randomHeightIndex = Math.floor(Math.random() * heights.length);
    const randomHeight = heights[randomHeightIndex];

    // get random supplement
    const supplements = ["noSupplement", "doorset", "drawerset", "doorDrawerDoor"];
    const randomSupplementIndex = Math.floor(Math.random() * supplements.length);
    const randomSupplement = supplements[randomSupplementIndex];

    // get random interiorColor
    const interiorColorsLength = Math.floor(Math.random() * ALLCOLORS.colors.length);
    const randomInteriorColorHex = ALLCOLORS.colors[interiorColorsLength].colorHex;

    // get random handleColor
    const handleColors = ["020307", "b2b2b2"];
    const randomHandleColorIndex = Math.floor(Math.random() * handleColors.length);
    const randomHandleColor = handleColors[randomHandleColorIndex];

    const model = {
        background: { original: "d4d4d4" },
        width: 133,
        height: randomHeight,
        depth: 36,
        supplement: randomSupplement,
        color: randomColor,
        interiorColor: { color: randomInteriorColorHex, lacquer: "structure" },
        handleColor: { color: randomHandleColor }
    }
    UNITY_INSTANCE.SendMessage('LSerieMaze', 'SetLSerieMaze', JSON.stringify(model));

    const btn = document.querySelector('.goToConfigurator');

    btn.addEventListener('click', (e) => {
        furnitiseModal(`${brand}-${product}.web.app?noDecor&noFeaturedModels&data=${encodeURIComponent(JSON.stringify(model))}`);
    });

    generateRenderTexture('search', model);

    document.querySelector('.productInfoBrand').src = `https://${brand}-${product}.web.app/img/logo_${brand}.svg`;
    document.querySelector('.productInfoFamily').textContent = title;
    document.querySelector('.productInfoType').textContent = model.supplement.replace(/([A-Z])([0-9])/g, '$1 $2').replace(/([a-z])([A-Z])/g, '$1 $2');
    pricing(model);
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
}