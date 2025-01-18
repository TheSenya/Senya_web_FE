export const quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline'],        // Formatting options
      [{ header: [1, 2, 3, false] }],         // Header levels
      [{ list: 'ordered' }, { list: 'bullet' }], // Lists
      ['link', 'image'],                     // Links and images
    ],
  };
  
  export const quillFormats = [
    'bold', 'italic', 'underline',
    'header', 'list', 'bullet',
    'link', 'image',
  ];