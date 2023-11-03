"use strict"
var UNITY_INSTANCE;
var ALLCOLORS;
var ALLCOMPONENTS;

function generateRenderTexture(medium, model) {
    const renderTexture = {
        medium: medium,
        angleName: "perspective",
        widthForImage: model.width,
        heightForImage: model.height,
        depthForImage: 37,

        searchType: model.type,
        searchWidth: model.width,
        searchHeight: model.height,
        searchWinerack: model.winerack,
        searchWinerackColor: model.winerackColor,
        searchShelves: model.shelves,
        searchInterior: model.interior,
        searchOutsideColor: model.outsideColor.color,
        searchInsideColor: model.insideColor.color,
        searchRollshutter: model.rollshutter
    };
    UNITY_INSTANCE.SendMessage('Amsterdammer', 'SaveRenderTextureForSearch', JSON.stringify(renderTexture));
}

// used by FromUnityToJavascript.jslib
async function uploadRenderTexture(blob, medium, fileName) {
    //const img = document.getElementById('searchRenderTextures');

    const result = await blobToBase64(blob);
    const img = document.getElementById('searchRenderTexture');

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
    UNITY_INSTANCE.SendMessage('Amsterdammer', 'AddDecor', JSON.stringify(decor));
}

function showSearchImages(modelFromSearch) {
    // get width and corresponding type
    const widths = [{ "width": 37, "type": "cabinet" }, { "width": 55, "type": "cabinet" }, { "width": 74, "type": "cabinet" }, { "width": 156, "type": "sideboard" }, { "width": 156, "type": "sideboardOnFrame" }, { "width": 156, "type": "sideboardOnFrameTV" }, { "width": 194, "type": "sideboard" }, { "width": 194, "type": "sideboardOnFrame" }];
    const filteredWidth = widths.filter(item => item.width <= modelFromSearch.width);

    if (filteredWidth.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredWidth.length);
        const randomItem = filteredWidth[randomIndex];
        const randomWidth = randomItem.width;
        const randomType = randomItem.type;

        // get height
        let height;
        if (randomType == "cabinet") {
            height = [170, 205, 221];
        } else if (randomType == "sideboard" || randomType == "sideboardOnFrame") {
            height = [75];
        } else if (randomType == "sideboardOnFrameTV") {
            height = [112];
        }
        const filteredHeight = height.filter(number => number <= modelFromSearch.height);
        if (filteredHeight.length === 0) {
            console.log('No valid numbers for width found');
        }
        const randomHeightLenght = Math.floor(Math.random() * filteredHeight.length);
        const randomHeight = filteredHeight[randomHeightLenght];

        // get random color in colorGroup
        const colorGroup = ALLCOLORS.outsideColors.filter(color => color.colorGroup === modelFromSearch.color);
        if (colorGroup.length === 0) {
            console.log("No colors in this colorGroup found");
        }
        const colorGroupLenght = Math.floor(Math.random() * colorGroup.length);
        const randomColorGroup = colorGroup[colorGroupLenght].colorHex;

        // get random insideColor
        const insideColorsLenght = Math.floor(Math.random() * ALLCOLORS.insideColors.length);
        const randomInsideColorHex = ALLCOLORS.insideColors[insideColorsLenght].colorHex;

        const model = {
            background: { original: "d4d4d4" },
            type: randomType,
            width: randomWidth,
            height: randomHeight,
            winerack: Math.random() < 0.5,
            winerackColor: "outsidecolor",
            shelves: 0,
            interior: "one",
            outsideColor: { color: randomColorGroup, lacquer: "basic" },
            insideColor: { color: randomInsideColorHex },
            rollshutter: Math.floor(Math.random() * 100)
        }

        UNITY_INSTANCE.SendMessage('Amsterdammer', 'SetAmsterdammer', JSON.stringify(model));

        const btn = document.getElementById('goToConfigurator');

        btn.addEventListener('click', (e) => {
            //window.location.href = `${document.referrer}?brand=${brand}&product=${product}&data=${encodeURIComponent(JSON.stringify(model))}`;
            window.location.href = `https://furnitise.nl?noDecor&noFeaturedModels&noType&brand=${brand}&product=${product}&data=${encodeURIComponent(JSON.stringify(model))}`;
        });
        document.getElementById('productBrand').src = `img/logo_${brand}.svg`;
        document.getElementById('productFamily').textContent = title;
        document.getElementById('productFamilyType').textContent = model.type.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
        pricing(model);

        generateRenderTexture('search', model);
    }
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
    const colorsPromise = fetch(`../projects/${brand}-${product}/colors.json`).then(response => response.json());
    const componentsPromise = fetch(`../projects/${brand}-${product}/components.json`).then(response => response.json());
    UNITY_INSTANCE = await unityPromise;
    ALLCOLORS = await colorsPromise;
    ALLCOMPONENTS = await componentsPromise;
}