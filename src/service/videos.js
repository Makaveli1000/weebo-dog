export function collectAthleteVideos(athletes = []) {
  const videos = [];

  athletes.forEach((item) => {
    const athlete = item.data || item;
    const athleteId = item.id || "";

    if (athlete.highlightUrl) {
      videos.push({
        id: `${athleteId}-main`,
        athleteId,
        title: "Main Highlight",
        athlete,
        url: athlete.highlightUrl
      });
    }

    (athlete.videos || []).forEach((video, index) => {
      if (!video.url) return;

      videos.push({
        id: `${athleteId}-${index}`,
        athleteId,
        title: video.title || "Highlight",
        athlete,
        url: video.url
      });
    });
  });

  return videos;
}