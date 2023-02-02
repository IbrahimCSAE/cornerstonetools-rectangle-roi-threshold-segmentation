import cornerstoneTools from "cornerstone-tools";
import cornerstone from "cornerstone-core";

const { getBoundingBoxAroundPolygon, getDiffBetweenPixelData } =
  cornerstoneTools.import("util/segmentationUtils");

const triggerEvent = cornerstoneTools.import("util/triggerEvent");

const getLogger = cornerstoneTools.import("util/getLogger");

const logger = getLogger(
  "util:segmentation:operations:paintWithinThresholdInsideOrOutsideRectangle"
);

/**
 * FillInsideRectangle - Fill all pixels inside/outside the region defined
 * by the rectangle if they are within the threshold range.
 * @param  {} evt The Cornerstone event.
 * @param {}  operationData An object containing the `points', 'tool configuration' and the `segmentIndex`.
 * @returns {null}
 */
export function paint(evt, operationData) {
  const { points, configuration } = operationData;
  const { image } = evt.detail;
  const vertices = points.map((a) => [a.x, a.y]);
  const [topLeft, bottomRight] = getBoundingBoxAroundPolygon(vertices, image);

  paintWithinThreshold(evt, operationData, topLeft, bottomRight, configuration);
}

/**
 * Fill all pixels labeled with the activeSegmentIndex,
 * inside/outside the region defined by the shape If they are within the threshold range.
 * @param  {Object} evt The Cornerstone event.
 * @param {Object}  operationData An object containing `segmentIndex` and the `points` array.
 * @param {number[]} topLeft The top left of the bounding box.
 * @param {number[]} bottomRight The bottom right of the bounding box.
 * @param {Object} configuration The configuration object.
 * @returns {null}
 */
