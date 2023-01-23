


const imageIds = [
    "wadouri:https://ibrahimcsae.github.io/cornerstonetools-thresholdbrush/data/case2a_001.dcm",
    "wadouri:https://ibrahimcsae.github.io/cornerstonetools-thresholdbrush/data/case2a_002.dcm",
    "wadouri:https://ibrahimcsae.github.io/cornerstonetools-thresholdbrush/data/case2a_003.dcm",
  ]
  
  function _init() {
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone
  
    const config = {
      webWorkerPath: `https://tools.cornerstonejs.org/examples/assets/image-loader/cornerstoneWADOImageLoaderWebWorker.js`,
      taskConfiguration: {
        decodeTask: {
          codecsPath: `https://tools.cornerstonejs.org/examples/assets/image-loader/cornerstoneWADOImageLoaderCodecs.js`,
        },
      },
    }
    cornerstoneWADOImageLoader.webWorkerManager.initialize(config)
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath
    cornerstoneTools.external.cornerstone = cornerstone
    cornerstoneTools.external.Hammer = Hammer
    const segModule = cornerstoneTools.getModule("segmentation")
    segModule.configuration.fillAlpha = 0.5
    segModule.configuration.fillAlphaInactive = 0
    segModule.configuration.renderOutline = false
    cornerstoneTools.init({
      showSVGCursors: true,
    })
  
    cornerstoneTools.toolStyle.setToolWidth(2)
    cornerstoneTools.toolColors.setToolColor("rgb(255, 255, 0)")
    cornerstoneTools.toolColors.setActiveColor("rgb(0, 255, 0)")
    cornerstoneTools.store.state.touchProximity = 40
  }
  

  const display = async (element, imageIds) => {
    cornerstone.enable(element)
    const image = await cornerstone.loadAndCacheImage(imageIds[0])
    cornerstone.displayImage(element, image)
    cornerstoneTools.addStackStateManager(element, [
      "stack",
    ])
    cornerstoneTools.addToolState(element, "stack", {
      imageIds: [...imageIds],
      currentImageIdIndex: 0,
    })
    cornerstoneTools.addToolForElement(
      element,
      cornerstoneTools["StackScrollMouseWheelTool"],
    )
    cornerstoneTools.addToolForElement(
      element,
      RectangleROIThresholdSegmentation,
      {configuration: {thresholdLow: 200, thresholdHigh: 1000, numberOfSlices: 1, inside: true }}
    )
    cornerstoneTools.setToolActive("StackScrollMouseWheel", {});

    cornerstoneTools.setToolActiveForElement(element, "RectangleROIThresholdSegmentation",{ mouseButtonMask: 1})
    return Promise.all(
      imageIds.map((imageId) => cornerstone.loadAndCacheImage(imageId)),
    )
  }
  
  
  ;(async function () {
    _init()
    const axial = document.querySelector("#axial")
    const images = await display(axial, imageIds)
    console.log(images)
    let min = document.getElementById("min")
    let max = document.getElementById("max")
    let slices = document.getElementById("slices")
    let fill = document.getElementById("fill")

    min.addEventListener("change", (e) => {
      cornerstoneTools.store.state.tools.filter(tool => tool.name == 'RectangleROIThresholdSegmentation')[0].configuration.thresholdLow = e.target.value
      cornerstone.updateImage(element)
    })

    max.addEventListener("change", (e) => {
      cornerstoneTools.store.state.tools.filter(tool => tool.name == 'RectangleROIThresholdSegmentation')[0].configuration.thresholdHigh = e.target.value
      cornerstone.updateImage(element)
    })

    slices.addEventListener("change", (e) => {
      cornerstoneTools.store.state.tools.filter(tool => tool.name == 'RectangleROIThresholdSegmentation')[0].configuration.numberOfSlices = e.target.value
      cornerstone.updateImage(element)
    })

    fill.addEventListener("change", (e) => {
      cornerstoneTools.store.state.tools.filter(tool => tool.name == 'RectangleROIThresholdSegmentation')[0].configuration.inside = e.target.checked
      cornerstone.updateImage(element)
    })
  })()