import React, { useEffect } from 'react';

function DeleteDirectoryOnMount() {
  useEffect(() => {
    const deleteDirectory = async () => {
      try {
        const response = await fetch('http://localhost:8000/delete.php', {
          method: 'POST',
          body: JSON.stringify({ directoryPath: 'http://localhost:8000/isolate/Output' }), // Replace with the actual directory path
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to delete directory');
        }
        console.log('Directory deleted successfully');
      } catch (error) {
        console.error('Error deleting directory:', error);
      }
    };

    deleteDirectory(); // Call the function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return null; // Since this component is just for side-effect (deletion), it doesn't render anything
}

export default DeleteDirectoryOnMount;
