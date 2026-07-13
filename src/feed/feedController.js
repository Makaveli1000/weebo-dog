import { initializeFeedComments } from "./feedComments.js";
import { initializeFeedLikes } from "./feedLikes.js";
import { initializeFeedReactions } from "./feedReactions.js";
import { initializeFeedInfiniteScroll } from "./feedInfiniteScroll.js";
import { initializeFeedVideoPlayer } from "./feedVideoPlayer.js";
import { initializeFeedFilters } from "./feedFilters.js";
import { initializeFeedActions } from "./feedActions.js";
import { initializeFeedUpload } from "./feedUpload.js";

export function initializeSportsFeed({
  db,
  storage,
  currentUser,
  currentProfile,
  isAdminProfile,
  athletes = [],
  onUploaded
} = {}) {
  const feedRoot = document.getElementById(
    "sports-feed-page"
  );

  const feedList = document.getElementById(
    "sports-feed-list"
  );

  if (!feedRoot || !feedList) return;

  initializeFeedLikes(feedRoot, {
    db,
    currentUser
  });

  initializeFeedComments(feedRoot, {
    db,
    currentUser,
    currentProfile,
    isAdminProfile
  });

  initializeFeedReactions(feedRoot);
  initializeFeedActions(feedRoot);
  initializeFeedFilters(feedRoot);
  initializeFeedInfiniteScroll(feedRoot);
  initializeFeedVideoPlayer(feedRoot);

  initializeFeedUpload({
    db,
    storage,
    currentUser,
    currentProfile,
    athletes,
    onUploaded
  });
}
  
  