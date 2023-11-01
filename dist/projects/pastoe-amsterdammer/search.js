"use strict"
var UNITY_INSTANCE;
var ALLMODELS;
var ALLCOLORS;
var ALLCOMPONENTS;
var FEATUREDMODEL;

var DECORWALLINDEX = 0;
var DECORFLOORINDEX = 0;

const urlParams = new URLSearchParams(window.location.search);



function generateRenderTexture(medium, dataString) {
        const renderTexture = {
            medium: medium,
            angleName: "perspective",
            widthForImage: dataString.width,
            heightForImage: dataString.height,
            depthForImage: 37,

            searchType: dataString.type,
            searchWidth: dataString.width,
            searchHeight: dataString.height,
            searchWinerack: dataString.winerack,
            searchWinerackColor: dataString.winerackColor,
            searchShelves: dataString.shelves,
            searchInterior: dataString.interior,
            searchOutsideColor: dataString.outsideColor.color,
            searchInsideColor: dataString.insideColor.color,
            searchRollshutter: dataString.rollshutter
        };
        UNITY_INSTANCE.SendMessage('Amsterdammer', 'SaveRenderTextureForSearch', JSON.stringify(renderTexture));
}

// used by FromUnityToJavascript.jslib
async function uploadRenderTexture(blob, medium, fileName) {
    const imageContainer = document.getElementById('searchRenderTexture');

    const result = await blobToBase64(blob);
    const img = document.createElement('img');
    img.src = result;
    img.alt = fileName;
    img.style.height = 350 + 'px';

    imageContainer.appendChild(img);
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

function showSearchImages(string) {
    // get width and corresponding type
    const widths = [{ "width": 37, "type": "cabinet" }, { "width": 55, "type": "cabinet" }, { "width": 74, "type": "cabinet" }, { "width": 156, "type": "sideboard" }, { "width": 156, "type": "sideboardOnFrame" }, { "width": 156, "type": "sideboardOnFrameTV" }, { "width": 194, "type": "sideboard" }, { "width": 194, "type": "sideboardOnFrame" }];
    const filteredWidth = widths.filter(item => item.width <= string.width);
    
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
        const filteredHeight = height.filter(number => number <= string.height);
        if (filteredHeight.length === 0) {
            console.log('No valid numbers for width found');
        }
        const randomHeightLenght = Math.floor(Math.random() * filteredHeight.length);
        const randomHeight = filteredHeight[randomHeightLenght];

        // get random color in colorGroup
        const colorGroup = ALLCOLORS.outsideColors.filter(color => color.colorGroup === string.color);
        if (colorGroup.length === 0) {
            console.log("No colors in this colorGroup found");
        }
        const colorGroupLenght = Math.floor(Math.random() * colorGroup.length);
        const randomColorGroup = colorGroup[colorGroupLenght].colorHex;

        // get random insideColor
        const insideColorsLenght = Math.floor(Math.random() * ALLCOLORS.insideColors.length);
        const randomInsideColorHex = ALLCOLORS.insideColors[insideColorsLenght].colorHex;

        const dataString = {
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
        UNITY_INSTANCE.SendMessage('Amsterdammer', 'SetAmsterdammer', JSON.stringify(dataString));

        generateRenderTexture('search', dataString);
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
    UNITY_INSTANCE = await unityPromise;
    ALLCOLORS = await colorsPromise;
}