function paintWithinThreshold(
  evt,
  operationData,
  topLeft,
  bottomRight,
  configuration
) {
  const element = evt.detail.element;
  const stackState = cornerstoneTools.getToolState(element, "stack");
  const stackData = stackState.data[0];
  const { imageIds, currentImageIdIndex } = stackData;
  const { segmentIndex } = operationData;
  const { getters, setters } = cornerstoneTools.getModule("segmentation");

  const imagesInRange = getImagesInRange(
    currentImageIdIndex,
    imageIds,
    configuration.numberOfSlices
  );

  const { width, height } = evt.detail.image;
  const [xMin, yMin] = topLeft;
  const [xMax, yMax] = bottomRight;

  if (!configuration.inside) {
    const operationsArray = [];
    for (let i = 0; i < imagesInRange.length; i++) {
      const { image, imageIdIndex } = imagesInRange[i];
      if (!image) {
        logger.warn(
          "Image is undefined, it most likely has not been cached yet."
        );
        continue;
      }
      const activeLabelmapIndex = getters.activeLabelmapIndex(element);
      const labelmap3D = getters.labelmap3D(element, activeLabelmapIndex);
      const labelmap2DForImageIdIndex = getters.labelmap2DByImageIdIndex(
        labelmap3D,
        imageIdIndex,
        image.rows,
        image.columns
      );
      const { pixelData } = labelmap2DForImageIdIndex;
      const previousPixeldata = pixelData.slice();
      // Loop until top of bounding box from top of image, color the entire row
      for (let i = 0; i < width; i++) {
        for (let j = 0; j < topLeft[1]; j++) {
          const imagePixelData = image.getPixelData();
          const pixelIndex = j * width + i;
          const hounsfieldValue =
            imagePixelData[pixelIndex] * image.slope + image.intercept;
          if (
            hounsfieldValue >= configuration.thresholdLow &&
            hounsfieldValue <= configuration.thresholdHigh
          ) {
            pixelData[pixelIndex] = segmentIndex;
          }
        }
      }

      // Loop within rows of bounding box, to the left of the box
      for (let i = 0; i < topLeft[0]; i++) {
        for (let j = topLeft[1]; j < bottomRight[1]; j++) {
          const imagePixelData = image.getPixelData();
          const pixelIndex = j * width + i;
          const hounsfieldValue =
            imagePixelData[pixelIndex] * image.slope + image.intercept;
          if (
            hounsfieldValue >= configuration.thresholdLow &&
            hounsfieldValue <= configuration.thresholdHigh
          ) {
            pixelData[pixelIndex] = segmentIndex;
          }
        }
      }

      // Loop within rows of bounding box, to the right of the box
      for (let i = bottomRight[0]; i < width; i++) {
        for (let j = topLeft[1]; j < bottomRight[1]; j++) {
          const imagePixelData = image.getPixelData();
          const pixelIndex = j * width + i;
          const hounsfieldValue =
            imagePixelData[pixelIndex] * image.slope + image.intercept;
          if (
            hounsfieldValue >= configuration.thresholdLow &&
            hounsfieldValue <= configuration.thresholdHigh
          ) {
            pixelData[pixelIndex] = segmentIndex;
          }
        }
      }

      // Loop from bottom of bounding box until bottom of image, color entire row
      for (let i = 0; i < width; i++) {
        for (let j = bottomRight[1]; j < height; j++) {
          const imagePixelData = image.getPixelData();
          const pixelIndex = j * width + i;
          const hounsfieldValue =
            imagePixelData[pixelIndex] * image.slope + image.intercept;
          if (
            hounsfieldValue >= configuration.thresholdLow &&
            hounsfieldValue <= configuration.thresholdHigh
          ) {
            pixelData[pixelIndex] = segmentIndex;
          }
        }
      }
      const operation = {
        imageIdIndex: imageIdIndex,
        diff: getDiffBetweenPixelData(previousPixeldata, pixelData),
      };
      operationsArray.push(operation);
      setters.updateSegmentsOnLabelmap2D(labelmap2DForImageIdIndex);
    }
    for (let i = operationsArray.length - 1; i >= 0; i--) {
      setters.pushState(element, [operationsArray[i]]);
      triggerEvent(element, cornerstoneTools.EVENTS.LABELMAP_MODIFIED, {
        labelmapIndex: getters.activeLabelmapIndex(element),
      });
    }
    return;
  }
  const operationsArray = [];
  for (let i = 0; i < imagesInRange.length; i++) {
    const { image, imageIdIndex } = imagesInRange[i];
    if (!image) {
      logger.warn(
        "Image is undefined, it most likely has not been cached yet."
      );
      continue;
    }
    const activeLabelmapIndex = getters.activeLabelmapIndex(element);
    const labelmap3D = getters.labelmap3D(element, activeLabelmapIndex);
    const labelmap2DForImageIdIndex = getters.labelmap2DByImageIdIndex(
      labelmap3D,
      imageIdIndex,
      image.rows,
      image.columns
    );
    const { pixelData } = labelmap2DForImageIdIndex;
    const previousPixeldata = pixelData.slice();
    for (let x = xMin; x < xMax; x++) {
      for (let y = yMin; y < yMax; y++) {
        const imagePixelData = image.getPixelData();
        const pixelIndex = y * width + x;
        const hounsfieldValue =
          imagePixelData[pixelIndex] * image.slope + image.intercept;
        if (
          hounsfieldValue >= configuration.thresholdLow &&
          hounsfieldValue <= configuration.thresholdHigh
        ) {
          pixelData[pixelIndex] = segmentIndex;
        }
      }
    }

    const operation = {
      imageIdIndex: imageIdIndex,
      diff: getDiffBetweenPixelData(previousPixeldata, pixelData),
    };
    operationsArray.push(operation);
    setters.updateSegmentsOnLabelmap2D(labelmap2DForImageIdIndex);
  }
  // loop over operationsArray and call setters in reverse order
  for (let i = operationsArray.length - 1; i >= 0; i--) {
    setters.pushState(element, [operationsArray[i]]);
    triggerEvent(element, cornerstoneTools.EVENTS.LABELMAP_MODIFIED, {
      labelmapIndex: getters.activeLabelmapIndex(element),
    });
  }
}

function getImagesInRange(currentImageIdIndex, imageIds, numberOfSlices) {
  const imagesInRange = [];
  let currentIndex = currentImageIdIndex;
  for (let i = 0; i < numberOfSlices; i++) {
    let newIndex = currentIndex + i;
    // just stop if we're out of range
    if (newIndex >= imageIds.length) {
      break;
    }
    imagesInRange.push({
      imageIdIndex: newIndex,
      image: cornerstone.imageCache.imageCache[imageIds[newIndex]]?.image,
    });
  }

  return imagesInRange;
}
