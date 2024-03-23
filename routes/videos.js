const express = require("express");
const router = express.Router();
const fs = require("fs");
const uuid = require("uuid").v4;

function readData() {
  const videoData = fs.readFileSync("./data/videos.json");
  const parsedVideoData = JSON.parse(videoData);
  return parsedVideoData;
}
function readDetails() {
  const videoData = fs.readFileSync("./data/video-data.json");
  const parsedVideoData = JSON.parse(videoData);
  return parsedVideoData;
}

router.get("/", (_req, res) => {
  const videos = readData();
  res.json(videos);
});

router.get("/:id", (req, res) => {
  const vids = readDetails();
  const videoData = vids.find((vid) => vid.id === req.params.id);
  res.json(videoData);
});

module.exports = router;
