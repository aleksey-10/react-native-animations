import type { Item } from './types';

export default [
  {
    title: 'Morning\nMeditations',
    id: 1,
    gradient: {
      colors: ['#b27fcd', '#d2a4df', '#b27fcd'],
    },
  },
  {
    title: 'Evening\nMeditations',
    id: 2,
    gradient: {
      colors: ['#2dfd79', '#22c1c3', '#2dfd79'],
    },
  },
  {
    title: 'Journeys',
    id: 3,
    gradient: {
      colors: ['black', 'black'],
    },
    titleStyle: {
      color: 'white', // text color
    },
  },
].map(item => ({
  ...item,
  articles: [
    {
      id: 1,
      title: 'Inner Peace',
      description:
        'Meditations to clear your mind and start new positive habits',
      img: 'https://i.picsum.photos/id/272/500/600.jpg?hmac=m06evzQQycRPDtR4E7Y-oH-DfUBNw42MuDOIK54Rh00',
    },
    {
      id: 2,
      title: 'Inner Peace',
      description:
        'Meditations to clear your mind and start new positive habits',
      img: 'https://i.picsum.photos/id/547/500/600.jpg?hmac=uVnpv_grsFnlnJJE0y1OPjxVpl-IpemfPpaa46VTJwg',
    },
  ].map(article => ({
    ...article,
    list: [
      {
        id: 1,
        title: 'Details',
        gradient: {
          colors: ['#f0a3e5', '#8b89ba'],
        },
      },
      {
        id: 2,
        title: 'Days',
        gradient: {
          colors: ['#ded2b8', '#e7d190'],
        },
      },
      {
        id: 3,
        title: 'More Classes',
        gradient: {
          colors: ['#000', '#000'],
        },
        titleStyle: {
          color: 'white', // text color
        },
      },
    ],
  })),
})) as Item[];
