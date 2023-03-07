/**
 * Author: zhuwei
 * CreateDate: 2020-08-05
 */
import * as d3 from 'd3';

import ChartUtil from "../utils/chartUtil";

import globalInfos from '../utils/constant';
import {
    DataStore
} from '../utils/dataStorage';

var leftBottomPoint = {}; //最内侧右边套管的底
var rightBottomPoint = {}; //最内侧左边套管的底
var drawZxd = true; //是否画造斜点标记
var zxdCs = null;
var labelCount = {}; //存放各深度label重叠信息
var luoYanShaiGuanCount = 0;

let dZsD = []

/**
 * 画地平线
 * @param width
 */
function drawGroundLine(chartId) {
    let width = document.getElementById(chartId).offsetWidth;
    let svg = d3.select('#' + chartId).select("svg");
    let data = [

        [globalInfos.LEFT_MARGIN, 0],
        [width, 0]

    ];
    ChartUtil.drawLineByD3(svg, data, 3);
    DataStore.setLeft(globalInfos.LEFT_MARGIN);
    DataStore.setRight(width);

    //标题居中
    let chartTitle = document.querySelector('.chart-title-center');
        chartTitle.style.width = width+globalInfos.LEFT_MARGIN + 'px';

}

/**
 * 初始化画图容器
 * @param chartId
 * @param width
 * @param height
 */
function initChart(chartId) {
    document.getElementById(chartId).querySelector('svg').innerHTML = '';
    document.querySelector('.chart-box').style.width = 'auto';
    document.getElementById(chartId).style.height = '100%';
    let svg = d3.select('#' + chartId).select("svg");
    svg.attr('width', '100%').attr('height', 10);
    leftBottomPoint = {}; //最内侧右边套管的底
    rightBottomPoint = {}; //最内侧左边套管的底
    drawZxd = true; //是否画造斜点标记
    zxdCs = null;
    labelCount = {}; //存放各深度label重叠信息

}

function initSvg(chartId, data) {
    let width = document.getElementById(chartId).offsetWidth;
    let height = document.getElementById(chartId).offsetHeight;
    if (data.tg.cs >= globalInfos.MAX_CS) {
        document.getElementById(chartId).style.height = height + Math.round(data.tg.cs / globalInfos.MAX_CS) * globalInfos._HIEGHT_INTERVAL + 'px';
        height = document.getElementById(chartId).offsetHeight;
    }
    let svg = d3.select('#' + chartId).select("svg");
    svg.attr('width', width).attr('height', height);
}


/**
 * 画单个套管
 * @param tg
 * @param i
 * @param chartId
 */
function drawSingleTG(tg, i, tgCount, yIntervals, chartId) {
    let svg = d3.select('#' + chartId).select("svg");
    let width = document.getElementById(chartId).offsetWidth - globalInfos.LEFT_MARGIN;
    let height = document.getElementById(chartId).offsetHeight;
    let xAxisIntervals = tgCount * 2 + globalInfos.JTWIDTH + globalInfos.LEFT_MARGIN_WIDTH + globalInfos.RIGHT_MARGIN_WIDTH;
    let xScale = ChartUtil.getLineScale(0, xAxisIntervals, 0, width);
    let yScale = ChartUtil.getLineScale(0, yIntervals, 0, height - 40);

    let leftX = xScale(i + globalInfos.LEFT_MARGIN_WIDTH) + globalInfos.LEFT_MARGIN;


    drawTg(svg, tg, leftX, xScale, yScale, 'left', i, xAxisIntervals); //画左边套管
    let rightX = xScale(xAxisIntervals - globalInfos.RIGHT_MARGIN_WIDTH - 1 - i) + globalInfos.LEFT_MARGIN;
    drawTg(svg, tg, rightX, xScale, yScale, 'right', i, xAxisIntervals); //画右边套管
    zxdCs = tg.zxd;

}

/**
 * 画套管
 * @param svg
 * @param tg
 * @param x
 * @param y
 * @param tgWidth
 * @param yScale
 */
