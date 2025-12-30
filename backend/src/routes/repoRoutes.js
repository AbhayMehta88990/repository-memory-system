const express = require('express');
const router = express.Router();
const { mockAnalysisData } = require('../services/mockData');

router.get('/analyze', async (req, res) => {
  try {
    console.log('📊 Using mock analysis data for demo...');
    
    setTimeout(() => {
      res.status(200).json({
        success: true,
        message: 'Repository analyzed successfully',
        data: mockAnalysisData
      });
    }, 800);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to analyze repository',
      error: error.message
    });
  }
});

router.get('/file/*', async (req, res) => {
  try {
    const filePath = req.params[0];

    res.status(200).json({
      success: true,
      data: {
        path: filePath,
        content: "// Mock file content for demo\n// This would contain the actual file code",
        language: "javascript",
        parsed: { functions: [], classes: [], imports: [] },
        lines: { total: 50, code: 42, comments: 8 }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get file details',
      error: error.message
    });
  }
});

module.exports = router;
