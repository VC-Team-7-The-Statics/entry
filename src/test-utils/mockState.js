export const authenticatedState = {
  id: "test-id",
  name: "test-name",
  email: "test-email",
  location: {
    type: "Point",
    coordinates: [127.0614817, 37.5077466],
  },
  image: "https://sinder-image-bucket.s3.amazonaws.com/Vc22%40xx.com.jpg",
  price: 5000,
  likes: [],
  match: [],
};

export const unauthenticatedState = {
  id: "",
  name: "",
  email: "",
  location: {},
  image: "",
  price: "",
  likes: [],
  match: [],
};

export const languages = [
  {
    _id: "629b1ac59bb15274874724ca",
    language: "python",
    image: "",
    stack: ["django", "flask", "tensorflow"],
  },
  {
    _id: "629b1ac59bb15274874724cb",
    language: "java",
    image: "",
    stack: ["spring"],
  },
  {
    _id: "629b1ac59bb15274874724c9",
    language: "javascript",
    image: "",
    stack: ["react", "vue", "express", "nodejs", "nestjs", "tensorflow"],
  },
];

export const infiniteUsers = [
  {
    data: {
      success: true,
      recommendation: [
        {
          _id: "test-id-1",
          name: "test-name-1",
          email: "test-email-1",
          company: "test-company-1",
          image: "test-image-1",
          languages: [
            {
              name: "python",
              stacks: ["django"],
            },
            {
              name: "java",
              stacks: [],
            },
            {
              name: "javascript",
              stacks: ["react"],
            },
          ],
          expertise: "test-expertise-1",
        },
      ],
      page: 0,
      isLastPage: false,
    },
  },
  {
    data: {
      success: true,
      recommendation: [
        {
          _id: "test-id-2",
          name: "test-name-2",
          email: "test-email-2",
          company: "test-company-2",
          image: "test-image-2",
          languages: [
            {
              name: "python",
              stacks: ["django"],
            },
            {
              name: "java",
              stacks: [],
            },
            {
              name: "javascript",
              stacks: ["react"],
            },
          ],
          expertise: "test-expertise-2",
        },
      ],
      page: 1,
      isLastPage: false,
    },
  },
];

export const infiniteNoUsers = [
  {
    data: {
      success: true,
      recommendation: [],
      page: 1,
      isLastPage: true,
    },
  },
];
