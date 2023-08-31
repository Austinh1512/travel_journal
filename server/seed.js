const mongoose = require("mongoose");
const JournalEntry = require("./models/journalEntry");
const User = require("./models/User");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected!");
});
mongoose.set("strictQuery", false);

const seeds = [
  {
    place: "Mount Fuji",
    country: "Japan",
    startDate: "2021-01-12",
    endDate: "2021-01-24",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    images: {
      url: "https://res.cloudinary.com/dabtufkqn/image/upload/v1678164013/TravelJournal/mt-fuji_petgyx.jpg",
      filename: "TravelJournal/mt-fuji_h9psvi",
    },
  },

  {
    place: "Sydney Opera House",
    country: "Australia",
    startDate: "2021-01-12",
    endDate: "2021-01-24",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    images: {
      url: "https://res.cloudinary.com/dabtufkqn/image/upload/v1678164013/TravelJournal/OperaHouse_jau2na",
      filename: "TravelJournal/OperaHouse_c7jb69",
    },
  },

  {
    place: "Geirangerfjord",
    country: "Norway",
    startDate: "2021-01-12",
    endDate: "2021-01-24",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    images: {
      url: "https://res.cloudinary.com/dabtufkqn/image/upload/v1678164092/TravelJournal/geirangerfjord_fe83il.jpg",
      filename: "TravelJournal/geirangerfjord_gq2hnk",
    },
  },

  // {
  //     place: "Taj Mahal",
  //     country: "India",
  //     startDate: "2021-01-12",
  //     endDate: "2021-01-24",
  //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //     images: {
  //         url: "https://res.cloudinary.com/dabtufkqn/image/upload/v1678164183/TravelJournal/Taj_Mahal_byssqi.jpg",
  //         filename: "TravelJournal/Taj_Mahal_dmeuj8"
  //     }
  // },

  {
    place: "Geirangerfjord",
    country: "Norway",
    startDate: "2021-01-12",
    endDate: "2021-01-24",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    images: {
      url: "https://res.cloudinary.com/dabtufkqn/image/upload/v1678164092/TravelJournal/geirangerfjord_fe83il.jpg",
      filename: "TravelJournal/geirangerfjord_gq2hnk",
    },
  },

  {
    place: "Geirangerfjord",
    country: "Norway",
    startDate: "2021-01-12",
    endDate: "2021-01-24",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    images: {
      url: "https://res.cloudinary.com/dabtufkqn/image/upload/v1678164092/TravelJournal/geirangerfjord_fe83il.jpg",
      filename: "TravelJournal/geirangerfjord_gq2hnk",
    },
  },

  {
    place: "Geirangerfjord",
    country: "Norway",
    startDate: "2021-01-12",
    endDate: "2021-01-24",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    images: {
      url: "https://res.cloudinary.com/dabtufkqn/image/upload/v1678164092/TravelJournal/geirangerfjord_fe83il.jpg",
      filename: "TravelJournal/geirangerfjord_gq2hnk",
    },
  },

  {
    place: "Geirangerfjord",
    country: "Norway",
    startDate: "2021-01-12",
    endDate: "2021-01-24",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    images: {
      url: "https://res.cloudinary.com/dabtufkqn/image/upload/v1678164092/TravelJournal/geirangerfjord_fe83il.jpg",
      filename: "TravelJournal/geirangerfjord_gq2hnk",
    },
  },

  {
    place: "Geirangerfjord",
    country: "Norway",
    startDate: "2021-01-12",
    endDate: "2021-01-24",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    images: {
      url: "https://res.cloudinary.com/dabtufkqn/image/upload/v1678164092/TravelJournal/geirangerfjord_fe83il.jpg",
      filename: "TravelJournal/geirangerfjord_gq2hnk",
    },
  },

  {
    place: "Geirangerfjord",
    country: "Norway",
    startDate: "2021-01-12",
    endDate: "2021-01-24",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    images: {
      url: "https://res.cloudinary.com/dabtufkqn/image/upload/v1678164092/TravelJournal/geirangerfjord_fe83il.jpg",
      filename: "TravelJournal/geirangerfjord_gq2hnk",
    },
  },

  {
    place: "Geirangerfjord",
    country: "Norway",
    startDate: "2021-01-12",
    endDate: "2021-01-24",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    images: {
      url: "https://res.cloudinary.com/dabtufkqn/image/upload/v1678164092/TravelJournal/geirangerfjord_fe83il.jpg",
      filename: "TravelJournal/geirangerfjord_gq2hnk",
    },
  },

  {
    place: "Geirangerfjord",
    country: "Norway",
    startDate: "2021-01-12",
    endDate: "2021-01-24",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    images: {
      url: "https://res.cloudinary.com/dabtufkqn/image/upload/v1678164092/TravelJournal/geirangerfjord_fe83il.jpg",
      filename: "TravelJournal/geirangerfjord_gq2hnk",
    },
  },

  {
    place: "Geirangerfjord",
    country: "Norway",
    startDate: "2021-01-12",
    endDate: "2021-01-24",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    images: {
      url: "https://res.cloudinary.com/dabtufkqn/image/upload/v1678164092/TravelJournal/geirangerfjord_fe83il.jpg",
      filename: "TravelJournal/geirangerfjord_gq2hnk",
    },
  },

  {
    place: "Geirangerfjord",
    country: "Norway",
    startDate: "2021-01-12",
    endDate: "2021-01-24",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    images: {
      url: "https://res.cloudinary.com/dabtufkqn/image/upload/v1678164092/TravelJournal/geirangerfjord_fe83il.jpg",
      filename: "TravelJournal/geirangerfjord_gq2hnk",
    },
  },
];

const seedDB = async () => {
  await JournalEntry.deleteMany({});
  await User.deleteMany({});

  const user1 = await new User({ username: "username1", password: "password" });
  const user2 = await new User({ username: "username2", password: "password" });

  seeds.forEach(async (seed, i) => {
    const entry = await new JournalEntry(seed);
    if (i % 2) {
      user1.journal_entries.push(entry);
      entry.user = user1._id;
    } else {
      user2.journal_entries.push(entry);
      entry.user = user2._id;
    }
    entry.save();
  });

  await user1.save();
  await user2.save();
};

seedDB();
