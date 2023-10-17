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

function downloadPdf(model, mainImage, output) {
    let link = 'https://pastoe-dock.web.app?data=' + encodeURIComponent(JSON.stringify(model));
    //let drawing;
    //let svgWidth;
    let height = 77;
    let width = model.longitude;
    let depth = 90;
    //if (model.height == 144 && model.supplement == 'noSupplement') {
    //    drawing = '<svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" width="106.85mm" height="112.74mm" viewBox="0 0 302.88 319.59"><g id="Laag_1"><rect x="5.66" y="126.21" width="179.15" height="181.42" style="fill:#fff;"/><path d="m184.95,307.77H5.52V126.07h179.43v181.7Zm-179.15-.28h178.87V126.36H5.8v181.13Z"/><path d="m182.69,308.91H5.52v-2.55h177.16v2.55Zm-176.88-.28h176.6v-1.99H5.8v1.99Z" style="fill:#231f20;"/><path d="m182.69,178.51H5.52v-2.55h177.16v2.55Zm-176.88-.28h176.6v-1.98H5.8v1.98Z" style="fill:#231f20;"/><path d="m182.69,218.2H5.52v-2.55h177.16v2.55Zm-176.88-.28h176.6v-1.99H5.8v1.99Z" style="fill:#231f20;"/><path d="m182.69,269.22H5.52v-2.55h177.16v2.55Zm-176.88-.28h176.6v-1.98H5.8v1.98Z" style="fill:#231f20;"/><path d="m95.38,306.64h-2.55v-37.7h2.55v37.7Zm-2.27-.28h1.98v-37.13h-1.98v37.13Z" style="fill:#231f20;"/><path d="m140.73,266.96h-2.55v-49.04h2.55v49.04Zm-2.27-.28h1.98v-48.47h-1.98v48.47Z" style="fill:#231f20;"/><path d="m50.02,266.95h-2.55v-49.04h2.55v49.04Zm-2.27-.28h1.98v-48.47h-1.98v48.47Z" style="fill:#231f20;"/><path d="m95.38,215.93h-2.55v-37.7h2.55v37.7Zm-2.27-.28h1.98v-37.13h-1.98v37.13Z" style="fill:#231f20;"/><path d="m140.73,176.25h-2.55v-49.04h2.55v49.04Zm-2.27-.28h1.98v-48.47h-1.98v48.47Z" style="fill:#231f20;"/><path d="m50.02,176.25h-2.55v-49.04h2.55v49.04Zm-2.27-.28h1.98v-48.47h-1.98v48.47Z" style="fill:#231f20;"/><path d="m182.69,127.49H5.52v-2.55h177.16v2.55Zm-176.88-.28h176.6v-1.99H5.8v1.99Z" style="fill:#231f20;"/><rect x="3.4" y="126.21" width="2.27" height="181.42" style="fill:#fff;"/><path d="m5.8,307.77h-2.55V126.07h2.55v181.7Zm-2.27-.28h1.98V126.35h-1.98v181.13Z"/><rect x="182.54" y="126.21" width="2.27" height="181.42" style="fill:#fff;"/><path d="m184.95,307.77h-2.55V126.07h2.55v181.7Zm-2.27-.28h1.98V126.35h-1.98v181.13Z"/><rect x=".28" y="114.87" width="3.12" height="204.09" style="fill:#fff;"/><path d="m3.54,319.11H.13V114.73h3.4v204.38Zm-3.12-.28h2.83V115.02H.42v203.81Z"/><rect x="3.4" y="307.63" width="181.42" height="11.34" style="fill:#fff;"/><path d="m184.95,319.11H3.25v-11.62h181.7v11.62Zm-181.42-.28h181.13v-11.05H3.54v11.05Z"/><rect x="184.81" y="114.87" width="3.12" height="204.09" style="fill:#fff;"/><path d="m188.07,319.11h-3.4V114.73h3.4v204.38Zm-3.12-.28h2.83V115.02h-2.83v203.81Z"/><rect x="3.4" y="114.87" width="181.42" height="11.34" style="fill:#fff;"/><path d="m184.95,126.35H3.25v-11.62h181.7v11.62Zm-181.42-.28h181.13v-11.06H3.54v11.06Z"/><path d="m302.88,319.59h-64.06V115.21h64.06v204.38Zm-63.78-.28h63.5V115.5h-63.5v203.81Z" style="fill:#231f20;"/><path d="m184.96,64.06H3.26V0h181.7v64.06Zm-181.42-.28h181.13V.28H3.54v63.5Z" style="fill:#231f20;"/><path d="m188.07,64.06h-3.4V0h3.4v64.06Zm-3.12-.28h2.83V.28h-2.83v63.5Z" style="fill:#231f20;"/><path d="m3.4,64.06H0V0h3.4v64.06Zm-3.12-.28h2.83V.28H.28v63.5Z" style="fill:#231f20;"/></g></svg>';
    //    svgWidth = 106.85 * 2;
    //}
    var docDefinition = {
        pageSize: 'A4',
        pageOrientation: 'portrait',
        pageMargins: [30, 30, 30, 30],
        defaultStyle: {
            font: 'RobotoDefault'
        },

        content: [
            { image: `${mainImage}`, width: 210, absolutePosition: { x: 356, y: 30 } },
            { qr: `${link}`, fit: 100, absolutePosition: { x: 240, y: 30 } },
            { text: `DOCK`, fontSize: 36, absolutePosition: { x: 28, y: 22 } },
            {
                layout: 'noBorders',
                table: {
                    headerRows: 0,
                    widths: [100, 'auto'],
                    body: [
                        [{ text: 'COMBINATION', bold: true, fontSize: 12 }, ` `],
                        [{ text: 'CONFIGURATOR', bold: true, fontSize: 12 }, { text: `my dock`, link: `${link}` }],
                        [{ text: 'PRICE (INCL VAT)', bold: true, fontSize: 12 }, document.getElementById('price').textContent]
                    ]
                }, margin: [0, 90, 0, 0]
            },
            {
                canvas: [{
                    type: 'line',
                    x1: 0, y1: 0,
                    x2: 536, y2: 0,
                    lineWidth: 0.2
                }], margin: [0, 100, 0, 0]
            },
            { text: 'MEASUREMENT / FUNCTIONS', bold: true, fontSize: 12, margin: [0, 15, 0, 5] },
            {
                layout: 'noBorders',
                table: {
                    headerRows: 0,
                    widths: [60, 'auto'],
                    body: [
                        [{ text: 'height', fontSize: 9 }, { text: `${height}`, fontSize: 9 }],
                        [{ text: 'width', fontSize: 9 }, { text: `${width}`, fontSize: 9 }],
                        [{ text: 'depth', fontSize: 9 }, { text: `${depth}`, fontSize: 9 }]
                    ]
                }, margin: [0, 5, 0, 10]
            },
            /*
            {
                svg: `${drawing}`,
                width: `${svgWidth}`
            },
            {
                canvas: [{
                    type: 'line',
                    x1: 0, y1: 0,
                    x2: 536, y2: 0,
                    lineWidth: 0.2
                }], margin: [0, 15, 0, 0]
            },
            */
            { text: 'COLOR', bold: true, fontSize: 12, margin: [0, 15, 0, 5] },
            {
                layout: 'noBorders',
                table: {
                    headerRows: 0,
                    widths: [60, 'auto'],
                    body: [
                        [{ text: 'table top', fontSize: 9 }, { text: `${model.generalColor.code} ${model.generalColor.name}`, fontSize: 9 }],
                        [{ text: 'legs', fontSize: 9 }, { text: `${model.generalColor.code} ${model.generalColor.name}`, fontSize: 9 }],
                        [{ text: 'accents', fontSize: 9 }, { text: `${model.accentColor.code} ${model.accentColor.name}`, fontSize: 9 }]
                    ]
                }
            },
            {
                canvas: [{
                    type: 'line',
                    x1: 0, y1: 0,
                    x2: 536, y2: 0,
                    lineWidth: 0.2
                }], margin: [0, 15, 0, 0]
            },
            {
                columns: [
                    {
                        width: 240,
                        alignment: 'left',
                        text: 'This price is carefully put together by Pastoe. However, omissions and mistakes are possible and each of our products have specific additional requirements not included in this price. The final price of a Pastoe product will set by our local dealer, based on the drawing approved by the customer and on a specific proposal from Pastoe. The prices in this tool are for general reference only and are the suggested retail prices. \n\n This order is created with the furnitise configurator version: 1.1', fontSize: 8
                    },
                    {
                        width: '*',
                        alignment: 'right',
                        svg: '<svg viewBox="0 0 197.4 57.2"><path class="st0" d="m20.9 19.4c-1.2-1.5-2.9-2.7-5.4-2.7-6.3 0-7.6 5.9-7.6 10.8 0 4.8 1.3 10.7 7.6 10.7 2.5 0 4.2-1.2 5.4-2.7 1.6-2.2 2.1-5.2 2.1-8s-0.4-5.9-2.1-8.1m4.3 22.9c-2 1.6-4.8 2.7-8.1 2.7-4 0-7.2-1.4-8.7-3.3v15.2h-8v-46h6.9l0.5 3.7c2-3.1 5.7-4.4 9.3-4.4 3.3 0 6 1.2 8 2.8 4 3.3 5.9 8.3 5.9 14.5 0.2 6.5-1.9 11.6-5.8 14.8m32-12.9-8.5 0.6c-2.5 0.2-4.8 1.6-4.8 4.4 0 2.6 2.3 4.2 4.8 4.2 5 0 8.5-2.7 8.5-7.6v-1.6zm6.7 15.3c-3.5 0-5.4-2.2-5.7-4.7-1.6 2.7-5.4 5-10.1 5-8 0-12.1-5-12.1-10.4 0-6.3 4.9-10 11.3-10.4l9.8-0.7v-2c0-3.1-1.1-5.3-5.7-5.3-3.8 0-5.9 1.6-6.1 4.8h-7.8c0.5-7.5 6.4-10.8 13.8-10.8 5.7 0 10.6 1.8 12.5 6.8 0.8 2.1 1 4.5 1 6.8v12.3c0 1.6 0.5 2.1 1.8 2.1 0.5 0 1-0.1 1-0.1v5.9c-1 0.4-1.8 0.7-3.7 0.7m34-3.5c-2.7 2.7-6.9 3.8-11.4 3.8-4.2 0-8-1.2-10.8-3.8-1.9-1.8-3.5-4.6-3.5-7.8h7.5c0 1.5 0.8 3.1 1.8 3.9 1.3 1 2.7 1.5 5 1.5 2.7 0 6.8-0.5 6.8-4.2 0-1.9-1.3-3.2-3.3-3.5-2.9-0.5-6.3-0.6-9.2-1.3-4.6-1-7.6-4.7-7.6-8.9 0-3.4 1.4-5.8 3.4-7.5 2.5-2.1 5.9-3.3 10.1-3.3 4 0 8 1.3 10.4 3.9 1.8 1.9 2.9 4.4 2.9 6.9h-7.6c0-1.3-0.5-2.3-1.4-3.1-1-1-2.7-1.6-4.4-1.6-1.2 0-2.3 0-3.5 0.5-1.4 0.5-2.6 1.8-2.6 3.5 0 2.4 2 3.1 3.8 3.3 3 0.4 3.8 0.5 7.1 1 5.3 0.8 9.1 4.2 9.1 9.4 0.2 3.2-0.9 5.6-2.6 7.3m22.1 3.5c-6.8 0-10.1-3.8-10.1-10.2v-17h-6.1v-6.6h6.1v-8.5l8-2v10.4h8.4v6.6h-8.4v16.3c0 2.6 1.2 3.7 3.7 3.7 1.6 0 3-0.1 5.2-0.3v6.8c-2.3 0.4-4.5 0.8-6.8 0.8m31.3-25.5c-1.1-1.2-2.9-2.1-5-2.1s-4 1-5 2.1c-1.9 2.1-2.4 5.3-2.4 8.4s0.5 6.3 2.4 8.4c1.1 1.2 2.9 2.1 5 2.1s4-1 5-2.1c1.9-2.1 2.4-5.3 2.4-8.4 0-3.2-0.5-6.3-2.4-8.4m6.6 20.6c-2.3 2.8-6.6 5.2-11.7 5.2-5 0-9.3-2.4-11.7-5.2-2.5-3.1-3.9-6.7-3.9-12.3 0-5.7 1.4-9.1 3.9-12.3 2.3-2.8 6.6-5.2 11.7-5.2 5 0 9.3 2.4 11.7 5.2 2.5 3.1 3.9 6.7 3.9 12.3 0 5.7-1.4 9.2-3.9 12.3m29.7-21.5c-1.1-1.2-2.7-1.9-5-1.9-2.5 0-4.4 1-5.6 2.6-1.2 1.5-1.7 3-1.7 5.2h14.4c-0.1-2.5-0.8-4.4-2.1-5.9m9.4 11.7h-22.3c-0.1 2.6 0.8 5 2.5 6.5 1.2 1.1 2.7 2 4.9 2 2.3 0 3.8-0.5 4.8-1.6 0.7-0.7 1.3-1.6 1.6-2.8h7.7c-0.2 2-1.6 4.6-2.8 6.1-2.8 3.3-7 4.7-11.2 4.7-4.6 0-7.9-1.6-10.5-4.1-3.3-3.2-5.1-7.9-5.1-13.3 0-5.3 1.6-10.1 4.8-13.4 2.5-2.6 6.1-4.2 10.6-4.2 4.9 0 9.4 2 12.2 6.1 2.5 3.7 3 7.4 2.9 11.6-0.1 0.2-0.1 1.7-0.1 2.4"/></svg>', width: 100, margin: [0, 0, 0, 0]
                    },
                ],
                columnGap: 196,
                margin: [0, 15, 0, 0]
            }
        ]
    }
    pdfMake.fonts = {
        RobotoDefault: {
            normal: 'https://pastoe-dock.web.app/fonts/Roboto-Light.ttf',
            bold: 'https://pastoe-dock.web.app/fonts/Roboto-Medium.ttf'
            //italics: 'https://pastoe-dock.web.app/fonts/Roboto-Light.ttf',
            //bold: 'https://pastoe-dock.web.app/fonts/Roboto-Light.ttf',
        },
    }
    if (output == 'download') {
        pdfMake.createPdf(docDefinition).download('dock');
    }
    if (output == 'base64') {
        pdfMake.createPdf(docDefinition).getBase64((data) => {
            //console.log(data);
        });
    }
}

