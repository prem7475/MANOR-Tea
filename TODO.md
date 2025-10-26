# TODO: Implement Cart Badge and Centralize Offers Application

## 1. Improve Cart Badge Styling
- [ ] Add CSS styles for .cart-badge in App.css to match the provided solution (position absolute, scale animation, etc.)
- [ ] Update Navbar.jsx to use the new class and structure (add span inside a container with position relative)

## 2. Centralize Offers
- [ ] Move offers array to useCart.jsx
- [ ] Standardize offer structure (use 'code' instead of 'id')
- [ ] Rename applyOffer to applyCoupon and modify to take couponCode string
- [ ] Update Offers.jsx to use centralized offers and applyCoupon
- [ ] Update Cart.jsx to use centralized offers and applyCoupon
- [ ] Ensure both pages can apply offers from any page

## 3. Testing
- [ ] Test cart badge shows/hides correctly
- [ ] Test applying offers from Offers page
- [ ] Test applying offers from Cart page
- [ ] Verify backend API integration

---

# TODO: Implement Advanced Features

## 4. Interactive Tea Sommelier Quiz
- [ ] Create src/pages/TeaSommelier.jsx: Full-screen quiz with questions, images, progress tracking, and personalized recommendations
- [ ] Add /quiz route to App.jsx
- [ ] Implement quiz logic with state management for answers and progress
- [ ] Add full-screen styling and responsive design
- [ ] Create result profiles (e.g., "Spiced Connoisseur") with tea recommendations

## 5. Origin Story Immersive Scroller
- [ ] Edit src/pages/About.jsx: Transform into immersive scroller with video, founder photo, and blending process hotspots
- [ ] Add scroll-triggered animations and locking sections
- [ ] Implement interactive hotspots on blending process image
- [ ] Add cinematic video section and founder mission text

## 6. Visual Ingredients Breakdown
- [ ] Edit src/pages/ProductDetail.jsx: Add interactive hotspots on product image for ingredient breakdowns
- [ ] Update src/data/teaData.js: Add ingredient data for products
- [ ] Implement pulsing "+" icons and pop-up modals with ingredient info
- [ ] Ensure hotspots are clickable and show detailed information

## 7. Post-Purchase Dashboard
- [ ] Create src/pages/ThankYou.jsx: Dashboard with order tracker, referral program, brewing guide, and Instagram link
- [ ] Add /thank-you route to App.jsx
- [ ] Edit src/pages/Chcekout.jsx: Change payment success to navigate to /thank-you instead of inline display
- [ ] Implement visual order tracker with steps
- [ ] Add referral hook with unique share link
- [ ] Include brewing guide content and community links

## 8. Dependencies and Testing
- [ ] Install Framer Motion or similar for animations if needed
- [ ] Test full-screen quiz on mobile and desktop
- [ ] Test scrolling animations and hotspot interactions
- [ ] Test thank-you dashboard display and functionality
- [ ] Ensure all new features are responsive and accessible
