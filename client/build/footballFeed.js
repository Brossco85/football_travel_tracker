var FootballFeed = function(){

    var url = 'http://feeds.bbci.co.uk/sport/football/rss.xml';
    var feedArea = document.getElementById('feeds');
    var table = document.getElementById('feed-list');
    feednami.load(url).then(feed => {
      var stories = feed.entries;
      console.log(stories);
        for (i = 0; i < stories.length; i++) {
          var tr = document.createElement('tr');
          var td = document.createElement('td');
          var a = document.createElement('a');
          var p = document.createElement('p');
          var spacer = document.createElement('p');
          var time = document.createElement('p');
          var img = document.createElement('img');
          var story = stories[i];
          var dateAndTime = new Date(story.pubdate);
          a.innerHTML = story.title;
          a.href = story.permalink;
          a.setAttribute("id", "story-title")
          p.innerText = story.description;
          spacer.innerText = "";
          img.setAttribute("id", "football-photo");
          img.setAttribute("src", story.image.url);
          time.innerText = dateAndTime.toUTCString().slice(0,22);
          table.appendChild(time);
          time.appendChild(tr);
          tr.appendChild(td);
          td.appendChild(a);
          a.appendChild(spacer);
          spacer.append(p);
          p.append(img); 
        }
      })
}