interface Vlog {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  date: string;
  category: string;
}

// Simulated data - replace with actual data fetching
export async function getVlogs(): Promise<Vlog[]> {
  return [
    {
      id: 'first-day-of-school',
      title: 'NYP First Day of School 2023 🌸 (My First Vlog)',
      thumbnail: 'thumbnail/thumbnail1.jpg',
      duration: '12:34',
      views: 1542,
      date: '2024-03-15',
      category: 'Daily Life'
    },
    {
      id: 'three-day-run',
      title: 'A Three Day Run Vlog | Finals, ✈️',
      thumbnail: 'thumbnail/thumbnail2.jpg',
      duration: '18:22',
      views: 2103,
      date: '2024-03-12',
      category: 'Tutorials'
    },
    {
      id: 'hajilane',
      title: 'A day in my life 📍 Singapore | Holiday | Hangout | Thrifting | Bugis | Haji Lane',
      thumbnail: 'thumbnail/thumbnail3.jpg',
      duration: '07:00',
      views: 1876,
      date: '2024-03-08',
      category: 'Book Reviews'
    },
    // Add more vlogs as needed
  ];
}