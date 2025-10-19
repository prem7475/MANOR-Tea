import React, { useState, useEffect } from 'react';

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Load reviews from localStorage (in real app, this would be an API call)
    const storedReviews = JSON.parse(localStorage.getItem(`reviews-${productId}`) || '[]');
    setReviews(storedReviews);
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) return;

    const review = {
      id: Date.now(),
      ...newReview,
      date: new Date().toISOString(),
    };

    const updatedReviews = [...reviews, review];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews-${productId}`, JSON.stringify(updatedReviews));
    setNewReview({ name: '', rating: 5, comment: '' });
    setShowForm(false);
  };

  const averageRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0;

  return (
    <div className="mt-8 p-4 bg-manorLight rounded-lg">
      <h3 className="text-2xl font-bold mb-4 text-manorText">Customer Reviews</h3>

      {reviews.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <span className="text-lg font-semibold mr-2">Average Rating:</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className={`text-xl ${star <= Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                  ★
                </span>
              ))}
            </div>
            <span className="ml-2 text-manorText">({averageRating} out of 5, {reviews.length} reviews)</span>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-accent text-white px-4 py-2 rounded hover:bg-manorDark transition-colors"
      >
        {showForm ? 'Cancel' : 'Write a Review'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 p-4 border border-manorText/20 rounded">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={newReview.name}
              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Rating</label>
            <select
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
              className="p-2 border border-gray-300 rounded"
            >
              {[5, 4, 3, 2, 1].map((num) => (
                <option key={num} value={num}>{num} Stars</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Comment</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              rows="4"
              required
            />
          </div>
          <button type="submit" className="bg-accent text-white px-4 py-2 rounded hover:bg-manorDark transition-colors">
            Submit Review
          </button>
        </form>
      )}

      <div className="mt-6 space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-manorText/10 pb-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-semibold text-manorText">{review.name}</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={`text-sm ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-xs text-manorText/60">{new Date(review.date).toLocaleDateString()}</span>
            </div>
            <p className="text-manorText">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
