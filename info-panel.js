import charts from './charts.js';

/* global AFRAME */
AFRAME.registerComponent('info-panel', {
    init: function () {
        var buttonEls = document.querySelectorAll('.menu-button');
        var fadeBackgroundEl = this.fadeBackgroundEl = document.querySelector('#fadeBackground');

        this.chartImageEl;
        this.chartTitleEl = document.querySelector('#chartTitle');
        this.chartDescriptionEl = document.querySelector('#chartDescription');

        this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
        this.onBackgroundClick = this.onBackgroundClick.bind(this);
        this.backgroundEl = document.querySelector('#background');
        for (var i = 0; i < buttonEls.length; ++i) {
            buttonEls[i].addEventListener('click', this.onMenuButtonClick);
        }
        this.backgroundEl.addEventListener('click', this.onBackgroundClick);
        this.el.object3D.renderOrder = 9999999;
        this.el.object3D.depthTest = false;
        fadeBackgroundEl.object3D.renderOrder = 9;
        fadeBackgroundEl.getObject3D('mesh').material.depthTest = false;
    },

    onMenuButtonClick: function (evt) {
        var chartInfo = charts[evt.currentTarget.id];

        this.backgroundEl.object3D.scale.set(1, 1, 1);

        this.el.object3D.scale.set(1, 1, 1);
        if (AFRAME.utils.device.isMobile()) { this.el.object3D.scale.set(1.4, 1.4, 1.4); }
        this.el.object3D.visible = true;
        this.fadeBackgroundEl.object3D.visible = true;

        if (this.chartImageEl) { this.chartImageEl.object3D.visible = false; }
        this.chartImageEl = chartInfo.imgEl;
        this.chartImageEl.object3D.visible = true;

        this.chartTitleEl.setAttribute('text', 'value', chartInfo.title);
        this.chartDescriptionEl.setAttribute('text', 'value', chartInfo.description);
    },

    onBackgroundClick: function (evt) {
        this.backgroundEl.object3D.scale.set(0.001, 0.001, 0.001);
        this.el.object3D.scale.set(0.001, 0.001, 0.001);
        this.el.object3D.visible = false;
        this.fadeBackgroundEl.object3D.visible = false;
    }
});
