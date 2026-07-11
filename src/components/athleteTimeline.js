function normalizeTimeline(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  return [];
}

function formatTimelineDate(value) {
  if (!value) return "Date pending";

  if (typeof value === "string") {
    const parsed = new Date(value);

    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    }

    return value;
  }

  if (value?.toDate instanceof Function) {
    return value.toDate().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  }

  if (value?.seconds) {
    return new Date(value.seconds * 1000).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  }

  return "Date pending";
}

export function renderAthleteTimeline(athlete = {}) {
  const athleteName =
    athlete.name ||
    "Athlete";

  const customTimeline = normalizeTimeline(
    athlete.timeline ||
    athlete.recruitingTimeline
  );

  const generatedTimeline = [];

  if (athlete.createdAt) {
    generatedTimeline.push({
      title: "Added to Snt.L.Mo. Sports Network",
      detail: `${athleteName} joined the national athlete database.`,
      date: athlete.createdAt,
      icon: "🌐",
      type: "network"
    });
  }

  if (
    athlete.verified === true ||
    athlete.isVerified === true
  ) {
    generatedTimeline.push({
      title: "Athlete Profile Verified",
      detail: "Identity, profile information, and athlete data verified.",
      date: athlete.verifiedAt || athlete.updatedAt,
      icon: "✅",
      type: "verified"
    });
  }

  if (
    athlete.highlightUrl ||
    athlete.highlight ||
    (
      Array.isArray(athlete.videos) &&
      athlete.videos.length
    )
  ) {
    generatedTimeline.push({
      title: "Highlight Film Added",
      detail: "Recruiting film is available for coach and recruiter review.",
      date:
        athlete.videoUpdatedAt ||
        athlete.updatedAt ||
        athlete.createdAt,
      icon: "🎥",
      type: "film"
    });
  }

  const offers = Array.isArray(athlete.offers)
    ? athlete.offers
    : typeof athlete.offers === "string"
      ? athlete.offers
          .split(",")
          .map(item => item.trim())
          .filter(Boolean)
      : [];

  offers.forEach((offer) => {
    generatedTimeline.push({
      title: "College Offer",
      detail: `Recruiting opportunity from ${offer}.`,
      date:
        athlete.offerDate ||
        athlete.updatedAt ||
        athlete.createdAt,
      icon: "🎓",
      type: "offer"
    });
  });

  const visits = Array.isArray(athlete.visits)
    ? athlete.visits
    : typeof athlete.visits === "string"
      ? athlete.visits
          .split(",")
          .map(item => item.trim())
          .filter(Boolean)
      : [];

  visits.forEach((visit) => {
    generatedTimeline.push({
      title: "College Visit",
      detail: `Recruiting visit with ${visit}.`,
      date:
        athlete.visitDate ||
        athlete.updatedAt ||
        athlete.createdAt,
      icon: "📍",
      type: "visit"
    });
  });

  if (
    athlete.commitment ||
    athlete.committedTo
  ) {
    generatedTimeline.push({
      title: "Commitment Announced",
      detail: `${athleteName} committed to ${
        athlete.commitment ||
        athlete.committedTo
      }.`,
      date:
        athlete.commitmentDate ||
        athlete.updatedAt,
      icon: "✍️",
      type: "commitment"
    });
  }

  const timelineItems = customTimeline.length
    ? customTimeline
    : generatedTimeline;

  return `
    <section class="athlete-panel athlete-timeline-panel">

      <div class="athlete-panel-heading">

        <div>
          <p class="network-kicker">
            Recruiting Journey
          </p>

          <h3>
            Athlete Timeline
          </h3>
        </div>

        <span class="athlete-measurement-badge">
          LIVE HISTORY
        </span>

      </div>

      ${
        timelineItems.length
          ? `
            <div class="athlete-timeline">

              ${timelineItems.map((item, index) => {
                const title =
                  typeof item === "string"
                    ? item
                    : item.title ||
                      "Timeline Update";

                const detail =
                  typeof item === "string"
                    ? ""
                    : item.detail ||
                      item.description ||
                      "";

                const date =
                  typeof item === "string"
                    ? "Date pending"
                    : formatTimelineDate(
                        item.date ||
                        item.createdAt
                      );

                const icon =
                  typeof item === "string"
                    ? "⚡"
                    : item.icon ||
                      "⚡";

                return `
                  <div class="athlete-timeline-item">

                    <div class="athlete-timeline-marker">

                      <span>
                        ${icon}
                      </span>

                      ${
                        index < timelineItems.length - 1
                          ? `<i></i>`
                          : ""
                      }

                    </div>

                    <div class="athlete-timeline-content">

                      <small>
                        ${date}
                      </small>

                      <strong>
                        ${title}
                      </strong>

                      ${
                        detail
                          ? `
                            <p>
                              ${detail}
                            </p>
                          `
                          : ""
                      }

                    </div>

                  </div>
                `;
              }).join("")}

            </div>
          `
          : `
            <div class="athlete-empty-panel">

              <span>
                🗓️
              </span>

              <h4>
                No timeline activity yet
              </h4>

              <p>
                Recruiting offers, visits, film updates,
                and athlete milestones will appear here.
              </p>

            </div>
          `
      }

    </section>
  `;
}