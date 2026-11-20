# 06 — Homepage

> **Front end already built in phase 02A.** The design and interactions below already exist with temporary data. In this phase:
> - connect them to the CMS blocks and collections;
> - add `sectionControls` and `extraSections` where this prompt asks;
> - fix any gap against the prototype.
>
> Do not rebuild or restyle components that already match the pages approved in the phase 02A review.

Follow `00-Project-Rules.md`. Build the components for the homepage blocks from phase 05 so the homepage matches `design/prototype-c6.html` exactly. The homepage is a Page with `isHomepage`, and its default layout is these 16 blocks in this order.

| # | Block | Required design and behaviour |
|---|---|---|
| 1 | `heroSlider` | See section A below. |
| 2 | `planBar` | Beige rounded bar overlapping the bottom of the hero. Two selects (Explore, Travel dates) and a Start planning button. Submitting opens the quote panel pre-filled with "{Explore} · {Travel dates}". |
| 3 | `thingsToDo` | Chips: "All day trips" first, then mood chips with icons. "All" shows the day trips from the `dayTrips` collection; each mood shows its four items. White rounded cards contain an image with a save heart, a kind label, the title, a pin icon with the emirate, an availability chip (for example "Full day · private transport"), a short text, and a Request a quote link. Cards animate in when the chip changes. |
| 4 | `packagesStack` | Large rounded image panels that **stick and stack** while scrolling: `position: sticky`, top offset 110 px + 22 px per card. Each panel shows "{days} days · {style}", the title, "route → route · intro" and a yellow round arrow that rotates on hover. |
| 5 | `adventuresRail` | Horizontal snap rail with previous/next buttons. Numbered cards (01, 02…), a badge, emirate, title, line and an "Add to my trip" button that opens the quote panel. Cards with a video show a "Hover to play" chip: the video plays on hover on desktop, and when the card is 70% visible on touch devices. |
| 6 | `holidayStylesFilter` | Chips: All plus each holiday style. "All" shows one card per style. A style chip shows that style's destination cards with the card note. Bespoke shows a single card. |
| 7 | `filmChapters` | Dark section. Large video screen on the left and a chapter list on the right (mono place label, serif chapter name, active chapter in yellow with a 12-second progress line). Autoplays muted when 45% visible and pauses when it leaves. Chapters advance every 12 seconds while playing. Round play/pause button in the centre. |
| 8 | `statement` | Large serif sentence. Words go from faint to full colour as the visitor scrolls. The highlighted phrase is blue italic. With reduced motion, everything shows at once. |
| 9 | `emiratesRail` | Portrait cards with a save heart, a hover video where one exists, name and line. Arrows and dots that track scroll position. |
| 10 | `spinCompass` | Yellow rounded box. A conic-gradient dial spins (2.4 seconds, ease-out) and lands on a random adventure from `adventures`, then shows its photo, title, line, "Add to my trip" and "Spin again". |
| 11 | `seasonCampaign` | Rounded dark card with a background image, yellow tag, headline with the last word highlighted, text, quick-link chips and a yellow button. With "bridge" on, the section background is cream for the top 55% and night for the rest, so the card straddles into the B2B section. |
| 12 | `b2bAccordion` | Night background. Rows show number, serif title, short line and a + button. The first row is open. An open row shows image, intro, "what we handle" chips, an Explore button and a Request a proposal link. The height animates. One row is open at a time. |
| 13 | `partnersStrip` | Continues the night background. Label plus a six-up logo row; logos are dashed placeholders until uploaded. A straight edge into the next section — **no gradient fades**. |
| 14 | `momentsWall` | Two rows of photos moving in opposite directions (CSS animation), paused on hover, with caption pills. |
| 15 | `guidesGrid` | Four white cards with a save heart, tag, title and "Read the guide". |
| 16 | `contactRows` | Huge serif heading with the highlighted words in green, then three large rows with title, line and a round arrow that turns on hover. |

## A. Hero slider (block 1)
- Full-height (up to 960 px) video slider.
- The **next slide peeks** at the right edge, as a rounded panel at 22–78% height. Clicking it advances.
- Auto-advances every 8 seconds. Only the active video plays.
- The active slide's location label and serif headline animate in.
- Controls:
  - "Watch the film" pill, scrolling to the film block;
  - pause/play chip;
  - counter "01 —— 05" with a progress line;
  - previous/next buttons.
- An image fallback sits under every video.

## Save to my trip
- Hearts on cards store item names in `localStorage` (wrap every access in try/catch) and show a toast.
- The header "My trip (n)" button opens the quote panel pre-filled with "My trip: item, item…".

## Rules
- No gradient fades between sections. Section edges are straight. This was a specific client instruction.
- All text, images, videos and lists come from the block fields, with prototype defaults.
- Every interaction works with a keyboard and respects reduced motion.
- Videos pause when off screen.

## Done when
- Every block matches the prototype at 1440, 768 and 375 px when checked in the dev server.
- Every interaction above works by hand. Automated tests come in phase 12.
- Editing a heading in the admin shows on the homepage after publish.