function drawTg(svg, tg, x, xScale, yScale, isLeft, xh, xAxisIntervals) {
    let tgWidth = xScale(1);
    let y = yScale(tg.start);
    let zxdY = yScale(tg.zxd);
    let endY = yScale(tg.end);
    let snfsY = yScale(tg.snfs);
    let tgPathData = [];
    let snfsPathData = [];
    let trianglePathData = [];
    let leftBottomPianYi = null;
    DataStore.setBottom(endY);
    if (tg.addition.name == '裸眼' || tg.addition.name == '筛管') {
        tgWidth = 0;
    }

    if (tg.zxd && tg.end > tg.zxd) {
        let snfsRight;
        if (tg.zxd > tg.start) { //套管形状为L型
            leftBottomPianYi = ChartUtil.getTranform20(x, zxdY, endY);
            if (tg.addition.name == '裸眼' || tg.addition.name == '筛管') {
                if (isLeft == 'left') {
                    tgPathData = [
                        [x, y],
                        [x, zxdY],
                        [leftBottomPianYi, endY]
                    ];
                } else {
                    leftBottomPianYi += xScale(1);
                    tgPathData = [
                        [leftBottomPianYi, endY],
                        [x + xScale(1), zxdY],
                        [x + xScale(1), y]
                    ];
                }

            } else {
                tgPathData = [
                    [x, y],
                    [x, zxdY],
                    [leftBottomPianYi, endY],
                    [leftBottomPianYi + tgWidth, endY],
                    [x + tgWidth, zxdY],
                    [x + tgWidth, y],
                    [x, y]
                ];
            }


            if (tg.snfs != null && tg.snfs > tg.zxd) { //水泥返深大于造斜点， 只填充斜的部分
                let snfsPianYi = ChartUtil.getTranform20(x, zxdY, snfsY);
                snfsPathData = [
                    [snfsPianYi + 0.5, snfsY + 0.5],
                    [leftBottomPianYi + 0.5, endY - 0.5],
                    [leftBottomPianYi + tgWidth - 0.5, endY - 0.5],
                    [snfsPianYi + tgWidth - 0.5, snfsY + 0.5],
                    [snfsPianYi + 0.5, snfsY + 0.5]
                ];
                snfsRight = snfsPianYi;
            }
            if (tg.snfs != null && tg.snfs <= tg.zxd) { //水泥返深小于造斜点， 填充L状
                snfsPathData = [
                    [x + 0.5, snfsY + 0.5],
                    [x + 0.5, zxdY],
                    [leftBottomPianYi + 0.5, endY - 0.5],
                    [leftBottomPianYi + tgWidth - 0.5, endY - 0.5],
                    [x + tgWidth, zxdY],
                    [x + tgWidth - 0.5, snfsY + 0.5],
                    [x + 0.5, snfsY + 0.5]
                ];
                snfsRight = x;
            }

        } else { //套管形状为 斜"\" 状

            let leftTopPianYi = ChartUtil.getTranform20(x, zxdY, y);
            leftBottomPianYi = ChartUtil.getTranform20(x, zxdY, endY);
            if (tg.addition.name == '裸眼' || tg.addition.name == '筛管') {
                if (isLeft == 'left') {
                    tgPathData = [
                        [leftTopPianYi, y],
                        [leftBottomPianYi, endY]
                    ];
                } else {
                    leftBottomPianYi += xScale(1);
                    tgPathData = [
                        [leftBottomPianYi, endY],
                        [leftTopPianYi + xScale(1), y]
                    ];
                }

            } else {
                tgPathData = [
                    [leftTopPianYi, y],
                    [leftBottomPianYi, endY],
                    [leftBottomPianYi + tgWidth, endY],
                    [leftTopPianYi + tgWidth, y],
                    [leftTopPianYi, y]
                ];
            }

            if (tg.snfs != null && tg.snfs >= tg.start) {
                let snfsPianYi = ChartUtil.getTranform20(x, zxdY, snfsY);
                snfsPathData = [
                    [snfsPianYi + 0.5, snfsY + 0.5],
                    [leftBottomPianYi + 0.5, endY - 0.5],
                    [leftBottomPianYi + tgWidth - 0.5, endY - 0.5],
                    [snfsPianYi + tgWidth - 0.5, snfsY + 0.5],
                    [snfsPianYi + 0.5, snfsY + 0.5]
                ];
                snfsRight = snfsPianYi;
            }
            if (tg.snfs != null && tg.snfs < tg.start) {
                snfsPathData = tgPathData;
            }

        }
        let triangleTopPianYi = ChartUtil.getTranform20(x, zxdY, endY - 10);
        let triangleTopData = [isLeft == 'left' ? triangleTopPianYi + tgWidth : triangleTopPianYi, endY - 10];
        trianglePathData = [
            [leftBottomPianYi, endY],
            [leftBottomPianYi + tgWidth, endY], triangleTopData
        ];

        if (isLeft == 'left') {
            leftBottomPoint = {
                x: leftBottomPianYi,
                y: endY,
                zxdY: zxdY,
                tgWidth: tgWidth
            };
        } else {
            rightBottomPoint = {
                x: leftBottomPianYi,
                y: endY,
                zxdY: zxdY,
                tgWidth: tgWidth
            };
            //套管标注
            let theLabelCount = labelCount[tg.end];
            let labelPianyi = getLabelPianYi(theLabelCount);
            if (theLabelCount.iterator == 0) {
                ChartUtil.drawLineByD3(svg, [
                    [leftBottomPianYi + tgWidth, endY],
                    [leftBottomPianYi + xh * tgWidth + 30, endY]
                ], 1);
            }

            let text = tg.addition.start && tg.addition.start != 0.0 ? '(' + tg.addition.startString + 'm - ' + tg.addition.endString + 'm)' : tg.addition.endString + 'm';
            text = tg.addition.name + ':D' + tg.addition.wjString + 'mm×' + text;
            ChartUtil.drawText(svg, text, leftBottomPianYi + xh * tgWidth + 32, endY - labelPianyi + 5);
            theLabelCount.iterator++;
            DataStore.setRight(leftBottomPianYi + xh * tgWidth + 32 + text.visualLength());
            //水泥返深标注
            if (tg.snfs && tg.snfs > tg.start) {
                let theLabelCount = labelCount[tg.snfs];
                let labelPianyi = getLabelPianYi(theLabelCount);
                if (theLabelCount.iterator == 0) {
                    ChartUtil.drawLineByD3(svg, [
                        [snfsRight, snfsY],
                        [snfsRight + xh * tgWidth + 30, snfsY]
                    ], 1);
                }
                let text = '水泥返深:' + tg.addition.snfsString + 'm';
                ChartUtil.drawText(svg, text, snfsRight + xh * tgWidth + 32, snfsY - labelPianyi + 5);
                theLabelCount.iterator++;
                DataStore.setRight(snfsRight + xh * tgWidth + 32 + text.visualLength());
            }
            //造斜点标记
            if (drawZxd) {
                let theLabelCount = labelCount[tg.zxd];
                let labelPianyi = getLabelPianYi(theLabelCount);
                if (theLabelCount.iterator == 0) {
                    ChartUtil.drawLineByD3(svg, [
                        [x, yScale(tg.zxd)],
                        [x + xh * tgWidth + 30, yScale(tg.zxd)]
                    ], 1);
                }
                let text = '造斜点:' + tg.addition.zxdString + 'm';
                ChartUtil.drawText(svg, text, x + xh * tgWidth + 32, yScale(tg.zxd) - labelPianyi);
                theLabelCount.iterator++;
                drawZxd = false;
                DataStore.setRight(x + xh * tgWidth + 32 + text.visualLength());
            }

        }

    } else { //没有造斜点，为直筒状
        if (tg.addition.name == '裸眼' || tg.addition.name == '筛管') {
            if (isLeft == 'left') {
                tgPathData = [
                    [x, y],
                    [x, endY]
                ];
            } else {
                x += xScale(1);
                tgPathData = [
                    [x, endY],
                    [x, y]
                ];
            }

        } else {
            tgPathData = [
                [x, y],
                [x, endY],
                [x + tgWidth, endY],
                [x + tgWidth, y],
                [x, y]
            ];
        }

        if (tg.snfs != null) {
            snfsPathData = [
                [x + 0.5, snfsY + 0.5],
                [x + 0.5, endY - 0.5],
                [x + tgWidth - 0.5, endY - 0.5],
                [x + tgWidth - 0.5, snfsY + 0.5],
                [x + 0.5, snfsY + 0.5]
            ];
        }
        let triangleTopData = [isLeft == 'left' ? x + tgWidth : x, endY - 10];
        trianglePathData = [
            [x, endY],
            [x + tgWidth, endY], triangleTopData
        ];

        if (isLeft == 'left') {
            leftBottomPoint = {
                x: x,
                y: endY,
                zxdY: undefined,
                tgWidth: tgWidth
            };
        } else {
            rightBottomPoint = {
                x: x,
                y: endY,
                zxdY: undefined,
                tgWidth: tgWidth
            };
            //套管标注
            let theLabelCount = labelCount[tg.end];
            let labelPianyi = getLabelPianYi(theLabelCount);
            if (theLabelCount.iterator == 0) {
                ChartUtil.drawLineByD3(svg, [
                    [x + tgWidth, endY],
                    [globalInfos.LEFT_MARGIN + xScale(xAxisIntervals - 2), endY]
                ], 1);
            }

            let text = tg.addition.start && tg.addition.start != 0.0 ? '(' + tg.addition.startString + 'm - ' + tg.addition.endString + 'm)' : tg.addition.endString + 'm';
            text = tg.addition.name + ':D' + tg.addition.wjString + 'mm×' + text;
            ChartUtil.drawText(svg, text, globalInfos.LEFT_MARGIN + xScale(xAxisIntervals - 2) + 3, endY - labelPianyi);
            theLabelCount.iterator++;
            DataStore.setRight(globalInfos.LEFT_MARGIN + xScale(xAxisIntervals - 2) + 3 + text.visualLength());
            //水泥返深标注
            if (tg.snfs) {
                let theLabelCount = labelCount[tg.snfs];
                let labelPianyi = getLabelPianYi(theLabelCount);
                if (theLabelCount.iterator == 0) {
                    ChartUtil.drawLineByD3(svg, [
                        [x, snfsY],
                        [globalInfos.LEFT_MARGIN + xScale(xAxisIntervals - 2), snfsY]
                    ], 1);
                }
                let text = '水泥返深:' + tg.addition.snfsString + 'm';
                ChartUtil.drawText(svg, text, globalInfos.LEFT_MARGIN + xScale(xAxisIntervals - 2) + 3, snfsY - labelPianyi);
                theLabelCount.iterator++;
                DataStore.setRight(globalInfos.LEFT_MARGIN + xScale(xAxisIntervals - 2) + 3 + text.visualLength());
            }
        }

    }
    if (tg.addition.name == '裸眼') {
        ChartUtil.drawLineByD3(svg, tgPathData, 1);
    } else if (tg.addition.name == '筛管') {
        let path = ChartUtil.drawLineByD3(svg, tgPathData, 1);
        path.attr('stroke-dasharray', '2, 2');
    } else {
        ChartUtil.fillPathByD3(svg, tgPathData, 'none', 1); //套管边线
        ChartUtil.fillPathByD3(svg, snfsPathData, '#ccc', 0.6); //水泥返深
        ChartUtil.fillPathByD3(svg, trianglePathData, '#333', 0); //小三角
    }

}

