"use strict"
var UNITY_INSTANCE;
var ALLMODELS;
var ALLCOLORS;
var FEATUREDMODEL;
var FEATUREDMODELINDEX;

var DECORWALLINDEX = 0;
var DECORFLOORINDEX = 0;

const urlParams = new URLSearchParams(window.location.search);

function downloadPdf(model, mainImage) {
    let link = 'https://pastoe-noon.web.app?data=' + encodeURIComponent(JSON.stringify(model));
    let height;
    let width;
    let depth;

    let colorBodyIndex;
    let colorBodyCode;
    let color1Index;
    let color1Code;
    let color2Index;
    let color2Code;
    let color3Index;
    let color3Code;
    let color4Index;
    let color4Code;
    let colorFrameIndex = ALLCOLORS.colors.findIndex((item) => item.colorHex == '020307');
    let colorInteriorIndex = ALLCOLORS.colors.findIndex((item) => item.colorHex == '020307');

    if (model.color.path != undefined) {
        colorBodyIndex = ALLCOLORS.colors.findIndex((item) => item.colorPath == model.color.path);
        colorBodyCode = ALLCOLORS.colors[colorBodyIndex].colorCode;
    } else {
        colorBodyIndex = ALLCOLORS.colors.findIndex((item) => item.colorHex == model.color.color);
        if (model.color.lacquer == 'basic') {
            colorBodyCode = ALLCOLORS.colors[colorBodyIndex].colorCode.basic;
        }
        if (model.color.lacquer == 'structure') {
            colorBodyCode = ALLCOLORS.colors[colorBodyIndex].colorCode.structure;
        }
        if (model.color.lacquer == 'gloss') {
            colorBodyCode = ALLCOLORS.colors[colorBodyIndex].colorCode.gloss;
        }
    }

    if (model.components[0].color.path != undefined) {
        color1Index = ALLCOLORS.colors.findIndex((item) => item.colorPath == model.components[0].color.path);
        color1Code = ALLCOLORS.colors[color1Index].colorCode;
    } else {
        color1Index = ALLCOLORS.colors.findIndex((item) => item.colorHex == model.components[0].color.color);
        if (model.components[0].color.lacquer == 'basic') {
            color1Code = ALLCOLORS.colors[color1Index].colorCode.basic;
        }
        if (model.components[0].color.lacquer == 'structure') {
            color1Code = ALLCOLORS.colors[color1Index].colorCode.structure;
        }
        if (model.components[0].color.lacquer == 'gloss') {
            color1Code = ALLCOLORS.colors[color1Index].colorCode.gloss;
        }
    }

    if (model.components[1].color.path != undefined) {
        color2Index = ALLCOLORS.colors.findIndex((item) => item.colorPath == model.components[1].color.path);
        color2Code = ALLCOLORS.colors[color2Index].colorCode;
    } else {
        color2Index = ALLCOLORS.colors.findIndex((item) => item.colorHex == model.components[1].color.color);
        if (model.components[1].color.lacquer == 'basic') {
            color2Code = ALLCOLORS.colors[color2Index].colorCode.basic;
        }
        if (model.components[1].color.lacquer == 'structure') {
            color2Code = ALLCOLORS.colors[color2Index].colorCode.structure;
        }
        if (model.components[1].color.lacquer == 'gloss') {
            color2Code = ALLCOLORS.colors[color2Index].colorCode.gloss;
        }
    }

    if (model.components[2].color.path != undefined) {
        color3Index = ALLCOLORS.colors.findIndex((item) => item.colorPath == model.components[2].color.path);
        color3Code = ALLCOLORS.colors[color3Index].colorCode;
    } else {
        color3Index = ALLCOLORS.colors.findIndex((item) => item.colorHex == model.components[2].color.color);
        if (model.components[2].color.lacquer == 'basic') {
            color3Code = ALLCOLORS.colors[color3Index].colorCode.basic;
        }
        if (model.components[2].color.lacquer == 'structure') {
            color3Code = ALLCOLORS.colors[color3Index].colorCode.structure;
        }
        if (model.components[2].color.lacquer == 'gloss') {
            color3Code = ALLCOLORS.colors[color3Index].colorCode.gloss;
        }
    }

    if (model.components[3].color.path != undefined) {
        color4Index = ALLCOLORS.colors.findIndex((item) => item.colorPath == model.components[3].color.path);
        color4Code = ALLCOLORS.colors[color4Index].colorCode;
    } else {
        color4Index = ALLCOLORS.colors.findIndex((item) => item.colorHex == model.components[3].color.color);
        if (model.components[3].color.lacquer == 'basic') {
            color4Code = ALLCOLORS.colors[color4Index].colorCode.basic;
        }
        if (model.components[3].color.lacquer == 'structure') {
            color4Code = ALLCOLORS.colors[color4Index].colorCode.structure;
        }
        if (model.components[3].color.lacquer == 'gloss') {
            color4Code = ALLCOLORS.colors[color4Index].colorCode.gloss;
        }
    }

    if (model.type == "noon") {
        height = 57;
        width = 212;
        depth = 45;
    }
    var docDefinition = {
        pageSize: 'A4',
        pageOrientation: 'portrait',
        pageMargins: [30, 30, 30, 30],
        defaultStyle: {
            font: 'RobotoDefault'
        },
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
            { qr: `${link}`, fit: 120, absolutePosition: { x: 240, y: 30 } },
            { text: `NOON`, fontSize: 36, absolutePosition: { x: 28, y: 22 } },
            {
                layout: 'noBorders',
                table: {
                    headerRows: 0,
                    widths: [100, 'auto'],
                    body: [
                        [{ text: 'COMBINATION', bold: true, fontSize: 12 }, `${(document.getElementById('name').textContent) + ' ' + document.getElementById(model.type).value}`],
                        [{ text: 'CONFIGURATOR', bold: true, fontSize: 12 }, { text: `my noon`, link: `${link}` }],
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
            {
                svg: /*html*/ `
                <svg viewBox="0 0 3000 1400" width="400" xmlns="http://www.w3.org/2000/svg" id="noon">
                    <style>
                        .fontSize {
                        font-size: 60px;
                        }
                    </style>
                    <!-- topview -->
                    <svg x="0" y="0">
                        <text x="70" y="100" class="fontSize">1.</text>
                        <rect x="10" y="10" width="2143" height="450" fill="none" stroke="black" stroke-width="3" />
                    </svg>
                    <!-- frontview -->
                    <svg x="0" y="650">
                        <svg x="0" y="0">
                            <!-- frame -->
                            <text x="330" y="580" class="fontSize">6.</text>
                            <polygon points="21,410 2141,410 2022,450 131,450" fill="white" stroke="black" stroke-width="3" />
                            <rect x="273" y="411" width="20" height="170" fill="white" stroke="black" stroke-width="3" />
                            <rect x="1869" y="411" width="20" height="170" fill="white" stroke="black" stroke-width="3" />
                            <!-- base -->
                            <rect x="10" y="10" width="2143" height="400" fill="none" stroke="black" stroke-width="3" />
                            <rect x="20" y="20" width="2123" height="380" fill="none" stroke="black" stroke-width="3" />

                            <line x1="551" y1="20" x2="551" y2="400" stroke="black" stroke-width="3" />
                            <line x1="1081" y1="20" x2="1081" y2="400" stroke="black" stroke-width="3" />
                            <line x1="1611" y1="20" x2="1611" y2="400" stroke="black" stroke-width="3" />
                            <!-- component1 -->
                            <svg x="20" y="20">
                                <text x="70" y="100" class="fontSize">2.</text>
                                <!-- door left -->
                                <svg x="0" y="30">
                                    <polyline points="0,0 30,15 0,30" fill="none" stroke="black"/>
                                </svg>
                                <svg x="0" y="300">
                                    <polyline points="0,0 30,15 0,30" fill="none" stroke="black"/>
                                </svg>
                            <!-- door left -->
                            <svg x="0" y="30">
                                <polyline points="0,0 30,15 0,30" fill="none" stroke="black"/>
                            </svg>
                            <svg x="0" y="300">
                                <polyline points="0,0 30,15 0,30" fill="none" stroke="black"/>
                            </svg>
                                <!-- shelf -->
                                <svg>
                                    <line x1="10" y1="190" x2="500" y2="190" stroke="black" stroke-dasharray="20 15" stroke-dashoffset="20" />
                                </svg>
                         
                            </svg>
                            <!-- component2 -->
                            <svg x="550" y="20" id="doorLeft">
                                <text x="70" y="100" class="fontSize">3.</text>
                                <svg x="0" y="30">
                                    <polyline points="530,0 500,15 530,30" fill="none" stroke="black"/>
                                </svg>
                                <svg x="0" y="300">
                                    <polyline points="0,0 30,15 0,30" fill="none" stroke="black"/>
                                </svg>
                            </svg>
                            <!-- component3 -->
                            <svg x="1080" y="20" id="doorLeft">
                                <text x="70" y="100" class="fontSize">4.</text>
                                <svg x="0" y="30">
                                    <polyline points="0,0 30,15 0,30" fill="none" stroke="black"/>
                                </svg>
                                <svg>
                                    <line x1="0" y1="190" x2="530" y2="190" stroke="black" />
                                </svg>
                                <svg x="0" y="300">
                                    <polyline points="0,0 30,15 0,30" fill="none" stroke="black"/>
                                </svg>
                            </svg>
                            <!-- component4 -->
                            <svg x="1610" y="20" id="doorLeft">
                                <text x="70" y="100" class="fontSize">5.</text>
                                <svg x="0" y="30">
                                    <polyline points="0,0 30,15 0,30" fill="none" stroke="black"/>
                                </svg>
                                <svg>
                                    <line x1="0" y1="190" x2="530" y2="190" stroke="black" />
                                </svg>
                                <svg x="0" y="300">
                                    <polyline points="0,0 30,15 0,30" fill="none" stroke="black"/>
                                </svg>
                            </svg>
                        </svg>
                    </svg>
                    <!-- rightview -->
                    <svg x="2300" y="650">
                        <svg x="0" y="0">
                            <!-- frame -->
                            <rect x="30" y="411" width="409" height="162" fill="none" stroke="black" stroke-width="3" />
                            <rect x="45" y="426" width="379" height="132" fill="none" stroke="black" stroke-width="3" />
                            <rect x="110" y="411" width="20" height="40" fill="white" stroke="black" stroke-width="3" />
                            <rect x="340" y="411" width="20" height="40" fill="white" stroke="black" stroke-width="3" />
                            <!-- base -->
                            <text x="70" y="100" class="fontSize">1.</text>
                            <rect x="10" y="10" width="450" height="400" fill="none" stroke="black" stroke-width="3" />
                        </svg>
                    </svg>
                    </svg>`, height: 200
            },
            {
                canvas: [{
                    type: 'line',
                    x1: 0, y1: 0,
                    x2: 536, y2: 0,
                    lineWidth: 0.2
                }]
            },
            { text: 'COLOR / VENEER', bold: true, fontSize: 12, margin: [0, 15, 0, 5] },
            {
                layout: 'noBorders',
                table: {
                    headerRows: 0,
                    widths: [60, 'auto'],
                    body: [
                        [{ text: `1. body`, fontSize: 9 }, { text: `${colorBodyCode} ${ALLCOLORS.colors[colorBodyIndex].colorName}`, fontSize: 9 }],
                        [{ text: `2. ${model.components[0].front.type}`, fontSize: 9 }, { text: `${color1Code} ${ALLCOLORS.colors[color1Index].colorName}`, fontSize: 9 }],
                        [{ text: `3. ${model.components[1].front.type}`, fontSize: 9 }, { text: `${color2Code} ${ALLCOLORS.colors[color2Index].colorName}`, fontSize: 9 }],
                        [{ text: `4. ${model.components[2].front.type}`, fontSize: 9 }, { text: `${color3Code} ${ALLCOLORS.colors[color3Index].colorName}`, fontSize: 9 }],
                        [{ text: `5. ${model.components[3].front.type}`, fontSize: 9 }, { text: `${color4Code} ${ALLCOLORS.colors[color4Index].colorName}`, fontSize: 9 }],
                        [{ text: `6. frame`, fontSize: 9 }, { text: `${ALLCOLORS.colors[colorFrameIndex].colorCode.basic} ${ALLCOLORS.colors[colorFrameIndex].colorName}`, fontSize: 9 }],
                        [{ text: `interior`, fontSize: 9 }, { text: `${ALLCOLORS.colors[colorInteriorIndex].colorCode.basic} ${ALLCOLORS.colors[colorInteriorIndex].colorName}`, fontSize: 9 }],
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
            normal: 'https://pastoe-noon.web.app/fonts/Roboto-Light.ttf',
            bold: 'https://pastoe-noon.web.app/fonts/Roboto-Medium.ttf'
            //italics: 'https://pastoe-noon.web.app/fonts/Roboto-Light.ttf',
            //bold: 'https://pastoe-noon.web.app/fonts/Roboto-Light.ttf',
        },
    }
    pdfMake.createPdf(docDefinition).download('pastoe-noon.pdf');
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
    let modelHeight;
    if (FEATUREDMODEL.type == 'cabinet') {
        modelHeight = FEATUREDMODEL.height;
    }
    if (FEATUREDMODEL.type == 'sideboard' || FEATUREDMODEL.type == 'sideboardOnFrame') {
        modelHeight = 75;
    }
    if (FEATUREDMODEL.type == 'sideboardOnFrameTV') {
        modelHeight = 111.5;
    }
    const renderTexture = {
        medium: medium,
        angleName: "perspective",
        widthForImage: FEATUREDMODEL.width,
        heightForImage: modelHeight,
        depthForImage: 37
    };
    UNITY_INSTANCE.SendMessage('NoonAfternoon', 'SaveRenderTexture', JSON.stringify(renderTexture));
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

function updateFeaturedModel(model) {
    UNITY_INSTANCE.SendMessage('NoonAfternoon', 'SetNoonAfternoon', JSON.stringify(model));
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
    UNITY_INSTANCE.SendMessage('NoonAfternoon', 'AddDecor', JSON.stringify(decor));
}

function toggleRadioButtons(toggle) {
    UNITY_INSTANCE.SendMessage('NoonAfternoon', 'ToggleRadioButtonGroup', toggle);
}

function toggleDecor(toggle) {
    UNITY_INSTANCE.SendMessage('NoonAfternoon', 'ToggleDecor', toggle);
}

function updateCamera(modelWidth, modelHeight) {
    const size = {
        width: modelWidth,
        height: modelHeight
    };
    UNITY_INSTANCE.SendMessage('NoonAfternoon', 'SetFLCamera', JSON.stringify(size));
}

function setComponentNumber(componentNumberFromUnity) {
    FEATUREDMODEL.radioButton.number = componentNumberFromUnity;
    let accordionButtonComponentType = document.getElementById('collapse-check-selectedComponentType');
    let accordionButtonComponentColor = document.getElementById('collapse-check-selectedComponentColor');
    if (accordionButtonComponentType && accordionButtonComponentType.getAttribute('aria-expanded') == 'true') {
        updateControlPanel(FEATUREDMODEL, 'selectedComponentType');
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

    //toggle featuredModels carrousel
    let featuredModels = document.getElementById('featuredModels');
    if (urlParams.has('noFeaturedModels')) {
        featuredModels.classList.remove('d-block');
        featuredModels.classList.add('d-none');
    } else {
        featuredModels.classList.remove('d-none');
        featuredModels.classList.add('d-block');
    }

    //componentNumber
    if (model.radioButton == undefined) {
        Object.assign(model, { radioButton: { number: 1 } });
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

    //type
    document.getElementById(model.type).checked = true;

    const typeValues = document.querySelectorAll('input[type=radio][name="type"]');
    for (const typeValue of typeValues) {
        typeValue.onclick = (type) => {

            model.type = type.target.id;

            if (type.target.value == "noon") {
                model.type = "noon";
                model.color = { "color": "f7f6f4", "lacquer": "basic" };
                model.interiorColor = { "color": "f7f6f4", "lacquer": "structure" };
                model.components = [{
                    "front": { "type": "door", "rotation": "left" },
                    "color": { "color": "f7f6f4", "lacquer": "basic" }
                },
                {
                    "front": { "type": "door", "rotation": "right" },
                    "color": { "color": "f7f6f4", "lacquer": "basic" }
                },
                {
                    "front": { "type": "door", "rotation": "right" },
                    "color": { "color": "f7f6f4", "lacquer": "basic" }
                },
                {
                    "front": { "type": "door", "rotation": "right" },
                    "color": { "color": "f7f6f4", "lacquer": "basic" }
                }
                ];
            }
            if (type.target.value == "afternoon") {
                model.type = "afternoon";
                model.spaceDivider = true;
                model.color = { "color": "f7f6f4", "lacquer": "basic" };
                model.interiorColor = { "color": "f7f6f4", "lacquer": "structure" };
                model.components = [{
                    "front": { "type": "door", "rotation": "left" },
                    "color": { "color": "f7f6f4", "lacquer": "basic" }
                },
                {
                    "front": { "type": "door", "rotation": "left" },
                    "color": { "color": "f7f6f4", "lacquer": "basic" }
                },
                {
                    "front": { "type": "drawerset", },
                    "color": { "color": "f7f6f4", "lacquer": "basic" }
                }
                ];
            }
            if (model.type == "noon") {
                updateCamera(212, 57);
            }
            if (model.type == "afternoon") {
                updateCamera(159, 98);
            }
            updateControlPanel(model, 'type');
            updateFeaturedModel(model);
            showSelected(false);
        }
    }
    document.getElementById('typeText').textContent = document.getElementById(model.type).value;

    if (model.type == "noon") {
        //selected component type
        document.getElementById(model.components[model.radioButton.number - 1].front.type).checked = true;

        //const component = model.components[model.radioButton.number - 1].front;
        const componentValues = document.querySelectorAll(`input[type=radio][name='selectedComponentType']`);
        for (const componentValue of componentValues) {
            componentValue.onclick = (component) => {

                model.components[model.radioButton.number - 1].front = undefined;
                if (component.target.id == "door") {
                    model.components[model.radioButton.number - 1].front = { "type": "door", rotation: "left" };
                } else {
                    model.components[model.radioButton.number - 1].front = { "type": component.target.id };
                }
                updateControlPanel(model, 'selectedComponentType');
                updateFeaturedModel(model);
            }
        }
        if (model.components[model.radioButton.number - 1].front.type == "flapAndDrawer") {
            document.getElementById('selectedComponentTypeText').textContent = "set of flap and drawer";
        } else {
            document.getElementById('selectedComponentTypeText').textContent = model.components[model.radioButton.number - 1].front.type
        }
    }

    //body color lacquer
    let bodyColorColorLacquer = document.querySelectorAll('input[type=radio][name="bodyColorlacquer"]');
    bodyColorColorLacquer.forEach(radio => { radio.replaceWith(radio.cloneNode(true)) });
    bodyColorColorLacquer = document.querySelectorAll('input[type=radio][name="bodyColorlacquer"]');
    if (model.color.lacquer == "veneer") {
        document.getElementById('bodyColorLacquer_basic').disabled = true;
        document.getElementById('bodyColorLacquer_structure').disabled = true;
        document.getElementById('bodyColorLacquer_gloss').disabled = true;
        document.getElementById('bodyColorLacquer_veneer').checked = true;
    } else {
        document.getElementById('bodyColorLacquer_basic').disabled = false;
        document.getElementById('bodyColorLacquer_structure').disabled = false;
        document.getElementById('bodyColorLacquer_gloss').disabled = false;
        document.getElementById('bodyColorLacquer_' + model.color.lacquer).checked = true;
    }
    bodyColorColorLacquer.forEach(radio => radio.addEventListener('click', () => {
        model.color.lacquer = radio.value;
        document.getElementById('bodyColorLacquer_' + model.color.lacquer).checked = true;
        updateControlPanel(model, 'bodyColor');
        updateFeaturedModel(model);
        showSelected(false);
    }));

    //body color
    const bodyColor = model.color.color;
    var bodyColorIndex = ALLCOLORS.colors.findIndex((item) => item.colorHex == bodyColor);
    var bodyColorValue = document.querySelectorAll('.bodyColor_colorButton');

    if (parser.getDevice().type != 'mobile' && parser.getDevice().type != 'tablet') {
        bodyColorValue.forEach(item => item.addEventListener('mouseover', () => {
            document.getElementById('bodyColorText').style.visibility = 'visible';
            document.getElementById('bodyColorText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: ' + document.getElementById(item.id).style.backgroundColor + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + document.getElementById(item.id).alt + '';
            document.getElementById('bodyColorText').classList.add('fst-italic');
            showSelected(true);
        }));

        bodyColorValue.forEach(item => item.addEventListener('mouseout', () => {
            document.getElementById('bodyColorText').style.visibility = 'hidden';
            document.getElementById('bodyColorText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: #' + model.color.color + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + ALLCOLORS.colors[bodyColorIndex].colorName + '';
            document.getElementById('bodyColorText').classList.remove('fst-italic');
            showSelected(true);
        }));
    }

    bodyColorValue.forEach(item => item.addEventListener('click', () => {
        bodyColorValue.forEach(item => { item.classList.remove('colorButtonActive') });
        const bodyColorId = item.id.split('_');
        bodyColorIndex = bodyColorId[1];

        if (ALLCOLORS.colors[bodyColorIndex].colorPath != undefined) {
            model.color = { "color": ALLCOLORS.colors[bodyColorIndex].colorHex, "path": ALLCOLORS.colors[bodyColorIndex].colorPath, "lacquer": "veneer" };
            document.getElementById('bodyColorLacquer_basic').disabled = true;
            document.getElementById('bodyColorLacquer_structure').disabled = true;
            document.getElementById('bodyColorLacquer_gloss').disabled = true;
            document.getElementById('bodyColorLacquer_veneer').checked = true;
        } else {
            if (model.color.lacquer != undefined && model.color.lacquer != "veneer") {
                model.color = { "color": ALLCOLORS.colors[bodyColorIndex].colorHex, "lacquer": model.color.lacquer };
            } else {
                model.color = { "color": ALLCOLORS.colors[bodyColorIndex].colorHex, "lacquer": "basic" };
            }
            document.getElementById('bodyColorLacquer_basic').disabled = false;
            document.getElementById('bodyColorLacquer_structure').disabled = false;
            document.getElementById('bodyColorLacquer_gloss').disabled = false;
            document.getElementById('bodyColorLacquer_' + model.color.lacquer).checked = true;
        }
        //model.background = { "original": allColors.colors[bodyColorIndex].colorBg };
        updateControlPanel(model, 'bodyColor');
        updateFeaturedModel(model);
        showSelected(true);
    }));
    if (ALLCOLORS.colors[bodyColorIndex].colorPath != undefined) {
        document.getElementById('bodyColorText').innerHTML = '<img src="https://' + window.location.host + '/' + ALLCOLORS.colors[bodyColorIndex].colorPathThumb + '" class="rounded-pill shadow" style="width: calc(1rem + 1vw);">';
    } else {
        document.getElementById('bodyColorText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: #' + model.color.color + ';">';
    }
    document.getElementById('bodyColorIndex_' + bodyColorIndex).classList.remove('colorButton');
    document.getElementById('bodyColorIndex_' + bodyColorIndex).classList.add('colorButtonActive');

    //selected component color lacquer
    let selectedComponentColorLacquer = document.querySelectorAll('input[type=radio][name="selectedComponentLacquer"]');
    selectedComponentColorLacquer.forEach(radio => { radio.replaceWith(radio.cloneNode(true)) });
    selectedComponentColorLacquer = document.querySelectorAll('input[type=radio][name="selectedComponentLacquer"]');

    if (model.components[model.radioButton.number - 1].color.lacquer == "veneer") {
        document.getElementById('selectedComponentLacquer_basic').disabled = true;
        document.getElementById('selectedComponentLacquer_structure').disabled = true;
        document.getElementById('selectedComponentLacquer_gloss').disabled = true;
        document.getElementById('selectedComponentLacquer_veneer').checked = true;
    } else {
        document.getElementById('selectedComponentLacquer_basic').disabled = false;
        document.getElementById('selectedComponentLacquer_structure').disabled = false;
        document.getElementById('selectedComponentLacquer_gloss').disabled = false;
        document.getElementById('selectedComponentLacquer_' + model.components[model.radioButton.number - 1].color.lacquer).checked = true;
    }
    selectedComponentColorLacquer.forEach(radio => radio.addEventListener('click', () => {
        model.components[model.radioButton.number - 1].color.lacquer = radio.value;
        document.getElementById('selectedComponentLacquer_' + model.components[model.radioButton.number - 1].color.lacquer).checked = true;
        updateControlPanel(model, 'selectedComponentColor');
        updateFeaturedModel(model);
        showSelected(false);
    }));

    //selected component color
    const selectedComponentColor = model.components[model.radioButton.number - 1].color.color;
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
            document.getElementById('selectedComponentColorText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: #' + model.components[model.radioButton.number - 1].color.color + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + ALLCOLORS.colors[selectedComponentColorIndex].colorName + '';
            document.getElementById('selectedComponentColorText').classList.remove('fst-italic');
            showSelected(true);
        }));
    }

    selectedComponentColorValue.forEach(item => item.addEventListener('click', () => {
        selectedComponentColorValue.forEach(item => { item.classList.remove('colorButtonActive') });
        const selectedComponentColorId = item.id.split('_');
        selectedComponentColorIndex = selectedComponentColorId[1];

        if (ALLCOLORS.colors[selectedComponentColorIndex].colorPath != undefined) {
            model.components[model.radioButton.number - 1].color = { "color": ALLCOLORS.colors[selectedComponentColorIndex].colorHex, "path": ALLCOLORS.colors[selectedComponentColorIndex].colorPath, "lacquer": "veneer" };
            document.getElementById('selectedComponentLacquer_basic').disabled = true;
            document.getElementById('selectedComponentLacquer_structure').disabled = true;
            document.getElementById('selectedComponentLacquer_gloss').disabled = true;
            document.getElementById('selectedComponentLacquer_veneer').checked = true;
        } else {
            if (model.components[model.radioButton.number - 1].color.lacquer != undefined) {
                model.components[model.radioButton.number - 1].color = { "color": ALLCOLORS.colors[selectedComponentColorIndex].colorHex, "lacquer": model.components[model.radioButton.number - 1].color.lacquer };
            } else {
                model.components[model.radioButton.number - 1].color = { "color": ALLCOLORS.colors[selectedComponentColorIndex].colorHex, "lacquer": "basic" };
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
        document.getElementById('selectedComponentColorText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: #' + model.components[model.radioButton.number - 1].color.color + ';">';
    }
    document.getElementById('selectedComponentColorIndex_' + selectedComponentColorIndex).classList.remove('colorButton');
    document.getElementById('selectedComponentColorIndex_' + selectedComponentColorIndex).classList.add('colorButtonActive');

    if (model.type == "afternoon") {
        let spaceDivider = document.getElementById('spaceDivider');
        if (model.spaceDivider == true) {
            spaceDivider.checked = true;
        } else {
            spaceDivider.checked = false;
        }

        document.getElementById('spaceDivider').addEventListener('click', () => {
            let spaceDivider = document.getElementById('spaceDivider');
            if (spaceDivider.checked == true) {
                model.spaceDivider = true;
            } else {
                model.spaceDivider = false;
            }
            updateControlPanel(model, 'spaceDivider');
            updateFeaturedModel(model);
            showSelected(false);
        });

        if (spaceDivider.checked) {
            document.getElementById('spaceDividerText').textContent = "space divider";
        } else {
            document.getElementById('spaceDividerText').textContent = "no space divider";
        }
    }

    //price
    document.getElementById('price').textContent = 'EURO 3000,-';

    //addDecor
    if (model.type == "noon") {
        addDecor(model.type, 212, 57, 45, 57, 0, ALLCOLORS.decorWall[DECORWALLINDEX].colorHex, ALLCOLORS.decorWall[DECORWALLINDEX].colorPath, ALLCOLORS.decorFloor[DECORFLOORINDEX].colorHex, ALLCOLORS.decorFloor[DECORFLOORINDEX].colorPath);
    }
    if (model.type == "afternoon") {
        addDecor(model.type, 159, 98, 45, 98, 0, ALLCOLORS.decorWall[DECORWALLINDEX].colorHex, ALLCOLORS.decorWall[DECORWALLINDEX].colorPath, ALLCOLORS.decorFloor[DECORFLOORINDEX].colorHex, ALLCOLORS.decorFloor[DECORFLOORINDEX].colorPath);
    }

    FEATUREDMODEL = model;
}

function showFeaturedModel(model) {
    if (model.type == "noon") {
        updateCamera(212, 57);
    }
    if (model.type == "afternoon") {
        updateCamera(159, 98);
    }
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
    //const componentsPromise = fetch(`../projects/${brand}-${product}/components.json`).then(response => response.json());
    UNITY_INSTANCE = await unityPromise;
    ALLMODELS = await modelPromise;
    ALLCOLORS = await colorsPromise;
    //ALLCOMPONENTS = await componentsPromise;

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
    let noModel;
    if (urlParams.has('noType')) {
        noModel = "d-none";
    } else {
        noModel = "d-block";
    }
    let noFunction;
    if (urlParams.has('noSize')) {
        noFunction = "d-none";
    } else {
        noFunction = "d-block";
    }
    let noDecor;
    if (urlParams.has('noDecor')) {
        noDecor = "d-none";
    } else {
        noDecor = "d-block";
    }
    accordions.type = {
        "title": "model",
        "options": ['type'],
        "display": noModel,
        "code": /*html*/ `
        <div class="row m-0 p-0 pb-2">
            <div class="d-flex justify-content-start m-0 p-0">
                <div class="card border-0">
                    <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                        <input type="radio" class="form-check-input" name="type" value="noon" id="noon">
                        <label class="form-check-label" for="noon">noon</label>
                    </div>
                    <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                        <input type="radio" class="form-check-input" name="type" value="afternoon" id="afternoon">
                        <label class="form-check-label" for="afternoon">afternoon</label> 
                    </div>
                </div>
            </div>
        </div>`
    }
    if (model.type == "noon") {
        accordions.selectedComponentType = {
            "title": "function",
            "options": ['selectedComponentType'],
            "display": noFunction,
            "code": /*html*/ `
            <div class="row m-0 p-0 pb-2">
                <div class="d-flex justify-content-start m-0 p-0">
                    <div class="card border-0">
                        <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                            <input type="radio" class="form-check-input" name="selectedComponentType" id="door">
                            <label class="form-check-label" for="door">door</label>
                        </div>
                        <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                            <input type="radio" class="form-check-input" name="selectedComponentType" id="drawer">
                            <label class="form-check-label" for="drawer">drawer</label>
                        </div>
                        <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                            <input type="radio" class="form-check-input" name="selectedComponentType" id="drawerset">
                            <label class="form-check-label" for="drawerset">drawerset</label>
                        </div>
                        <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                            <input type="radio" class="form-check-input" name="selectedComponentType" id="flapAndDrawer">
                            <label class="form-check-label" for="flapAndDrawer">set of flap and drawer</label>
                        </div>
                    </div>
                </div>
            </div>`
        }
    }
    if (model.type == "afternoon") {
        accordions.spaceDivider = {
            "title": "options",
            "options": ['spaceDivider'],
            "display": "d-block",
            "code": /*html*/ `
            <div class="row m-0 p-0 mb-3">
                <div class="form-check    pb-xxl-3 pb-xl-3 pb-lg-2 pb-md-2 pb-sm-1">
                    <input type="checkbox" class="form-check-input" id="spaceDivider">
                    <label class="form-check-label" for="spaceDivider">space divider</label>
                </div>
            </div>`
        }
    }
    accordions.bodyColor = {
        "title": "bodyColor",
        "options": ['body colors'],
        "display": "d-block",
        "code": /*html*/ `
        <div class="row m-0 p-0 pb-2">
            <div class="col-5 m-0 p-0">
                <div class="row m-0 p-0 pb-2">
                    <div class="d-flex justify-content-start m-0 p-0">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="bodyColorlacquer" id="bodyColorLacquer_basic" value="basic">
                            <label class="form-check-label" for="basic">basic</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="bodyColorlacquer" id="bodyColorLacquer_structure" value="structure">
                            <label class="form-check-label" for="structure">structure</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="bodyColorlacquer" id="bodyColorLacquer_gloss" value="gloss">
                            <label class="form-check-label" for="gloss">gloss</label>
                        </div>
                    </div>
                </div>
                <div id="bodyColorPicker" class="m-0 p-0"></div>
            </div>
            <div class="col-1 m-0 p-0">
            </div>
            <div class="col-3 m-0 p-0">
                <div class="row m-0 p-0 pb-2">
                    <div class="d-flex justify-content-start m-0 p-0">
                        <div class="form-check form-check-inline invisible">
                            <input class="form-check-input" type="radio" name="bodyColorLacquer" id="bodyColorLacquer_veneer" value="veneer">
                            <label class="form-check-label" for="bodyColorLacquer">veneer</label>
                        </div>
                    </div>
                    <div id="bodyTexturesPicker" class="m-0 p-0"></div>
                </div>
            </div>
        </div>`,
        "onload": function () {
            let containerElemBodyColorsColors = document.getElementById("bodyColorPicker");
            addColors('bodyColor', ALLCOLORS.colors, containerElemBodyColorsColors);
            let containerElemBodyColorsTextures = document.getElementById("bodyTexturesPicker");
            addTextures('bodyColor', ALLCOLORS.colors, containerElemBodyColorsTextures);
        }
    }
    accordions.selectedComponentColor = {
        "title": "component color",
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