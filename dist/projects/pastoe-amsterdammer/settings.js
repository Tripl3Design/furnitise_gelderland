"use strict"
var UNITY_INSTANCE;
var ALLMODELS;
var ALLCOLORS;
var ALLCOMPONENTS;
var FEATUREDMODEL;

var DECORWALLINDEX = 0;
var DECORFLOORINDEX = 0;

const urlParams = new URLSearchParams(window.location.search);

function downloadPdf(model, mainImage, output) {
    let link = `${document.referrer}?brand=${brand}&product=${product}&data=${encodeURIComponent(JSON.stringify(model))}`;
    //let link = `https://furnitise.nl/demos?brand=${brand}&product=${product}&data=${encodeURIComponent(JSON.stringify(model))}`;
    let drawing;
    let svgWidth;
    let height;
    let width;
    let depth;
    if (model.type == "cabinet") {
        if (model.height == 170) {
            if (model.width == 37) {
                drawing = '<svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" width="55.1mm" height="85.17mm" viewBox="0 0 156.19 241.42"><g id="Laag_1"><rect x=".14" y=".31" width="2.27" height="240.94" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><rect x="50.32" y=".31" width="2.27" height="240.94" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><rect x="2.41" y="181.05" width="47.91" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="2.41" y="233.21" width="47.91" height="8.04" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><rect x="2.41" y="33.77" width="47.91" height="1.42" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.06,22.54c-.32,0-.57-.39-.57-.88h0c0-.48.26-.87.57-.87h42.62c.31,0,.57.39.57.87h0c0,.48-.26.88-.57.88H5.06Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.06,26.04c-.32,0-.57-.39-.57-.87h0c0-.48.26-.88.57-.88h42.62c.31,0,.57.39.57.88h0c0,.48-.26.87-.57.87H5.06Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.1,12.04c-.32,0-.57-.39-.57-.88h0c0-.48.26-.88.57-.88h42.62c.32,0,.57.4.57.88h0c0,.48-.26.88-.57.88H5.1Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.1,15.54c-.32,0-.57-.39-.57-.88h0c0-.48.26-.87.57-.87h42.62c.32,0,.57.39.57.87h0c0,.48-.26.88-.57.88H5.1Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.1,19.04c-.32,0-.57-.39-.57-.87h0c0-.48.26-.88.57-.88h42.62c.32,0,.57.39.57.88h0c0,.48-.26.87-.57.87H5.1Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.05,2.06c-.32,0-.57-.39-.57-.88h0c0-.48.25-.87.57-.87h42.62c.31,0,.57.39.57.87h0c0,.48-.26.88-.57.88H5.05Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.05,4.96c-.32,0-.57-.39-.57-.87h0c0-.49.25-.88.57-.88h42.62c.31,0,.57.39.57.88h0c0,.48-.26.87-.57.87H5.05Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.05,8.47c-.32,0-.57-.4-.57-.88h0c0-.48.25-.88.57-.88h42.62c.32,0,.57.39.57.88h0c0,.48-.26.88-.57.88H5.05Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.08,33.04c-.32,0-.57-.39-.57-.88h0c0-.48.26-.87.57-.87h42.62c.32,0,.57.39.57.87h0c0,.48-.26.88-.57.88H5.08Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.12,29.54c-.32,0-.57-.39-.57-.88h0c0-.48.26-.88.57-.88h42.62c.32,0,.57.4.57.88h0c0,.48-.26.88-.57.88H5.12Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="2.47" y="128.2" width="47.91" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="2.41" y="77.46" width="47.91" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m156.05,26.36c0-14.48-11.74-26.22-26.22-26.22s-26.22,11.74-26.22,26.22c0,.05,0,.11,0,.16h0v214.76h52.44V26.52h0c0-.05,0-.1,0-.16Z" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="4.48" y1="1.18" x2="2.41" y2="1.18" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><line x1="48.25" y1="1.18" x2="50.32" y2="1.18" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/></g></svg>';
                svgWidth = 55.1 * 2;
            }
            if (model.width == 55) {
                drawing = '<svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" width="64.1mm" height="85.17mm" viewBox="0 0 181.7 241.42"><g id="Laag_1"><rect x=".14" y=".31" width="2.27" height="240.94" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><rect x="75.83" y=".31" width="2.27" height="240.94" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><rect x="2.41" y="181.05" width="73.42" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="2.41" y="233.21" width="73.42" height="8.04" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><rect x="2.53" y="33.77" width="73.3" height="1.42" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m4.97,22.54c-.51,0-.91-.39-.91-.88h0c0-.48.41-.87.91-.87h67.84c.5,0,.91.39.91.87h0c0,.48-.41.88-.91.88H4.97Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m4.97,26.04c-.51,0-.91-.39-.91-.87h0c0-.48.41-.88.91-.88h67.84c.5,0,.91.39.91.88h0c0,.48-.41.87-.91.87H4.97Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.04,12.04c-.5,0-.91-.39-.91-.88h0c0-.48.41-.88.91-.88h67.84c.51,0,.91.4.91.88h0c0,.48-.41.88-.91.88H5.04Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.04,15.54c-.5,0-.91-.39-.91-.88h0c0-.48.41-.87.91-.87h67.84c.51,0,.91.39.91.87h0c0,.48-.41.88-.91.88H5.04Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.04,19.04c-.51,0-.91-.39-.91-.87h0c0-.48.41-.88.91-.88h67.84c.51,0,.91.39.91.88h0c0,.48-.41.87-.91.87H5.04Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m4.96,2.06c-.5,0-.91-.39-.91-.88h0c0-.48.4-.87.91-.87h67.85c.5,0,.91.39.91.87h0c0,.48-.41.88-.91.88H4.96Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m4.96,4.96c-.5,0-.91-.39-.91-.87h0c0-.49.4-.88.91-.88h67.85c.5,0,.91.39.91.88h0c0,.48-.41.87-.91.87H4.96Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m4.96,8.47c-.5,0-.91-.4-.91-.88h0c0-.48.4-.88.91-.88h67.84c.5,0,.91.39.91.88h0c0,.48-.41.88-.91.88H4.96Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5,33.04c-.51,0-.91-.39-.91-.88h0c0-.48.41-.87.91-.87h67.84c.5,0,.91.39.91.87h0c0,.48-.41.88-.91.88H5Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.07,29.54c-.5,0-.91-.39-.91-.88h0c0-.48.41-.88.91-.88h67.84c.5,0,.91.4.91.88h0c0,.48-.41.88-.91.88H5.07Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="2.41" y="128.2" width="73.48" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="2.41" y="77.46" width="73.42" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m181.56,26.36c0-14.48-11.74-26.22-26.22-26.22s-26.22,11.74-26.22,26.22c0,.05,0,.1,0,.16h0v214.76h52.44V26.52h0c0-.05,0-.1,0-.16Z" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="4.06" y1="1.18" x2="2.41" y2="1.18" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><line x1="73.72" y1="1.18" x2="75.83" y2="1.18" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/></g></svg>';
                svgWidth = 64.1 * 2;
            }
            if (model.width == 74) {
                drawing = '<svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" width="73.6mm" height="85.19mm" viewBox="0 0 208.63 241.49"><g id="Laag_1"><rect x=".14" y=".34" width="2.27" height="241.01" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><rect x="102.76" y=".31" width="2.27" height="240.94" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><rect x="2.41" y="181.05" width="100.33" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="2.41" y="233.21" width="100.33" height="8.04" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><rect x="2.41" y="128.2" width="100.42" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="2.41" y="77.45" width="100.33" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m208.49,26.36c0-14.48-11.74-26.22-26.22-26.22s-26.22,11.74-26.22,26.22c0,.05,0,.1,0,.16h0v214.76h52.44V26.52h0c0-.05,0-.1,0-.16Z" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="2.41" y="33.8" width="100.35" height="1.42" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.25,22.59c-.7,0-1.27-.4-1.27-.9h0c0-.5.57-.9,1.27-.9h94.53c.7,0,1.26.4,1.26.9h0c0,.5-.57.9-1.26.9H5.25Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.25,26.09c-.7,0-1.27-.4-1.27-.9h0c0-.5.57-.9,1.27-.9h94.53c.7,0,1.26.4,1.26.9h0c0,.5-.57.9-1.26.9H5.25Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.25,12.09c-.7,0-1.27-.4-1.27-.9h0c0-.5.57-.91,1.27-.91h94.61c.71,0,1.27.41,1.27.91h0c0,.5-.57.9-1.27.9H5.25Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.25,15.59c-.7,0-1.27-.41-1.27-.91h0c0-.5.57-.9,1.27-.9h94.61c.71,0,1.27.4,1.27.9h0c0,.5-.57.91-1.27.91H5.25Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.25,19.09c-.7,0-1.27-.4-1.27-.9h0c0-.5.57-.9,1.27-.9h94.61c.71,0,1.27.4,1.27.9h0c0,.5-.57.9-1.27.9H5.25Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.24,2.09c-.7,0-1.26-.39-1.26-.88h0c0-.48.56-.87,1.26-.87h94.53c.69,0,1.26.39,1.26.87h0c0,.48-.57.88-1.26.88H5.24Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.24,5.02c-.7,0-1.26-.41-1.26-.9h0c0-.5.56-.91,1.26-.91h94.53c.69,0,1.26.4,1.26.91h0c0,.49-.57.9-1.26.9H5.24Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.24,8.52c-.7,0-1.26-.41-1.26-.9h0c0-.5.56-.9,1.26-.9h94.53c.7,0,1.27.4,1.27.9h0c0,.5-.57.9-1.27.9H5.24Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.22,33.09c-.7,0-1.27-.41-1.27-.91h0c0-.5.57-.9,1.27-.9h94.59c.7,0,1.27.4,1.27.9h0c0,.5-.57.91-1.27.91H5.22Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.25,29.59c-.7,0-1.27-.4-1.27-.9h0c0-.5.57-.91,1.27-.91h94.66c.7,0,1.27.41,1.27.91h0c0,.5-.57.9-1.27.9H5.25Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="3.98" y1="1.21" x2="2.41" y2="1.21" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><line x1="101.04" y1="1.21" x2="102.76" y2="1.21" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/></g></svg>';
                svgWidth = 73.6;
            }
        }
        if (model.height == 205) {
            if (model.width == 37) {
                drawing = '<svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" width="55.1mm" height="102.6mm" viewBox="0 0 156.19 290.83"><g id="Laag_1"><rect x=".14" y=".14" width="2.27" height="290.55" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><rect x="2.41" y="230.49" width="47.91" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="2.41" y="282.65" width="47.91" height="8.04" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><rect x="2.41" y="33.6" width="47.91" height="1.42" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.06,22.37c-.32,0-.57-.39-.57-.88h0c0-.48.26-.87.57-.87h42.62c.31,0,.57.39.57.87h0c0,.48-.26.88-.57.88H5.06Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.06,25.87c-.32,0-.57-.39-.57-.87h0c0-.48.26-.88.57-.88h42.62c.31,0,.57.39.57.88h0c0,.48-.26.87-.57.87H5.06Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.1,11.87c-.32,0-.57-.39-.57-.88h0c0-.48.26-.88.57-.88h42.62c.32,0,.57.4.57.88h0c0,.48-.26.88-.57.88H5.1Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.1,15.37c-.32,0-.57-.39-.57-.88h0c0-.48.26-.87.57-.87h42.62c.32,0,.57.39.57.87h0c0,.48-.26.88-.57.88H5.1Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.1,18.87c-.32,0-.57-.39-.57-.87h0c0-.48.26-.88.57-.88h42.62c.32,0,.57.39.57.88h0c0,.48-.26.87-.57.87H5.1Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.05,1.89c-.32,0-.57-.39-.57-.88h0c0-.48.25-.87.57-.87h42.62c.31,0,.57.39.57.87h0c0,.48-.26.88-.57.88H5.05Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.05,4.79c-.32,0-.57-.39-.57-.87h0c0-.49.25-.88.57-.88h42.62c.31,0,.57.39.57.88h0c0,.48-.26.87-.57.87H5.05Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.05,8.3c-.32,0-.57-.4-.57-.88h0c0-.48.25-.88.57-.88h42.62c.32,0,.57.39.57.88h0c0,.48-.26.88-.57.88H5.05Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.08,32.87c-.32,0-.57-.39-.57-.88h0c0-.48.26-.87.57-.87h42.62c.32,0,.57.39.57.87h0c0,.48-.26.88-.57.88H5.08Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.12,29.37c-.32,0-.57-.39-.57-.88h0c0-.48.26-.88.57-.88h42.62c.32,0,.57.4.57.88h0c0,.48-.26.88-.57.88H5.12Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="2.47" y="177.64" width="47.91" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="2.41" y="126.89" width="47.91" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m156.05,26.83c0-14.48-11.74-26.22-26.22-26.22s-26.22,11.74-26.22,26.22c0,.05,0,.1,0,.16h0v263.7h52.44V26.99h0c0-.05,0-.1,0-.16Z" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="50.32" y=".14" width="2.27" height="290.55" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><rect x="2.41" y="74.76" width="47.91" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="4.48" y1="1.01" x2="2.41" y2="1.01" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><line x1="48.25" y1="1.01" x2="50.32" y2="1.01" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/></g></svg>';
                svgWidth = 55.1 * 2;
            }
            if (model.width == 55) {
                drawing = '<svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" width="64.1mm" height="102.6mm" viewBox="0 0 181.83 290.83"><g id="Laag_1"><path d="m181.69,26.83c0-14.48-11.74-26.22-26.22-26.22s-26.22,11.74-26.22,26.22c0,.05,0,.1,0,.16h0v263.7h52.44V26.99h0c0-.05,0-.1,0-.16Z" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x=".14" y=".14" width="2.27" height="290.55" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><rect x="2.41" y="230.49" width="73.55" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="2.41" y="282.65" width="73.55" height="8.04" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><rect x="2.41" y="177.64" width="73.61" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="2.41" y="126.89" width="73.55" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="75.96" y=".14" width="2.27" height="290.55" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><rect x="2.41" y="74.76" width="73.55" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="2.41" y="33.6" width="73.55" height="1.42" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.09,22.37c-.51,0-.91-.39-.91-.88h0c0-.48.41-.87.91-.87h67.84c.5,0,.91.39.91.87h0c0,.48-.41.88-.91.88H5.09Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.09,25.87c-.51,0-.91-.39-.91-.87h0c0-.48.41-.88.91-.88h67.84c.5,0,.91.39.91.88h0c0,.48-.41.87-.91.87H5.09Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.16,11.87c-.5,0-.91-.39-.91-.88h0c0-.48.41-.88.91-.88h67.84c.51,0,.91.4.91.88h0c0,.48-.41.88-.91.88H5.16Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.16,15.37c-.5,0-.91-.39-.91-.88h0c0-.48.41-.87.91-.87h67.84c.51,0,.91.39.91.87h0c0,.48-.41.88-.91.88H5.16Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.16,18.87c-.51,0-.91-.39-.91-.87h0c0-.48.41-.88.91-.88h67.84c.51,0,.91.39.91.88h0c0,.48-.41.87-.91.87H5.16Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.08,1.89c-.5,0-.91-.39-.91-.88h0c0-.48.4-.87.91-.87h67.85c.5,0,.91.39.91.87h0c0,.48-.41.88-.91.88H5.08Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.08,4.79c-.5,0-.91-.39-.91-.87h0c0-.49.4-.88.91-.88h67.85c.5,0,.91.39.91.88h0c0,.48-.41.87-.91.87H5.08Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.08,8.3c-.5,0-.91-.4-.91-.88h0c0-.48.4-.88.91-.88h67.84c.5,0,.91.39.91.88h0c0,.48-.41.88-.91.88H5.08Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.12,32.87c-.51,0-.91-.39-.91-.88h0c0-.48.41-.87.91-.87h67.84c.5,0,.91.39.91.87h0c0,.48-.41.88-.91.88H5.12Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.19,29.37c-.5,0-.91-.39-.91-.88h0c0-.48.41-.88.91-.88h67.84c.5,0,.91.4.91.88h0c0,.48-.41.88-.91.88H5.19Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="4.24" y1="1.01" x2="2.41" y2="1.01" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><line x1="73.94" y1="1.01" x2="75.96" y2="1.01" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/></g></svg>';
                svgWidth = 64.1 * 2;
            }
            if (model.width == 74) {
                drawing = '<svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" width="73.6mm" height="102.6mm" viewBox="0 0 208.63 290.83"><g id="Laag_1"><rect x=".14" y=".14" width="2.27" height="290.55" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><rect x="2.41" y="230.49" width="100.35" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="2.41" y="282.65" width="100.35" height="8.04" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><rect x="2.41" y="177.64" width="100.41" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="2.41" y="126.89" width="100.35" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m208.49,26.83c0-14.48-11.74-26.22-26.22-26.22s-26.22,11.74-26.22,26.22c0,.05,0,.1,0,.16h0v263.7h52.44V26.99h0c0-.05,0-.1,0-.16Z" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="102.76" y=".14" width="2.27" height="290.55" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><rect x="2.41" y="74.76" width="100.35" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="2.41" y="33.61" width="100.35" height="1.42" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.25,22.4c-.7,0-1.27-.4-1.27-.9h0c0-.5.57-.9,1.27-.9h94.53c.7,0,1.26.4,1.26.9h0c0,.5-.57.9-1.26.9H5.25Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.25,25.9c-.7,0-1.27-.4-1.27-.9h0c0-.5.57-.9,1.27-.9h94.53c.7,0,1.26.4,1.26.9h0c0,.5-.57.9-1.26.9H5.25Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.25,11.91c-.7,0-1.27-.4-1.27-.9h0c0-.5.57-.91,1.27-.91h94.61c.71,0,1.27.41,1.27.91h0c0,.5-.57.9-1.27.9H5.25Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.25,15.41c-.7,0-1.27-.41-1.27-.91h0c0-.5.57-.9,1.27-.9h94.61c.71,0,1.27.4,1.27.9h0c0,.5-.57.91-1.27.91H5.25Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.25,18.9c-.71,0-1.27-.4-1.27-.9h0c0-.5.57-.9,1.27-.9h94.61c.71,0,1.27.4,1.27.9h0c0,.5-.57.9-1.27.9H5.25Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.24,1.9c-.7,0-1.26-.39-1.26-.88h0c0-.48.56-.87,1.26-.87h94.53c.69,0,1.26.39,1.26.87h0c0,.48-.57.88-1.26.88H5.24Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.24,4.83c-.7,0-1.26-.41-1.26-.9h0c0-.5.56-.91,1.26-.91h94.53c.69,0,1.26.4,1.26.91h0c0,.49-.57.9-1.26.9H5.24Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.24,8.33c-.7,0-1.26-.41-1.26-.91h0c0-.5.56-.9,1.26-.9h94.53c.7,0,1.27.4,1.27.9h0c0,.5-.57.91-1.27.91H5.24Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.22,32.91c-.7,0-1.27-.41-1.27-.91h0c0-.5.57-.9,1.27-.9h94.59c.7,0,1.27.4,1.27.9h0c0,.5-.57.91-1.27.91H5.22Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.25,29.41c-.7,0-1.27-.4-1.27-.9h0c0-.5.57-.91,1.27-.91h94.66c.7,0,1.27.41,1.27.91h0c0,.5-.57.9-1.27.9H5.25Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="3.98" y1="1.03" x2="2.41" y2="1.03" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><line x1="101.04" y1="1.03" x2="102.76" y2="1.03" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/></g></svg>';
                svgWidth = 73.6 * 2;
            }
        }
        if (model.height == 221) {
            if (model.width == 37) {
                drawing = '<svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" width="55.1mm" height="110.6mm" viewBox="0 0 156.19 313.51"><g id="Laag_1"><rect x=".14" y=".14" width="2.27" height="313.23" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><rect x="2.47" y="256.34" width="47.91" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="2.41" y="305.33" width="47.91" height="8.04" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><rect x="2.41" y="33.6" width="47.91" height="1.42" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.06,22.37c-.32,0-.57-.39-.57-.88h0c0-.48.26-.87.57-.87h42.62c.31,0,.57.39.57.87h0c0,.48-.26.88-.57.88H5.06Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.06,25.87c-.32,0-.57-.39-.57-.87h0c0-.48.26-.88.57-.88h42.62c.31,0,.57.39.57.88h0c0,.48-.26.87-.57.87H5.06Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.1,11.87c-.32,0-.57-.39-.57-.88h0c0-.48.26-.88.57-.88h42.62c.32,0,.57.4.57.88h0c0,.48-.26.88-.57.88H5.1Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.1,15.37c-.32,0-.57-.39-.57-.88h0c0-.48.26-.87.57-.87h42.62c.32,0,.57.39.57.87h0c0,.48-.26.88-.57.88H5.1Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.1,18.87c-.32,0-.57-.39-.57-.87h0c0-.48.26-.88.57-.88h42.62c.32,0,.57.39.57.88h0c0,.48-.26.87-.57.87H5.1Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.05,1.89c-.32,0-.57-.39-.57-.88h0c0-.48.25-.87.57-.87h42.62c.31,0,.57.39.57.87h0c0,.48-.26.88-.57.88H5.05Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.05,4.79c-.32,0-.57-.39-.57-.87h0c0-.49.25-.88.57-.88h42.62c.31,0,.57.39.57.88h0c0,.48-.26.87-.57.87H5.05Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.05,8.3c-.32,0-.57-.4-.57-.88h0c0-.48.25-.88.57-.88h42.62c.32,0,.57.39.57.88h0c0,.48-.26.88-.57.88H5.05Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.08,32.87c-.32,0-.57-.39-.57-.88h0c0-.48.26-.87.57-.87h42.62c.32,0,.57.39.57.87h0c0,.48-.26.88-.57.88H5.08Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.12,29.37c-.32,0-.57-.39-.57-.88h0c0-.48.26-.88.57-.88h42.62c.32,0,.57.4.57.88h0c0,.48-.26.88-.57.88H5.12Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="2.47" y="200.84" width="47.91" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="2.41" y="126.42" width="47.91" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m156.05,26.36c0-14.48-11.74-26.22-26.22-26.22s-26.22,11.74-26.22,26.22c0,.05,0,.1,0,.16h0v286.85h52.44V26.52h0c0-.05,0-.1,0-.16Z" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="50.32" y=".14" width="2.27" height="313.23" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><rect x="2.41" y="74.29" width="47.91" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="4.48" y1="1.01" x2="2.41" y2="1.01" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><line x1="48.25" y1="1.01" x2="50.32" y2="1.01" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><rect x="2.47" y="142.57" width="47.91" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/></g></svg>';
                svgWidth = 55.1 * 2;
            }
            if (model.width == 55) {
                drawing = '<svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" width="64.1mm" height="110.6mm" viewBox="0 0 181.7 313.51"><g id="Laag_1"><rect x=".14" y=".14" width="2.27" height="313.23" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><rect x="2.41" y="256.34" width="73.48" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="2.41" y="305.33" width="73.42" height="8.04" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><rect x="2.41" y="200.84" width="73.48" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="2.41" y="126.42" width="73.42" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m181.56,26.36c0-14.48-11.74-26.22-26.22-26.22s-26.22,11.74-26.22,26.22c0,.05,0,.1,0,.16h0v286.85h52.44V26.52h0c0-.05,0-.1,0-.16Z" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="75.83" y=".14" width="2.27" height="313.23" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><rect x="2.41" y="74.29" width="73.42" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="2.41" y="142.57" width="73.48" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="2.41" y="33.6" width="73.42" height="1.42" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.15,22.37c-.51,0-.91-.39-.91-.88h0c0-.48.41-.87.91-.87h67.84c.5,0,.91.39.91.87h0c0,.48-.41.88-.91.88H5.15Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.15,25.87c-.51,0-.91-.39-.91-.87h0c0-.48.41-.88.91-.88h67.84c.5,0,.91.39.91.88h0c0,.48-.41.87-.91.87H5.15Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.21,11.87c-.5,0-.91-.39-.91-.88h0c0-.48.41-.88.91-.88h67.84c.51,0,.91.4.91.88h0c0,.48-.41.88-.91.88H5.21Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.21,15.37c-.5,0-.91-.39-.91-.88h0c0-.48.41-.87.91-.87h67.84c.51,0,.91.39.91.87h0c0,.48-.41.88-.91.88H5.21Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.21,18.87c-.51,0-.91-.39-.91-.87h0c0-.48.41-.88.91-.88h67.84c.51,0,.91.39.91.88h0c0,.48-.41.87-.91.87H5.21Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.14,1.89c-.5,0-.91-.39-.91-.88h0c0-.48.4-.87.91-.87h67.85c.5,0,.91.39.91.87h0c0,.48-.41.88-.91.88H5.14Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.14,4.79c-.5,0-.91-.39-.91-.87h0c0-.49.4-.88.91-.88h67.85c.5,0,.91.39.91.88h0c0,.48-.41.87-.91.87H5.14Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.14,8.3c-.5,0-.91-.4-.91-.88h0c0-.48.4-.88.91-.88h67.84c.5,0,.91.39.91.88h0c0,.48-.41.88-.91.88H5.14Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.18,32.87c-.51,0-.91-.39-.91-.88h0c0-.48.41-.87.91-.87h67.84c.5,0,.91.39.91.87h0c0,.48-.41.88-.91.88H5.18Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.25,29.37c-.5,0-.91-.39-.91-.88h0c0-.48.41-.88.91-.88h67.84c.5,0,.91.4.91.88h0c0,.48-.41.88-.91.88H5.25Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="4.24" y1="1.01" x2="2.41" y2="1.01" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="73.9" y1="1.01" x2="75.83" y2="1.01" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/></g></svg>';
                svgWidth = 64.1 * 2;
            }
            if (model.width == 74) {
                drawing = '<svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" width="73.6mm" height="110.6mm" viewBox="0 0 208.63 313.51"><g id="Laag_1"><rect x=".14" y=".14" width="2.27" height="313.23" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><rect x="2.41" y="256.34" width="100.41" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="2.44" y="305.33" width="100.35" height="8.04" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><rect x="2.41" y="200.84" width="100.41" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="2.41" y="126.42" width="100.35" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m208.49,26.36c0-14.48-11.74-26.22-26.22-26.22s-26.22,11.74-26.22,26.22c0,.05,0,.1,0,.16h0v286.85h52.44V26.52h0c0-.05,0-.1,0-.16Z" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="102.76" y=".14" width="2.27" height="313.23" style="fill:none; stroke:#231f20; stroke-miterlimit:10; stroke-width:.28px;"/><rect x="2.41" y="74.29" width="100.35" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="2.41" y="142.57" width="100.41" height="2.27" style="fill:none; stroke:#000; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="2.41" y="35.46" width="100.35" height="1.42" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.24,22.37c-.7,0-1.27-.39-1.27-.88h0c0-.48.56-.87,1.27-.87h94.2c.69,0,1.26.39,1.26.87h0c0,.48-.57.88-1.26.88H5.24Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.24,25.87c-.7,0-1.27-.39-1.27-.87h0c0-.48.56-.88,1.27-.88h94.2c.69,0,1.26.39,1.26.88h0c0,.48-.57.87-1.26.87H5.24Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.33,11.87c-.7,0-1.26-.39-1.26-.88h0c0-.48.57-.88,1.26-.88h94.19c.7,0,1.27.4,1.27.88h0c0,.48-.57.88-1.27.88H5.33Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.33,15.37c-.7,0-1.26-.39-1.26-.88h0c0-.48.57-.87,1.26-.87h94.19c.7,0,1.27.39,1.27.87h0c0,.48-.57.88-1.27.88H5.33Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.33,18.87c-.7,0-1.27-.39-1.27-.87h0c0-.48.57-.88,1.27-.88h94.19c.7,0,1.27.39,1.27.88h0c0,.48-.57.87-1.27.87H5.33Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.24,1.89c-.7,0-1.26-.39-1.26-.88h0c0-.48.56-.87,1.26-.87h94.2c.69,0,1.26.39,1.26.87h0c0,.48-.57.88-1.26.88H5.24Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.24,4.79c-.7,0-1.26-.39-1.26-.87h0c0-.49.56-.88,1.26-.88h94.2c.69,0,1.26.39,1.26.88h0c0,.48-.57.87-1.26.87H5.24Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.24,8.3c-.7,0-1.26-.4-1.26-.88h0c0-.48.56-.88,1.26-.88h94.2c.7,0,1.27.39,1.27.88h0c0,.48-.57.88-1.27.88H5.24Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.29,32.87c-.7,0-1.27-.39-1.27-.88h0c0-.48.57-.87,1.27-.87h94.2c.7,0,1.27.39,1.27.87h0c0,.48-.57.88-1.27.88H5.29Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m5.38,29.37c-.7,0-1.26-.39-1.26-.88h0c0-.48.57-.88,1.26-.88h94.2c.7,0,1.26.4,1.26.88h0c0,.48-.57.88-1.26.88H5.38Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="3.98" y1="1.01" x2="2.41" y2="1.01" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="100.7" y1="1.01" x2="102.76" y2="1.01" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/></g></svg>';
                svgWidth = 73.6 * 2;
            }
        }
        height = model.height;
        width = model.width;
        depth = 37;
    }
    if (model.type == "sideboard") {
        if (model.width == 156) {
            drawing = '<svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" width="115.55mm" height="37.61mm" viewBox="0 0 327.54 106.6"><g id="Laag_1"><polygon points=".61 104.47 221.73 104.47 218.88 106.46 3.46 106.46 .61 104.47" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x=".61" y="102.32" width="221.12" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><polygon points="221.73 2.14 .61 2.14 3.46 .16 218.88 .16 221.73 2.14" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x=".61" y="2.14" width="221.12" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="33.6" y="4.2" width="1.42" height="98.12" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="186.85" y="4.2" width="1.42" height="98.12" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="134.09" y="4.2" width="2.27" height="98.03" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="35.02" y="52.08" width="99.07" height="2.27" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="1.02" y1="101.35" x2="1.02" y2="102.21" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="136.36" y="52.08" width="50.49" height="2.27" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m21.49,5.08c-.48,0-.87.29-.87.65v94.98c0,.35.39.63.87.63s.88-.29.88-.63V5.73c0-.36-.39-.65-.88-.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m24.99,5.08c-.48,0-.88.29-.88.65v94.98c0,.35.39.63.88.63s.87-.29.87-.63V5.73c0-.36-.39-.65-.87-.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m10.99,5.03c-.48,0-.87.29-.87.65v94.98c0,.35.39.63.87.63s.88-.28.88-.63V5.68c0-.36-.39-.65-.88-.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m14.49,5.03c-.48,0-.88.29-.88.65v94.98c0,.35.39.63.88.63s.87-.28.87-.63V5.68c0-.36-.39-.65-.87-.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m17.99,5.03c-.48,0-.88.29-.88.65v94.99c0,.35.4.63.88.63s.88-.28.88-.63V5.68c0-.36-.39-.65-.88-.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m1.02,5.08c-.48,0-.88.29-.88.65v94.98c0,.35.39.63.88.63s.87-.28.87-.63V5.73c0-.36-.39-.65-.87-.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m3.92,5.01c-.48,0-.88.29-.88.65v94.98c0,.35.39.63.88.63s.87-.28.87-.63V5.66c0-.36-.39-.65-.87-.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m7.42,5.08c-.48,0-.87.29-.87.65v94.98c0,.35.39.63.87.63s.88-.28.88-.63V5.73c0-.36-.39-.65-.88-.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m31.99,5.06c-.48,0-.88.29-.88.65v94.99c0,.35.39.63.88.63s.87-.28.87-.63V5.7c0-.36-.39-.65-.87-.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m28.49,5.01c-.48,0-.87.3-.87.65v94.98c0,.35.39.63.87.63s.88-.28.88-.63V5.66c0-.36-.39-.65-.88-.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="1" y1="4.2" x2="1" y2="5.07" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m200.38,101.44c.48,0,.87-.29.87-.65V5.81c0-.35-.39-.63-.87-.63s-.88.29-.88.63v94.98c0,.36.39.65.88.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m196.88,101.44c.48,0,.88-.29.88-.65V5.81c0-.35-.39-.63-.88-.63s-.87.29-.87.63v94.98c0,.36.39.65.87.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m210.88,101.49c.48,0,.87-.29.87-.65V5.86c0-.35-.39-.63-.87-.63s-.88.28-.88.63v94.98c0,.36.39.65.88.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m207.38,101.49c.48,0,.88-.29.88-.65V5.86c0-.35-.39-.63-.88-.63s-.87.28-.87.63v94.98c0,.36.39.65.87.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m203.88,101.49c.48,0,.88-.29.88-.65V5.86c0-.35-.4-.63-.88-.63s-.88.28-.88.63v94.99c0,.36.39.65.88.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m220.86,101.44c.48,0,.88-.29.88-.65V5.81c0-.35-.39-.63-.88-.63s-.87.28-.87.63v94.98c0,.36.39.65.87.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m217.96,101.52c.48,0,.88-.29.88-.66V5.88c0-.35-.39-.63-.88-.63s-.87.28-.87.63v94.98c0,.36.39.66.87.66Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m214.46,101.44c.48,0,.87-.29.87-.65V5.81c0-.35-.39-.63-.87-.63s-.88.28-.88.63v94.98c0,.36.39.65.88.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m189.88,101.47c.48,0,.88-.29.88-.65V5.83c0-.35-.39-.63-.88-.63s-.87.28-.87.63v94.99c0,.36.39.65.87.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m193.38,101.52c.48,0,.87-.3.87-.65V5.88c0-.35-.39-.63-.87-.63s-.88.28-.88.63v94.98c0,.36.39.65.88.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="220.86" y1="5.18" x2="220.86" y2="4.29" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="220.86" y1="101.44" x2="220.86" y2="102.32" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><polygon points="327.29 2.12 273.06 2.12 275.82 .14 324.45 .14 327.29 2.12" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="273.06" y="2.12" width="54.34" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="273.06" y="102.23" width="54.34" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><polygon points="273.06 104.38 327.29 104.38 324.52 106.37 275.89 106.37 273.06 104.38" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="326.52" y1="101.41" x2="326.52" y2="102.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="273.93" y1="101.36" x2="273.93" y2="102.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m305.44,5.26c-.48,0-.88.28-.88.64v94.81c0,.36.39.65.88.65s.87-.29.87-.65V5.9c0-.35-.39-.64-.87-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m301.94,5.26c-.48,0-.87.28-.87.64v94.81c0,.36.39.65.87.65s.88-.29.88-.65V5.9c0-.35-.39-.64-.88-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m315.94,5.31c-.48,0-.88.29-.88.64v94.81c0,.36.39.65.88.65s.88-.29.88-.65V5.95c0-.35-.4-.64-.88-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m312.44,5.31c-.48,0-.88.29-.88.64v94.81c0,.36.39.65.88.65s.87-.29.87-.65V5.95c0-.35-.39-.64-.87-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m308.94,5.31c-.48,0-.87.28-.87.64v94.81c0,.36.39.65.87.65s.88-.29.88-.65V5.95c0-.35-.39-.64-.88-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m326.52,5.31c-.48,0-.88.28-.88.63v94.82c0,.35.39.65.88.65s.87-.29.87-.65V5.94c0-.35-.39-.63-.87-.63Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m323.01,5.26c-.48,0-.87.28-.87.63v94.82c0,.35.39.65.87.65s.88-.29.88-.65V5.9c0-.35-.39-.63-.88-.63Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m319.52,5.26c-.48,0-.88.28-.88.63v94.81c0,.36.4.65.88.65s.88-.29.88-.65V5.9c0-.35-.39-.63-.88-.63Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m294.94,5.28c-.48,0-.88.28-.88.64v94.81c0,.36.39.65.88.65s.87-.29.87-.65V5.92c0-.35-.39-.64-.87-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m298.44,5.33c-.48,0-.88.29-.88.64v94.82c0,.36.39.65.88.65s.88-.29.88-.65V5.97c0-.35-.4-.64-.88-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m287.94,5.25c-.48,0-.88.28-.88.64v94.81c0,.36.39.65.88.65s.87-.29.87-.65V5.89c0-.35-.39-.64-.87-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m284.44,5.25c-.48,0-.87.28-.87.64v94.81c0,.36.39.65.87.65s.88-.29.88-.65V5.89c0-.35-.39-.64-.88-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m291.44,5.29c-.48,0-.87.28-.87.64v94.81c0,.36.39.65.87.65s.88-.29.88-.65V5.93c0-.35-.39-.64-.88-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m277.44,5.27c-.48,0-.88.28-.88.64v94.81c0,.36.39.65.88.65s.87-.29.87-.65V5.91c0-.35-.39-.64-.87-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m280.94,5.32c-.48,0-.88.29-.88.64v94.82c0,.36.39.65.88.65s.88-.29.88-.65V5.96c0-.35-.4-.64-.88-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m273.93,5.25c-.48,0-.88.29-.88.64v94.81c0,.36.39.65.88.65s.88-.29.88-.65V5.88c0-.35-.4-.64-.88-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="273.93" y1="5.25" x2="273.93" y2="4.27" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="326.52" y1="5.31" x2="326.52" y2="4.27" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/></g></svg>';
            svgWidth = 115.55 * 2;
        }
        if (model.width == 194) {
            drawing = '<svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" width="134.31mm" height="37.61mm" viewBox="0 0 380.72 106.6"><g id="Laag_1"><rect x=".26" y="102.32" width="274.65" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x=".26" y="2.14" width="274.65" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="240.04" y="4.2" width="1.42" height="98.12" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="136.61" y="4.2" width="2.27" height="98.03" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="35.02" y="52.08" width="101.59" height="2.27" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="138.88" y="52.08" width="101.16" height="2.27" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="33.6" y="4.2" width="1.42" height="98.12" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m21.49,5.08c-.48,0-.87.29-.87.65v94.98c0,.35.39.63.87.63s.88-.29.88-.63V5.73c0-.36-.39-.65-.88-.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m24.99,5.08c-.48,0-.88.29-.88.65v94.98c0,.35.39.63.88.63s.87-.29.87-.63V5.73c0-.36-.39-.65-.87-.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m10.99,5.03c-.48,0-.87.29-.87.65v94.98c0,.35.39.63.87.63s.88-.28.88-.63V5.68c0-.36-.39-.65-.88-.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m14.49,5.03c-.48,0-.88.29-.88.65v94.98c0,.35.39.63.88.63s.87-.28.87-.63V5.68c0-.36-.39-.65-.87-.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m17.99,5.03c-.48,0-.88.29-.88.65v94.99c0,.35.4.63.88.63s.88-.28.88-.63V5.68c0-.36-.39-.65-.88-.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m1.02,5.08c-.48,0-.88.29-.88.65v94.98c0,.35.39.63.88.63s.87-.28.87-.63V5.73c0-.36-.39-.65-.87-.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m3.92,5.01c-.48,0-.88.29-.88.65v94.98c0,.35.39.63.88.63s.87-.28.87-.63V5.66c0-.36-.39-.65-.87-.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m7.42,5.08c-.48,0-.87.29-.87.65v94.98c0,.35.39.63.87.63s.88-.28.88-.63V5.73c0-.36-.39-.65-.88-.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m31.99,5.06c-.48,0-.88.29-.88.65v94.99c0,.35.39.63.88.63s.87-.28.87-.63V5.7c0-.36-.39-.65-.87-.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m28.49,5.01c-.48,0-.87.3-.87.65v94.98c0,.35.39.63.87.63s.88-.28.88-.63V5.66c0-.36-.39-.65-.88-.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m253.57,101.44c.48,0,.87-.29.87-.65V5.81c0-.35-.39-.63-.87-.63s-.88.29-.88.63v94.98c0,.36.39.65.88.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m250.07,101.44c.48,0,.88-.29.88-.65V5.81c0-.35-.39-.63-.88-.63s-.87.29-.87.63v94.98c0,.36.39.65.87.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m264.07,101.49c.48,0,.87-.29.87-.65V5.86c0-.35-.39-.63-.87-.63s-.88.28-.88.63v94.98c0,.36.39.65.88.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m260.57,101.49c.48,0,.88-.29.88-.65V5.86c0-.35-.39-.63-.88-.63s-.87.28-.87.63v94.98c0,.36.39.65.87.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m257.07,101.49c.48,0,.88-.29.88-.65V5.86c0-.35-.4-.63-.88-.63s-.88.28-.88.63v94.99c0,.36.39.65.88.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m274.04,101.44c.48,0,.88-.29.88-.65V5.81c0-.35-.39-.63-.88-.63s-.87.28-.87.63v94.98c0,.36.39.65.87.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m271.14,101.52c.48,0,.88-.29.88-.66V5.88c0-.35-.39-.63-.88-.63s-.87.28-.87.63v94.98c0,.36.39.66.87.66Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m267.64,101.44c.48,0,.87-.29.87-.65V5.81c0-.35-.39-.63-.87-.63s-.88.28-.88.63v94.98c0,.36.39.65.88.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m243.07,101.47c.48,0,.88-.29.88-.65V5.83c0-.35-.39-.63-.88-.63s-.87.28-.87.63v94.99c0,.36.39.65.87.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m246.57,101.52c.48,0,.87-.3.87-.65V5.88c0-.35-.39-.63-.87-.63s-.88.28-.88.63v94.98c0,.36.39.65.88.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="274.04" y1="5.18" x2="274.04" y2="4.29" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="274.04" y1="101.44" x2="274.04" y2="102.32" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><polygon points="380.47 2.12 326.24 2.12 329.01 .14 377.63 .14 380.47 2.12" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="326.24" y="2.12" width="54.34" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="326.24" y="102.23" width="54.34" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><polygon points="326.24 104.38 380.47 104.38 377.71 106.37 329.08 106.37 326.24 104.38" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="379.71" y1="101.41" x2="379.71" y2="102.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="327.12" y1="101.36" x2="327.12" y2="102.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m358.63,5.26c-.48,0-.88.28-.88.64v94.81c0,.36.39.65.88.65s.87-.29.87-.65V5.9c0-.35-.39-.64-.87-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m355.13,5.26c-.48,0-.87.28-.87.64v94.81c0,.36.39.65.87.65s.88-.29.88-.65V5.9c0-.35-.39-.64-.88-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m369.13,5.31c-.48,0-.88.29-.88.64v94.81c0,.36.39.65.88.65s.88-.29.88-.65V5.95c0-.35-.4-.64-.88-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m365.63,5.31c-.48,0-.88.29-.88.64v94.81c0,.36.39.65.88.65s.87-.29.87-.65V5.95c0-.35-.39-.64-.87-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m362.13,5.31c-.48,0-.87.28-.87.64v94.81c0,.36.39.65.87.65s.88-.29.88-.65V5.95c0-.35-.39-.64-.88-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m379.71,5.31c-.48,0-.88.28-.88.63v94.82c0,.35.39.65.88.65s.87-.29.87-.65V5.94c0-.35-.39-.63-.87-.63Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m376.2,5.26c-.48,0-.87.28-.87.63v94.82c0,.35.39.65.87.65s.88-.29.88-.65V5.9c0-.35-.39-.63-.88-.63Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m372.7,5.26c-.48,0-.88.28-.88.63v94.81c0,.36.4.65.88.65s.88-.29.88-.65V5.9c0-.35-.39-.63-.88-.63Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m348.13,5.28c-.48,0-.88.28-.88.64v94.81c0,.36.39.65.88.65s.87-.29.87-.65V5.92c0-.35-.39-.64-.87-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m351.63,5.33c-.48,0-.88.29-.88.64v94.82c0,.36.39.65.88.65s.88-.29.88-.65V5.97c0-.35-.4-.64-.88-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m341.13,5.25c-.48,0-.88.28-.88.64v94.81c0,.36.39.65.88.65s.87-.29.87-.65V5.89c0-.35-.39-.64-.87-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m337.63,5.25c-.48,0-.87.28-.87.64v94.81c0,.36.39.65.87.65s.88-.29.88-.65V5.89c0-.35-.39-.64-.88-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m344.63,5.29c-.48,0-.87.28-.87.64v94.81c0,.36.39.65.87.65s.88-.29.88-.65V5.93c0-.35-.39-.64-.88-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m330.63,5.27c-.48,0-.88.28-.88.64v94.81c0,.36.39.65.88.65s.87-.29.87-.65V5.91c0-.35-.39-.64-.87-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m334.13,5.32c-.48,0-.88.29-.88.64v94.82c0,.36.39.65.88.65s.88-.29.88-.65V5.96c0-.35-.4-.64-.88-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m327.12,5.25c-.48,0-.88.29-.88.64v94.81c0,.36.39.65.88.65s.88-.29.88-.65V5.88c0-.35-.4-.64-.88-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="327.12" y1="5.25" x2="327.12" y2="4.27" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="379.71" y1="5.31" x2="379.71" y2="4.27" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><polygon points="272.07 .16 218.41 .16 56.65 .16 2.99 .16 .14 2.14 53.79 2.14 221.26 2.14 274.92 2.14 272.07 .16" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><polygon points="221.39 104.47 53.79 104.47 .26 104.47 3.12 106.46 56.65 106.46 218.54 106.46 272.07 106.46 274.92 104.47 221.39 104.47" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="1.02" y1="5.08" x2="1.02" y2="4.29" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="1.02" y1="101.35" x2="1.02" y2="102.32" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/></g></svg>';
            svgWidth = 134.31 * 2;
        }
        height = model.height;
        width = model.width;
        depth = 37;
    }
    if (model.type == "sideboardOnFrame") {
        if (model.width == 156) {
            if (model.interior == 'one') {
                drawing = '<svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" width="115.55mm" height="37.45mm" viewBox="0 0 327.54 106.14"><g id="Laag_1"><polygon points=".61 52.19 221.73 52.19 218.88 54.17 3.46 54.17 .61 52.19" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x=".61" y="50.04" width="221.12" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><polygon points="221.73 2.3 .61 2.3 3.46 .31 218.88 .31 221.73 2.3" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x=".61" y="2.3" width="221.12" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="33.6" y="4.43" width="1.42" height="45.61" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m22.37,48.49c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.87c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m25.86,48.49c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.87c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m11.87,48.44c0,.32-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.82c0-.31.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m15.37,48.44c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.82c0-.31.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m18.87,48.45c0,.32-.39.57-.88.57h0c-.48,0-.88-.26-.88-.57V5.82c0-.31.4-.57.88-.57h0c.48,0,.88.26.88.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m1.89,48.49c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.87c0-.32.39-.58.88-.58h0c.48,0,.87.26.87.58v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m4.79,48.49c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.87c0-.32.39-.58.88-.58h0c.48,0,.87.26.87.58v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m8.29,48.49c0,.32-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.87c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m32.87,48.47c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.85c0-.32.39-.57.88-.57h0c.48,0,.87.25.87.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m29.37,48.42c0,.32-.39.57-.88.57h0c-.48,0-.87-.25-.87-.57V5.8c0-.31.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="186.85" y="4.45" width="1.42" height="45.59" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m199.5,5.94c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.94Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m196,5.94c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.94Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m210,5.98c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V5.98Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m206.5,5.98c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.98Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m203.01,5.98c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.98Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m219.98,5.93c0-.32.39-.57.88-.57h0c.48,0,.87.25.87.57v42.62c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.93Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m217.08,5.93c0-.32.39-.57.87-.57h0c.49,0,.88.25.88.57v42.62c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.93Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m213.58,5.93c0-.32.4-.57.88-.57h0c.48,0,.88.25.88.57v42.62c0,.32-.39.57-.88.57h0c-.48,0-.88-.26-.88-.57V5.93Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m189,5.96c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.96Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m192.5,6c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V6Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="134.09" y="4.54" width="2.27" height="45.41" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="35.02" y="25.78" width="99.07" height="2.27" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="32.93" y="54.17" width="2.83" height="51.83" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="186.1" y="54.17" width="2.83" height="51.83" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="35.76" y="54.17" width="150.34" height="5.67" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="35.73" y="70.3" width="150.38" height="1.42" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="1" y1="4.43" x2="1" y2="5.3" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="1.02" y1="49.06" x2="1.02" y2="49.93" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="220.86" y1="4.49" x2="220.86" y2="5.36" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="220.85" y1="49.13" x2="220.85" y2="50" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="169.43" y="35.44" width="1.42" height="14.6" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="153.21" y="35.44" width="1.42" height="14.6" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="136.36" y="17.78" width="50.49" height="1.42" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="136.36" y="34.03" width="50.49" height="1.42" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="169.43" y="19.2" width="1.42" height="14.83" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="153.21" y="19.2" width="1.42" height="14.83" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="169.43" y="4.54" width="1.42" height="13.24" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="153.21" y="4.54" width="1.42" height="13.24" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><polygon points="327.29 2.12 273.06 2.12 275.82 .14 324.45 .14 327.29 2.12" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="273.06" y="2.12" width="54.34" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="273.06" y="49.95" width="54.34" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m304.57,5.89c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.89Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m301.07,5.89c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.89Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m315.06,5.93c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V5.93Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m311.56,5.93c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.93Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m308.07,5.93c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.93Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m325.64,5.93c0-.32.39-.57.88-.57h0c.48,0,.87.25.87.57v42.62c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.93Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m322.14,5.89c0-.32.39-.57.87-.57h0c.49,0,.88.25.88.57v42.62c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.89Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m318.64,5.89c0-.32.4-.57.88-.57h0c.48,0,.88.25.88.57v42.62c0,.32-.39.57-.88.57h0c-.48,0-.88-.26-.88-.57V5.89Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m294.06,5.91c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.91Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m297.56,5.95c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V5.95Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m287.07,5.88c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.88Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m283.57,5.88c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.88Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m290.57,5.92c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.92Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m276.56,5.9c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.9Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m280.06,5.94c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V5.94Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m273.06,5.88c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V5.88Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><polygon points="273.06 52.1 327.29 52.1 324.52 54.08 275.89 54.08 273.06 52.1" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="274.01" y1="4.27" x2="274.01" y2="5.31" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="326.45" y1="4.27" x2="326.45" y2="5.36" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="326.52" y1="49.13" x2="326.52" y2="49.87" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="273.93" y1="49.07" x2="273.93" y2="49.87" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="278.32" y="54.08" width="2.83" height="51.83" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="318.64" y="54.08" width="2.83" height="51.92" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="281.15" y="54.08" width="37.49" height="5.67" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="281.11" y="69.97" width="37.53" height="1.42" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/></g></svg>';
                svgWidth = 115.55 * 2;
            }
            if (model.interior == 'two') {
                drawing = '<svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" width="115.41mm" height="37.52mm" viewBox="0 0 327.15 106.35"><g id="Laag_1"><polygon points=".61 52.08 221.73 52.08 218.88 54.07 3.46 54.07 .61 52.08" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x=".61" y="49.93" width="221.12" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><polygon points="221.73 2.19 .61 2.19 3.46 .21 218.88 .21 221.73 2.19" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x=".61" y="2.19" width="221.12" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="33.6" y="4.32" width="1.42" height="45.46" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m22.37,48.39c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.77c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m25.86,48.39c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.77c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m11.87,48.34c0,.32-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.72c0-.31.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m15.37,48.34c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.72c0-.31.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m18.87,48.34c0,.32-.39.57-.88.57h0c-.48,0-.88-.26-.88-.57V5.72c0-.31.4-.57.88-.57h0c.48,0,.88.26.88.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m1.89,48.39c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.77c0-.32.39-.58.88-.58h0c.48,0,.87.26.87.58v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m4.79,48.39c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.77c0-.32.39-.58.88-.58h0c.48,0,.87.26.87.58v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m8.29,48.39c0,.32-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.77c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m32.87,48.37c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.74c0-.32.39-.57.88-.57h0c.48,0,.87.25.87.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m29.37,48.32c0,.32-.39.57-.88.57h0c-.48,0-.87-.25-.87-.57V5.7c0-.31.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="186.85" y="4.43" width="1.42" height="45.5" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m199.5,5.83c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.83Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m196,5.83c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.83Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m210,5.88c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V5.88Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m206.5,5.88c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.88Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m203.01,5.88c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.88Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m219.98,5.83c0-.32.39-.57.88-.57h0c.48,0,.87.25.87.57v42.62c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.83Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m217.08,5.83c0-.32.39-.57.87-.57h0c.49,0,.88.25.88.57v42.62c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.83Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m213.58,5.83c0-.32.4-.57.88-.57h0c.48,0,.88.25.88.57v42.62c0,.32-.39.57-.88.57h0c-.48,0-.88-.26-.88-.57V5.83Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m189,5.85c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.85Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m192.5,5.9c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V5.9Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="136.36" y="18.14" width="50.48" height="2.27" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="136.36" y="34.36" width="50.48" height="2.27" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="134.09" y="4.34" width="2.27" height="45.59" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="35.02" y="25.67" width="99.07" height="2.27" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="32.93" y="54.07" width="2.83" height="51.83" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="186.1" y="54.07" width="2.83" height="52.14" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="35.76" y="54.07" width="150.34" height="5.67" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="35.73" y="70.19" width="150.38" height="1.42" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="1" y1="4.32" x2="1" y2="5.19" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="1.02" y1="48.96" x2="1.02" y2="49.83" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="220.87" y1="4.39" x2="220.87" y2="5.26" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="220.86" y1="49.02" x2="220.86" y2="49.89" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><polygon points="326.9 2.12 272.67 2.12 275.43 .14 324.06 .14 326.9 2.12" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="272.67" y="2.12" width="54.34" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="272.67" y="49.95" width="54.34" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m304.18,5.89c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.89Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m300.68,5.89c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.89Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m314.67,5.93c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V5.93Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m311.17,5.93c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.93Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m307.68,5.93c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.93Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m325.25,5.93c0-.32.39-.57.88-.57h0c.48,0,.87.25.87.57v42.62c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.93Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m321.75,5.89c0-.32.39-.57.87-.57h0c.49,0,.88.25.88.57v42.62c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.89Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m318.25,5.89c0-.32.4-.57.88-.57h0c.48,0,.88.25.88.57v42.62c0,.32-.39.57-.88.57h0c-.48,0-.88-.26-.88-.57V5.89Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m293.67,5.91c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.91Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m297.17,5.95c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V5.95Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m286.68,5.88c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.88Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m283.18,5.88c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.88Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m290.18,5.92c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.92Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m276.17,5.9c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.9Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m279.67,5.94c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V5.94Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m272.67,5.88c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V5.88Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><polygon points="272.67 52.1 326.9 52.1 324.13 54.08 275.5 54.08 272.67 52.1" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="273.62" y1="4.27" x2="273.62" y2="5.31" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="326.06" y1="4.27" x2="326.06" y2="5.36" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="326.13" y1="49.13" x2="326.13" y2="49.87" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="273.54" y1="49.07" x2="273.54" y2="49.87" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="277.93" y="54.08" width="2.83" height="51.83" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="318.25" y="54.08" width="2.83" height="51.82" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="280.76" y="54.08" width="37.49" height="5.67" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="280.72" y="69.97" width="37.53" height="1.42" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/></g></svg>';
                svgWidth = 115.41 * 2;
            }
            if (model.interior == 'three') {
                drawing = '<svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" width="115.44mm" height="37.44mm" viewBox="0 0 327.23 106.13"><g id="Laag_1"><polygon points=".61 52.01 221.73 52.01 218.88 54 3.46 54 .61 52.01" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x=".61" y="49.86" width="221.12" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><polygon points="221.73 2.12 .61 2.12 3.46 .14 218.88 .14 221.73 2.12" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x=".61" y="2.12" width="221.12" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="33.6" y="4.25" width="1.42" height="45.61" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m22.37,48.32c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.7c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m25.86,48.32c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.7c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m11.87,48.27c0,.32-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.65c0-.31.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m15.37,48.27c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.65c0-.31.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m18.87,48.27c0,.32-.39.57-.88.57h0c-.48,0-.88-.26-.88-.57V5.65c0-.31.4-.57.88-.57h0c.48,0,.88.26.88.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m1.89,48.32c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.7c0-.32.39-.58.88-.58h0c.48,0,.87.26.87.58v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m4.79,48.32c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.7c0-.32.39-.58.88-.58h0c.48,0,.87.26.87.58v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m8.29,48.32c0,.32-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.7c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m32.87,48.3c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.67c0-.32.39-.57.88-.57h0c.48,0,.87.25.87.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m29.37,48.25c0,.32-.39.57-.88.57h0c-.48,0-.87-.25-.87-.57V5.63c0-.31.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="186.85" y="4.27" width="1.42" height="45.59" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m199.5,5.76c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.76Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m196,5.76c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.76Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m210,5.81c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V5.81Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m206.5,5.81c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.81Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m203.01,5.81c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.81Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m219.98,5.76c0-.32.39-.57.88-.57h0c.48,0,.87.25.87.57v42.62c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.76Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m217.08,5.76c0-.32.39-.57.87-.57h0c.49,0,.88.25.88.57v42.62c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.76Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m213.58,5.76c0-.32.4-.57.88-.57h0c.48,0,.88.25.88.57v42.62c0,.32-.39.57-.88.57h0c-.48,0-.88-.26-.88-.57V5.76Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m189,5.78c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.78Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m192.5,5.83c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V5.83Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="168.58" y="4.27" width="2.27" height="45.59" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="152.36" y="4.27" width="2.27" height="45.59" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="134.09" y="4.27" width="2.27" height="45.5" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="35.02" y="25.6" width="99.07" height="2.27" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="32.93" y="54" width="2.83" height="51.83" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="186.1" y="54" width="2.83" height="51.99" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="35.76" y="54" width="150.34" height="5.67" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="35.73" y="70.12" width="150.38" height="1.42" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="1" y1="4.25" x2="1" y2="5.12" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="1.02" y1="48.89" x2="1.02" y2="49.76" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="220.87" y1="4.32" x2="220.87" y2="5.19" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="220.86" y1="48.95" x2="220.86" y2="49.82" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><polygon points="326.98 2.19 272.75 2.19 275.52 .21 324.14 .21 326.98 2.19" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="272.75" y="2.19" width="54.34" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="272.75" y="50.02" width="54.34" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m304.26,5.96c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.96Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m300.76,5.96c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.96Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m314.76,6c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V6Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m311.26,6c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V6Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m307.76,6c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V6Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m325.34,6c0-.32.39-.57.88-.57h0c.48,0,.87.25.87.57v42.62c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V6Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m321.84,5.96c0-.32.39-.57.87-.57h0c.49,0,.88.25.88.57v42.62c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.96Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m318.34,5.96c0-.32.4-.57.88-.57h0c.48,0,.88.25.88.57v42.62c0,.32-.39.57-.88.57h0c-.48,0-.88-.26-.88-.57V5.96Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m293.76,5.98c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.98Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m297.26,6.02c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V6.02Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m286.76,5.95c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.95Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m283.26,5.95c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.95Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m290.26,5.99c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.99Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m276.26,5.97c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.97Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m279.76,6.01c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V6.01Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m272.75,5.95c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V5.95Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><polygon points="272.75 52.17 326.98 52.17 324.22 54.15 275.59 54.15 272.75 52.17" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="273.7" y1="4.34" x2="273.7" y2="5.38" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="326.14" y1="4.34" x2="326.14" y2="5.43" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="326.22" y1="49.2" x2="326.22" y2="49.94" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="273.63" y1="49.14" x2="273.63" y2="49.94" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="278.01" y="54.15" width="2.83" height="51.83" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="318.34" y="54.15" width="2.83" height="51.84" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="280.84" y="54.15" width="37.49" height="5.67" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="280.81" y="70.04" width="37.53" height="1.42" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/></g></svg>';
                svgWidth = 115.44 * 2;
            }
        }
        if (model.width == 194) {
            if (model.interior == 'one') {
                drawing = '<svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" width="134.27mm" height="37.49mm" viewBox="0 0 380.61 106.28"><g id="Laag_1"><rect x="33.66" y="4.27" width="1.42" height="45.5" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m22.43,48.38c0,.31-.4.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.76c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m25.93,48.38c0,.31-.39.57-.87.57h0c-.48,0-.87-.26-.87-.57V5.76c0-.32.39-.57.87-.57h0c.48,0,.87.26.87.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m11.93,48.33c0,.32-.39.57-.87.57h0c-.48,0-.87-.26-.87-.57V5.71c0-.31.39-.57.87-.57h0c.48,0,.87.26.87.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m15.43,48.33c0,.32-.39.57-.87.57h0c-.48,0-.87-.26-.87-.57V5.71c0-.31.39-.57.87-.57h0c.48,0,.87.26.87.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m18.93,48.34c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.71c0-.31.4-.57.88-.57h0c.48,0,.87.26.87.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m1.95,48.38c0,.32-.39.57-.87.57h0c-.48,0-.87-.26-.87-.57V5.76c0-.32.39-.58.87-.58h0c.48,0,.87.26.87.58v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m4.85,48.38c0,.32-.39.57-.87.57h0c-.48,0-.87-.26-.87-.57V5.76c0-.32.39-.58.87-.58h0c.48,0,.87.26.87.58v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m8.35,48.38c0,.32-.39.57-.87.57h0c-.48,0-.87-.26-.87-.57V5.76c0-.32.39-.57.87-.57h0c.48,0,.87.26.87.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m32.93,48.36c0,.31-.39.57-.87.57h0c-.48,0-.87-.26-.87-.57V5.74c0-.32.39-.57.87-.57h0c.48,0,.87.25.87.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m29.43,48.31c0,.32-.39.57-.87.57h0c-.48,0-.87-.25-.87-.57V5.69c0-.31.39-.57.87-.57h0c.48,0,.87.26.87.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="240.23" y="4.32" width="1.42" height="45.5" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m252.88,5.72c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.72Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m249.38,5.72c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.72Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m263.37,5.76c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V5.76Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m259.87,5.76c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.76Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m256.38,5.76c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.76Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m273.35,5.71c0-.32.39-.57.88-.57h0c.48,0,.87.25.87.57v42.62c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.71Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m270.45,5.71c0-.32.39-.57.87-.57h0c.49,0,.88.25.88.57v42.62c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.71Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m266.95,5.71c0-.32.4-.57.88-.57h0c.48,0,.88.25.88.57v42.62c0,.32-.39.57-.88.57h0c-.48,0-.88-.26-.88-.57V5.71Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m242.37,5.74c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.74Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m245.87,5.78c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.31-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V5.78Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><polygon points="275.1 2.12 .14 2.12 2.99 .14 272.25 .23 275.1 2.12" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x=".14" y="2.12" width="274.96" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="32.93" y="54" width="2.83" height="52.13" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="238.81" y="54" width="2.83" height="52.14" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="35.77" y="54" width="203.04" height="5.67" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.33px;"/><rect x="35.76" y="70.43" width="203.05" height="1.42" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.33px;"/><polygon points=".14 52.02 275.1 52.02 272.25 54 2.99 53.92 .14 52.02" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x=".14" y="49.87" width="274.96" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="191.21" y="25.62" width="49.02" height="2.27" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="136.18" y="4.38" width="2.26" height="45.41" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="35.08" y="25.62" width="100.96" height="2.27" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="188.94" y="4.36" width="2.26" height="45.39" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="274.24" y1="4.27" x2="274.24" y2="5.14" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="274.23" y1="48.91" x2="274.23" y2="49.78" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="1.06" y1="4.32" x2="1.06" y2="5.18" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="1.08" y1="48.95" x2="1.08" y2="49.82" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="171.55" y="35.24" width="1.42" height="14.6" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="155.33" y="35.24" width="1.42" height="14.6" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="138.48" y="17.58" width="50.49" height="1.42" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="138.48" y="33.83" width="50.49" height="1.42" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="171.55" y="19" width="1.42" height="14.83" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="155.33" y="19" width="1.42" height="14.83" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="171.55" y="4.34" width="1.42" height="13.24" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="155.33" y="4.34" width="1.42" height="13.24" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><polygon points="380.36 2.34 326.13 2.34 328.89 .36 377.52 .36 380.36 2.34" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="326.13" y="2.34" width="54.34" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="326.13" y="50.17" width="54.34" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m357.64,6.11c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V6.11Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m354.14,6.11c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V6.11Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m368.13,6.15c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V6.15Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m364.63,6.15c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V6.15Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m361.14,6.15c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V6.15Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m378.71,6.15c0-.32.39-.57.88-.57h0c.48,0,.87.25.87.57v42.62c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V6.15Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m375.21,6.11c0-.32.39-.57.87-.57h0c.49,0,.88.25.88.57v42.62c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V6.11Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m371.71,6.11c0-.32.4-.57.88-.57h0c.48,0,.88.25.88.57v42.62c0,.32-.39.57-.88.57h0c-.48,0-.88-.26-.88-.57V6.11Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m347.13,6.13c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V6.13Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m350.63,6.17c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V6.17Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m340.14,6.1c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V6.1Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m336.64,6.1c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V6.1Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m343.64,6.14c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V6.14Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m329.63,6.12c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V6.12Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m333.13,6.16c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V6.16Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m326.13,6.1c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V6.1Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><polygon points="326.13 52.32 380.36 52.32 377.59 54.3 328.96 54.3 326.13 52.32" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="327.08" y1="4.49" x2="327.08" y2="5.53" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="379.52" y1="4.49" x2="379.52" y2="5.58" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="379.59" y1="49.35" x2="379.59" y2="50.09" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="327" y1="49.29" x2="327" y2="50.09" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="331.39" y="54.3" width="2.83" height="51.83" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="371.71" y="54.3" width="2.83" height="51.84" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="334.22" y="54.3" width="37.49" height="5.67" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="334.18" y="70.19" width="37.53" height="1.42" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/></g></svg>';
                svgWidth = 134.27 * 2;
            }
            if (model.interior == 'two') {
                drawing = '<svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" width="134.33mm" height="37.49mm" viewBox="0 0 380.78 106.28"><g id="Laag_1"><rect x="33.66" y="4.27" width="1.42" height="45.5" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m22.43,48.38c0,.31-.4.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.76c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m25.93,48.38c0,.31-.39.57-.87.57h0c-.48,0-.87-.26-.87-.57V5.76c0-.32.39-.57.87-.57h0c.48,0,.87.26.87.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m11.93,48.33c0,.32-.39.57-.87.57h0c-.48,0-.87-.26-.87-.57V5.71c0-.31.39-.57.87-.57h0c.48,0,.87.26.87.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m15.43,48.33c0,.32-.39.57-.87.57h0c-.48,0-.87-.26-.87-.57V5.71c0-.31.39-.57.87-.57h0c.48,0,.87.26.87.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m18.93,48.34c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.71c0-.31.4-.57.88-.57h0c.48,0,.87.26.87.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m1.95,48.38c0,.32-.39.57-.87.57h0c-.48,0-.87-.26-.87-.57V5.76c0-.32.39-.58.87-.58h0c.48,0,.87.26.87.58v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m4.85,48.38c0,.32-.39.57-.87.57h0c-.48,0-.87-.26-.87-.57V5.76c0-.32.39-.58.87-.58h0c.48,0,.87.26.87.58v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m8.35,48.38c0,.32-.39.57-.87.57h0c-.48,0-.87-.26-.87-.57V5.76c0-.32.39-.57.87-.57h0c.48,0,.87.26.87.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m32.93,48.36c0,.31-.39.57-.87.57h0c-.48,0-.87-.26-.87-.57V5.74c0-.32.39-.57.87-.57h0c.48,0,.87.25.87.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m29.43,48.31c0,.32-.39.57-.87.57h0c-.48,0-.87-.25-.87-.57V5.69c0-.31.39-.57.87-.57h0c.48,0,.87.26.87.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="240.23" y="4.32" width="1.42" height="45.5" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m252.88,5.72c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.72Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m249.38,5.72c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.72Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m263.37,5.76c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V5.76Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m259.87,5.76c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.76Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m256.38,5.76c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.76Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m273.35,5.71c0-.32.39-.57.88-.57h0c.48,0,.87.25.87.57v42.62c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.71Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m270.45,5.71c0-.32.39-.57.87-.57h0c.49,0,.88.25.88.57v42.62c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.71Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m266.95,5.71c0-.32.4-.57.88-.57h0c.48,0,.88.25.88.57v42.62c0,.32-.39.57-.88.57h0c-.48,0-.88-.26-.88-.57V5.71Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m242.37,5.74c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.74Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m245.87,5.78c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.31-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V5.78Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><polygon points="275.1 2.12 .14 2.12 2.99 .14 272.25 .23 275.1 2.12" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x=".14" y="2.12" width="274.96" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="32.93" y="54" width="2.83" height="52.13" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="238.81" y="54" width="2.83" height="52.14" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="35.77" y="54" width="203.04" height="5.67" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.33px;"/><rect x="35.76" y="70.43" width="203.05" height="1.42" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.33px;"/><polygon points=".14 52.02 275.1 52.02 272.25 54 2.99 53.92 .14 52.02" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x=".14" y="49.87" width="274.96" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="136.18" y="4.27" width="2.26" height="45.59" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="35.08" y="25.62" width="101.1" height="2.27" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="274.24" y1="4.27" x2="274.24" y2="5.14" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="274.23" y1="48.91" x2="274.23" y2="49.78" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="1.06" y1="4.32" x2="1.06" y2="5.18" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="1.08" y1="48.95" x2="1.08" y2="49.82" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="155.29" y="35.24" width="1.42" height="14.6" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="138.44" y="17.58" width="101.79" height="1.42" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="138.44" y="33.83" width="101.79" height="1.42" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="155.29" y="19" width="1.42" height="14.83" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="171.51" y="35.24" width="1.42" height="14.6" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="171.51" y="19" width="1.42" height="14.83" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="171.51" y="4.34" width="1.42" height="13.24" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="155.29" y="4.34" width="1.42" height="13.24" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="223.19" y="35.24" width="1.42" height="14.6" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="223.19" y="19" width="1.42" height="14.83" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="223.19" y="4.34" width="1.42" height="13.24" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><polygon points="380.53 2.34 326.3 2.34 329.06 .36 377.69 .36 380.53 2.34" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="326.3" y="2.34" width="54.34" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="326.3" y="50.17" width="54.34" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m357.81,6.11c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V6.11Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m354.31,6.11c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V6.11Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m368.31,6.15c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V6.15Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m364.81,6.15c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V6.15Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m361.31,6.15c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V6.15Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m378.89,6.15c0-.32.39-.57.88-.57h0c.48,0,.87.25.87.57v42.62c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V6.15Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m375.38,6.11c0-.32.39-.57.87-.57h0c.49,0,.88.25.88.57v42.62c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V6.11Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m371.88,6.11c0-.32.4-.57.88-.57h0c.48,0,.88.25.88.57v42.62c0,.32-.39.57-.88.57h0c-.48,0-.88-.26-.88-.57V6.11Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m347.31,6.13c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V6.13Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m350.81,6.17c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V6.17Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m340.31,6.1c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V6.1Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m336.81,6.1c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V6.1Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m343.81,6.14c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V6.14Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m329.81,6.12c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V6.12Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m333.31,6.16c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V6.16Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m326.3,6.1c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V6.1Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><polygon points="326.3 52.32 380.53 52.32 377.76 54.3 329.14 54.3 326.3 52.32" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="327.25" y1="4.49" x2="327.25" y2="5.53" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="379.69" y1="4.49" x2="379.69" y2="5.58" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="379.76" y1="49.34" x2="379.76" y2="50.09" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="327.17" y1="49.29" x2="327.17" y2="50.09" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="331.56" y="54.3" width="2.83" height="51.83" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="371.88" y="54.3" width="2.83" height="51.84" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="334.39" y="54.3" width="37.49" height="5.67" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="334.35" y="70.19" width="37.53" height="1.42" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/></g></svg>';
                svgWidth = 134.33 * 2;
            }
            if (model.interior == 'three') {
                drawing = '<svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" width="134.27mm" height="37.49mm" viewBox="0 0 380.61 106.28"><g id="Laag_1"><rect x="33.66" y="4.27" width="1.42" height="45.5" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m22.43,48.38c0,.31-.4.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.76c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m25.93,48.38c0,.31-.39.57-.87.57h0c-.48,0-.87-.26-.87-.57V5.76c0-.32.39-.57.87-.57h0c.48,0,.87.26.87.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m11.93,48.33c0,.32-.39.57-.87.57h0c-.48,0-.87-.26-.87-.57V5.71c0-.31.39-.57.87-.57h0c.48,0,.87.26.87.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m15.43,48.33c0,.32-.39.57-.87.57h0c-.48,0-.87-.26-.87-.57V5.71c0-.31.39-.57.87-.57h0c.48,0,.87.26.87.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m18.93,48.34c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.71c0-.31.4-.57.88-.57h0c.48,0,.87.26.87.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m1.95,48.38c0,.32-.39.57-.87.57h0c-.48,0-.87-.26-.87-.57V5.76c0-.32.39-.58.87-.58h0c.48,0,.87.26.87.58v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m4.85,48.38c0,.32-.39.57-.87.57h0c-.48,0-.87-.26-.87-.57V5.76c0-.32.39-.58.87-.58h0c.48,0,.87.26.87.58v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m8.35,48.38c0,.32-.39.57-.87.57h0c-.48,0-.87-.26-.87-.57V5.76c0-.32.39-.57.87-.57h0c.48,0,.87.26.87.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m32.93,48.36c0,.31-.39.57-.87.57h0c-.48,0-.87-.26-.87-.57V5.74c0-.32.39-.57.87-.57h0c.48,0,.87.25.87.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m29.43,48.31c0,.32-.39.57-.87.57h0c-.48,0-.87-.25-.87-.57V5.69c0-.31.39-.57.87-.57h0c.48,0,.87.26.87.57v42.62Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="240.23" y="4.32" width="1.42" height="45.5" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m252.88,5.72c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.72Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m249.38,5.72c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.72Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m263.37,5.76c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V5.76Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m259.87,5.76c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.76Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m256.38,5.76c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.76Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m273.35,5.71c0-.32.39-.57.88-.57h0c.48,0,.87.25.87.57v42.62c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.71Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m270.45,5.71c0-.32.39-.57.87-.57h0c.49,0,.88.25.88.57v42.62c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V5.71Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m266.95,5.71c0-.32.4-.57.88-.57h0c.48,0,.88.25.88.57v42.62c0,.32-.39.57-.88.57h0c-.48,0-.88-.26-.88-.57V5.71Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m242.37,5.74c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V5.74Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m245.87,5.78c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.31-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V5.78Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><polygon points="275.1 2.12 .14 2.12 2.99 .14 272.25 .23 275.1 2.12" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x=".14" y="2.12" width="274.96" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="32.93" y="54" width="2.83" height="52.13" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="238.81" y="54" width="2.83" height="52.14" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="35.77" y="54" width="203.04" height="5.67" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="35.76" y="70.43" width="203.05" height="1.42" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><polygon points=".14 52.02 275.1 52.02 272.25 54 2.99 53.92 .14 52.02" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x=".14" y="49.87" width="274.96" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="138.44" y="25.62" width="101.79" height="2.27" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="136.18" y="4.38" width="2.26" height="45.49" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="35.08" y="25.62" width="101.1" height="2.27" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="274.24" y1="4.27" x2="274.24" y2="5.14" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="274.23" y1="48.91" x2="274.23" y2="49.78" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="1.06" y1="4.32" x2="1.06" y2="5.18" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="1.08" y1="48.95" x2="1.08" y2="49.82" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><polygon points="380.36 2.35 326.13 2.35 328.89 .37 377.52 .37 380.36 2.35" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="326.13" y="2.35" width="54.34" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="326.13" y="50.17" width="54.34" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m357.64,6.12c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V6.12Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m354.14,6.12c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V6.12Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m368.13,6.16c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V6.16Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m364.63,6.16c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V6.16Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m361.14,6.16c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V6.16Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m378.71,6.16c0-.32.39-.57.88-.57h0c.48,0,.87.25.87.57v42.62c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V6.16Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m375.21,6.12c0-.32.39-.57.87-.57h0c.49,0,.88.25.88.57v42.62c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V6.12Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m371.71,6.12c0-.32.4-.57.88-.57h0c.48,0,.88.25.88.57v42.62c0,.32-.39.57-.88.57h0c-.48,0-.88-.26-.88-.57V6.12Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m347.13,6.14c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V6.14Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m350.63,6.18c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V6.18Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m340.14,6.11c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.31-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V6.11Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m336.64,6.11c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.31-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V6.11Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m343.64,6.15c0-.32.39-.57.87-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.39.57-.88.57h0c-.48,0-.87-.26-.87-.57V6.15Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m329.63,6.13c0-.32.39-.57.88-.57h0c.48,0,.87.26.87.57v42.62c0,.32-.39.57-.87.57h0c-.48,0-.88-.26-.88-.57V6.13Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m333.13,6.17c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V6.17Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m326.13,6.11c0-.32.39-.57.88-.57h0c.48,0,.88.26.88.57v42.62c0,.32-.4.57-.88.57h0c-.48,0-.88-.26-.88-.57V6.11Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><polygon points="326.13 52.32 380.36 52.32 377.59 54.31 328.96 54.31 326.13 52.32" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="327.08" y1="4.5" x2="327.08" y2="5.53" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="379.52" y1="4.5" x2="379.52" y2="5.59" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="379.59" y1="49.35" x2="379.59" y2="50.09" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="327" y1="49.3" x2="327" y2="50.09" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="331.39" y="54.31" width="2.83" height="51.83" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="371.71" y="54.31" width="2.83" height="51.83" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="334.22" y="54.31" width="37.49" height="5.67" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="334.18" y="70.2" width="37.53" height="1.42" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/></g></svg>';
                svgWidth = 134.27 * 2;
            }
        }
        height = model.height;
        width = model.width;
        depth = 37;
    }
    if (model.type == "sideboardOnFrameTV") {
        drawing = '<svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" width="115.55mm" height="55.89mm" viewBox="0 0 327.54 158.43"><g id="Laag_1"><rect x="33.17" y="106.46" width="2.83" height="51.83" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="186.34" y="106.46" width="2.83" height="51.83" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="36" y="106.46" width="150.34" height="5.67" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="35.96" y="122.58" width="150.38" height="1.42" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="278.59" y="106.46" width="2.83" height="51.83" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="318.92" y="106.46" width="2.83" height="51.83" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="281.42" y="106.46" width="37.49" height="5.67" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="281.39" y="122.35" width="37.53" height="1.42" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><polygon points=".61 104.47 221.73 104.47 218.88 106.46 3.46 106.46 .61 104.47" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x=".61" y="102.32" width="221.12" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><polygon points="221.73 2.14 .61 2.14 3.46 .16 218.88 .16 221.73 2.14" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x=".61" y="2.14" width="221.12" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="33.6" y="4.2" width="1.42" height="98.12" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="186.85" y="4.2" width="1.42" height="98.12" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="1.02" y1="101.35" x2="1.02" y2="102.21" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m21.49,5.08c-.48,0-.87.29-.87.65v94.98c0,.35.39.63.87.63s.88-.29.88-.63V5.73c0-.36-.39-.65-.88-.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m24.99,5.08c-.48,0-.88.29-.88.65v94.98c0,.35.39.63.88.63s.87-.29.87-.63V5.73c0-.36-.39-.65-.87-.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m10.99,5.03c-.48,0-.87.29-.87.65v94.98c0,.35.39.63.87.63s.88-.28.88-.63V5.68c0-.36-.39-.65-.88-.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m14.49,5.03c-.48,0-.88.29-.88.65v94.98c0,.35.39.63.88.63s.87-.28.87-.63V5.68c0-.36-.39-.65-.87-.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m17.99,5.03c-.48,0-.88.29-.88.65v94.99c0,.35.4.63.88.63s.88-.28.88-.63V5.68c0-.36-.39-.65-.88-.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m1.02,5.08c-.48,0-.88.29-.88.66v94.98c0,.35.39.63.88.63s.87-.29.87-.63V5.73c0-.36-.39-.66-.87-.66Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m3.92,5c-.48,0-.88.29-.88.65v94.98c0,.35.39.63.88.63s.87-.28.87-.63V5.66c0-.36-.39-.65-.87-.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m7.42,5.08c-.48,0-.87.29-.87.65v94.98c0,.35.39.63.87.63s.88-.29.88-.63V5.73c0-.36-.39-.65-.88-.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m31.99,5.06c-.48,0-.88.29-.88.65v94.99c0,.35.39.63.88.63s.87-.28.87-.63V5.7c0-.36-.39-.65-.87-.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m28.49,5c-.48,0-.87.3-.87.65v94.98c0,.35.39.63.87.63s.88-.28.88-.63V5.66c0-.36-.39-.65-.88-.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="1" y1="4.2" x2="1" y2="5.07" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m200.38,101.44c.48,0,.87-.29.87-.65V5.81c0-.35-.39-.63-.87-.63s-.88.29-.88.63v94.98c0,.36.39.65.88.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m196.88,101.44c.48,0,.88-.29.88-.65V5.81c0-.35-.39-.63-.88-.63s-.87.29-.87.63v94.98c0,.36.39.65.87.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m210.88,101.49c.48,0,.87-.29.87-.65V5.86c0-.35-.39-.63-.87-.63s-.88.28-.88.63v94.98c0,.36.39.65.88.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m207.38,101.49c.48,0,.88-.29.88-.65V5.86c0-.35-.39-.63-.88-.63s-.87.28-.87.63v94.98c0,.36.39.65.87.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m203.88,101.49c.48,0,.88-.29.88-.65V5.86c0-.35-.4-.63-.88-.63s-.88.28-.88.63v94.99c0,.36.39.65.88.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m220.86,101.44c.48,0,.88-.29.88-.65V5.81c0-.35-.39-.63-.88-.63s-.87.28-.87.63v94.98c0,.36.39.65.87.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m217.96,101.52c.48,0,.88-.29.88-.66V5.88c0-.35-.39-.63-.88-.63s-.87.29-.87.63v94.98c0,.36.39.66.87.66Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m214.46,101.44c.48,0,.87-.29.87-.65V5.81c0-.35-.39-.63-.87-.63s-.88.28-.88.63v94.98c0,.36.39.65.88.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m189.88,101.47c.48,0,.88-.29.88-.65V5.83c0-.35-.39-.63-.88-.63s-.87.28-.87.63v94.99c0,.36.39.65.87.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m193.38,101.52c.48,0,.87-.3.87-.65V5.88c0-.35-.39-.63-.87-.63s-.88.28-.88.63v94.98c0,.36.39.65.88.65Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="220.86" y1="5.17" x2="220.86" y2="4.29" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="220.86" y1="101.44" x2="220.86" y2="102.32" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><polygon points="327.29 2.12 273.06 2.12 275.82 .14 324.45 .14 327.29 2.12" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="273.06" y="2.12" width="54.34" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="273.06" y="102.23" width="54.34" height="2.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><polygon points="273.06 104.38 327.29 104.38 324.52 106.36 275.89 106.36 273.06 104.38" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="326.52" y1="101.41" x2="326.52" y2="102.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="273.93" y1="101.36" x2="273.93" y2="102.15" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m305.44,5.26c-.48,0-.88.29-.88.64v94.81c0,.36.39.65.88.65s.87-.29.87-.65V5.9c0-.35-.39-.64-.87-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m301.94,5.26c-.48,0-.87.29-.87.64v94.81c0,.36.39.65.87.65s.88-.29.88-.65V5.9c0-.35-.39-.64-.88-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m315.94,5.31c-.48,0-.88.29-.88.64v94.81c0,.36.39.65.88.65s.88-.29.88-.65V5.95c0-.35-.4-.64-.88-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m312.44,5.31c-.48,0-.88.29-.88.64v94.81c0,.36.39.65.88.65s.87-.29.87-.65V5.95c0-.35-.39-.64-.87-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m308.94,5.31c-.48,0-.87.28-.87.64v94.81c0,.36.39.65.87.65s.88-.29.88-.65V5.95c0-.35-.39-.64-.88-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m326.52,5.31c-.48,0-.88.28-.88.63v94.82c0,.35.39.65.88.65s.87-.29.87-.65V5.94c0-.35-.39-.63-.87-.63Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m323.01,5.26c-.48,0-.87.28-.87.63v94.82c0,.35.39.65.87.65s.88-.29.88-.65V5.9c0-.35-.39-.63-.88-.63Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m319.52,5.26c-.48,0-.88.28-.88.63v94.81c0,.36.4.65.88.65s.88-.29.88-.65V5.9c0-.35-.39-.63-.88-.63Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m294.94,5.28c-.48,0-.88.29-.88.64v94.81c0,.36.39.65.88.65s.87-.29.87-.65V5.92c0-.35-.39-.64-.87-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m298.44,5.33c-.48,0-.88.29-.88.64v94.81c0,.36.39.65.88.65s.88-.29.88-.65V5.97c0-.35-.4-.64-.88-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m287.94,5.25c-.48,0-.88.28-.88.64v94.81c0,.36.39.65.88.65s.87-.29.87-.65V5.89c0-.35-.39-.64-.87-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m284.44,5.25c-.48,0-.87.28-.87.64v94.81c0,.36.39.65.87.65s.88-.29.88-.65V5.89c0-.35-.39-.64-.88-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m291.44,5.29c-.48,0-.87.29-.87.64v94.81c0,.36.39.65.87.65s.88-.29.88-.65V5.93c0-.35-.39-.64-.88-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m277.44,5.27c-.48,0-.88.28-.88.64v94.81c0,.36.39.65.88.65s.87-.29.87-.65V5.91c0-.35-.39-.64-.87-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m280.94,5.32c-.48,0-.88.29-.88.64v94.82c0,.36.39.65.88.65s.88-.29.88-.65V5.95c0-.35-.4-.64-.88-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><path d="m273.93,5.25c-.48,0-.88.29-.88.64v94.81c0,.36.39.65.88.65s.88-.29.88-.65V5.88c0-.35-.4-.64-.88-.64Z" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="273.93" y1="5.25" x2="273.93" y2="4.27" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><line x1="326.52" y1="5.31" x2="326.52" y2="4.27" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="35.02" y="88.15" width="151.83" height="14.17" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/><rect x="103.85" y="88.15" width="14.17" height="2.84" style="fill:none; stroke:#231f20; stroke-miterlimit:2.41; stroke-width:.28px;"/></g></svg>';
        svgWidth = 115.55 * 2;
        height = model.height;
        width = 156;
        depth = 37;
    }
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
            { text: `A'DAMMER`, fontSize: 36, absolutePosition: { x: 28, y: 22 } },
            {
                layout: 'noBorders',
                table: {
                    headerRows: 0,
                    widths: [100, 'auto'],
                    body: [
                        [{ text: 'COMBINATION', bold: true, fontSize: 12 }, `${(document.getElementById('name').textContent) + ' ' + document.getElementById(model.type).value}`],
                        [{ text: 'CONFIGURATOR', bold: true, fontSize: 12 }, { text: `my a'dammer`, link: `${link}` }],
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
            { text: 'COLOR', bold: true, fontSize: 12, margin: [0, 15, 0, 5] },
            {
                layout: 'noBorders',
                table: {
                    headerRows: 0,
                    widths: [60, 'auto'],
                    body: [
                        [{ text: 'exterior', fontSize: 9 }, { text: `${model.outsideColor.code} ${model.outsideColor.name}`, fontSize: 9 }],
                        [{ text: 'interior', fontSize: 9 }, { text: `${model.insideColor.code} ${model.insideColor.name}`, fontSize: 9 }],
                        [{ text: `${(model.type !== 'cabinet' || model.type !== 'sideboard') ? 'metal frame' : ''}`, fontSize: 9 }, { text: `${(model.type !== 'cabinet' || model.type !== 'sideboard') ? '301 black' : ''}`, fontSize: 9 }]
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
                        [{ text: 'winerack', fontSize: 9 }, { text: `${(model.winerack === true) ? 'yes' : 'no'}`, fontSize: 9 }],
                        [{ text: 'extra shelfs', fontSize: 9 }, { text: `${model.shelves}`, fontSize: 9 }]
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
            normal: 'https://pastoe-amsterdammer.web.app/fonts/Roboto-Light.ttf',
            bold: 'https://pastoe-amsterdammer.web.app/fonts/Roboto-Medium.ttf'
            //italics: 'https://pastoe-amsterdammer.web.app/fonts/Roboto-Light.ttf',
            //bold: 'https://pastoe-amsterdammer.web.app/fonts/Roboto-Light.ttf',
        },
    }
    if (output == 'download') {
        pdfMake.createPdf(docDefinition).download('amsterdammer');
    }
    if (output == 'base64') {
        pdfMake.createPdf(docDefinition).getBase64((data) => {
        });
    }
}

// used by FromUnityToJavascript.jslib
async function uploadRenderTexture(blob, medium, fileName) {
    const result = await blobToBase64(blob);
    if (medium == 'pdf') {
        downloadPdf(FEATUREDMODEL, result, 'download');
    }
    if (medium == 'httprequest') {
        downloadPdf(FEATUREDMODEL, result, 'base64');
    }
    if (medium == 'search') {
        var searchRenderTexture = document.getElementById('searchRenderTexture');
        searchRenderTexture.src = result;
        console.log(result);

        var searchRenderTexture = document.getElementById('searchRenderTexture');
        searchRenderTexture.src = result;
        console.log(result);
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
        widthForImage: FEATUREDMODEL.width,
        heightForImage: FEATUREDMODEL.height,
        depthForImage: 37
    };
    UNITY_INSTANCE.SendMessage('Amsterdammer', 'SaveRenderTexture', JSON.stringify(renderTexture));
}

function shareConfiguration(model) {
    window.location.href = `whatsapp://send?text=See%20my%20configuration!%20https://furnitise.nl/demos?brand=${brand}&product=${product}&data=${encodeURIComponent(JSON.stringify(model))}`
}

function submitForm() {
    window.parent.postMessage(
        JSON.stringify(FEATUREDMODEL.articleList),
        "https://www.pastoe.com",
    );

    console.log(JSON.stringify(FEATUREDMODEL.articleList));
}

// used by FromUnityToJavascript.jslib
async function downloadModel(blob, fileName) {
    const result = await blobToBase64(blob);
    downloadModel(result);
}

function downloadModelButton() {
    UNITY_INSTANCE.SendMessage('Amsterdammer', 'ModelExport');
}

function downloadModel(bytes) {
    console.log('MODEL DOWNLOADED!!! ' + bytes);
}

function updateFeaturedModel(model) {
    UNITY_INSTANCE.SendMessage('Amsterdammer', 'SetAmsterdammer', JSON.stringify(model));
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

function toggleDecor(toggle) {
    UNITY_INSTANCE.SendMessage('Amsterdammer', 'ToggleDecor', toggle);
}

function updateCamera(modelWidth, modelHeight, modelOffset) {
    var size = {
        width: modelWidth,
        height: modelHeight,
        offset: modelOffset
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
        model.background = { "original": model.background.original, "lighter": bgColor.substring(1)};
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

            if (model.type == "cabinet") {
                model.width = 37;
                model.height = 205;
                model.winerack = false;
                model.shelves = 0;
                model.interior = undefined;
                if (model.outsideColor.path != undefined) {
                    model.outsideColor = { "color": "f7f6f4", "lacquer": "basic" };
                } else {
                    model.outsideColor = { "color": model.outsideColor.color, "lacquer": model.outsideColor.lacquer };
                }
                updateCamera(model.width, model.height);
            }
            if (model.type == "sideboardOnFrame") {
                model.width = 156;
                model.height = 75;
                model.winerack = undefined;
                model.shelves = undefined;
                if (model.interior != "two" || model.interior != "three" || model.interior == undefined) {
                    model.interior = "one";
                } else {
                    model.interior = model.interior;
                }
                if (model.outsideColor.path != undefined) {
                    model.outsideColor = { "color": "f7f6f4", "lacquer": "basic" };
                } else {
                    model.outsideColor = { "color": model.outsideColor.color, "lacquer": model.outsideColor.lacquer };
                }
                updateCamera(model.width, model.height);
            }
            if (model.type == "sideboardOnFrameTV") {
                model.width = 156;
                model.height = 112;
                model.winerack = undefined;
                model.shelves = undefined;
                model.interior = undefined;
                if (model.outsideColor.path != undefined) {
                    model.outsideColor = { "color": "f7f6f4", "lacquer": "basic" };
                } else {
                    model.outsideColor = { "color": model.outsideColor.color, "lacquer": model.outsideColor.lacquer };
                }
                updateCamera(model.width, model.height);
            }
            if (model.type == "sideboard") {
                model.width = 156;
                model.height = 75;
                model.winerack = undefined;
                model.shelves = undefined;
                model.interior = undefined;
                if (model.outsideColor.path != undefined) {
                    model.outsideColor = { "color": "f7f6f4", "lacquer": "basic" };
                } else {
                    model.outsideColor = { "color": model.outsideColor.color, "lacquer": model.outsideColor.lacquer };
                }
                updateCamera(model.width, model.height);
            }
            updateControlPanel(model, undefined, 'type');
            updateFeaturedModel(model);
            showSelected(false);
        }
    }
    document.getElementById('typeText').textContent = document.getElementById(model.type).value;

    //size
    //width
    if (model.type != "sideboardOnFrameTV") {
        document.getElementById(model.width).checked = true;
    }

    if (model.type == "sideboard" || model.type == "sideboardOnFrame") {
        const widthValues = document.querySelectorAll('input[type=radio][name="sideboard_width"]');
        for (const widthValue of widthValues) {
            widthValue.onclick = (width) => {

                model.width = width.target.id;

                updateCamera(model.width, model.height);
                updateControlPanel(model, undefined, 'sizeSideboard');
                updateFeaturedModel(model);
                showSelected(false);
            }
        }
        document.getElementById('sizeSideboardText').textContent = 'width ' + document.getElementById(model.width).id;
    }

    if (model.type == "cabinet") {
        const widthValues = document.querySelectorAll('input[type=radio][name="cabinet_width"]');
        for (const widthValue of widthValues) {
            widthValue.onclick = (width) => {

                model.width = width.target.id;

                updateCamera(model.width, model.height);
                updateControlPanel(model, undefined, 'sizeCabinet');
                updateFeaturedModel(model);
                showSelected(false);
            }
        }
        document.getElementById('widthText').textContent = 'width ' + document.getElementById(model.width).id;

        //height
        document.getElementById(model.height).checked = true;

        const heightValues = document.querySelectorAll('input[type=radio][name="cabinet_height"]');
        for (const heightValue of heightValues) {
            heightValue.onclick = (height) => {

                model.height = height.target.id;

                updateCamera(model.width, model.height);
                updateControlPanel(model, undefined, 'sizeCabinet');
                updateFeaturedModel(model);
                showSelected(false);
            }
        }
        document.getElementById('heightText').textContent = 'height ' + document.getElementById(model.height).id;

        //options
        //winerack
        if (model.winerack == true && model.winerackColor == undefined) {
            model.winerackColor = 'insidecolor';
        }
        if (model.winerackColor == 'outsidecolor') {
            document.getElementById('winerackoutsidecolor').checked = true;
        }
        if (model.winerackColor == 'insidecolor') {
            document.getElementById('winerackinsidecolor').checked = true;
        }
        if (model.winerack == true) {
            winerack.checked = true;
            document.getElementById('winerackoutsidecolor').disabled = false;
            document.getElementById('winerackinsidecolor').disabled = false;
            if (model.outsideColor.path !== undefined) {
                document.getElementById('winerackoutsidecolor').disabled = true;
                document.getElementById('winerackinsidecolor').disabled = true;
                document.getElementById('winerackinsidecolor').checked = true;
            }
        } else {
            winerack.checked = false;
            document.getElementById('winerackoutsidecolor').disabled = true;
            document.getElementById('winerackinsidecolor').disabled = true;
        }

        document.getElementById('winerack').addEventListener('click', () => {
            let winerack = document.getElementById('winerack');
            if (winerack.checked == true) {
                model.winerack = true;
            } else {
                model.winerack = false;
            }
            updateControlPanel(model, 'optionsCabinet');
            updateFeaturedModel(model);
            showSelected(false);
        });

        const winerackcolorValues = document.querySelectorAll('input[type=radio][name="winerackcolor"]');
        for (const winerackcolorValue of winerackcolorValues) {
            winerackcolorValue.onclick = (winerackcolor) => {

                model.winerackColor = winerackcolor.target.value;

                updateControlPanel(model, 'optionsCabinet');
                updateFeaturedModel(model);
                showSelected(false);
            }
        }
        if (document.getElementById("winerack").checked) {
            document.getElementById('winerackText').textContent = "winerack";
        } else {
            document.getElementById('winerackText').textContent = "no winerack";
        }

        //shelves
        document.getElementById('shelves').addEventListener('change', () => {

            model.shelves = document.getElementById("shelves").value;

            updateControlPanel(model, 'optionsCabinet');
            updateFeaturedModel(model);
            showSelected(false);
        });
        document.getElementById(`${model.shelves}_shelves`).selected = true;

        if (model.shelves == 0) {
            document.getElementById('shelvesText').textContent = "no extra shelves";
        } else if (model.shelves == 1) {
            document.getElementById('shelvesText').textContent = "1 extra shelf";
        } else {
            document.getElementById('shelvesText').textContent = document.getElementById("shelves").value + " extra shelves";
        }
    }

    if (model.type == "sideboardOnFrame") {
        //interiors
        document.getElementById(model.width + '_' + model.interior).checked = true;

        const interiorValues = document.querySelectorAll('input[type=radio][name="interior"]');
        for (const interiorValue of interiorValues) {
            interiorValue.onclick = (interior) => {

                model.interior = interior.target.value;

                updateControlPanel(model, 'optionsSideboardOnFrame' + model.width);
                updateFeaturedModel(model);
                showSelected(false);
            }
        }
        document.getElementById('optionsSideboardOnFrame' + model.width + 'Text').textContent = document.getElementById(model.width + '_' + model.interior + 'Label').textContent;
    }

    //outside color lacquer
    let outsideColorLacquer = document.querySelectorAll('input[type=radio][name="outsideColorsLacquer"]');
    outsideColorLacquer.forEach(radio => { radio.replaceWith(radio.cloneNode(true)) });
    outsideColorLacquer = document.querySelectorAll('input[type=radio][name="outsideColorsLacquer"]');
    if (model.outsideColor.lacquer == "veneer") {
        document.getElementById('outsideColorsLacquer_basic').disabled = true;
        document.getElementById('outsideColorsLacquer_structure').disabled = true;
        document.getElementById('outsideColorsLacquer_gloss').disabled = true;
        document.getElementById('outsideColorsLacquer_veneer').checked = true;
    } else {
        document.getElementById('outsideColorsLacquer_basic').disabled = false;
        document.getElementById('outsideColorsLacquer_structure').disabled = false;
        document.getElementById('outsideColorsLacquer_gloss').disabled = false;
        document.getElementById('outsideColorsLacquer_' + model.outsideColor.lacquer).checked = true;
    }
    outsideColorLacquer.forEach(radio => radio.addEventListener('click', () => {
        model.outsideColor.lacquer = radio.value;
        document.getElementById('outsideColorsLacquer_' + model.outsideColor.lacquer).checked = true;
        updateControlPanel(model, 'outsideColors');
        updateFeaturedModel(model, false);
        showSelected(true);
    }));

    //outside color
    const outsideColor = model.outsideColor.color;
    var outsideColorIndex = ALLCOLORS.outsideColors.findIndex((item) => item.colorHex == outsideColor);
    var outsideColorValue = document.querySelectorAll('.outsideColors_colorButton');

    if (parser.getDevice().type != 'mobile' && parser.getDevice().type != 'tablet') {
        outsideColorValue.forEach(item => item.addEventListener('mouseover', () => {
            document.getElementById('outsideColorsText').style.visibility = 'visible';
            document.getElementById('outsideColorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: ' + document.getElementById(item.id).style.backgroundColor + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + document.getElementById(item.id).alt + '';
            document.getElementById('outsideColorsText').classList.add('fst-italic');
            updateFeaturedModel(model, false);
            showSelected(true);
        }));

        outsideColorValue.forEach(item => item.addEventListener('mouseout', () => {
            document.getElementById('outsideColorsText').style.visibility = 'hidden';
            document.getElementById('outsideColorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: #' + model.outsideColor.color + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + ALLCOLORS.outsideColors[outsideColorIndex].colorName + '';
            document.getElementById('outsideColorsText').classList.remove('fst-italic');
            updateFeaturedModel(model, false);
            showSelected(true);
        }));
    }

    outsideColorValue.forEach(item => item.addEventListener('click', () => {
        outsideColorValue.forEach(item => { item.classList.remove('colorButtonActive') });
        const outsideColorId = item.id.split('_');
        outsideColorIndex = outsideColorId[1];

        if (ALLCOLORS.outsideColors[outsideColorIndex].colorPath != undefined) {
            model.outsideColor = { "color": ALLCOLORS.outsideColors[outsideColorIndex].colorHex, "path": ALLCOLORS.outsideColors[outsideColorIndex].colorPath, "lacquer": "veneer" };
            document.getElementById('outsideColorsLacquer_basic').disabled = true;
            document.getElementById('outsideColorsLacquer_structure').disabled = true;
            document.getElementById('outsideColorsLacquer_gloss').disabled = true;
            document.getElementById('outsideColorsLacquer_veneer').checked = true;
        } else {
            if (model.outsideColor.lacquer != undefined && model.outsideColor.lacquer != "veneer") {
                model.outsideColor = { "color": ALLCOLORS.outsideColors[outsideColorIndex].colorHex, "lacquer": model.outsideColor.lacquer };
            } else {
                model.outsideColor = { "color": ALLCOLORS.outsideColors[outsideColorIndex].colorHex, "lacquer": "basic" };
            }
            document.getElementById('outsideColorsLacquer_basic').disabled = false;
            document.getElementById('outsideColorsLacquer_structure').disabled = false;
            document.getElementById('outsideColorsLacquer_gloss').disabled = false;
            document.getElementById('outsideColorsLacquer_' + model.outsideColor.lacquer).checked = true;
        }
        updateControlPanel(model, 'outsideColors');
        updateFeaturedModel(model, false);
        showSelected(true);
    }));
    if (ALLCOLORS.outsideColors[outsideColorIndex].colorPath != undefined) {
        model.outsideColor.code = ALLCOLORS.outsideColors[outsideColorIndex].colorCode;
        document.getElementById('outsideColorsText').innerHTML = '<img src="https://' + window.location.host + '/' + ALLCOLORS.outsideColors[outsideColorIndex].colorPathThumb + '" class="rounded-pill shadow" style="width: calc(1rem + 1vw);">&nbsp;&nbsp;&nbsp;&nbsp;' + model.outsideColor.name;
    } else {
        if (model.outsideColor.lacquer == "basic") {
            model.outsideColor.code = ALLCOLORS.outsideColors[outsideColorIndex].colorCode.basic;
        }
        if (model.outsideColor.lacquer == "structure") {
            model.outsideColor.code = ALLCOLORS.outsideColors[outsideColorIndex].colorCode.structure;
        }
        if (model.outsideColor.lacquer == "gloss") {
            model.outsideColor.code = ALLCOLORS.outsideColors[outsideColorIndex].colorCode.gloss;
        }
        model.outsideColor.name = ALLCOLORS.outsideColors[outsideColorIndex].colorName;
        document.getElementById('outsideColorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: #' + model.outsideColor.color + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + model.outsideColor.name;
    }
    document.getElementById('outsideColorsIndex_' + outsideColorIndex).classList.remove('colorButton');
    document.getElementById('outsideColorsIndex_' + outsideColorIndex).classList.add('colorButtonActive');

    //insideColor
    const insideColor = model.insideColor.color;
    var insideColorIndex = ALLCOLORS.insideColors.findIndex((item) => item.colorHex == insideColor);
    var insideColorValue = document.querySelectorAll('.insideColors_colorButton');

    if (parser.getDevice().type != 'mobile' && parser.getDevice().type != 'tablet') {
        insideColorValue.forEach(item => item.addEventListener('mouseover', () => {
            document.getElementById('insideColorsText').style.visibility = 'visible';
            document.getElementById('insideColorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: ' + document.getElementById(item.id).style.backgroundColor + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + document.getElementById(item.id).alt + '';
            document.getElementById('insideColorsText').classList.add('fst-italic');
            updateFeaturedModel(model, false);
            showSelected(true);
        }));

        insideColorValue.forEach(item => item.addEventListener('mouseout', () => {
            document.getElementById('insideColorsText').style.visibility = 'hidden';
            document.getElementById('insideColorsText').classList.remove('fst-italic');
            updateFeaturedModel(model, false);
            showSelected(true);
        }));
    }

    insideColorValue.forEach(item => item.addEventListener('click', () => {
        insideColorValue.forEach(item => { item.classList.remove('colorButtonActive') });
        const insideColorId = item.id.split('_');
        insideColorIndex = insideColorId[1];

        model.insideColor = { "color": ALLCOLORS.insideColors[insideColorIndex].colorHex, "lacquer": "structure" };
        document.getElementById('insideColorsIndex_' + insideColorIndex).classList.add('colorButtonActive');

        updateControlPanel(model, 'insideColors');
        updateFeaturedModel(model, false);
        showSelected(true);
    }));
    model.insideColor.code = ALLCOLORS.insideColors[insideColorIndex].colorCode.structure;
    model.insideColor.name = ALLCOLORS.insideColors[insideColorIndex].colorName;
    document.getElementById('insideColorsText').innerHTML = '<img src="img/transparant.png" class="rounded-pill shadow" style="width: calc(1rem + 1vw); background-color: #' + model.insideColor.color + ';">&nbsp;&nbsp;&nbsp;&nbsp;' + model.insideColor.name;
    document.getElementById('insideColorsIndex_' + insideColorIndex).classList.remove('colorButton');
    document.getElementById('insideColorsIndex_' + insideColorIndex).classList.add('colorButtonActive');

    //rollshutter
    document.getElementById('rollshutter').oninput = () => {

        model.rollshutter = document.getElementById('rollshutter').value;
        updateFeaturedModel(model);
        showSelected(false);
    }
    //document.getElementById("rollshutterText").textContent = model.rollshutter + '% open';
    document.getElementById('rollshutter').value = model.rollshutter;

    //price & articleList
    const articleList = [];
    Object.assign(model, { articleList: {} });

    if (model.type == "cabinet") {
        let cabinetBodyPrice;
        let cabinetBodyReducedPrice;
        let cabinetWinerackPrice;
        let cabinetShelfPrice;

        let cabinetBodyIndex = ALLCOMPONENTS.cabinet.body.findIndex(item => item.width == model.width && item.height == model.height);
        let cabinetWinerackIndex = ALLCOMPONENTS.cabinet.winerack.findIndex(item => item.width == model.width);
        let cabinetShelfIndex = ALLCOMPONENTS.cabinet.shelf.findIndex(item => item.width == model.width);

        //body
        let combinationCabinetIndex = ALLCOMPONENTS.cabinet.combination.findIndex(item => item.width == model.width && item.height == model.height && model.outsideColor.color == item.outsideColor.color && model.outsideColor.lacquer == item.outsideColor.lacquer && model.insideColor.color == item.insideColor);
        if (combinationCabinetIndex != -1) {
            cabinetBodyPrice = ALLCOMPONENTS.cabinet.combination[combinationCabinetIndex].price.original;
            cabinetBodyReducedPrice = ALLCOMPONENTS.cabinet.combination[combinationCabinetIndex].price.reduced;
        } else {
            if (model.outsideColor.lacquer == 'veneer') {
                cabinetBodyPrice = ALLCOMPONENTS.cabinet.body[cabinetBodyIndex].price.veneer;
            } else {
                if (model.outsideColor.color == model.insideColor.color) {
                    cabinetBodyPrice = ALLCOMPONENTS.cabinet.body[cabinetBodyIndex].price.monotone;
                } else {
                    cabinetBodyPrice = ALLCOMPONENTS.cabinet.body[cabinetBodyIndex].price.duotone;
                }
            }
        }
        model.articleList.body = { "code": ALLCOMPONENTS.cabinet.body[cabinetBodyIndex].code, "outsideColor": model.outsideColor.code, "insideColor": model.insideColor.code };
        //winerack
        if (model.winerack == true) {
            cabinetWinerackPrice = ALLCOMPONENTS.cabinet.winerack[cabinetWinerackIndex].price;
            if (model.winerackColor == "outsidecolor") {
                model.articleList.winerack = { "code": ALLCOMPONENTS.cabinet.winerack[cabinetWinerackIndex].code, "color": model.outsideColor.code };
            } else {
                model.articleList.winerack = { "code": ALLCOMPONENTS.cabinet.winerack[cabinetWinerackIndex].code, "color": model.insideColor.code };
            }
        } else {
            cabinetWinerackPrice = 0;
        }
        //shelf
        if (model.shelves != undefined && model.shelves != 0) {
            cabinetShelfPrice = ALLCOMPONENTS.cabinet.shelf[cabinetShelfIndex].price;
            model.articleList.shelf = { "code": ALLCOMPONENTS.cabinet.shelf[cabinetShelfIndex].code, "color": model.insideColor.code, "amount": model.shelves };
        } else {
            cabinetShelfPrice = 0;
        }
        cabinetShelfPrice = cabinetShelfPrice * model.shelves;

        let cabinetPrice = cabinetBodyPrice + cabinetWinerackPrice + cabinetShelfPrice;
        let cabinetReducedPrice = cabinetBodyReducedPrice + cabinetWinerackPrice + cabinetShelfPrice;
        if (cabinetBodyReducedPrice != undefined) {
            document.getElementById('price').textContent = '€ ' + cabinetReducedPrice + ',-';
            document.getElementById('name').textContent = ALLCOMPONENTS.cabinet.combination[combinationCabinetIndex].name;
        }
        else {
            document.getElementById('price').textContent = '€ ' + cabinetPrice + ',-';
            document.getElementById('name').textContent = null;
        }
    }

    if (model.type == "sideboard") {
        let sideboardBodyPrice;
        let sideboardBodyReducedPrice;
        let sideboardBodyIndex = ALLCOMPONENTS.sideboard.body.findIndex(item => item.width == model.width);
        //body
        let combinationSideboardIndex = ALLCOMPONENTS.sideboard.combination.findIndex(item => item.width == model.width && item.outsideColor.color == model.outsideColor.color && item.outsideColor.lacquer == model.outsideColor.lacquer && item.insideColor == model.insideColor.color);
        if (combinationSideboardIndex != -1) {
            sideboardBodyPrice = ALLCOMPONENTS.sideboard.combination[combinationSideboardIndex].price.original;
            sideboardBodyReducedPrice = ALLCOMPONENTS.sideboard.combination[combinationSideboardIndex].price.reduced;
        } else {
            if (model.outsideColor.color == model.insideColor.color) {
                sideboardBodyPrice = ALLCOMPONENTS.sideboard.body[sideboardBodyIndex].price.monotone;
            } else {
                sideboardBodyPrice = ALLCOMPONENTS.sideboard.body[sideboardBodyIndex].price.duotone;
            }
        }
        model.articleList.body = { "code": ALLCOMPONENTS.sideboard.body[sideboardBodyIndex].code, "outsideColor": model.outsideColor.code, "insideColor": model.insideColor.code };
        if (sideboardBodyReducedPrice != undefined) {
            document.getElementById('price').textContent = '€ ' + sideboardBodyReducedPrice + ',-';
            document.getElementById('name').textContent = ALLCOMPONENTS.sideboard.combination[combinationSideboardIndex].name;
        } else {
            document.getElementById('price').textContent = '€ ' + sideboardBodyPrice + ',-';
            document.getElementById('name').textContent = null;
        }
    }
    if (model.type == "sideboardOnFrame") {
        let sideboardOnFrameBodyPrice;
        let sideboardOnFrameBodyReducedPrice;
        let sideboardOnFrameBodyIndex = ALLCOMPONENTS.sideboardOnFrame.body.findIndex(item => item.width == model.width && item.interior == model.interior);
        //body
        var combinationSideboardOnFrameIndex = ALLCOMPONENTS.sideboardOnFrame.combination.findIndex(item => item.width == model.width && item.outsideColor.color == model.outsideColor.color && item.outsideColor.lacquer == model.outsideColor.lacquer && item.insideColor == model.insideColor.color && item.interior == model.interior);
        if (combinationSideboardOnFrameIndex != -1) {
            sideboardOnFrameBodyPrice = ALLCOMPONENTS.sideboardOnFrame.combination[combinationSideboardOnFrameIndex].price.original;
            sideboardOnFrameBodyReducedPrice = ALLCOMPONENTS.sideboardOnFrame.combination[combinationSideboardOnFrameIndex].price.reduced;
        } else {
            if (model.outsideColor.color == model.insideColor.color) {
                sideboardOnFrameBodyPrice = ALLCOMPONENTS.sideboardOnFrame.body[sideboardOnFrameBodyIndex].price.monotone;
            } else {
                sideboardOnFrameBodyPrice = ALLCOMPONENTS.sideboardOnFrame.body[sideboardOnFrameBodyIndex].price.duotone;
            }
        }
        model.articleList.body = { "code": ALLCOMPONENTS.sideboardOnFrame.body[sideboardOnFrameBodyIndex].code, "outsideColor": model.outsideColor.code, "insideColor": model.insideColor.code };
        if (sideboardOnFrameBodyReducedPrice != undefined) {
            document.getElementById('price').textContent = '€ ' + sideboardOnFrameBodyReducedPrice + ',-';
            document.getElementById('name').textContent = ALLCOMPONENTS.sideboardOnFrame.combination[combinationSideboardOnFrameIndex].name;
        } else {
            document.getElementById('price').textContent = '€ ' + sideboardOnFrameBodyPrice + ',-';
            document.getElementById('name').textContent = null;
        }
    }
    if (model.type == "sideboardOnFrameTV") {
        var sideboardOnFrameTVBodyPrice;
        let sideboardOnFrameTVBodyIndex = ALLCOMPONENTS.sideboardOnFrameTV.body.findIndex(
            item => item.width == model.width
        );
        //body              
        if (model.outsideColor.color == model.insideColor.color) {
            sideboardOnFrameTVBodyPrice = ALLCOMPONENTS.sideboardOnFrameTV.body[sideboardOnFrameTVBodyIndex].price.monotone;
        } else {
            sideboardOnFrameTVBodyPrice = ALLCOMPONENTS.sideboardOnFrameTV.body[sideboardOnFrameTVBodyIndex].price.duotone;
        }
        model.articleList.body = { "code": ALLCOMPONENTS.sideboardOnFrameTV.body[sideboardOnFrameTVBodyIndex].code, "outsideColor": model.outsideColor.code, "insideColor": model.insideColor.code };
        document.getElementById('price').textContent = '€ ' + sideboardOnFrameTVBodyPrice + ',-';
        document.getElementById('name').textContent = null;
    }

    //adddecor
    if (model.type == "cabinet") {
        addDecor(model.type, model.width, model.height, 37, model.height, 0, ALLCOLORS.decorWall[DECORWALLINDEX].colorHex, ALLCOLORS.decorWall[DECORWALLINDEX].colorPath, ALLCOLORS.decorFloor[DECORFLOORINDEX].colorHex, ALLCOLORS.decorFloor[DECORFLOORINDEX].colorPath);
    }
    if (model.type == "sideboardOnFrameTV") {
        addDecor(model.type, model.width, model.height, 37, 25, 13, ALLCOLORS.decorWall[DECORWALLINDEX].colorHex, ALLCOLORS.decorWall[DECORWALLINDEX].colorPath, ALLCOLORS.decorFloor[DECORFLOORINDEX].colorHex, ALLCOLORS.decorFloor[DECORFLOORINDEX].colorPath);
    }
    if (model.type == "sideboard" || model.type == "sideboardOnFrame") {
        addDecor(model.type, model.width, model.height, 37, model.height, 0, ALLCOLORS.decorWall[DECORWALLINDEX].colorHex, ALLCOLORS.decorWall[DECORWALLINDEX].colorPath, ALLCOLORS.decorFloor[DECORFLOORINDEX].colorHex, ALLCOLORS.decorFloor[DECORFLOORINDEX].colorPath);
    }

    //pdf generator
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

function initSettings(model) {
    const accordions = {};
    let noType;
    if (urlParams.has('noType')) {
        noType = "d-none";
    } else {
        noType = "d-block";
    }
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
    accordions.type = {
        "title": "type",
        "options": ['type'],
        "display": noType,
        "code": /*html*/ `
        <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
            <div class="d-flex justify-content-start m-0 p-0 ">
                <div class="card border-0 grid gap row-gap-3">
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="type" value="cabinet" id="cabinet">
                        <label class="form-check-label" for="cabinet">cabinet</label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="type" value="sideboard" id="sideboard">
                        <label class="form-check-label" for="sideboard">sideboard</label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="type" value="sideboard on frame &quot;twist&quot;" id="sideboardOnFrame">
                        <label class="form-check-label" for="sideboardOnFrame">sideboard on frame "twist"</label>
                    </div>
                    <div class="h6 fw-normal form-check">
                        <input type="radio" class="form-check-input" name="type" value="sideboard on frame &quot;twist&quot; TV" id="sideboardOnFrameTV">
                        <label class="form-check-label" for="sideboardOnFrameTV">sideboard on frame "twist" TV</label>
                    </div>
                </div>
            </div>
        </div>`
    }
    if (model.type == "cabinet") {
        accordions.sizeCabinet = {
            "title": "size",
            "options": ['width', 'height'],
            "display": noSize,
            "code": /*html*/ `
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                <div class="d-flex justify-content-start m-0 p-0">
                    <div class="card border-0 grid gap row-gap-3 me-5">
                        <div class="h6">width</div>
                        <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="cabinet_width" id="37">
                            <label class="form-check-label" for="37">37 cm</label>
                        </div>
                        <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="cabinet_width" id="55">
                            <label class="form-check-label" for="55">55 cm</label>
                        </div>
                        <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="cabinet_width" id="74">
                            <label class="form-check-label" for="74">74 cm</label>
                        </div>
                    </div>
                    <div class="card border-0 grid gap row-gap-3">
                        <div class="h6">height</div>
                        <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="cabinet_height" id="170">
                            <label class="form-check-label" for="170">170 cm</label>
                        </div>
                        <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="cabinet_height" id="205">
                            <label class="form-check-label" for="205">205 cm</label>
                        </div>
                        <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="cabinet_height" id="221">
                            <label class="form-check-label" for="221">221 cm</label>
                        </div>
                    </div>
                </div>
            </div>`
        }
    }
    if (model.type == "sideboard" || model.type == "sideboardOnFrame") {
        accordions.sizeSideboard = {
            "title": "size",
            "options": [],
            "display": noSize,
            "code": /*html*/ `
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                <div class="d-flex justify-content-start m-0 p-0">
                    <div class="card border-0 grid gap row-gap-3 me-5">
                        <div class="h6">width</div>
                        <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="sideboard_width" id="156">
                            <label class="form-check-label" for="156">156 cm</label>
                        </div>
                        <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="sideboard_width" id="194">
                            <label class="form-check-label" for="194">194 cm</label>
                        </div>
                    </div>
                </div>
            </div>`
        }
    }
    if (model.type == "cabinet") {
        accordions.optionsCabinet = {
            "title": "options",
            "options": ['winerack', 'shelves'],
            "display": "d-block",
            "code": /*html*/ `
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                <div class="d-flex justify-content-start m-0 p-0">
                    <div class="card border-0 grid gap row-gap-3 me-5">
                    <div class="h6 fw-normal form-check">
                            <input type="checkbox" class="form-check-input" id="winerack">
                            <label class="form-check-label" for="winerack">winerack</label>
                        </div>
                        <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="winerackcolor" id="winerackoutsidecolor" value="outsidecolor">
                            <label class="form-check-label" for="winerackoutsidecolor">in color outside</label>
                        </div>
                        <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="winerackcolor" id="winerackinsidecolor" value="insidecolor">
                            <label class="form-check-label" for="winerackinsidecolor">in color inside</label>
                        </div>
                    </div>
                    <div class="card border-0 grid gap row-gap-3">
                        <div class="h6">extra shelves</div>
                        <select class="form-select" id="shelves" aria-label="shelves">
                            <option id="0_shelves" value="0">0</option>
                            <option id="1_shelves" value="1">1</option>
                            <option id="2_shelves" value="2">2</option>
                            <option id="3_shelves" value="3">3</option>
                            <option id="4_shelves" value="4">4</option>
                            <option id="5_shelves" value="5">5</option>
                            <option id="6_shelves" value="6">6</option>
                            <option id="7_shelves" value="7">7</option>
                            <option id="8_shelves" value="8">8</option>
                        </select>
                    </div>
                </div>
            </div>`
        }
    }
    if (model.type == "sideboardOnFrame" && model.width == 156) {
        accordions.optionsSideboardOnFrame156 = {
            "title": "options",
            "options": [],
            "display": "d-block",
            "code": /*html*/ `
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                <div class="d-flex justify-content-start m-0 p-0">
                    <div class="card border-0 grid gap row-gap-3">
                        <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="interior" id="156_one" value="one">
                            <label class="form-check-label" for="156_one" id="156_oneLabel">interior with winerack</label>
                        </div>
                        <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="interior" id="156_two" value="two">
                            <label class="form-check-label" for="156_two" id="156_twoLabel">interior shelves horizontal</label>
                        </div>
                        <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="interior" id="156_three" value="three">
                            <label class="form-check-label" for="156_three" id="156_threeLabel">interior shelves vertical</label>
                        </div>
                    </div>
                </div>
            </div>`
        }
    }
    if (model.type == "sideboardOnFrame" && model.width == 194) {
        accordions.optionsSideboardOnFrame194 = {
            "title": "options",
            "options": ['optionsSideboardOnFrame'],
            "display": "d-block",
            "code": /*html*/ `
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                <div class="d-flex justify-content-start m-0 p-0">
                    <div class="card border-0 grid gap row-gap-3">
                        <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="interior" id="194_one" value="one">
                            <label class="form-check-label" for="194_one" id="194_oneLabel">interior with winerack</label>
                        </div>
                        <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="interior" id="194_two" value="two">
                            <label class="form-check-label" for="194_two" id="194_twoLabel">interior with extended winerack</label>
                        </div>
                        <div class="h6 fw-normal form-check">
                            <input type="radio" class="form-check-input" name="interior" id="194_three" value="three">
                            <label class="form-check-label" for="194_three" id="194_threeLabel">interior with shelves</label>
                        </div>
                    </div>
                </div>
            </div>`
        }
    }
    if (model.type == "cabinet") {
        accordions.outsideColors = {
            "title": "outside colors",
            "options": ['outsideColors'],
            "display": "d-block",
            "code": /*html*/ `
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                <div class="col-xxl-5 col-xl-5 col-12 m-0 p-0">
                    <div class="row m-0 p-0 pb-2">
                        <div class="d-flex justify-content-start m-0 p-0">
                            <div class="h6 fw-normal form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="outsideColorsLacquer" id="outsideColorsLacquer_basic" value="basic">
                                <label class="form-check-label" for="outsideColorsLacquer">basic</label>
                            </div>
                            <div class="h6 fw-normal form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="outsideColorsLacquer" id="outsideColorsLacquer_structure" value="structure">
                                <label class="form-check-label" for="outsideColorsLacquer">structure</label>
                            </div>
                            <div class="h6 fw-normal form-check form-check-inline invisible"><!-- invisible because gloss is not applicable -->
                                <input class="form-check-input" type="radio" name="outsideColorsLacquer" id="outsideColorsLacquer_gloss" value="gloss">
                                <label class="form-check-label" for="outsideColorsLacquer">gloss</label>
                            </div>
                        </div>
                    </div>
                    
                    <div id="outsideColorsPicker" class="m-0 p-0"></div>
                </div>
                <div class="col-xxl-1 col-xl-1 col-12 m-0 p-0">
                </div>
                <div class="col-xxl-3 col-xl-3 col-7 m-0 p-0">
                    <div class="row m-0 p-0 pb-2">
                        <div class="d-flex justify-content-start m-0 p-0">
                            <div class="h6 fw-normal form-check form-check-inline invisible">
                                <input class="form-check-input" type="radio" name="outsideColorsLacquer" id="outsideColorsLacquer_veneer" value="veneer">
                                <label class="form-check-label" for="outsideColorsLacquer">veneer</label>
                            </div>
                        </div>
                        <div id="outsideTexturesPicker" class="m-0 p-0"></div>
                    </div>
                </div>
            </div>`,
            "onload": function () {
                let containerElemOutsideColorsColors = document.getElementById("outsideColorsPicker");
                addColors('outsideColors', ALLCOLORS.outsideColors, containerElemOutsideColorsColors);
                let containerElemOutsideColorsTextures = document.getElementById("outsideTexturesPicker");
                addTextures('outsideColors', ALLCOLORS.outsideColors, containerElemOutsideColorsTextures);
            }
        }
    }
    if (model.type == "sideboard" || model.type == "sideboardOnFrame" || model.type == "sideboardOnFrameTV") {
        accordions.outsideColors = {
            "title": "outside colors",
            "options": ['outsideColors'],
            "display": "d-block",
            "code": /*html*/ `
            <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
                <div class="col-xxl-5 col-xl-5 col-12 m-0 p-0">
                    <div class="row m-0 p-0 pb-2">
                        <div class="d-flex justify-content-start m-0 p-0">
                            <div class="h6 fw-normal form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="outsideColorsLacquer" id="outsideColorsLacquer_basic" value="basic">
                                <label class="form-check-label" for="outsideColorsLacquer">basic</label>
                            </div>
                            <div class="h6 fw-normal form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="outsideColorsLacquer" id="outsideColorsLacquer_structure" value="structure">
                                <label class="form-check-label" for="outsideColorsLacquer">structure</label>
                            </div>
                            <div class="h6 fw-normal form-check form-check-inline invisible"><!-- invisible because gloss is not applicable -->
                                <input class="form-check-input" type="radio" name="outsideColorsLacquer" id="outsideColorsLacquer_gloss" value="gloss">
                                <label class="form-check-label" for="outsideColorsLacquer">gloss</label>
                            </div>
                        </div>
                        <div  id="outsideColorsPicker" class="m-0 p-0"></div>
                    </div>
                </div>
            </div>`,
            "onload": function () {
                let containerElemOutsideColorsColors = document.getElementById("outsideColorsPicker");
                addColors('outsideColors', ALLCOLORS.outsideColors, containerElemOutsideColorsColors);
            }
        }
    }
    accordions.insideColors = {
        "title": "inside colors",
        "options": ['insideColors'],
        "display": "d-block",
        "code": /*html*/ `
        <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
            <div class="col-xxl-5 col-xl-5 col-12 m-0 p-0">
                <div class="row m-0 p-0 pb-2">
                    <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                        <div class="h6 fw-normal card border-0 pb-2">structure&nbsp;</div>
                        <div id="insideColorPicker" class="m-0 p-0"></div>
                    </div>
                </div>
            </div>
        </div>`,
        "onload": function () {
            let containerElem = document.getElementById("insideColorPicker");
            addColors('insideColors', ALLCOLORS.insideColors, containerElem);
        }
    }
    accordions.decor = {
        "title": "decor",
        "options": ['wall', 'floor'],
        "display": noDecor,
        "code": /*html*/ `
        <div class="row m-0 p-0 pb-xxl-4 pb-xl-4 pb-3">
            <div class="col-xxl-3 col-xl-3 col-7 m-0 p-0">
                <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                    <div class="h6 fw-normal card border-0 pb-2">wall</div>
                    <div  id="decorWallColorPicker" class="m-0 p-0"></div>
                </div>
            </div>
            <div class="col-xxl-1 col-xl-1 col-12 m-0 p-0">
            </div>
            <div class="col-xxl-3 col-xl-3 col-7 m-0 p-0">
                <div class="row m-0 p-0 pb-2 d-flex justify-content-start m-0 p-0">
                    <div class="h6 fw-normal card border-0 pb-2">floor</div>
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