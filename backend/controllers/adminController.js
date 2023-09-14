const Admin = require('../models/adminUser');

const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-password'); // Exclude sensitive fields
    res.status(200).json({ success: true, admins });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to fetch admins' });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;

    const deletedAdmin = await Admin.findByIdAndDelete(adminId);

    if (!deletedAdmin) {
      return res.status(404).json({ success: false, error: 'Admin not found' });
    }

    res.status(200).json({ success: true, message: 'Admin deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to delete admin' });
  }
};

module.exports = {
  getAdmins,
  deleteAdmin,
};
