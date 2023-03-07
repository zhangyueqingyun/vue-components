<template>
    <div class="chart-container">
  
      <div class="chart-box" id="chart-box">
        <div class="chart-title" style="height: 30px;">
          <div class="chart-title-center">
            <span>{{title}}</span>
            <i class="icon-download" title="导出图片" @click="download" v-if="!showNoData" data-html2canvas-ignore></i>
            <div class="shift">
              <button v-if="showButton" style="float:right" @click="showDiv=!showDiv">{{'水平段文字位置设置'}}</button>
              <div v-if="showDiv">
                <div style="margin-top:5px">
                  <div v-for="(value,key) in topOrBottom" :key='key'>
                    <div style="padding-top:5px">{{key}}</div>
                    <button @click="change(key)">切换</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div id="chart-body" class="chart-body">
          <div v-if="showNoData" class="no-data">无数据</div>
          <svg id="wellConstruct"></svg>
        </div>
      </div>
  
    </div>
  </template>
  
  <script>
  import { drawChart } from "./services/chartService";
  import ChartUtil from "./utils/chartUtil";
  import { drawHorizontalWellChart } from "./services/horizontalWellChartService";
  
  export default {
    name: "well-contruct",
    props: {
      datas: {
        type: Object,
        required: true,
      },
      isDrawDrillTools: {
        type: Boolean,
      },
    },
    data() {
      return {
        jh: null,
        showNoData: true,
        title: "",
        showDiv: false,
        showButton: false,
        topOrBottom: JSON.parse(sessionStorage.getItem("topOrBottom")),
      };
    },
    methods: {
      download() {
        ChartUtil.downloadImg(this.jh, "chart-box");
      },
      change(key) {
        this.topOrBottom[key] = this.topOrBottom[key] === "top" ? "bottom" : "top";
        sessionStorage.setItem("topOrBottom", JSON.stringify(this.topOrBottom));
        this.loadChart();
      },
      loadChart() {
        this.showNoData = !this.datas.tg.cs || this.datas.tg.data.length < 1;
        if (this.datas.wellType == "H") { 
          this.showButton = true;
          drawHorizontalWellChart(this.datas, "chart-body", this.isDrawDrillTools);
        } else {
          drawChart(this.datas, "chart-body", this.isDrawDrillTools);
        }
        this.topOrBottom = JSON.parse(sessionStorage.getItem("topOrBottom"));
      },
      getImageBase64() {
        return ChartUtil.getImageBase64("chart-box");
      },
    },
    watch: {
      datas(val) {
        this.jh = val.jh;
        this.title = val.title;
        this.loadChart();
      },
    },
    mounted() {
      sessionStorage.setItem("topOrBottom", "{}");
      if (Object.keys(this.datas).length > 0) {
        this.jh = this.datas.jh;
        this.title = this.datas.title;
        this.loadChart();
      }
    },
  };
  </script>
  
  <style scoped>
  .chart-container {
    background: #ffffff;
    width: 500px;
    height: 700px;
    padding: 10px;
    position: relative;
  }
  
  .chart-box {
    height: 100%;
    min-height: 400px;
    min-width: 500px;
    padding-top: 20px;
    text-align: left;
  }
  
  .chart-body {
    height: 100%;
  }
  #wellConstruct {
    min-height: 100%;
    min-width: 100%;
  }
  
  .chart-body > svg {
    overflow: visible;
  }
  
  .chart-title {
    font-size: 14px;
    font-family: 宋体;
    text-align: center;
    /*margin-right: 66px;*/
    /*width: 500px;*/
    color: black;
    position: relative;
  }
  
  .chart-title > span {
    display: inline-block;
    margin-right: 10px;
  }
  
  .icon-download {
    background: url("static/icon_download.svg") no-repeat top left;
    background-size: contain;
    width: 24px;
    height: 24px;
    display: inline-block;
    margin-bottom: -5px;
    position: absolute;
    right: 0px;
  }
  
  .shift {
    display: inline-block;
    margin-bottom: -5px;
    position: absolute;
    right: 0px;
    margin-right: 60px;
    font-size: 12px;
  }
  
  .shift > div {
    /* height: 200px; */
    padding-bottom: 3px;
    width: 120px;
    border: black 1px solid;
  }
  button {
    font-size: 12px;
    /* border: black 2px solid; */
  }
  
  .no-data {
    min-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>