# TODO: Implement Card Blur and Show More Features

## Tasks
- [x] Update `src/pages/Leadership.jsx`:
  - Add state to track clicked card id
  - Add click handler function
  - Pass `isBlurred` and `onCardClick` props to LeadershipCard components
- [x] Update `src/components/LeadershipCard.jsx`:
  - Add `isBlurred` and `onCardClick` props
  - Apply blur CSS class conditionally
  - Add state for show more toggle
  - Add "Show More"/"Show Less" button
  - Make card clickable for blur effect
  - Conditionally render truncated/full details

## Followup Steps
- [x] Test blur effect and show more functionality
- [x] Ensure modal still works
- [x] Verify responsive design
- [x] Implement synchronized show more/less across cards
