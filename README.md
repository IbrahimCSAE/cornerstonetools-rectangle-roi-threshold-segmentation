# cornerstonetools-rectangle-roi-threshold-segmentation

This tool allows you to segment pixels within an ROI rectangle by specifying a minimum and maximum threshold value. Additionally, it can segment multiple slices at once by specifying the depth, such as 10 slices.<br>

![demogif2](https://user-images.githubusercontent.com/93064150/214147658-521e31d0-c6b7-4d35-87dd-bb71277dfd19.gif)

The above gif demonstrates the threshold range being set to [200, 1000] and the depth set to 10 slices, showcasing the tool's ability to segment multiple slices while respecting the threshold range.


## Dependencies 

* [cornerstone-core](https://github.com/cornerstonejs/cornerstone)
* [cornerstone-tools](https://github.com/cornerstonejs/cornerstoneTools)


A live demo of the threshold brush tool is available for trying out.

[LIVE DEMONSTRATION](https://ibrahimcsae.github.io/cornerstonetools-rectangle-roi-threshold-segmentation/)

While it is possible to segment over 300 slices at once, it is recommended to stay within the range of 50-150 slices, depending on your computer's specs.

## Installation

```sh
$ npm i "cornerstonetools-rectangle-roi-threshold-segmentation"
```

## Usage


```js
import RectangleROIThresholdSegmentation from "cornerstonetools-rectangle-roi-threshold-segmentation";

cornerstoneTools.addToolForElement(element, RectangleROIThresholdSegmentation, {configuration: {thresholdLow: 200 , thresholdHigh: 1000, numberOfSlices: 10, inside: true}});
cornerstoneTools.setToolActive("RectangleROIThresholdSegmentation", { mouseButtonMask: 1 });

```

The threshold values, number of slices, and whether the segmentation is filled inside or outside the ROI rectangle can be modified on the fly.

```js

let brushThreshold = cornerstoneTools.store.state.tools.filter(tool => tool.name == 'RectangleROIThresholdSegmentation')[0].configuration
brushThreshold.thresholdLow = -29
brushThreshold.thresholdHigh = 150

brushThreshold.numberOfSlices = 10
brushThreshold.inside = true

```

## Common thresholds

Left Psoas : [-29, 150]<br>
Right Psoas : [-29, 150]<br>
Muscle : [-29, 150]<br>
Sub Fat : [-190, -30]<br>
Vis Fat : [-190, -30]<br>
Bone : [200, 1000]<br>


## LICENSE

MIT
