"use strict"
var UNITY_INSTANCE;
var ALLMODELS;
var ALLCOLORS;
var FEATUREDMODEL;
var FEATUREDMODELINDEX;

const urlParams = new URLSearchParams(window.location.search);

function downloadPdf(model, mainImage) {
    let link = 'https://pastoe-wire.web.app?data=' + encodeURIComponent(JSON.stringify(model));
    let height;
    let width;
    let depth;
    let seatHeight;
    let frameColorIndex;
    let frameColorCode;
    let fabricColorIndex;
    let armrestColorIndex;
    frameColorIndex = ALLCOLORS.frameColors.findIndex((item) => item.colorHex == model.frameColor);
    frameColorCode = ALLCOLORS.frameColors[frameColorIndex].colorCode;
    if (model.cushion == true) {
        fabricColorIndex = ALLCOLORS.fabricColors.findIndex((item) => item.colorPath == model.fabricColor);
    }
    if (model.type == "KM05") {
        height = 57;
        width = 46;
        depth = 45;
        seatHeight = 46;
    }
    if (model.type == "KM06") {
        height = 76;
        width = 46;
        depth = 45;
        seatHeight = 64;
    }
    if (model.type == "KM07") {
        height = 87;
        width = 46;
        depth = 47;
        seatHeight = 75;
    }
    if (model.type == "SM05") {
        height = 82;
        width = 52;
        depth = 53;
        seatHeight = 45;
    }
    if (model.type == "FM06") {
        armrestColorIndex = ALLCOLORS.armrestColors.findIndex((item) => item.colorPath == model.armrestColor);
        height = 87;
        width = 70;
        depth = 73;
        seatHeight = 42;
    }

    var docDefinition = {
        pageSize: 'A4',
        pageOrientation: 'portrait',
        pageMargins: [30, 30, 30, 30],
        defaultStyle: {
            font: 'RobotoDefault'
        },
        watermark: { text: 'DEMOdemoDEMO', color: 'red', fontSize: 600, opacity: 0.75, bold: true, italics: false },
        /*
        // for footer only on last page you need 'pageMargins: [30, 30, 30, 150]' wich is not looking good
        footer: function (currentPage, pageCount) {
            if (currentPage == pageCount) {
                return [
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
                                svg: '<svg viewBox="0 0 197.4 57.2"><path class="st0" d="m20.9 19.4c-1.2-1.5-2.9-2.7-5.4-2.7-6.3 0-7.6 5.9-7.6 10.8 0 4.8 1.3 10.7 7.6 10.7 2.5 0 4.2-1.2 5.4-2.7 1.6-2.2 2.1-5.2 2.1-8s-0.4-5.9-2.1-8.1m4.3 22.9c-2 1.6-4.8 2.7-8.1 2.7-4 0-7.2-1.4-8.7-3.3v15.2h-8v-46h6.9l0.5 3.7c2-3.1 5.7-4.4 9.3-4.4 3.3 0 6 1.2 8 2.8 4 3.3 5.9 8.3 5.9 14.5 0.2 6.5-1.9 11.6-5.8 14.8m32-12.9-8.5 0.6c-2.5 0.2-4.8 1.6-4.8 4.4 0 2.6 2.3 4.2 4.8 4.2 5 0 8.5-2.7 8.5-7.6v-1.6zm6.7 15.3c-3.5 0-5.4-2.2-5.7-4.7-1.6 2.7-5.4 5-10.1 5-8 0-12.1-5-12.1-10.4 0-6.3 4.9-10 11.3-10.4l9.8-0.7v-2c0-3.1-1.1-5.3-5.7-5.3-3.8 0-5.9 1.6-6.1 4.8h-7.8c0.5-7.5 6.4-10.8 13.8-10.8 5.7 0 10.6 1.8 12.5 6.8 0.8 2.1 1 4.5 1 6.8v12.3c0 1.6 0.5 2.1 1.8 2.1 0.5 0 1-0.1 1-0.1v5.9c-1 0.4-1.8 0.7-3.7 0.7m34-3.5c-2.7 2.7-6.9 3.8-11.4 3.8-4.2 0-8-1.2-10.8-3.8-1.9-1.8-3.5-4.6-3.5-7.8h7.5c0 1.5 0.8 3.1 1.8 3.9 1.3 1 2.7 1.5 5 1.5 2.7 0 6.8-0.5 6.8-4.2 0-1.9-1.3-3.2-3.3-3.5-2.9-0.5-6.3-0.6-9.2-1.3-4.6-1-7.6-4.7-7.6-8.9 0-3.4 1.4-5.8 3.4-7.5 2.5-2.1 5.9-3.3 10.1-3.3 4 0 8 1.3 10.4 3.9 1.8 1.9 2.9 4.4 2.9 6.9h-7.6c0-1.3-0.5-2.3-1.4-3.1-1-1-2.7-1.6-4.4-1.6-1.2 0-2.3 0-3.5 0.5-1.4 0.5-2.6 1.8-2.6 3.5 0 2.4 2 3.1 3.8 3.3 3 0.4 3.8 0.5 7.1 1 5.3 0.8 9.1 4.2 9.1 9.4 0.2 3.2-0.9 5.6-2.6 7.3m22.1 3.5c-6.8 0-10.1-3.8-10.1-10.2v-17h-6.1v-6.6h6.1v-8.5l8-2v10.4h8.4v6.6h-8.4v16.3c0 2.6 1.2 3.7 3.7 3.7 1.6 0 3-0.1 5.2-0.3v6.8c-2.3 0.4-4.5 0.8-6.8 0.8m31.3-25.5c-1.1-1.2-2.9-2.1-5-2.1s-4 1-5 2.1c-1.9 2.1-2.4 5.3-2.4 8.4s0.5 6.3 2.4 8.4c1.1 1.2 2.9 2.1 5 2.1s4-1 5-2.1c1.9-2.1 2.4-5.3 2.4-8.4 0-3.2-0.5-6.3-2.4-8.4m6.6 20.6c-2.3 2.8-6.6 5.2-11.7 5.2-5 0-9.3-2.4-11.7-5.2-2.5-3.1-3.9-6.7-3.9-12.3 0-5.7 1.4-9.1 3.9-12.3 2.3-2.8 6.6-5.2 11.7-5.2 5 0 9.3 2.4 11.7 5.2 2.5 3.1 3.9 6.7 3.9 12.3 0 5.7-1.4 9.2-3.9 12.3m29.7-21.5c-1.1-1.2-2.7-1.9-5-1.9-2.5 0-4.4 1-5.6 2.6-1.2 1.5-1.7 3-1.7 5.2h14.4c-0.1-2.5-0.8-4.4-2.1-5.9m9.4 11.7h-22.3c-0.1 2.6 0.8 5 2.5 6.5 1.2 1.1 2.7 2 4.9 2 2.3 0 3.8-0.5 4.8-1.6 0.7-0.7 1.3-1.6 1.6-2.8h7.7c-0.2 2-1.6 4.6-2.8 6.1-2.8 3.3-7 4.7-11.2 4.7-4.6 0-7.9-1.6-10.5-4.1-3.3-3.2-5.1-7.9-5.1-13.3 0-5.3 1.6-10.1 4.8-13.4 2.5-2.6 6.1-4.2 10.6-4.2 4.9 0 9.4 2 12.2 6.1 2.5 3.7 3 7.4 2.9 11.6-0.1 0.2-0.1 1.7-0.1 2.4"/></svg>', width: 100, margin: [0, 60, 0, 0]
                            },
                        ],
                        columnGap: 200,
                        margin: [30, 30, 30, 0]
                    },
                ]
            }
        },
        */
       
        content: [
            { image: `${mainImage}`, width: 210, absolutePosition: { x: 356, y: 30 } },
            { qr: `${link}`, fit: 100, absolutePosition: { x: 240, y: 30 } },
            { text: `WIRE`, fontSize: 36, absolutePosition: { x: 28, y: 22 } },

            {
                layout: 'noBorders',
                table: {
                    headerRows: 0,
                    widths: [100, 'auto'],
                    body: [
                        [{ text: 'COMBINATION', bold: true, fontSize: 12 }, `${(document.getElementById('name').textContent) + ' ' + document.getElementById(model.type).value}`],
                        [{ text: 'CONFIGURATOR', bold: true, fontSize: 12 }, { text: `my wire`, link: `${link}` }],
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
                        [{ text: 'depth', fontSize: 9 }, { text: `${depth}`, fontSize: 9 }],
                        [{ text: 'seat height', fontSize: 9 }, { text: `${seatHeight}`, fontSize: 9 }]
                    ]
                }, margin: [0, 5, 0, 10]
            },

            {
                canvas: [{
                    type: 'line',
                    x1: 0, y1: 0,
                    x2: 536, y2: 0,
                    lineWidth: 0.2
                }], margin: [0, 15, 0, 0]
            },
            { text: 'COLOR', bold: true, fontSize: 12, margin: [0, 15, 0, 5] },
            
            {  
                layout: 'noBorders',
                table: {
                    headerRows: 0,
                    widths: [60, 'auto'],
                    body: [
                        [{ text: 'frame', fontSize: 9 }, { text: `${frameColorCode} ${ALLCOLORS.frameColors[frameColorIndex].colorName}`, fontSize: 9 }],
                        [{ text: `${(model.fabricColor !== undefined) ? 'fabric' : ''}`, fontSize: 9 }, { text: `${(model.fabricColor !== undefined) ? `${ALLCOLORS.fabricColors[fabricColorIndex].colorName}` : ''}`, fontSize: 9 }],
                        [{ text: `${(model.armrestColor !== undefined) ? 'armrests' : ''}`, fontSize: 9 }, { text: `${(model.armrestColor !== undefined) ? `${ALLCOLORS.armrestColors[armrestColorIndex].colorName}` : ''}`, fontSize: 9 }]  
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

            { text: 'OPTIONS', bold: true, fontSize: 12, margin: [0, 15, 0, 5] },
            {
                layout: 'noBorders',
                table: {
                    headerRows: 0,
                    widths: [60, 'auto'],
                    body: [
                        [{ text: 'cushion', fontSize: 9 }, { text: `${(model.cushion === true) ? 'yes' : 'no'}`, fontSize: 9 }],
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
            normal: 'https://pastoe-wire.web.app/fonts/Roboto-Light.ttf',
            bold: 'https://pastoe-wire.web.app/fonts/Roboto-Medium.ttf'
            //italics: 'https://pastoe-wire.web.app/fonts/Roboto-Light.ttf',
            //bold: 'https://pastoe-wire.web.app/fonts/Roboto-Light.ttf',
        },
    }
    pdfMake.createPdf(docDefinition).download('wire');
}

// used by FromUnityToJavascript.jslib
async function uploadRenderTexture(blob, medium) {
    const result = await blobToBase64(blob);
    if (medium == 'pdf') {
        downloadPdf(FEATUREDMODEL, result);
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
        widthForImage: 73,
        heightForImage: 87,
        depthForImage: 70
    };
    UNITY_INSTANCE.SendMessage('Wire', 'SaveRenderTexture', JSON.stringify(renderTexture));
}

function submitForm() {
    var xhr = new XMLHttpRequest();
    var formEl = document.forms.requestQuote;
    var formData = new FormData(formEl);
    var json = JSON.stringify(FEATUREDMODEL);

    formData.append("email", `${formData.get("email")}`);
    formData.append("address", `${formData.get("address")}`);
    formData.append("postalCode", `${formData.get("postalCode")}`);
    formData.append("city", `${formData.get("city")}`);
    formData.append("country", `${formData.get("country")}`);
    formData.append("phone", `${formData.get("phone")}`);
    formData.append("remarks", `${formData.get("remarks")}`);

    formData.append("model", json);

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
}

// used by FromUnityToJavascript.jslib
async function downloadModel(blob, fileName) {
    const result = await blobToBase64(blob);
    downloadModel(result);
}

function updateFeaturedModel(model) {
    UNITY_INSTANCE.SendMessage('Wire', 'SetWire', JSON.stringify(model));
}

function updateCamera(modelWidth, modelHeight) {
    var size = {
        width: modelWidth,
        height: modelHeight
    };
    UNITY_INSTANCE.SendMessage('Amsterdammer', 'SetFLCamera', JSON.stringify(size));
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

    //type
    document.getElementById(model.type).checked = true;

    const typeValues = document.querySelectorAll('input[type=radio][name="type"]');
    for (const typeValue of typeValues) {
        typeValue.onclick = (type) => {

            model.type = type.target.id;

            if (model.cushion == undefined) {
                model.cushion = true;
            }
            if (model.frameColor == undefined) {
                model.frameColor = "1f1f21";
            }
            if (model.fabricColor == undefined) {
                model.fabricColor = "projects/pastoe-wire/Textures/camira_advantage_black.jpg";
            }
            if (model.armrestColor == undefined) {
                model.armrestColor = "projects/pastoe-wire/Textures/armrest_walnut.jpg";
            }
            if (model.type == "KM05") {
                updateCamera(57, 46);
            }
            if (model.type == "KM06") {
                updateCamera(76, 46);
            }
            if (model.type == "KM06") {
                updateCamera(87, 46);
            }
            if (model.type == "SM05") {
                updateCamera(82, 52);
            }
            if (model.type == "FM06") {
                updateCamera(87, 70);
            }
            updateControlPanel(model, undefined, 'type');
            updateFeaturedModel(model);
            showSelected(false);
        }
    }
    document.getElementById('typeText').textContent = document.getElementById(model.type).value;

    //frameColor
    const frameColor = model.frameColor;
    var frameColorIndex = ALLCOLORS.frameColors.findIndex((item) => item.colorHex === frameColor);
    var frameColorValue = document.querySelectorAll('.frameColors_colorButton');

    if (parser.getDevice().type != 'mobile' && parser.getDevice().type != 'tablet') {
        frameColorValue.forEach(item => item.addEventListener('mouseover', () => {
            document.getElementById('frameColorsText').style.visibility = 'visible';
            document.getElementById('frameColorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: ' + document.getElementById(item.id).style.backgroundColor + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + document.getElementById(item.id).alt + '';
            document.getElementById('frameColorsText').classList.add('fst-italic');
            updateFeaturedModel(model, false);
            showSelected(true);
        }));

        frameColorValue.forEach(item => item.addEventListener('mouseout', () => {
            document.getElementById('frameColorsText').style.visibility = 'hidden';
            document.getElementById('frameColorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: #' + model.frameColor + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + document.getElementById(item.id).alt + '';
            document.getElementById('frameColorsText').classList.remove('fst-italic');
            updateFeaturedModel(model, false);
            showSelected(true);
        }));
    }

    frameColorValue.forEach(item => item.addEventListener('click', () => {
        frameColorValue.forEach(item => { item.classList.remove('colorButtonActive') });
        const frameColorId = item.id.split('_');
        frameColorIndex = frameColorId[1];

        model.frameColor = ALLCOLORS.frameColors[frameColorIndex].colorHex;
        document.getElementById('frameColorsIndex_' + frameColorIndex).classList.add('colorButtonActive');
        model.background = { "original": ALLCOLORS.frameColors[frameColorIndex].colorBg };

        updateControlPanel(model, 'frameColors');
        updateFeaturedModel(model);
        showSelected(true);
    }));
    document.getElementById('frameColorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: #' + model.frameColor + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + ALLCOLORS.frameColors[frameColorIndex].colorName + '';
    document.getElementById('frameColorsIndex_' + frameColorIndex).classList.remove('colorButton');
    document.getElementById('frameColorsIndex_' + frameColorIndex).classList.add('colorButtonActive');

    //options
    if (model.type == "KM05" || model.type == "KM06" || model.type == "KM07") {
        if (model.cushion == true) {
            cushion.checked = true;
        } else {
            cushion.checked = false;
        }

        document.getElementById('cushion').addEventListener('click', () => {
            let cushion = document.getElementById('cushion');
            if (cushion.checked == true) {
                model.cushion = true;
                if (model.fabricColor == undefined) {
                    model.fabricColor = "projects/pastoe-wire/Textures/camira_advantage_black.jpg";
                }
            } else {
                model.cushion = false;
            }
            updateControlPanel(model, undefined, 'options');
            updateFeaturedModel(model);
            showSelected(false);
        });

        if (document.getElementById("cushion").checked) {
            document.getElementById('optionsText').textContent = "cushion";
        } else {
            document.getElementById('optionsText').textContent = "no cushion";
        }
    }

    //fabricColor
    if (model.cushion == true || model.type == "SM05" || model.type == "FM06") {
        var fabricColorIndex = ALLCOLORS.fabricColors.findIndex((item) => item.colorPath === model.fabricColor);
        var fabricColorValue = document.querySelectorAll('.fabricColors_colorButton');

        if (parser.getDevice().type != 'mobile' && parser.getDevice().type != 'tablet') {
            fabricColorValue.forEach(item => item.addEventListener('mouseover', () => {
                document.getElementById('fabricColorsText').style.visibility = 'visible';
                document.getElementById('fabricColorsText').innerHTML = '<img src="' + document.getElementById(item.id).src + '" class="rounded-pill shadow" style="width: calc(1rem + 1vw);">&nbsp;&nbsp;&nbsp;&nbsp;' + document.getElementById(item.id).alt + '';
                document.getElementById('fabricColorsText').classList.add('fst-italic');
                updateFeaturedModel(model, false);
                showSelected(true);
            }));

            fabricColorValue.forEach(item => item.addEventListener('mouseout', () => {
                document.getElementById('fabricColorsText').style.visibility = 'hidden';
                document.getElementById('fabricColorsText').innerHTML = '<img src="' + ALLCOLORS.fabricColors[fabricColorIndex].colorPathThumb + '" class="rounded-pill shadow" style="width: calc(1rem + 1vw);">&nbsp;&nbsp;&nbsp;&nbsp;' + ALLCOLORS.fabricColors[fabricColorIndex].colorName + '';
                document.getElementById('fabricColorsText').classList.remove('fst-italic');
                updateFeaturedModel(model, false);
                showSelected(true);
            }));
        }

        fabricColorValue.forEach(item => item.addEventListener('click', () => {
            fabricColorValue.forEach(item => { item.classList.remove('colorButtonActive') });
            const fabricColorId = item.id.split('_');
            fabricColorIndex = fabricColorId[1];

            model.fabricColor = ALLCOLORS.fabricColors[fabricColorIndex].colorPath;
            document.getElementById('fabricColorsIndex_' + fabricColorIndex).classList.add('colorButtonActive');

            updateControlPanel(model, 'fabricColors');
            updateFeaturedModel(model);
            showSelected(true);
        }));
        document.getElementById('fabricColorsText').innerHTML = '<img src="' + ALLCOLORS.fabricColors[fabricColorIndex].colorPathThumb + '" class="rounded-pill shadow" style="width: calc(1rem + 1vw);">&nbsp;&nbsp;&nbsp;&nbsp;' + ALLCOLORS.fabricColors[fabricColorIndex].colorName + '';
        document.getElementById('fabricColorsIndex_' + fabricColorIndex).classList.remove('colorButton');
        document.getElementById('fabricColorsIndex_' + fabricColorIndex).classList.add('colorButtonActive');
    }

    //armrestColor
    if (model.type == "FM06") {
        var armrestColorIndex = ALLCOLORS.armrestColors.findIndex((item) => item.colorPath === model.armrestColor);
        var armrestColorValue = document.querySelectorAll('.armrestColors_colorButton');
        armrestColorValue.forEach(item => { item.classList.remove('colorButtonActive') });

        if (parser.getDevice().type != 'mobile' && parser.getDevice().type != 'tablet') {
            armrestColorValue.forEach(item => item.addEventListener('mouseover', () => {
                document.getElementById('armrestColorsText').style.visibility = 'visible';
                if (ALLCOLORS.armrestColors[armrestColorIndex].colorPath != undefined) {
                    document.getElementById('armrestColorsText').innerHTML = '<img src="' + document.getElementById(item.id).src + '" class="rounded-pill shadow" style="width: calc(1rem + 1vw);">&nbsp;&nbsp;&nbsp;&nbsp;' + document.getElementById(item.id).alt + '';
                } else {
                    document.getElementById('armrestColorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: ' + document.getElementById(item.id).style.backgroundColor + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + document.getElementById(item.id).alt + '';
                }
                document.getElementById('armrestColorsText').classList.add('fst-italic');
                updateFeaturedModel(model, false);
                showSelected(true);
            }));

            armrestColorValue.forEach(item => item.addEventListener('mouseout', () => {
                document.getElementById('armrestColorsText').style.visibility = 'hidden';
                if (ALLCOLORS.armrestColors[armrestColorIndex].colorPath != undefined) {
                    document.getElementById('armrestColorsText').innerHTML = '<img src="https://' + window.location.host + '/' + ALLCOLORS.armrestColors[armrestColorIndex].colorPathThumb + '" class="rounded-pill shadow" style="width: calc(1rem + 1vw);">&nbsp;&nbsp;&nbsp;&nbsp;' + ALLCOLORS.armrestColors[armrestColorIndex].colorName + '';
                } else {
                    document.getElementById('armrestColorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: #' + model.armrestColor + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + ALLCOLORS.armrestColors[armrestColorIndex].colorName + '';
                }
                document.getElementById('armrestColorsText').classList.remove('fst-italic');
                updateFeaturedModel(model, false);
                showSelected(true);
            }));
        }

        armrestColorValue.forEach(item => item.addEventListener('click', () => {
            const armrestColorId = item.id.split('_');
            armrestColorIndex = armrestColorId[1];

            model.armrestColor = ALLCOLORS.armrestColors[armrestColorIndex].colorPath;
            document.getElementById('armrestColorsIndex_' + armrestColorIndex).classList.add('colorButtonActive');

            updateControlPanel(model, 'armrestColors');
            updateFeaturedModel(model);
            showSelected(true);
        }));
        if (ALLCOLORS.armrestColors[armrestColorIndex].colorPath != undefined) {
            document.getElementById('armrestColorsText').innerHTML = '<img src="https://' + window.location.host + '/' + ALLCOLORS.armrestColors[armrestColorIndex].colorPathThumb + '" class="rounded-pill shadow" style="width: calc(1rem + 1vw);">&nbsp;&nbsp;&nbsp;&nbsp;' + ALLCOLORS.armrestColors[armrestColorIndex].colorName + '';
        } else {
            document.getElementById('armrestColorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: #' + model.armrestColor + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + ALLCOLORS.armrestColors[armrestColorIndex].colorName + '';
        }
        document.getElementById('armrestColorsIndex_' + armrestColorIndex).classList.remove('colorButton');
        document.getElementById('armrestColorsIndex_' + armrestColorIndex).classList.add('colorButtonActive');
    }

    // price
    if (model.type == "KM05") {
        if (model.cushion !== true) {
            document.getElementById('price').textContent = "EURO 295,-";
        } else {
            var fabricColorIndex = ALLCOLORS.fabricColors.findIndex((item) => item.colorPath === model.fabricColor);
            if (ALLCOLORS.fabricColors[fabricColorIndex].colorBrand == "camira") {
                document.getElementById('price').textContent = "EURO 385,-";
            } else {
                document.getElementById('price').textContent = "EURO 435,-";
            }
        }
    }
    if (model.type == "KM06") {
        if (model.cushion !== true) {
            document.getElementById('price').textContent = "EURO 325,-";
        } else {
            var fabricColorIndex = ALLCOLORS.fabricColors.findIndex((item) => item.colorPath === model.fabricColor);
            if (ALLCOLORS.fabricColors[fabricColorIndex].colorBrand == "camira") {
                document.getElementById('price').textContent = "EURO 415,-";
            } else {
                document.getElementById('price').textContent = "EURO 465,-";
            }
        }
    }
    if (model.type == "KM07") {
        if (model.cushion !== true) {
            document.getElementById('price').textContent = "EURO 355,-";
        } else {
            var fabricColorIndex = ALLCOLORS.fabricColors.findIndex((item) => item.colorPath === model.fabricColor);
            if (ALLCOLORS.fabricColors[fabricColorIndex].colorBrand == "camira") {
                document.getElementById('price').textContent = "EURO 445,-";
            } else {
                document.getElementById('price').textContent = "EURO 495,-";
            }
        }
    }
    if (model.type == "SM05") {
        var fabricColorIndex = ALLCOLORS.fabricColors.findIndex((item) => item.colorPath === model.fabricColor);
        if (ALLCOLORS.fabricColors[fabricColorIndex].colorBrand == "camira") {
            document.getElementById('price').textContent = "EURO 435,-";
        } else {
            document.getElementById('price').textContent = "EURO 495,-";
        }
    }
    if (model.type == "FM06") {
        var fabricColorIndex = ALLCOLORS.fabricColors.findIndex((item) => item.colorPath === model.fabricColor);
        if (ALLCOLORS.fabricColors[fabricColorIndex].colorBrand == "camira") {
            document.getElementById('price').textContent = "EURO 1045,-";
        } else {
            document.getElementById('price').textContent = "EURO 1145,-";
        }
    }

    //pdf generator
    // is global FEATUREDMODEL for pdf really necessary?
    FEATUREDMODEL = model;
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
    accordions.type = {
        "title": "type",
        "options": ['type'],
        "code": /*html*/ `
        <div class="row m-0 p-0 pb-2">
            <div class="d-flex justify-content-start m-0 p-0">
                <div class="card border-0">
                    <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                        <input type="radio" class="form-check-input" name="type" value="KM05" id="KM05">
                        <label class="form-check-label" for="KM05">KM05 stool</label>
                    </div>
                    <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                        <input type="radio" class="form-check-input" name="type" value="KM06" id="KM06">
                        <label class="form-check-label" for="KM06">KM06 kitchen stool</label>
                    </div>
                    <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                        <input type="radio" class="form-check-input" name="type" value="KM07" id="KM07">
                        <label class="form-check-label" for="KM07">KM07 bar stool</label>
                    </div>
                    <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                        <input type="radio" class="form-check-input" name="type" value="SM05" id="SM05">
                        <label class="form-check-label" for="SM05">SM05 chair</label>
                    </div>
                    <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                        <input type="radio" class="form-check-input" name="type" value="FM06" id="FM06">
                        <label class="form-check-label" for="FM06">FM06 lounge chair</label>
                    </div>
                </div>
            </div>
        </div>`,
    }
    accordions.frameColors = {
        "title": "color",
        "options": ['frameColors'],
        "display": "d-block",
        "code": /*html*/ `
    <div class="row m-0 p-0 pb-2">
        <div class="col-5 m-0 p-0">
            <div class="row m-0 p-0 pb-2">
                <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                        <!--<div class="card border-0 pb-2">structure&nbsp;</div>-->
                    <div  id="frameColorsColorPicker" class="m-0 p-0"></div>
                </div>
            </div>
        </div>
    </div>`,
        "onload": function () {
            let containerElemFrameColorsColors = document.getElementById("frameColorsColorPicker");
            addColors('frameColors', ALLCOLORS.frameColors, containerElemFrameColorsColors);
        }
    }
    if (model.type == "KM05" || model.type == "KM06" || model.type == "KM07") {
        accordions.options = {
            "title": "options",
            "options": ['options'],
            "code": /*html*/ `
            <div class="row m-0 p-0 mb-3">
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="cushion">
                <label class="form-check-label" for="cushion">cushion</label>
              </div>
            </div>`,
        }
    }
    if (model.type == "SM05" || model.type == "FM06" || model.cushion == true) {
        accordions.fabricColors = {
            "title": "fabric",
            "options": ['fabricColors'],
            "display": "d-block",
            "code": /*html*/ `
        <div class="row m-0 p-0 pb-2">
            <div class="col-3 m-0 p-0">
                <div class="row m-0 p-0 pb-2">
                    <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                            <!--<div class="card border-0 pb-2">structure&nbsp;</div>-->
                        <div  id="fabricColorsTexturePicker" class="m-0 p-0"></div>
                    </div>
                </div>
            </div>
        </div>`,
            "onload": function () {
                let containerElemFabricColorsTextures = document.getElementById("fabricColorsTexturePicker");
                addTextures('fabricColors', ALLCOLORS.fabricColors, containerElemFabricColorsTextures);
            }
        }
    }
    if (model.type == "FM06") {
        accordions.armrestColors = {
            "title": "armrest",
            "options": ['armrestColors'],
            "display": "d-block",
            "code": /*html*/ `
        <div class="row m-0 p-0 pb-2">
            <div class="col-3 m-0 p-0">
                <div class="row m-0 p-0 pb-2">
                    <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                            <!--<div class="card border-0 pb-2">structure&nbsp;</div>-->
                        <div id="armrestColorsTexturePicker" class="m-0 p-0"></div>
                    </div>
                </div>
            </div>
        </div>`,
            "onload": function () {
                let containerElemArmrestColorsTextures = document.getElementById("armrestColorsTexturePicker");
                addTextures('armrestColors', ALLCOLORS.armrestColors, containerElemArmrestColorsTextures);
            }
        }
    }
    return { accordions };
}