/**
 * 标注偏移量
 * @param theLabelCount
 * @returns {number}
 */
function getLabelPianYi(theLabelCount) {
    let half = Math.floor(theLabelCount.count / 2);
    let pianYi = (half - theLabelCount.iterator) * 12;
    return pianYi;
}

/**
 * 人工井底下面的草
 * @param svg
 * @param start
 * @param end
 * @param y
 */
function drawGrass(svg, start, end, y) {
    let data = ChartUtil.getGrassData(start, end, y);
    ChartUtil.drawGrass(svg, data);
}

/**
 * 画人工井底和完钻井深部分
 */
let rgjdHeight; //人工井底高度

function drawWzjsJD(chartId, data) {
    if (!data.wellinfo.wzjs && !data.wellinfo.rgjd) {
        return;
    }
    if (data.wellinfo.wzjs == data.wellinfo.rgjd) {
        data.wellinfo.rgjd = null;
    }
    let svg = d3.select('#' + chartId).select("svg");
    let yIntervals = data.tg.cs;
    let height = document.getElementById(chartId).clientHeight;
    let yScale = ChartUtil.getLineScale(0, yIntervals, 0, height - 40);
    let width = document.getElementById(chartId).offsetWidth - globalInfos.LEFT_MARGIN;
    let tgCount = data.tg.data.length - luoYanShaiGuanCount;
    let xAxisIntervals = tgCount * 2 + globalInfos.JTWIDTH + globalInfos.LEFT_MARGIN_WIDTH + globalInfos.RIGHT_MARGIN_WIDTH;
    let xScale = ChartUtil.getLineScale(0, xAxisIntervals, 0, width);
    let toolLeft = globalInfos.LEFT_MARGIN + xScale(globalInfos.LEFT_MARGIN_WIDTH + tgCount);
    let pathData = [],
        grassLeft, grassRight, wzjsRight;
    let rgjd = Math.max(yScale(data.wellinfo.rgjd), leftBottomPoint.y - 30),
        wzjs = Math.max(yScale(data.wellinfo.wzjs), leftBottomPoint.y + 30);
    let labelRightX = rightBottomPoint.x + 30;
    rgjdHeight = rgjd
    if (!leftBottomPoint.zxdY) { //直筒
        if (data.wellinfo.wzjs && data.wellinfo.rgjd) {
            pathData = [
                [leftBottomPoint.x + leftBottomPoint.tgWidth, rgjd],
                [rightBottomPoint.x, rgjd],
                [rightBottomPoint.x, rightBottomPoint.y],
                [rightBottomPoint.x + rightBottomPoint.tgWidth, rightBottomPoint.y],
                [rightBottomPoint.x + rightBottomPoint.tgWidth, wzjs],
                [leftBottomPoint.x, wzjs],
                [leftBottomPoint.x, leftBottomPoint.y],
                [leftBottomPoint.x + leftBottomPoint.tgWidth, leftBottomPoint.y]
            ];
            grassLeft = leftBottomPoint.x + leftBottomPoint.tgWidth;
            grassRight = rightBottomPoint.x;
            wzjsRight = rightBottomPoint.x + rightBottomPoint.tgWidth;
            ChartUtil.fillPathByD3(svg, pathData, '#ccc', 1);
            drawGrass(svg, grassLeft, grassRight, rgjd); //斜着的草
        } else { //只有完钻井深，没有人工井底
            pathData = [
                [rightBottomPoint.x, rightBottomPoint.y],
                [rightBottomPoint.x, wzjs],
                [leftBottomPoint.x + leftBottomPoint.tgWidth, wzjs],
                [leftBottomPoint.x + leftBottomPoint.tgWidth, leftBottomPoint.y]
            ];
            ChartUtil.fillPathByD3(svg, pathData, 'none', 1);
            wzjsRight = rightBottomPoint.x;
        }
        labelRightX = globalInfos.LEFT_MARGIN + xScale(xAxisIntervals - 2);
    } else {

        let wzjsRightBottom = ChartUtil.getTranform20(rightBottomPoint.x + rightBottomPoint.tgWidth, rightBottomPoint.y, wzjs);
        let rgjdLeft = ChartUtil.getTranform20(toolLeft, yScale(zxdCs), rgjd);
        let rgjdRight = rgjdLeft + xScale(globalInfos.JTWIDTH);
        let wzjsLeftBottom = ChartUtil.getTranform20(leftBottomPoint.x, leftBottomPoint.y, wzjs);
        if (data.wellinfo.wzjs && data.wellinfo.rgjd) {
            pathData = [
                [rgjdLeft + 1, rgjd],
                [rgjdRight, rgjd],
                [rightBottomPoint.x, rightBottomPoint.y],
                [rightBottomPoint.x + rightBottomPoint.tgWidth, rightBottomPoint.y],
                [wzjsRightBottom, wzjs],
                [wzjsLeftBottom, wzjs],
                [leftBottomPoint.x, leftBottomPoint.y],
                [leftBottomPoint.x + leftBottomPoint.tgWidth + 1, leftBottomPoint.y]
            ];
            grassLeft = rgjdLeft + 5;
            grassRight = rgjdRight;
            wzjsRight = wzjsRightBottom;
            ChartUtil.fillPathByD3(svg, pathData, '#ccc', 1);
            drawGrass(svg, grassLeft, grassRight, rgjd); //斜着的草
        } else { //只有完钻井深，没有人工井底
            wzjsRight = ChartUtil.getTranform20(rightBottomPoint.x, rightBottomPoint.y, wzjs);
            let wzjsLeft = ChartUtil.getTranform20(leftBottomPoint.x + rightBottomPoint.tgWidth, leftBottomPoint.y, wzjs);
            pathData = [
                [rightBottomPoint.x, rightBottomPoint.y],
                [wzjsRight, wzjs],
                [wzjsLeft, wzjs],
                [leftBottomPoint.x + leftBottomPoint.tgWidth, leftBottomPoint.y]
            ];
            ChartUtil.fillPathByD3(svg, pathData, 'none', 1);
        }

    }

    //人工井底标注
    if (data.wellinfo.rgjd) {
        ChartUtil.drawLineByD3(svg, [
            [grassRight, rgjd],
            [labelRightX, rgjd]
        ], 1);
        let text = data.wellinfo.addition.rgjdName + ':' + data.wellinfo.addition.rgjdString + 'm';
        ChartUtil.drawText(svg, text, labelRightX + 3, rgjd + 6);
        DataStore.setRight(labelRightX + 3 + text.visualLength());
    }

    //完钻井深标注
    let theLabelCount = labelCount[data.wellinfo.wzjs];
    let labelPianyi = getLabelPianYi(theLabelCount);
    if (theLabelCount.iterator == 0) {
        ChartUtil.drawLineByD3(svg, [
            [wzjsRight, wzjs],
            [labelRightX, wzjs]
        ], 1);
    }

    let text = '完钻井深:' + data.wellinfo.addition.wzjsString + 'm';
    ChartUtil.drawText(svg, text, labelRightX + 3, wzjs + 6 - labelPianyi);
    DataStore.setRight(labelRightX + 3 + text.visualLength());
    DataStore.setBottom(wzjs);
}

