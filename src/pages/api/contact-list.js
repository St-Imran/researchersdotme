// API endpoint to fetch all contact submissions
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contactus`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Backend returns data in 'value' array, not 'data'
        const contacts = data.value || data.data || data || [];
        res.status(200).json({
          success: true,
          data: contacts,
        });
      } else {
        throw new Error('Failed to fetch contacts');
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch contact submissions',
      });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.body;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Contact ID is required',
        });
      }

      const response = await fetch(`${API_BASE_URL}/api/contactus/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        res.status(200).json({
          success: true,
          message: 'Contact deleted successfully',
        });
      } else {
        throw new Error(data.message || 'Failed to delete contact');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to delete contact',
      });
    }
  } else {
    res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }
}
