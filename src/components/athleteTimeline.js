function escapeTimelineHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizeTimeline(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  return [];
}

function normalizeList(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeTimelineDate(value) {
  if (!value) return 0;

  if (typeof value?.toMillis === "function") {
    return value.toMillis();
  }

  if (typeof value?.toDate === "function") {
    return value.toDate().getTime();
  }

  if (Number(value?.seconds)) {
    return Number(value.seconds) * 1000;
  }

  if (value instanceof Date) {
    return value.getTime();
  }

  const parsed = Date.parse(value);

  return Number.isFinite(parsed)
    ? parsed
    : 0;
}

function formatTimelineDate(value) {
  const timestamp = normalizeTimelineDate(value);

  if (!timestamp) {
    return "Date pending";
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric"
    }
  ).format(new Date(timestamp));
}

function getTimelineIcon(type = "") {
  const icons = {
    network: "🌐",
    verified: "✅",
    film: "🎥",
    visit: "🏫",
    camp: "🏕️",
    offer: "📨",
    interest: "👀",
    commitment: "✅",
    signing: "✍️",
    transfer: "🔁",
    zeus: "⚡",
    achievement: "🏆",
    academic: "📚",
    update: "📌"
  };

  return icons[String(type).toLowerCase()] || "📌";
}

function getTimelineLabel(type = "") {
  const labels = {
    network: "Network Milestone",
    verified: "Profile Verification",
    film: "Film Update",
    visit: "Official Visit",
    camp: "Camp Attended",
    offer: "Offer Received",
    interest: "Recruiting Interest",
    commitment: "Commitment",
    signing: "Signing Day",
    transfer: "Transfer Update",
    zeus: "Zeus Scouting Milestone",
    achievement: "Athlete Achievement",
    academic: "Academic Update",
    update: "Athlete Update"
  };

  return labels[String(type).toLowerCase()] || "Athlete Update";
}

