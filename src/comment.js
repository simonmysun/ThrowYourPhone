
const bSearch = (l, r, v, arr) => {
  if (l === r) {
    return l;
  }
  const mid = Math.ceil((l + r) / 2);
  if (v > arr[mid].v) {
    return bSearch(mid, r, v, arr);
  }
  return bSearch(l, mid - 1, v, arr);
};

const comments = [
  {
    v: 0,
    c: 'Less than 10cm. You suck! ',
  },
  {
    v: 0.1,
    c: 'You need some more courage. ',
  },
  {
    v: 0.2,
    c: 'The first step to the addiction of throwing your phone(s). ',
  },
  {
    v: 0.35,
    c: 'Ordinary. ',
  },
  {
    v: 0.5,
    c: 'Fine, I see your effort. ',
  },
  {
    v: 0.6,
    c: 'Getting there, but not quite a pro yet!',
  },
  {
    v: 0.8,
    c: 'Impressive! You might want to consider a career in phone tossing.',
  },
  {
    v: 1.0,
    c: 'Wow! You are a phone throwing enthusiast!',
  },
  {
    v: 1.5,
    c: 'Incredible! Are you sure you are not using a catapult?',
  },
  {
    v: 2,
    c: 'You must be crazy',
  },
  {
    v: 3,
    c: 'Are you trying to send your phone to space?',
  },
  {
    v: 5,
    c: 'This is not phone throwing, this is phone launching!',
  },
  {
    v: 7,
    c: 'Congratulations! You have reached the ultimate phone throwing achievement!',
  },
  {
    v: 11,
    c: 'Did you just break the sound barrier with your phone?',
  },
  {
    v: 15,
    c: 'Your phone is now a satellite!',
  },
  {
    v: 20,
    c: 'You have transcended phone throwing. You are now a legend!',
  },
  {
    v: 100,
    c: 'I think you should register in the Olympics!',
  }
];

const getComment = height => comments[bSearch(0, comments.length - 1, height, comments)].c;

export { getComment as default };
