export const newTripModel = {
    id: "",
    title: "",
    description: "",
    startPoint: {
        address: " ",
        location: {
            lat: 0,
            lng: 0
        }
    },
    targetAddress: {
        address: "",
        location: {
            lat: 0,
            lng: 0
        }
    },
    costs: [],
    image: "https://201196-605323-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2018/11/white-sands-beach-in-zanzibar-960x636.jpg",
    totalCost: {
        currency: "",
        amount: ""
    },
    budget: {
        amount: 0,
        currency: ""
    },
    waypoints: [],
    creator: "",
    shared: [],
    crated: "",
    lastUpdated: {
        userId: "",
        date: ""
    },
    history: [],
    forum: {
        message: {
            user: "",
            date: "",
            content: ""
        }
    },
    schedule: []
};