// used by FromUnityToJavascript.jslib
async function uploadRenderTexture(blob, medium) {
    const result = await blobToBase64(blob);
    if (medium == 'pdf') {
        downloadPdf(FEATUREDMODEL, result, 'download');
    }
    if (medium == 'httprequest') {
        downloadPdf(FEATUREDMODEL, result, 'base64');
    }
    if (medium == 'quote') {
        var quoteRenderTexture = document.getElementById('quoteRenderTexture');
        quoteRenderTexture.src = result;
    }
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
        widthForImage: FEATUREDMODEL.longitude,
        heightForImage: 77,
        depthForImage: 90
    };
    UNITY_INSTANCE.SendMessage('Dock', 'SaveRenderTexture', JSON.stringify(renderTexture));
}

function submitForm() {
    var quoteModal = new bootstrap.Modal(document.getElementById('getQuoteModal'), {});
    var quoteModalSucces = new bootstrap.Modal(document.getElementById('getQuoteModalSucces'), {});

    var xhr = new XMLHttpRequest();
    var formEl = document.forms.requestQuote;
    var formData = new FormData(formEl);
    var pdf = generateRenderTexture('httprequest');

    //formData.append("email", `${formData.get("email")}`);
    //formData.append("address", `${formData.get("address")}`);
    //formData.append("postalCode", `${formData.get("postalCode")}`);
    //formData.append("city", `${formData.get("city")}`);
    //formData.append("country", `${formData.get("country")}`);
    //formData.append("phone", `${formData.get("phone")}`);
    //formData.append("remarks", `${formData.get("remarks")}`);

    formData.append("price", document.getElementById('price').textContent);
    formData.append("articleList", JSON.stringify(FEATUREDMODEL.articleList));
    formData.append("pdf", pdf);

    for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }

    xhr.open('POST', 'https://pastoeportal.com/furnitise/quote')
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(formData);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            formEl.reset(); //reset form after AJAX success.
        }
    }
    quoteModalSucces.show();
    // does not work...
    quoteModal.hide();
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
    UNITY_INSTANCE.SendMessage('Dock', 'AddDecor', JSON.stringify(decor));
}

