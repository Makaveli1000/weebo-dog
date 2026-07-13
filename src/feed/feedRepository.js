import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where
} from "firebase/firestore";

const FEED_COLLECTION = "feedPosts";

export async function createFeedPost(db, postData = {}) {
  if (!db) {
    throw new Error("Firestore database was not provided.");
  }

  const requiredFields = [
    "title",
    "videoUrl",
    "uploaderId"
  ];

  const missingField = requiredFields.find(
    (field) => !String(postData[field] || "").trim()
  );

  if (missingField) {
    throw new Error(
      `Missing required feed post field: ${missingField}`
    );
  }

  const feedPostsRef = collection(
    db,
    FEED_COLLECTION
  );

  const payload = {
    title: String(postData.title || "").trim(),
    description: String(
      postData.description || ""
    ).trim(),

    category:
      postData.category ||
      "Highlight",

    videoUrl:
      postData.videoUrl,

    thumbnailUrl:
      postData.thumbnailUrl ||
      "",

    athleteId:
      postData.athleteId ||
      "",

    athleteName:
      postData.athleteName ||
      "",

    schoolId:
      postData.schoolId ||
      "",

    schoolName:
      postData.schoolName ||
      "",

    sport:
      postData.sport ||
      "",

    state:
      postData.state ||
      "",

    hashtags:
      Array.isArray(postData.hashtags)
        ? postData.hashtags
        : [],

    zeusTags:
      Array.isArray(postData.zeusTags)
        ? postData.zeusTags
        : [],

    uploaderId:
      postData.uploaderId,

    uploaderName:
      postData.uploaderName ||
      "",

    uploaderRole:
      postData.uploaderRole ||
      "fan",

    likes: 0,
    commentCount: 0,
    shareCount: 0,
    saveCount: 0,
    viewCount: 0,

    reactions: {
      greatPlay: 0,
      highlight: 0,
      beastMode: 0,
      fast: 0,
      highIQ: 0,
      clutch: 0
    },

    likedBy: [],
    savedBy: [],

    status:
      postData.status ||
      "published",

    createdAt:
      serverTimestamp(),

    updatedAt:
      serverTimestamp()
  };

  const createdDoc = await addDoc(
    feedPostsRef,
    payload
  );

  return createdDoc.id;
}

export function subscribeToFeedPosts(
  db,
  callback,
  {
    maxResults = 50,
    status = "published"
  } = {}
) {
  if (!db) {
    throw new Error(
      "Firestore database was not provided."
    );
  }

  const feedPostsRef = collection(
    db,
    FEED_COLLECTION
  );

  const feedQuery = query(
    feedPostsRef,
    where("status", "==", status),
    orderBy("createdAt", "desc"),
    limit(maxResults)
  );

  return onSnapshot(
    feedQuery,
    (snapshot) => {
      const posts = snapshot.docs.map(
        (feedDoc) => ({
          id: feedDoc.id,
          ...feedDoc.data()
        })
      );

      callback?.(posts);
    },
    (error) => {
      console.error(
        "Unable to subscribe to Sports Feed posts:",
        error
      );
    }
  );
}

export async function getFeedPostById(
  db,
  postId
) {
  if (!db || !postId) return null;

  const postRef = doc(
    db,
    FEED_COLLECTION,
    postId
  );

  const snapshot = await getDoc(postRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data()
  };
}

export async function getAthleteFeedPosts(
  db,
  athleteId,
  maxResults = 25
) {
  if (!db || !athleteId) {
    return [];
  }

  const feedPostsRef = collection(
    db,
    FEED_COLLECTION
  );

  const athleteQuery = query(
    feedPostsRef,
    where("athleteId", "==", athleteId),
    where("status", "==", "published"),
    orderBy("createdAt", "desc"),
    limit(maxResults)
  );

  const snapshot = await getDocs(
    athleteQuery
  );

  return snapshot.docs.map(
    (feedDoc) => ({
      id: feedDoc.id,
      ...feedDoc.data()
    })
  );
}

export async function getSchoolFeedPosts(
  db,
  schoolName,
  maxResults = 25
) {
  if (!db || !schoolName) {
    return [];
  }

  const feedPostsRef = collection(
    db,
    FEED_COLLECTION
  );

  const schoolQuery = query(
    feedPostsRef,
    where("schoolName", "==", schoolName),
    where("status", "==", "published"),
    orderBy("createdAt", "desc"),
    limit(maxResults)
  );

  const snapshot = await getDocs(
    schoolQuery
  );

  return snapshot.docs.map(
    (feedDoc) => ({
      id: feedDoc.id,
      ...feedDoc.data()
    })
  );
}

export async function updateFeedPost(
  db,
  postId,
  updates = {}
) {
  if (!db || !postId) {
    throw new Error(
      "A database and post ID are required."
    );
  }

  const postRef = doc(
    db,
    FEED_COLLECTION,
    postId
  );

  await updateDoc(postRef, {
    ...updates,
    updatedAt: serverTimestamp()
  });
}