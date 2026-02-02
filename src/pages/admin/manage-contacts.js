import { useState, useEffect } from 'react';
import styles from './ManageContacts.module.css';

export default function ManageContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const [readFilter, setReadFilter] = useState('all');
  const [expandedMessages, setExpandedMessages] = useState({});
  const [readContacts, setReadContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
    // Load read contacts from localStorage
    const stored = localStorage.getItem('readContacts');
    if (stored) {
      try {
        setReadContacts(JSON.parse(stored));
      } catch (e) {
        console.error('Error loading read contacts:', e);
      }
    }
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/contact-list');
      const data = await response.json();
      
      if (response.ok) {
        setContacts(data.data || []);
      } else {
        setError(data.message || 'Failed to fetch contacts');
      }
    } catch (err) {
      setError('Failed to load contacts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredContacts = contacts; // No status filtering since backend doesn't track status

  // Get unique countries for filter
  const countries = [...new Set(contacts.map(c => c.country).filter(Boolean))];
  
  // Apply country filter
  let displayContacts = countryFilter === 'all' 
    ? filteredContacts 
    : filteredContacts.filter(c => c.country === countryFilter);

  // Apply read/unread filter
  if (readFilter === 'read') {
    displayContacts = displayContacts.filter(c => readContacts.includes(c._id));
  } else if (readFilter === 'unread') {
    displayContacts = displayContacts.filter(c => !readContacts.includes(c._id));
  }

  // Sort: unread first, then by date (latest first)
  displayContacts = [...displayContacts].sort((a, b) => {
    const aIsRead = readContacts.includes(a._id);
    const bIsRead = readContacts.includes(b._id);
    
    // Unread contacts come first
    if (aIsRead !== bIsRead) {
      return aIsRead ? 1 : -1;
    }
    
    // Within same read/unread status, sort by date (latest first)
    // MongoDB ObjectId contains timestamp in first 8 characters
    return b._id.localeCompare(a._id);
  });

  const isContactRead = (contactId) => readContacts.includes(contactId);

  const unreadCount = contacts.filter(c => !readContacts.includes(c._id)).length;

  const getCountryName = (code) => {
    const countryMap = {
      '+971': 'UAE',
      '+91': 'India',
      '+1': 'USA',
      '+44': 'UK',
      '+966': 'Saudi Arabia',
      '+974': 'Qatar',
      '+965': 'Kuwait',
      '+973': 'Bahrain',
      '+968': 'Oman',
      '+20': 'Egypt',
      '+962': 'Jordan',
      '+961': 'Lebanon',
    };
    return countryMap[code] || code;
  };

  const formatDate = (id) => {
    if (!id) return 'N/A';
    // Extract timestamp from MongoDB ObjectId (first 8 characters are hex timestamp)
    try {
      const timestamp = parseInt(id.substring(0, 8), 16) * 1000;
      return new Date(timestamp).toLocaleString();
    } catch (e) {
      return 'N/A';
    }
  };

  const toggleMessage = (contactId) => {
    setExpandedMessages(prev => ({
      ...prev,
      [contactId]: !prev[contactId]
    }));

    // Mark as read when expanded
    if (!expandedMessages[contactId] && !readContacts.includes(contactId)) {
      const newReadContacts = [...readContacts, contactId];
      setReadContacts(newReadContacts);
      localStorage.setItem('readContacts', JSON.stringify(newReadContacts));
    }
  };

  const markAsRead = (contactId) => {
    if (!readContacts.includes(contactId)) {
      const newReadContacts = [...readContacts, contactId];
      setReadContacts(newReadContacts);
      localStorage.setItem('readContacts', JSON.stringify(newReadContacts));
    }
  };

  const deleteContact = async (contactId) => {
    if (!confirm('Are you sure you want to delete this contact submission?')) {
      return;
    }

    try {
      const response = await fetch('/api/contact-list', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: contactId }),
      });

      const data = await response.json();

      if (response.ok) {
        // Remove from local state
        setContacts(contacts.filter(c => c._id !== contactId));
        // Clear expanded state for this contact
        setExpandedMessages(prev => {
          const newState = { ...prev };
          delete newState[contactId];
          return newState;
        });
      } else {
        alert(data.message || 'Failed to delete contact');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete contact');
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading contacts...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Contact Submissions</h1>
        <button onClick={fetchContacts} className={styles.refreshBtn}>
          Refresh
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.filters}>
        <div className={styles.totalCount}>
          Total: {contacts.length} | Unread: <span className={styles.unreadBadge}>{unreadCount}</span>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Status:</label>
          <select 
            value={readFilter} 
            onChange={(e) => setReadFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All ({contacts.length})</option>
            <option value="unread">Unread ({unreadCount})</option>
            <option value="read">Read ({contacts.length - unreadCount})</option>
          </select>
        </div>
        
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Country:</label>
          <select 
            value={countryFilter} 
            onChange={(e) => setCountryFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Countries ({contacts.length})</option>
            {countries.map(country => (
              <option key={country} value={country}>
                {getCountryName(country)} ({contacts.filter(c => c.country === country).length})
              </option>
            ))}
          </select>
        </div>
      </div>

      {displayContacts.length === 0 ? (
        <div className={styles.noData}>No contact submissions found</div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayContacts.map((contact, index) => (
                <tr 
                  key={contact._id || index} 
                  className={`${styles.newRow} ${!isContactRead(contact._id) ? styles.unreadRow : ''}`}
                >
                  <td className={styles.dateCell}>
                    {formatDate(contact._id)}
                  </td>
                  <td className={styles.nameCell}>{contact.displayName || contact.name || 'N/A'}</td>
                  <td className={styles.emailCell}>
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </td>
                  <td className={styles.countryCell}>
                    {contact.country ? getCountryName(contact.country) : 'N/A'}
                  </td>
                  <td className={styles.phoneCell}>
                    {contact.phoneNo || contact.phone ? (
                      <a href={`tel:${contact.country || ''}${contact.phoneNo || contact.phone || ''}`}>
                        {contact.country && `${contact.country} `}{contact.phoneNo || contact.phone || 'N/A'}
                      </a>
                    ) : 'N/A'}
                  </td>
                  <td className={styles.messageCell}>
                    <div className={expandedMessages[contact._id] ? styles.messageExpanded : styles.messageTruncate}>
                      {contact.message}
                    </div>
                    {contact.message && contact.message.length > 100 && (
                      <button 
                        onClick={() => toggleMessage(contact._id)}
                        className={styles.toggleBtn}
                      >
                        {expandedMessages[contact._id] ? 'Show less' : 'Show more'}
                      </button>
                    )}
                  </td>
                  <td className={styles.actionsCell}>
                    {!isContactRead(contact._id) && (
                      <button 
                        onClick={() => markAsRead(contact._id)}
                        className={styles.readBtn}
                        title="Mark as read"
                      >
                        Mark Read
                      </button>
                    )}
                    <button 
                      onClick={() => deleteContact(contact._id)}
                      className={styles.deleteBtn}
                      title="Delete contact"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
