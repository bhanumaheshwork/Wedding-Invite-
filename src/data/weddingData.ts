export interface CelebrationEvent {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  dressCode: string;
  description: string;
  image: string;
  color: string;
}

export interface StoryMilestone {
  year: string;
  title: string;
  description: string;
  image: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  category: 'All' | 'Pre-Wedding' | 'Engagement' | 'Candid' | 'Traditions';
}

export const weddingConfig = {
  couple: {
    groom: {
      name: "Vaibhav",
      parents: "With love & blessings from his family",
      bio: "An architect with a passion for classical heritage and serene landscapes.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80"
    },
    bride: {
      name: "Trisha",
      parents: "With love & blessings from her family",
      bio: "A classical Bharatanatyam dancer and curator of fine arts.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
    },
    hashtag: "#VaibhavWedsTrisha2026",
    weddingDate: "2026-12-15T10:00:00",
    dateDisplay: "December 15, 2026",
    venueName: "The Leela Palace & Royal Gardens",
    venueCity: "Udaipur, Rajasthan, India"
  },

  story: [
    {
      year: "Autumn 2022",
      title: "The Fateful Encounter",
      description: "Our eyes met at an art gallery opening in Delhi amidst classical Tanjore paintings. A conversation about ancient temple architecture sparked a lifelong connection.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
    },
    {
      year: "Winter 2023",
      title: "Chai & Conversations",
      description: "Countless evenings spent discussing books, shared dreams of restoring heritage homes, and exploring old Delhi street food lanes under winter fairy lights.",
      image: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=800&q=80"
    },
    {
      year: "Spring 2025",
      title: "The Royal Proposal",
      description: "Under the starlit sky at a palace overlooking Lake Pichola in Udaipur, Vaibhav went down on one knee with a vintage heirloom ring.",
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80"
    },
    {
      year: "Winter 2026",
      title: "Uniting Our Forevers",
      description: "Surrounded by our dearest family and friends, we take our sacred vows in the timeless city of lakes.",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80"
    }
  ] as StoryMilestone[],

  celebrations: [
    {
      id: "haldi",
      title: "The Haldi Ceremony",
      subtitle: "Gleaming in Gold & Sunshine",
      date: "December 13, 2026",
      time: "10:00 AM Onwards",
      venue: "Poolside Lawn, The Leela Palace",
      address: "Lake Pichola, Udaipur, Rajasthan",
      dressCode: "Shades of Yellow & Ivory",
      description: "An auspicious morning ritual filled with turmeric paste, vibrant marigold flowers, folk songs, and joyful laughter as loved ones bless the couple.",
      image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
      color: "from-amber-500/20 to-yellow-600/20"
    },
    {
      id: "mehendi",
      title: "Mehendi Ki Raat",
      subtitle: "Intricate Henna & Melodies",
      date: "December 13, 2026",
      time: "4:00 PM Onwards",
      venue: "Zenith Courtyard",
      address: "The Leela Palace, Udaipur",
      dressCode: "Vibrant Bohemian / Pastel Ethnic",
      description: "An evening of intricate henna designs applied to the bride's hands, accompanied by lively folk dances (Garba/Bhangra), music, and artisanal cocktails.",
      image: "https://images.unsplash.com/photo-1584278860037-77b3b05f2441?auto=format&fit=crop&w=800&q=80",
      color: "from-emerald-600/20 to-teal-800/20"
    },
    {
      id: "sangeet",
      title: "The Grand Sangeet",
      subtitle: "A Night of Stars & Dance",
      date: "December 14, 2026",
      time: "7:00 PM Onwards",
      venue: "Maharaja Ballroom",
      address: "The Leela Palace, Udaipur",
      dressCode: "Indo-Western Glamour / Regal Velvet",
      description: "A glamorous celebration with choreographed family dance performances, live ghazal and Sufi fusion singers, and a royal feast under the chandeliers.",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      color: "from-rose-900/20 to-purple-900/20"
    },
    {
      id: "wedding",
      title: "The Royal Wedding",
      subtitle: "Sacred Vows & Seven Pheras",
      date: "December 15, 2026",
      time: "9:00 AM (Baraat Arrival at 8:00 AM)",
      venue: "Lotus Pavilion & Mandap Lawn",
      address: "The Leela Palace, Udaipur",
      dressCode: "Traditional Indian Traditional / Silk Sarees & Sherwanis",
      description: "The traditional Hindu wedding ceremony uniting Vaibhav and Trisha in holy matrimony with Vedic mantras, sacred fire rituals, and timeless blessings.",
      image: "https://images.unsplash.com/photo-1545232979-fbf6e0c7a40f?auto=format&fit=crop&w=800&q=80",
      color: "from-red-900/20 to-amber-900/20"
    },
    {
      id: "reception",
      title: "The Grand Reception",
      subtitle: "Toasts, Dining & Dancing",
      date: "December 15, 2026",
      time: "8:00 PM Onwards",
      venue: "Zenith Lakeside Terrace",
      address: "The Leela Palace, Udaipur",
      dressCode: "Black Tie / Formal Evening Wear",
      description: "An enchanting evening celebrating the newlyweds with champagne toasts, live jazz band, gourmet global cuisines, and stargazing by the lake.",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
      color: "from-blue-950/20 to-indigo-950/20"
    }
  ] as CelebrationEvent[],

  gallery: [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80",
      caption: "Golden hour portraits in Udaipur",
      category: "Pre-Wedding"
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
      caption: "The Ring Exchange Ceremony",
      category: "Engagement"
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80",
      caption: "Candid moments during mehendi laughter",
      category: "Candid"
    },
    {
      id: "4",
      url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1000&q=80",
      caption: "Traditional turmeric blessings",
      category: "Traditions"
    },
    {
      id: "5",
      url: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1000&q=80",
      caption: "Starlit palace walkways",
      category: "Pre-Wedding"
    },
    {
      id: "6",
      url: "https://images.unsplash.com/photo-1545232979-fbf6e0c7a40f?auto=format&fit=crop&w=1000&q=80",
      caption: "Sacred rituals and floral décor",
      category: "Traditions"
    }
  ] as GalleryPhoto[]
};
