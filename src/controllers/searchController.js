const { decrypt } = require('../../src/utils/encryption');
const Applicant = require('../models/applicant');

exports.searchByName = async (req, res) => {
  try {
    const { name } = req.body;
    
    // Get all applicants
    const applicants = await Applicant.find({});
    
    // Decrypt names and filter matches
    const matches = applicants.filter(applicant => {
      const decryptedName = decrypt(applicant.name).toLowerCase();
      return decryptedName.includes(name.toLowerCase());
    });

    if (matches.length === 0) {
      return res.status(404).json({ error: 'No matching records found' });
    }

    // Decrypt sensitive data in matches
    const decryptedMatches = matches.map(match => ({
      ...match.toObject(),
      name: decrypt(match.name),
      email: decrypt(match.email)
    }));

    return res.status(200).json(decryptedMatches);

  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({ error: 'Error searching records' });
  }
}; 