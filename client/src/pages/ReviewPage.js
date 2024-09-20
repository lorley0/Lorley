import React, { useState } from 'react';
import './ReviewPage.css';
import api from '../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { postReview, uploadReviewImage } from '../utils/api';
import ReviewActions from '../components/ReviewActions';

const ReviewPage = ({ businessId }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);
  const [image, setImage] = useState(null);
  
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.reviews);  // Assuming reviews are stored in Redux state

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('reviewText', reviewText);
    formData.append('rating', rating);
    formData.append('image', image);
    
    try {
      await dispatch(postReview(businessId, formData));
      alert('Review submitted!');
      setReviewText('');
      setRating(1);
      setImage(null);
    } catch (error) {
      console.error('Error submitting review', error);
    }
  };

  return (
    <div className="review-page">
      <h2>Submit a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Write a Review:</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Rating:</label>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))} required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="form-group">
          <label>Upload Image:</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <button type="submit">Submit Review</button>
      </form>

      <h2>Reviews for Business</h2>
      <div className="reviews-list">
        {reviews.map((review) => (
          <div className="review-item" key={review._id}>
            <p>{review.text}</p>
            {review.image && <img src={review.image} alt="Review" />}
            <p>Rating: {review.rating}</p>
            <ReviewActions reviewId={review._id} isBusinessOwner={review.isBusinessOwner} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewPage;
