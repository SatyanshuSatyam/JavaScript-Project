# Spotify-Inspired Music Player

A small music player that mimics the feel of a Spotify-style playlist interface. It loads local audio files, updates the album art, and lets the user switch between tracks.

## Run

Open `index.html` directly in a browser or serve the folder with a local static server.

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/` from the project directory.

## Files

- `index.html` — playlist and player layout
- `style.css` — design and responsive styling
- `script.js` — media control logic and banner metadata changes
- `images/` — cover art, banners, and icons
- `music/` — MP3 track files

## Known limitations

- No user authentication or cloud library
- No saved playlists
- No autoplay policy workaround beyond browser playback rules
- Audio is local-only and depends on the files present in the folder
