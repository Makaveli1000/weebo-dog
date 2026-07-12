import { initializeFeedComments } from "./feedComments.js";
import { initializeFeedLikes } from "./feedLikes.js";
import { initializeFeedReactions } from "./feedReactions.js";
import { initializeFeedInfiniteScroll } from "./feedInfiniteScroll.js";
import { initializeFeedVideoPlayer } from "./feedVideoPlayer.js";

export function initializeSportsFeed() {
  const feedRoot = document.getElementById(
    "sports-feed-page"
  );

  const feedList = document.getElementById(
    "sports-feed-list"
  );

  if (!feedRoot || !feedList) return;

  initializeFeedLikes(feedRoot);
  initializeFeedComments(feedRoot);
  initializeFeedReactions(feedRoot);
  initializeFeedInfiniteScroll(feedRoot);
  initializeFeedVideoPlayer(feedRoot);
}