export const tickets = [
    {
      id: "#2451",
      date: "12/15/2024, 09:30 AM",
      status: "Open",
      title: "Order delay",
      description: "I hope this message finds you well. I am writing to inquire about the delay in my recent order...",
      user: "Alice Johnson",
      categories: ["Order Delay", "Delivery"],
      comments: 4,
      views: 10,
      chatId: "chat1"
    },
    {
      id: "#2235",
      date: "12/15/2024, 09:30 AM",
      status: "Pending",
      title: "Payment Issue",
      description: "I'm having trouble with my payment method...",
      user: "John Amos",
      categories: ["Order", "Payment Delay"],
      comments: 6,
      views: 12,
      chatId: "chat2"
    },
    {
      id: "#2236",
      date: "12/15/2024, 09:30 AM",
      status: "Resolved",
      title: "Missing Item",
      description: "My order arrived but was missing one item...",
      user: "Sarah Miller",
      categories: ["Order", "Missing Item"],
      comments: 3,
      views: 8,
      chatId: "chat3"
    }
  ];
  
  export const chatData = {
    "chat1": {
      id: "chat1",
      name: "Alice Johnson",
      status: "online",
      messages: [
        { sender: "Alice Johnson", text: "Hello", time: "4:30 PM" },
        { sender: "Alice Johnson", text: "It's easy for the delay. I ordered some dates for the past two weeks now and I moved up of a confirmation", time: "8:00 PM" },
        { sender: "Support", text: "Hello! How can we assist you today?", time: "9:22 PM" }
      ]
    },
    "chat2": {
      id: "chat2",
      name: "John Amos",
      status: "offline",
      messages: [
        { sender: "John Amos", text: "Having trouble with payment", time: "3:15 PM" },
        { sender: "Support", text: "We're looking into your payment issue", time: "3:30 PM" }
      ]
    },
    "chat3": {
      id: "chat3",
      name: "Sarah Miller",
      status: "online",
      messages: [
        { sender: "Sarah Miller", text: "My order hasn't arrived", time: "10:00 AM" },
        { sender: "Support", text: "We'll track your package", time: "10:15 AM" }
      ]
    }
  };