function isInclude(val, min, max) {
    return val >= min && val <= max;
}

/**
 * 整理数据， 给有重叠的标注增加标记
 */
function markData(data) {
    let len = data.length;
    if (len <= 1) {
        return;
    }
    for (let i = 0; i < len - 1; i++) {
        let sy = data[i];
        for (let j = i + 1; j < len; j++) {
            let min = data[j].start,
                max = data[j].end;
            if (isInclude(sy.start, min, max) || isInclude(sy.end, min, max)) {
                sy.intersection = true;
            }
        }
    }
    let lastData = data[len - 1];
    for (let i = 0; i < len - 1; i++) {
        let min = data[i].start,
            max = data[i].end;
        if (isInclude(lastData.start, min, max) || isInclude(lastData.end, min, max)) {
            lastData.intersection = true;
        }
    }

}

/**
 * 画左侧试油标注
 * @param chartId
 * @param data
 */
function drawSYRemarks(chartId, data) {
    if (!data.sy || data.sy.length < 1) {
        return;
    }
    markData(data.sy);
    for (let i = 0; i < data.sy.length; i++) {
        drawSYRemark(chartId, i, data);
    }
}

function getXH(value, tgDatas) {
    let xh = 0;
    for (let i = 0; i < tgDatas.length; i++) {
        for (let j = 0; j < tgDatas[i].data.length; j++) {
            if (value >= tgDatas[i].data[j].start && value <= tgDatas[i].data[j].end && tgDatas[i].data[j].addition.name != '裸眼' && tgDatas[i].data[j].addition.name != '筛管') {
                xh = tgDatas[i].xh;
                break;
            }
        }
        if (xh) {
            break;
        }

    }
    return xh;
}

/**
 * 获取试油总结挂靠在哪个井筒的旁边，
 * 并获取井筒左边线的横向坐标
 * @param syData
 * @param tgDatas
 */
function getJingTongLeft(syData, tgDatas, xScale, yScale) {
    let topX = getXH(syData.start, tgDatas);
    let bottomX = getXH(syData.end, tgDatas);
    topX = xScale(topX + globalInfos.LEFT_MARGIN_WIDTH) + globalInfos.LEFT_MARGIN;
    bottomX = xScale(bottomX + globalInfos.LEFT_MARGIN_WIDTH) + globalInfos.LEFT_MARGIN;
    if (zxdCs && zxdCs < syData.start) {
        topX = ChartUtil.getTranform20(topX, yScale(zxdCs), yScale(syData.start));
    }
    if (zxdCs && zxdCs < syData.end) {
        bottomX = ChartUtil.getTranform20(bottomX, yScale(zxdCs), yScale(syData.end));
    }

    return {
        top: topX,
        bottom: bottomX
    };
}

