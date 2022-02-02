function setup() {
  updateScorelines('h1')
  updateScorelines('h2')
  updateScorelines('h3')
  hideOptaScore();
}

function updateScorelines(element) {
  let scores = document.getElementsByTagName(element)
  
  Array.from(scores).forEach(score => {
    const regex = /([0-9]-[0-9])/g;
    const regex2 = /([0-9] - [0-9])/g;
    let scoreText = score.textContent;
    const found = scoreText.match(regex)
    const found2 = scoreText.match(regex2)
    
    if(found != null || found2 != null) {
      let indexOfScore = scoreText.indexOf(found)
      let titleBeforeScore = scoreText.substring(0, indexOfScore)
      let titleAfterScore = ""
      
      if(found) {
        titleAfterScore = scoreText.substring(indexOfScore + 3)
      } else {
        titleAfterScore = scoreText.substring(indexOfScore + 5)
      }
      
      let newTitle = titleBeforeScore + "[REDACTED]" + titleAfterScore;
      score.textContent = newTitle;
    }
  });
  
  let metadataText = document.querySelector('.video-metadata');
  let videoWrap = document.querySelector('.master-player').parentNode
  
  if(metadataText != null) {
    metadataText.style.display = "none";
  }
  
  if(videoWrap != null) {
    videoWrap.style.width = "100%";
  }

}

function hideOptaScore() {
  let optaBanner = document.querySelector('[data-widget="match-header"]');
  
  if(optaBanner != null) {
    optaBanner.style.display = "none";
  }
}
setup();
