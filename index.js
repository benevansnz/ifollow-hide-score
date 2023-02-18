function setup() {
  insertStyles();
  updateScorelines("h1");
  updateScorelines("h2");
  updateScorelines("h3");
  updateScorelines("h4");
  updateScorelines("h5");
  updateScorelines("h6");
  hideOptaScore();
}

let scoreFormat1 = /([0-9]-[0-9])/g;
let scoreFormat2 = /([0-9] - [0-9])/g;

function updateScorelines(element) {
  let scores = document.getElementsByTagName(element);

  Array.from(scores).forEach((score) => {
    let scoreText = score.textContent;
    let found = scoreText.match(scoreFormat1);
    let found2 = scoreText.match(scoreFormat2);

    if (found != null || found2 != null) {
      let indexOfScore = scoreText.indexOf(found);
      let titleBeforeScore = scoreText.substring(0, indexOfScore);
      let titleAfterScore = "";

      if (found) {
        titleAfterScore = scoreText.substring(indexOfScore + 3);
      } else {
        titleAfterScore = scoreText.substring(indexOfScore + 5);
      }

      let newTitle = titleBeforeScore + "[REDACTED]" + titleAfterScore;
      score.textContent = newTitle;
      score.closest("a").classList.add("hasRedactedScore");
    }
  });

  let metadataText = document.querySelector(".video-metadata");
  let videoWrap = document.querySelector(".master-player");

  if (metadataText != null) {
    metadataText.style.display = "none";
  }

  if (videoWrap != null) {
    videoWrap.parentNode.style.width = "100%";
  }
}

function hideOptaScore() {
  let optaBanner = document.querySelector('[data-widget="match-header"]');

  let h1 = document.createElement("h1");
  h1.innerText = "Opta Score Banner hidden";
  let div = document.createElement("div");
  div.style.textAlign = "center";
  h1.style.marginTop = "40px";
  div.appendChild(h1);

  let liveMatchCenterButton = optaBanner.querySelector(".btn");

  if (liveMatchCenterButton) {
    liveMatchCenterButton.classList.remove("btn-grey");
    liveMatchCenterButton.classList.add("btn-primary");
    div.appendChild(liveMatchCenterButton);
  }

  if (optaBanner != null) {
    optaBanner.replaceWith(div);
  }
}

function insertStyles() {
  var css = `
    .hasRedactedScore img { display: none !important }
    .video img { display: none !important; }
  `;
  (head = document.head || document.getElementsByTagName("head")[0]),
    (style = document.createElement("style"));
  head.appendChild(style);

  style.type = "text/css";
  style.appendChild(document.createTextNode(css));
}
setup();
