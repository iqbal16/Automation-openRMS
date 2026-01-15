module.exports = {
  validUser: {
    username: process.env.OPENMRS_USER || 'admin',
    password: process.env.OPENMRS_PASS || 'Admin123'
  }
};
