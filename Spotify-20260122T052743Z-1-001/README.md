# Spotify Music Player

A mini Spotify-style music player built with vanilla HTML, CSS, and JavaScript. The project displays a playlist, lets the user select tracks, and updates the banner artwork and text while audio plays.

## Features

- Play and pause controls
- Playlist table with 10 songs
- Dynamic banner and artwork based on the active track
- Local audio playback using browser audio APIs
- Responsive, single-page layout

## Run

Serve this folder through a static web server or open the `Spotify/index.html` file in a browser.

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000/Spotify/`.

## Files

- `Spotify/index.html` — UI structure for the music player
- `Spotify/style.css` — page styling and layout
- `Spotify/script.js` — playlist behavior and audio controls
- `Spotify/images/` — artwork and SVG icons
- `Spotify/music/` — local MP3 tracks

## Notes

This is a learning project, not a production streaming app. It uses local media files and does not include user accounts, playlists persistence, or backend APIs.
