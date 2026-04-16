// External dependencies
const express = require('express')

const router = express.Router()

// Add your routes here - above the module.exports line

//delete provisional product
router.post('/v5/dhsc/provisional/delete', function (req, res) {
  const answer = req.body.cdrAdded;

  if (answer === 'yes') {
    res.redirect('/v5/dhsc/provisional/delete-confirm?status=deleted');
  } else {
    res.redirect('/v5/dhsc/provisional/delete-confirm?status=blocked');
  }
});

router.get('/v5/dhsc/provisional/delete-confirm', function (req, res) {
  res.render('v5/dhsc/provisional/delete-confirm', {
    status: req.query.status,
    productName: 'Medication q 200mg tablets (2 x 24 tablets)'
  });
});
module.exports = router