function buildTimelineItems(athlete = {}) {
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
      type: "network",
      title: "Added to Snt.L.Mo. Sports Network",
      detail: `${athleteName} joined the national athlete database.`,
      date: athlete.createdAt,
      verified: true
    });
  }

  if (
    athlete.verified === true ||
    athlete.isVerified === true ||
    athlete.profileVerified === true ||
    athlete.identityVerified === true
  ) {
    generatedTimeline.push({
      type: "verified",
      title: "Athlete Profile Verified",
      detail:
        "Identity, profile information, and athlete data were verified.",
      date:
        athlete.verifiedAt ||
        athlete.updatedAt ||
        athlete.createdAt,
      verified: true
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
      type: "film",
      title: "Highlight Film Added",
      detail:
        "Recruiting film is available for coach and recruiter review.",
      date:
        athlete.videoUpdatedAt ||
        athlete.updatedAt ||
        athlete.createdAt,
      verified:
        Boolean(
          athlete.filmVerified ||
          athlete.verifiedFilm
        )
    });
  }

  const offers = normalizeList(
    athlete.offers
  );

  offers.forEach((offer) => {
    if (typeof offer === "string") {
      generatedTimeline.push({
        type: "offer",
        title: offer,
        detail: "Athletic scholarship offer received.",
        date:
          athlete.offerDate ||
          athlete.updatedAt ||
          athlete.createdAt,
        verified: false
      });

      return;
    }

    generatedTimeline.push({
      type: "offer",
      title:
        offer.school ||
        offer.name ||
        "College Offer",
      detail:
        offer.detail ||
        offer.status ||
        "Athletic scholarship offer received.",
      date:
        offer.date ||
        offer.createdAt ||
        athlete.offerDate ||
        athlete.updatedAt,
      verified:
        Boolean(offer.verified)
    });
  });

  const interest = normalizeList(
    athlete.interest ||
    athlete.collegeInterest
  );

  interest.forEach((item) => {
    generatedTimeline.push({
      type: "interest",
      title:
        typeof item === "string"
          ? item
          : (
              item.school ||
              item.name ||
              "College Interest"
            ),
      detail:
        typeof item === "string"
          ? "Recruiting interest recorded."
          : (
              item.detail ||
              item.status ||
              "Recruiting interest recorded."
            ),
      date:
        typeof item === "string"
          ? (
              athlete.interestDate ||
              athlete.updatedAt
            )
          : (
              item.date ||
              item.createdAt ||
              athlete.interestDate
            ),
      verified:
        Boolean(item?.verified)
    });
  });

  const visits = normalizeList(
    athlete.officialVisits ||
    athlete.visits
  );

  visits.forEach((visit) => {
    generatedTimeline.push({
      type: "visit",
      title:
        typeof visit === "string"
          ? visit
          : (
              visit.school ||
              visit.title ||
              "Official Visit"
            ),
      detail:
        typeof visit === "string"
          ? `Recruiting visit with ${visit}.`
          : (
              visit.detail ||
              visit.notes ||
              visit.location ||
              "Official recruiting visit."
            ),
      date:
        typeof visit === "string"
          ? (
              athlete.visitDate ||
              athlete.updatedAt
            )
          : (
              visit.date ||
              visit.createdAt ||
              athlete.visitDate
            ),
      verified:
        Boolean(visit?.verified)
    });
  });

  const camps = normalizeList(
    athlete.camps
  );

  camps.forEach((camp) => {
    generatedTimeline.push({
      type: "camp",
      title:
        typeof camp === "string"
          ? camp
          : (
              camp.name ||
              camp.title ||
              "Camp Attended"
            ),
      detail:
        typeof camp === "string"
          ? "Athlete camp participation."
          : (
              camp.detail ||
              camp.location ||
              camp.notes ||
              "Athlete camp participation."
            ),
      date:
        typeof camp === "string"
          ? athlete.updatedAt
          : (
              camp.date ||
              camp.createdAt
            ),
      verified:
        Boolean(camp?.verified)
    });
  });

  if (
    athlete.commitment ||
    athlete.committedTo ||
    athlete.committedSchool
  ) {
    const school =
      athlete.committedSchool ||
      athlete.commitment ||
      athlete.committedTo;

    generatedTimeline.push({
      type: "commitment",
      title: school,
      detail:
        athlete.commitmentStatus ||
        `${athleteName} announced a commitment to ${school}.`,
      date:
        athlete.commitmentDate ||
        athlete.updatedAt,
      verified:
        Boolean(
          athlete.commitmentVerified
        )
    });
  }

  if (
    athlete.signingDate ||
    athlete.signedSchool
  ) {
    generatedTimeline.push({
      type: "signing",
      title:
        athlete.signedSchool ||
        athlete.committedSchool ||
        "National Signing Day",
      detail:
        athlete.signingDetail ||
        "Official signing completed.",
      date:
        athlete.signingDate,
      verified:
        Boolean(
          athlete.signingVerified
        )
    });
  }

  const transfers = normalizeList(
    athlete.transfers
  );

  transfers.forEach((transfer) => {
    generatedTimeline.push({
      type: "transfer",
      title:
        typeof transfer === "string"
          ? transfer
          : (
              transfer.school ||
              transfer.title ||
              "Transfer Update"
            ),
      detail:
        typeof transfer === "string"
          ? "Transfer activity recorded."
          : (
              transfer.detail ||
              transfer.status ||
              "Transfer activity recorded."
            ),
      date:
        typeof transfer === "string"
          ? athlete.updatedAt
          : (
              transfer.date ||
              transfer.createdAt
            ),
      verified:
        Boolean(transfer?.verified)
    });
  });

  const zeusMilestones = normalizeList(
    athlete.zeusMilestones
  );

  zeusMilestones.forEach((milestone) => {
    generatedTimeline.push({
      type: "zeus",
      title:
        typeof milestone === "string"
          ? milestone
          : (
              milestone.title ||
              "Zeus Scouting Milestone"
            ),
      detail:
        typeof milestone === "string"
          ? "Zeus scouting milestone recorded."
          : (
              milestone.detail ||
              milestone.summary ||
              "Zeus scouting milestone recorded."
            ),
      date:
        typeof milestone === "string"
          ? athlete.updatedAt
          : (
              milestone.date ||
              milestone.createdAt
            ),
      verified:
        Boolean(milestone?.verified)
    });
  });

  const sourceTimeline =
    customTimeline.length
      ? customTimeline
      : generatedTimeline;

  return sourceTimeline
    .map((item, index) => {
      if (typeof item === "string") {
        return {
          id: `timeline-${index}`,
          type: "update",
          title: item,
          detail: "",
          date: null,
          verified: false
        };
      }

      const type =
        item.type ||
        "update";

      return {
        id:
          item.id ||
          `timeline-${index}`,

        type,

        title:
          item.title ||
          getTimelineLabel(type),

        detail:
          item.detail ||
          item.description ||
          item.notes ||
          "",

        date:
          item.date ||
          item.createdAt ||
          null,

        icon:
          item.icon ||
          getTimelineIcon(type),

        verified:
          Boolean(item.verified)
      };
    })
    .sort(
      (a, b) =>
        normalizeTimelineDate(b.date) -
        normalizeTimelineDate(a.date)
    );
}

export function renderAthleteTimeline(
  athlete = {}
) {
  const timelineItems =
    buildTimelineItems(athlete);

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
          ${timelineItems.length}
          EVENT${timelineItems.length === 1 ? "" : "S"}
        </span>

      </div>

      ${
        timelineItems.length
          ? `
              <div class="athlete-timeline">

                ${timelineItems.map((item, index) => `
                  <article
                    class="athlete-timeline-item"
                    data-timeline-type="${escapeTimelineHtml(
                      item.type
                    )}">

                    <div class="athlete-timeline-marker">

                      <span>
                        ${item.icon}
                      </span>

                      ${
                        index < timelineItems.length - 1
                          ? `<i></i>`
                          : ""
                      }

                    </div>

                    <div class="athlete-timeline-content">

                      <div class="athlete-timeline-topline">

                        <small>
                          ${formatTimelineDate(item.date)}
                        </small>

                        <em>
                          ${escapeTimelineHtml(
                            getTimelineLabel(item.type)
                          )}
                        </em>

                      </div>

                      <strong>
                        ${escapeTimelineHtml(item.title)}
                      </strong>

                      ${
                        item.detail
                          ? `
                              <p>
                                ${escapeTimelineHtml(item.detail)}
                              </p>
                            `
                          : ""
                      }

                      ${
                        item.verified
                          ? `
                              <span class="athlete-timeline-verified">
                                ✓ Verified Update
                              </span>
                            `
                          : ""
                      }

                    </div>

                  </article>
                `).join("")}

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
                  Official visits, camps, offers,
                  commitments, signing updates, transfers,
                  film updates, and Zeus milestones will
                  appear here.
                </p>

              </div>
            `
      }

    </section>
  `;
}