/**
 * 画单个试油标注
 * @param chartId
 * @param i
 * @param datas
 */
function drawSYRemark(chartId, i, datas) {
    let syData = datas.sy[i];
    let svg = d3.select('#' + chartId).select("svg");
    let width = document.getElementById(chartId).offsetWidth - globalInfos.LEFT_MARGIN;
    let height = document.getElementById(chartId).offsetHeight;
    var tgCount = datas.tg.data.length - luoYanShaiGuanCount;
    let xAxisIntervals = (tgCount) * 2 + globalInfos.JTWIDTH + globalInfos.LEFT_MARGIN_WIDTH + globalInfos.RIGHT_MARGIN_WIDTH;
    let xScale = ChartUtil.getLineScale(0, xAxisIntervals, 0, width);
    let yScale = ChartUtil.getLineScale(0, datas.tg.cs, 0, height - 40);
    let jingTongLeft = getJingTongLeft(syData, datas.tg.data, xScale, yScale);
    if (!zxdCs) { //直筒

        let leftX = jingTongLeft.top - 120,
            rightX = jingTongLeft.top;
        if (syData.intersection) {
            leftX = leftX - i * 120;
            rightX = rightX - i * 120;
        }
        ChartUtil.drawLineByD3(svg, [
            [leftX, yScale(syData.start)],
            [rightX, yScale(syData.start)]
        ], 1);
        ChartUtil.drawLineByD3(svg, [
            [leftX, yScale(syData.end)],
            [rightX, yScale(syData.end)]
        ], 1);
        // 井筒左侧高度展示
        // let texts = [syData.addition.title || '', (syData.addition.syjd1String || '') + '-' + (syData.addition.syjd2String || '') + 'm', (syData.addition.hdString || '') + 'm/' + (syData.addition.cs || '')];
        let texts = [syData.addition.title || '', (syData.addition.syjd1String || '') + '-' + (syData.addition.syjd2String || '') + 'm']; //左侧上部分文字
        let demo = [(syData.addition.hdString || '') + 'm/' + (syData.addition.cs || '')]; //左侧下部分文字
        if (syData.addition.cs !== '裸眼') demo[demo.length - 1] += '层'; // 裸眼时不加“层”字，其余的加
        let textTopY = (yScale(syData.end) - yScale(syData.start) - 36) / 2 + yScale(syData.start);
        textTopY = Math.max(textTopY, yScale(syData.start));
        ChartUtil.drawMultiLineText(svg, texts, leftX, textTopY);
        ChartUtil.drawMultiLineText(svg, demo, leftX + 26, textTopY + 18);
        DataStore.setLeft(leftX-75);



    } else {
        let pianYiLeftTop = jingTongLeft.top;
        let pianYiLeftBottom = jingTongLeft.bottom;
        let leftTopX = pianYiLeftTop - 120,
            rightTopX = pianYiLeftTop;
        let leftBottomX = pianYiLeftBottom - 120,
            rightBottomX = pianYiLeftBottom;
        if (syData.intersection) {
            leftTopX = leftTopX - i * 120;
            rightTopX = rightTopX - i * 120;
            rightBottomX = rightBottomX - i * 120;
            leftBottomX = leftBottomX - i * 120;
        }
        ChartUtil.drawLineByD3(svg, [
            [leftTopX, yScale(syData.start)],
            [rightTopX, yScale(syData.start)]
        ], 1);
        ChartUtil.drawLineByD3(svg, [
            [leftBottomX, yScale(syData.end)],
            [rightBottomX, yScale(syData.end)]
        ], 1);
        let texts = [syData.addition.title || '', (syData.addition.syjd1String || '') + '-' + (syData.addition.syjd2String || '') + 'm', (syData.addition.hdString || '') + 'm/' + (syData.addition.cs || '')];
        if (syData.addition.cs !== '裸眼') texts[texts.length - 1]; // 裸眼时不加“层”字，其余的加
        let textTopY = (yScale(syData.end) - yScale(syData.start) - 36) / 2 + yScale(syData.start);
        textTopY = Math.max(textTopY, yScale(syData.start));
        ChartUtil.drawMultiLineText(svg, texts, leftBottomX, textTopY);
        DataStore.setLeft(leftTopX);
    }
}

function getLuoYanShaiGuanCount(tgs) {
    let count = 0;
    for (let i = 0; i < tgs.length; i++) {
        let tgData = tgs[i];
        if (tgData.data.length == 1 && (tgData.data[0].addition.name == '裸眼' || tgData.data[0].addition.name == '筛管')) {
            count++;
        }

    }
    return count;
}

/**
 * 画所有套管
 * @param chartId
 * @param data
 */
function drawTGs(chartId, data) {
    let tgs = data.tg.data;
    let tgCount = tgs.length;
    tgCount -= luoYanShaiGuanCount;
    let yIntervals = data.tg.cs;
    for (let i = 0; i < tgs.length; i++) {
        let tgData = tgs[i];
        for (let j = 0; j < tgData.data.length; j++) {
            drawSingleTG(tgData.data[j], tgData.xh, tgCount, yIntervals, chartId);
        }

    }
}

/**
 * 获取工具应卡在哪个套管内侧
 */
function getTGXh(start, tgDatas) {
    let xh = 0;
    for (let i = tgDatas.length - 1; i >= 0; i--) {
        let tgData = tgDatas[i];
        for (let j = 0; j < tgData.data.length; j++) {
            if (tgData.data[j].start <= start && tgData.data[j].end >= start && tgData.data[j].addition.name != '裸眼' && tgData.data[j].addition.name != '筛管') {
                xh = tgData.xh + 1;
                break;
            }
        }
        if (xh) {
            break;
        }

    }

    return xh;
}

/**
 * 添加钻具和井底工具
 * @param chartId
 * @param data
 */
