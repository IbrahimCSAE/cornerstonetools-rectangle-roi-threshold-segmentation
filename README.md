# cornerstonetools-rectangle-roi-threshold-segmentation

A tool that draws pixels inside ROI rectangle that are within the specified min and max threshold values, It is also able to segment multiple slices at the same time, by specifying the depth, ex 10 slices.<br>

![demogif2](https://user-images.githubusercontent.com/93064150/214147658-521e31d0-c6b7-4d35-87dd-bb71277dfd19.gif)

In the gif above the threshold range is set to [200, 1000] and the depth is set to 10 slices, you can see that the tool is able to segment multiple slices at the same time, while respecting the threshold range.


## Dependencies 

* [cornerstone-core](https://github.com/cornerstonejs/cornerstone)
* [cornerstone-tools](https://github.com/cornerstonejs/cornerstoneTools)


Below is a live demo of the threshold brush tool, feel free to try it out.

[LIVE DEMONSTRATION](https://ibrahimcsae.github.io/cornerstonetools-rectangle-roi-threshold-segmentation/)

It is not recommended to do over 300 slices at once, as it might cause slight stuttering, but it is still possible. 
I recommend staying within the range of 50-150 slices at once, depending on your computer specs.

## Installation

```sh
$ npm i cornerstonetools-thresholdbrush
```

## Example

```js
import ThresholdBrush from "cornerstonetools-thresholdbrush";

cornerstoneTools.addToolForElement(element, ThresholdBrush, {configuration: {thresholdLow: 200 , thresholdHigh: 1000}});
cornerstoneTools.setToolActive("ThresholdBrush", { mouseButtonMask: 1 });

```

You can modify the threshold low an threshold high configuration on the fly like the following

```js

let brushThreshold = cornerstoneTools.store.state.tools.filter(tool => tool.name == 'ThresholdBrush')[0].configuration
brushThreshold.thresholdLow = -29
brushThreshold.thresholdHigh = 150

```
## Common thresholds to get you started

Left Psoas : [-29, 150]<br>
Right Psoas : [-29, 150]<br>
Muscle : [-29, 150]<br>
Sub Fat : [-190, -30]<br>
Vis Fat : [-190, -30]<br>
Bone : [200, 1000]<br>


## LICENSE

MIT
