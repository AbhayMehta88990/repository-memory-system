const express = require('express');
const router = express.Router();
const { mockOnboardingTour, mockStarterTasks, getRandomResponse } = require('../services/mockData');

router.post('/generate-tour', async (req, res) => {
  try {
    console.log('🎯 Generating mock onboarding tour...');
    
    setTimeout(() => {
      res.status(200).json({
        success: true,
        data: mockOnboardingTour
      });
    }, 1200);
  } catch (error) {
    console.error('Error generating tour:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate onboarding tour',
      error: error.message
    });
  }
});

router.post('/ask', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: 'Question is required'
      });
    }

    console.log('💬 Answering question:', question);
    
    setTimeout(() => {
      const answer = getRandomResponse(question);
      
      res.status(200).json({
        success: true,
        data: { question, answer }
      });
    }, 600);
  } catch (error) {
    console.error('Error answering question:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to answer question',
      error: error.message
    });
  }
});

router.get('/starter-tasks', async (req, res) => {
  try {
    console.log('✨ Loading mock starter tasks...');
    
    setTimeout(() => {
      res.status(200).json({
        success: true,
        data: mockStarterTasks
      });
    }, 700);
  } catch (error) {
    console.error('Error suggesting tasks:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to suggest starter tasks',
      error: error.message
    });
  }
});

module.exports = router;
