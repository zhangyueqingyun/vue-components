import * as d3 from 'd3';
import html2canvas from 'html2canvas';
import {DataStore} from './dataStorage';

let line = d3.line().x(d => d[0]).y(d => d[1]);
const ANGLE = 20; //默认倾斜角度

String.prototype.visualLength = function (fontSize = '12px', fontFamily = 'SimSun') {
    let span = document.createElement("span");
    span.innerHTML = `${this}`;
    span.style.fontSize = fontSize;
    span.style.fontFamily = fontFamily;
    document.body.appendChild(span);
    let size = span.offsetWidth;
    span.remove();
    return size;
}

export default {
    /**
     * 线性比例尺
     * @param domainMin
     * @param domainMax
     * @param rangeMin
     * @param rangeMax
     * @returns {*}
     */
    getLineScale(domainMin, domainMax, rangeMin, rangeMax) {
        return d3.scaleLinear().domain([domainMin, domainMax]).range([rangeMin, rangeMax]);
    },


    /**
     * 用D3画线
     * @param svg
     * @param data
     */
    drawLineByD3(svg, data, strokeWidth) {
        return svg.append('path')
            .attr('stroke', 'black')
            .attr('stroke-width', strokeWidth)
            .attr('fill', 'none')
            //    设置路径信息
            .attr('d', line(data));
    },


    drawLineByD3Lower(svg, data, strokeWidth) {
        return svg.append('path')
            .lower()
            .attr('stroke', 'black')
            .attr('stroke-width', strokeWidth)
            .attr('fill', 'none')
            //    设置路径信息
            .attr('d', line(data));
    },


    /**
     * 画灰色填充的水泥返深
     * @param svg
     * @param data
     */
    fillPathByD3(svg, data, fillColor, strokeWidth) {
        svg.append('path')
            .attr('stroke', 'black')
            .attr('stroke-width', strokeWidth)
            .attr('fill', fillColor)
            .attr('d', line(data));
    },

    /**
     * 用path字符串画线 如：“M50,50Q50,300,300,300L600,300”
     * @param svg
     * @param path
     * @param fillColor
     * @param strokeWidth
     */
    drawStringPath(svg, path, fillColor, strokeWidth,color) {
        color =  color?color:'black'
        svg.append('path')
            .lower()
            .attr('d', path.toString())
            .style('fill', fillColor)
            .style('stroke', color)
            .style('stroke-width', strokeWidth);
    },

    /**
     * 获取人工井底下面草的数据
     * @param start
     * @param end
     * @param y
     * @returns {[]}
     */
    getGrassData(start, end, y) {
        let data = [];
        for (let i = start + 5; i < end; i = i + 5) {
            let d = [];
            d.push({
                x: i,
                y: y
            });
            d.push({
                x: i - 5,
                y: y + 10
            })
            data.push(d);
        }
        return data;
    },

    /**
     * 画人工井底下面的草
     * @param svg
     * @param data
     */
    drawGrass(svg, data) {
        let lineGenerator = d3.line().x(d => d.x).y(d => d.y);
        svg.selectAll("path.monirline")
            .data(data)
            .enter()
            .append("path")
            .attr("class", "monirline")
            .attr("d", d => lineGenerator(d))
            .attr("stroke", "black");
    },


    drawText(svg, text, x, y) {
        return svg.append('text')
            .text(text)
            .attr("x", x)
            .attr('y', y)
            .attr('font-size', '12px')
            .attr('font-family', 'SimSun');
    },

    /**
     * 多行文字
     * text为数组
     * @param svg
     * @param text
     * @param x
     * @param y
     */
    drawMultiLineText(svg, strs, x, y) {
        var text = svg.append("text")
            .attr("x", x)
            .attr("y", y)
            .attr("font-size", '12px')
            .attr('font-family', 'SimSun');

        text.selectAll("tspan")
            .data(strs)
            .enter()
            .append("tspan")
            .attr("x", text.attr("x"))
            .attr("dy", "1em")
            .text(function (d) {
                return d;
            });

        return text;

    },

    /**
     * 画以svg为源的图片
     * @param svg
     * @param src
     * @param x
     * @param y
     * @param width
     * @param height
     */
    drawImage(svg, src, x, y, width, height, rotate) {
        let img = svg.append("image")
            .attr("xlink:href", src)
            .attr("x", x)
            .attr("y", y)
            .attr("width", width)
            .attr("height", height);
        if (rotate) {
            img.attr('transform', `rotate(${rotate}, ${x}, ${y})`);
        }

        return img;
    },


    /**
     *  下载图片
     * 需要克隆原始节点，否则截图不完整
     * @param jh
     * @param chartId
     */
    downloadImg(jh, chartId) {
        let dom = document.getElementById(chartId);
        let overflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        
        html2canvas(dom, {
            backgroundColor: 'white',
            x: DataStore.getLeft(),
            width: DataStore.getRight() - DataStore.getLeft() + 50,
            height: DataStore.getBottom() + 150,
            onclone: function(ele) {
                let width = parseFloat(dom.style.width);
                ele.querySelector("svg#wellConstruct").setAttribute('width', width);
                ele.querySelector(".chart-container").style.marginLeft = '0px';
            }
        }).then((canvas) => {
            let link = document.createElement("a");
            link.href = canvas.toDataURL();//下载链接
            link.setAttribute("download", jh + '井身结构图' + ".png");
            link.style.display = "none";//a标签隐藏
            document.body.appendChild(link);
            link.click();
            document.body.style.overflow = overflow;
            link.remove();

        });
    },

    /**
     * 获取井身结构图的base64
     * @param chartId
     */
    getImageBase64(chartId) {
        let dom = document.getElementById(chartId);
        let overflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return html2canvas(dom, {
            backgroundColor: 'white',
            x: DataStore.getLeft(),
            width: DataStore.getRight() - DataStore.getLeft() + 50,
            height: DataStore.getBottom() + 100,
            onclone: function(ele) {
                let width = parseFloat(dom.style.width);
                ele.querySelector("svg#wellConstruct").setAttribute('width', width);
                ele.querySelector(".chart-container").style.marginLeft = '0px';
            }
        }).then((canvas) => {
            let base64 = canvas.toDataURL();
            document.body.style.overflow = overflow;
            return base64;
        });
    },


    /**
     * 用D3画矩形，无填充
     * @param svg
     * @param x
     * @param y
     * @param width
     * @param height
     */
    drawRectByD3(svg, x, y, width, height) {
        svg.append("rect")
            .attr("x", x)
            .attr("y", y)
            .attr("width", width)
            .attr('height', height)
            .attr('stroke', 'black')
            .attr('fill', 'rgba(255, 255, 255, 0)');

    },

    /**
     * 灰色填充矩形
     * @param svg
     * @param x
     * @param y
     * @param width
     * @param height
     */
    fillRectByD3(svg, x, y, width, height) {
        if (height <= 1 || width <= 1) {
            return;
        }
        svg.append("rect")
            .attr("x", x + 0.5)
            .attr("y", y + 1)
            .attr("width", width - 1)
            .attr('height', height - 1)
            .attr('fill', '#ccc');
    },

    /**
     * 向右偏移20度后的x值
     * @param x
     * @param y
     * @param y1
     * @returns {number}
     */
    getTranform20(x, y, y1, angle = ANGLE) {
        if (y1 <= y) {
            return x;
        }
        return Math.floor((y1 - y) * Math.tan(Math.PI * angle / 180) + x);
    }


}