function addTools(chartId, data, gjType) {
    let svg = d3.select('#' + chartId).select("svg");
    let width = document.getElementById(chartId).offsetWidth - globalInfos.LEFT_MARGIN;
    let height = document.getElementById(chartId).offsetHeight;
    let yScale = ChartUtil.getLineScale(0, data.tg.cs, 0, height - 40);
    let tgCount = data.tg.data.length - luoYanShaiGuanCount;
    let xAxisIntervals = tgCount * 2 + globalInfos.JTWIDTH + globalInfos.LEFT_MARGIN_WIDTH + globalInfos.RIGHT_MARGIN_WIDTH;
    let xScale = ChartUtil.getLineScale(0, xAxisIntervals, 0, width);
    if (!data[gjType] || data[gjType].length < 1) {
        return;
    }
    dZsD = []
    let afterDzSd = false
    let isShaAndHui = false;
    // 获取沙面灰面存在状态
    if (gjType == 'jdgj') {
        let strName = data[gjType].map((obj) => {
            return obj.name
        });
        if (strName.indexOf("shaMian") > -1 && (strName.indexOf("huiMian") > -1 || strName.indexOf("qiaoSai") > -1))
            isShaAndHui = true;


    }

    for (let i = 0; i < data[gjType].length; i++) {
        let rotate = 0;
        let tool = data[gjType][i];
        if (tool.name == 'youGuan') {
            continue;
        }


        let toolSetting = Object.assign({}, globalInfos.TOOLS_SETTING.find(item => item.name == tool.name));
        toolSetting.height = toolSetting.height < 1 && toolSetting.fillWidth != 3 && data.tg.cs > globalInfos.MAX_CS ? toolSetting.height + 0.2 : toolSetting.height;
        var toolHeight = yScale(toolSetting.height < 2 ? toolSetting.height : (tool.end - tool.start));
        let floatY = getToolLabelY(toolHeight, toolSetting.labelPosition);
        let y = yScale(toolSetting.height < 2 ? tool.start : tool.end) - floatY;
        let xh = getTGXh(tool.start, data.tg.data);
        let pianyi = toolSetting.fillWidth == 1 || toolSetting.fillWidth == 3 ? xh : tgCount;
        let toolLeft = globalInfos.LEFT_MARGIN + xScale(globalInfos.LEFT_MARGIN_WIDTH + pianyi);
        let toolWidth = xScale(1);


        let SM_HEIGHT = rgjdHeight - y - toolHeight //沙面触井底
        var NEXT_HEIGHT;
        let isNEXT_HEIGHT = false;
        //砂面，确认是否有下一个钻具,没有则找人工井底
        if (tool.name === 'shaMian') {
            if (i === data[gjType].length - 1) {
                NEXT_HEIGHT = rgjdHeight - y - toolHeight
                console.log('找人工井底');
                isNEXT_HEIGHT = true
            } else {
                console.log('找钻具');
                let ZJ_HEIGHT = yScale(toolSetting.height < 2 ? data[gjType][i + 1].start : data[gjType][i + 1].end) - floatY;
                let QT_MIAN = rgjdHeight - ZJ_HEIGHT - toolHeight //砂面下一个钻具触底的高度
                NEXT_HEIGHT = data[gjType][i + 1].name ? SM_HEIGHT - QT_MIAN - toolHeight : y //砂面和下一个钻具之间的高度
                isNEXT_HEIGHT = false
            }
        }

        if (data[gjType][i].name === 'daoZhui' || data[gjType][i].name === 'siDu') {
            if (data[gjType][i + 1]) { //导锥丝堵在最后一位时不做处理
                dZsD.push([true, data[gjType][i].start, toolLeft, y, toolWidth, toolHeight, rotate])
                afterDzSd = true
            }
        } else if (afterDzSd) { //导锥丝堵后面的工具将作为油管path新起点
            afterDzSd = false
            dZsD.push([false, data[gjType][i].start, toolLeft, y, toolWidth, toolHeight, rotate])
        }
        if (zxdCs && zxdCs < (toolSetting.height < 2 ? tool.start : tool.end)) { //斜井
            toolLeft = Math.ceil(ChartUtil.getTranform20(toolLeft, yScale(zxdCs), y));
            if (tool.name == 'luoYu') {
                toolLeft += 9;
            }
            rotate = -20;
            if (gjType == 'jdgj') {
                rotate = 0;
                toolSetting = globalInfos.TOOLS_SETTING.find(item => item.name == (tool.name + '-xie'));

            }
        }
        let jtWidth = xScale(globalInfos.JTWIDTH);
        if (toolSetting.fillWidth == 0) { //油管宽度
            toolLeft += xScale(1);
            if (toolSetting.height < 2) {
                ChartUtil.drawImage(svg, toolSetting.base64, toolLeft, y, toolWidth, toolHeight, rotate);
            } else { //射孔枪
                let g = svg.append('g').attr('id', 'dangan-elements');
                let start = Math.max(tool.start, zxdCs);
                for (let i = 0; i < (start - tool.start); i++) {
                    svg.append("image")
                        .attr("xlink:href", toolSetting.base64)
                        .attr("x", toolLeft)
                        .attr("y", y + yScale(1) * i)
                        .attr("width", toolWidth)
                        .attr("height", yScale(1));
                }
                let topY = y + yScale(start - tool.start);
                for (let i = 0; i < (tool.end - start); i++) {
                    g.append("image")
                        .attr("xlink:href", toolSetting.base64)
                        .attr("x", toolLeft)
                        .attr("y", topY + yScale(1) * i)
                        .attr("width", toolWidth)
                        .attr("height", yScale(1) + 0.5);
                }
                g.attr('transform', `rotate(${rotate}, ${toolLeft}, ${topY})`);
                y = !zxdCs ? y : y - toolHeight * Math.sin(Math.PI * 20 / 180) * Math.sin(Math.PI * 20 / 180) + 10;
            }
        } else if (toolSetting.fillWidth == 2) { //比油管宽
            toolLeft += xScale(0.5);
            toolWidth = jtWidth - xScale(1);
            ChartUtil.drawImage(svg, toolSetting.base64, toolLeft, y, toolWidth, toolHeight, rotate);
        } else if (toolSetting.fillWidth == 3) { //分两部分，显示在油管左右侧
            // toolWidth = xScale(1);
            toolWidth = xScale((tgCount - xh + 1));
            ChartUtil.drawImage(svg, toolSetting.base64, toolLeft + (data[gjType][i].name === "fengGeQi" ? 0 : 1), y, toolWidth, toolHeight, rotate);
            if (zxdCs && tool.start >= zxdCs) {
                ChartUtil.drawImage(svg, toolSetting.base64, toolLeft + toolWidth + jtWidth, y + yScale(0.1), toolWidth, toolHeight, rotate - 180);
                toolWidth = toolWidth + jtWidth + toolWidth;
            } else {
                let img = ChartUtil.drawImage(svg, toolSetting.base64, toolLeft + toolWidth + xScale(1) - (data[gjType][i].name === "fengGeQi" ? 2 : 1), y, toolWidth, toolHeight);
                img.attr('transform', `rotate(-180, ${toolLeft + toolWidth + xScale(1) - 1  + toolWidth / 2}, ${y + toolHeight / 2})`);
                toolWidth = toolWidth + toolWidth + xScale(1);
            }

        } else { //填满套管内壁

            toolWidth = jtWidth + xScale((tgCount - xh) * 2);
            let toolWidthRepair = toolWidth; // 钻井宽度
            if (gjType == 'jdgj' && zxdCs && zxdCs < (toolSetting.height < 2 ? tool.start : tool.end)) {
                toolLeft += 1;
                toolWidthRepair += toolHeight * Math.tan(Math.PI * 20 / 180) + 2;
            }
            if (tool.addition.smAble === 'true') {
                ChartUtil.drawImage(svg, toolSetting.base64, toolLeft, y, toolWidthRepair, toolHeight, rotate);
            } else if (isShaAndHui) { //是否多个钻具存在
                let QT_HEIGHT;
                QT_HEIGHT = tool.name == "shaMian" ? y + NEXT_HEIGHT + 1.5 : y;
                ChartUtil.drawImage(svg, toolSetting.base64, toolLeft - 0.8, QT_HEIGHT, toolWidthRepair + 1.6, toolHeight, rotate);
            } else if (tool.name == "shaMian") {
                ChartUtil.drawImage(svg, toolSetting.base64, toolLeft - 0.8, y + SM_HEIGHT + 1, toolWidthRepair + 1.6, toolHeight, rotate); //只有砂面触人工井底
            } else {
                ChartUtil.drawImage(svg, toolSetting.base64, toolLeft, y, toolWidthRepair, toolHeight, rotate);
            }

        }


        let labelLeftX = toolLeft + toolWidth;
        if (gjType == 'jdgj' && zxdCs && zxdCs < (toolSetting.height < 2 ? tool.start : tool.end)) {
            labelLeftX += floatY * Math.tan(Math.PI * 20 / 180);
        }
        if (tool.name == 'daoZhui') { //特殊处理,指示线位置不精确，必须与工具边缘重合
            labelLeftX -= toolWidth / 2;
        } else if (tool.name == 'biJian') {
            labelLeftX -= toolWidth;
        }
        let labelRightX = labelLeftX + xScale(tgCount + 3);
        let theLabelCount = labelCount[toolSetting.height < 2 ? tool.start : tool.end];
        if (theLabelCount.iterator == 0) {

            //判断砂面箭头距离显示
            if (tool.addition.smAble === 'true') {
                let QT_HEIGHT = tool.name == "qiaoSai" ? 11 : 0
                ChartUtil.drawLineByD3(svg, [
                    [labelLeftX, y + floatY + QT_HEIGHT],
                    [labelRightX, y + floatY + QT_HEIGHT]
                ], 1);
            } else if (isShaAndHui) { //是否多个钻具存在
                let QT_HEIGHT;
                if (isNEXT_HEIGHT) {
                    QT_HEIGHT = tool.name == "shaMian" ? NEXT_HEIGHT : 0
                } else {
                    QT_HEIGHT = tool.name == "shaMian" ? NEXT_HEIGHT : 0
                }
                let QS = tool.name == "qiaoSai" ? 11 : 0
                ChartUtil.drawLineByD3(svg, [
                    [labelLeftX, y + floatY + QT_HEIGHT + 2 + QS],
                    [labelRightX, y + floatY + QT_HEIGHT + 2 + QS]
                ], 1);
            } else if (tool.name == "shaMian") {
                ChartUtil.drawLineByD3(svg, [
                    [labelLeftX, y + SM_HEIGHT + 1],
                    [labelRightX, y + SM_HEIGHT + 1]
                ], 1);
            } else {
                let QT_HEIGHT = tool.name == "qiaoSai" ? 11 : 0
                ChartUtil.drawLineByD3(svg, [
                    [labelLeftX, y + floatY + QT_HEIGHT],
                    [labelRightX, y + floatY + QT_HEIGHT]
                ], 1);
            }
        }

        let labelPianyi = getLabelPianYi(theLabelCount);
        let labelText = tool.addition.mc + ':' + tool.addition.sdString + 'm';
        //判断砂面字体距离显示
        if (tool.addition.smAble === 'true') {
            let QS = tool.name == "qiaoSai" ? 11 : 0
            ChartUtil.drawText(svg, labelText, labelRightX + 3, y + floatY - labelPianyi + 5 + QS);
        } else if (isShaAndHui) { //是否多个钻具存在
            let QT_HEIGHT;
            if (isNEXT_HEIGHT) {
                QT_HEIGHT = tool.name == "shaMian" ? NEXT_HEIGHT  : 0
            } else {
                QT_HEIGHT = tool.name == "shaMian" ? NEXT_HEIGHT : 0
            }
            let QS = tool.name == "qiaoSai" ? 11 : 0
            ChartUtil.drawText(svg, labelText, labelRightX + 3, y + floatY + QT_HEIGHT + 5 + QS);
        } else if (tool.name == "shaMian") {
            ChartUtil.drawText(svg, labelText, labelRightX + 3, y + floatY + SM_HEIGHT + 6);
        } else {
            let QS = tool.name == "qiaoSai" ? 11 : 0
            ChartUtil.drawText(svg, labelText, labelRightX + 3, y + floatY - labelPianyi + 5 + QS);
        }
        theLabelCount.iterator++;
        DataStore.setRight(labelRightX + 3 + labelText.visualLength() + 10);

    }
}

