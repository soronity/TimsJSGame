/**
 * TileMap Configuration File
 *
 * This file was generated using the Tiled software, where the game's background
 * image was crafted. It represents the structural layout of tiles, using data
 * arrays to pinpoint the precise positioning and type of every tile on the map.
 *
 * The map comprises multiple layers, with the primary layer being the "background."
 * Furthermore, the file ensures compatibility with common JS module patterns,
 * enabling it to be effortlessly integrated into various game engines and platforms.
 *
 * It's crucial not to alter the file manually unless you understand its structure,
 * as this can disrupt the rendering of the game's background.
 *
 * Map Details:
 * - Dimensions: 20x30 tiles
 * - Infinite: No
 * - Compression Level: -1 (No Compression)
 * - Primary Layer: "background"
 *
 * For a clearer and deeper understanding of this configuration, refer to Tiled's documentation.
 */

(function (name, data) {
  if (typeof onTileMapLoaded === "undefined") {
    if (typeof TileMaps === "undefined") TileMaps = {};
    TileMaps[name] = data;
  } else {
    onTileMapLoaded(name, data);
  }
  if (typeof module === "object" && module && module.exports) {
    module.exports = data;
  }
})("test", {
  compressionlevel: -1,
  height: 20,
  infinite: false,
  layers: [
    {
      data: [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17,
        17, 17, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 32, 32, 32, 32, 31, 32,
        33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 34, 35, 36,
        37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 49, 49, 49, 49, 49,
        49, 49, 49, 49, 49, 49, 49, 49, 49, 50, 51, 52, 53, 54, 56, 57, 58, 59,
        60, 61, 62, 63, 64, 55, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67,
        67, 67, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82,
        83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 84, 85, 86,
        87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 99, 99, 99, 99, 99,
        99, 99, 99, 99, 99, 99, 99, 99, 99, 100, 101, 102, 103, 104, 105, 106,
        107, 108, 66, 109, 110, 111, 112, 113, 114, 114, 114, 114, 114, 114,
        114, 114, 114, 114, 114, 114, 114, 114, 114, 115, 116, 117, 118, 119,
        120, 121, 122, 123, 124, 126, 127, 128, 125, 65, 67, 67, 67, 67, 67, 67,
        67, 67, 67, 67, 67, 67, 67, 67, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76,
        77, 78, 79, 80, 81, 82, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83,
        83, 83, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82,
        99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 67, 68, 69, 70,
        71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 114, 114, 114, 114, 114,
        114, 114, 114, 114, 114, 114, 114, 114, 114, 83, 67, 68, 69, 70, 71, 72,
        73, 74, 75, 76, 77, 78, 79, 80, 81, 68, 69, 70, 71, 72, 73, 74, 75, 76,
        77, 78, 79, 80, 81, 82, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
        79, 80, 81, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98,
        67, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 100, 101,
        102, 103, 104, 105, 106, 107, 108, 66, 109, 110, 111, 112, 113, 82, 68,
        69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 115, 116, 117, 118,
        119, 120, 121, 122, 123, 124, 126, 127, 128, 125, 65, 98, 69, 70, 71,
        72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 116, 117, 118, 119, 120,
        121, 122, 123, 124, 126, 127, 128, 125, 65, 65, 113, 82, 82, 82, 82, 82,
        82, 82, 82, 82, 82, 82, 82, 82, 82, 167, 167, 167, 167, 167, 167, 167,
        167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167, 167,
        167, 167, 167, 167, 167, 167, 167, 168, 169, 156, 157, 156, 157, 156,
        157, 156, 157, 157, 156, 156, 157, 156, 157, 157, 156, 157, 157, 156,
        157, 157, 156, 157, 157, 156, 157, 157, 156, 157, 156, 168, 169, 168,
        169, 168, 169, 168, 169, 169, 168, 168, 169, 168, 169, 169, 168, 169,
        169, 168, 169, 169, 168, 169, 169, 168, 169, 169, 168, 169, 168,
      ],
      height: 20,
      id: 1,
      name: "background",
      opacity: 1,
      type: "tilelayer",
      visible: true,
      width: 30,
      x: 0,
      y: 0,
    },
    {
      data: [
        0, 248, 249, 250, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        266, 267, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 252, 253, 254,
        255, 0, 0, 248, 249, 250, 0, 0, 0, 278, 279, 0, 252, 253, 254, 255, 0,
        0, 0, 0, 0, 252, 253, 254, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 248,
        249, 250, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 242, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 173, 174, 175, 175, 175, 175, 0, 0, 0, 0, 173, 174, 175, 175, 175,
        175, 0, 0, 0, 0, 173, 173, 173, 173, 174, 175, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 233, 234, 235, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        236, 237, 238, 0, 0, 0, 0, 0, 0, 0, 0, 0, 242, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 239, 240, 241, 0, 0, 0, 0, 0, 0, 0, 0, 173,
        173, 173, 173, 174, 175, 0, 0, 0, 0, 173, 173, 173, 173, 174, 175, 0, 0,
        0, 0, 173, 173, 173, 173, 174, 175, 0, 0, 0, 0, 0, 0, 233, 234, 235, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 236, 237, 238, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 239, 240, 241, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 242, 0, 0, 0, 0, 0, 0, 173, 174, 175, 175,
        175, 175, 0, 0, 0, 0, 173, 174, 175, 175, 175, 175, 0, 0, 0, 0, 173,
        174, 175, 175, 175, 175, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 233, 234, 235,
        0, 0, 0, 0, 0, 0, 0, 233, 234, 235, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        211, 212, 0, 0, 0, 0, 236, 237, 238, 0, 211, 212, 0, 0, 0, 0, 236, 237,
        238, 211, 212, 0, 0, 203, 0, 0, 0, 0, 0, 0, 223, 224, 0, 0, 0, 0, 239,
        240, 241, 0, 223, 224, 0, 0, 242, 0, 239, 240, 241, 223, 224, 0, 0, 207,
        0, 0, 0, 173, 174, 175, 175, 175, 175, 175, 175, 175, 175, 175, 175,
        175, 175, 175, 175, 175, 175, 175, 175, 175, 175, 175, 175, 175, 175,
        175, 175, 175, 175, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      height: 20,
      id: 2,
      name: "top layer",
      opacity: 1,
      type: "tilelayer",
      visible: true,
      width: 30,
      x: 0,
      y: 0,
    },
    {
      data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 243, 243, 243, 243, 243, 243, 243, 243, 243, 243, 243,
        243, 243, 243, 243, 243, 243, 243, 243, 243, 243, 243, 243, 243, 243,
        243, 243, 243, 243, 243, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      height: 20,
      id: 3,
      name: "floor collisions",
      opacity: 1,
      type: "tilelayer",
      visible: true,
      width: 30,
      x: 0,
      y: 0,
    },
    {
      data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 243, 243, 243, 243, 243, 243, 0, 0, 0, 0, 243,
        243, 243, 243, 243, 243, 0, 0, 0, 0, 243, 243, 243, 243, 243, 243, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 243, 243,
        243, 243, 243, 243, 0, 0, 0, 0, 243, 243, 243, 243, 243, 243, 0, 0, 0,
        0, 243, 243, 243, 243, 243, 243, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 243, 243, 243, 243, 243, 243, 0, 0, 0, 0,
        243, 243, 243, 243, 243, 243, 0, 0, 0, 0, 243, 243, 243, 243, 243, 243,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      height: 20,
      id: 4,
      name: "platform collisions",
      opacity: 1,
      type: "tilelayer",
      visible: true,
      width: 30,
      x: 0,
      y: 0,
    },
  ],
  nextlayerid: 5,
  nextobjectid: 1,
  orientation: "orthogonal",
  renderorder: "right-down",
  tiledversion: "1.10.1",
  tileheight: 16,
  tilesets: [
    {
      firstgid: 1,
      source: "../../../../../../tiled/desert_b.tsx",
    },
    {
      firstgid: 129,
      source: "../../../../../../tiled/rocky road/platforms/desert_b.tsx",
    },
    {
      firstgid: 201,
      source: "../../../../../../tiled/rocky road/objects/bounce pad.tsx",
    },
    {
      firstgid: 209,
      source: "../../../../../../tiled/rocky road/enemies/cactus.tsx",
    },
    {
      firstgid: 233,
      source: "../../../../../../tiled/rocky road/deco/tree_c.tsx",
    },
    {
      firstgid: 242,
      source: "../../../../../../tiled/rocky road/deco/rock.tsx",
    },
    {
      firstgid: 243,
      source: "../../../../../../tiled/Copy of collision.tsx",
    },
    {
      firstgid: 244,
      source: "../../../../../../tiled/cloudss.tsx",
    },
    {
      firstgid: 256,
      source: "../../../../../../tiled/sun.tsx",
    },
  ],
  tilewidth: 16,
  type: "map",
  version: "1.10",
  width: 30,
});