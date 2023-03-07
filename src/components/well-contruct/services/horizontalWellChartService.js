/**
 * Author: zhuwei
 * CreateDate: 2020-08-05
 */
import * as d3 from 'd3';

import ChartUtil from "../utils/chartUtil";
import globalInfos from '../utils/constant';
import {DataStore} from './../utils/dataStorage';

var leftBottomPoint = {}; //最内侧右边套管的底
var rightBottomPoint = {}; //最内侧左边套管的底
var zxdPoint = {}; //是否画造斜点标记
var labelCount = {}; //存放各深度label重叠信息

var zxdCs = null;

/**
 * 画地平线
 * @param width
 */
function drawGroundLine(chartId) {
    let width = document.getElementById(chartId).offsetWidth;
    let svg = d3.select('#' + chartId).select("svg");
    let data = [

        [width - globalInfos.LEFT_MARGIN, 0],
        [width, 0]

    ];
    DataStore.setLeft(globalInfos.LEFT_MARGIN);
    ChartUtil.drawLineByD3(svg, data, 3);
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
    zxdPoint = {}; //是否画造斜点标记
    labelCount = {}; //存放各深度label重叠信息

    zxdCs = null;
}
function initSvg(chartId, data) {
    let width = document.getElementById(chartId).offsetWidth;
    let height = document.getElementById(chartId).offsetHeight;
    if(data.tg.cs >= globalInfos.MAX_CS) {
        document.getElementById(chartId).style.height =  height + Math.round(data.tg.cs / globalInfos.MAX_CS) * globalInfos._HIEGHT_INTERVAL + 'px';
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
function drawSingleTG(tg, i, tgCount, yIntervals, chartId, j) {
    let svg = d3.select('#' + chartId).select("svg");
    let width = document.getElementById(chartId).offsetWidth - globalInfos.LEFT_MARGIN;
    let height = document.getElementById(chartId).offsetHeight;
    let xAxisIntervals = tgCount * 2 + globalInfos.JTWIDTH + globalInfos.LEFT_MARGIN_WIDTH + globalInfos.RIGHT_MARGIN_WIDTH;
    let xScale = ChartUtil.getLineScale(0, xAxisIntervals, 0, width);
    let yScale = ChartUtil.getLineScale(0, yIntervals, 0, height - 40);

    let leftX = globalInfos.LEFT_MARGIN + xScale(i + globalInfos.LEFT_MARGIN_WIDTH);
    let tgWidth = xScale(1);

    drawTg(svg, tg, leftX, tgWidth, yScale, 'left', i, tgCount, j); //画左边套管

    let rightX = globalInfos.LEFT_MARGIN + xScale(xAxisIntervals - globalInfos.RIGHT_MARGIN_WIDTH - 1 - i);
    drawTg(svg, tg, rightX, tgWidth, yScale, 'right', i, tgCount, j); //画右边套管
    zxdCs  = tg.zxd;
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
function drawTg(svg, tg, x, tgWidth, yScale, isLeft, xh, tgCount, j) {
    let y = yScale(tg.start);
    let zxdY = yScale(tg.zxd);
    let endY = yScale(tg.end);
    let snfsY = yScale(tg.snfs);
    let tgPathData = [];
    let snfsPathData = [];
    let trianglePathData = [];

    if (tg.zxd && tg.end > tg.zxd) {
        let dx = yScale(1);
        dx += isLeft == 'left' ? globalInfos.JTWIDTH * tgWidth + tgCount * tgWidth + (tgCount - xh - 1) * tgWidth : xh * tgWidth;
        if ( tg.zxd > tg.start) { //套管从开始到转弯结束
            let path = d3.path();
            path.moveTo(x, y);
            path.lineTo(x, zxdY);
            path.quadraticCurveTo(x, zxdY + dx, x + dx, zxdY + dx);
            path.lineTo(x + dx + endY - zxdY, zxdY + dx);
            path.lineTo(x + dx + endY - zxdY, zxdY + dx - tgWidth);
            path.lineTo(x + dx, zxdY + dx - tgWidth);
            path.quadraticCurveTo(x + tgWidth, zxdY + dx - tgWidth, x + tgWidth, zxdY);
            path.lineTo(x + tgWidth, y);
            path.closePath();
            ChartUtil.drawStringPath(svg, path, 'none', 1);

            if (tg.snfs != null && tg.snfs > tg.zxd) { //水泥返深大于造斜点， 只填充水平部分
                snfsPathData = [[x + dx + endY - zxdY, zxdY + dx], [x + dx + snfsY - zxdY, zxdY + dx], [x + dx + snfsY - zxdY, zxdY + dx - tgWidth],
                    [x + dx + endY - zxdY, zxdY + dx - tgWidth], [x + dx + endY - zxdY, zxdY + dx]];
            }
            if (tg.snfs != null && tg.snfs <= tg.zxd) { //水泥返深小于造斜点， 填充L状
                let path = d3.path();
                path.moveTo(x, snfsY + 0.5);
                path.lineTo(x, zxdY);
                path.quadraticCurveTo(x, zxdY + dx, x + dx, zxdY + dx);
                path.lineTo(x + dx + endY - zxdY, zxdY + dx);
                path.lineTo(x + dx + endY - zxdY, zxdY + dx - tgWidth);
                path.lineTo(x + dx, zxdY + dx - tgWidth);
                path.quadraticCurveTo(x + tgWidth, zxdY + dx - tgWidth, x + tgWidth, zxdY);
                path.lineTo(x + tgWidth, snfsY + 0.5);
                path.closePath();
                ChartUtil.drawStringPath(svg, path, '#ccc', 0.6);
            }

        } else{ //套管只有水平部分
            tgPathData = [[x + dx + endY - zxdY, zxdY + dx], [x + dx + y - zxdY, zxdY + dx], [x + dx + y - zxdY, zxdY + dx - tgWidth],
                [x + dx + endY - zxdY, zxdY + dx - tgWidth], [x + dx + endY - zxdY, zxdY + dx]];

            if (tg.snfs != null && tg.snfs >= tg.start) {
                snfsPathData = [[x + dx + endY - zxdY, zxdY + dx], [x + dx + snfsY - zxdY, zxdY + dx], [x + dx + snfsY - zxdY, zxdY + dx - tgWidth],
                    [x + dx + endY - zxdY, zxdY + dx - tgWidth], [x + dx + endY - zxdY, zxdY + dx]];
            }
            if (tg.snfs != null && tg.snfs < tg.start) {
                snfsPathData = tgPathData;
            }

        }
        let triangleTopData = [x + dx + endY - zxdY - 10, isLeft == 'left' ? zxdY + dx - tgWidth : zxdY + dx];
        trianglePathData = [[x + dx + endY - zxdY, zxdY + dx], [x + dx + endY - zxdY, zxdY + dx - tgWidth], triangleTopData];
        //
        if (isLeft == 'left') { //左边套管，弯曲部分 套管标注在套管下方
            leftBottomPoint = {x: x + dx + endY - zxdY, y: zxdY + dx, dx: endY, zxdY: zxdY, tgWidth: tgWidth, originZXD: tg.zxd, xh: xh};
            //套管标注
            ChartUtil.drawLineByD3(svg, [[x + dx + endY - zxdY, zxdY + dx], [x + dx + endY - zxdY, zxdY + dx + (tgCount - xh + 1) * tgWidth + j * yScale(1)]], 1);
            let text = tg.addition.start && tg.addition.start != 0.0 ? '(' + tg.addition.start + 'm - ' + tg.addition.end + 'm)' : tg.addition.end + 'm';
            let strs = [tg.addition.name + ':', 'D' + tg.wj + 'mm×' + text];
            let maxTextLength = Math.max.call(strs[0].visualLength(), strs[1].visualLength());
            let multext = ChartUtil.drawMultiLineText(svg, strs, x + dx + endY - zxdY+maxTextLength*0.2, zxdY + dx + (tgCount - xh + 1) * tgWidth + j * yScale(1));
            multext.attr("transform","rotate(-90, "+ (x + dx + endY - zxdY) + ',' + (zxdY + dx + (tgCount - xh + 1) * tgWidth + j * yScale(1)) +") translate(-" + maxTextLength+", 0)");
            DataStore.setBottom(zxdY + dx + (tgCount - xh + 1) * tgWidth + j * yScale(1));
        } else {  // 水泥返深和造斜点在套管右上方
            rightBottomPoint = {x: x + dx + endY - zxdY, y: zxdY + dx, dx: endY, zxdY: zxdY, tgWidth: tgWidth, originZXD: tg.zxd, xh: xh};
            //水泥返深标注
            if (tg.snfs && tg.snfs > tg.start && tg.snfs < tg.zxd) { //水泥返深标注在右侧
                // todo
                ChartUtil.drawLineByD3(svg, [[x, snfsY], [x + xh * tgWidth + 30, snfsY]], 1);
                ChartUtil.drawText(svg, '水泥返深:' + tg.addition.snfsString + 'm', x + xh * tgWidth + 32, snfsY + 5);

    
                

            }

            if (tg.snfs && tg.snfs > tg.start && tg.snfs > tg.zxd) { //水泥返深标注在上方
                let theLabelCount = labelCount[tg.snfs];
                let labelPianyi = getLabelPianYi(theLabelCount);
                if(theLabelCount.iterator == 0) {
                    let topOrBottom = topOrBottomFunc('水泥返深')
                  if(topOrBottom==='top'){
                    ChartUtil.drawLineByD3(svg, [[x + dx + snfsY - zxdY, zxdY + dx], [x + dx + snfsY - zxdY, zxdY- xh * tgWidth]], 1);
                    let labelText = ChartUtil.drawText(svg, '水泥返深:' + tg.addition.snfsString + 'm', x + dx + snfsY - zxdY - labelPianyi- 5, zxdY - xh * tgWidth - 5);
                    labelText.attr("transform","rotate(-90, "+ (x + dx + snfsY - zxdY - labelPianyi- 5)  + ',' +  (zxdY - xh * tgWidth - 5) +")");
                    theLabelCount.iterator++;
                    }else{
                        // snfsY +(2*xh+3) * tgWidth + dx
                        ChartUtil.drawLineByD3(svg, [[x + dx + snfsY - zxdY, snfsY +(2*xh+3) * tgWidth+dx  ], [x + dx + snfsY - zxdY, snfsY +(xh+3) * tgWidth]], 1);
                        let labelText = ChartUtil.drawText(svg, '水泥返深:' + tg.addition.snfsString + 'm', x + dx + snfsY - zxdY - labelPianyi- 5,zxdY + (2* xh+2) * tgWidth + 3+2*dx  );
                        labelText.attr("transform","rotate(-90, "+ (x + dx + snfsY - zxdY - labelPianyi+15)  + ',' +  (zxdY + (2* xh+2) * tgWidth + 3+2*dx + 25) +")");
    
                        // labelText.attr("transform","rotate(-90, "+ (x + dx + snfsY - zxdY - labelPianyi- 5)  + ',' +  (zxdY - xh * tgWidth - 5) +")");
                        // labelText.attr("transform",`rotate(-90, ${labelPositionX }, ${yScale(zxdCs) - xScale(tgCount)}) translate(${-labelText.visualLength() + -200}, 0)`);
                        
                    }  
                 //    ChartUtil.drawLineByD3(svg, [[labelPositionX, topY], [labelPositionX, topY+60]], 1);
                   
                }

               
            }

            //造斜点标记
            if (!zxdPoint.isDraw) {
                let theLabelCount = labelCount[tg.zxd];
                let labelPianyi = getLabelPianYi(theLabelCount);
                if(theLabelCount.iterator == 0 ) {
                    ChartUtil.drawLineByD3(svg, [[x + tgWidth, zxdY], [x + xh * tgWidth + 30, zxdY]], 1);
                }
                ChartUtil.drawText(svg, '造斜点:' + tg.addition.zxdString + 'm', x + xh * tgWidth + 32, zxdY - labelPianyi);
                zxdPoint.isDraw = true;
                zxdPoint.x = x;
                zxdPoint.xh = xh;
                theLabelCount.iterator++;
            }
            //
        }

    } else { //没有造斜点，为直筒状
        tgPathData = [[x, y], [x, endY], [x + tgWidth, endY], [x + tgWidth, y], [x, y]];
        DataStore.setBottom(endY);
        if (tg.snfs != null) {
            snfsPathData = [[x + 0.5, snfsY + 0.5], [x + 0.5, endY - 0.5], [x + tgWidth - 0.5, endY - 0.5], [x + tgWidth - 0.5, snfsY + 0.5]];
        }
        let triangleTopData = [isLeft == 'left' ? x + tgWidth : x, endY - 10];
        trianglePathData = [[x, endY], [x + tgWidth, endY], triangleTopData];

        if (isLeft == 'left') {
            leftBottomPoint = {x: x, y: endY, zxdY: undefined, tgWidth: tgWidth, dx: x};
        } else {
            rightBottomPoint = {x: x, y: endY, zxdY: undefined, tgWidth: tgWidth, dx: x};
            //套管标注

            let text = tg.addition.start && tg.addition.start != 0.0 ? '(' + tg.addition.startString + 'm - ' + tg.addition.endString + 'm)' : tg.addition.endString + 'm';
            text = tg.addition.name + ':D' + tg.addition.wjString + 'mm×' + text;
            let theLabelCount = labelCount[tg.end];
            let labelPianyi = getLabelPianYi(theLabelCount);
            if(theLabelCount.iterator == 0 ) {
                ChartUtil.drawLineByD3(svg, [[x + tgWidth, endY], [x + xh * tgWidth + 30, endY]], 1);
            }
            ChartUtil.drawText(svg, text, x + xh * tgWidth + 32, endY - labelPianyi + 5);
            theLabelCount.iterator++;
            //水泥返深标注
            if (tg.snfs) {

                let theLabelCount = labelCount[tg.snfs];
                let labelPianyi = getLabelPianYi(theLabelCount);
                if(theLabelCount.iterator == 0 ) {
                    ChartUtil.drawLineByD3(svg, [[x, snfsY], [x + xh * tgWidth + 30, snfsY]], 1);
                }
                ChartUtil.drawText(svg, '水泥返深:' + tg.addition.snfsString + 'm', x + xh * tgWidth + 32, snfsY - labelPianyi + 5);
                theLabelCount.iterator++;
            }
        }
    }
    ChartUtil.fillPathByD3(svg, tgPathData, 'none', 1); //套管边线
    ChartUtil.fillPathByD3(svg, snfsPathData, '#ccc', 0.6); //水泥返深
    ChartUtil.fillPathByD3(svg, trianglePathData, '#333', 0); //小三角

}


/**
 * 画人工井底和完钻井深部分
 */
function drawWzjsJD(chartId, data) {
    if (!data.wellinfo.wzjs && !data.wellinfo.rgjd || !leftBottomPoint.zxdY) {//水平井肯定有造斜点
        return;
    }
    if(data.wellinfo.wzjs == data.wellinfo.rgjd) {
        data.wellinfo.rgjd = null;
    }
    let svg = d3.select('#' + chartId).select("svg");
    let yIntervals = data.tg.cs;
    let height = document.getElementById(chartId).clientHeight;
    let yScale = ChartUtil.getLineScale(0, yIntervals, 0, height - 40);
    let pathData = [];
    let wzjsRightX = Math.min(rightBottomPoint.x + 30, rightBottomPoint.x - (rightBottomPoint.dx - yScale(data.wellinfo.wzjs)));
    let wzjsRightY = rightBottomPoint.y;
    if (data.wellinfo.wzjs && data.wellinfo.rgjd) { //既有人工井底也有完钻井深
        let rgjdRight = Math.max(rightBottomPoint.x - 30, rightBottomPoint.x - (rightBottomPoint.dx - yScale(data.wellinfo.rgjd)));

        pathData = [[rgjdRight, leftBottomPoint.y - leftBottomPoint.tgWidth], [leftBottomPoint.x, leftBottomPoint.y - leftBottomPoint.tgWidth],
            [leftBottomPoint.x, leftBottomPoint.y], [wzjsRightX, leftBottomPoint.y],
            [wzjsRightX, rightBottomPoint.y - rightBottomPoint.tgWidth], [rightBottomPoint.x, rightBottomPoint.y - rightBottomPoint.tgWidth],
            [rightBottomPoint.x, rightBottomPoint.y], [rgjdRight, rightBottomPoint.y],
            [rgjdRight, leftBottomPoint.y - leftBottomPoint.tgWidth]];
        // //人工井底标注
        let topOrBottom = topOrBottomFunc(data.wellinfo.addition.rgjdName)
        let text = data.wellinfo.addition.rgjdName + ':' + data.wellinfo.addition.rgjdString + 'm';
        if(topOrBottom === 'top'){
            ChartUtil.drawLineByD3(svg, [[rgjdRight, rightBottomPoint.y - rightBottomPoint.tgWidth],
                [rgjdRight, rightBottomPoint.y - rightBottomPoint.tgWidth - 32 ]], 1);
            let textSvg = ChartUtil.drawText(svg, text, rgjdRight, rightBottomPoint.y - rightBottomPoint.tgWidth - 38 );
            textSvg.attr("transform",`rotate(-90, ${rgjdRight }, ${rightBottomPoint.y - rightBottomPoint.tgWidth - 38 }) `);
        }else{
            ChartUtil.drawLineByD3(svg, [[rgjdRight, leftBottomPoint.y],
                [rgjdRight, leftBottomPoint.y  + 32 ]], 1);
            let textSvg = ChartUtil.drawText(svg, text, rgjdRight-8,leftBottomPoint.y  + 32  + text.visualLength() );
            textSvg.attr("transform",`rotate(-90, ${rgjdRight-8 }, ${leftBottomPoint.y  + 32  + text.visualLength()-20 }) `);
        }

        ChartUtil.fillPathByD3(svg, pathData, '#ccc', 0.5);
        wzjsRightY = wzjsRightY - rightBottomPoint.tgWidth;

    } else { //只有完钻井深
        pathData = [[rightBottomPoint.x , rightBottomPoint.y], [wzjsRightX, rightBottomPoint.y],
                [leftBottomPoint.x + (yScale(data.wellinfo.wzjs) - leftBottomPoint.dx), leftBottomPoint.y - leftBottomPoint.tgWidth], [leftBottomPoint.x, leftBottomPoint.y - leftBottomPoint.tgWidth]];
        ChartUtil.fillPathByD3(svg, pathData, 'none', 1);

    }
        //完钻井深标注
       let text = '完钻井深:' + data.wellinfo.addition.wzjsString + 'm';
        ChartUtil.drawLineByD3(svg, [[wzjsRightX, wzjsRightY],
            [wzjsRightX, rightBottomPoint.y - rightBottomPoint.tgWidth - 32]], 1);
        let textSvg = ChartUtil.drawText(svg, text, wzjsRightX, rightBottomPoint.y - rightBottomPoint.tgWidth - 38);
        textSvg.attr("transform",`rotate(-90, ${wzjsRightX }, ${rightBottomPoint.y - rightBottomPoint.tgWidth - 38}) `);
         DataStore.setRight(wzjsRightX + text.visualLength());

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


function isInclude(val, min, max) {
    return val >= min && val <= max;
}

//水平段文字位置设置的内容 , e接收一个string,作为键值
function topOrBottomFunc(e){
    let  topOrBottom
    if(!sessionStorage.getItem('topOrBottom')){
        sessionStorage.setItem('topOrBottom','{}')
    }
        topOrBottom = JSON.parse(sessionStorage.getItem('topOrBottom'))
    if(!topOrBottom[e]){
        topOrBottom[e] = 'top'
        sessionStorage.setItem('topOrBottom',JSON.stringify(topOrBottom))
        topOrBottom = JSON.parse(sessionStorage.getItem('topOrBottom'))
    }
    return topOrBottom[e]
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
            let min = data[j].start, max = data[j].end;
            if (isInclude(sy.start, min, max) || isInclude(sy.end, min, max)) {
                sy.intersection = true;
            }
        }
    }
    let lastData = data[len - 1];
    for (let i = 0; i < len - 1; i++) {
        let min = data[i].start, max = data[i].end;
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
    if(!data.sy || data.sy.length < 1) {return;}
    markData(data.sy);
    for (let i = 0; i < data.sy.length; i++) {
        drawSYRemark(chartId, i, data);
    }
}

function getXH(value, tgDatas) {
    let xh = 0;
    for(let i = 0; i < tgDatas.length; i++) {
        for(let j =0; j < tgDatas[i].data.length; j++) {
            if(value >= tgDatas[i].data[j].start && value <= tgDatas[i].data[j].end) {
                xh = tgDatas[i].xh;
                break;
            }
        }
        if(xh) {break;}

    }
    return xh;
}

/**
 * 获取试油总结挂靠在哪个井筒的旁边，
 * 并获取井筒左边线的横向坐标
 * @param syData
 * @param tgDatas
 */
function getJingTongLeft(syData, tgDatas, xScale) {
    let topX = getXH(syData.start, tgDatas);
    topX  = xScale(topX + globalInfos.LEFT_MARGIN_WIDTH) + globalInfos.LEFT_MARGIN;
    return {top: topX};
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
    let height = document.getElementById(chartId).offsetHeight;
    let yScale = ChartUtil.getLineScale(0, datas.tg.cs, 0, height - 40);
    let width = document.getElementById(chartId).offsetWidth - globalInfos.LEFT_MARGIN;
    let xAxisIntervals = datas.tg.data.length * 2 + globalInfos.JTWIDTH + globalInfos.LEFT_MARGIN_WIDTH + globalInfos.RIGHT_MARGIN_WIDTH;
    let xScale = ChartUtil.getLineScale(0, xAxisIntervals, 0, width);
    let tgWidth = xScale(1);
    let tgCount = datas.tg.data.length;
    if(!zxdCs){return;} //不考虑水平井没有造斜点的情况
    if (syData.start > leftBottomPoint.originZXD) { //试油总结在水平段
        let leftTopX = leftBottomPoint.x - (leftBottomPoint.dx - yScale(syData.start));
        let rightTopX = leftBottomPoint.x - (leftBottomPoint.dx - yScale(syData.end));
        let startXH = getXH(syData.start, datas.tg.data );
        let topY = leftBottomPoint.y + tgWidth * (tgCount - startXH - 1), bottomY = topY + 120;
        if (syData.intersection) {
            bottomY = bottomY + i * 120;
            topY = topY + i * 120;
        }
        let texts = [syData.addition.title || '', (syData.addition.syjd1String || '') + '-' + (syData.addition.syjd2String  || '') + 'm', (syData.addition.hdString  || '') + 'm/' + (syData.addition.cs || '') + '层'];
        let textLength = Math.max(texts[0].visualLength(),texts[1].visualLength(),texts[2].visualLength());
        // rightTopX = Math.max(leftTopX + textLength, rightTopX);
        ChartUtil.drawLineByD3(svg, [[leftTopX+xScale(2), topY ], [leftTopX+xScale(2), bottomY]], 1);
        ChartUtil.drawLineByD3(svg, [[rightTopX+xScale(2), topY ], [rightTopX+xScale(2), bottomY]], 1);
        let textLeftX =  (rightTopX - leftTopX - 36) / 2;
        let multext = ChartUtil.drawMultiLineText(svg, texts, leftTopX, topY+xScale(2));
        multext.attr("transform","rotate(-90, "+ (leftTopX )  + ',' +  ( topY) +")  translate(" + (-textLength - 10) + ", "+textLeftX+")");
        DataStore.setBottom(bottomY);

    } else { //试油总结在竖直段
        let jingTongLeft = getJingTongLeft(syData, datas.tg.data, xScale, yScale);

        let rightX = jingTongLeft.top;
        let leftX = rightX -  120;
        let topY = yScale(syData.start), bottomY = syData.end > leftBottomPoint.originZXD ? leftBottomPoint.zxdY + yScale(1) + globalInfos.JTWIDTH * tgWidth + tgCount * tgWidth + (tgCount - leftBottomPoint.xh - 1) * tgWidth: yScale(syData.end);
        if (syData.intersection) {
            rightX = rightX - 120 * i;
            leftX = leftX - 120 * i;
        }
        ChartUtil.drawLineByD3(svg, [[leftX, topY], [rightX,  topY]], 1);
        ChartUtil.drawLineByD3(svg, [[leftX, bottomY], [rightX,  bottomY]], 1);
        let texts = [syData.addition.title || '', (syData.addition.syjd1String  || '') + '-' +(syData.addition.syjd2String  || '')  + 'm', (syData.addition.hdString  || '') + 'm/' + (syData.addition.cs || '') + '层'];
        let textTopY = (bottomY - topY - 36) / 2 + topY;
        textTopY = Math.max(textTopY, topY);
        ChartUtil.drawMultiLineText(svg, texts, leftX + 15, textTopY);
        DataStore.setLeft(leftX);
    }
}

/**
 * 画所有套管
 * @param chartId
 * @param data
 */
function drawTGs(chartId, data) {
    let tgs = data.tg.data;
    let tgCount = tgs.length;
    let yIntervals = data.tg.cs;
    for (let i = 0; i < tgs.length; i++) {
        let tgData = tgs[i];
        for (let j = 0; j < tgData.data.length; j++) {
            drawSingleTG(tgData.data[j], tgData.xh, tgCount, yIntervals, chartId, j);
        }

    }


}

/**
 * 获取工具应卡在哪个套管内侧
 */
function getTGXh(start, tgDatas) {
    let xh = 0;
    for(let i= tgDatas.length - 1; i >=0 ; i--) {
        let tgData = tgDatas[i];
        for(let j = 0; j < tgData.data.length; j++) {
            if(tgData.data[j].start <= start && tgData.data[j].end >= start) {
                xh = tgData.xh + 1;
                break;
            }
        }
        if(xh){
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
function addTools(chartId, data, type) {
    let svg = d3.select('#' + chartId).select("svg");
    let width = document.getElementById(chartId).offsetWidth - globalInfos.LEFT_MARGIN;
    let height = document.getElementById(chartId).offsetHeight;
    let yScale = ChartUtil.getLineScale(0, data.tg.cs, 0, height - 40);
    let tgCount = data.tg.data.length;
    let xAxisIntervals = tgCount * 2 + globalInfos.JTWIDTH + globalInfos.LEFT_MARGIN_WIDTH + globalInfos.RIGHT_MARGIN_WIDTH;
    let xScale = ChartUtil.getLineScale(0, xAxisIntervals, 0, width);
    let zjData = data[type];
    if(!zjData || zjData.length < 1) {return;}
    for(let i=0; i< zjData.length; i++) {
        let rotate = 0;
        let tool = zjData[i];
        if(tool.name == 'youGuan') {continue;}
        let toolSetting = globalInfos.TOOLS_SETTING.find(item => item.name == tool.name);
        var toolHeight = yScale(toolSetting.height < 2 ? toolSetting.height : (tool.end - tool.start));
        let floatY = getToolLabelY(toolHeight, toolSetting.labelPosition);
        let y = yScale(toolSetting.height < 2 ? tool.start: tool.end) - floatY;
         let xh = getTGXh(tool.start, data.tg.data);
        let toolLeft = globalInfos.LEFT_MARGIN + xScale(globalInfos.LEFT_MARGIN_WIDTH + xh);
        let jtWidth = xScale(globalInfos.JTWIDTH);
        let toolWidth = xScale(1);
        if(zxdCs && zxdCs < (toolSetting.height < 2 ? tool.start: tool.end)) { //水平段
            let dx = yScale(1)  + tgCount * xScale(1) + xScale(4);


            toolLeft = toolLeft  + dx + yScale(toolSetting.height < 2 ? tool.start: tool.end) - yScale(zxdCs)- toolHeight ;
            y = rightBottomPoint.y + jtWidth + xScale(tgCount - xh);
            rotate = -90;
            if(toolSetting.fillWidth == 0) { //工具宽度为油管宽度
                y -= xScale(1);
                jtWidth = xScale(1);
                if(toolSetting.height < 2) {
                    ChartUtil.drawImage(svg, toolSetting.base64, toolLeft, y, toolWidth, toolHeight, rotate);
                } else {
                    let g = svg.append('g').attr('id', 'dangan-elements');
                    let start = Math.max(tool.start, zxdCs);
                    for(let i=0; i< (start - tool.start); i++) {
                        svg.append("image")
                         .attr("xlink:href",  toolSetting.base64)
                         .attr("x", toolLeft)
                         .attr("y", y + yScale(1) * i)
                         .attr("width", toolWidth)
                         .attr("height", yScale(1));
                    }
                    let topY = y + yScale(start - tool.start);
                    for(let i = 0; i < (tool.end - start); i++) {
                        g.append("image")
                         .attr("xlink:href",  toolSetting.base64)
                         .attr("x", toolLeft)
                         .attr("y", topY + yScale(1) * i)
                         .attr("width", toolWidth)
                         .attr("height", yScale(1));
                    }
                    g.attr('transform', `rotate(${rotate}, ${toolLeft}, ${topY})`);
                    y = !zxdCs ? y : y - toolHeight * Math.sin(Math.PI * 20 / 180) * Math.sin(Math.PI * 20 / 180) + 10;
                }

            }  else if (toolSetting.fillWidth == 2) {
                y -= xScale( 0.5);
                toolWidth = jtWidth - xScale(1);
                jtWidth = xScale(1) * 2
                ChartUtil.drawImage(svg, toolSetting.base64, toolLeft, y, toolWidth, toolHeight, rotate);
            } else if(toolSetting.fillWidth == 3) {
                ChartUtil.drawImage(svg, toolSetting.base64, toolLeft, y, toolWidth, toolHeight, rotate);
                ChartUtil.drawImage(svg, toolSetting.base64, toolLeft + xScale(1.2) , y - jtWidth,toolWidth, toolHeight, rotate -180);
                jtWidth = xScale(1) * 3
            }  else {
                toolWidth = jtWidth + xScale((tgCount - xh ) * 2);
                ChartUtil.drawImage(svg, toolSetting.base64, toolLeft, y, toolWidth, toolHeight, rotate);
            }


            let theLabelCount = labelCount[toolSetting.height < 2 ? tool.start: tool.end];
            let labelPianyi = getLabelPianYi(theLabelCount);
            let labelPositionX = toolLeft + floatY - labelPianyi;
            let topOrBottom = topOrBottomFunc(tool.addition.mc)
            if(theLabelCount.iterator == 0) {
               
              if(topOrBottom==='top'){
                    ChartUtil.drawLineByD3(svg, [[labelPositionX, y-jtWidth], [labelPositionX,yScale(zxdCs)]], 1);
                }else{  
                    ChartUtil.drawLineByD3(svg, [[labelPositionX, y], [labelPositionX, yScale(zxdCs)+150]], 1);
                }  
             //    ChartUtil.drawLineByD3(svg, [[labelPositionX, topY], [labelPositionX, topY+60]], 1);

            }
            let labelText = tool.addition.mc + ':' + tool.addition.sdString + 'm';
            let text = ChartUtil.drawText(svg, labelText, labelPositionX + 30, yScale(zxdCs) - xScale(tgCount)-3);
            if(topOrBottom==='top'){
                text.attr("transform",`rotate(-90, ${labelPositionX }, ${yScale(zxdCs) - xScale(tgCount)}) translate(${-82}, 0)`);
            }else{
                text.attr("transform",`rotate(-90, ${labelPositionX }, ${yScale(zxdCs) - xScale(tgCount)}) translate(${-labelText.visualLength() + -200}, 0)`);
            }  
            
           
            theLabelCount.iterator++;
        } else{
            if(toolSetting.fillWidth == 0) {///工具宽度为油管宽度
                toolLeft += xScale(1);

                if(toolSetting.height < 2) {
                    ChartUtil.drawImage(svg, toolSetting.base64, toolLeft, y, toolWidth, yScale(0.7));
                }else {
                    for(let i=0; i< (tool.end - tool.start); i++) {
                        svg.append("image")
                         .attr("xlink:href",  toolSetting.base64)
                         .attr("x", toolLeft)
                         .attr("y", y + yScale(1) * i)
                         .attr("width", toolWidth)
                         .attr("height", yScale(1));
                    }
                }
            } else if (toolSetting.fillWidth == 2) {
                toolLeft += xScale(0.5);
                toolWidth = jtWidth - xScale(1);
                ChartUtil.drawImage(svg, toolSetting.base64, toolLeft, y, toolWidth, toolHeight);
            } else if(toolSetting.fillWidth == 3) {
                toolLeft += xScale(0.3);
                ChartUtil.drawImage(svg, toolSetting.base64, toolLeft, y, xScale(0.7), toolHeight, rotate);
                ChartUtil.drawImage(svg, toolSetting.base64, toolLeft + xScale(2.4), y + yScale(0.5), xScale(0.7), toolHeight, -180);
            } else {
                toolWidth = jtWidth + xScale((tgCount - xh ) * 2);
                ChartUtil.drawImage(svg, toolSetting.base64, toolLeft, y, toolWidth, toolHeight, rotate);
            }
            let theLabelCount = labelCount[toolSetting.height < 2 ? tool.start: tool.end];
            if(theLabelCount.iterator == 0 ) {
                ChartUtil.drawLineByD3(svg, [[toolLeft+toolWidth, y + floatY], [toolLeft + jtWidth + xScale(tgCount) + 10,  y + floatY]], 1);
            }

            let labelPianyi = getLabelPianYi(theLabelCount);
             ChartUtil.drawText(svg, tool.addition.mc + ':' + tool.addition.sdString + 'm', toolLeft + jtWidth + xScale(tgCount)+ 13,  y + floatY - labelPianyi  + 5);
             theLabelCount.iterator++;
        }

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
            return  height;
        default:
            return  height;
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
    let tgCount = data.tg.data.length;
    let xAxisIntervals = tgCount * 2 + globalInfos.JTWIDTH + globalInfos.LEFT_MARGIN_WIDTH + globalInfos.RIGHT_MARGIN_WIDTH;
    let xScale = ChartUtil.getLineScale(0, xAxisIntervals, 0, width);
    if(!data.zj || data.zj.length == 0){return;}
    let youGuan = data.zj.find(item => item.name == 'youGuan');
    let maxToolDepth = Math.max.apply(null, data.zj.map(item => item.start));
    let toolLeft = globalInfos.LEFT_MARGIN + xScale(globalInfos.LEFT_MARGIN_WIDTH + tgCount);
    if(zxdCs && maxToolDepth > zxdCs) {
        let dx = yScale(1)  + tgCount * xScale(1) + xScale(1);
        let toolRight = toolLeft + xScale(1);
        let rightdx = yScale(1)  + tgCount * xScale(1)
        let path = d3.path();
        let dZsDBeforeZxd = []
        let dZsDAfterZxd = []
        let dZsDNearZxd = false
        data.zj.forEach((el,index)=>{
            console.log(el.name);
            if(['daoZhui','siDu'].includes(el.name)){
                if(el.start<zxdCs && data.zj[index+1]?.start >zxdCs || el.start>zxdCs && data.zj[index-1]?.start <zxdCs ){
                    //造斜点附近的导锥丝堵
                    dZsDNearZxd =true
                } 
                if(el.start<zxdCs){
                    dZsDBeforeZxd.push(Object.assign(el,{index:index?data.zj[index-1].start:0}))
                }else{
                    dZsDAfterZxd.push(Object.assign(el,{index:data.zj.length - index-1}))
                }
            }   
        })
        console.log(dZsDNearZxd);
        let leftAndRight = [[toolLeft,dx],[toolRight,rightdx]] 
        leftAndRight.map(e=>{
            path.moveTo(e[0] + xScale(1), 0);
            dZsDBeforeZxd.forEach(el=>{
                console.log(el);
                path.lineTo(e[0] + xScale(1), yScale(el.index + 0.5 ))
                path.moveTo(e[0] + xScale(1), yScale(el.start))
            })
            path.lineTo(e[0] + xScale(1), yScale(zxdCs-1))
            if(!dZsDNearZxd){
                path.lineTo(e[0] + xScale(1), yScale(zxdCs));
                path.quadraticCurveTo(e[0] + xScale(1), yScale(zxdCs) + e[1], e[0] + xScale(1) + e[1], yScale(zxdCs) + e[1]);
            }else{
                path.moveTo(e[0] + xScale(3)  + e[1] + yScale(maxToolDepth-zxdCs-3), yScale(zxdCs)  + e[1]);
            }
            dZsDAfterZxd.forEach(el=>{
                let isFirst = data.zj.some((ell,index)=>{
                  
                    return data.zj[index+1]?.start === el.start && ell.start < zxdCs
                })
                // data.zj.filter(ell=>{
                //     return ell.start < 
                // })
                if(isFirst){  //当前这个dZsD是否水平方向的第一个钻具，如果时，要把管线转弯后默认要加的3个单位取代哦

                    path.moveTo(e[0] + xScale(3)  + e[1] + yScale(maxToolDepth-zxdCs-el.index+1) , yScale(zxdCs)  + e[1])
                }else{

                    path.lineTo(e[0] + xScale(3)  + e[1] + yScale(maxToolDepth-zxdCs-el.index), yScale(zxdCs)  + e[1]);
                    if(el.index){ //等于0就是最后一个
                        path.moveTo(e[0] + xScale(3)  + e[1] + yScale(maxToolDepth-zxdCs-el.index+1) , yScale(zxdCs)  + e[1])
                    }
                } 
            })
            path.lineTo(e[0] + xScale(3)  + e[1] + yScale(maxToolDepth) - yScale(zxdCs), yScale(zxdCs)  + e[1]);
        })

        ChartUtil.drawStringPath(svg, path, 'none', 1);
        if(youGuan) {
            let topOrBottom = topOrBottomFunc('油管')
            console.log(topOrBottom);
            if(topOrBottom === 'top'){
                ChartUtil.drawLineByD3Lower(svg, [[toolLeft + xScale(3)  + dx + yScale(maxToolDepth) - yScale(zxdCs), yScale(zxdCs)  + dx ], [toolRight + xScale(3) + rightdx + yScale(maxToolDepth) - yScale(zxdCs), yScale(zxdCs)  + rightdx -  (tgCount +1) * xScale(1) ]], 1);
                let text = ChartUtil.drawText(svg, youGuan.addition.mc + ':' + youGuan.addition.sdString + 'm', toolRight + xScale(1) + rightdx + yScale(maxToolDepth) - yScale(zxdCs) - 2, yScale(zxdCs)  + rightdx - (tgCount + 1) * xScale(1));
                text.attr("transform",`rotate(-90, ${toolRight + xScale(2) + rightdx + yScale(maxToolDepth) - yScale(zxdCs)}, ${yScale(zxdCs)  + rightdx - (tgCount + 2) * xScale(1) - 5})`);
            } else {
                ChartUtil.drawLineByD3Lower(svg, [[toolLeft + xScale(3)  + dx + yScale(maxToolDepth) - yScale(zxdCs), yScale(zxdCs)  + rightdx], [toolRight + xScale(3) + rightdx + yScale(maxToolDepth) - yScale(zxdCs), yScale(zxdCs)  + rightdx + (tgCount + 2) * xScale(1) ]], 1);
                let labelCount =   youGuan.addition.mc + ':' + youGuan.addition.sdString + 'm'
                let text2 = ChartUtil.drawText(svg, labelCount, toolRight + xScale(1) + rightdx + yScale(maxToolDepth) - yScale(zxdCs) - 2, yScale(zxdCs)  + rightdx + (tgCount + 3) * xScale(1));
                text2.attr("transform",`rotate(-90, ${toolRight + xScale(1) + rightdx + yScale(maxToolDepth) - yScale(zxdCs)}, ${yScale(zxdCs)  + rightdx + (tgCount + 2) * xScale(1) }) translate(${-labelCount.visualLength()}, 15)`);
            }


        }

    } else {
        ChartUtil.drawLineByD3Lower(svg, [[toolLeft + xScale(1), 0], [toolLeft + xScale(1), yScale(maxToolDepth)]], 1);
        ChartUtil.drawLineByD3Lower(svg, [[toolLeft + xScale(2), 0], [toolLeft + xScale(2), yScale(maxToolDepth)]], 1);
        if(youGuan) {
            ChartUtil.drawLineByD3Lower(svg, [[toolLeft + xScale(1), yScale(maxToolDepth)], [toolLeft + xScale(2) + (tgCount + 3) * xScale(1), yScale(maxToolDepth)]], 1);
            ChartUtil.drawText(svg, youGuan.addition.mc + ':' + youGuan.addition.sdString + 'm', toolLeft + xScale(2) + (tgCount + 3) * xScale(1) + 5, yScale(maxToolDepth) + 5);
        }
    }

}


function loadLabelCount(labels) {
    for(let key in labels) {
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
const drawHorizontalWellChart = function (data, chartId, isDrawDrillTools) {

    initChart(chartId);
    if(!data.tg.cs || data.tg.data.length < 1) {return;}
    initSvg(chartId, data); //初始化svg
    drawGroundLine(chartId, data.title); //画地面
    loadLabelCount(data.labelCount);
    drawTGs(chartId, data); //画套管
    drawWzjsJD(chartId, data); //画人工井底和完钻井深
    drawSYRemarks(chartId, data); //画左侧试油标注
    addTools(chartId, data, "jdgj"); //添加井底工具
    if(isDrawDrillTools) {
  
        addTools(chartId, data, "zj"); //添加钻具 
        addOilPip(chartId, data);
    
    }
    document.querySelector('.chart-box').style.width = globalInfos.RIGHT_MARGIN + rightBottomPoint.x + 'px';



};


export {drawHorizontalWellChart};