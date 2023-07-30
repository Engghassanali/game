import React, { useState, useEffect } from 'react';
import styles from '@/styles/BeginnerLevelPage.module.css';
import Tick from './tick';
import Cross from './cross';

const GamePage = () => {
  const firstImages = [
    'Sea.png',
    'D.png',
    'Sew.png',
    'Dough.png',
    'Sore.png',
    'Door.png',
    'Suck.png',
    'Duck.png',
    'Sock.png',
    'Dock.png',
    // Add more image URLs here
  ];

  const otherImages = [
    'Sea.png',
    'Tea.png',
    'Sew.png',
    'Toe.png',
    'Sore.png',
    'Tore.png',
    'Sail.png',
    'Tail.png',
    // Add more other image URLs here
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [showLine, setShowLine] = useState(true);
  const [showGuessButton, setShowGuessButton] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);
  const [showOtherImages, setShowOtherImages] = useState(false);
  const [clickedImageScores, setClickedImageScores] = useState([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState(''); // 'tick' or 'cross'

  useEffect(() => {
    let timer;

    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [countdown]);

  useEffect(() => {
    let interval;

    if (!showOtherImages) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => prevIndex + 2);
      }, 10000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [showOtherImages]);

  useEffect(() => {
    if (currentImageIndex >= firstImages.length) {
      setShowGuessButton(true);
    }
  }, [currentImageIndex, firstImages.length]);

  useEffect(() => {
    if (gameComplete) {
      // Calculate the score based on the clickedImageScores
      setScore(clickedImageScores.length * 10);
    }
  }, [gameComplete, clickedImageScores]);

  const getImageName = (imageUrl) => {
    // Extract the name from the image URL
    const imageName = imageUrl.split('/').pop().split('.')[0];
    return imageName;
  };

  const handleStartGuessing = () => {
    setScore(0);
    setShowLine(false);
    setShowGuessButton(false);
    if (otherImages.length > 0) {
      setCurrentImages(otherImages.slice(0, 2)); // Show the first two images from the otherImages array
      setSelectedImageIndex(-1); // Reset the selected image index
      setShowOtherImages(true); // Show the otherImages array images
      setCurrentImageIndex(0);
    }
  };

  const handleImageClick = (imageName) => {
    // Only allow image selection if no feedback is being shown and game is not complete
    if (!showFeedback && !gameComplete) {
      setSelectedImageIndex(imageName);
  
      // Check if the selected image's name is present in the firstImages array
      const isGuessCorrect = firstImages.includes(imageName + '.png');
  
      if (isGuessCorrect && !clickedImageScores.includes(imageName)) {
        setScore((prevScore) => prevScore + 10); // Increase the score by 10 if the guess is correct and image has not been clicked before
        setClickedImageScores((prevClickedImageScores) => [...prevClickedImageScores, imageName]);
        setShowFeedback(true);
        setFeedbackType('tick');
      } else if (!isGuessCorrect) {
        setShowFeedback(true);
        setFeedbackType('cross');
      }
  
      setTimeout(() => {
        // Check if all images from the otherImages array have been shown
        if (currentImageIndex + 2 >= otherImages.length) {
          setGameComplete(true); // Set gameComplete to true when all images have been shown
          const timeout = setTimeout(() => {
            window.location.href = 'http://localhost:3000'; // Replace 'http://localhost:3000' with the desired URL of your home page
          }, 10000);
          return () => {
            clearTimeout(timeout);
          };
        } else {
          const nextImages = otherImages.slice(currentImageIndex + 2, currentImageIndex + 4); // Get the next two images from the otherImages array
          setCurrentImages(nextImages); // Show the next two images
          setCurrentImageIndex(currentImageIndex + 2); // Update the currentImageIndex for the next set of images
          setSelectedImageIndex(-1); // Reset the selected image index
        }
      }, 2000); // Delay the image change by 2000 milliseconds (2 seconds)
  
      setTimeout(() => {
        setShowFeedback(false); // Reset the showFeedback state after 2 seconds
      }, 2000);
    }
  };
  
  
  
  return (
    <div className={styles.pageContainer}>
      {/* <h1 className={styles.title}>Game Page</h1> */}
      <img src="title.png" alt="Title" className={styles.title} />
      <div className={styles.scoreContainer}>
        <img src="coin.jpg" alt="Coin" className={styles.coinImage} />
        <p className={styles.scoreText}>{score}</p>
      </div>
      <div className={styles.lineContainer}>
        {showLine && (
          <div className={styles.line}>
            <p className={styles.lineText}>Remember the Name of the Card</p>
          </div>
        )}
      </div>
      {countdown > 0 ? (
        <div className={styles.countdownContainer}>
          <h2 className={styles.countdown}>{countdown}</h2>
        </div>
      ) : (
        <div className={styles.cardContainer}>
          {showOtherImages && currentImages.length > 0 ? (
            currentImages.map((image, index) => {
              const imageName = getImageName(image);
              const isGuessCorrect = firstImages.includes(imageName + '.png');
              const isSelected = selectedImageIndex === imageName;
              const cardClass = `${styles.otherCard} ${isSelected ? styles.selectedOtherCard : ''} ${
                isGuessCorrect ? styles.correctGuess : styles.wrongGuess
              }`;

              return (
                <div key={index} className={cardClass} onClick={() => handleImageClick(imageName)}>
                  <img src={image} alt="Game Image" className={styles.cardImage} />
                  <p className={styles.cardName}>{imageName}</p>
                </div>
              );
            })
          ) : (
            firstImages.slice(currentImageIndex, currentImageIndex + 2).map((image, index) => (
              <div key={index} className={styles.cardImg}>
                <img src={image} alt="Game Image" className={styles.cardImage} />
                <div className='imgName'>
                <p className={styles.cardName}>{getImageName(image)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
      {showGuessButton ? (
        <div className={styles.buttonContainer}>
          <button className={styles.startButton} onClick={handleStartGuessing}>
            Start Guessing
          </button>
        </div>
      ) : null}
      {gameComplete && (
        <div className={styles.scoreWindow}>
          <img
              className={styles.logo}
              src="gamecomp.png"
              alt="Hard Logo"
              width={265}
              height={92}
            />
          <p className={styles.scoreTextBox}>Your Score: {score}</p>
          <p>Thanks for Playing Game</p>
        </div>
      )}
      {showFeedback && feedbackType === 'tick' && <Tick />}
      {showFeedback && feedbackType === 'cross' && <Cross />}
    </div>
  );
};

export default GamePage;
