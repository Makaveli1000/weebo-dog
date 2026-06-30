function highlightCard(video = {}) {

  return `

<div class="highlight-card">

<div class="highlight-video">

<video

class="highlight-reel-video"

src="${video.url || ""}"

playsinline

muted

loop

controls

poster="${video.poster || ""}"

></video>

</div>

<div class="highlight-overlay">

<div class="highlight-info">

<h2>${video.name || "Athlete"}</h2>

<p>

${video.school || "School"}

•

${video.sport || "Sport"}

</p>

</div>

<div class="highlight-actions">

<button onclick="likeHighlight('${video.id}')">

❤️

<span id="likes-${video.id}">

${video.likes || 0}

</span>

</button>

<button>

💬

<span>

${video.comments || 0}

</span>

</button>

<button>

↗

Share

</button>

<button>

⚡

AI

</button>

</div>

</div>

</div>

`;

}

export function renderHighlightFeed(athletes = []) {

const videos = [];

athletes.forEach((item)=>{

const athlete=item.data || item;

if(athlete.highlightUrl){

videos.push({

id:item.id,

name:athlete.name,

school:athlete.school,

sport:athlete.sport,

url:athlete.highlightUrl,

likes:0,

comments:0

});

}

});

return `

<section class="highlight-feed">

<div class="section-header">

<p class="network-kicker">

National Highlight Feed

</p>

<h2>

Discover Athletes

</h2>

<p>

Scroll to discover the next generation of greatness.

</p>

</div>

<div class="highlight-feed-container">

${videos.map(highlightCard).join("")}

</div>

</section>

`;

}