/**
 * 获取工具标注位置
 * @param y
 * @param height
 * @param pos
 * @returns {*}
 */
function getToolLabelY(height, pos) {
    switch (pos) {
        case 'middle':
            return height / 2;
        case 'top':
            return 0;
        case 'bottom':
            return height;
        default:
            return height;
    }
}

/**
 * 添加井筒中间的油管
 * @param chartId
 * @param data
 */
function addOilPip(chartId, data) {
    let svg = d3.select('#' + chartId).select("svg");
    let width = document.getElementById(chartId).offsetWidth - globalInfos.LEFT_MARGIN;
    let height = document.getElementById(chartId).offsetHeight;
    let yScale = ChartUtil.getLineScale(0, data.tg.cs, 0, height - 40);
    let tgCount = data.tg.data.length - luoYanShaiGuanCount;
    let xAxisIntervals = tgCount * 2 + globalInfos.JTWIDTH + globalInfos.LEFT_MARGIN_WIDTH + globalInfos.RIGHT_MARGIN_WIDTH;
    let xScale = ChartUtil.getLineScale(0, xAxisIntervals, 0, width);
    let youGuan = data.zj.find(item => item.name == 'youGuan');
    let maxToolDepth = Math.max.apply(null, data.zj.filter(item => item.name != 'youGuan').map(item => item.start));
    let toolLeft = globalInfos.LEFT_MARGIN + xScale(globalInfos.LEFT_MARGIN_WIDTH + tgCount);
    if (data.zj.length == 0) {
        return;
    }
    let y;
    if (!youGuan) {
        data.zj.sort(function compare(a, b) {
            return a.start - b.start;
        });
        let tool = data.zj[data.zj.length - 1];
        let toolSetting = globalInfos.TOOLS_SETTING.find(item => item.name == tool.name);
        var toolHeight = yScale(toolSetting.height < 2 ? toolSetting.height : (tool.end - tool.start));
        let floatY = getToolLabelY(toolHeight, toolSetting.labelPosition);
        y = youGuan ? yScale(youGuan.start) : yScale(toolSetting.height < 2 ? tool.start : tool.end) - floatY;
    } else {
        y = yScale(youGuan.start);
    }

    if (zxdCs && maxToolDepth > zxdCs) {
        let leftX = ChartUtil.getTranform20(toolLeft + xScale(1), yScale(zxdCs), y);
        ChartUtil.drawLineByD3Lower(svg, [
            [toolLeft + xScale(1), 0],
            [toolLeft + xScale(1), yScale(zxdCs)],
            [leftX, y]
        ], 1, );
        let rightX = ChartUtil.getTranform20(toolLeft + xScale(2), yScale(zxdCs), y);
        ChartUtil.drawLineByD3Lower(svg, [
            [toolLeft + xScale(2), 0],
            [toolLeft + xScale(2), yScale(zxdCs)],
            [rightX, y]
        ], 1, );


        ChartUtil.drawLineByD3Lower(svg, [
            [leftX, y],
            [rightX, y]
        ], 1);

        if (youGuan) {
            ChartUtil.drawLineByD3(svg, [
                [rightX, y - Math.sin(Math.PI * 20 / 180) * xScale(1)],
                [rightX + xScale(tgCount) / Math.sin(Math.PI * 20 / 180), y - Math.sin(Math.PI * 20 / 180) * xScale(1)]
            ], 1);
            ChartUtil.drawText(svg, youGuan.addition.mc + ':' + youGuan.addition.sdString + 'm', rightX + xScale(tgCount) / Math.sin(Math.PI * 20 / 180) + 3, y - Math.sin(Math.PI * 20 / 180) * xScale(1) + 5);
        }

    } else {

        [xScale(1), xScale(2)].forEach(leftAndRight => {
            let path = d3.path();
            path.moveTo(toolLeft + leftAndRight, 0);
            dZsD.forEach(el => {
                if (el[0]) {
                    path.lineTo(el[2] + leftAndRight, el[3])
                } else {
                    path.moveTo(el[2] + leftAndRight, el[3])
                }
            });
            path.lineTo(toolLeft + leftAndRight, y)
            ChartUtil.drawStringPath(svg, path, 'none', 1);
        })
        // ChartUtil.drawLineByD3Lower(svg, [[toolLeft + xScale(1), 0], [toolLeft + xScale(1),y]], 1);
        // ChartUtil.drawLineByD3Lower(svg, [[toolLeft + xScale(2), 0], [toolLeft + xScale(2),y]], 1);
        ChartUtil.drawLineByD3Lower(svg, [
            [toolLeft + xScale(1), y],
            [toolLeft + xScale(2), y]
        ], 1);

        if (youGuan) {
            let theLabelCount = labelCount[youGuan.start];
            if (theLabelCount.iterator == 0) {
                ChartUtil.drawLineByD3(svg, [
                    [toolLeft + xScale(2), y],
                    [globalInfos.LEFT_MARGIN + xScale(xAxisIntervals - 2), y]
                ], 1);
            }

            let labelPianyi = getLabelPianYi(theLabelCount);
            ChartUtil.drawText(svg, youGuan.addition.mc + ':' + youGuan.addition.sdString + 'm', globalInfos.LEFT_MARGIN + xScale(xAxisIntervals - 2) + 3, y - labelPianyi + 5);
            theLabelCount.iterator++;
        }

    }

}

function loadLabelCount(labels) {
    for (let key in labels) {
        labelCount[key] = {
            count: labels[key],
            iterator: 0
        };
    }
}

/**
 * 画井身结构图
 * @param data
 * @param chartId
 */
const drawChart = function(data, chartId, isDrawDrillTools) {
    DataStore.reset();
    initChart(chartId);
    if (!data.tg.cs || data.tg.data.length < 1) {
        return;
    }
    initSvg(chartId, data); //初始化svg
    drawGroundLine(chartId, data.title); //画地面
    loadLabelCount(data.labelCount);
    luoYanShaiGuanCount = getLuoYanShaiGuanCount(data.tg.data);
    drawTGs(chartId, data); //画套管
    drawWzjsJD(chartId, data); //画人工井底和完钻井深
    drawSYRemarks(chartId, data); //画左侧试油标注
    addTools(chartId, data, "jdgj"); //添加井底工具
    if (isDrawDrillTools) {
        addTools(chartId, data, "zj"); //添加钻具

        addOilPip(chartId, data); //添加井筒中间的油管

    }

    document.querySelector('.chart-box').style.width = rightBottomPoint.x + globalInfos.RIGHT_MARGIN + 'px';

}

export {
    drawChart
};