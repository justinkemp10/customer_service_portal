const newFormHandler = async (event) => {
    event.preventDefault();
//   this will need to be changed once make ticket model
    const name = document.querySelector('#project-name').value.trim();
    // const needed_funding = document.querySelector('#project-funding').value.trim();
    const description = document.querySelector('#project-desc').value.trim();
    // const customer = document.querySelector('#customer-name').value.trim();
    const phone = document.querySelector('#phone').value.trim();
    // const email = document.querySelector('#email').value.trim();
    const priority = document.querySelector('#priority').value.trim();
  // same as above will be needed
    if (name && description && phone && priority) {
      const response = await fetch(`/api/ticket`, {
        method: 'POST',
        body: JSON.stringify({ name: name, description: description, priority: priority, phone: phone}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create project!');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/ticket/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete ticket');
      }
    }
  };
  //these will be needed to update as well
  document
    .querySelector('.new-project-form')
    .addEventListener('submit', newFormHandler);
  
  // document
  //   .querySelector('.project-list')
  //   .addEventListener('click', delButtonHandler);
  