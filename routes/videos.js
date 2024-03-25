const express = require("express");
const router = express.Router();
const fs = require("fs");
const uuid = require("uuid").v4;

function readData() {
  const videoData = fs.readFileSync("./data/videos.json");
  const parsedVideoData = JSON.parse(videoData);
  return parsedVideoData.map((item) => ({
    id: item.id,
    title: item.title,
    channel: item.channel,
    image: item.image,
  }));
}
function readDetails() {
  const videoData = fs.readFileSync("./data/videos.json");
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

router.post("/", (req, res) => {
  const today = new Date().valueOf();
  const newPost = {
    id: uuid(),
    title: req.body.title,
    channel: req.body.channel || "New User",
    image:
      req.body.image || "http://localhost:8080/images/cover-placeholder.png",
    description: req.body.description,
    views: 0,
    likes: 0,
    duration: req.body.duration,
    video: req.body.video || "http://localhost:8080/sample_video.mp4",
    timestamp: today,
    comments: [],
  };

  const post = readDetails();
  post.push(newPost);
  fs.writeFileSync("./data/videos.json", JSON.stringify(post));

  res.status(201).json(newPost);
});

router.post("/:id/comments", (req, res) => {
  const today = new Date().valueOf();
  const newComment = {
    id: uuid(),
    name: "guest",
    comment: req.body.comment,
    likes: 0,
    timestamp: today,
  };
  const posts = readDetails();
  const chosenPost = posts.find((post) => post.id === req.params.id);
  const comments = chosenPost.comments;
  comments.push(newComment);

  fs.writeFileSync("./data/videos.json", JSON.stringify(posts));

  res.status(201).json(newComment);
});

module.exports = router;
