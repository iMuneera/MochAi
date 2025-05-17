import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import BasicRating from './BasicRating'; // Assuming you have a BasicRating component

export default function ReviewModal({ 
  itemId, 
  itemName, 
  type = 'movie', // 'movie' or 'book'
  itemcover, 
  existingReview, 
  onReviewUpdate, 
  trigger 
}) {
  const [open, setOpen] = React.useState(false);
  const [reviewText, setReviewText] = React.useState(existingReview?.content || '');
  const [rating, setRating] = React.useState(existingReview?.rating || 0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setReviewText(existingReview?.content || '');
    setRating(existingReview?.rating || 0);
    setError(null);
  };

  const submitReview = async () => {
    if (!reviewText.trim()) {
      setError('Please write a review before submitting');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      const endpoint = type === 'movie' 
        ? `review_movie/${itemId}/` 
        : `review_book/${itemId}/`;

      const response = await fetch(`http://localhost:8000/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          review: reviewText,
          rating: rating
        }),
      });

  

      const data = await response.json();
     onReviewUpdate({
    content: data.review.content || data.review,
    rating: data.review.rating
  });
      handleClose();
    } catch (error) {
      console.error('Error submitting review:', error);
      setError(error.message || 'An error occurred while submitting the review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {React.cloneElement(trigger, { onClick: handleOpen })}
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="review-modal-title"
        aria-describedby="review-modal-description"
      >
        <Box 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: '80%', md: '600px' },
            bgcolor: 'background.paper',
            borderRadius: '12px',
            boxShadow: 24,
            p: 4,
            outline: 'none'
          }}
        >
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <Typography variant="h5" component="h2" fontWeight="bold">
                  {existingReview ? 'Edit Review' : 'Write a Review'}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {itemName}
                </Typography>
              </div>
              <IconButton onClick={handleClose} size="small">
                <CloseIcon />
              </IconButton>
            </div>

            {/* Content */}
            <div className="flex flex-col sm:flex-row gap-6">
              {itemcover && (
                <div className="flex-shrink-0">
                  <img 
                    src={itemcover} 
                    alt={`Cover for ${itemName}`}
                    className="w-32 h-48 object-cover rounded-lg shadow-md" 
                  />
                </div>
              )}

              <div className="flex-1 flex flex-col gap-4">
                {/* Rating */}
                <div>
                  <Typography component="legend">Your Rating</Typography>
                  <BasicRating
                    name="rating"
                    value={rating}
                    onChange={(event, newValue) => setRating(newValue)}
                    precision={0.5}
                    size="large"
                  />
                </div>

                {/* Review Text */}
                <TextField
                  multiline
                  rows={6}
                  fullWidth
                  variant="outlined"
                  placeholder="Share your thoughts about this..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'divider',
                        borderRadius: '8px'
                      },
                      '&:hover fieldset': {
                        borderColor: 'primary.main'
                      }
                    }
                  }}
                />
              </div>
            </div>

            {/* Error and Actions */}
            {error && (
              <Alert severity="error" sx={{ borderRadius: '8px' }}>
                {error}
              </Alert>
            )}

            <div className="flex justify-end gap-3">
              <Button 
                variant="outlined" 
                onClick={handleClose} 
                disabled={isSubmitting}
                sx={{
                  borderRadius: '8px',
                  px: 3,
                  py: 1
                }}
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={submitReview}
                disabled={isSubmitting}
                sx={{
                  borderRadius: '8px',
                  px: 3,
                  py: 1,
                  fontWeight: 'bold'
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}