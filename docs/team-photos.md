# Team photos

The homepage and People page use the same two image files:

```text
public/team/shahab.jpg
public/team/vahid.jpg
```

To update a portrait, prepare a clear, recent JPEG with a square crop. A source
image around 1200 x 1200 pixels gives Next.js enough detail for responsive
display without committing an unnecessarily large original. Keep the face near
the centre and leave a little space around the head and shoulders because the
website applies its own crop.

Replace the corresponding file while keeping the same lowercase filename. No
code change is then required, and the new portrait appears in both locations
after the next deployment.

Before committing, confirm that:

- the image belongs to the team member and they consent to publishing it;
- the orientation is correct and the face is not cropped at common screen sizes;
- the file is reasonably compressed, ideally below 500 KB;
- no sensitive location or device metadata needs to be retained.

Browsers and CDNs can cache images with unchanged filenames. After deployment,
use a hard refresh or a private window when checking the replacement. If a stale
image persists, change the filename and update the `photo` value in both
`src/app/page.tsx` and `src/app/team/page.tsx`.
