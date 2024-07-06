const db = require('../models');
// Seed data
const users = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'password1',
    role: 'user',
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    password: 'password2',
    role: 'user',
  },
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    password: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
    role: 'admin',
  },
  {
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob@example.com',
    password: 'securepass123',
    role: 'user',
  },
  {
    firstName: 'Emma',
    lastName: 'Brown',
    email: 'emma@example.com',
    password: 'pass123',
    role: 'user',
  },
  {
    firstName: 'Michael',
    lastName: 'Wilson',
    email: 'michael@example.com',
    password: 'mypass456',
    role: 'user',
  },
  {
    firstName: 'Sophia',
    lastName: 'Taylor',
    email: 'sophia@example.com',
    password: '12345',
    role: 'user',
  },
  {
    firstName: 'James',
    lastName: 'Lee',
    email: 'james@example.com',
    password: 'pass321',
    role: 'user',
  },
  {
    firstName: 'Olivia',
    lastName: 'Wang',
    email: 'olivia@example.com',
    password: 'mypassword7',
    role: 'user',
  },
  {
    firstName: 'William',
    lastName: 'Garcia',
    email: 'william@example.com',
    password: 'pass789',
    role: 'user',
  },
  {
    firstName: 'Ava',
    lastName: 'Martinez',
    email: 'ava@example.com',
    password: 'secure1234',
    role: 'user',
  },
  {
    firstName: 'Liam',
    lastName: 'Lopez',
    email: 'liam@example.com',
    password: 'mypassword10',
    role: 'user',
  },
  {
    firstName: 'Charlotte',
    lastName: 'Adams',
    email: 'charlotte@example.com',
    password: '12345678',
    role: 'user',
  },
];

const photos = [
  {
    title: 'Nature',
    description: 'Beautiful nature scene',
    userId: 1,
    photoData: Buffer.from('Binary data for the Nature photo'),
  },
  {
    title: 'Cityscape',
    description: 'City skyline at night',
    userId: 2,
    photoData: Buffer.from('Binary data for the Cityscape photo'),
  },
];

const comments = [
  {
    text: 'Amazing photo!',
    userId: 1,
    photoId: 1,
  },
  {
    text: 'I love this city!',
    userId: 2,
    photoId: 2,
  },
  {
    text: 'Great job!',
    userId: 1,
    photoId: 2,
  },
];

const contacts = [
  {
    name: 'John Contact',
    email: 'contact1@example.com',
    message: 'Hello, I have a question.',
  },
  {
    name: 'Jane Contact',
    email: 'contact2@example.com',
    message: 'Please get back to me as soon as possible.',
  },
];

// Seed function
const seed = async () => {
  try {
    await db.User.bulkCreate(users);
    await db.Photo.bulkCreate(photos);
    await db.Comment.bulkCreate(comments);
    await db.Contact.bulkCreate(contacts);

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit();
  }
};

seed();