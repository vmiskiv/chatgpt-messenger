interface Message {
  text: string;
  createdAt: isAdmin.firestore.Timestamp;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
}