function toggleDecor(toggle) {
    UNITY_INSTANCE.SendMessage('Dock', 'ToggleDecor', toggle);
}

function updateFeaturedModel(model) {
    UNITY_INSTANCE.SendMessage('Dock', 'SetDock', JSON.stringify(model));
}

function updateCamera(modelWidth, modelHeight) {
    var size = {
        width: modelWidth,
        height: modelHeight
    };
    UNITY_INSTANCE.SendMessage('Dock', 'SetFLCamera', JSON.stringify(size));
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

    //decor wall
    const decorWallValue = document.querySelectorAll('.decorWallColors_colorButton');

    decorWallValue.forEach(item => item.addEventListener('click', () => {
        decorWallValue.forEach(item => { item.classList.remove('colorButtonActive') });
        const decorWallId = item.id.split('_');
        DECORWALLINDEX = decorWallId[1];
        updateControlPanel(model, 'decor');
        showSelected();
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
        showSelected();
    }));
    document.getElementById('floorText').innerHTML = '<img src="https://' + window.location.host + '/' + ALLCOLORS.decorFloor[DECORFLOORINDEX].colorPathThumb + '" class="rounded-pill shadow" style="width: calc(1rem + 1vw);">';
    document.getElementById('decorFloorColorsIndex_' + DECORFLOORINDEX).classList.remove('colorButton');
    document.getElementById('decorFloorColorsIndex_' + DECORFLOORINDEX).classList.add('colorButtonActive');

    //size
    document.getElementById(model.longitude).checked = true;

    const sizeValues = document.querySelectorAll('input[type=radio][name="size"]');
    for (const sizeValue of sizeValues) {
        sizeValue.onclick = (size) => {

            model.longitude = size.target.id;

            updateCamera(model.longitude, 77);
            updateControlPanel(model, 'size');
            updateFeaturedModel(model);
            showSelected();
        }
    }
    document.getElementById('sizeText').textContent = document.getElementById(model.longitude).value;

    //generalColor
    const generalColor = model.generalColor.color;
    var generalColorIndex = ALLCOLORS.generalColors.findIndex(item => item.colorHex === generalColor);
    var generalColorValue = document.querySelectorAll('.generalColors_colorButton');

    if (parser.getDevice().type != 'mobile' && parser.getDevice().type != 'tablet') {
        generalColorValue.forEach(item => item.addEventListener('mouseover', () => {
            document.getElementById('generalColorsText').style.visibility = 'visible';
            document.getElementById('generalColorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: ' + document.getElementById(item.id).style.backgroundColor + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + document.getElementById(item.id).alt + '';
            document.getElementById('generalColorsText').classList.add('fst-italic');
            showSelected(true);
        }));

        generalColorValue.forEach(item => item.addEventListener('mouseout', () => {
            document.getElementById('generalColorsText').style.visibility = 'hidden';
            document.getElementById('generalColorsText').innerHTML = '<img src="https://' + window.location.host + '/' + ALLCOLORS.generalColors[generalColorIndex].colorPathThumb + '" class="rounded-pill shadow" style="width: calc(1rem + 1vw);">&nbsp;&nbsp;&nbsp;&nbsp;' + model.generalColor.name;
            document.getElementById('generalColorsText').classList.remove('fst-italic');
            showSelected(true);
        }));
    }

    generalColorValue.forEach(item => item.addEventListener('click', () => {
        generalColorValue.forEach(item => { item.classList.remove('colorButtonActive') });
        const generalColorId = item.id.split('_');
        generalColorIndex = generalColorId[1];

        model.generalColor = { "color": ALLCOLORS.generalColors[generalColorIndex].colorHex, "path": ALLCOLORS.generalColors[generalColorIndex].colorPath };

        updateControlPanel(model, 'generalColors');
        updateFeaturedModel(model);
        showSelected(true);
    }));
    model.generalColor.code = ALLCOLORS.generalColors[generalColorIndex].colorCode;
    model.generalColor.name = ALLCOLORS.generalColors[generalColorIndex].colorName;
    document.getElementById('generalColorsText').innerHTML = '<img src="https://' + window.location.host + '/' + ALLCOLORS.generalColors[generalColorIndex].colorPathThumb + '" class="rounded-pill shadow" style="width: calc(1rem + 1vw);">&nbsp;&nbsp;&nbsp;&nbsp;' + model.generalColor.name;
    document.getElementById('generalColorsIndex_' + generalColorIndex).classList.remove('colorButton');
    document.getElementById('generalColorsIndex_' + generalColorIndex).classList.add('colorButtonActive');

    //accentColor
    const accentColor = model.accentColor.color;
    var accentColorIndex = ALLCOLORS.accentColors.findIndex((item) => item.colorHex === accentColor);
    var accentColorValue = document.querySelectorAll('.accentColors_colorButton');

    if (parser.getDevice().type != 'mobile' && parser.getDevice().type != 'tablet') {
        accentColorValue.forEach(item => item.addEventListener('mouseover', () => {
            document.getElementById('accentColorsText').style.visibility = 'visible';
            document.getElementById('accentColorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: ' + document.getElementById(item.id).style.backgroundColor + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + document.getElementById(item.id).alt + '';
            document.getElementById('accentColorsText').classList.add('fst-italic');
            showSelected(true);
        }));

        accentColorValue.forEach(item => item.addEventListener('mouseout', () => {
            document.getElementById('accentColorsText').style.visibility = 'hidden';
            document.getElementById('accentColorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: #' + model.accentColor.color + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + model.accentColor.name;
            document.getElementById('accentColorsText').classList.remove('fst-italic');
            showSelected(true);
        }));
    }

    accentColorValue.forEach(item => item.addEventListener('click', () => {
        accentColorValue.forEach(item => { item.classList.remove('colorButtonActive') });
        const accentColorId = item.id.split('_');
        accentColorIndex = accentColorId[1];

        model.accentColor = { "color": ALLCOLORS.accentColors[accentColorIndex].colorHex, "lacquer": "structure" };

        updateControlPanel(model, 'accentColors');
        updateFeaturedModel(model);
        showSelected(true);
    }));
    model.accentColor.code = ALLCOLORS.accentColors[accentColorIndex].colorCode.structure;
    model.accentColor.name = ALLCOLORS.accentColors[accentColorIndex].colorName;
    document.getElementById('accentColorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: #' + model.accentColor.color + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + model.accentColor.name;
    document.getElementById('accentColorsIndex_' + accentColorIndex).classList.remove('colorButton');
    document.getElementById('accentColorsIndex_' + accentColorIndex).classList.add('colorButtonActive');

     //price & articleList
     const articleList = [];
     Object.assign(model, { articleList: {} });

     let dockBodyPrice;
     let dockBodyReducedPrice;

     let dockBodyIndex = ALLCOMPONENTS.dock.body.findIndex(item => model.longitude == item.longitude);

     //body
     let combinationDockIndex = ALLCOMPONENTS.dock.combination.findIndex(item => model.longitude == item.longitude && model.generalColor.color == item.generalColor.color && model.accentColor.color == item.accentColor.color);
     if (combinationDockIndex != -1) {
         dockBodyPrice = ALLCOMPONENTS.dock.combination[combinationDockIndex].price.original;
         dockBodyReducedPrice = ALLCOMPONENTS.dock.combination[combinationDockIndex].price.reduced;
     } else {
             dockBodyPrice = ALLCOMPONENTS.dock.body[dockBodyIndex].price;
     }
     model.articleList.body = { "code": ALLCOMPONENTS.dock.body[dockBodyIndex].code, "generalColor": model.generalColor.code, "accentColor": model.accentColor.code };

     let dockPrice = dockBodyPrice;
     let dockReducedPrice = dockBodyReducedPrice;
     if (dockBodyReducedPrice != undefined) {
         document.getElementById('price').textContent = 'EURO ' + dockReducedPrice + ',-';
         document.getElementById('name').textContent = ALLCOMPONENTS.dock.combination[combinationDockIndex].name;
     }
     else {
         document.getElementById('price').textContent = 'EURO ' + dockPrice + ',-';
         document.getElementById('name').textContent = null;
     }

    // Decor
    addDecor("dock", model.longitude, 77, 90, 0, 0, ALLCOLORS.decorWall[DECORWALLINDEX].colorHex, ALLCOLORS.decorWall[DECORWALLINDEX].colorPath, ALLCOLORS.decorFloor[DECORFLOORINDEX].colorHex, ALLCOLORS.decorFloor[DECORFLOORINDEX].colorPath);

    // is global FEATUREDMODEL for pdf really necessary?
    FEATUREDMODEL = model;
    console.log(model);
}

function showFeaturedModel(model) {
    updateCamera(model.longitude, 77);
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
    const modelPromise = fetch(`projects/${brand}-${product}/models.json`).then(response => response.json());
    const colorsPromise = fetch(`projects/${brand}-${product}/colors.json`).then(response => response.json());
    const componentsPromise = fetch(`projects/${brand}-${product}/components.json`).then(response => response.json());
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

function initSettings(model) {
    const accordions = {};
    let noSize;
    if (urlParams.has('noSize')) {
        noSize = "d-none";
    } else {
        noSize = "d-block";
    }
    let noDecor;
    if (parser.getDevice().type == 'mobile' || urlParams.has('noDecor')) {
        noDecor = "d-none";
    } else {
        noDecor = "d-block";
    }
    accordions.size = {
        "title": "size",
        "options": ['size'],
        "display": noSize,
        "code": /*html*/ `
    <div class="row m-0 p-0 pb-2">
        <div class="d-flex justify-content-start m-0 p-0">
            <div class="card border-0">
                <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                    <input type="radio" class="form-check-input" name="size" value="188 x 90" id="188">
                    <label class="form-check-label" for="188">188 x 90</label>
                 </div>
                <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                    <input type="radio" class="form-check-input" name="size" value="204 x 90" id="204">
                    <label class="form-check-label" for="204">204 x 90</label> 
                </div>
                <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                    <input type="radio" class="form-check-input" name="size" value="236 x 90" id="236">
                    <label class="form-check-label" for="236">236 x 90</label>
                </div>
            </div>
    </div> `
    }
    accordions.generalColors = {
        "title": "veneer type",
        "options": ['generalColors'],
        "display": "block",
        "code": /*html*/ `
        <div class="row m-0 p-0 pb-2">
            <div class="col-3 m-0 p-0">
                <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                    <div  id="generalColorsTexturePicker" class="m-0 p-0"></div>
                </div>
            </div>
        </div>`,
        "onload": function () {
            let containerElemGeneralColors = document.getElementById("generalColorsTexturePicker");
            addTextures('generalColors', ALLCOLORS.generalColors, containerElemGeneralColors);
        }
    }
    accordions.accentColors = {
        "title": "accent color",
        "options": ['accentColors'],
        "display": "block",
        "code": /*html*/ `
        <div class="row m-0 p-0 pb-2">
        <div class="col-5 m-0 p-0">
            <div class="row m-0 p-0 pb-2">
                <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                        <div class="card border-0 pb-2">structure</div>
                    <div id="accentColorsColorPicker" class="m-0 p-0"></div>
                </div>
            </div>
        </div>
    </div>`,
        "onload": function () {
            let containerElemAccentColors = document.getElementById("accentColorsColorPicker");
            addColors('accentColors', ALLCOLORS.accentColors, containerElemAccentColors);
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