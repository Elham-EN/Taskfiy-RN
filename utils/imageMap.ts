// images.js
const IMAGES = {
  TaskList: require("../assets/images/TaskList.png"),
  Trophy: require("../assets/images/Trophy.png"),
  Urban: require("../assets/images/Urban.png"),

  // Add more images as needed
} as const;

type ImageKeys = keyof typeof IMAGES; // 'TaskList' | 'AnotherImage'

export { IMAGES, ImageKeys };
